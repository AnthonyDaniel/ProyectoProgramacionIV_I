<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Vehicle;
use App\User;
use App\Http\Requests\RegisterVehicleRequest;
use Illuminate\Support\Facades\DB;

class VehicleController extends Controller
{

    public function saveVehicle(RegisterVehicleRequest $request){
       // $user = User::whereEmail($request->users)->first();
    
        //if (is_null($user)) {
        //    return response()->json(['error' => 'Not found'], 401);
        //}else{
          //  Vehicle::create($request->all());
            //return response()->json(['data' => 'Create vehicle success'], 200);
        //}
        try {
            DB::insert('INSERT INTO vehiculo(placa, marca, modelo,users) VALUES(?,?,?,?)',[
                $request->placa,
                $request->marca,
                $request->modelo,
                $request->users,
            ]); 
            return  response()->json(['data' => 'Added successfully'], 200);
        } catch (\Illuminate\Database\QueryException $e) {
            return  response()->json(['error' => 'Incorrect data'], 409);
        }
       
    }
    public function getVehicle(RegisterVehicleRequest $request){

        try { 
            DB::select('SELECT * FROM vehiculo WHERE users= ?', [ $request->users]);
            return  response()->json(['data' => 'Updated successfully'], 200);
        } catch (\Illuminate\Database\QueryException $e) {
            return  response()->json(['error' => 'Error! not updated '], 406);
        }

    }
    public function updateVehicle(RegisterVehicleRequest $request){

        //pruebas
        try { // La placa no se modifica aja solo estoy indicando donde modificar, pero digamos, aqui yo deberia especificar no a uno
            DB::update('UPDATE vehiculo set marca = ?, modelo = ? where placa= ?', [ $request->marca, $request->modelo ,$request->placa]);
            //$user->update(['nombre'=>$request->nombre]);
            return  response()->json(['data' => 'Updated successfully'], 200);
        } catch (\Illuminate\Database\QueryException $e) {
            return  response()->json(['error' => 'Error! not updated '], 406);
        }
        //vehicle = Vehicle::where('placa',$lPlate)->update($request->all());

        //return response()->json(['data' => 'Update vehicle success'], 200);
       
       
    }
     public function deleteVehicle(RegisterVehicleRequest $request){

    try {
        DB::delete('DELETE FROM vehiculo WHERE placa= ?', [$request->placa]);
        //$user->update(['telefono'=>$request->telefono]);
        return  response()->json(['data' => 'Vehicle deleted successfully'], 200);
    } catch (\Illuminate\Database\QueryException $e) {
        return  response()->json(['error' => 'Vehicle not removed'], 406);
    }

        //return $request;
        
        //$vehicle = Vehicle::where('placa',$lPlate)->delete($request->all());

        //return response()->json(['data' => 'Delete vehicle success'], 200);
     
    }
     
}
    
