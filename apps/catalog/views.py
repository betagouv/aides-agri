from django.shortcuts import render

def projects(request):
    return render(request, "catalog/projects/projects.html")