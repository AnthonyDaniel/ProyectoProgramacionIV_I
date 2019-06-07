<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Reserve extends Model
{
    protected $table = 'reserva';

    protected $fillable = [
       'id','fechaReserva','horaInicio','horaFinal','espacio','users','vechiculo'
   ];
}
