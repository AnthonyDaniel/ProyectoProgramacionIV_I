<?php
Route::group([

    'middleware' => 'api',

], function ($router) {

    //USER
    Route::post('login', 'AuthController@login');
    Route::post('signup', 'AuthController@signup');
    Route::post('logout', 'AuthController@logout');
    Route::post('refresh', 'AuthController@refresh');
    Route::post('me', 'AuthController@me');
    Route::post('delete', 'AuthController@delete');
    Route::post('checkpassword', 'AuthController@checkPassword');
    Route::post('updaten', 'AuthController@updated');
    Route::post('upload', 'AuthController@upload');

    //PASSWORD
    Route::post('sendPasswordResetLink', 'ResetPasswordController@sendEmail');
    Route::post('resetPassword', 'ChangePasswordController@process');

    //VEHICLE
    Route::post('savev', 'VehicleController@saveVehicle');
    Route::get('getv', 'VehicleController@getVehicle');
    Route::post('updatev','VehicleController@updateVehicle');
    Route::post('deletev','VehicleController@deleteVehicle');

    //ADMIN
    Route::post('registeru', 'AdminController@register');
    Route::get('getusers', 'AdminController@getUsers');

});