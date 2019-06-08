<?php

namespace App\Http\Controllers;

use App\Sede;
use App\Admin;
use App\Space;
use App\ParkingLot;
use Illuminate\Http\Request;
use App\Http\Requests\modifySede;
use App\Http\Requests\ModifySpace;
use App\Http\Requests\AdminRequest;
use App\Http\Requests\RegisterSede;
use App\Http\Requests\RParkingLot;
use Illuminate\Support\Facades\DB;
use App\Http\Requests\ParkingModify;

class AdminController extends Controller
{
    public function __construct()
    { }

    public function register(AdminRequest $request)
    {
         
        $user = Admin::whereEmail($request->email)->first();
     
        if (is_null($user)) {
            Admin::create($request->all());
            return response()->json(['data' => 'Create vehicle success'], 200);
        }else{
            return response()->json(['error' => 'Not found'], 401);
        }
        
    }

    public function getUsers()
    {
        return Admin::all();
    }

    public function deleteUsers(Request $request)
    {
        $deleted = Admin::where('email',$request->email)->delete($request->all());
        if($deleted){
            return  response()->json(['data' => 'User deleted successfully'], 200);
        }else{
            return  response()->json(['error' => 'User not removed'], 406);
        }
    }

    public function adminUsers(Request $request)
    {
        $updated= Admin::where('email',$request->email)->update($request->all());                  
        if($updated>0){
            return  response()->json(['data' => 'Updated successfully'], 200);
        }else{
            return  response()->json(['error' => 'Error! not updated '], 406);
        }
    }
    public function registerSede(RegisterSede $request)
    {
        Sede::create($request->all());
        return response()->json(['data' => 'Create sede success'], 200);
       
    }
    public function getSedes()
    {
        return Sede::all();
    }
    public function modifySede(modifySede $request)
    {
        $updated= Sede::where('idSede',$request->idSede)->update($request->all());                  
        if($updated>0){
            return  response()->json(['data' => 'Updated successfully'], 200);
        }else{
            return  response()->json(['error' => 'Error! not updated '], 406);
        }
    }
    public function deleteSede(Request $request)
    {
        $deleted = Sede::where('idSede',$request->idSede)->delete($request->all());
        if($deleted){
            return  response()->json(['data' => 'Sede deleted successfully'], 200);
        }else{
            return  response()->json(['error' => 'Sede not removed'], 406);
        }
    }
    public function addParking(RParkingLot $request)
    {
        try {
            ParkingLot::create($request->all());
            for ($i = 0; $i < $request->cantidad; $i++) {
                
                DB::insert('INSERT INTO espacio(idEspacio,parqueo) VALUES(?,?)', [
                    $request->zona. ":".($i + 1),
                    $request->idParqueo
                ]);
            }
            return  response()->json(['data' => 'Added successfully'], 200);
        } catch (\Illuminate\Database\QueryException $e) {
            return  response()->json(['error' => $e], 409);
        }
    }
    public function getParkingForSede()
    {
        return  ParkingLot::all();
    }
    public function modifyPark(ParkingModify $request)
    {
        $updated= ParkingLot::where('idParqueo',$request->idParqueo)->update($request->all());                  
        if($updated>0){
            return  response()->json(['data' => 'Updated successfully'], 200);
        }else{
            return  response()->json(['error' => 'Error! not updated '], 406);
        }
    }
    public function deleteParking(Request $request)
    {
        $deleted = ParkingLot::where('idParqueo',$request->idParqueo)->delete($request->all());
        if($deleted){
            return  response()->json(['data' => 'Sede deleted successfully'], 200);
        }else{
            return  response()->json(['error' => 'Sede not removed'], 406);
        }
    }
    public function getSpaces(Request $request)
    {
        try {
           
         $data=Space::where('parqueo',$request->idParqueo)->get();
           return response()->json($data,200);
           // $resut = DB::select("SELECT * FROM espacio WHERE parqueo=?", [$request->idParqueo]);
            //return  response()->json($resut, 200);
        } catch (\Illuminate\Database\QueryException $e) {
            return  response()->json(['error' => $e], 409);
        }
    }
    public function modifySpace(ModifySpace $request){
        $updated= Space::where('idEspacio',$request->idEspacio)->update($request->all());                  
        if($updated>0){
            return  response()->json(['data' => 'Updated successfully'], 200);
        }else{
            return  response()->json(['error' => 'Error! not updated '], 406);
        }
    }
    public function deleteSpace(Request $request)
    {
        try {
            Space::where('idEspacio',$request->idEspacio)->delete($request->all());
       
            $e = DB::select('SELECT count(idEspacio) as t FROM espacio Where parqueo=?', [$request->parqueo]);
            foreach($e as $t){
             $cantidad = $t->t;
            } 
            Space::where('idParqueo',$request->idParqueo)->update($request->all());    
            return  response()->json(['data' => 'Removed'], 200);
        } catch (\Illuminate\Database\QueryException $e) {
            return  response()->json(['error' => $e], 409);
        }
    }
}
