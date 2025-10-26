from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response
from django.shortcuts import get_object_or_404
from .models import CompanyInfo, Service, Project, Testimonial, ContactMessage
from .serializers import (
    CompanyInfoSerializer, ServiceSerializer, 
    ProjectListSerializer, ProjectDetailSerializer,
    TestimonialSerializer, ContactMessageSerializer
)
from django.conf import settings
from django.core.mail import send_mail, BadHeaderError
from django.template.loader import render_to_string
from django.utils.html import strip_tags


class CompanyInfoViewSet(viewsets.ReadOnlyModelViewSet):
    """
    API endpoint for company information.
    Only GET requests are allowed (read-only).
    """
    queryset = CompanyInfo.objects.all()
    serializer_class = CompanyInfoSerializer
    
    def list(self, request):
        """Return the single company info instance"""
        company_info = CompanyInfo.objects.first()
        if company_info:
            serializer = self.get_serializer(company_info)
            return Response(serializer.data)
        return Response({}, status=status.HTTP_404_NOT_FOUND)


class ServiceViewSet(viewsets.ReadOnlyModelViewSet):
    """
    API endpoint for services.
    list: Get all active services
    retrieve: Get a specific service by slug
    """
    queryset = Service.objects.filter(is_active=True)
    serializer_class = ServiceSerializer
    lookup_field = 'slug'


class ProjectViewSet(viewsets.ReadOnlyModelViewSet):
    """
    API endpoint for projects.
    list: Get all active projects
    retrieve: Get a specific project by slug with full details
    featured: Get featured projects only
    """
    queryset = Project.objects.filter(is_active=True)
    lookup_field = 'slug'
    
    def get_serializer_class(self):  # type: ignore[override]
        if self.action == 'retrieve':
            return ProjectDetailSerializer
        return ProjectListSerializer
    
    @action(detail=False, methods=['get'])
    def featured(self, request):
        """Get only featured projects"""
        featured_projects = self.queryset.filter(is_featured=True)
        serializer = ProjectListSerializer(featured_projects, many=True)
        return Response(serializer.data)


class TestimonialViewSet(viewsets.ReadOnlyModelViewSet):
    """
    API endpoint for testimonials.
    list: Get all active testimonials
    """
    queryset = Testimonial.objects.filter(is_active=True)
    serializer_class = TestimonialSerializer


class ContactMessageViewSet(viewsets.ModelViewSet):
    """
    API endpoint for contact messages.
    Only POST is allowed for creating new messages.
    """
    queryset = ContactMessage.objects.all()
    serializer_class = ContactMessageSerializer
    http_method_names = ['post']  # Only allow POST requests
    
    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)

        # Send notification email to site owner (non-blocking)
        try:
            owner_email = getattr(settings, 'SITE_OWNER_EMAIL', None)
            if owner_email:
                data = serializer.validated_data
                subject = f"Nouveau message de contact: {data.get('subject') or 'Sans sujet'}"
                # Render a simple HTML email (fallback to plain text)
                html_message = render_to_string('emails/new_contact.html', {'data': data})
                plain_message = strip_tags(html_message) if html_message else data.get('message', '')
                send_mail(
                    subject=subject,
                    message=plain_message,
                    from_email=getattr(settings, 'DEFAULT_FROM_EMAIL', None),
                    recipient_list=[owner_email],
                    html_message=html_message if html_message else None,
                    fail_silently=True,
                )
        except BadHeaderError:
            # Don't fail the request if email headers are bad
            pass

        return Response(
            {'message': 'Votre message a été envoyé avec succès. Nous vous recontacterons bientôt.'},
            status=status.HTTP_201_CREATED
        )

