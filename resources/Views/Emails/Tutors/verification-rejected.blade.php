@component('mail::message')
# Tutor Verification Update

Dear {{ $tutorProfile->user->name }},

We have reviewed your tutor profile application for Eduora. Unfortunately, we cannot verify your profile at this time.

@if($tutorProfile->verification_note)
## Reason for Rejection:
{{ $tutorProfile->verification_note }}
@endif

## What You Can Do:
1. Review the verification requirements
2. Update your profile information
3. Submit your documents again
4. Reapply for verification

@component('mail::button', ['url' => route('tutors.edit', $tutorProfile->id)])
Update Your Profile
@endcomponent

If you need assistance or have questions about the verification process, please contact our support team.

Best regards,<br>
{{ config('app.name') }}
@endcomponent