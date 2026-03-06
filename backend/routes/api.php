<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\AdminDonationController;
use App\Http\Controllers\CampaignController;
use App\Http\Controllers\UserDashboardController;


// Admin Donation Routes

Route::middleware(['auth:sanctum', 'admin'])
  ->prefix('admin')
  ->group(function () 
  {
      Route::post('/donations',              [AdminDonationController::class,  'store'              ]);         
      Route::get ('/donors',                 [AdminDonationController::class,  'getDonors'          ]);     
      Route::get ('/donations/pending',      [AdminDonationController::class,  'getNewDonations'    ]);         
      Route::put ('/donations/{id}/status',  [AdminDonationController::class,  'updateStatus'       ]);         
  }
);

// Public Auth Routes

      Route::post('/register',               [AuthController::class,           'register'           ]); 
      Route::post('/login',                  [AuthController::class,           'login'              ]); 
      Route::post('/forgot-password',        [AuthController::class,           'forgotPassword'     ]);   

// Protected Auth Routes

Route::middleware('auth:sanctum')->group(function () 
  {
      Route::post('/logout',                 [AuthController::class,           'logout'              ]);  
      Route::get ('/profile',                [AuthController::class,           'profile'             ]); 
  }
);

// Public Routes 

Route::middleware('auth:sanctum')->group(function () 
  {   
      Route::get ('/campaigns/active',       [CampaignController::class,      'active'              ]);   
      Route::post('/change-password',        [CampaignController::class,      'changePassword'      ]);
      Route::post('/logout',                 [CampaignController::class,      'logout'              ]);
  }
);

//Admin Routes

Route::middleware(['auth:sanctum','admin'])
  ->prefix('admin')
  ->group(function () 
  {
      Route::post('/campaigns',              [CampaignController::class,      'store'               ]);
      Route::get ('/campaigns/archive',      [CampaignController::class,      'archive'             ]);
      Route::put ('/donations/{id}/approve', [CampaignController::class,      'approve'             ]);
      Route::put ('/donations/{id}/reject',  [CampaignController::class,      'reject'              ]);
      Route::get ('/donations/accepted',     [CampaignController::class,      'accepted'            ]);
      Route::post('/reports',                [CampaignController::class,      'storeReport'         ]);
      Route::put ('/organizations/{id}',     [CampaignController::class,      'update'              ]);
      Route::put ('/settings/{id}',          [CampaignController::class,      'updateSettings'      ]);
  }
);

// UserDashboard

Route::middleware('auth:sanctum')->group(function () 
 {
      Route::post('/donate',                 [UserDashboardController::class, 'sendDonation'        ]);
      Route::get ('/dashboard/donations',    [UserDashboardController::class, 'donationHistory'     ]);
      Route::get ('/my-donations',           [UserDashboardController::class, 'myDonations'         ]);
      Route::get ('/profile',                [UserDashboardController::class, 'profile'             ]);
      Route::post('/logout',                 [UserDashboardController::class, 'logout'              ]);

  }
);
