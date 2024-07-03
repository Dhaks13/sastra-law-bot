from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from google.cloud import recaptchaenterprise_v1
from google.cloud.recaptchaenterprise_v1 import Assessment
import json

@csrf_exempt
def validate_recaptcha(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        project_id = 'vihara-1719645896610'
        recaptcha_key = '6LeP-gMqAAAAAKBnPq-tjdPwYuJIz6k-dldJOPul'
        token = data.get('token')
        recaptcha_action = data.get('signup')  # This should match the action in your frontend script

        response = create_assessment(project_id, recaptcha_key, token, recaptcha_action)

        if response and response.token_properties.valid:
            return JsonResponse({'success': True, 'score': response.risk_analysis.score})
        else:
            return JsonResponse({'success': False, 'error': 'Invalid reCAPTCHA'})
    return JsonResponse({'error': 'Invalid request'}, status=400)

def create_assessment(project_id: str, recaptcha_key: str, token: str, recaptcha_action: str) -> Assessment:
    client = recaptchaenterprise_v1.RecaptchaEnterpriseServiceClient()

    event = recaptchaenterprise_v1.Event()
    event.site_key = recaptcha_key
    event.token = token

    assessment = recaptchaenterprise_v1.Assessment()
    assessment.event = event

    project_name = f"projects/{project_id}"
    request = recaptchaenterprise_v1.CreateAssessmentRequest()
    request.assessment = assessment
    request.parent = project_name

    response = client.create_assessment(request)

    if not response.token_properties.valid:
        print(
            "The CreateAssessment call failed because the token was "
            + "invalid for the following reasons: "
            + str(response.token_properties.invalid_reason)
        )
        return

    if response.token_properties.action != recaptcha_action:
        print(
            "The action attribute in your reCAPTCHA tag does"
            + "not match the action you are expecting to score"
        )
        return
    return response
