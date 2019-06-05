@component('mail::message')
# Change your password

Click on the button below to change password

@component('mail::button', ['url' => 'http://localhost:4200/response-password-reset?token='.
$token])
RESET PASSWORD
@endcomponent

Thanks,<br>
Avantica
@endcomponent
