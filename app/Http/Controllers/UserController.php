<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rules;
use Illuminate\Auth\Events\Registered;
use Session;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        if( $request->search ){
            $users =  User::where('name','like','%'.$request->search.'%')->wherenot('email','admin@gmail.com')->latest()->paginate(10);
            return Inertia::render('Users/Index', [
                'users' => $users
            ]);
        }
        else{
            $users =  User::wherenot('email','admin@kietfreelancerapp.com')->latest()->paginate(10);
            return Inertia::render('Users/Index', [
                'users' => $users
            ]);
        }
    }

    public function roleFilter($role)
    {
        if($role == 'all'){
            $users =  User::wherenot('email','admin@gmail.com')->latest()->paginate(10);
            return Inertia::render('Users/Index', [
                'users' => $users
            ]);
        }
        else{
        $users =  User::wherenot('email','admin@gmail.com')->where('role',$role)->latest()->paginate(10);
        return Inertia::render('Users/Index', [
            'users' => $users
        ]);
    }
    }

    public function updateStatus(Request $request,User $user){
        
        $user->status = $request->status;
        $user->save();
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('Users/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request, User $user)
    {
        $request->validate([
            'username' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:'.User::class,
            'password' => ['required', 'confirmed', Rules\Password::defaults()],
        ]);

        $user->create([
            'name' => $request->username,
            'email' => $request->email,
            'password' => Hash::make($request->password),
            'role'=>'admin',
        ]);

        event(new Registered($user));

        Session::flash('message', 'User created successfully');
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request,User $user)
    {

        $request->validate([
            'username' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users,email,' . $user->id,
        ]);

        $user->update([
            'name' => $request->username,
            'email' => $request->email,       
        ]);
        Session::flash('message', 'Admin updated successfully');
    }


    /**
     * Remove the specified resource from storage.
     */
    public function destroy(User $user)
    {
      
        try{
            $user->delete();
            Session::flash('message', 'User deleted successfully');
        }catch(\Exception $e){
            Session::flash('error', 'User not deleted');
        }
    }
}
