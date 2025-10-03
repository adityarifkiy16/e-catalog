<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\MVariantController;
use App\Http\Controllers\TVariantValueController;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "web" middleware group. Make something great!
|
*/

Route::get("/catalog", [App\Http\Controllers\CatalogController::class, "catalog"])->name("catalog");
Route::get("/", [App\Http\Controllers\CatalogController::class, "index"])->name("catalog.index");

// Delete unused images
Route::get("/delete-unused-image", [App\Http\Controllers\TProductController::class, "deleteUnusedImages"])->name("delete-unused-image");

Route::get("/clear-cache", [App\Http\Controllers\TImageController::class, "clear"])->name("clear-cache");


// DOWNLOAD PDF
Route::get("/catalog/pdf", [App\Http\Controllers\TProductController::class, "downloadPdf"])->name("catalog.pdf");
Route::get("/catalog/pdf/product", [App\Http\Controllers\TProductController::class, "downloadPdfProduct"])->name("catalog.pdf.product");
Route::post("/products/{product}/viewed", [App\Http\Controllers\TProductController::class, "show"])->name("products.viewed.stored");


Route::controller(App\Http\Controllers\AuthController::class)->middleware("guest")->group(function () {
    Route::get("/admin", "index")->name("login");
    Route::post("/admin", "store")->name("login.post");
    Route::get("/forget-password", "forgetPassword")->name("forget-password");
    Route::post("/forget-password", "forgetPasswordPost")->name("forget-password.post");
    Route::get("/reset-password", "resetPassword")->name("reset-password");
    Route::post("/reset-password", "resetPasswordPost")->name("reset-password.post");
});

