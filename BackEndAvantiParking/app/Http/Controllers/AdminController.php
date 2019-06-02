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
                $request->password,
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
            DB::insert('DELETE FROM users where email= ?', [ $request->email]);
            return  response()->json(['data' => 'Removed'], 200);
        } catch (\Illuminate\Database\QueryException $e) {
            return  response()->json(['error' => 'No removed'], 409);
        }
    }

    public function adminUsers(Request $request){
        try {
            DB::update('UPDATE users set tipo = ? where email= ?', [$request->tipo, $request->email]);
            return  response()->json(['data' => 'Updated'], 200);
        } catch (\Illuminate\Database\QueryException $e) {
            return  response()->json(['error' => 'Type no updated '], 406);
        }
    }
}
