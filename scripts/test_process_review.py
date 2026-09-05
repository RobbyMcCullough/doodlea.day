"""Regression tests for review freshness and continuity evidence."""
import copy
import json
import tempfile
import unittest
from pathlib import Path
from types import SimpleNamespace
from process_review import validate, digest, contract_digest


class ReviewTests(unittest.TestCase):
    def setUp(self):
        self.temp = tempfile.TemporaryDirectory()
        self.addCleanup(self.temp.cleanup)
        self.root = Path(self.temp.name)
        (self.root / "assets").mkdir()
        self.plan = {
            "schema_version": 5, "slug": "test", "drawing_mode": "direct",
            "first_step_test": "One connected outline is easy to copy.",
            "temporary_guides": [],
            "finished": "assets/test-finished-v1.jpg",
            "final_elements": [
                {"name": name, "introduced_by_step": i,
                 "description": "A specific fixed visible landmark."}
                for i, name in enumerate(["head", "body", "face"], 1)],
            "frames": [
                {"asset": f"assets/test-step-{i}.jpg", "step_name": f"Step {i}",
                 "visible_job": "Add a new visible connected landmark.",
                 "instruction": "Draw this connected shape in place.",
                 "adds": [name], "introduces": [name]}
                for i, name in enumerate(["head", "body", "face"], 1)],
            "final_step": {
                "asset": "assets/test-finished-v1.jpg", "step_name": "Color",
                "visible_job": "Color only the already established contours.",
                "instruction": "Fill the established shapes with color.",
                "adds": ["color"], "introduces": []},
        }
        frames = self.plan["frames"] + [self.plan["final_step"]]
        for frame in frames:
            (self.root / frame["asset"]).write_bytes(b"fixture")
        self.page = SimpleNamespace(steps=[
            {"name": f["step_name"], "image": f["asset"], "instruction": f["instruction"]}
            for f in frames])
        self.plan["visual_review"] = {
            "status": "approved", "teaching_score": 9, "finished_art_score": 9,
            "first_step_observation": "The head is one copyable connected shape.",
            "draw_through_observation": "Each instruction adds the observed new strokes.",
            "asset_sha256": {f["asset"]: digest(self.root / f["asset"]) for f in frames},
            "transitions": [
                {"from_step": i, "to_step": i+1,
                 "observed_present": ["head", "body", "face"][:min(i+1, 3)],
                 "observed_addition": "The next connected landmark is clearly visible.",
                 "instruction_match": "The instruction names the observed new strokes.",
                 "unexplained_removals": [], "unexplained_moves": [],
                 "removed_guides": [], "observed_guides": []} for i in range(1, 4)]
        }
        self.rehash()

    def rehash(self):
        self.plan["visual_review"]["contract_sha256"] = contract_digest(self.plan)

    def errors(self):
        return validate(self.plan, self.root, self.page)

    def test_direct_drawing_and_final_color_without_percentages_pass(self):
        self.assertEqual(self.errors(), [])

    def test_modified_image_invalidates_approval(self):
        (self.root / "assets/test-step-2.jpg").write_bytes(b"changed")
        self.assertTrue(any("stale" in e for e in self.errors()))

    def test_changed_instruction_invalidates_contract(self):
        self.plan["frames"][0]["instruction"] = "Draw a very different opening shape."
        self.assertTrue(any("stale" in e for e in self.errors()))

    def test_page_copy_must_match(self):
        self.page.steps[0]["instruction"] = "Unreviewed published instruction."
        self.assertTrue(any("instruction mismatch" in e for e in self.errors()))

    def test_missing_landmark_fails(self):
        self.plan["visual_review"]["transitions"][1]["observed_present"].remove("face")
        self.assertTrue(any("individual landmark" in e for e in self.errors()))

    def test_unexplained_disappearance_fails(self):
        self.plan["visual_review"]["transitions"][1]["unexplained_removals"] = ["left eye"]
        self.assertTrue(any("unexplained removal" in e for e in self.errors()))

    def test_unexplained_movement_fails(self):
        self.plan["visual_review"]["transitions"][1]["unexplained_moves"] = ["orange"]
        self.assertTrue(any("unexplained movement" in e for e in self.errors()))

    def test_guide_removal_requires_matching_instruction(self):
        self.plan["drawing_mode"] = "guided"
        self.plan["temporary_guides"] = [{
            "name": "axis", "introduced_by_step": 1, "removed_by_step": 2,
            "removal_instruction": "Erase the temporary center axis now."}]
        self.plan["visual_review"]["transitions"][0]["removed_guides"] = ["axis"]
        self.rehash()
        self.assertTrue(any("removal instruction" in e for e in self.errors()))
        self.plan["frames"][1]["instruction"] += " Erase the temporary center axis now."
        self.page.steps[1]["instruction"] = self.plan["frames"][1]["instruction"]
        self.rehash()
        self.assertEqual(self.errors(), [])

    def test_missing_pair_fails(self):
        self.plan["visual_review"]["transitions"].pop()
        self.assertTrue(any("every adjacent pair" in e for e in self.errors()))

    def test_crop_preserves_rectangular_cell_proportions(self):
        import importlib.util
        from PIL import Image, ImageDraw
        spec = importlib.util.spec_from_file_location("crop", Path(__file__).with_name("crop-contact-sheet.py"))
        crop = importlib.util.module_from_spec(spec)
        spec.loader.exec_module(crop)
        source = Image.new("RGB", (100, 200), "white")
        ImageDraw.Draw(source).rectangle((30, 60, 69, 139), fill="black")
        output = self.root / "crop.jpg"
        crop.save_panel(source, (0, 0, 100, 200), output, (200, 200), 95)
        with Image.open(output) as saved:
            box = saved.convert("L").point(lambda p: 255 if p < 50 else 0).getbbox()
            self.assertAlmostEqual((box[2] - box[0]) / (box[3] - box[1]), 0.5, places=1)


if __name__ == "__main__":
    unittest.main()
