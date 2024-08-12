<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class UsersInformation extends Model
{
    protected $fillable = [
        'user_id',
        'activity_id',
        'fullname',
        'role',
        'status',
    ];

    use HasFactory;
}
