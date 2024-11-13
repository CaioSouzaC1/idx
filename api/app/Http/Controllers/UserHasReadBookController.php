<?php

namespace App\Http\Controllers;

use App\Builder\ReturnApi;
use App\Exceptions\ApiException;
use App\Http\Requests\UserHasReadBookController\DestroyRequest;
use App\Http\Requests\UserHasReadBookController\IndexRequest;
use App\Http\Requests\UserHasReadBookController\ShowRequest;
use App\Http\Requests\UserHasReadBookController\StoreRequest;
use App\Http\Requests\UserHasReadBookController\UpdateRequest;
use App\Services\UserHasReadBookService;

class UserHasReadBookController extends Controller
{

    public function __construct(public UserHasReadBookService $userHasReadBookService) {}


    /**
     * Display a listing of the resource.
     */
    public function index(IndexRequest $request)
    {
        try {
            return ReturnApi::success(
                $this->userHasReadBookService->index(
                    $request->validated(),
                ),
                'Leituras listadas com sucesso!'
            );
        } catch (\Exception $e) {
            throw new ApiException($e->getMessage() ?? 'Erro ao listar leituras.', $e->getCode() ?? 400);
        }
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreRequest $request)
    {
        try {
            return ReturnApi::success(
                $this->userHasReadBookService->store(
                    $request->validated(),
                ),
                'Leitura iniciado com sucesso!'
            );
        } catch (\Exception $e) {
            info($e);
            throw new ApiException($e->getMessage() ?? 'Erro ao iniciar leitura.', $e->getCode() ?? 400);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(ShowRequest $request)
    {
        try {
            return ReturnApi::success(
                $this->userHasReadBookService->show(
                    $request->validated(),
                ),
                'Leitura consultada com sucesso!'
            );
        } catch (\Exception $e) {
            throw new ApiException($e->getMessage() ?? 'Error ao consultar leitura.', $e->getCode() ?? 400);
        }
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateRequest $request)
    {
        try {
            return ReturnApi::success(
                $this->userHasReadBookService->update(
                    $request->validated(),
                ),
                'Leitura atualizada com sucesso'
            );
        } catch (\Exception $e) {
            throw new ApiException($e->getMessage() ?? 'Erro ao atualizar leitura', $e->getCode() ?? 400);
        }
    }

    /**
     * Destroy the specified resource in storage.
     */
    public function destroy(DestroyRequest $request)
    {
        try {
            return ReturnApi::success(
                $this->userHasReadBookService->destroy(
                    $request->validated(),
                ),
                'Leitura deletada com sucesso!'
            );
        } catch (\Exception $e) {
            throw new ApiException($e->getMessage() ?? 'Erro ao deletar leitura.', $e->getCode() ?? 400);
        }
    }
}
