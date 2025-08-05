<?php

namespace App\Http\Controllers\Api;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Routing\Controller;

class ValidationController extends Controller
{
    public function checkUsername(Request $request)
    {
        $query = User::where('username', $request->input('username'));

        if ($request->has('ignore_id')) {
            $query->where('id', '!=', $request->input('ignore_id'));
        }

        return response()->json(['exists' => $query->exists()]);
    }

    public function checkEmail(Request $request)
    {
        $query = User::where('email', $request->input('email'));

        if ($request->has('ignore_id')) {
            $query->where('id', '!=', $request->input('ignore_id'));
        }

        return response()->json(['exists' => $query->exists()]);
    }
}
