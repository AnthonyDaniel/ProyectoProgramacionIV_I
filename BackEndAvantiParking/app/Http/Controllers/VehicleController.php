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

        try {
            DB::insert('INSERT INTO vehiculo(placa, marca, modelo,users) VALUES(?,?,?,?)', [
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
    public function getVehicle(RegisterVehicleRequest $request)
    {
        try {
            DB::select('SELECT * FROM vehiculo WHERE users= ?', [$request->users]);
            return  response()->json(['data' => 'Updated successfully'], 200);
        } catch (\Illuminate\Database\QueryException $e) {
            return  response()->json(['error' => 'Error! not updated '], 406);
        }
    }
    public function updateVehicle(RegisterVehicleRequest $request)
    {

        try {
            DB::update('UPDATE vehiculo set marca = ?, modelo = ? where placa= ?', [$request->marca, $request->modelo, $request->placa]);

            return  response()->json(['data' => 'Updated successfully'], 200);
        } catch (\Illuminate\Database\QueryException $e) {
            return  response()->json(['error' => 'Error! not updated '], 406);
        }
    }
    public function deleteVehicle(RegisterVehicleRequest $request)
    {

        try {
            DB::delete('DELETE FROM vehiculo WHERE placa= ?', [$request->placa]);
            return  response()->json(['data' => 'Vehicle deleted successfully'], 200);
        } catch (\Illuminate\Database\QueryException $e) {
            return  response()->json(['error' => 'Vehicle not removed'], 406);
        }
    }
}
