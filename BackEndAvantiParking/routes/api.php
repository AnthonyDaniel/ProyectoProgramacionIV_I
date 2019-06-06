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
    Route::post('getv', 'VehicleController@getVehicle');
    Route::post('updatev','VehicleController@updateVehicle');
    Route::post('deletev','VehicleController@deleteVehicle');

    //ADMIN
    //----------------------Users
    Route::post('registeru', 'AdminController@register');
    Route::get('getusers', 'AdminController@getUsers');
    Route::post('deleteu', 'AdminController@deleteUsers');
    Route::post('adminu', 'AdminController@adminUsers');
    //------------------------Sede------------------------
    Route::post('registers', 'AdminController@registerSede');
    Route::get('getsedes', 'AdminController@getSedes');
    Route::post('modifys', 'AdminController@modifySede');
    Route::post('deletes', 'AdminController@deleteSede');
    //-----------------------Parqueo-----------------------
    Route::post('registerp', 'AdminController@addParking');
    Route::get('getparqueo', 'AdminController@getParkingForSede');
    Route::post('deletep', 'AdminController@deleteParking'); 
    Route::post('modifyp', 'AdminController@modifyPark');
   //----------------------Vehicle-------------------------
    Route::post('getspace', 'AdminController@getSpaces');
    Route::post('mspace','AdminController@modifySpace');
    Route::post('dspace','AdminController@deleteSpace'); 
});