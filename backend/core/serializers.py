from rest_framework import serializers
from .models import CompanyInfo, Service, Project, ProjectImage, Testimonial, ContactMessage, GalleryImage


class CompanyInfoSerializer(serializers.ModelSerializer):
    class Meta:
        model = CompanyInfo
        fields = '__all__'


class ServiceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Service
        fields = '__all__'


class ProjectImageSerializer(serializers.ModelSerializer):
    image_url = serializers.SerializerMethodField()
    
    class Meta:
        model = ProjectImage
        fields = ['id', 'image', 'image_url', 'caption', 'is_visible', 'order']
    
    def get_image_url(self, obj):
        if obj.image:
            request = self.context.get('request')
            if request:
                return request.build_absolute_uri(obj.image.url)
        return None


class ProjectListSerializer(serializers.ModelSerializer):
    """Lighter serializer for project lists"""
    service_name = serializers.CharField(source='service.title', read_only=True)
    featured_image_url = serializers.SerializerMethodField()
    
    class Meta:
        model = Project
        fields = ['id', 'title', 'slug', 'short_description', 'location', 
                 'featured_image', 'featured_image_url', 'is_featured', 
                 'has_before_after', 'service_name', 'completion_date']
    
    def get_featured_image_url(self, obj):
        if obj.featured_image:
            request = self.context.get('request')
            if request:
                return request.build_absolute_uri(obj.featured_image.url)
        return None


class ProjectDetailSerializer(serializers.ModelSerializer):
    """Detailed serializer with all project information"""
    images = ProjectImageSerializer(many=True, read_only=True)
    service_name = serializers.CharField(source='service.title', read_only=True)
    featured_image_url = serializers.SerializerMethodField()
    before_image_url = serializers.SerializerMethodField()
    
    class Meta:
        model = Project
        fields = '__all__'
    
    def get_featured_image_url(self, obj):
        if obj.featured_image:
            request = self.context.get('request')
            if request:
                return request.build_absolute_uri(obj.featured_image.url)
        return None
    
    def get_before_image_url(self, obj):
        if obj.before_image:
            request = self.context.get('request')
            if request:
                return request.build_absolute_uri(obj.before_image.url)
        return None


class TestimonialSerializer(serializers.ModelSerializer):
    project_title = serializers.CharField(source='project.title', read_only=True)
    
    class Meta:
        model = Testimonial
        fields = '__all__'


class GalleryImageSerializer(serializers.ModelSerializer):
    image_url = serializers.SerializerMethodField()
    project_slug = serializers.CharField(source='linked_project.slug', read_only=True, allow_null=True)
    
    class Meta:
        model = GalleryImage
        fields = ['id', 'title', 'image', 'image_url', 'category', 'caption', 'project_slug', 'order']
    
    def get_image_url(self, obj):
        if obj.image:
            request = self.context.get('request')
            if request:
                return request.build_absolute_uri(obj.image.url)
        return None


class ContactMessageSerializer(serializers.ModelSerializer):
    class Meta:
        model = ContactMessage
        fields = ['id', 'name', 'email', 'phone', 'address', 'subject', 'message', 'created_at']
        read_only_fields = ['created_at']
