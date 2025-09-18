import { bindDownloadButtons } from "./modules/download";
import { bindOrderButton } from "./modules/orderButton";
import { initScrollTopButton } from "./modules/scroll";
import {
    resetState,
    setCatalogConfig,
    loadMoreData,
    setFirstLoad,
    setIsLoading,
    getIsLoading,
} from "./modules/catalogLoader";
import { bindFilterButton } from "./modules/filter";

$(document).ready(function () {
    let selectedJenis = new URLSearchParams(window.location.search).get(
        "jenis"
    );
    let category = new URLSearchParams(window.location.search).get("category");
    let delayTimer;
    let scrollTimer;

    if (selectedJenis == 5 || selectedJenis == 2) {
        sessionStorage.removeItem("selectedWallpanel");
    }

    setCatalogConfig({ selectedJenis, category });
    loadMoreData();

    if (selectedJenis) {
        $("#category-container").removeClass("d-md-none");
        $("#catalog-col").removeClass("center-content");
    }

    if ($(window).width() < 768) {
        $("#filter-container").addClass("d-none");
    }

    if (selectedJenis == 1 || selectedJenis == 3) {
        $("#filter-container").addClass("d-none");
        $("#catalog-col").removeClass("col-md-10");
        $("#catalog-col").addClass("col-md-12");
    }

    $("#search-input").on("input", function () {
        clearTimeout(delayTimer);
        delayTimer = setTimeout(() => {
            resetState();
            loadMoreData();
        }, 500);
    });

    $(window).on("scroll", function () {
        clearTimeout(scrollTimer);
        scrollTimer = setTimeout(() => {
            const scrollTop = $(window).scrollTop();
            const windowHeight = $(window).height();
            const documentHeight = $(document).height();
            if (scrollTop + windowHeight >= documentHeight - 150) {
                if (getIsLoading() === true) return;
                setFirstLoad(false);
                loadMoreData();
            }
        }, 200);
    });

    function renderCarouselProduct(
        images,
        wallpanelImages = null,
        jenis = null
    ) {
        $("#carousel-product-image").empty();
        $("#thumbnailGallery").empty();
        let newimages = [...images];

        if (jenis.toLowerCase() == "uv board") {
            newimages = [...images, ...wallpanelImages];
        } else {
            newimages = [...images];
        }

        newimages.forEach((img, i) => {
            const activeClass = i === 0 ? "active" : "";

            // Carousel utama
            $("#carousel-product-image").append(`
                    <div class="carousel-item ${activeClass}">
                        <img src="${img}" class="img-fluid d-block mx-auto"
                            style="
                                width: 100%;
                                max-width: 400px;
                                aspect-ratio: 1 / 1;
                                object-fit: cover;
                                border-radius: 8px;
                                border: 1px solid #ccc;
                            ">
                    </div>
                `);

            $("#thumbnailGallery").append(`
                    <div class="col-2 mb-0 d-flex justify-content-center">
                        <div style="height: 90%">
                           <img src="${img}" 
                            class="img-thumbnail thumbnail-image p-0 w-100 h-100" 
                            style="
                                height: auto;
                                aspect-ratio: 1 / 1;
                                border: 1px solid #ccc;
                                border-radius: 8px;
                                object-fit: cover;
                                cursor: pointer;"
                            data-index="${i}">
                        </div>
                    </div>
                    `);
        });

        // Sembunyikan kontrol jika hanya 1 gambar
        if (images.length <= 1) {
            $("#carouselProduct .carousel-control-next").addClass("d-none");
            $("#carouselProduct .carousel-control-prev").addClass("d-none");
        } else {
            $("#carouselProduct .carousel-control-next").removeClass("d-none");
            $("#carouselProduct .carousel-control-prev").removeClass("d-none");
        }

        // Aktifkan carousel dengan auto-slide
        $("#carouselProduct").carousel({
            interval: 3000,
            pause: false,
        });

        // Handling klik thumbnail di dalam modal
        let carouselTimeout;
        $("#thumbnailGallery")
            .off("click")
            .on("click", ".thumbnail-image", function () {
                const index = $(this).data("index");

                // Loncat ke slide sesuai thumbnail
                $("#carouselProduct").carousel(index);

                // Tambahkan efek warna biru ke thumbnail aktif
                $(".thumbnail-image").removeClass("active-thumbnail");
                $(this).addClass("active-thumbnail");
                setTimeout(() => {
                    $(this).removeClass("active-thumbnail");
                }, 500);

                // Pause carousel
                $("#carouselProduct").carousel("pause");

                // Hapus timeout sebelumnya
                clearTimeout(carouselTimeout);
                carouselTimeout = setTimeout(() => {
                    $("#carouselProduct").carousel("cycle");
                }, 5000);
            });
    }

    // Handling klik thumbnail di dalam modal
    $(document).on("click", ".product-card", function () {
        const productId = $(this).data("id");
        const code = $(this).data("code");
        const category = $(this).data("category");
        const imagesStr = $(this).attr("data-images");
        const type = $(this).data("type");
        const packages = JSON.parse($(this).attr("data-paket") || "[]");
        let images = null;
        let packagesImgs = null;

        if (Array.isArray(packages)) {
            packagesImgs = packages
                .sort((a, b) => a.order - b.order)
                .map((p) => `/storage/${p.image}`);
        }

        if (imagesStr) {
            images = JSON.parse(imagesStr.replace(/&quot;/g, '"'));
        }

        const jenis = $(this).data("jenis");
        const length = parseInt($(this).data("length"), 10);
        let height = $(this).data("height");
        const width = parseFloat($(this).data("width")).toFixed(1);
        const density = parseFloat($(this).data("density")).toFixed(1);
        const urlVideo = $(this).data("url");

        $("#modalPaket").empty();

        // Click card tipe wallpanel load product category terkait
        if (jenis === "tipe-wallpanel") {
            resetState();
            setCatalogConfig({ selectedJenis: 3, type: type });
            setFirstLoad(false);
            loadMoreData();
            $("#filter-container").toggleClass("d-none");
            $("#catalog-col").toggleClass("col-md-10 col-md-12");
            return;
        }

        if (jenis.toLowerCase() === "uv board") {
            viewProduct(productId);
            height = parseInt(height, 10);
            $("#modalVideo").hide();
            $("#modalCategory").text(category);
            $("#modalLength").text(
                length && !isNaN(length) ? length + " cm" : "-"
            );
            $("#modalHeight").text(
                height && !isNaN(height) ? height + " cm" : "-"
            );
            $("#modalDensity").text(
                density && !isNaN(density) ? density + " mm" : "-"
            );
            $("#modalKepadatan").html(`
                <span class="">0.9</span>
            `);
            if (packages.length > 0) {
                packages
                    .sort((a, b) => a.order - b.order)
                    .map((p) => {
                        $("#modalPaket").append(`
                        <span class="badge badge-outline-primary px-2 py-1 kepadatan" data-value="${p.name}">${p.name}</span>
                    `);
                    });
            } else {
                $("#modalPaket").append(
                    '<span class="text-muted">Tidak ada paket</span>'
                );
                $("#notes, .lebar").hide();
            }
        }

        if (jenis.toLowerCase() === "wallboard") {
            viewProduct(productId);
            height = parseInt(height, 10);
            $("#modalCategory").text(category);
            $("#modalLength").text(
                length && !isNaN(length) ? length + " cm" : "-"
            );
            $("#modalHeight").text(
                height && !isNaN(height) ? height + " cm" : "-"
            );
            $(
                "#ketebalan, #kepadatan, #notes, .paket,  #modalVideo, .lebar"
            ).hide();
        }

        if (jenis === "PVC Board") {
            viewProduct(productId);
            height = parseInt(height, 10);
            $("#modalCategory").text(jenis);
            $("#modalLength").text(
                length && !isNaN(length) ? length + " cm" : "-"
            );
            $("#modalHeight").text(
                height && !isNaN(height) ? height + " cm" : "-"
            );
            $("#modalDensity").text(
                density && !isNaN(density) ? density + " mm" : "-"
            );
            $("#modalKepadatan").html(`
                <span class="badge badge-outline-primary kepadatan" data-value="0,4">0,4 (Lite)</span>
                <span class="badge badge-outline-primary kepadatan" data-value="0,55">0,55 (Standar)</span>
                <span class="badge badge-outline-primary kepadatan" data-value="0,7">0,7 (Heavy-duty)</span>
            `);
            $(".paket,  #modalVideo, .lebar").hide();
        }

        if (jenis === "Wallpanel") {
            viewProduct(productId);
            height = parseFloat(height).toFixed(1);
            $("#modalContact").data("type", type);
            $("#modalCategory").text(category + " / " + type);
            $("#ketebalan, #kepadatan, .paket, #modalVideo").hide();
            $("#modalLength").text(
                length && !isNaN(length) ? length + " cm" : "-"
            );
            $("#modalHeight").text(
                height && !isNaN(height) ? height + " cm" : "-"
            );
            $("#modalLebar").text(width && !isNaN(width) ? width + " cm" : "-");
        }

        if (jenis.toLowerCase() === "aksesoris") {
            viewProduct(productId);
            $("#tinggi, #ketebalan, #kepadatan, .lebar").hide();
            $("#paket").text("Warna");
            $("#modalCategory").text(category);
            $("#modalPaket").append(`
                <span class="badge badge-pill badge-outline-primary kepadatan" data-value="Black">Black</span>
                <span class="badge badge-pill badge-outline-primary kepadatan" data-value="Bronze">Bronze</span>
                <span class="badge badge-pill badge-outline-primary kepadatan" data-value="Rose Gold">Rose Gold</span>
                <span class="badge badge-pill badge-outline-primary kepadatan" data-value="Dark Gray">Dark Gray</span>

            `);
            $("#modalLength").text("3 m");

            $("#modalVideoPlayer").empty();
            $("#modalVideo").hide();
            if (urlVideo) {
                $("#modalVideoPlayer").append(`
                    <iframe class="embed-responsive-item"
                    src="${urlVideo}"
                    title="YouTube video player" frameborder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; web-share;"
                    referrerpolicy="strict-origin-when-cross-origin"
                    allowfullscreen></iframe>
                `);
                $("#modalVideo").show();
            }
        }

        renderCarouselProduct(images, packagesImgs, jenis);
        $("#modalCode").text(code);
        $("#productModalLabel").text(code);
        $("#modalDownload").data("id", productId);
        $("#productModal").modal("show");
        $("#modalContact").data("jenis", jenis);
        $("#modalContact").data("category", category);
        $("#modalContact").data("code", code);

        // ambil data lagi untuk debug
        let modalkepadatan = $("#modalContact").data("kepadatan");
        let modalPaket = $("#modalContact").data("paket");

        // kalau ada kepadatan tersimpan → pastikan badge sesuai aktif
        if (modalkepadatan) {
            $(".kepadatan").removeClass("active");
            $("#modalContact").data("kepadatan", null);
            $("#notes").show();
        }

        if (modalPaket) {
            $(".kepadatan").removeClass("active");
            $("#modalContact").data("kepadatan", null);
            $("#notes").show();
        }

        let elKepadatan = $(".kepadatan");
        if (elKepadatan.length > 0) {
            $(".modalContact").prop("disabled", true);
        } else {
            $(".modalContact").prop("disabled", false);
        }
    });

    $(document).on("click", ".kepadatan", function () {
        $(".modalContact").prop("disabled", false);

        let kepadatan = $(this).data("value");

        // cari modal terdekat biar tidak global
        const $modal = $(this).closest("#productModal");

        // reset active di modal ini
        $modal.find(".kepadatan").removeClass("active");
        $(this).addClass("active");

        // sembunyikan notes
        $("#notes").hide();

        // simpan data kepadatan
        $("#modalContact").data("kepadatan", kepadatan);
    });

    bindFilterButton(selectedJenis);
    bindDownloadButtons();
    bindOrderButton();
    initScrollTopButton();

    function viewProduct(productId) {
        // handling klik product
        $.ajax({
            url: `/products/${productId}/viewed`,
            method: "POST",
            headers: {
                "X-CSRF-TOKEN": $('meta[name="csrf-token"]').attr("content"),
            },
            success: function (res) {
                console.log("View recorded:", res);
            },
            error: function (err) {
                console.error(err);
            },
        });
    }
});
