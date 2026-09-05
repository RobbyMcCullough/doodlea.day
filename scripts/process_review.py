"""Schema v5: additive lessons with review evidence tied to saved artifacts.

This validates review completeness and freshness, not the truth of visual claims.
"""
import hashlib
import json
from pathlib import Path


def digest(path):
    return hashlib.sha256(path.read_bytes()).hexdigest()


def contract_digest(plan):
    contract = {k: v for k, v in plan.items() if k != "visual_review"}
    return hashlib.sha256(json.dumps(contract, sort_keys=True, separators=(",", ":")).encode()).hexdigest()


def validate(plan, root, page):
    errors = []
    def check(condition, message):
        if not condition:
            errors.append(message)
    def prose(value):
        return isinstance(value, str) and len(value.split()) >= 4

    try:
        check(plan.get("schema_version") == 5, "unsupported schema version")
        frames = plan["frames"] + [plan["final_step"]]
        check(4 <= len(frames) <= 8, "use 4–8 meaningful steps")
        check(len(page.steps) == len(frames), "page step count differs from plan")
        elements = plan["final_elements"]
        names = [e["name"] for e in elements]
        check(len(names) == len(set(names)), "landmark names must be unique")
        first = {e["name"]: e["introduced_by_step"] for e in elements}
        check(all(type(n) is int and 1 <= n < len(frames) for n in first.values()),
              "all structural landmarks must appear before the final")
        check(all(prose(e.get("description")) for e in elements), "describe each landmark")
        check(plan.get("drawing_mode") in ("direct", "guided"), "choose direct or guided drawing")
        check(prose(plan.get("first_step_test")), "record why the first step is copyable")
        guides = plan.get("temporary_guides", [])
        guide_names = [g["name"] for g in guides]
        check(len(set(guide_names)) == len(guide_names), "guide names must be unique")
        check(not set(guide_names) & set(names), "guides and keeper landmarks must be separate")
        if plan.get("drawing_mode") == "direct":
            check(not guides, "direct drawing must not rely on temporary guides")
        for guide in guides:
            check(1 <= guide["introduced_by_step"] < guide["removed_by_step"] <= len(frames),
                  "guide lifecycle must have ordered introduction and removal")
            check(prose(guide.get("removal_instruction")), "guide removal needs a reader instruction")
            removal = frames[guide["removed_by_step"] - 1]
            check(guide["removal_instruction"] in removal["instruction"],
                  "guide removal instruction must appear in the removal step")
        paths = []
        for i, frame in enumerate(frames, 1):
            check(prose(frame.get("visible_job")), f"step {i}: explain its visible job")
            check(prose(frame.get("instruction")), f"step {i}: give a concrete reader instruction")
            check(isinstance(frame.get("adds"), list) and bool(frame["adds"]),
                  f"step {i}: name meaningful additions")
            check(set(frame.get("introduces", [])) == {n for n, start in first.items() if start == i},
                  f"step {i}: introductions disagree with landmarks")
            rel = frame["asset"]
            path = (root / rel).resolve()
            check(path.is_relative_to((root / "assets").resolve()), "assets must stay in assets/")
            check(path.is_file(), f"missing asset {rel}")
            paths.append(rel)
            if i <= len(page.steps):
                check(page.steps[i-1]["name"] == frame["step_name"], f"step {i}: page title mismatch")
                check(page.steps[i-1]["image"] == rel, f"step {i}: page image mismatch")
                check(" ".join(page.steps[i-1].get("instruction", "").split()) ==
                      " ".join(frame["instruction"].split()), f"step {i}: page instruction mismatch")
        check(paths[-1] == plan["finished"], "final asset mismatch")
        actual = {str(p.relative_to(root)) for p in (root / "assets").glob(plan["slug"] + "-step-*.jpg")}
        check(actual == set(paths[:-1]), "saved step masters differ from plan")
        ledger_path = root / "drafts/LEDGER.json"
        if ledger_path.exists():
            status = json.loads(ledger_path.read_text()).get("entries", {}).get(plan["slug"], {}).get("status")
            check(status == "published", "readiness requires a published ledger entry")
        review = plan.get("visual_review", {})
        check(review.get("status") == "approved", "saved-image review is not approved")
        check(prose(review.get("first_step_observation")), "review first-step usability")
        check(prose(review.get("draw_through_observation")), "review whether copy teaches the images")
        for key in ("teaching_score", "finished_art_score"):
            score = review.get(key, 0)
            check(type(score) in (int, float) and 8 <= score <= 10, f"{key} must independently reach 8/10")
        check(review.get("contract_sha256") == contract_digest(plan), "review is stale: lesson contract changed")
        hashes = review.get("asset_sha256", {})
        check(set(hashes) == set(paths), "review must cover every saved frame including finish")
        for rel in paths:
            path = root / rel
            if path.is_file():
                check(hashes.get(rel) == digest(path), f"review is stale: {rel} changed")
        transitions = review.get("transitions", [])
        check(len(transitions) == len(frames)-1, "review every adjacent pair including finish")
        for i, row in enumerate(transitions, 1):
            check(row.get("from_step") == i and row.get("to_step") == i+1, "review transitions in order")
            expected = {n for n, start in first.items() if start <= i+1}
            check(set(row.get("observed_present", [])) == expected,
                  f"transition {i}: account for each individual landmark")
            check(prose(row.get("observed_addition")), f"transition {i}: describe visible addition")
            check(prose(row.get("instruction_match")), f"transition {i}: compare image with instruction")
            check(row.get("unexplained_removals") == [], f"transition {i}: unexplained removal")
            check(row.get("unexplained_moves") == [], f"transition {i}: unexplained movement")
            removed = {g["name"] for g in guides if g["removed_by_step"] == i+1}
            check(set(row.get("removed_guides", [])) == removed, f"transition {i}: guide removal mismatch")
            active = {g["name"] for g in guides if g["introduced_by_step"] <= i+1 < g["removed_by_step"]}
            check(set(row.get("observed_guides", [])) == active, f"transition {i}: guide presence mismatch")
        return errors
    except (KeyError, TypeError, ValueError, AttributeError, OSError) as exc:
        return errors + [f"malformed v5 plan or artifact: {exc}"]
