from django.shortcuts import render

def questionnaire(request):
    return render(request, 'questionnaire/questionnaire.html')