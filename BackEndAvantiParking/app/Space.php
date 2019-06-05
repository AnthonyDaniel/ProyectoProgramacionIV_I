<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Space extends Model
{
    protected $table = 'espacio';

    protected $fillable = [
       'idEspacio','estado','tipoEspacio','zona','parqueo','users'
   ];
}
