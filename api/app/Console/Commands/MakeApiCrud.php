<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Str;
use Illuminate\Support\Carbon;

class MakeApiCrud extends Command
{

    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'make:api-crud {name}';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Create a new complete crud';

    /**
     * The entity name.
     *
     * @var string
     */
    protected $name = '';

    /**
     * The lowercase entity name.
     *
     * @var string
     */
    protected $lowercaseName = '';

    /**
     * The table name.
     *
     * @var string
     */
    protected $tableName = '';


    /**
     * Execute the console command.
     */
    public function handle(): void
    {

        $parts = explode('/', $this->argument('name'));
        $this->name = ucfirst(end($parts));
        $this->lowercaseName = lcfirst($this->name);
        $this->tableName = Str::plural($this->lowercaseName);

        $this->generateReturnApi();
        $this->generateException();

        $this->generateModel();
        $this->generateService();
        $this->generateRequests();
        $this->generateController();
        $this->generateMigration();
        $this->generateRoutes();
        $this->generateTests();
        $this->generateFactory();
        $this->generateSeeder();
    }

    protected function createDirectoryIfNotExists(string $path)
    {
        if (!File::isDirectory($path))
            File::makeDirectory($path, 0755, true);
    }

    protected function createdFileIfNotExists(string $path, string $content): void
    {
        if (File::exists($path)) {
            $message = sprintf('[%s] already exists.', $path);
            $this->components->warn(string: $message);
            return;
        }

        File::put($path, $content);
        $message = sprintf('[%s] created successfully.', $path);
        $this->components->info(string: $message);
        return;
    }

    protected function generateReturnApi(): void
    {
        $filePath = app_path("Builder/ReturnApi.php");

        $this->createDirectoryIfNotExists("Builder");

        $this->createdFileIfNotExists($filePath, $this->getReturnApiContent());
    }

    protected function generateException(): void
    {
        $filePath = app_path("Exceptions/ApiException.php");

        $this->createDirectoryIfNotExists("Exceptions");

        $this->createdFileIfNotExists($filePath, $this->getExceptionContent());
    }

    protected function generateModel(): void
    {
        $filePath = app_path("Models/{$this->name}.php");

        $this->createDirectoryIfNotExists("Models");

        $this->createdFileIfNotExists($filePath, $this->getModelContent());
    }

    protected function generateService(): void
    {
        $filePath = app_path("Services/{$this->name}Service.php");

        $this->createDirectoryIfNotExists("Services");

        $this->createdFileIfNotExists($filePath, $this->getServiceContent());
    }

    protected function generateRequests(): void
    {
        $requests = [
            "DestroyRequest",
            "IndexRequest",
            "ShowRequest",
            "StoreRequest",
            "UpdateRequest",
        ];

        $filePath = app_path("Http/Requests/{$this->name}Controller");

        $this->createDirectoryIfNotExists($filePath);

        foreach ($requests as $request) {
            $requestFilePath = app_path("Http/Requests/{$this->name}Controller/{$request}.php");
            $this->createdFileIfNotExists($requestFilePath, $this->getRequestContent($request));
        }
    }

    protected function generateController(): void
    {
        $filePath = app_path("Http/Controllers/{$this->name}Controller.php");

        $this->createDirectoryIfNotExists("Http/Controllers");

        $this->createdFileIfNotExists($filePath, $this->getControllerContent());
    }

    protected function generateMigration(): void
    {
        $tableName = Carbon::now()->format('Y_m_d_His') . "_create_{$this->tableName}_table";
        $filePath = base_path("database/migrations/{$tableName}.php");

        $this->createDirectoryIfNotExists("database/migrations");

        $this->createdFileIfNotExists($filePath, $this->getMigrationContent());
    }

    protected function generateRoutes(): void
    {
        $filePath = base_path("routes/api/{$this->lowercaseName}.php");

        $this->createDirectoryIfNotExists("routes/api");

        $this->createdFileIfNotExists($filePath, $this->getRoutesContent());
    }

    protected function generateTests(): void
    {
        $filePath = base_path("tests/Feature/{$this->name}Test.php");

        $this->createDirectoryIfNotExists("tests/Feature");

        $this->createdFileIfNotExists($filePath, $this->getTestsContent());
    }

    protected function generateFactory(): void
    {
        $filePath = base_path("database/factories/{$this->name}Factory.php");

        $this->createDirectoryIfNotExists("database/factories");

        $this->createdFileIfNotExists($filePath, $this->getFactoryContent());
    }

