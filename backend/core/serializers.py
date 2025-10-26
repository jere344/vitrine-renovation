from rest_framework import serializers
from .models import CompanyInfo, Service, Project, ProjectImage, Testimonial, ContactMessage


class CompanyInfoSerializer(serializers.ModelSerializer):
    class Meta:
        model = CompanyInfo
        fields = '__all__'


class ServiceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Service
        fields = '__all__'


class ProjectImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProjectImage
        fields = ['id', 'image', 'caption', 'order']


class ProjectListSerializer(serializers.ModelSerializer):
    """Lighter serializer for project lists"""
    service_name = serializers.CharField(source='service.title', read_only=True)
    
    class Meta:
        model = Project
        fields = ['id', 'title', 'slug', 'short_description', 'location', 
                 'featured_image', 'is_featured', 'service_name', 'completion_date']


class ProjectDetailSerializer(serializers.ModelSerializer):
    """Detailed serializer with all project information"""
    images = ProjectImageSerializer(many=True, read_only=True)
    service_name = serializers.CharField(source='service.title', read_only=True)
    
    class Meta:
        model = Project
        fields = '__all__'


class TestimonialSerializer(serializers.ModelSerializer):
    project_title = serializers.CharField(source='project.title', read_only=True)
    
    class Meta:
        model = Testimonial
        fields = '__all__'


class ContactMessageSerializer(serializers.ModelSerializer):
    class Meta:
        model = ContactMessage
        fields = ['id', 'name', 'email', 'phone', 'subject', 'message', 'created_at']
        read_only_fields = ['created_at']
