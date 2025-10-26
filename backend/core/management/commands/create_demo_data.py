from django.core.management.base import BaseCommand
from core.models import CompanyInfo, Service, Project, Testimonial
from datetime import date


class Command(BaseCommand):
    help = 'Populate database with demo data for Campilongo Frères Rénovation'

    def add_arguments(self, parser):
        parser.add_argument(
            '--clear',
            action='store_true',
            help='Delete all existing data before creating new demo data',
        )

    def handle(self, *args, **options):
        if options['clear']:
            self.stdout.write(self.style.WARNING('Clearing existing data...'))
            CompanyInfo.objects.all().delete()
            Service.objects.all().delete()
            Project.objects.all().delete()
            Testimonial.objects.all().delete()
            self.stdout.write(self.style.SUCCESS('✓ All existing data cleared\n'))

        self.stdout.write('Creating demo data for Campilongo Frères Rénovation...')

        # Create Company Info
        if not CompanyInfo.objects.exists():
            company = CompanyInfo.objects.create(
                company_name="Campilongo Frères Rénovation",
                tagline="Depuis 20 ans, nous transformons vos espaces en lieux de vie exceptionnels",
                description="Entreprise familiale basée à Lattes depuis plus de 20 ans, Campilongo Frères Rénovation est votre partenaire de confiance pour tous vos projets de plomberie et de rénovation. Notre expertise, notre passion du travail bien fait et notre engagement envers la satisfaction client font de nous un acteur incontournable de la rénovation dans la région de Montpellier.",
                phone="+33 (0)4 XX XX XX XX",
                email="thomascampilongo@yahoo.fr",
                address="Lattes, Hérault (34)",
                facebook_url="https://facebook.com/campilongofreres",
                instagram_url="https://instagram.com/campilongo_renovation",
                linkedin_url="",
                meta_description="Entreprise de rénovation et plomberie à Lattes, Montpellier. Plus de 20 ans d'expérience. Devis gratuit pour vos travaux de rénovation.",
                meta_keywords="rénovation Lattes, plomberie Montpellier, travaux rénovation Hérault, rénovation maison, cuisine, salle de bain"
            )
            self.stdout.write(self.style.SUCCESS('✓ Company info created'))

        # Create Services
        services_data = [
            {
                'title': 'Plomberie Générale',
                'description': 'Installation, réparation et entretien de tous vos équipements sanitaires. Dépannage d\'urgence, détection de fuites, remplacement de chauffe-eau, installation de robinetterie... Nos plombiers certifiés interviennent rapidement et efficacement pour résoudre tous vos problèmes de plomberie.',
                'short_description': 'Installation et réparation de tous équipements sanitaires',
                'icon': 'Plumbing',
                'order': 1
            },
            {
                'title': 'Rénovation de Salle de Bain',
                'description': 'Transformez votre salle de bain en un espace moderne et fonctionnel. De la conception à la réalisation, nous prenons en charge l\'intégralité de votre projet : démolition, plomberie, carrelage, électricité, pose de sanitaires et finitions. Douche italienne, baignoire, meuble vasque... nous créons la salle de bain de vos rêves.',
                'short_description': 'Création de salles de bain sur mesure',
                'icon': 'Bathroom',
                'order': 2
            },
            {
                'title': 'Rénovation de Cuisine',
                'description': 'Cuisine équipée, îlot central, plan de travail... nous réalisons votre cuisine idéale. Notre équipe coordonne tous les corps de métier (plomberie, électricité, carrelage, menuiserie) pour vous livrer une cuisine clé en main, fonctionnelle et esthétique.',
                'short_description': 'Conception et installation de cuisines équipées',
                'icon': 'Kitchen',
                'order': 3
            },
            {
                'title': 'Aménagement de Rangements',
                'description': 'Optimisez votre espace avec des solutions de rangement sur mesure. Placards, dressings, étagères murales, meubles sous escalier... nous créons des rangements parfaitement adaptés à votre configuration et vos besoins.',
                'short_description': 'Création d\'espaces de rangement optimisés',
                'icon': 'Inventory',
                'order': 4
            },
            {
                'title': 'Rénovation Complète',
                'description': 'Confiez-nous la rénovation intégrale de votre logement. Nous gérons l\'ensemble du projet de A à Z : démolition, gros œuvre, second œuvre (plomberie, électricité, isolation), revêtements, peinture et finitions. Un seul interlocuteur pour toutes vos rénovations.',
                'short_description': 'Rénovation totale de votre logement, clé en main',
                'icon': 'HomeRepairService',
                'order': 5
            },
            {
                'title': 'Travaux d\'Entretien',
                'description': 'Petits travaux de réparation, entretien régulier, dépannage... nous intervenons rapidement pour tous vos besoins du quotidien. Robinetterie, joints, petite plomberie, accroches murales, notre équipe est à votre écoute.',
                'short_description': 'Dépannage et petits travaux au quotidien',
                'icon': 'Build',
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
        bathroom_service = Service.objects.filter(title='Rénovation de Salle de Bain').first()
        kitchen_service = Service.objects.filter(title='Rénovation de Cuisine').first()
        storage_service = Service.objects.filter(title='Aménagement de Rangements').first()
        complete_service = Service.objects.filter(title='Rénovation Complète').first()

        projects_data = [
            {
                'title': 'Salle de Bain Moderne à Lattes',
                'description': 'Rénovation complète d\'une salle de bain de 9m² dans une maison à Lattes. Le projet incluait la démolition de l\'ancienne salle de bain, la création d\'une douche italienne avec paroi en verre, l\'installation d\'un meuble vasque double avec miroir lumineux, et la pose de carrelage grand format effet marbre.\n\nLes propriétaires souhaitaient une salle de bain lumineuse et spacieuse. Nous avons optimisé l\'espace en créant une douche à l\'italienne et en installant des rangements astucieux. Le résultat : un espace moderne, fonctionnel et élégant.',
                'short_description': 'Transformation complète avec douche italienne et finitions haut de gamme',
                'location': 'Lattes',
                'completion_date': date(2024, 9, 15),
                'duration': '2 semaines',
                'surface': '9 m²',
                'service': bathroom_service,
                'is_featured': True,
                'featured_image': 'https://picsum.photos/seed/bathroom1/800/600',
                'order': 1
            },
            {
                'title': 'Cuisine Ouverte à Pérols',
                'description': 'Création d\'une cuisine ouverte sur le salon dans un appartement à Pérols. Le projet comprenait la démolition du mur séparatif, l\'installation d\'une cuisine équipée avec îlot central, la réfection de la plomberie et de l\'électricité, et la pose de carrelage effet bois.\n\nL\'objectif était de créer un espace de vie convivial et lumineux. Nous avons conçu une cuisine fonctionnelle avec de nombreux rangements et un îlot central servant de coin repas. Le client est ravi du résultat qui a transformé son appartement.',
                'short_description': 'Ouverture d\'espace et installation d\'une cuisine moderne avec îlot',
                'location': 'Pérols',
                'completion_date': date(2024, 7, 20),
                'duration': '3 semaines',
                'surface': '15 m²',
                'service': kitchen_service,
                'is_featured': True,
                'featured_image': 'https://picsum.photos/seed/kitchen1/800/600',
                'order': 2
            },
            {
                'title': 'Dressing Sur Mesure à Montpellier',
                'description': 'Aménagement d\'un dressing sur mesure dans une chambre de 12m² à Montpellier. Création d\'une structure en bois avec étagères, penderies, tiroirs et éclairage LED intégré. Optimisation maximale de l\'espace disponible avec des solutions de rangement adaptées aux besoins du client.',
                'short_description': 'Rangement optimisé avec finitions soignées',
                'location': 'Montpellier',
                'completion_date': date(2024, 10, 5),
                'duration': '1 semaine',
                'surface': '8 m²',
                'service': storage_service,
                'is_featured': True,
                'featured_image': 'https://picsum.photos/seed/storage1/800/600',
                'order': 3
            },
            {
                'title': 'Rénovation Appartement Castelnau-le-Lez',
                'description': 'Rénovation complète d\'un appartement de 65m² à Castelnau-le-Lez. Le projet incluait la réfection complète de la salle de bain, la rénovation de la cuisine, la pose de parquet dans les chambres, la peinture de tous les murs et plafonds, et la mise aux normes électriques.\n\nTravaux réalisés en 6 semaines avec un souci constant de la qualité et du respect des délais. Le résultat : un appartement moderne et confortable, prêt à être habité.',
                'short_description': 'Rénovation totale d\'un appartement, tous corps d\'état',
                'location': 'Castelnau-le-Lez',
                'completion_date': date(2024, 6, 30),
                'duration': '6 semaines',
                'surface': '65 m²',
                'service': complete_service,
                'is_featured': False,
                'featured_image': 'https://picsum.photos/seed/apartment1/800/600',
                'order': 4
            },
            {
                'title': 'Salle de Bain Parentale à Palavas',
                'description': 'Création d\'une suite parentale avec salle de bain attenante dans une maison à Palavas-les-Flots. Installation d\'une baignoire îlot, double vasque, WC suspendu, et carrelage effet pierre naturelle. Ambiance spa pour un espace détente au quotidien.',
                'short_description': 'Suite parentale avec ambiance spa et matériaux nobles',
                'location': 'Palavas-les-Flots',
                'completion_date': date(2024, 8, 15),
                'duration': '3 semaines',
                'surface': '12 m²',
                'service': bathroom_service,
                'is_featured': False,
                'featured_image': 'https://picsum.photos/seed/bathroom2/800/600',
                'order': 5
            },
            {
                'title': 'Cuisine Équipée à Lattes',
                'description': 'Installation d\'une cuisine équipée dans une maison neuve à Lattes. Cuisine en L avec électroménager encastré, plan de travail en quartz, et crédence en verre. Raccordements plomberie et électricité, pose de carrelage. Une cuisine fonctionnelle et moderne.',
                'short_description': 'Installation complète avec électroménager et finitions haut de gamme',
                'location': 'Lattes',
                'completion_date': date(2024, 5, 10),
                'duration': '2 semaines',
                'surface': '12 m²',
                'service': kitchen_service,
                'is_featured': False,
                'featured_image': 'https://picsum.photos/seed/kitchen2/800/600',
                'order': 6
            }
        ]

        for project_data in projects_data:
            project, created = Project.objects.get_or_create(
                title=project_data['title'],
                defaults=project_data
            )
            if created:
                self.stdout.write(self.style.SUCCESS(f'✓ Project created: {project.title}'))

        # Create Testimonials
        testimonials_data = [
            {
                'client_name': 'Marie et Pierre D.',
                'client_location': 'Lattes',
                'content': 'Excellente équipe ! Notre salle de bain a été rénovée en seulement 2 semaines. Travail soigné, respect des délais et excellent conseil. Nous sommes ravis du résultat final, c\'est exactement ce que nous voulions !',
                'rating': 5,
                'order': 1
            },
            {
                'client_name': 'Sophie M.',
                'client_location': 'Pérols',
                'content': 'Très professionnels et à l\'écoute de nos besoins. La transformation de notre cuisine a dépassé nos attentes. L\'ouverture sur le salon a complètement changé notre façon de vivre. Je recommande vivement !',
                'rating': 5,
                'order': 2
            },
            {
                'client_name': 'Jean-Luc R.',
                'client_location': 'Montpellier',
                'content': 'Travail impeccable sur notre dressing. L\'équipe a su optimiser chaque centimètre d\'espace. Finitions soignées et respect du budget annoncé. Merci pour votre professionnalisme !',
                'rating': 5,
                'order': 3
            },
            {
                'client_name': 'Catherine L.',
                'client_location': 'Castelnau-le-Lez',
                'content': 'Rénovation complète de notre appartement gérée de A à Z. Aucun stress, tout était coordonné parfaitement. Les artisans sont compétents et respectueux. Excellent rapport qualité-prix.',
                'rating': 5,
                'order': 4
            },
            {
                'client_name': 'Marc et Isabelle P.',
                'client_location': 'Palavas-les-Flots',
                'content': 'Notre suite parentale est magnifique ! L\'ambiance spa que nous souhaitions est parfaitement réussie. Merci pour votre créativité et la qualité de votre travail. Nous n\'hésiterons pas à faire appel à vous pour nos futurs projets.',
                'rating': 5,
                'order': 5
            },
            {
                'client_name': 'Thomas B.',
                'client_location': 'Lattes',
                'content': 'Installation de notre cuisine dans les temps et dans les règles de l\'art. Équipe sympathique et de bon conseil. Le résultat est à la hauteur de nos espérances. Je recommande sans hésitation !',
                'rating': 5,
                'order': 6
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
        self.stdout.write(self.style.SUCCESS('\nTo clear data and reload: python manage.py create_demo_data --clear'))

