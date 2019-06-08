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
        $space= Reserve::whereEspacio($r->espacio)->first();

        if(is_null($space)){
            try {
                DB::insert('INSERT INTO reserva(fechaReserva,horaInicio,horaFinal,espacio,users,vehiculo) VALUES(?,?,?,?,?,?)', [
                    $r->fechaReserva,
                    $r->horaInicio,
                    $r->horaFinal,
                    $r->espacio,
                    $r->users,
                    $r->vehiculo
                ]);
               // Reserve::create($r->all());
                return  response()->json(['data' => 'Added successfully'], 200);
            } catch (\Illuminate\Database\QueryException $e) {
                return  response()->json(['error' => $e], 409);
            }
        }else{
            return  response()->json(['error' => 'Exists'], 406);
        }
        
    }
    public function list(Request $r){
        $data= Reserve::where('users',$r->users)->get();
        return response()->json($data,200);
    }
    public function delete(Request $r)
    {
        $deleted = Reserve::where('id',$request->id)->delete($request->all());
        if($deleted){
            return  response()->json(['data' => 'User deleted successfully'], 200);
        }else{
            return  response()->json(['error' => 'User not removed'], 406);
        }
    }
}
