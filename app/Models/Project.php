<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\belongsTo;
use Illuminate\Database\Eloquent\Relations\hasMany;
use App\Models\ProjectCategory;
use App\Models\User;
class Project extends Model
{
    use HasFactory;

    public function projectcategory(){
        return $this->belongsTo(ProjectCategory::class, 'projectcategoryid');
    }

    public function customers(){
        return $this->belongsTo(User::class, 'customerid');
    }

    public function user(){
        return $this->belongsToMany(User::class,'project_users','user_id','project_id')->withTimestamps();
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
        'assign',
        'freelancer_status',
        'customerid',
    ];
}
