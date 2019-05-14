<?php

//namespace App\Http\Controllers;

//use Illuminate\Support\Facades\Auth;
//use App\Http\Controllers\Controller;
//use Illuminate\Http\Request;
//use App\Http\Requests\SignUpRequest;
namespace App\Http\Controllers;

use Illuminate\Support\Facades\Auth;
use App\Http\Controllers\Controller;
use App\Http\Requests\SignUpRequest;
use App\User;
use SebastianBergmann\Environment\Console;

class AuthController extends Controller
{
    /**
     * Create a new AuthController instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('auth:api', ['except' => ['login', 'signup','checkPassword']]);
    }

    /**
     * Get a JWT via given credentials.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function login()
    {
        $credentials = request(['email', 'password']);

        if (!$token = auth()->attempt($credentials)) {
            return response()->json(['error' => 'Email or passsword incorrect'], 401);
        }

        return $this->respondWithToken($token);
    }

    public function signup(SignUpRequest $request)
    {

        User::create($request->all());
        return $this->login($request); //Te logueas despues de registrarte, automaticamente mm ya veo
    }
    /**
     * Get the authenticated User.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function me()
    {
        return response()->json(auth()->user());
    }

    public function checkPassword(){
       
        $credentials = request(['email', 'password']);

        if (!$token = auth()->attempt($credentials)) {
            return response()->json(['error' => 'Passsword incorrect'], 401);
        }
        return $this->respondWithToken($token);
        
    }

    public function delete()
    {

        //$user = User::where('email', $dato)->get(); // Prueba

        $dato = auth()->user()->id;

        $user = User::find($dato);
        if (is_null($user)) {
            return response()->json(['error' => 'Not found'], 401);
        } else {
            $user->delete();
            return  response()->json(['data' => 'Removed'], 200);
        }
    }
    /**
     * Log the user out (Invalidate the token).
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function logout()
    {
        auth()->logout();

        return response()->json(['message' => 'Successfully logged out']);
    }

    /**
     * Refresh a token.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function refresh()
    {
        return $this->respondWithToken(auth()->refresh());
    }

    /**
     * Get the token array structure.
     *
     * @param  string $token
     *
     * @return \Illuminate\Http\JsonResponse
     */
    protected function respondWithToken($token)
    {
        return response()->json([
            'access_token' => $token,
            'token_type' => 'bearer',
            'expires_in' => auth()->factory()->getTTL() * 60,
            'user' => auth()->user()->email
        ]);
    }
}
