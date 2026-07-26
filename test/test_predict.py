from pathlib import Path

from src.inference.predict import Predictor

BASE_DIR = Path(__file__).resolve().parents[1]

predictor = Predictor()

image_path = (
    BASE_DIR
    / "data"
    / "combined_images"
    / "ModerateDemented"
    / "1da9e2a6-a38f-43ea-9850-b9fac8d4d709.jpg"
)

result = predictor.predict(image_path)

print(result)