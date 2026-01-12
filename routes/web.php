<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\MRoleController;
use App\Http\Controllers\MTypeController;
use App\Http\Controllers\MJenisController;
use App\Http\Controllers\TImageController;
use App\Http\Controllers\CatalogController;
use App\Http\Controllers\MSettingController;
use App\Http\Controllers\TPackageController;
use App\Http\Controllers\TProductController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\MCategoriesController;
use App\Http\Controllers\ProductViewController;
use App\Http\Controllers\ProductVersionController;

// Public Routes
Route::get("/", [CatalogController::class, "index"])->name("catalog.index");
Route::get("/catalog", [CatalogController::class, "catalog"])->name("catalog");
Route::get("/catalog/product", [CatalogController::class, "product"])->name("catalog.product");
Route::get("/catalog/pdf", [App\Http\Controllers\PDFController::class, "downloadPdf"])->name("catalog.download");
Route::post("/products/{product}/viewed", [TProductController::class, "show"])->name("products.viewed.stored");

// Authentication Routes (Guest Only)
Route::controller(AuthController::class)->middleware("guest")->group(function () {
    Route::get("/admin", "index")->name("login");
    Route::post("/admin", "store")->name("login.post");
    Route::get("/forget-password", "forgetPassword")->name("forget-password");
    Route::post("/forget-password", "forgetPasswordPost")->name("forget-password.post");
    Route::get("/reset-password", "resetPassword")->name("reset-password");
    Route::post("/reset-password", "resetPasswordPost")->name("reset-password.post");
});


Route::middleware("auth")->group(function () {
    Route::get("/home", [DashboardController::class, "index"])->name("dashboard");
    Route::post("/logout", [AuthController::class, "logout"])->name("logout");

    // 1. User Management
    Route::middleware("permission:management_users")->group(function () {
        Route::resource("users", UserController::class)->except(["show"]);
        Route::get("/users/search", [UserController::class, "search"])->name("users.search");
    });

    // 2. Role Management
    Route::middleware('permission:management_roles')->group(function () {
        Route::resource("role", MRoleController::class)->except(["show"]);
    });

    // 3. Product Management
    Route::middleware("permission:management_product")->group(function () {
        // Jenis management routes
        Route::resource("jenis", MJenisController::class)->except(["show"]);

        // Category management routes
        Route::resource('categories', MCategoriesController::class)->except(["show"]);
        Route::prefix('categories')->name('categories.')->group(function () {
            Route::controller(MCategoriesController::class)->group(function () {
                Route::get('/by-type/{typeId}', 'getByType')->name('byType');
                Route::get('/by-jenis/{jenisId}', 'getByJenis')->name('byJenis');
            });
        });

        // Product management routes
        Route::resource('products', TProductController::class)->except(['show']);
        Route::prefix('products')->name('products.')->group(function () {
            Route::controller(TProductController::class)->group(function () {
                Route::get('/search', 'search')->name('search');
                Route::get('/delete-by-category', 'destroyByCategory')->name('destroy-by-category');
                Route::get('/import-excel', 'importExcel')->name('import-excel');
                Route::post('/import', 'import')->name('import');
            });
        });

        // ProductVersion management routes
        Route::resource('product-versions', ProductVersionController::class)->except(['show']);
        Route::prefix('product-versions')->name('product-versions.')->group(function () {
            Route::controller(ProductVersionController::class)->group(function () {
                Route::delete('/reset-mockup/{productVersion}', 'resetMockup')->name('reset-mockup');
                Route::delete('/reset-motif/{productVersion}', 'resetMotif')->name('reset-motif');
                Route::get('/bulk-upload/create', 'bulkCreate')->name('create.bulk');
                Route::post('/bulk-upload', 'storeBulkCreate')->name('store.bulk');
                Route::get('/bulk-mockup/create', 'bulkCreateMotif')->name('bulk.create-motif');
                Route::post('/bulk-mockup', 'storeBulkCreateMotif')->name('bulk.store-motif');
                Route::post("/bulk-destroy", "bulkDestroy")->name("bulk.destroy");
            });
        });


        // Type Management
        Route::resource('type', MTypeController::class)->except(['show']);
        Route::prefix('type')->name('type.')->group(function () {
            Route::controller(MTypeController::class)->group(function () {
                Route::get('/by-jenis/{jenisId}', 'getByJenis')->name('byJenis');
            });
        });

        // Package Management
        Route::resource('package', TPackageController::class)->except(['show']);
        Route::prefix('package')->name('package.')->group(function () {
            Route::controller(TPackageController::class)->group(function () {
                Route::get('/bulk-upload/create', 'bulkUpload')->name('bulk.create');
                Route::post('/bulk-destroy', 'bulkDestroy')->name('bulk.destroy');
            });
        });
    });

    // 4. Reports Management
    Route::middleware('permission:view_reports')->group(function () {
        Route::prefix('products')->name('products.')->group(function () {
            Route::controller(ProductViewController::class)->group(function () {
                Route::get('/viewed', 'index')->name('viewed');
                Route::get('/viewed/log', 'productViewLog')->name('viewed.log');
            });
        });
        Route::prefix('laporan')->name('laporan.')->group(function () {
            Route::controller(ProductViewController::class)->group(function () {
                Route::get('/laporan', 'laporan')->name('index');
                Route::get('/download', 'downloadLaporan')->name('download');
            });
        });
    });

    // 5. Settings Management
    Route::middleware('permission:management_settings')->group(function () {
        Route::prefix('settings')->name('settings.')->group(function () {
            Route::controller(MSettingController::class)->group(function () {
                Route::get('/', 'index')->name('index');
                Route::post('/', 'store')->name('store');
            });
        });
    });

    // 6. PDF Management
    Route::resource("pdf", App\Http\Controllers\PDFController::class);

    // 7. Version Management
    Route::resource("version", App\Http\Controllers\MVersionController::class);
});
