from django.contrib import admin
from django.utils.html import format_html
from .models import CompanyInfo, Service, Project, ProjectImage, Testimonial, ContactMessage, GalleryImage


@admin.register(CompanyInfo)
class CompanyInfoAdmin(admin.ModelAdmin):
    list_display = ['company_name', 'phone', 'email', 'updated_at']
    fieldsets = (
        ('Informations générales', {
            'fields': ('company_name', 'tagline', 'description')
        }),
        ('Contact', {
            'fields': ('phone', 'email', 'address')
        }),
        ('Réseaux sociaux', {
            'fields': ('facebook_url', 'instagram_url', 'linkedin_url')
        }),
        ('SEO', {
            'fields': ('meta_description', 'meta_keywords')
        }),
    )
    
    def has_add_permission(self, request):
        # Prevent adding more than one instance
        return not CompanyInfo.objects.exists()
    
    def has_delete_permission(self, request, obj=None):
        # Prevent deletion
        return False


@admin.register(Service)
class ServiceAdmin(admin.ModelAdmin):
    list_display = ['title', 'order', 'is_active', 'updated_at']
    list_filter = ['is_active']
    search_fields = ['title', 'description']
    prepopulated_fields = {'slug': ('title',)}
    list_editable = ['order', 'is_active']
    ordering = ['order', 'title']


class ProjectImageInline(admin.TabularInline):
    model = ProjectImage
    extra = 1
    fields = ['image', 'caption', 'is_visible', 'order']
    readonly_fields = ['image_preview']
    
    def image_preview(self, obj):
        if obj.image:
            return format_html('<img src="{}" style="max-height: 100px; max-width: 150px;" />', obj.image.url)
        return "-"
    image_preview.short_description = "Aperçu"


@admin.register(Project)
class ProjectAdmin(admin.ModelAdmin):
    list_display = ['title', 'service', 'location', 'completion_date', 'has_before_after', 'is_featured', 'is_active', 'order']
    list_filter = ['is_active', 'is_featured', 'has_before_after', 'service', 'completion_date']
    search_fields = ['title', 'description', 'location', 'slug']
    prepopulated_fields = {'slug': ('title',)}
    list_editable = ['is_featured', 'is_active', 'order']
    ordering = ['-is_featured', 'order', '-completion_date']
    inlines = [ProjectImageInline]
    readonly_fields = ['featured_image_preview', 'before_image_preview']
    fieldsets = (
        ('Informations principales', {
            'fields': ('title', 'slug', 'service')
        }),
        ('Images', {
            'fields': ('featured_image', 'featured_image_preview', 'before_image', 'before_image_preview')
        }),
        ('Description', {
            'fields': ('short_description', 'description')
        }),
        ('Détails du projet', {
            'fields': ('location', 'completion_date', 'duration', 'surface')
        }),
        ('Options', {
            'fields': ('is_featured', 'has_before_after', 'is_active', 'order')
        }),
    )
    
    def featured_image_preview(self, obj):
        if obj.featured_image:
            return format_html('<img src="{}" style="max-height: 200px; max-width: 300px;" />', obj.featured_image.url)
        return "-"
    featured_image_preview.short_description = "Aperçu image principale"
    
    def before_image_preview(self, obj):
        if obj.before_image:
            return format_html('<img src="{}" style="max-height: 200px; max-width: 300px;" />', obj.before_image.url)
        return "-"
    before_image_preview.short_description = "Aperçu image avant"


@admin.register(Testimonial)
class TestimonialAdmin(admin.ModelAdmin):
    list_display = ['client_name', 'client_location', 'rating', 'project', 'is_active', 'order']
    list_filter = ['is_active', 'rating']
    search_fields = ['client_name', 'client_location', 'content']
    list_editable = ['is_active', 'order']
    ordering = ['order', '-created_at']


@admin.register(GalleryImage)
class GalleryImageAdmin(admin.ModelAdmin):
    list_display = ['title', 'linked_project', 'category', 'is_active', 'order', 'image_thumbnail']
    list_filter = ['is_active', 'category', 'linked_project']
    search_fields = ['title', 'caption']
    list_editable = ['is_active', 'order']
    ordering = ['order', '-created_at']
    readonly_fields = ['image_preview']
    autocomplete_fields = ['linked_project']
    
    fieldsets = (
        ('Informations', {
            'fields': ('title', 'image', 'image_preview', 'category', 'caption')
        }),
        ('Lien vers projet', {
            'fields': ('linked_project',),
            'description': 'Sélectionnez un projet pour créer un lien cliquable depuis cette image'
        }),
        ('Options', {
            'fields': ('is_active', 'order')
        }),
    )
    
    def image_thumbnail(self, obj):
        if obj.image:
            return format_html('<img src="{}" style="max-height: 50px; max-width: 75px; border-radius: 4px;" />', obj.image.url)
        return "-"
    image_thumbnail.short_description = "Image"
    
    def image_preview(self, obj):
        if obj.image:
            return format_html('<img src="{}" style="max-height: 300px; max-width: 450px;" />', obj.image.url)
        return "-"
    image_preview.short_description = "Aperçu"


@admin.register(ContactMessage)
class ContactMessageAdmin(admin.ModelAdmin):
    list_display = ['name', 'email', 'subject', 'status', 'created_at']
    list_filter = ['status', 'created_at']
    search_fields = ['name', 'email', 'subject', 'message']
    list_editable = ['status']
    ordering = ['-created_at']
    readonly_fields = ['name', 'email', 'phone', 'subject', 'message', 'created_at']
    
    def has_add_permission(self, request):
        # Messages are created via the frontend only
        return False

