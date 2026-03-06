<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Campaign extends Model
{
    protected $fillable = [
        'name',
        'target_amount',
        'collected_amount',
        'end_date',
        'description',
        'category',
        'status'
    ];
}
