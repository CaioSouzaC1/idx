<?php

namespace App\Services;

use App\Models\UserHasReadBook;
use Illuminate\Pagination\LengthAwarePaginator;

class UserHasReadBookService
{

    public function index(array $data): LengthAwarePaginator
    {

        $search = $data['search'] ?? '';

        return UserHasReadBook::where(['user_id' => $data['user_id']])
            ->when($search, function ($query) use ($search) {
                $query->whereHas('book', function ($q) use ($search) {
                    $q->where('title', 'like', "%$search%");
                });
            })->paginate(perPage: $data['per_page'], page: $data['page']);
    }

    public function store(array $data): UserHasReadBook
    {

        $relation = UserHasReadBook::where($data)->first();
        if ($relation) {
            return $relation;
        }

        return UserHasReadBook::create($data);
    }

    public function destroy(array $data): bool
    {
        return UserHasReadBook::where('id', $data['id'])->delete();
    }

    public function show(array $data): UserHasReadBook
    {
        return UserHasReadBook::where('id', $data['id'])->first();
    }

    public function update(array $data): bool
    {
        return UserHasReadBook::where(['user_id' => $data['user_id'], 'book_id' => $data['book_id']])->update(['page' => $data['page']]);
    }
}
