<?php

namespace App\Http\Controllers;

use App\Reserve;
use Illuminate\Http\Request;
use App\Http\Requests\ReservarRequest;
use Illuminate\Support\Facades\DB;

class ReserveController extends Controller
{
    public function __construct()
    { }

    public function addR(ReservarRequest $r){
        try {
            DB::insert('INSERT INTO reserva(fechaReserva,horaInicio,horaFinal,espacio,users,vehiculo) VALUES(?,?,?,?,?,?)', [
                $r->fechaReserva,
                $r->horaInicio,
                $r->horaFinal,
                $r->espacio,
                $r->users,
                $r->vehiculo
            ]);
            return  response()->json(['data' => 'Added successfully'], 200);
        } catch (\Illuminate\Database\QueryException $e) {
            return  response()->json(['error' => $e], 409);
        }
    }
    public function list(Request $r){
        return DB::select('SELECT * FROM reserva WHERE users=?',[$r->users]);
    }
    public function delete(Request $r)
    {
        try {
            DB::insert('DELETE FROM reserva where id= ?', [$r->id]);
            return  response()->json(['data' => 'Removed'], 200);
        } catch (\Illuminate\Database\QueryException $e) {
            return  response()->json(['error' => 'No removed'], 409);
        }   
    }
}
