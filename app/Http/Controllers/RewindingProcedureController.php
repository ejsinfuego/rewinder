<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\Generator;
use Illuminate\Http\Request;
use App\Models\RewindingProcedure;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;

class RewindingProcedureController extends Controller
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

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
        $userId = auth()->user()->id;
        $request['user_id'] = $userId;
        $request->validate([
            'generator_id' => 'required',
            'description' => 'required',
            'file' => 'required',
            'step' => 'required',
        ]);
        $file = $request->file('file');
        $filename = time().'.'.$file->getClientOriginalExtension();
        $request['image'] = $filename;
        Storage::disk('public')->put($filename, file_get_contents($file));
        $rewindingProcedure = RewindingProcedure::create([
            'step' => $request->step,
            'comment' => 'sample comment',
            'description' => $request->description,
            'generator_id' => $request->generator_id,
            'image' => $request->image,
            'user_id' => $request->user_id
        ]);




    }

    public function approve(Request $request, RewindingProcedure $rewindingProcedure)
    {

        RewindingProcedure::where('procedure_id', $request->rewinding_id)->update(['status' => 'approved']);

    }

    /**
     * Display the specified resource.
     */
    public function show(Generator $generator)
    {

        $rewindingProcedures = RewindingProcedure::where('generator_id', $generator->id)->get()->sortBy('created_at', SORT_NATURAL);
        $generator = Generator::with('diagnosis')->where('id', $generator->id)->first();

        return Inertia::render('ViewSummaryPage', [
            'diagnoses' => $rewindingProcedures,
            'generator' => $generator,
            'role' => Auth::user()->hasRole('admin') ? 'admin' : (Auth::user()->hasRole('rewinder') ? 'rewinder' : 'client')
        ]);

    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
