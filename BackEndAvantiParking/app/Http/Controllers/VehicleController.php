<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Vehicle;
use App\User;
use App\Http\Requests\RegisterVehicleRequest;
use Illuminate\Support\Facades\DB;

class VehicleController extends Controller
{

    public function saveVehicle(RegisterVehicleRequest $request)
    {
        $user = User::whereEmail($request->users)->first();
     
         if (is_null($user)) {
             return response()->json(['error' => 'Not found'], 401);
         }else{
             Vehicle::create($request->all());
             return response()->json(['data' => 'Create vehicle success'], 200);
         }
    
    }
    public function getVehicle(Request $request)
    {
        $data=Vehicle::where('users',$request->users)->get();
        return response()->json($data,200);
    }
    public function updateVehicle(RegisterVehicleRequest $request)
    {
        $updated= Vehicle::where('telefono',$request->placa)->update($request->all());                  
        if($updated>0){
            return  response()->json(['data' => 'Updated successfully'], 200);
        }else{
            return  response()->json(['error' => 'Error! not updated '], 406);
        }
    
    }
    public function deleteVehicle(RegisterVehicleRequest $request)
    {

        $deleted = Vehicle::where('placa',$request->Plate)->delete($request->all());
        if($deleted){
            return  response()->json(['data' => 'Vehicle deleted successfully'], 200);
        }else{
            return  response()->json(['error' => 'Vehicle not removed'], 406);
        }
       
    }
}
