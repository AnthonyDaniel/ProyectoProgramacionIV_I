<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Vehicle;
use App\User;
use App\Http\Requests\RegisterVehicleRequest;

class VehicleController extends Controller
{

    public function saveVehicle(RegisterVehicleRequest $request){
        //'placa','marca','modelo','imagenes','users',

        $user = User::whereEmail($request->users)->first();
    
        if (is_null($user)) {
            return response()->json(['error' => 'Not found'], 401);
        }else{
            Vehicle::create($request->all());
            return response()->json(['data' => 'Create vehicle success'], 200);
        }
    }
    public function getVehicle(){
        $records=Vehiculo::all();
        return response()->json($records);
    }
    public function updateVehicle(Request $request){
       
    }
     public function deleteVehicle($licencePlate){
      if(isset($licencePlate)){
        $deleted=Post::where('placa',$licencePlate)->delete();
        if($deleted){
            $response=array(
                'status'    =>'success',
                'code'      =>200,
                'message'   =>'Eliminado correctamente'                
            );
        }else{
            $response=array(
                'status'    =>'error',
                'code'      =>400,
                'message'   =>'No se pudo eliminar, puede que el registro ya no exista'                
            );
        }
      }
    return response()->json($response,$response['code']);
   
  }
     
}
    
