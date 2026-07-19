from torch.utils.data import Dataset
from PIL import Image

class AlzheimerDataset(Dataset):
    def __init__(self,image_paths , labels, transform = None):
        self.image_paths = image_paths
        self.labels = labels
        self.transform = transform

        self.class_to_idx = {
            "MildDemented" : 0,
            "ModerateDemented" : 1,
            "NonDemented" : 2,
            "VeryMildDemented": 3
        }

    def __len__(self):
        return len(self.image_paths)

    def __getitem__(self, idx):
        #Image Path
        image_path = self.image_paths[idx]

        label = self.labels[idx]

        label = self.class_to_idx[label]

        image = Image.open(image_path)

        if self.transform:
            image = self.transform(image)

        return image, label