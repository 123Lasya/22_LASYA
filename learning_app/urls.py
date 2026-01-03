from django.urls import path
from . import views

urlpatterns = [
    path('', views.index, name='index'),
    path('concept/', views.concept_page, name='concept'),
    path('story/', views.story_page, name='story'),
    path('coding/', views.coding_page, name='coding'),
    path('evaluation/', views.evaluation_page, name='evaluation'),
    path('api/generate-story/', views.generate_story_api, name='generate_story'),
    path('roadmap/', views.roadmap_page, name='roadmap'),
    path('api/evaluate-code/', views.evaluate_code_api, name='evaluate_code'),
] 