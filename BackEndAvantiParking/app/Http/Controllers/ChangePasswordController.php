<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Requests\ChangePasswordRequest;
use Illuminate\Support\Facades\DB;
use Symfony\Component\HttpFoundation\Response;
use App\User;

class ChangePasswordController extends Controller
{
    public function process(ChangePasswordRequest $request)
    {
        return $this->getPasswordResetTableRow($request)->count()> 0 ? $this->changePassword($request) : $this->tokenNotFoundResponse();
    }

    private function getPasswordResetTableRow($request)
    {
        return DB::table('password_resets')->where(['email' => $request->email,'token' =>$request->resetToken]);
    }

    private function tokenNotFoundResponse()
    {
        return response()->json(['error' => 'Token or Email is incorrect'],Response::HTTP_UNPROCESSABLE_ENTITY);
    }
     
    private function changePassword($request)
    {
        $user = User::whereEmail($request->email)->first();
        //$user = DB::selectOne('Select * FROM users WHERE email = ?', [$request->email]);
        //try {
        //    DB::update('UPDATE users set password = ? where email= ?', [$request->nombre, $request->password]);
        //    return  response()->json(['data' => 'Updated'], 200);
        //} catch (\Illuminate\Database\QueryException $e) {
        //    return  response()->json(['error' => 'No updated '], 406);
        //}
        $user->update(['password'=>$request->password]);
        $this->getPasswordResetTableRow($request  )->delete();
        return response()->json(['data'=>'Password Successfully Changed'],Response::HTTP_CREATED);
    }
}
