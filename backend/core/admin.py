from django.contrib import admin
from .models import CompanyInfo, Service, Project, ProjectImage, Testimonial, ContactMessage


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
    fields = ['image', 'caption', 'order']


@admin.register(Project)
class ProjectAdmin(admin.ModelAdmin):
    list_display = ['title', 'service', 'location', 'completion_date', 'is_featured', 'is_active', 'order']
    list_filter = ['is_active', 'is_featured', 'service', 'completion_date']
    search_fields = ['title', 'description', 'location']
    prepopulated_fields = {'slug': ('title',)}
    list_editable = ['is_featured', 'is_active', 'order']
    ordering = ['-is_featured', 'order', '-completion_date']
    inlines = [ProjectImageInline]
    fieldsets = (
        ('Informations principales', {
            'fields': ('title', 'slug', 'service', 'featured_image')
        }),
        ('Description', {
            'fields': ('short_description', 'description')
        }),
        ('Détails du projet', {
            'fields': ('location', 'completion_date', 'duration', 'surface')
        }),
        ('Options', {
            'fields': ('is_featured', 'is_active', 'order')
        }),
    )


@admin.register(Testimonial)
class TestimonialAdmin(admin.ModelAdmin):
    list_display = ['client_name', 'client_location', 'rating', 'project', 'is_active', 'order']
    list_filter = ['is_active', 'rating']
    search_fields = ['client_name', 'client_location', 'content']
    list_editable = ['is_active', 'order']
    ordering = ['order', '-created_at']


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

