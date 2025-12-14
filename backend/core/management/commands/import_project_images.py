"""
Management command to import project images from media_to_import folder
Usage: python manage.py import_project_images
"""
import os
import shutil
from pathlib import Path
from django.core.management.base import BaseCommand
from django.core.files import File
from django.conf import settings
from core.models import Project, ProjectImage, Service, GalleryImage
from PIL import Image
import numpy as np


class Command(BaseCommand):
    help = 'Import project images from media_to_import folder'

    def handle(self, *args, **options):
        # Base paths
        base_dir = settings.BASE_DIR.parent
        import_dir = base_dir / 'media_to_import'
        media_dir = settings.MEDIA_ROOT
        
        # Ensure media directories exist
        Path(media_dir).mkdir(parents=True, exist_ok=True)
        Path(media_dir, 'projects', 'featured').mkdir(parents=True, exist_ok=True)
        Path(media_dir, 'projects', 'before').mkdir(parents=True, exist_ok=True)
        Path(media_dir, 'projects', 'gallery').mkdir(parents=True, exist_ok=True)
        Path(media_dir, 'gallery').mkdir(parents=True, exist_ok=True)
        
        self.stdout.write(self.style.SUCCESS('📁 Creating media directories...'))
        
        # Create or get services
        services = self.create_services()
        
        # Project definitions
        projects_data = [
            {
                'number': 1,
                'title': 'Rénovation Cuisine Moderne',
                'service': services['cuisine'],
                'location': 'Lattes',
                'short_desc': 'Transformation complète d\'une cuisine avec îlot central et électroménagers haut de gamme.',
                'description': 'Projet de rénovation complète d\'une cuisine familiale. Création d\'un espace moderne et fonctionnel avec îlot central, plan de travail en quartz, et intégration d\'électroménagers p. Les finitions soignées et l\'optimisation de l\'espace offrent un résultat élégant et pratique.',
                'duration': '3 semaines',
                'surface': '25 m²',
                'has_before_after': True,
            },
            {
                'number': 2,
                'title': 'Salle de Bain Contemporaine',
                'service': services['salle_bain'],
                'location': 'Montpellier',
                'short_desc': 'Rénovation d\'une salle de bain avec douche à l\'italienne et carrelage grand format.',
                'description': 'Rénovation complète d\'une salle de bain en style contemporain. Installation d\'une douche à l\'italienne, carrelage grand format effet béton, meuble vasque suspendu et robinetterie design. L\'éclairage LED intégré crée une ambiance chaleureuse et moderne.',
                'duration': '2 semaines',
                'surface': '8 m²',
                'has_before_after': True,
            },
            {
                'number': 3,
                'title': 'Aménagement Rangement Sur-Mesure',
                'service': services['rangement'],
                'location': 'Pérols',
                'short_desc': 'Création de rangements sur-mesure optimisant chaque espace disponible.',
                'description': 'Conception et installation de rangements sur-mesure adaptés aux besoins du client. Bibliothèque murale, placards intégrés et espaces de rangement intelligents maximisant l\'utilisation de l\'espace tout en conservant une esthétique épurée.',
                'duration': '1 semaine',
                'surface': '15 m²',
                'has_before_after': True,
            },
            {
                'number': 4,
                'title': 'Cuisine Ouverte avec Verrière',
                'service': services['cuisine'],
                'location': 'Castelnau-le-Lez',
                'short_desc': 'Ouverture cuisine avec verrière d\'atelier et aménagement moderne.',
                'description': 'Transformation d\'une cuisine fermée en espace ouvert avec verrière d\'atelier. Installation d\'une cuisine équipée moderne, création d\'un bar américain et optimisation de l\'espace de vie. Le projet inclut également la réfection des sols et peintures.',
                'duration': '4 semaines',
                'surface': '30 m²',
                'has_before_after': True,
            },
            {
                'number': 5,
                'title': 'Salle de Bain Luxe',
                'service': services['salle_bain'],
                'location': 'Palavas-les-Flots',
                'short_desc': 'Salle de bain haut de gamme avec baignoire îlot et matériaux nobles.',
                'description': 'Création d\'une salle de bain luxueuse avec baignoire îlot, double vasque, douche à l\'italienne et carrelage en marbre. Robinetterie dorée, miroirs avec éclairage LED et chauffage au sol pour un confort optimal. Un projet d\'exception alliant élégance et fonctionnalité.',
                'duration': '3 semaines',
                'surface': '12 m²',
                'has_before_after': True,
            },
            {
                'number': 6,
                'title': 'Rénovation Multi-Pièces',
                'service': services['autre'],
                'location': 'Lattes',
                'short_desc': 'Rénovation complète d\'un appartement incluant cuisine, salle de bain et séjour.',
                'description': 'Rénovation globale d\'un appartement avec réfection complète de la cuisine, salle de bain, sols, peintures et menuiseries. Un projet d\'envergure coordonné avec plusieurs corps de métier pour un résultat harmonieux et contemporain.',
                'duration': '6 semaines',
                'surface': '65 m²',
                'has_before_after': False,
            },
            {
                'number': 7,
                'title': 'Aménagement Combles',
                'service': services['autre'],
                'location': 'Montpellier',
                'short_desc': 'Transformation de combles en espace de vie moderne et lumineux.',
                'description': 'Aménagement complet de combles perdus en suite parentale avec salle de bain attenante. Isolation thermique, création de fenêtres de toit, parquet massif et décoration contemporaine. Un nouvel espace de vie optimisé sous les toits.',
                'duration': '5 semaines',
                'surface': '35 m²',
                'has_before_after': False,
            },
            {
                'number': 8,
                'title': 'Cuisine Moderne Épurée',
                'service': services['cuisine'],
                'location': 'Villeneuve-lès-Maguelone',
                'short_desc': 'Cuisine design aux lignes épurées avec rangements intégrés.',
                'description': 'Installation d\'une cuisine moderne aux finitions impeccables. Façades laquées sans poignées, plan de travail en Silestone, électroménagers encastrés et système de rangement optimisé. Un design minimaliste pour une cuisine élégante et fonctionnelle.',
                'duration': '2 semaines',
                'surface': '20 m²',
                'has_before_after': False,
            },
        ]
        
        self.stdout.write(self.style.SUCCESS('\n🏗️  Creating projects and importing images...\n'))
        
        # Import projects
        for project_data in projects_data:
            project = self.create_project(project_data, import_dir, media_dir)
            if project:
                self.stdout.write(self.style.SUCCESS(f'✓ Project {project_data["number"]}: {project.title}'))
        
        # Create some gallery showcase images
        self.create_gallery_images(import_dir, media_dir)
        
        self.stdout.write(self.style.SUCCESS('\n✨ Import completed successfully!'))
        self.stdout.write(self.style.WARNING('\n💡 Tip: You can now edit images in Django admin and swap/remove any you don\'t like.'))

    def create_services(self):
        """Create or get existing services"""
        services = {}
        
        services['cuisine'], _ = Service.objects.get_or_create(
            slug='cuisine',
            defaults={
                'title': 'Aménagement Cuisine',
                'short_description': 'Cuisine sur-mesure et aménagement complet',
                'description': 'Conception et installation de cuisines modernes et fonctionnelles adaptées à vos besoins.',
                'icon': 'Kitchen',
                'order': 1,
                'is_active': True,
            }
        )
        
        services['salle_bain'], _ = Service.objects.get_or_create(
            slug='salle-de-bain',
            defaults={
                'title': 'Salle de Bain',
                'short_description': 'Rénovation et création de salles de bain',
                'description': 'Transformation de votre salle de bain en un espace moderne, confortable et fonctionnel.',
                'icon': 'Bathroom',
                'order': 2,
                'is_active': True,
            }
        )
        
        services['rangement'], _ = Service.objects.get_or_create(
            slug='rangement',
            defaults={
                'title': 'Rangement Sur-Mesure',
                'short_description': 'Solutions de rangement personnalisées',
                'description': 'Création de rangements sur-mesure pour optimiser votre espace de vie.',
                'icon': 'Storage',
                'order': 3,
                'is_active': True,
            }
        )
        
        services['autre'], _ = Service.objects.get_or_create(
            slug='renovation-generale',
            defaults={
                'title': 'Rénovation Générale',
                'short_description': 'Tous travaux de rénovation',
                'description': 'Rénovation complète de votre habitat avec coordination de tous les corps de métier.',
                'icon': 'HomeRepairService',
                'order': 4,
                'is_active': True,
            }
        )
        
        return services

    def create_project(self, project_data, import_dir, media_dir):
        """Create a project and import its images"""
        project_num = project_data['number']
        
        # Check if project already exists
        slug = f"projet-{project_num}"
        existing_project = Project.objects.filter(slug=slug).first()
        if existing_project:
            existing_project.delete()
            self.stdout.write(self.style.WARNING(f'  ⚠ Project {project_num} already exists, deleting and recreating...'))
        
        project = Project.objects.create(
            slug=slug,
            title=project_data['title'],
            service=project_data['service'],
            location=project_data['location'],
            short_description=project_data['short_desc'],
            description=project_data['description'],
            duration=project_data['duration'],
            surface=project_data['surface'],
            has_before_after=project_data['has_before_after'],
            is_featured=project_data['has_before_after'],
            is_active=True,
            order=project_num,
        )
        
        # Import featured image (from "a" folder = after)
        if project_data['has_before_after']:
            after_folder = import_dir / f"{project_num}a"
            before_folder = import_dir / f"{project_num}b"
        else:
            after_folder = import_dir / str(project_num)
            before_folder = None
        
        # Import main "after" image
        if after_folder.exists():
            images = sorted([f for f in after_folder.iterdir() if f.suffix.lower() in ['.jpg', '.jpeg', '.png']])
            if images:
                # Use first image as featured
                self.copy_image_to_project(images[0], project, 'featured')
                
                # Import remaining as gallery
                for i, img_path in enumerate(images[1:], start=1):
                    self.copy_image_to_gallery(img_path, project, i)
        
        # Import "before" image if exists
        if before_folder and before_folder.exists():
            images = sorted([f for f in before_folder.iterdir() if f.suffix.lower() in ['.jpg', '.jpeg', '.png']])
            if images:
                # Use first image as before_image
                self.copy_image_to_project(images[0], project, 'before')
        
        return project

    def crop_margins(self, img_path):
        """Crop black margins and iPhone notch areas from image"""
        try:
            img = Image.open(img_path)
            img_array = np.array(img)
            
            # Define margin colors to remove with RGB values
            margin_colors = [
                [0, 0, 0],         # #000000 - Pure black (sides)
                [36, 37, 39],      # #242527 - Dark gray (top/bottom)
                [104, 105, 107],   # #68696b - iPhone notch area
            ]
            
            # Convert to RGB if needed
            if len(img_array.shape) == 2:
                # Grayscale to RGB
                img_array = np.stack([img_array] * 3, axis=-1)
            elif img_array.shape[2] == 4:
                # RGBA to RGB
                img_array = img_array[:, :, :3]
            
            # Create a mask for non-margin pixels
            # Allow tolerance for compression artifacts and slight color variations
            tolerance = 15
            
            # Start with all pixels as potential margins
            is_margin = np.ones(img_array.shape[:2], dtype=bool)
            
            # For each margin color, mark pixels that DON'T match as content
            for color in margin_colors:
                color_diff = np.abs(img_array - np.array(color))
                color_distance = np.sqrt(np.sum(color_diff ** 2, axis=2))
                # Pixels significantly different from this margin color are content
                is_margin &= (color_distance <= tolerance)
            
            # Invert to get content mask
            content_mask = ~is_margin
            
            # Find bounding box of content
            rows = np.any(content_mask, axis=1)
            cols = np.any(content_mask, axis=0)
            
            if rows.any() and cols.any():
                rmin, rmax = np.where(rows)[0][[0, -1]]
                cmin, cmax = np.where(cols)[0][[0, -1]]
                
                # Add small padding to avoid cutting content (2 pixels)
                height, width = img_array.shape[:2]
                rmin = max(0, rmin - 2)
                rmax = min(height - 1, rmax + 2)
                cmin = max(0, cmin - 2)
                cmax = min(width - 1, cmax + 2)
                
                # Crop image
                cropped = img.crop((cmin, rmin, cmax + 1, rmax + 1))
                return cropped
            
            return img
        except Exception as e:
            self.stdout.write(self.style.WARNING(f'  ⚠ Could not crop image {img_path.name}: {e}'))
            return Image.open(img_path)

    def copy_image_to_project(self, img_path, project, image_type='featured'):
        """Copy and crop an image file to project"""
        try:
            dest_folder = 'featured' if image_type == 'featured' else 'before'
            dest_path = Path(settings.MEDIA_ROOT) / 'projects' / dest_folder / f"{project.slug}_{img_path.name}"
            
            # Crop margins and save
            cropped_img = self.crop_margins(img_path)
            cropped_img.save(dest_path, quality=90, optimize=True)
            
            # Update project
            relative_path = f'projects/{dest_folder}/{dest_path.name}'
            if image_type == 'featured':
                project.featured_image = relative_path
            else:
                project.before_image = relative_path
            project.save()
            
            return True
        except Exception as e:
            self.stdout.write(self.style.ERROR(f'  ✗ Error copying image: {e}'))
            return False

    def copy_image_to_gallery(self, img_path, project, order):
        """Copy and crop an image to project gallery"""
        try:
            dest_path = Path(settings.MEDIA_ROOT) / 'projects' / 'gallery' / f"{project.slug}_{order}_{img_path.name}"
            
            # Crop margins and save
            cropped_img = self.crop_margins(img_path)
            cropped_img.save(dest_path, quality=90, optimize=True)
            
            # Create ProjectImage
            relative_path = f'projects/gallery/{dest_path.name}'
            ProjectImage.objects.create(
                project=project,
                image=relative_path,
                order=order,
                is_visible=True,
            )
            
            return True
        except Exception as e:
            self.stdout.write(self.style.ERROR(f'  ✗ Error copying gallery image: {e}'))
            return False

    def create_gallery_images(self, import_dir, media_dir):
        """Create some showcase gallery images for homepage"""
        self.stdout.write(self.style.SUCCESS('\n📸 Creating gallery showcase images...'))
        
        # Clear existing gallery images
        GalleryImage.objects.all().delete()
        self.stdout.write(self.style.WARNING('  Clearing existing gallery images...'))
        
        # Select some hero images from various projects  
        hero_selections = [
            ('6', 0, 'Rénovation Moderne', 'projet-6'),
            ('7', 5, 'Aménagement Élégant', 'projet-7'),
            ('1a', 2, 'Cuisine Design', 'projet-1'),
            ('2a', 3, 'Salle de Bain Contemporaine', 'projet-2'),
            ('4a', 1, 'Cuisine avec Verrière', 'projet-4'),
            ('5a', 2, 'Salle de Bain Luxe', 'projet-5'),
        ]
        
        for folder_name, img_index, title, project_slug in hero_selections:
            folder = import_dir / folder_name
            if folder.exists():
                images = sorted([f for f in folder.iterdir() if f.suffix.lower() in ['.jpg', '.jpeg', '.png']])
                if len(images) > img_index:
                    try:
                        # Get the project by slug
                        project = Project.objects.filter(slug=project_slug).first()
                        
                        img_path = images[img_index]
                        dest_path = Path(media_dir) / 'gallery' / f"hero_{folder_name}_{img_path.name}"
                        
                        # Crop margins and save
                        cropped_img = self.crop_margins(img_path)
                        cropped_img.save(dest_path, quality=90, optimize=True)
                        
                        relative_path = f'gallery/{dest_path.name}'
                        GalleryImage.objects.create(
                            title=title,
                            image=relative_path,
                            category='hero',
                            linked_project=project,
                            is_active=True,
                            order=len(hero_selections) - hero_selections.index((folder_name, img_index, title, project_slug)),
                        )
                        self.stdout.write(self.style.SUCCESS(f'  ✓ Added hero image: {title} (linked to {project_slug})'))
                    except Exception as e:
                        self.stdout.write(self.style.ERROR(f'  ✗ Error creating gallery image: {e}'))
