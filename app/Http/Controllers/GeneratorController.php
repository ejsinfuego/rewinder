<?php

namespace App\Http\Controllers;

use App\Models\User;
use Inertia\Inertia;
use App\Models\Diagnosis;
use App\Models\Generator;
use Illuminate\Http\Request;
use App\Models\GeneratorUser;
use App\Models\RewindingProcedure;
use Illuminate\Support\Facades\DB;
use Spatie\Permission\Models\Role;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;

class GeneratorController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $role = User::where('id', auth()->user()->id)->first()->hasRole('admin');

        $userRole = User::where('id', auth()->user()->id)->first()->getRoleNames()->first();

        $generatorAccess = GeneratorUser::where('user_id', auth()->user()->id)->get('generator_id');

        $role ? $generators = Generator::with('diagnosis')->with('generatorUsers')->with('user')->orderBy('created_at', 'desc')->paginate(10) : $generators = '';

        $userRole == 'rewinder' ? $generators = Generator::with('diagnosis')->with('generatorUsers')->with('user')->whereIn('id', $generatorAccess)->orderBy('created_at', 'desc')->paginate(10) : '';

        $userRole == 'client' ? $generators = Generator::with('diagnosis')->whereIn('id', $generatorAccess)
        ->whereHas('generatorUsers', function ($query) {
            $query->where('status', 'granted');
        })
        ->orderBy('created_at', 'desc')->paginate(10) : '';

        return Inertia::render('Dashboard', [
            'generators' => $generators,
            'role' => $userRole,
        ]);
    }
    public function approve(Generator $generator)
    {
        $generator->status = true;
        try{
            $generator->save();
            $role = User::where('id', auth()->user()->id)->first()->hasRole('admin');
             $role ? $generators = Generator::with('diagnosis')->orderBy('created_at', 'desc')->paginate(10) :
            $generators = Generator::with('diagnosis')->where('user_id', auth()->user()->id)->orderBy('created_at', 'desc')->paginate(10);

        } catch (\Exception $e) {
            return redirect()->route('dashboard');

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

    public function generatorForm()
    {
        $admins = User::role('admin')->get([
            'id',
            'name',
        ]);

        return Inertia::render('GeneratorFormPage', [
            'admins' => $admins,
        ]);
    }

    public function store(Request $request)
    {
        $userid = auth()->user()->id;
        $params = $request->validate([
            'serialNumber' => 'required|unique:generator,column,except,id',
            'jobOrder' => 'required',
            'step1' => 'required',
            'step2' => 'required',
            'step3' => 'required',
            'step4' => 'required',
            'stator' => 'required',
            'rotor' => 'required',
            'result' => 'required',
            'manpower' => 'required',
            'materials' => 'required',
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

        GeneratorUser::create([
            'user_id' => $userid,
            'generator_id' => $genId,
        ]);

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
                'manpower' => $request->manpower,
                'materials' => $request->materials,
                'generator_id' => $request->generator_id,
                'prediction' => $request->prediction,
                'description' => $request->description,
                'kVa' => $request->kVa,
                'created_at' => now(),
                'updated_at' => now(),
             ]);

    return redirect()->route('dashboard');
    }

    /**
     * Display the specified resource.
     */
    public function show(Generator $generator)
    {
        //
        $gen = Generator::where('id', $generator->id)->first();

        $userId = auth()->user()->id;

        $role = User::where('id', auth()->user()->id)->first()->hasRole('admin');

        $checkAccess = GeneratorUser::where('user_id', $userId)->where('generator_id', $generator->id)->first();

        if($role){
            $rewinding = RewindingProcedure::with('user')->with('comments')->where('generator_id', $generator->id)->whereHas('comments', function ($query){
                $query->where('user_id', auth()->user()->id);
            })->get();
        }else{
            if($checkAccess){
                $rewinding = RewindingProcedure::with('user')->with('comments')->where('generator_id', $generator->id)->get();
        }else{
            return redirect()->route('accessRequest', $generator->id);
        }
        }
        return Inertia::render('GeneratorResultPage', [
            'role' => $role,
            'generator' => $gen,
            'rewinding' => $rewinding,
        ]);

    }

    public function accessRequest(Generator $generator)
    {
        $generator = Generator::where('id', $generator->id)->get();

        return Inertia::render('AccessRequestPage', [
            'generator' => $generator,
        ]);
    }


    public function requestAccess(Request $request)
    {
        $userId = auth()->user()->id;
        GeneratorUser::create([
            'user_id' => $userId,
            'generator_id' => $request->generator,
        ]);

        return redirect()->route('dashboard');
    }

    public function search(Request $request)
    {
        $search = $request->search;
        $generators = Generator::search($search)->get();
        return Inertia::render('HomePage', [
            'results' => $generators,
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
        $generator->delete();
    }
}
