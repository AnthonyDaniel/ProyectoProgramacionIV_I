<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Vehicle extends Model
{
     protected $table = 'vehiculo';

     protected $fillable = [
        'placa','marca','modelo','imagenes','users',
    ];
}
