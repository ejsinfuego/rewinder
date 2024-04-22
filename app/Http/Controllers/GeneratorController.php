<?php

namespace App\Http\Controllers;

use App\Models\Generator;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Http\Controllers\Controller;
use Inertia\Inertia;
use App\Models\Diagnosis;

class GeneratorController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $generators = Generator::with('diagnosis')->get()->where('user_id', auth()->user()->id)->toArray();
        return Inertia::render('Dashboard', [
            'generators' => $generators,
        ]);
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
    public function store(Request $request)
    {

        $userid = auth()->user()->id;
        $params = $request->validate([
            'serialNumber' => 'required',
            'jobOrder' => 'required',
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
            'job_order' => $request['jobOrder'],
            'user_id' => $userid,
            'serial_number' => $params['serialNumber'],
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

    return redirect()->route('generator.show', $genId);
    }

    /**
     * Display the specified resource.
     */
    public function show(Generator $generator)
    {
        //
        $gen = Generator::where('id', $generator->id)->first();
        $diagnosis = DB::select('select * from diagnosis where generator_id = 27');
        return Inertia::render('GeneratorResultPage', [
            'generator' => $gen,
            'diagnosis' => $diagnosis,
        ]);
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
