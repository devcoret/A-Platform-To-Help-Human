<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Donation;
use Illuminate\Support\Facades\Auth;

class UserDashboardController extends Controller
{

    public function sendDonation(Request $request)
    {
        $request->validate([
            'type'        => 'required',
            'donor_name'  => 'required',
            'phone'       => 'required',
            'city'        => 'required',
            'campaign_id' => 'required|exists:campaigns,id',
            'image'       => 'nullable|image',
        ]);

        $imagePath = null;

        if ($request->hasFile('image')) {
            $imagePath = $request->file('image')->store('donations', 'public');
        }

        $donation = Donation::create([
            'user_id'     => Auth::id(),
            'campaign_id' => $request->campaign_id,
            'type'        => $request->type,
            'donor_name'  => $request->donor_name,
            'phone'       => $request->phone,
            'city'        => $request->city,
            'notes'       => $request->notes,
            'image'       => $imagePath,
            'status'      => 'معلقة',
        ]);

        return response()->json([
            'message' => 'تم إرسال التبرع بنجاح',
            'data'    => $donation
        ]);
    }


    public function donationHistory()
    {
        $donations = Donation::where('user_id', Auth::id())
                             ->latest()
                             ->get();

        return response()->json($donations);
    }


    public function myDonations()
    {
        $donations = Donation::where('user_id', Auth::id())
                             ->with('campaign')
                             ->latest()
                             ->get();

        return response()->json($donations);
    }

    public function profile()
    {
        $user = Auth::user();

        return response()->json([
            'name'      => $user->name,
            'email'     => $user->email,
            'phone'     => $user->phone,
            'joined_at' => $user->created_at
        ]);
    }


    public function logout(Request $request)
    {
        $request->user()->currentAccessToken()->delete();

        return response()->json([
            'message' => 'تم تسجيل الخروج بنجاح'
        ]);
    }
}