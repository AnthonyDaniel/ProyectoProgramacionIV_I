<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Vehicle;
use App\User;
use App\Http\Requests\RegisterVehicleRequest;

class VehicleController extends Controller
{

    public function saveVehicle(RegisterVehicleRequest $request){
        $user = User::whereEmail($request->users)->first();
    
        if (is_null($user)) {
            return response()->json(['error' => 'Not found'], 401);
        }else{
            Vehicle::create($request->all());
            return response()->json(['data' => 'Create vehicle success'], 200);
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

        //return $request;
        return $request;
        //$vehicle = Vehicle::where('placa',$lPlate)->delete($request->all());

        //return response()->json(['data' => 'Delete vehicle success'], 200);
    }
     
}
    
