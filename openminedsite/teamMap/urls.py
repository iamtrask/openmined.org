from django.conf.urls import url
from . import views
urlpatterns = [
    url(r'team_map/$', views.team_map)
]
