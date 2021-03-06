<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Vehicle;
use App\User;
use App\Http\Requests\RegisterVehicleRequest;
use Illuminate\Support\Facades\DB;
use Illuminate\Http\Response;
use PhpParser\Node\Stmt\TryCatch;

class VehicleController extends Controller
{

    public function saveVehicle(RegisterVehicleRequest $request)
    {
        try {
            Vehicle::create($request->all());
            return response()->json(['data' => 'Create vehicle success'], 200);
            
        } catch (\Throwable $th) {
            return  response()->json(['error' => 'Data error'], 406);
        }
        
    
    }
    public function getVehicle(Request $request)
    {
        $data=Vehicle::where('users',$request->users)->get();
        return response()->json($data,200);
    }
    public function updateVehicle(RegisterVehicleRequest $request)
    {
        try {
            Vehicle::where('placa',$request->placa)->update($request->all());                  
            return  response()->json(['data' => 'Updated successfully'], 200);
        } catch (\Throwable $th) {
            return  response()->json(['error' => 'Error! not updated '], 406);
        }
    }
    public function deleteVehicle(RegisterVehicleRequest $request)
    {

        $deleted = Vehicle::where('placa',$request->placa)->delete($request->all());
        if($deleted){
            return  response()->json(['data' => 'Vehicle deleted successfully'], 200);
        }else{
            return  response()->json(['error' => 'Vehicle not removed'], 406);
        }
       
    }
    public function upload(Request $request)
    {
        $image = $request->file('file0');

        try {
            $image_name = time() . $image->getClientOriginalName();
            \Storage::disk('vehicle')->put($image_name, \File::get($image));
            $response = array(
                'status'    => 'success',
                'code'      => 200,
                'image' =>$image_name,
                'message'   => 'Imagen cargada satisfactoriamente'
            );

            return response()->json($response, $response['code']);
        } catch (\Throwable $th) {
            return response()->json(['error' => 'Not upload'], 406);
        }
    }
    public function avatar($filename)
    {
        $exist = \Storage::disk('vehicle')->exists($filename);
        if ($exist) {
            $file = \Storage::disk('vehicle')->get($filename);
            return new Response($file, 200);
        } else {
            $response = array(
                'status'    => 'error',
                'code'      => 404,
                'message'   => 'Imagen no exite'
            );
            return response()->json($response, $response['code']);
        }
    }

   
}