Route::middleware("auth")->group(function () {
    Route::get("/home", [App\Http\Controllers\DashboardController::class, "index"])->name("dashboard");
    Route::post("/logout", [App\Http\Controllers\AuthController::class, "logout"])->name("logout");

    // User management routes
    Route::get("/users", [App\Http\Controllers\UserController::class, "index"])->name("users.index");
    Route::get("/users/create", [App\Http\Controllers\UserController::class, "create"])->name("users.create");
    Route::post("/users", [App\Http\Controllers\UserController::class, "store"])->name("users.store");
    Route::get("/users/{user}/edit", [App\Http\Controllers\UserController::class, "edit"])->name("users.edit");
    Route::put("/users/{user}", [App\Http\Controllers\UserController::class, "update"])->name("users.update");
    Route::delete("/users/{user}", [App\Http\Controllers\UserController::class, "destroy"])->name("users.destroy");
    Route::get("/users/search", [App\Http\Controllers\UserController::class, "search"])->name("users.search");

    // Role management routes
    Route::get("/roles", [App\Http\Controllers\MRoleController::class, "index"])->name("role.index");
    Route::get("/role/create", [App\Http\Controllers\MRoleController::class, "create"])->name("role.create");
    Route::post("/role", [App\Http\Controllers\MRoleController::class, "store"])->name("role.store");
    Route::get("/role/{role}/edit", [App\Http\Controllers\MRoleController::class, "edit"])->name("role.edit");
    Route::put("/role/{role}", [App\Http\Controllers\MRoleController::class, "update"])->name("role.update");
    Route::delete("/role/{role}", [App\Http\Controllers\MRoleController::class, "destroy"])->name("role.destroy");

    // Jenis management routes
    Route::get("/jenis", [App\Http\Controllers\MJenisController::class, "index"])->name("jenis.index");
    Route::get("/jenis/create", [App\Http\Controllers\MJenisController::class, "create"])->name("jenis.create");
    Route::post("/jenis", [App\Http\Controllers\MJenisController::class, "store"])->name("jenis.store");
    Route::get("/jenis/{jenis}/edit", [App\Http\Controllers\MJenisController::class, "edit"])->name("jenis.edit");
    Route::put("/jenis/{jenis}", [App\Http\Controllers\MJenisController::class, "update"])->name("jenis.update");
    Route::delete("/jenis/{jenis}", [App\Http\Controllers\MJenisController::class, "destroy"])->name("jenis.destroy");

    // Category management routes
    Route::get("/categories", [App\Http\Controllers\MCategoriesController::class, "index"])->name("categories.index");
    Route::get("/categories/create", [App\Http\Controllers\MCategoriesController::class, "create"])->name("categories.create");
    Route::post("/categories", [App\Http\Controllers\MCategoriesController::class, "store"])->name("categories.store");
    Route::get("/categories/{categories}/edit", [App\Http\Controllers\MCategoriesController::class, "edit"])->name("categories.edit");
    Route::put("/categories/{categories}", [App\Http\Controllers\MCategoriesController::class, "update"])->name("categories.update");
    Route::delete("/categories/{categories}", [App\Http\Controllers\MCategoriesController::class, "destroy"])->name("categories.destroy");
    Route::get('/categories/by-type/{typeId}', [\App\Http\Controllers\MCategoriesController::class, 'getByType'])
        ->name('categories.byType');
    Route::get('/categories/by-jenis/{jenisId}', [\App\Http\Controllers\MCategoriesController::class, 'getByJenis'])->name('categories.byJenis');

    // Product management routes
    Route::get("/products", [App\Http\Controllers\TProductController::class, "index"])->name("products.index");
    Route::get("/products/create", [App\Http\Controllers\TProductController::class, "create"])->name("products.create");
    Route::post("/products", [App\Http\Controllers\TProductController::class, "store"])->name("products.store");
    Route::get("/products/{product}/edit", [App\Http\Controllers\TProductController::class, "edit"])->name("products.edit");
    Route::put("/products/{product}", [App\Http\Controllers\TProductController::class, "update"])->name("products.update");
    Route::delete("/products/{product}", [App\Http\Controllers\TProductController::class, "destroy"])->name("products.destroy");
    Route::get("/products/search", [App\Http\Controllers\TProductController::class, "search"])->name("products.search");
    Route::get("/products/delete-image", [App\Http\Controllers\TProductController::class, "deleteImage"])->name("products.delete-image");
    Route::get("/products/delete-by-category", [App\Http\Controllers\TProductController::class, "destroyByCategory"])->name("products.destroy-by-category");
    Route::get("/products/bulk-upload/create", [App\Http\Controllers\TProductController::class, "bulkUpload"])->name("products.bulk.create");
    Route::post("/products/bulk-upload", [App\Http\Controllers\TProductController::class, "storeBulkUpload"])->name("products.bulk.store");
    Route::delete("/products/reset-mockup/{product}", [App\Http\Controllers\TProductController::class, "resetMockup"])->name("products.reset-mockup");
    Route::delete("/products/reset-motif/{product}", [App\Http\Controllers\TProductController::class, "resetMotif"])->name("products.reset-motif");

    // Product viewed
    Route::get("/products/viewed", [App\Http\Controllers\ProductViewController::class, "index"])->name("products.viewed");


    // Type
    Route::get("/type", [App\Http\Controllers\MTypeController::class, "index"])->name("type.index");
    Route::get("/type/create", [App\Http\Controllers\MTypeController::class, "create"])->name("type.create");
    Route::post("/type", [App\Http\Controllers\MTypeController::class, "store"])->name("type.store");
    Route::get("/type/{type}/edit", [App\Http\Controllers\MTypeController::class, "edit"])->name("type.edit");
    Route::put("/type/{type}", [App\Http\Controllers\MTypeController::class, "update"])->name("type.update");
    Route::delete("/type/{type}", [App\Http\Controllers\MTypeController::class, "destroy"])->name("type.destroy");
    Route::get('/types/by-jenis/{jenisId}', [\App\Http\Controllers\MTypeController::class, 'getByJenis'])
        ->name('types.byJenis');

    //Package
    Route::get("/package", [App\Http\Controllers\TPackageController::class, "index"])->name("package.index");
    route::get("/package/bulk-upload/create", [App\Http\Controllers\TPackageController::class, "bulkUpload"])->name("package.bulk.create");
    Route::get("/package/create", [App\Http\Controllers\TPackageController::class, "create"])->name("package.create");
    Route::post("/package", [App\Http\Controllers\TPackageController::class, "store"])->name("package.store");
    Route::get("/package/{package}/edit", [App\Http\Controllers\TPackageController::class, "edit"])->name("package.edit");
    Route::put("/package/{package}", [App\Http\Controllers\TPackageController::class, "update"])->name("package.update");
    Route::delete("/package/{package}", [App\Http\Controllers\TPackageController::class, "destroy"])->name("package.destroy");
});
