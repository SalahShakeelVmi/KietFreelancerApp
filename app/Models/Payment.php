<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Project;
class Payment extends Model
{
    use HasFactory;

    protected $fillable = [
        'project_id',
        'invoice_id',
        'token_no',
        'amount',
        'status',
    ];

    public function projects(){
        return $this->belongsTo(Project::class, 'project_id');
    }

}
