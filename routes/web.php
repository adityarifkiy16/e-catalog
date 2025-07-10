<?php

use Illuminate\Support\Facades\Route;

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

Route::get("/", [App\Http\Controllers\CatalogController::class, "index"])->name("catalog");
Route::get("/catalog", [App\Http\Controllers\CatalogController::class, "show"])->name("catalog.show");
Route::get("/catalog/pdf", [App\Http\Controllers\TProductController::class, "downloadPdf"])->name("catalog.pdf");
Route::get("/catalog/pdf/product", [App\Http\Controllers\TProductController::class, "downloadPdfProduct"])->name("catalog.pdf.product");

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

    // Product management routes
    Route::get("/products", [App\Http\Controllers\TProductController::class, "index"])->name("products.index");
    Route::get("/products/create", [App\Http\Controllers\TProductController::class, "create"])->name("products.create");
    Route::post("/products", [App\Http\Controllers\TProductController::class, "store"])->name("products.store");
    Route::get("/products/{product}/edit", [App\Http\Controllers\TProductController::class, "edit"])->name("products.edit");
    Route::put("/products/{product}", [App\Http\Controllers\TProductController::class, "update"])->name("products.update");
    Route::delete("/products/{product}", [App\Http\Controllers\TProductController::class, "destroy"])->name("products.destroy");
    Route::get("/products/search", [App\Http\Controllers\TProductController::class, "search"])->name("products.search");
    Route::get("/products/categories", [App\Http\Controllers\TProductController::class, "getCategoriesByJenis"])->name("products.getCategories");
    Route::get("/products/delete-image", [App\Http\Controllers\TProductController::class, "deleteImage"])->name("products.delete-image");
    Route::get("/products/delete-by-category", [App\Http\Controllers\TProductController::class, "destroyByCategory"])->name("products.destroy-by-category");
});