    protected function generateSeeder(): void
    {
        $filePath = base_path("database/seeders/{$this->name}Seeder.php");

        $this->createDirectoryIfNotExists("database/seeders");

        $this->createdFileIfNotExists($filePath, $this->getSeederContent());
    }

    protected function getReturnApiContent(): string
    {
        return "<?php

namespace App\Builder;

use Illuminate\Contracts\Validation\Validator;

class ReturnApi
{

    public static function success(\$data = null, \$message = '')
    {
        return response()->json([
            'error' => false,
            'message' => \$message,
            'data' => \$data
        ]);
    }

    public static function error(\$message = '', \$data = null, \$status = 400)
    {

        return response()->json(
            [
                'error' => true,
                'message' => \$message,
                'data' => \$data
            ],
            \$status
        );
    }

    protected function failedValidation(Validator \$validator)
    {
        \$errors = \$validator->errors();

        return ReturnApi::error(\$errors->first(), \$errors->toArray());
    }
}";
    }

    protected function getExceptionContent(): string
    {
        return "<?php

namespace App\Exceptions;

use App\Builder\ReturnApi;
use Exception;

class ApiException extends Exception
{

    protected \$code = 500;
    protected \$message = 'Unexpected error';

    public function render()
    {
        return ReturnApi::error(message: \$this->message, status: \$this->code);
    }
}";
    }

    protected function getModelContent(): string
    {
        return "<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class {$this->name} extends Model
{
    use HasFactory, SoftDeletes, HasUuids;
}";
    }

    protected function getServiceContent(): string
    {
        return "<?php

namespace App\Services;

use App\Models\\{$this->name};
use Illuminate\Pagination\LengthAwarePaginator;

class {$this->name}Service
{

    public function index(array \$data): LengthAwarePaginator
    {

        \$search = \$data['search'] ?? '';

        return {$this->name}::when(\$search, function (\$query) use (\$search) {
            \$query->where('id', 'like', '%\$search%');
        })->paginate(perPage: \$data['per_page'], page: \$data['page']);
    }

    public function store(array \$data): {$this->name}
    {
        return {$this->name}::create(\$data);
    }

    public function destroy(array \$data): bool
    {
        return {$this->name}::where('id', \$data['id'])->delete();
    }

    public function show(array \$data): {$this->name}
    {
        return {$this->name}::where('id', \$data['id'])->first();
    }

    public function update(array \$data): bool
    {
        return {$this->name}::where('id', \$data['id'])->update(\$data);
    }
}    
        ";
    }

