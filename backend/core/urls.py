from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import (
    CompanyInfoViewSet, ServiceViewSet, ProjectViewSet,
    TestimonialViewSet, ContactMessageViewSet, GalleryImageViewSet
)

router = DefaultRouter()
router.register(r'company-info', CompanyInfoViewSet, basename='company-info')
router.register(r'services', ServiceViewSet, basename='service')
router.register(r'projects', ProjectViewSet, basename='project')
router.register(r'testimonials', TestimonialViewSet, basename='testimonial')
router.register(r'contact', ContactMessageViewSet, basename='contact')
router.register(r'gallery', GalleryImageViewSet, basename='gallery')

urlpatterns = [
    path('', include(router.urls)),
]
