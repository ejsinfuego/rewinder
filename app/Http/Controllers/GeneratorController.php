<?php

namespace App\Http\Controllers;

use App\Models\Generator;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Http\Controllers\Controller;

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
        //
        $params = $request->validate([
            'serial_number' => 'required',
            'user_id' => 'required|integer',
            'step_1' => 'required',
            'step_2' => 'required',
            'step_3' => 'required',
            'step_4' => 'required',
            'stator' => 'required',
            'rotor' => 'required',
            // 'result' => 'required',
            'exciter' => 'required',
            // 'description' => 'required',
            'kVa' => 'required',
        ]);

        function isForRewind($request)
        {
            $threeSteps = $request->step_1 == 'true' && $request->step_2 == 'true' && $request->step_3 == 'true';

            $fourthStep = $request->step_4 == 'true';

            return ($threeSteps && $fourthStep) ? 'recon' : ($fourthStep ? 'recon' : 'rewind');
        }

        function damage($damage){
            //switch case
            switch($damage){
                case $damage->rotor == 'true' && $damage->stator == 'true' && $damage->exciter == 'true':
                    return 0;
                case $damage->rotor == 'false' && $damage->stator == 'false' && $damage->exciter == 'false':
                    return 0;
                case $damage->rotor == 'false' && $damage->stator == 'false' && $damage->exciter == 'true':
                    return "-7.909";

                case $damage->rotor == 'true' && $damage->stator == 'false' && $damage->exciter == 'true':
                    return "-1.618";
                case $damage->rotor == 'true' && $damage->stator ==  'false' && $damage->exciter == 'false':
                    return "-2.21";
                case $damage->rotor == 'false' && $damage->stator == 'true' && $damage->exciter == 'true':
                    return "-1.986";
                case $damage->rotor == 'true' && $damage->stator == 'true' && $damage->exciter == 'false':
                    return "+0.52";
                case $damage->rotor == 'false' && $damage->stator == 'true' && $damage->exciter == 'false':
                    return "-3.53";
            }
        }

        $dams = damage($request);
        $rating = $request->kVa;
        $materials = $request->materials;
        $manpower = $request->manpower;
        function mainFormula(
            $damage,
            $rating,
            $materials,
            $manpower
        ){
            //get the operation of the damage
            $damage = floatval($damage);
            if($damage == 0){
               return 13.931 + 1.53 * $rating - 1.508 * $manpower - 7.175 * $materials;
            }else{
                return 13.931 + $damage * 1 + 1.53 * $rating - 1.508 * $manpower - 7.175 * $materials;
            }
        }
        //always round up to the nearest whole number
        //if negative, make it zero


        $forRewind = isForRewind($request);

        function jobOrderGenerator($request){
            $jo = 'JE'.date('Y').'-'.date('m')."-".date('d')."-".date('H').date('i');

            $request->merge(['job_order' => $jo]);
        }

        jobOrderGenerator($request);


        $genId = Generator::insertGetId([
            'job_order' => $request['job_order'],
            'user_id' => $params['user_id'],
            'serial_number' => $params['serial_number'],
            'updated_at' => now(),
            'created_at' => now(),
        ]);

        //insert genId into request
        $request->merge(['generator_id' => $genId]);

        if($forRewind == 'rewind'){
            $prediction = ceil(mainFormula($dams, $rating, $materials, $manpower));
            if($prediction < 0){
                $prediction = 0;
            }
        }else if($forRewind == 'recon'){
            $prediction = 0;
        }

        DB::table('diagnosis')->insert([
                'step_1' => $request->step_1,
                'step_2' => $request->step_2,
                'step_3' => $request->step_3,
                'step_4' => $request->step_4,
                'step_5' => $request->step_5,
                'stator' => $request->stator,
                'rotor' => $request->rotor,
                'exciter' => $request->exciter,
                'result' => $forRewind,
                'generator_id' => $request->generator_id,
                'prediction' => $prediction,
                'description' => $request->description,
                'kVa' => $request->kVa,
                'created_at' => now(),
                'updated_at' => now(),
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
