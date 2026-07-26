from pathlib import Path

BASE_DIR = Path(__file__).resolve().parents[2]

CHECKPOINT_DIR = BASE_DIR / "checkpoints"
UPLOAD_DIR = BASE_DIR / "uploads"
OUTPUT_DIR = BASE_DIR / "outputs"

BEST_MODEL = CHECKPOINT_DIR / "best_fine_tune_model.pth"

UPLOAD_DIR.mkdir(exist_ok=True)
OUTPUT_DIR.mkdir(exist_ok=True)