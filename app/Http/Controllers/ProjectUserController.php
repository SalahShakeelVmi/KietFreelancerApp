<?php

namespace App\Http\Controllers;

use App\Models\ProjectUser;
use App\Http\Requests\StoreProjectUserRequest;
use App\Http\Requests\UpdateProjectUserRequest;
use Inertia\Inertia;
use App\Models\User;
use Illuminate\Http\Request;
use App\Models\Project;
class ProjectUserController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $users = User::where('role', 'freelancer')->where('status', 1)->latest()->paginate(10);
        return Inertia::render('AssignProjects/Index', [
           'users' => $users
        ]);
    }

    public function search(Request $request)
    {
        $users = User::where('role', 'freelancer')->where('status', 1)->where('name','like','%'.$request->search.'%')->latest()->paginate(10);
        return Inertia::render('AssignProjects/Index', [
            'users' => $users
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create($id)
    {
        $user = User::find($id);
        $projects = Project::with('projectcategory')->where('status',1)->latest()->get();
        return Inertia::render('AssignProjects/Create',[
            'projects' => $projects,
            'user' => $user,
            'position' => $user->position
        ]);
    }


    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        ProjectUser::create([
            'user_id' =>  $request->input('user_id'),
            'project_id' => $request->input('project_id')
        ]);
        return response()->json(['message' => 'added successfully']);
    }

    /**
     * Display the specified resource.
     */
    public function show(ProjectUser $projectUser)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(ProjectUser $projectUser)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateProjectUserRequest $request, ProjectUser $projectUser)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(ProjectUser $projectUser)
    {
        //
    }
}