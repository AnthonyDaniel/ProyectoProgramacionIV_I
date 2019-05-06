<?php
use App\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
class UsersTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run()
    {
        User::truncate();
        User::create([
            'email' => 'anthony@gmail.com',
            'password' => Hash::make('thony'),
            'name' => 'Anthony',
        ]);
    }
}