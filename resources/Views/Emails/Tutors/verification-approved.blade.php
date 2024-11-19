@component('mail::message')
# Tutor Verification Approved

Dear {{ $tutorProfile->user->name }},

Congratulations! Your tutor profile on Eduora has been verified. You can now start accepting student offerings and providing tutoring services.

## Profile Details:
- **Expertise Level**: {{ $tutorProfile->expertise_level }}
- **University**: {{ $tutorProfile->university }}
- **Major**: {{ $tutorProfile->major }}

@component('mail::button', ['url' => route('tutors.show', $tutorProfile->id)])
View Your Profile
@endcomponent

You can now:
- Accept student offerings
- Set your availability
- Start tutoring sessions
- Earn through our platform

If you have any questions, please don't hesitate to contact our support team.

Best regards,<br>
{{ config('app.name') }}
@endcomponent