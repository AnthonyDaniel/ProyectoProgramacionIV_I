<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class VehicleController extends Controller
{
    public function saveVehicle(Request $request){
        var_dump('aqui');
      $json = $request->input('json',null);
      $data= json_decode($json,true);// el true es para pasar ese json a array
      if(!empty($data)){
          $data=array_map('trim',$data);
          $rules=[
              'placa'=>'required',
              'marca'=>'required',
              'modelo'=>'required'
             
          ];
          //validamos
          $validate = \validator($data, $rules);
          if($validate->fails()){
              $response=array(
                  'status'    =>'error',
                  'code'      =>406,
                  'message'   =>'Los datos enviados son incorrectos',
                  'errors'    => $validate->errors()
              );            
          }else{
              
              $post=new Post();
              $post->users=$data['kasvillarrel@gmail.com'];
              $post->placa=$data['placa'];
              $post->marca=$data['marca'];
              $post->modelo=$data['modelo'];
              $post->save();

              $response=array(
                  'status'    =>'success',
                  'code'      =>200,
                  'message'   =>'Datos almacenados satisfactoriamente'              
              );
          }
      }else{
          $response=array(
              'status'    =>'error',
              'code'      =>400,
              'message'   =>'Faltan parametros'   
                     
          );
      }
      return response()->json($response,$response['code']);
      
    }
    public function updateVehicle(Request $request){
        $json = $request->input('json',null);
        $data= json_decode($json,true);// el true es para pasar ese json a array                
        if(!empty($data)){
            $data=array_map('trim',$data);
            $rules=[
                'placa'=>'required',
                'marca'=>'required',
                'modelo'=>'required'                   
            ];
            //validamos
            $validate = \validator($data, $rules);
            if($validate->fails()){
                $response=array(
                    'status'    =>'error',
                    'code'      =>406,
                    'message'   =>'Los datos enviados son incorrectos',
                    'errors'    => $validate->errors()
                );            
            }
            else{
                $id=$data['placa'];                                   
                $updated=Category::where('placa',$id)->update($data);                    
                if($updated>0){
                    $response=array(
                        'status'    =>'success',
                        'code'      =>200,
                        'message'   =>'Actualizado correctamente'                
                    );
                }else{
                    $response=array(
                        'status'    =>'error',
                        'code'      =>400,
                        'message'   =>'No se pudo actualizar'                
                    );
                }
            }
        }else{
            $response=array(
                'status'    =>'error',
                'code'      =>400,
                'message'   =>'Faltan parametros'                
            );
        }           
    
        return response()->json($response,$response['code']);
     
    }
     public function deleteVehicle($licencePlate){
      if(isset($licencePlate)){
        $deleted=Post::where('placa',$licencePlate)->delete();
        if($deleted){
            $response=array(
                'status'    =>'success',
                'code'      =>200,
                'message'   =>'Eliminado correctamente'                
            );
        }else{
            $response=array(
                'status'    =>'error',
                'code'      =>400,
                'message'   =>'No se pudo eliminar, puede que el registro ya no exista'                
            );
        }
      }
    return response()->json($response,$response['code']);
   
  }
     
}
    
