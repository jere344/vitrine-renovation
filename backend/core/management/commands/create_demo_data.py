from django.core.management.base import BaseCommand
from core.models import CompanyInfo, Service, Project, Testimonial
from datetime import date


class Command(BaseCommand):
    help = 'Populate database with demo data'

    def handle(self, *args, **kwargs):
        self.stdout.write('Creating demo data...')

        # Create Company Info
        if not CompanyInfo.objects.exists():
            company = CompanyInfo.objects.create(
                company_name="Rénovation Prestige",
                tagline="Votre partenaire de confiance pour tous vos projets de rénovation",
                description="Depuis plus de 15 ans, Rénovation Prestige accompagne particuliers et professionnels dans leurs projets de rénovation. Notre équipe d'artisans qualifiés met son savoir-faire à votre service pour transformer vos espaces de vie.",
                phone="+33 1 23 45 67 89",
                email="contact@renovation-prestige.fr",
                address="123 Rue de la Rénovation\n75015 Paris",
                facebook_url="https://facebook.com/renovation-prestige",
                instagram_url="https://instagram.com/renovation_prestige",
                meta_description="Entreprise de rénovation à Paris spécialisée dans les travaux de rénovation complète, cuisine, salle de bain. Devis gratuit.",
                meta_keywords="rénovation Paris, travaux rénovation, rénovation maison, rénovation appartement, cuisine, salle de bain"
            )
            self.stdout.write(self.style.SUCCESS('✓ Company info created'))

        # Create Services
        services_data = [
            {
                'title': 'Rénovation Complète',
                'description': 'Nous prenons en charge la rénovation complète de votre logement, de la démolition à la finition. Notre équipe coordonne tous les corps de métier pour vous garantir un résultat parfait dans les délais impartis.',
                'short_description': 'Rénovation totale de votre logement, clé en main',
                'icon': 'HomeRepairService',
                'order': 1
            },
            {
                'title': 'Rénovation de Cuisine',
                'description': 'Créez la cuisine de vos rêves avec notre expertise. Nous vous accompagnons dans le choix des matériaux, l\'agencement optimal et la réalisation de votre projet, en respectant votre budget.',
                'short_description': 'Conception et réalisation de cuisines sur mesure',
                'icon': 'Kitchen',
                'order': 2
            },
            {
                'title': 'Rénovation de Salle de Bain',
                'description': 'Transformez votre salle de bain en un espace de bien-être. Plomberie, carrelage, électricité, nous gérons tous les aspects techniques pour créer une salle de bain moderne et fonctionnelle.',
                'short_description': 'Création de salles de bain modernes et fonctionnelles',
                'icon': 'Bathroom',
                'order': 3
            },
            {
                'title': 'Peinture et Revêtements',
                'description': 'Donnez une nouvelle vie à vos murs et sols avec nos services de peinture et pose de revêtements. Peinture décorative, papier peint, parquet, carrelage... nous maîtrisons tous les revêtements.',
                'short_description': 'Application de peinture et pose de tous types de revêtements',
                'icon': 'FormatPaint',
                'order': 4
            },
            {
                'title': 'Aménagement Intérieur',
                'description': 'Optimisez votre espace avec nos solutions d\'aménagement sur mesure. Placards, dressings, bibliothèques... nous créons des rangements adaptés à vos besoins.',
                'short_description': 'Création d\'espaces de rangement sur mesure',
                'icon': 'Weekend',
                'order': 5
            },
            {
                'title': 'Travaux d\'Électricité',
                'description': 'Mise aux normes électriques, installation de nouveaux circuits, domotique... nos électriciens certifiés garantissent la sécurité et la conformité de votre installation.',
                'short_description': 'Installation et mise aux normes électriques',
                'icon': 'ElectricalServices',
                'order': 6
            }
        ]

        for service_data in services_data:
            service, created = Service.objects.get_or_create(
                title=service_data['title'],
                defaults=service_data
            )
            if created:
                self.stdout.write(self.style.SUCCESS(f'✓ Service created: {service.title}'))

        # Create Projects
        kitchen_service = Service.objects.filter(title='Rénovation de Cuisine').first()
        bathroom_service = Service.objects.filter(title='Rénovation de Salle de Bain').first()
        complete_service = Service.objects.filter(title='Rénovation Complète').first()

        projects_data = [
            {
                'title': 'Cuisine Moderne Paris 15ème',
                'description': 'Rénovation complète d\'une cuisine de 15m² dans un appartement parisien. Le projet incluait la démolition de l\'ancienne cuisine, la création d\'un nouvel agencement optimisé, l\'installation d\'une cuisine équipée haut de gamme avec îlot central, et la pose de carrelage effet béton ciré.\n\nLes propriétaires souhaitaient une cuisine moderne et fonctionnelle avec beaucoup de rangements. Nous avons créé un espace lumineux et convivial qui répond parfaitement à leurs attentes.',
                'short_description': 'Transformation d\'une cuisine traditionnelle en espace moderne et fonctionnel',
                'location': 'Paris 15ème',
                'completion_date': date(2024, 6, 15),
                'duration': '3 semaines',
                'surface': '15 m²',
                'service': kitchen_service,
                'is_featured': True,
                'order': 1
            },
            {
                'title': 'Salle de Bain Zen Neuilly',
                'description': 'Création d\'une salle de bain zen et épurée dans une maison à Neuilly. Le projet comprenait la pose de carrelage grand format, l\'installation d\'une douche italienne avec paroi en verre, la création d\'un meuble vasque sur mesure, et l\'installation d\'une robinetterie design.\n\nL\'objectif était de créer un espace de détente rappelant les spas contemporains, avec des matériaux nobles et une attention particulière portée à l\'éclairage.',
                'short_description': 'Création d\'un espace bien-être moderne et relaxant',
                'location': 'Neuilly-sur-Seine',
                'completion_date': date(2024, 5, 20),
                'duration': '2 semaines',
                'surface': '8 m²',
                'service': bathroom_service,
                'is_featured': True,
                'order': 2
            },
            {
                'title': 'Appartement Haussmannien Réhabilité',
                'description': 'Rénovation complète d\'un appartement haussmannien de 90m² à Paris. Le projet incluait la réfection complète de l\'électricité et de la plomberie, la restauration des moulures et parquets anciens, la création d\'une cuisine ouverte, la rénovation de deux salles de bain, et la peinture de tous les espaces.\n\nNous avons su préserver le charme de l\'ancien tout en apportant le confort moderne : isolation phonique et thermique, domotique, équipements contemporains.',
                'short_description': 'Réhabilitation complète d\'un appartement parisien avec préservation du cachet',
                'location': 'Paris 9ème',
                'completion_date': date(2024, 3, 30),
                'duration': '8 semaines',
                'surface': '90 m²',
                'service': complete_service,
                'is_featured': True,
                'order': 3
            },
            {
                'title': 'Studio Optimisé Montmartre',
                'description': 'Réaménagement complet d\'un studio de 25m² à Montmartre. Création d\'un espace de vie optimisé avec cuisine équipée, salle de bain moderne, et rangements sur mesure. Installation d\'une mezzanine pour l\'espace nuit.',
                'short_description': 'Optimisation d\'un petit espace avec solutions de rangement',
                'location': 'Paris 18ème',
                'completion_date': date(2024, 4, 10),
                'duration': '3 semaines',
                'surface': '25 m²',
                'service': complete_service,
                'is_featured': False,
                'order': 4
            }
        ]

        for project_data in projects_data:
            project, created = Project.objects.get_or_create(
                title=project_data['title'],
                defaults={**project_data, 'featured_image': 'projects/placeholder.jpg'}
            )
            if created:
                self.stdout.write(self.style.SUCCESS(f'✓ Project created: {project.title}'))

        # Create Testimonials
        testimonials_data = [
            {
                'client_name': 'Sophie Martin',
                'client_location': 'Paris 15ème',
                'content': 'Équipe très professionnelle et à l\'écoute. Notre cuisine a été rénovée dans les temps et le résultat est magnifique. Je recommande vivement !',
                'rating': 5,
                'order': 1
            },
            {
                'client_name': 'Jean Dupont',
                'client_location': 'Neuilly-sur-Seine',
                'content': 'Travail soigné et respect des délais. La transformation de notre salle de bain a dépassé nos attentes. Merci pour votre professionnalisme.',
                'rating': 5,
                'order': 2
            },
            {
                'client_name': 'Marie Lambert',
                'client_location': 'Paris 9ème',
                'content': 'Rénovation complète de notre appartement gérée de A à Z avec beaucoup de sérieux. L\'équipe a su préserver le cachet ancien tout en modernisant l\'ensemble.',
                'rating': 5,
                'order': 3
            },
            {
                'client_name': 'Pierre Moreau',
                'client_location': 'Paris 18ème',
                'content': 'Excellent rapport qualité-prix. Le suivi du chantier était impeccable et les artisans très compétents. Notre studio est maintenant fonctionnel et agréable.',
                'rating': 5,
                'order': 4
            }
        ]

        for testimonial_data in testimonials_data:
            testimonial, created = Testimonial.objects.get_or_create(
                client_name=testimonial_data['client_name'],
                defaults=testimonial_data
            )
            if created:
                self.stdout.write(self.style.SUCCESS(f'✓ Testimonial created: {testimonial.client_name}'))

        self.stdout.write(self.style.SUCCESS('\n✓ Demo data creation completed!'))
        self.stdout.write(self.style.WARNING('\nNote: Project images are placeholders. Upload real images via Django admin.'))
