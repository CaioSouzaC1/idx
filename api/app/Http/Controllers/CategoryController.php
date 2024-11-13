<?php

namespace App\Http\Controllers;

use App\Builder\ReturnApi;
use App\Exceptions\ApiException;
use App\Http\Requests\CategoryController\DestroyRequest;
use App\Http\Requests\CategoryController\IndexRequest;
use App\Http\Requests\CategoryController\ShowRequest;
use App\Http\Requests\CategoryController\StoreRequest;
use App\Http\Requests\CategoryController\UpdateRequest;
use App\Services\CategoryService;

class CategoryController extends Controller
{

    public function __construct(public CategoryService $categoryService) {}


    /**
     * Display a listing of the resource.
     */
    public function index(IndexRequest $request)
    {
        try {
            return ReturnApi::success(
                $this->categoryService->index(
                    $request->validated(),
                ),
                "Categorias consultadas com sucesso!"

            );
        } catch (\Exception $e) {
            throw new ApiException($e->getMessage() ?? "Erro ao consultar categorias", $e->getCode() ?? 400);
        }
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreRequest $request)
    {
        try {
            return ReturnApi::success(
                $this->categoryService->store(
                    $request->validated(),
                ),
                "Categoria criada com sucesso!"

            );
        } catch (\Exception $e) {
            throw new ApiException($e->getMessage() ?? "Erro ao criar categoria", $e->getCode() ?? 400);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(ShowRequest $request)
    {
        try {
            return ReturnApi::success(
                $this->categoryService->show(
                    $request->validated(),
                ),
                "Categoria consultada com sucesso!"

            );
        } catch (\Exception $e) {
            throw new ApiException($e->getMessage() ?? "Erro ao consultar categoria", $e->getCode() ?? 400);
        }
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateRequest $request)
    {
        try {
            return ReturnApi::success(
                $this->categoryService->update(
                    $request->validated(),
                ),
                "Categoria atualizada com sucesso!"
            );
        } catch (\Exception $e) {
            throw new ApiException($e->getMessage() ?? "Erro ao atualizar categoria", $e->getCode() ?? 400);
        }
    }


    public function destroy(DestroyRequest $request)
    {
        try {
            return ReturnApi::success(
                $this->categoryService->destroy(
                    $request->validated(),
                ),
                "Categoria deletada com sucesso!"
            );
        } catch (\Exception $e) {
            throw new ApiException($e->getMessage() ?? "Erro ao deletar categoria", $e->getCode() ?? 400);
        }
    }
}
