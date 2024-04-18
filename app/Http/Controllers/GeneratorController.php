<?php

namespace App\Http\Controllers;

use App\Models\Generator;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Http\Controllers\Controller;
use Inertia\Inertia;

class GeneratorController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }


    public function isForRewind($request){
        if($request->step_1 == 'true' && $request->step_2 == 'true' && $request->step_3 == 'true'){
            return true;
        }else{
            return false;
        }
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {

        $userid = auth()->user()->id;
        $params = $request->validate([
            'serial_number' => 'required',
            'step1' => 'required',
            'step2' => 'required',
            'step3' => 'required',
            'step4' => 'required',
            'stator' => 'required',
            'rotor' => 'required',
            'result' => 'required',
            'exciter' => 'required',
            'kVa' => 'required',
        ]);

        $genId = Generator::insertGetId([
            'job_order' => $request['job_order'],
            'user_id' => $userid,
            'serial_number' => $params['serial_number'],
            'updated_at' => now(),
            'created_at' => now(),
        ]);

        //insert genId into request
        $request->merge(['generator_id' => $genId]);

        $request->merge(['step5' => 'true']);
        DB::table('diagnosis')->insert([
                'step_1' => $request->step1,
                'step_2' => $request->step2,
                'step_3' => $request->step3,
                'step_4' => $request->step4,
                'step_5' => $request->step5,
                'stator' => $request->stator,
                'rotor' => $request->rotor,
                'exciter' => $request->exciter,
                'result' => $request->result,
                'generator_id' => $request->generator_id,
                'prediction' => $request->prediction,
                'description' => $request->description,
                'kVa' => $request->kVa,
                'created_at' => now(),
                'updated_at' => now(),
             ]);

        return inertia('Dashboard', [
            'message' => 'Generator has been successfully diagnosed.'
        ]);
    }

    /**
     * Display the specified resource.
     */
    public function show(Generator $generator)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Generator $generator)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Generator $generator)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Generator $generator)
    {
        //
    }
}
