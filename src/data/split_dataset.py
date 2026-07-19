from pathlib import Path
from sklearn.model_selection import train_test_split


BASE_DIR = Path(__file__).resolve().parents[2]
DATASET_PATH = BASE_DIR / "data" / "combined_images"

def get_data_split():
    images_path = []
    labels = []

    dataset = Path(DATASET_PATH)

    for class_folder in dataset.iterdir():
        if class_folder.is_dir():
            for image in class_folder.glob("*"):
                images_path.append(str(image))
                labels.append(class_folder.name)

    train_paths, temp_paths, train_labels, temp_labels = train_test_split(
        images_path,
        labels,
        test_size=0.30,
        stratify=labels,
        random_state=42
    )

    val_paths, test_paths, val_labels, test_labels = train_test_split(
        temp_paths,
        temp_labels,
        test_size=0.50,
        stratify=temp_labels,
        random_state=42
    )

    return (
        train_paths,
        train_labels,
        val_paths,
        val_labels,
        test_paths,
        test_labels
    )
