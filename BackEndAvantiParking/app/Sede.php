<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Sede extends Model
{
    protected $table = 'sede';

    protected $fillable = [
       'idSede','nombre','canton','provincia','direccion',
   ];
}
