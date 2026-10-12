"""Regression checks for mixed lesson object formats in the slot guard."""

import importlib.util
import sys
import tempfile
import unittest
from datetime import date
from pathlib import Path
from unittest.mock import patch


spec = importlib.util.spec_from_file_location(
    "daily_publish_slots", Path(__file__).with_name("check-daily-publish-slots.py")
)
slots = importlib.util.module_from_spec(spec)
sys.modules[spec.name] = slots
spec.loader.exec_module(slots)


class DailyPublishSlotsTests(unittest.TestCase):
    def test_mixed_inline_json_and_multiline_js_lessons(self):
        source = '''const lessons = [
  {"slug":"new-current","day":"151","isoDate":"2026-10-11","subject":"a new lesson","steps":[{"text":"draw {a shape}"}]},
  {
    slug: "older-lesson",
    day: "150",
    isoDate: "2026-10-10",
    subject: "an older lesson",
    steps: [{name: "Start", text: "draw a line"}],
  },
];

const archiveLessons = [...lessons];
'''
        with tempfile.TemporaryDirectory() as directory:
            path = Path(directory) / "build-tutorials.mjs"
            path.write_text(source)
            with patch.object(slots, "BUILD_FILE", path):
                lessons = slots.read_lessons()

        self.assertEqual([lesson.slug for lesson in lessons], ["new-current", "older-lesson"])
        self.assertEqual(slots.lessons_on(lessons, date(2026, 10, 11))[0].day, "151")


if __name__ == "__main__":
    unittest.main()
