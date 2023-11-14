<?php

namespace App\Http\Controllers;

use App\Models\Payment;
use App\Http\Requests\StorePaymentRequest;
use App\Http\Requests\UpdatePaymentRequest;
use Inertia\Inertia;
use Session;
use Stripe;
class PaymentController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $payments = Payment::with('projects')->with('projects.projectcategory')->with('projects.customers')->latest()->paginate(10);
       
        return Inertia::render(
            'Payments/Index',
            [
                'payments' => $payments
            ]
        );
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create($invoice_id)
    {
        $payment = Payment::with('projects')->with('projects.projectcategory')->with('projects.customers')->where('invoice_id', $invoice_id)->first();
        return view('StripePayment.Create',[
            'payment' => $payment
        ]);
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
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Payment $payment)
    {
        //
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
        //
    }
}
