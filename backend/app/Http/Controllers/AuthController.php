<?php

namespace App\Http\Controllers;

use App\Traits\AuthTrait;
use App\Http\Requests\Auth\LoginRequest;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class AuthController extends Controller
{
    use AuthTrait;

    /**
     * Login user and create token
     *
     * @param  LoginRequest $request
     * @return JsonResponse
     */
    public function login(LoginRequest $request): JsonResponse
    {
        return $this->handleLogin($request);
    }

    /**
     * Logout User (Revoke the token)
     *
     * @param  Request $request
     * @return JsonResponse
     */
    public function logout(Request $request): JsonResponse
    {
        $request->user()->token()->revoke();

        return response()->json(['message' => 'Successfully logged out.']);
    }

    /**
     * Get the authenticated user
     *
     * @param  Request $request
     * @return JsonResponse
     */
    public function user(Request $request): JsonResponse
    {
        return response()->json($request->user());
    }
}
