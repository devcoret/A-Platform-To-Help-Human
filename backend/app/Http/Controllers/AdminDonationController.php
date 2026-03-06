<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Donation;
use App\Models\Donor;
// use App\Models\User;

class AdminDonationController extends Controller
{
    public function store(Request $request)
    {
        $request->validate(
          [
            'type'           => 'required|in:طعام,مال,ملابس',
            'name'           => 'required|string',
            'donation_count' => 'required|integer|min:1',
            'amount'         => 'required|numeric|min:0',
            'date'           => 'required|date'
          ]
        );

        $donor = Donor::create(
          [
            'name'           => $request->name,
            'donation_count' => $request->donation_count,
            'total_amount'   => $request->amount
          ]
        );

        $donation = Donation::create(
          [
            'donor_id'       => $donor->id,
            'type'           => $request->type,
            'donation_count' => $request->donation_count,
            'amount'         => $request->amount,
            'date'           => $request->date,
            'status'         => 'معلقة'
          ]
        );

        return response()->json(
          ['message'         => 'تم اضافة المتبرع بنجاح',
          'data'             => $donation
          ]
        );
    }

    public function getDonors()
        {
          return Donor::with('donations')->get();
        }

    public function getNewDonations()
        {
            return Donation::where('status', 'معلقة')->with('donor')->get();
        }

    public function updateStatus($id)
{
    $donation = Donation::find($id);

    if (!$donation) {
        return response()->json([
            'message' => 'التبرع غير موجود'
        ], 404);
    }

    if ($donation->status === 'ناجحة') {
        return response()->json([
            'message' => 'تم تأكيد التبرع بالفعل'
        ]);
    }


    $donation->status = 'ناجحة';
    $donation->save();

    
    $donor = $donation->donor;
    $donor->donation_count += $donation->donation_count;
    $donor->total_amount   += $donation->amount;
    $donor->save();

    return response()->json(
      [
        'message' => 'تم تحويل الحالة إلى ناجحة بنجاح'
      ]);
}
}
