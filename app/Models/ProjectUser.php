<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\User;
use App\Models\Project;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
class ProjectUser extends Model
{
    use HasFactory;

    public function user(){
        return $this->belongsTo(User::class);
    }

    public function project(){
        return $this->belongsTo(Project::class);
    }

    protected $fillable = [
        'user_id',
        'project_id',
        'position',
        'index'
    ];
}
