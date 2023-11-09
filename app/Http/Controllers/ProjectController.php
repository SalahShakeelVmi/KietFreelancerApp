<?php

namespace App\Http\Controllers;

use App\Models\Project;
use App\Http\Requests\StoreProjectRequest;
use App\Http\Requests\UpdateProjectRequest;
use Illuminate\Http\Request;
use Session;
use Inertia\Inertia;
class ProjectController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $projects = Project::with('projectcategory')->with('customers')->latest()->paginate(10);
       
        return Inertia::render('Projects/Index', [
            'projects' => $projects
        ]);
    }

    public function updateStatus(Request $request,Project $project){
        $project->status = $request->status;
        $project->save();
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreProjectRequest $request, Project $project)
    {
        $project->create($request->validated());
        Session::flash('message', 'Project Proposal Submitted');
    }

    public function search(Request $request){
        $search = $request->search;
        $projects = Project::with('projectcategory')->where('project_title','like','%'.$search.'%')->latest()->paginate(10);
        return Inertia::render('Projects/Index', [
            'projects' => $projects
        ]);
    }

    /**
     * Display the specified resource.
     */
    public function show(Project $project)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Project $project)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateProjectRequest $request, Project $project)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Project $project)
    {
        $project->delete();
        Session::flash('message', 'Project Deleted');
    }
}
