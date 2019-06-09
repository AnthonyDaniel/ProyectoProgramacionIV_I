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

        $space= Reserve::where('espacio', $r->espacio)->first();
        $date= Reserve::where('fechaReserva', $r->fechaReserva)->first();
        $eTime= Reserve::where('horaFinal', $r->horaFinal)->get();

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
          if (is_null($date)) {
           // return  response()->json(['data' => 'date  no exists'], 409);
            DB::insert('INSERT INTO reserva(fechaReserva,horaInicio,horaFinal,espacio,users,vehiculo) VALUES(?,?,?,?,?,?)', [
                $r->fechaReserva,
                $r->horaInicio,
                $r->horaFinal,
                $r->espacio,
                $r->users,
                $r->vehiculo
            ]);
                return  response()->json(['data' => 'Added successfully'], 200);
        
          }else{
         
            if ($r->horaInicio > $eTime) {
                // return  response()->json(['data' => 'time is good '], 409);
                // Reserve::create($r->all());
                DB::insert('INSERT INTO reserva(fechaReserva,horaInicio,horaFinal,espacio,users,vehiculo) VALUES(?,?,?,?,?,?)', [
                    $r->fechaReserva,
                    $r->horaInicio,
                    $r->horaFinal,
                    $r->espacio,
                    $r->users,
                    $r->vehiculo
                ]);
                return  response()->json(['data' => 'Added successfully'], 200);
            } else {
                 return  response()->json(['data' => 'time is higer'], 409);
            }
            //return  response()->json(['data' => 'date exists'], 409);
          }
        return  response()->json(['data' => 'exists'], 409);
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
