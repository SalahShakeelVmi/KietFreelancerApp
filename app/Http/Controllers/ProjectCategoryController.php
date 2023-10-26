<?php

namespace App\Http\Controllers;

use App\Models\ProjectCategory;
use App\Http\Requests\StoreProjectCategoryRequest;
use App\Http\Requests\UpdateProjectCategoryRequest;
use Inertia\Inertia;
use Illuminate\Support\Facades\Session;
use Illuminate\Http\Request;
class ProjectCategoryController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $projectCategories = ProjectCategory::paginate(10);
        return Inertia::render('ProjectCategories/Index', [
            'projectCategories' => $projectCategories,
        ]);
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
    public function store(StoreProjectCategoryRequest $request)
    {
        $projectCategory = ProjectCategory::create($request->validated());
        Session::flash('message', 'Project category created successfully!');
    }

    /**
     * Display the specified resource.
     */
    public function show(ProjectCategory $projectCategory)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(ProjectCategory $projectCategory)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateProjectCategoryRequest $request, ProjectCategory $projectCategory)
    {
        $projectCategory->update($request->validated());
        Session::flash('message', 'Project category updated successfully!');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(ProjectCategory $projectCategory)
    {
        try{
            $projectCategory->delete();
            Session::flash('message', 'Project category deleted successfully!');
          
        }catch(\Exception $e){
            Session::flash('error', 'Project category cannot be deleted!');
        }
    }

    public function search(Request $request){
        $projectCategories = ProjectCategory::where('category_name', 'like', '%' . $request->search . '%')->paginate(10);
        return Inertia::render('ProjectCategories/Index', [
            'projectCategories' => $projectCategories,
        ]);
    }
}
