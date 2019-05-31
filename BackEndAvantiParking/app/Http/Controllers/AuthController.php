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
use Illuminate\Support\Facades\DB;
use Illuminate\Http\Request;
use TheSeer\Tokenizer\Exception;

class AuthController extends Controller
{
    /**
     * @return void
     */
    public function __construct()
    {
        $this->middleware('auth:api', ['except' => ['login', 'signup', 'checkPassword', 'updated','upload']]);
    } //chequear contraseña, se le manda email y password, por lo tanto, no necesita el middleware

    /**
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

        DB::insert('INSERT INTO users (email,id,nombre,direccion,telefono,password) VALUES (?,?,?,?,?,?)', [
            $request->email,
            $request->id,
            $request->nombre,
            $request->direccion,
            $request->telefono,
            bcrypt($request->password)
        ]);
        //User::create($request->all());
        //return $request->email;
        return $this->login($request); //Te logueas despues de registrarte, automaticamente mm ya veo
    }
    /**
     * @return \Illuminate\Http\JsonResponse
     */
    public function me()
    {
        return response()->json(auth()->user());
    }

    public function updated(Request $request)
    {
        //$token=$request->header('Authorization',null);

        //$user = User::whereEmail($request->email)->first();
        $user = DB::select('SELECT * FROM users WHERE email=?', [$request->email]);

        if (is_null($user)) {
            return response()->json(['error' => 'Not found'], 404);
        } else {
            if ($request->nombre) {
                try {
                    DB::update('UPDATE users set nombre = ? where email= ?', [$request->nombre, $request->email]);
                    //$user->update(['nombre'=>$request->nombre]);
                    return  response()->json(['data' => 'Updated'], 200);
                } catch (\Illuminate\Database\QueryException $e) {
                    return  response()->json(['error' => 'Name no updated '], 406);
                }
            }
            if ($request->id) {
                try {
                    DB::update('UPDATE users set id = ? where email= ?', [$request->id, $request->email]);
                    //$user->update(['id'=>$request->id]);
                    return  response()->json(['data' => 'Updated'], 200);
                } catch (\Illuminate\Database\QueryException $e) {
                    return  response()->json(['error' => 'ID no updated '], 406);
                }
            }
            if ($request->direccion) {
                try {
                    DB::update('UPDATE users set direccion = ? where email= ?', [$request->direccion, $request->email]);
                    //$user->update(['direccion'=>$request->direccion]);
                    return  response()->json(['data' => 'Updated'], 200);
                } catch (\Illuminate\Database\QueryException $e) {
                    return  response()->json(['error' => 'Address no updated '], 406);
                }
            }
            if ($request->telefono) {
                try {
                    DB::update('UPDATE users set telefono = ? where email= ?', [$request->telefono, $request->email]);
                    //$user->update(['telefono'=>$request->telefono]);
                    return  response()->json(['data' => 'Updated'], 200);
                } catch (\Illuminate\Database\QueryException $e) {
                    return  response()->json(['error' => 'Phone no updated '], 406);
                }
            }
        }
    }

    public function upload(Request $request){
        $image=$request->file('file0');

        return $image;
        
        $validate=\Validator::make($request->all(),[
            'file0'=>'required|image|mimes:jpg,png'
        ]);
        if(!$image || $validate->fails()){
            $response=array(
                'status'    =>'error',
                'code'      =>406,
                'message'   =>'Error al subir la imagen'                
            );
        }
        else{
            $image_name=time().$image->getClientOriginalName();
            \Storage::disk('users')->put($image_name,\File::get($image));
            $response=array(
                'status'    =>'success',
                'code'      =>200,
                'message'   =>'Imagen cargada satisfactoriamente'                
            );
        }
        return response()->json($response,$response['code']);
    }   
    public function avatar($filename){
        $exist=\Storage::disk('users')->exists($filename);
        if($exist){
            $file = \Storage::disk('users')->get($filename);
            return new Response($file,200);
        }else{
            $response=array(
                'status'    =>'error',
                'code'      =>404,
                'message'   =>'Imagen no exite'                
            );
            return response()->json($response,$response['code']);
        }
    }

    public function checkPassword()
    {

        $credentials = request(['email', 'password']);
        if (!$token = auth()->attempt($credentials)) {
            return response()->json(['error' => 'Passsword incorrect'], 401);
        }
        return $this->respondWithToken($token);
    }

    public function delete()
    {
        //$user = User::where('email', $dato)->get(); // Prueb
        //$user = User::find($dato); // Prueba
        $dato = auth()->user()->email;
        $user = DB::select('SELECT * FROM users WHERE email=?', [$dato]);
        
        if (is_null($user)) {
            return response()->json(['error' => 'Not found'], 404);
        } else {
            //$user->delete();
            try {
                DB::delete('DELETE FROM users where email= ?', [$dato]); 
                return  response()->json(['data' => 'Removed'], 200);
            } catch (\Illuminate\Database\QueryException $e) {
                return  response()->json(['error' => 'No removed'], 409);
            }
        }
    }
    /**
     * @return \Illuminate\Http\JsonResponse
     */
    public function logout()
    {
        auth()->logout();

        return response()->json(['message' => 'Successfully logged out']);
    }

    /*
     * @return \Illuminate\Http\JsonResponse
     */
    public function refresh()
    {
        return $this->respondWithToken(auth()->refresh());
    }

    /**
     * @param  string $token
     *
     * @return \Illuminate\Http\JsonResponse
     */
    protected function respondWithToken($token)
    {
        return response()->json([
            'access_token' => $token,
            'token_type' => 'bearer',
            'expires_in' => auth()->factory()->getTTL() * 180,
            'user' => auth()->user()->email
        ]);
    }
    
}
