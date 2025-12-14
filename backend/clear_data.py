import os
import django
import shutil
from pathlib import Path

# Setup Django
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'backend.settings')
django.setup()

from core.models import Project, GalleryImage, ProjectImage
from django.conf import settings

# Delete all projects and images
print("Deleting existing data...")
ProjectImage.objects.all().delete()
Project.objects.all().delete()
GalleryImage.objects.all().delete()
print("✓ Deleted all projects and gallery images from database")

# Clean media folder
media_root = Path(settings.MEDIA_ROOT)
if media_root.exists():
    for folder in ['projects', 'gallery']:
        folder_path = media_root / folder
        if folder_path.exists():
            shutil.rmtree(folder_path)
            print(f"✓ Deleted {folder} folder")

print("\n✨ Ready for fresh import with cropped images!")