    protected function getRequestContent($request): string
    {
        return "<?php

namespace App\Http\Requests\\{$this->name}Controller;

use Illuminate\Foundation\Http\FormRequest;

class {$request} extends FormRequest
{
    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
        ];
    }
}
";
    }

    protected function getControllerContent(): string
    {
        return "<?php

namespace App\Http\Controllers;

use App\Builder\ReturnApi;
use App\Exceptions\ApiException;
use App\Http\Requests\\{$this->name}Controller\DestroyRequest;
use App\Http\Requests\\{$this->name}Controller\IndexRequest;
use App\Http\Requests\\{$this->name}Controller\ShowRequest;
use App\Http\Requests\\{$this->name}Controller\StoreRequest;
use App\Http\Requests\\{$this->name}Controller\UpdateRequest;
use App\Services\\{$this->name}Service;

class {$this->name}Controller extends Controller
{

    public function __construct(public {$this->name}Service \${$this->lowercaseName}Service) {}


    /**
     * Display a listing of the resource.
     */
    public function index(IndexRequest \$request)
    {
        try {
            return ReturnApi::success(
                \$this->{$this->lowercaseName}Service->index(
                    \$request->validated(),
                ),
                '{$this->name} successfully listed!'
            );
        } catch (\Exception \$e) {
            throw new ApiException(\$e->getMessage() ?? 'Error on listing {$this->lowercaseName}.', \$e->getCode() ?? 400);
        }
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreRequest \$request)
    {
        try {
            return ReturnApi::success(
                \$this->{$this->lowercaseName}Service->store(
                    \$request->validated(),
                ),
                '{$this->name} successfully created!'
            );
        } catch (\Exception \$e) {
            throw new ApiException(\$e->getMessage() ?? 'Error on creating {$this->lowercaseName}.', \$e->getCode() ?? 400);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(ShowRequest \$request)
    {
        try {
            return ReturnApi::success(
                \$this->{$this->lowercaseName}Service->show(
                    \$request->validated(),
                ),
                '{$this->name} successfully consulted!'
            );
        } catch (\Exception \$e) {
            throw new ApiException(\$e->getMessage() ?? 'Error on consulting {$this->lowercaseName}.', \$e->getCode() ?? 400);
        }
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateRequest \$request)
    {
        try {
            return ReturnApi::success(
                \$this->{$this->lowercaseName}Service->update(
                    \$request->validated(),
                ),
                '{$this->name} successfully updated!'
            );
        } catch (\Exception \$e) {
            throw new ApiException(\$e->getMessage() ?? 'Error on updating {$this->lowercaseName}.', \$e->getCode() ?? 400);
        }
    }

    /**
    * Destroy the specified resource in storage.
    */
    public function destroy(DestroyRequest \$request)
    {
        try {
            return ReturnApi::success(
                \$this->{$this->lowercaseName}Service->destroy(
                    \$request->validated(),
                ),
                '{$this->name} successfully deleted!'
            );
        } catch (\Exception \$e) {
            throw new ApiException(\$e->getMessage() ?? 'Error on deleting {$this->lowercaseName}.', \$e->getCode() ?? 400);
        }
    }
}";
    }

    protected function getMigrationContent(): string
    {
        return "<?php
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('{$this->tableName}', function (Blueprint \$table) {
            \$table->uuid('id')->primary();
            \$table->timestamps();
            \$table->softDeletes();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('{$this->tableName}');
    }
};";
    }

    protected function getRoutesContent(): string
    {
        return "<?php

use App\Http\Controllers\\{$this->name}Controller;
use Illuminate\Support\Facades\Route;

Route::controller({$this->name}Controller::class)->group(function () {
    Route::post('/', 'store');
    Route::delete('/{id}', action: 'destroy');
    Route::put('/{id}', action: 'update');
    Route::get('/{id}', 'show');
    Route::get('/', 'index');
});";
    }

    protected function getTestsContent(): string
    {
        return "<?php

use App\Models\\{$this->name};

it('Should create a {$this->lowercaseName}', function () {

    \$token = 'tokenJWT';

    \$body = [];

    \$response = \$this->post(
        '/api/{$this->lowercaseName}',
        \$body,
        [
            'Bearer ' . \$token,
        ]
    );

    \$response->assertStatus(200);
});


it('Should delete a {$this->lowercaseName}', function () {

    \$token = 'tokenJWT';

    \${$this->lowercaseName} = {$this->name}::factory()->create();

    \$response = \$this->delete(
        '/api/{$this->lowercaseName}/' . \${$this->lowercaseName}->id,
        [
            'Bearer ' . \$token,
        ]
    );

    \$response->assertStatus(200);
});


it('Should show a {$this->lowercaseName}', function () {

    \$token = 'tokenJWT';

    \${$this->lowercaseName} = {$this->name}::factory()->create();

    \$response = \$this->get(
        '/api/{$this->lowercaseName}/' . \${$this->lowercaseName}->id,
        [
            'Bearer ' . \$token,
        ]
    );

    \$response->assertStatus(200);
});

it('Should index {$this->lowercaseName}', function () {

    \$token = 'tokenJWT';

    \${$this->lowercaseName} = {$this->name}::factory()->create();

    \$response = \$this->get(
        '/api/{$this->lowercaseName}/',
        [
            'Bearer ' . \$token,
        ]
    );

    \$response->assertStatus(200);
});

it('Should update a {$this->lowercaseName}', function () {

    \$token = 'tokenJWT';

    \${$this->lowercaseName} = {$this->name}::factory()->create();

    \$body = [];

    \$response = \$this->put(
        '/api/{$this->lowercaseName}/' . \${$this->lowercaseName}->id,
        \$body,
        [
            'Bearer ' . \$token,
        ]
    );

    \$response->assertStatus(200);
});";
    }

    protected function getFactoryContent(): string
    {
        return "<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\\$\{$this->name}>
 */
class {$this->name}Factory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            //
        ];
    }
}";
    }

    protected function getSeederContent(): string
    {
        return "<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\\{$this->name};

class {$this->name}Seeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        {$this->name}::factory()->count(10)->create();
    }}";
    }
}
