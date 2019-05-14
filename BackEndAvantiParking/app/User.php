<?php

namespace App;

use Tymon\JWTAuth\Contracts\JWTSubject; // Se añade el import
use Illuminate\Notifications\Notifiable;
use Illuminate\Foundation\Auth\User as Authenticatable;

class User extends Authenticatable implements JWTSubject //Se implementa esto de jwt
{
    use Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
    
     */
    //protected $table = 'usuario';

    protected $fillable = [
        'nombre','id','telefono','direccion','telefono','tipo', 'email', 'password',
    ];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        'password', 'remember_token',
    ];

    /**
     * The attributes that should be cast to native types.
     *
     * @var array
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
    ];

    
    /**
     * Get the identifier that will be stored in the subject claim of the JWT.
     *
     * @return mixed
     */
    public function getJWTIdentifier() //Esto se agrega por el jwt
    {
        return $this->getKey();
    }

    /**
     * Return a key value array, containing any custom claims to be added to the JWT.
     *
     * @return array
     */
    public function getJWTCustomClaims() // //Esto se agrega por el jwt
    {
        return [];
    }

    public function setPasswordAttribute($value)
    {
        $this->attributes['password'] = bcrypt($value);
    }
}
