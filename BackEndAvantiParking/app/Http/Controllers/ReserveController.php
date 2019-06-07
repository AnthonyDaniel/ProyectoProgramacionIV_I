<?php

namespace App\Http\Controllers;

use App\Reserve;
use Illuminate\Http\Request;
use App\Http\Requests\ReservarRequest;
use Illuminate\Support\Facades\DB;

class ReserveController extends Controller
{
    public function __construct()
    { }

    public function addR(ReservarRequest $r){

        try {
            Reserve::create($r->all());
            return  response()->json(['data' => 'Added successfully'], 200);
        } catch (\Illuminate\Database\QueryException $e) {
            return  response()->json(['error' => $e], 409);
        }
    }
    public function list(Request $r){
        $data= Reserve::where('users',$r->users)->get();
        return response()->json($data,200);
    }
    public function delete(Request $r)
    {
        $deleted = Reserve::where('id',$request->id)->delete($request->all());
        if($deleted){
            return  response()->json(['data' => 'User deleted successfully'], 200);
        }else{
            return  response()->json(['error' => 'User not removed'], 406);
        }
    }
}
