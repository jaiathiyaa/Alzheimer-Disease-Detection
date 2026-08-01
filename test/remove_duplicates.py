from pathlib import Path
import hashlib

DATASET_DIR = Path("../data/combined_images")

hash_to_file = {}

removed = 0

for image_path in DATASET_DIR.rglob("*"):
    if not image_path.is_file():
        continue

    with open(image_path, "rb") as f:
        file_hash = hashlib.sha256(f.read()).hexdigest()

    if file_hash in hash_to_file:
        print(f"Removing duplicate: {image_path}")
        image_path.unlink()
        removed += 1
    else:
        hash_to_file[file_hash] = image_path

print()
print("===================================")
print(f"Unique Images : {len(hash_to_file)}")
print(f"Duplicates Removed : {removed}")
print("===================================")