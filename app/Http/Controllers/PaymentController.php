<?php

namespace App\Http\Controllers;

use App\Models\Payment;
use App\Http\Requests\StorePaymentRequest;
use App\Http\Requests\UpdatePaymentRequest;
use Inertia\Inertia;
use Session;
use Stripe;
use Illuminate\Http\Request;
class PaymentController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {

        if(isset($request->statusFilter)){
            if($request->status === 'all'){
                $payments = Payment::with('projects')->with('projects.projectcategory')->with('projects.customers')->latest()->paginate(10);
                return Inertia::render(
                    'Payments/Index',
                    [
                        'payments' => $payments
                    ]
                );
           
            }
            else{
            $payments = Payment::with('projects')->with('projects.projectcategory')->with('projects.customers')
            ->where('status',$request->status)->latest()->paginate(10);
       
            return Inertia::render(
                'Payments/Index',
                [
                    'payments' => $payments
                ]
            );
         }
        }
        else if(isset($request->searchFilter)){
            $search = $request->search;
            $payments = Payment::with('projects')->with('projects.projectcategory')->with('projects.customers')
            ->where('invoice_id', 'like', '%' . $search . '%')
            ->orWhereHas('projects', function ($query) use ($search) { // Use the 'use' keyword to pass $search to the closure
                $query->where('project_title', 'like', '%' . $search . '%');
            })
            ->orWhereHas('projects.customers', function ($query) use ($search) { // Use the 'use' keyword to pass $search to the closure
                $query->where('name', 'like', '%' . $search . '%')->orwhere('email', 'like', '%' . $search . '%');
            })
            ->latest()->paginate(10);

            return Inertia::render(
                'Payments/Index',
                [
                    'payments' => $payments
                ]
                );

        }
        else{
            $payments = Payment::with('projects')->with('projects.projectcategory')->with('projects.customers')->latest()->paginate(10);
       
            return Inertia::render(
                'Payments/Index',
                [
                    'payments' => $payments
                ]
            ); 
        }

       
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {   
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StorePaymentRequest $request)
    { 
        Payment::create([
            'project_id' => $request->project['id'],
            'invoice_id' => $request->invoice_id,
            'amount' => $request->project['price'],
        ]);
        session()->flash('message', 'Payment link created successfully.');
    }

    /**
     * Display the specified resource.
     */
    public function show(Payment $payment)
    {
        $payment = Payment::with('projects')->with('projects.projectcategory')->with('projects.customers')->where('id', $payment->id)->first();
        if($payment->status ){
            return Inertia::render(
                'Payments/Show',
                [
                    'payment' => $payment
                ]
            );
        }
        else{
            return back();
        }
      
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Payment $payment)
    {
        $payment = Payment::with('projects')->with('projects.projectcategory')->with('projects.customers')->where('id', $payment->id)->first();
        return view('StripePayment.Edit',[
            'payment' => $payment
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdatePaymentRequest $request, Payment $payment)
    {
        if($payment->token_no === null){
          
            Stripe\Stripe::setApiKey(env('STRIPE_SECRET'));
        
            Stripe\Charge::create ([
                    "amount" => 100 * 100,
                    "currency" => "usd",
                    "source" => $request->stripeToken,
                    "description" => "Test payment from LaravelTus.com." 
            ]);

            $payment->update([
                'token_no' => $request->stripeToken,
                'status' => 1
            ]);
        
            Session::flash('success', 'Payment successful!');
                
            return back();
        }
        else{
            Session::flash('error', 'You have already paid for this project.');               
            return back();
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Payment $payment)
    {
        $payment->delete();
        session()->flash('message', 'Payment deleted successfully.');
    }

    

}
