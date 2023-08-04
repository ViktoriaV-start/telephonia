<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Controllers\EmailController;
use App\Models\Application;
use App\Models\User;
use App\Repositories\ApplicationRepository;
use Illuminate\Contracts\View\View;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;

class ApplicationController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        if(!Auth::user()) return redirect()->route('login');
        return view('admin.applications');
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
    public function store(Request $request, Application $application)
    {
        return match (true){
           $request->post('method') === 'getData' => $this->getData($request),
           default => 'break',
        };
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
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
        $application = new Application();
        $validator = Validator::make($request['params'], $application->rulesDescription(),[], $application->attributeNames());
        if($validator->fails()) {
            return [
                'status' => 'error',
                'errors' => $validator->errors()
            ];
        }

        try {
            $editableApplication = Application::find($id);
            $editableApplication->description = $request['params']['description'];
            $saveStatus = $editableApplication->save();
            if($saveStatus) {
                return ['status' => 'ok'];
            }
        } catch (\Exception $exception) {
            return [
                'status' => 'error',
                'message' => $exception->getMessage()
            ];
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
    // Получение данных на страницу с пагинацией
    // Параметры -> все необязательные:
    // page: '1' // номер необходимой страницы
    // search: '%',  // значения строки ввода
    // column: 'name' // название сортируемого столбца: 'name', 'email', 'company', 'phone', 'is_integrator', 'created_at', 'agent_id', 'agreement'
    // order: 'asc', // 'asc', 'desc'
    // perPage: '10' // количество строк на странице
    private function getData($request)
    {
        $page = $request->post('page') ?? '1';
        $search = $request->post('search') ?? '%';
        $column = $request->post('column') ?? 'client_name';
        $order = $request->post('order') ?? 'asc';
        $perPages = $request->post('perPage') ?? '10';
        $adminRole = $request->post('adminRole');
        $adminId = $request->post('adminId');
        if(!$adminRole) return redirect()->route('login');
        if(!$adminId) return redirect()->route('login');
        $data = (new Application)->getAllApplicationsToPaginate($page, $search, $column, $order, $perPages, $adminRole, $adminId)->toArray();
        return $data;
    }

    public function redirect(){
        return redirect('admin/applications');
    }

}

