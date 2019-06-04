<?php

namespace App\Http\Controllers;

use App\Sede;
use App\Admin;
use App\ParkingLot;
use Illuminate\Http\Request;
use App\Http\Requests\modifySede;
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
        try {
            DB::insert('INSERT INTO users(nombre, id, email,telefono,direccion,password) VALUES(?,?,?,?,?,?)', [
                $request->nombre,
                $request->id,
                $request->email,
                $request->telefono,
                $request->direccion,
                bcrypt($request->password)
            ]);
            return  response()->json(['data' => 'Added successfully'], 200);
        } catch (\Illuminate\Database\QueryException $e) {
            return  response()->json(['error' => 'Incorrect data'], 409);
        }
    }

    public function getUsers()
    {
        return Admin::all();
    }

    public function deleteUsers(Request $request)
    {
        try {
            DB::insert('DELETE FROM users where email= ?', [$request->email]);
            return  response()->json(['data' => 'Removed'], 200);
        } catch (\Illuminate\Database\QueryException $e) {
            return  response()->json(['error' => 'No removed'], 409);
        }
    }

    public function adminUsers(Request $request)
    {
        try {
            DB::update('UPDATE users set tipo = ? where email= ?', [$request->tipo, $request->email]);
            return  response()->json(['data' => 'Updated'], 200);
        } catch (\Illuminate\Database\QueryException $e) {
            return  response()->json(['error' => 'Type no updated '], 406);
        }
    }
    public function registerSede(RegisterSede $request)
    {
        try {
            DB::insert('INSERT INTO sede(idSede, nombre, provincia,canton,direccion) VALUES(?,?,?,?,?)', [
                $request->idSede,
                $request->nombre,
                $request->provincia,
                $request->canton,
                $request->direccion,
            ]);
            return  response()->json(['data' => 'Added successfully'], 200);
        } catch (\Illuminate\Database\QueryException $e) {
            return  response()->json(['error' => 'Incorrect data'], 409);
        }
    }
    public function getSedes()
    {
        return Sede::all();
    }
    public function modifySede(modifySede $request)
    {
        try {
            DB::update('UPDATE sede set nombre = ?,direccion = ?, canton = ?, provincia = ? where idSede= ?', [$request->nombre,$request->direccion,$request->canton,$request->provincia, $request->idSede]);
            return  response()->json(['data' => 'Updated'], 200);
        } catch (\Illuminate\Database\QueryException $e) {
            return  response()->json(['error' => 'No updated '], 406);
        }
     }
    public function deleteSede(Request $request)
    {
        try {
            DB::insert('DELETE FROM sede where idSede= ?', [$request->idSede]);
            return  response()->json(['data' => 'Removed'], 200);
        } catch (\Illuminate\Database\QueryException $e) {
            return  response()->json(['error' => 'No removed'], 409);
        }
    }
    public function addParking(RParkingLot $request){
        try {
            DB::insert('INSERT INTO parqueo(idParqueo, nombre, zona,cantidad,sede) VALUES(?,?,?,?,?)', [
                $request->idParqueo,
                $request->nombre,
                $request->zona,
                $request->cantidad,
                $request->sede,
            ]);
            return  response()->json(['data' => 'Added successfully'], 200);
        } catch (\Illuminate\Database\QueryException $e) {
            return  response()->json(['error' => $e], 409);
        }
    }
    public function getParkingForSede(){
        return ParkingLot::all();
    }
    public function modifyPark(ParkingModify $request)
    {
        try {
            DB::update('UPDATE parqueo set nombre = ?,zona = ?, sede = ?, cantidad = ? where idParqueo= ?', 
            [$request->nombre,$request->zona,$request->sede,$request->cantidad, $request->idParqueo]);
            return  response()->json(['data' => 'Updated'], 200);
        } catch (\Illuminate\Database\QueryException $e) {
            return  response()->json(['error' => 'No updated '], 406);
        }
     }
    public function deleteParking(Request $request)
    {
        try {
            DB::insert('DELETE FROM parqueo where idParqueo= ?', [$request->idParqueo]);
            return  response()->json(['data' => 'Removed'], 200);
        } catch (\Illuminate\Database\QueryException $e) {
            return  response()->json(['error' => 'No removed'], 409);
        }
    }
}
