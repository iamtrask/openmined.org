from django.shortcuts import render

# Create your views here.


def team_map(request):
    return render(request, 'team.html')
