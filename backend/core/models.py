from django.db import models
from django.utils.text import slugify


class CompanyInfo(models.Model):
    """Singleton model for company information"""
    company_name = models.CharField(max_length=200, verbose_name="Nom de l'entreprise")
    tagline = models.CharField(max_length=300, verbose_name="Slogan", blank=True)
    description = models.TextField(verbose_name="Description")
    phone = models.CharField(max_length=20, verbose_name="Téléphone")
    email = models.EmailField(verbose_name="Email")
    address = models.TextField(verbose_name="Adresse")
    
    # Social Media
    facebook_url = models.URLField(blank=True, verbose_name="Facebook")
    instagram_url = models.URLField(blank=True, verbose_name="Instagram")
    linkedin_url = models.URLField(blank=True, verbose_name="LinkedIn")
    
    # SEO
    meta_description = models.CharField(max_length=160, blank=True, verbose_name="Meta Description")
    meta_keywords = models.CharField(max_length=255, blank=True, verbose_name="Mots-clés SEO")
    
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        verbose_name = "Informations de l'entreprise"
        verbose_name_plural = "Informations de l'entreprise"
    
    def __str__(self):
        return self.company_name
    
    def save(self, *args, **kwargs):
        # Ensure only one instance exists
        if not self.pk and CompanyInfo.objects.exists():
            raise ValueError("Une seule instance d'informations d'entreprise peut exister")
        return super().save(*args, **kwargs)


class Service(models.Model):
    """Services offered by the company"""
    title = models.CharField(max_length=200, verbose_name="Titre")
    slug = models.SlugField(unique=True, blank=True)
    description = models.TextField(verbose_name="Description")
    short_description = models.CharField(max_length=300, verbose_name="Description courte", blank=True)
    icon = models.CharField(max_length=50, verbose_name="Icône Material UI", default="HomeRepairService")
    image = models.URLField(max_length=500, blank=True, verbose_name="Image (URL)", 
                           default="https://picsum.photos/800/600")
    order = models.IntegerField(default=0, verbose_name="Ordre d'affichage")
    is_active = models.BooleanField(default=True, verbose_name="Actif")
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        verbose_name = "Service"
        verbose_name_plural = "Services"
        ordering = ['order', 'title']
    
    def __str__(self):
        return self.title
    
    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.title)
        super().save(*args, **kwargs)


class Project(models.Model):
    """Portfolio projects/realizations"""
    title = models.CharField(max_length=200, verbose_name="Titre")
    slug = models.SlugField(unique=True, blank=True)
    description = models.TextField(verbose_name="Description")
    short_description = models.CharField(max_length=300, verbose_name="Description courte", blank=True)
    location = models.CharField(max_length=200, verbose_name="Lieu", blank=True)
    completion_date = models.DateField(verbose_name="Date de réalisation", null=True, blank=True)
    duration = models.CharField(max_length=100, verbose_name="Durée des travaux", blank=True)
    surface = models.CharField(max_length=100, verbose_name="Surface", blank=True)
    service = models.ForeignKey(Service, on_delete=models.SET_NULL, null=True, blank=True, 
                                related_name='projects', verbose_name="Service associé")
    featured_image = models.URLField(max_length=500, verbose_name="Image principale (URL)", 
                                     default="https://picsum.photos/800/600")
    is_featured = models.BooleanField(default=False, verbose_name="Projet mis en avant")
    is_active = models.BooleanField(default=True, verbose_name="Actif")
    order = models.IntegerField(default=0, verbose_name="Ordre d'affichage")
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        verbose_name = "Projet"
        verbose_name_plural = "Projets"
        ordering = ['-is_featured', 'order', '-completion_date']
    
    def __str__(self):
        return self.title
    
    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.title)
        super().save(*args, **kwargs)


class ProjectImage(models.Model):
    """Additional images for a project"""
    project = models.ForeignKey(Project, on_delete=models.CASCADE, 
                               related_name='images', verbose_name="Projet")
    image = models.URLField(max_length=500, verbose_name="Image (URL)", 
                           default="https://picsum.photos/800/600")
    caption = models.CharField(max_length=200, blank=True, verbose_name="Légende")
    order = models.IntegerField(default=0, verbose_name="Ordre")
    created_at = models.DateTimeField(auto_now_add=True)
    
    class Meta:
        verbose_name = "Image de projet"
        verbose_name_plural = "Images de projet"
        ordering = ['order', 'created_at']
    
    def __str__(self):
        return f"{self.project.title} - Image {self.order}"


class Testimonial(models.Model):
    """Client testimonials"""
    client_name = models.CharField(max_length=200, verbose_name="Nom du client")
    client_location = models.CharField(max_length=200, verbose_name="Ville", blank=True)
    content = models.TextField(verbose_name="Témoignage")
    rating = models.IntegerField(default=5, verbose_name="Note (sur 5)", 
                                choices=[(i, str(i)) for i in range(1, 6)])
    project = models.ForeignKey(Project, on_delete=models.SET_NULL, null=True, blank=True,
                               related_name='testimonials', verbose_name="Projet associé")
    is_active = models.BooleanField(default=True, verbose_name="Actif")
    order = models.IntegerField(default=0, verbose_name="Ordre d'affichage")
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        verbose_name = "Témoignage"
        verbose_name_plural = "Témoignages"
        ordering = ['order', '-created_at']
    
    def __str__(self):
        return f"{self.client_name} - {self.rating}/5"


class ContactMessage(models.Model):
    """Contact form submissions"""
    STATUS_CHOICES = [
        ('new', 'Nouveau'),
        ('read', 'Lu'),
        ('replied', 'Répondu'),
        ('archived', 'Archivé'),
    ]
    
    name = models.CharField(max_length=200, verbose_name="Nom")
    email = models.EmailField(verbose_name="Email")
    phone = models.CharField(max_length=20, verbose_name="Téléphone", blank=True)
    subject = models.CharField(max_length=200, verbose_name="Sujet", blank=True)
    message = models.TextField(verbose_name="Message")
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='new', verbose_name="Statut")
    created_at = models.DateTimeField(auto_now_add=True, verbose_name="Date de réception")
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        verbose_name = "Message de contact"
        verbose_name_plural = "Messages de contact"
        ordering = ['-created_at']
    
    def __str__(self):
        return f"{self.name} - {self.created_at.strftime('%d/%m/%Y')}"

