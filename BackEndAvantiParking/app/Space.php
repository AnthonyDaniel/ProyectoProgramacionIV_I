<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Space extends Model
{
    protected $table = 'reserva';

    protected $fillable = [
       'id','fechaReserva','horaInicio','horaFinal','users','espacio','vehiculo'
   ];
}
