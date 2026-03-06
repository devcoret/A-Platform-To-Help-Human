<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Donor extends Model
{
    protected $fillable = 
    [
        'name',
        'donation_count',
        'total_amount',
    ];

    public function donations()
    {
        return $this->hasMany(Donation::class);
    }
}
