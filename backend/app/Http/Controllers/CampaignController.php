<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use App\Models\Campaign;
use App\Models\Donation;
use App\Models\Report;
use App\Models\Organization;
use App\Models\Setting;
use App\Models\User;

class CampaignController extends Controller
{
    public function store(Request $request)
  {
      $request->validate([
          'name'          => 'required',
          'target_amount' => 'required|numeric',
          'end_date'      => 'required|date',
          'description'   => 'required',
          'category'      => 'required'
      ]);

      $campaign = Campaign::create($request->all());

      return response()->json(
        [
          'message'       => 'تم إضافة الحملة بنجاح',
          'data'          => $campaign
        ]
      );  
  }

    public function active()
      {
          return Campaign::where('status','فعالة')->get();
      }

    public function archive()
      {
          return Campaign::where('status','منتهية')->get();
      }

    public function approve($id)
      {
          $donation = Donation::findOrFail($id);
          $donation->status = 'مقبولة';
          $donation->save();
          return response()->json(['message'=>'تم قبول التبرع']);
      }

    public function reject($id)
      {
          $donation = Donation::findOrFail($id);
          $donation->status = 'مرفوضة';
          $donation->save();

          return response()->json(['message'=>'تم رفض التبرع']);
      }

    public function accepted()
      {
          return Donation::where('status','مقبولة')->get();
      }

    public function storeReport(Request $request)
      {
          $report = Report::create($request->all());

          return response()->json([
              'message'=>'تم حفظ التقرير'
          ]);
      }

    public function update(Request $request,$id)
      {
          $org = Organization::findOrFail($id);
          $org->update($request->all());

          return response()->json(['message'=>'تم تحديث البيانات']);
      }

    public function updateSettings(Request $request,$id)
      {
          $setting = Setting::findOrFail($id);
          $setting->update($request->all());

          return response()->json(['message'=>'تم حفظ الإعدادات']);
      }

    public function changePassword(Request $request)
      {
          $request->validate([
              'current_password'=>'required',
              'new_password'=>'required|min:6|confirmed'
          ]);

          /** @var User $user */
          $user = Auth::user();

          if(!$user || !Hash::check($request->current_password,$user->password)){
              return response()->json(['message'=>'كلمة المرور الحالية غير صحيحة'],401);
          }

          if($user) {
              $user->password = Hash::make($request->new_password);
              $user->save();
          }

          return response()->json(['message'=>'تم تغيير كلمة المرور']);
      }

    public function logout()
      {
          Auth::logout();
          return response()->json(['message'=>'تم تسجيل الخروج']);
      }
}
