<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Admin extends Model
{
    protected $table = 'users';

    protected $fillable = [
        'nombre','id','telefono','direccion','tipo', 'email', 'password',
    ];
}
