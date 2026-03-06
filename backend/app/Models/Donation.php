<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Donation extends Model
{
  protected $fillable = [
    'user_id',
    'campaign_id',
    'type',
    'donation_count',
    'amount',
    'date',
    'status',
    'donor_name',
    'phone',
    'city',
    'notes',
    'image'
];

  public function user()
  {
      return $this->belongsTo(User::class);
  }

  public function campaign()
  {
      return $this->belongsTo(Campaign::class);
  }
}
