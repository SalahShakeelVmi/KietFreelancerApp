<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\belongsTo;
use Illuminate\Database\Eloquent\Relations\hasMany;
use App\Models\ProjectCategory;
class Project extends Model
{
    use HasFactory;

    public function projectcategory(){
        return $this->belongsTo(ProjectCategory::class, 'projectcategoryid');
    }

    protected $fillable = [
        'name',
        'email',
        'project_title',
        'description',
        'price',
        'status',
        'projectcategoryid',
        'delivery_datetime',
        'assign'
    ];
}
