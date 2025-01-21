from django.shortcuts import render
from django.views.decorators.http import require_POST
#import json response
from django.http import JsonResponse
import json
from pprint import pprint

def chat(request):
    return render(request, 'chat/chat.html')

@require_POST
def send_message(request):
    message  = request.POST.get('message')
    return JsonResponse({'message':message})