<?php


namespace App\Services;

use App\Models\Category;
use App\Utils\Filename;
use Illuminate\Pagination\LengthAwarePaginator;

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

    public function update(array $data)
    {
        $thumbPath = $data['thumb']->storeAs('/categories', Filename::formatImageName($data['thumb']));

        unset($data['thumb']);

        return Category::where('id', $data['id'])->update([...$data, 'thumb_path' => $thumbPath]);
    }
}
