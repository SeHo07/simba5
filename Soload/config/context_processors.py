from django.conf import settings
from main.models import Profile

def global_data(request):
    data = {'BRAND_NAME': 'Soload', 'KAKAO_APP_KEY': settings.KAKAO_APP_KEY}
    if request.user.is_authenticated:
        profile, created = Profile.objects.get_or_create(user=request.user)
        data['user_profile'] = profile
    return data