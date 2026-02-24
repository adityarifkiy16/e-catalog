<?php

namespace App\Jobs;

use App\Mail\CatalogGeneratedMail;
use App\Models\MVersion;
use App\Services\PdfServices;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Mail;

class GenerateCatalogPdfJob implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;
    protected $versionId;
    protected $jenisId;
    protected $typeId;
    /**
     * Create a new job instance.
     */
    public function __construct($versionId, $jenisId, $typeId)
    {
        $this->versionId = $versionId;
        $this->jenisId = $jenisId;
        $this->typeId = $typeId;
    }

    /**
     * Execute the job.
     */
    public function handle(PdfServices $pdfService): void
    {
        $version = MVersion::find($this->versionId);
        $exists = DB::table('generated_pdfs')
            ->where('version_id', $version->id)
            ->where('jenis_id', $this->jenisId)
            ->where('type_id', $this->typeId)
            ->first();

        if ($exists && file_exists(storage_path('app/public/' . $exists->path))) {
            unlink(storage_path('app/public/' . $exists->path));
            DB::table('generated_pdfs')->where('id', $exists->id)->delete();
        }


        $path = $pdfService->generateCatalogPdf(
            $version,
            $this->jenisId,
            $this->typeId,
            null,
            true
        );
        DB::table('generated_pdfs')->insert([
            'path' => $path,
            'version_id' => $version->id,
            'jenis_id' => $this->jenisId,
            'type_id' => $this->typeId
        ]);

        $email = config('app.admin_email');

        Mail::to($email)->send(new CatalogGeneratedMail($version, $path));
    }
}
