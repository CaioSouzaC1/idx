<?php


namespace App\Services;

use App\Models\Category;
use App\Models\UserHasReadBook;
use App\Utils\Filename;
use Carbon\Carbon;
use Illuminate\Pagination\LengthAwarePaginator;
use Illuminate\Support\Facades\DB;

class CategoryService
{

    public function index(array $data): LengthAwarePaginator
    {

        $search = $data["search"] ?? "";

        return Category::when($search, function ($query) use ($search) {
            $query->where("name", "like", "%$search%");
        })->paginate(perPage: $data['per_page'], page: $data['page']);
    }

    public function store(array $data): Category
    {
        $thumbPath = $data['thumb']->storeAs('/categories', Filename::formatImageName($data['thumb']));

        unset($data['thumb']);

        return Category::create([...$data, 'thumb_path' => $thumbPath]);
    }

    public function destroy(array $data): bool
    {
        return Category::where('id', $data['id'])->delete();
    }

    public function show(array $data): Category
    {
        return Category::where('id', $data['id'])->first();
    }

    public function update(array $data): bool
    {
        $thumbPath = $data['thumb']->storeAs('/categories', Filename::formatImageName($data['thumb']));

        unset($data['thumb']);

        return Category::where('id', $data['id'])->update([...$data, 'thumb_path' => $thumbPath]);
    }

    public function mostRead(array $data)
    {
        return UserHasReadBook::query()
        ->join('books', 'books.id', '=', 'user_has_read_books.book_id')
        ->join('categories', 'categories.id', '=', 'books.category_id')
        ->select(
            'books.category_id',
            'categories.name as category_name',
            DB::raw('COUNT(user_has_read_books.id) as read_count')
        )
            ->where('user_has_read_books.updated_at', '>=', Carbon::now()->subDays($data['day_quantity']))
            ->groupBy('books.category_id', 'categories.name')
            ->orderByDesc('read_count')
            ->paginate(perPage: $data['per_page'], page: $data['page']);
    }
}
