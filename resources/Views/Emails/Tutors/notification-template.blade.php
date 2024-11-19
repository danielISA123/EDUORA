<x-mail::message>
# {{ $title }}

{{ $greeting }}

{{ $mainContent }}

@if(isset($reason))
**Reason:** {{ $reason }}
@endif

@if(isset($actionText))
<x-mail::button :url="$actionUrl">
{{ $actionText }}
</x-mail::button>
@endif

{{ $closing }}

Thanks,<br>
{{ config('app.name') }}
</x-mail::message>