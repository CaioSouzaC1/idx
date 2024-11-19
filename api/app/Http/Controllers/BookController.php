<?php

namespace App\Http\Controllers;

use App\Builder\ReturnApi;
use App\Exceptions\ApiException;
use App\Http\Requests\BookController\DestroyRequest;
use App\Http\Requests\BookController\IndexRequest;
use App\Http\Requests\BookController\MostReadRequest;
use App\Http\Requests\BookController\ShowRequest;
use App\Http\Requests\BookController\StoreRequest;
use App\Http\Requests\BookController\UpdateRequest;
use App\Services\BookService;

class BookController extends Controller
{

    public function __construct(public BookService $bookService) {}


    /**
     * Display a listing of the resource.
     */
    public function index(IndexRequest $request)
    {
        try {
            return ReturnApi::success(
                $this->bookService->index(
                    $request->validated(),
                ),
                'Livros consultados com sucesso!'
            );
        } catch (\Exception $e) {
            throw new ApiException($e->getMessage() ?? 'Erro ao consultar livros.', $e->getCode() ?? 400);
        }
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreRequest $request)
    {
        try {
            return ReturnApi::success(
                $this->bookService->store(
                    $request->validated(),
                ),
                'Livro criado com sucesso!'
            );
        } catch (\Exception $e) {
            throw new ApiException($e->getMessage() ?? 'Erro ao criar livro.', $e->getCode() ?? 400);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(ShowRequest $request)
    {
        try {
            return ReturnApi::success(
                $this->bookService->show(
                    $request->validated(),
                ),
                'Livro consultado com sucesso!'
            );
        } catch (\Exception $e) {
            throw new ApiException($e->getMessage() ?? 'Erro ao consultar livro.', $e->getCode() ?? 400);
        }
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateRequest $request)
    {
        try {
            return ReturnApi::success(
                $this->bookService->update(
                    $request->validated(),
                ),
                'Livro atualizado com sucesso!'
            );
        } catch (\Exception $e) {
            throw new ApiException($e->getMessage() ?? 'Erro ao atulizar livro.', $e->getCode() ?? 400);
        }
    }

    /**
     * Destroy the specified resource in storage.
     */
    public function destroy(DestroyRequest $request)
    {
        try {
            return ReturnApi::success(
                $this->bookService->destroy(
                    $request->validated(),
                ),
                'Livro deletado com sucesso!'
            );
        } catch (\Exception $e) {
            throw new ApiException($e->getMessage() ?? 'Erro ao deletar livro.', $e->getCode() ?? 400);
        }
    }

    public function mostRead(MostReadRequest $request)
    {
        try {
            return ReturnApi::success(
                $this->bookService->mostRead(
                    $request->validated(),
                ),
                'Livros mais lidos consultados com sucesso!'
            );
        } catch (\Exception $e) {
            throw new ApiException($e->getMessage() ?? 'Erro ao consultar livros mais lidos.', $e->getCode() ?? 400);
        }
    }

    public function mostFinished(MostReadRequest $request)
    {
        try {
            return ReturnApi::success(
                $this->bookService->mostFinished(
                    $request->validated(),
                ),
                'Livros mais finalizados consultados com sucesso!'
            );
        } catch (\Exception $e) {
            throw new ApiException($e->getMessage() ?? 'Erro ao consultar livros mais finalizados.', $e->getCode() ?? 400);
        }
    }
}
