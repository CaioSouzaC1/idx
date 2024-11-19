<?php

namespace App\Services;

use App\Models\Book;
use App\Models\UserHasReadBook;
use App\Utils\Filename;
use Carbon\Carbon;
use Illuminate\Pagination\LengthAwarePaginator;
use Illuminate\Support\Facades\DB;
use Smalot\PdfParser\Parser;

class BookService
{

    public function index(array $data): LengthAwarePaginator
    {

        $search = $data['search'] ?? '';
        $categoryId = $data['category_id'] ?? '';

        return Book::when($search, function ($query) use ($search) {
            $query->where('title', 'like', '%$search%');
        })->when($categoryId, function ($query) use ($categoryId) {
            $query->where('category_id', '=', $categoryId);
        })->paginate(perPage: $data['per_page'], page: $data['page']);
    }

    public function store(array $data)
    {

        $thumbPath = $data['thumb']->storeAs('/books/thumbs', Filename::formatImageName($data['thumb']));
        $pdfPath = $data['pdf']->storeAs('/books', Filename::formatImageName($data['pdf']));

        $parser = new Parser();
        $pdf = $parser->parseFile(storage_path('app/public/' . $pdfPath));
        $pageCount = count($pdf->getPages());

        unset($data['thumb']);
        unset($data['pdfPath']);

        return Book::create([...$data, 'thumb_path' => $thumbPath, 'pdf_path' => $pdfPath, 'page_count' => $pageCount]);
    }

    public function destroy(array $data): bool
    {
        return Book::where('id', $data['id'])->delete();
    }

    public function show(array $data): Book
    {
        return Book::where('id', $data['id'])->first();
    }

    public function update(array $data): bool
    {

        $thumbPath = $data['thumb']->storeAs('/books/thumbs', Filename::formatImageName($data['thumb']));
        $pdfPath = $data['pdf']->storeAs('/books', Filename::formatImageName($data['pdf']));

        unset($data['thumb']);
        unset($data['pdf']);

        return Book::where('id', $data['id'])->update([...$data, 'thumb_path' => $thumbPath, 'pdf_path' => $pdfPath]);
    }

    public function mostRead(array $data)
    {
        return UserHasReadBook::query()
            ->select('book_id', DB::raw('COUNT(*) as read_count'))
            ->where('updated_at', '>=', Carbon::now()->subDays($data['day_quantity']))
            ->groupBy('book_id')
            ->orderByDesc('read_count')
            ->paginate(perPage: $data['per_page'], page: $data['page']);
    }

    public function mostFinished(array $data)
    {
        return UserHasReadBook::query()
            ->join('books', 'books.id', '=', 'user_has_read_books.book_id')
            ->select('books.id as book_id', 'books.title', DB::raw('COUNT(user_has_read_books.id) as finished_count'))
            ->whereRaw('user_has_read_books.page >= (books.page_count * 0.9)')
            ->where('user_has_read_books.updated_at', '>=', Carbon::now()->subDays($data['day_quantity']))
            ->groupBy('books.id', 'books.title')
            ->orderByDesc('finished_count')
            ->paginate(perPage: $data['per_page'], page: $data['page']);
    }
}
