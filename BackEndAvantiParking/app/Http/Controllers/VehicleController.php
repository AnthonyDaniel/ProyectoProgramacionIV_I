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
            return  response()->json(['data' => 'Inserted'], 200);
        } catch (\Illuminate\Database\QueryException $e) {
            return  response()->json(['error' => 'Not added'], 409);
        }
       
    }
    public function getVehicle(){

        return Vehicle::all();

    }
    public function updateVehicle(Request $request){
        //vehicle = Vehicle::where('placa',$lPlate)->update($request->all());

        //return response()->json(['data' => 'Update vehicle success'], 200);
       
       
    }
     public function deleteVehicle(RegisterVehicleRequest $request){
var_dump('sdsd');

        //return $request;
        
        //$vehicle = Vehicle::where('placa',$lPlate)->delete($request->all());

        //return response()->json(['data' => 'Delete vehicle success'], 200);
      
        DB::table('vehiculo')->where('placa', '=', 'saa')->delete();
        return $request;
    }
     
}
    
