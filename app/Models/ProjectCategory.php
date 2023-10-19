<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\hasMany;
use Illuminate\Database\Eloquent\Relations\belongsTo;
use App\Models\Project;
class ProjectCategory extends Model
{
    use HasFactory;

    public function projects(){
        return $this->hasMany(Project::class, 'projectcategoryid');
    }

    protected $fillable = [
        'category_name',
    ];
}
