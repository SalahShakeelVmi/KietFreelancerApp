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
    public function create(User $user)
    {
        $projects = Project::with('projectcategory')->where('assign',0)->where('status',1)->latest()->get(); 
        $all_projects = Project::with('projectcategory')->where('status',1)->latest()->get(); 
           
        return Inertia::render('AssignProjects/Create',[
            'projects' => $projects,
            'user' => $user,
            'user_projects' => $user->projects,
            'all_projects' => $all_projects
        ]);
    }


    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
       
        $user = User::find($request->input('user_id'));
        $user->project()->attach($request->input('project_id'));

        Project::find($request->input('project_id'))->update(['assign' => 1]);
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
    public function update(Request $request, ProjectUser $projectUser)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(ProjectUser $projectUser,$id)
    {
            Project::find($id)->update(['assign' => 0]);
            $projectUser->where('project_id',$id)->delete();
            return response()->json(['message' => 'deleted successfully']);
       
    }
}
