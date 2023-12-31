<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\User;
use App\Models\Project;
use App\Models\Payment;
class DashboardController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $count_customers = User::where('role','customer')->count();
        $count_freelancer = User::where('role','freelancer')->count();
        $count_project = Project::count();

        $get_freelancer_projects =auth()->user()->project()->with('projectcategory')->latest()->get();

        $payments =auth()->user()->project()->with('payments')->get();
        $totalEarnedAmount = $payments->flatMap(function ($project) {
            return $project->payments->pluck('amount');
        })->sum();
     
        return Inertia::render('Dashboard', [
            'count_customer' => $count_customers,
            'count_freelancer' => $count_freelancer,
            'count_project' => $count_project,
            'freelancer_assign_projects' => $get_freelancer_projects,
            'get_earned_amount' => $totalEarnedAmount
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
    public function store(Request $request)
    {
        //
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
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
