<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class ParkingLot extends Model
{
    protected $table = 'parqueo';

    protected $fillable = [
       'idParqueo','nombre','zona','cantidad','sede',
   ];
}
