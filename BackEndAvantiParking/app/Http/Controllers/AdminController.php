<?php

namespace App\Http\Controllers;

use App\Admin;
use Illuminate\Http\Request;
use App\Http\Requests\AdminRequest;
use Illuminate\Support\Facades\DB;

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
                $request->password
            ]);
            return  response()->json(['data' => 'Added successfully'], 200);
        } catch (\Illuminate\Database\QueryException $e) {
            return  response()->json(['error' => 'Incorrect data'], 409);
        }
    }

    public function getUsers(){

        return Admin::all();

    }
}
