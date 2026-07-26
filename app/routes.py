from pathlib import Path
from uuid import uuid4

from fastapi import APIRouter, File, HTTPException, UploadFile

from app.predictor import predictor
from src.config.paths import UPLOAD_DIR

router = APIRouter()


@router.get("/")
def root():
    return {
        "message": "Alzheimer Disease Detection API is running!"
    }


@router.get("/health")
def health():
    return {
        "status": "healthy"
    }


@router.post("/predict")
async def predict(file: UploadFile = File(...)):
    # Check if a file was uploaded
    if not file.filename:
        raise HTTPException(
            status_code=400,
            detail="No file uploaded."
        )

    # Generate a unique filename
    extension = Path(file.filename).suffix
    image_path = UPLOAD_DIR / f"{uuid4().hex}{extension}"

    # Save uploaded file
    with open(image_path, "wb") as buffer:
        buffer.write(await file.read())

    try:
        # Run prediction
        result = predictor.predict(image_path)
        return result

    except ValueError as e:
        # Invalid or corrupted image
        raise HTTPException(
            status_code=400,
            detail=str(e),
        )

    except Exception as e:
        # Unexpected server error
        raise HTTPException(
            status_code=500,
            detail=f"Prediction failed: {str(e)}",
        )

    finally:
        # Delete uploaded file
        if image_path.exists():
            image_path.unlink()