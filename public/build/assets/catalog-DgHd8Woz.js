let T=null;function I(a){T=a}function D(){return T}function W(){$("#loading").removeClass("d-none")}function N(){$("#loading").addClass("d-none")}function S(a){return a.slice().sort((n,t)=>n.pivot.motif&&!t.pivot.motif?-1:!n.pivot.motif&&t.pivot.motif?1:0).map(n=>"/storage/"+n.path)}function B(){$(document).on("click",".modalDownload",function(a){a.preventDefault();const n=$(this).data("id"),t="catalog/pdf/product?id="+encodeURIComponent(n);P(this,t)}),$("#btn-download").on("click",function(a){a.preventDefault(),P(this,"catalog/pdf?category="+encodeURIComponent(D()))})}function P(a,n){const t=$(a);t.prop("disabled",!0).html('<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Mengunduh...'),window.open(n,"_blank"),setTimeout(()=>{t.prop("disabled",!1).html('<i class="fa fa-file-download"></i> Download')},5e3)}function K(){$(document).on("click",".modalContact",function(a){a.preventDefault(),console.log("Klik tombol order",$(this).data("code"));const n="62816659688";let t="";$(this).data("wallpanel")?t=`Halo Admin,
Saya tertarik dengan produk berikut:

• Tipe Wallpanel: *${$(this).data("wallpanel")}*
• Kode Motif : *${$(this).data("code")}*
• Produk : *${$(this).data("jenis")}*
• Kategori: *${$(this).data("category")}*

Apakah produk ini masih tersedia? Terima kasih.`:$(this).data("kepadatan")?t=`Halo Admin,
Saya tertarik dengan produk berikut:

• Produk : *${$(this).data("jenis")}*
• Ketebalan : *${$(this).data("code")}*
• Kepadatan: *${$(this).data("kepadatan")}*

Apakah produk ini masih tersedia? Terima kasih.`:t=`Halo Admin,
Saya tertarik dengan produk berikut:

• Kode Motif : *${$(this).data("code")}*
• Produk : *${$(this).data("jenis")}*
• Kategori: *${$(this).data("category")}*

Apakah produk ini masih tersedia? Terima kasih.`,window.open(`https://wa.me/${n}?text=${encodeURIComponent(t)}`,"_blank")})}function L(){$(window).scroll(function(){$(this).scrollTop()>100?$("#btn-scroll-top").fadeIn():$("#btn-scroll-top").fadeOut()}),$("#btn-scroll-top").click(function(){return $("html, body").animate({scrollTop:0},500),!1})}function _(a,n){let t="";a.forEach(e=>{var c,m,g,p,h,w,j;const d=e.photo?`/storage/${e.photo}`:"https://via.placeholder.com/300x200?text=No+Image",o=S(e.images),l=[d,...o],s=JSON.stringify(l).replace(/"/g,"&quot;"),i=((c=e.category)==null?void 0:c.name)??"Tanpa Kategori";((m=e.category)==null?void 0:m.display_style)==="square"||n===null?t+=`
                    <div class="col-md-2 col-6 mb-4">
                        <div class="h-100 product-card"
                    `:((g=e.category)==null?void 0:g.display_style)==="rectangle"?t+=`
                    <div class="col-md-4 col-6 mb-4">
                        <div class="h-100 product-card"
                    `:t+=`
                    <div class="col-md-2 col-6 mb-4">
                        <div class="h-100 product-card d-flex flex-column justify-content-center align-items-center"
                    `,console.log(e),t+=`
                    data-id="${e.id}"
                    data-code="${e.code}"
                    data-category="${i}"
                    data-jenis="${((h=(p=e.category)==null?void 0:p.jenis)==null?void 0:h.name)??""}"
                    data-length="${e.panjang}"
                    data-height="${e.tinggi}"
                    data-density="${e.ketebalan}"
                    data-images="${s}"
                    data-image="${d}"
                    >
                       <img 
                            src="${d}" 
                            class="card-img-top" 
                            alt="${e.name}" 
                            style="
                                border : 1px solid #2c2c2c;
                                min-height: 10rem;
                                aspect-ratio: 1/1;
                                height: auto; 
                                border-radius: 8px;
                                width: 100%; 
                                object-fit: cover; 
                                object-position: ${((j=(w=e.category)==null?void 0:w.jenis)==null?void 0:j.name)==="PVC Board"?"bottom center":"center center"};
                            "
                        >
                        <div class="card-body d-flex flex-column text-center">
                            <h4 class="card-title font-weight-bold text-uppercase mb-2">
                                ${n==5?e.code.split(" ").slice(1).join(" "):e.code}
                            </h4>
                            <h6 class="card-text text-muted mb-1">${i}</h6>
                        </div>
                    </div>
                </div>`}),$("#product-list .row").append(t)}function A(a,n){let t="";a.forEach(e=>{const d=e.thumbnail?`/storage/${e.thumbnail}`:"https://via.placeholder.com/300x200?text=No+Image";console.log(n);const o=n==3?"wallpanel":"tanpa kategori";t+=`
                    <div class="col-md-2 col-6 mb-4">
                        <div class="h-100 product-card d-flex flex-column justify-content-center align-items-center"
                    `,t+=`
                    data-id="${e.id}"
                    data-jenis="tipe-wallpanel"
                    data-category="${o}"
                    >
                       <img 
                            src="${d}" 
                            class="card-img-top" 
                            alt="${e.name}" 
                            style="
                                border : 1px solid #2c2c2c;
                                min-height: 10rem;
                                aspect-ratio: 1/1;
                                height: auto; 
                                border-radius: 8px;
                                width: 100%; 
                                object-fit: cover; 
                            "
                        >
                        <div class="card-body d-flex flex-column text-center">
                            <h4 class="card-title font-weight-bold text-uppercase mb-2">
                                ${e.name}
                            </h4>
                            <h6 class="card-text text-muted mb-1">${o}</h6>
                        </div>
                    </div>
                </div>`}),$("#product-list .row").append(t)}function E(a,n,t){if(n==null)return;a.forEach(l=>{l.path&&t.add(l.path)});const e=Array.from(t),d=$("#mockup-carousel-inner"),o=$("#mockup-carousel-indicators");d.empty(),o.empty(),e.length>0?(e.length===1?($("#mockup .carousel-control-next").addClass("d-none"),$("#mockup .carousel-control-prev").addClass("d-none")):($("#mockup .carousel-control-next").removeClass("d-none"),$("#mockup .carousel-control-prev").removeClass("d-none")),e.slice(0,5).forEach((l,s)=>{d.append(`
                        <div class="carousel-item ${s===0?"active":""}">
                            <img src="/storage/${l}" id="mockup-image" alt="mockup" 
                                class="img-fluid w-100 rounded-lg d-block mx-auto"
                                style="
                                    width: 100%;  
                                    height: 70vh;                
                                    aspect-ratio: 16 / 9;      
                                    object-fit: cover;        
                                    object-position: center 75%;   
                                    display: block;
                                    margin: 0 auto;          
                                    border-radius: 8px;        
                                    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1); 
                                ">
                        </div>
                    `),o.append(`
                        <li data-target="#carouselExampleControls" data-slide-to="${s}" ${s===0?'class="active"':""}></li>
                    `)}),$("#mockup").removeClass("d-none")):$("#mockup").addClass("d-none")}let f=null,r=null,u=1,k=!1,y=!1;const M=new Set;function x(a){f=a.selectedJenis,r=a.category??null}function b(a=!0){return new Promise((n,t)=>{if(!r||r==="null"||r===""?$("#btn-download").addClass("d-none"):$("#btn-download").removeClass("d-none"),k||y)return n();k=!0,W();const e=$("#search-input").val();$.ajax({url:"/catalog",type:"GET",data:{page:u,search:e,jenis:f,category:r},success:function(d){console.log("Data berhasil dimuat."),console.log(d);const o=d.data.data??[],l=d.types??[];f==3&&a?(console.log(a),l.length>0&&(A(l,f),u++,u>d.data.last_page&&(y=!0))):(console.log(a),o.length>0?(_(o,f),u++,u>d.data.last_page&&(y=!0)):(u===1&&($("#mockup").addClass("d-none"),$("#product-list .row").append(`<div class="col-12"><img src="dist/img/no-data.png" alt="no-data"
                                class="img-fluid mx-auto d-block" style="max-width: 100%; height: auto; margin-top: 100px; margin-bottom: 100px;"></div>`)),y=!0)),U(d),n()},error:function(){console.log("Gagal memuat data."),t()},complete:function(){k=!1,N()}})})}function U(a){var l,s;const n=((l=a.jenis)==null?void 0:l.categories)??[],t=(s=a.jenis)==null?void 0:s.name,e=a;switch(n.length===0?$("#category-container").addClass("d-none"):$("#category-container").removeClass("d-none"),r&&(e.category.images.length===0&&$("#mockup").addClass("d-none"),E(e.category.images,f,M)),t){case"PVC Board":$("#category-container, #category-modal-container").addClass("d-none");break;case"Wallboard":case"UV Board":$("#category-menu-item-label, #category-modal-item-label").html("Motif");break;case"Wallpanel":break;case"Aksesoris":$("#category-container, #category-modal-container").addClass("d-none");break;default:$("#category-menu-item-label, #category-modal-item-label").html("Kategori")}let d='<li class="nav-item font-poppins">';n.forEach(i=>{d+=`
            <a class="nav-link text-white category-filter d-flex align-items-center justify-content-start" 
                href="#" data-jenis-id="${i.jenis_id}" data-id="${i.id}">
                <img src="${i.path?"storage/"+i.path:"dist/img/product/1.webp"}" alt="${i.name}" 
                class="mr-2 img-thumbnail" style="width: 50px; height: 50px; object-fit: contain;">
                <span class="text-capitalize">${i.name} ${i.products_count>0?`(${i.products_count})`:""}</span>
            </a>`}),d+="</li>",$("#category-menu-item, #category-menu-item-modal").html(d),!r&&n.length>0?(r=n[0].id,I(r),v(),b()):r&&$(`.category-filter[data-id="${r}"]`).addClass("active")}function v(){u=1,k=!1,y=!1,M.clear(),$("#product-list .row").html("")}let C=!1;function G(a){$(document).off("click",".category-filter"),$(document).on("click",".category-filter",async function(n){if(n.preventDefault(),C)return;C=!0;const t=$(this).data("id");try{x({selectedJenis:a,category:t}),I(t),$("#filterModal").modal("hide"),v(),await b(!1)}catch(e){console.error("Gagal memuat data:",e)}finally{C=!1}})}$(document).ready(function(){let a=new URLSearchParams(window.location.search).get("jenis"),n=new URLSearchParams(window.location.search).get("category"),t,e;(a==5||a==2)&&sessionStorage.removeItem("selectedWallpanel"),x({selectedJenis:a,category:n}),b(),a&&($("#category-container").removeClass("d-md-none"),$("#catalog-col").removeClass("center-content")),$(window).width()<768&&$("#filter-container").addClass("d-none"),(a==1||a==3||a==4)&&($("#filter-container").addClass("d-none"),$("#catalog-col").removeClass("col-md-10"),$("#catalog-col").addClass("col-md-12")),$("#search-input").on("input",function(){clearTimeout(t),t=setTimeout(()=>{v(),b()},500)}),$(window).on("scroll",function(){clearTimeout(e),e=setTimeout(()=>{const o=$(window).scrollTop(),l=$(window).height(),s=$(document).height();o+l>=s-150&&b()},200)});function d(o,l=null){$("#carousel-product-image").empty(),$("#thumbnailGallery").empty();let s=[...o];l&&(s=[...l,...o]),s.forEach((i,c)=>{const m=c===0?"active":"";$("#carousel-product-image").append(`
                    <div class="carousel-item ${m}">
                        <img src="${i}" class="img-fluid d-block mx-auto"
                            style="
                                width: 100%;
                                max-width: 400px;
                                aspect-ratio: 1 / 1;
                                object-fit: cover;
                                border-radius: 8px;
                                border: 1px solid #ccc;
                            ">
                    </div>
                `),$("#thumbnailGallery").append(`
                    <img src="${i}" class="img-thumbnail m-1 thumbnail-image" style="width: 5rem; height: 5rem; object-fit: cover; cursor: pointer;" data-index="${c}">
                `)}),o.length<=1?($("#carouselProduct .carousel-control-next").addClass("d-none"),$("#carouselProduct .carousel-control-prev").addClass("d-none")):($("#carouselProduct .carousel-control-next").removeClass("d-none"),$("#carouselProduct .carousel-control-prev").removeClass("d-none")),$("#thumbnailGallery").on("click",".thumbnail-image",function(){const i=$(this).data("index");$("#carouselProduct .carousel-item").removeClass("active"),$("#carouselProduct .carousel-item").eq(i).addClass("active")})}$(document).on("click",".product-card",function(){const o=$(this).data("code"),l=$(this).data("category"),s=$(this).attr("data-images");let i=null;s&&(i=JSON.parse(s.replace(/&quot;/g,'"')));const c=$(this).data("jenis"),m=parseInt($(this).data("length"),10),g=parseInt($(this).data("height"),10),p=parseInt($(this).data("density"),10),h=$(this).data("id");if(c==="tipe-wallpanel"){v(),x({selectedJenis:3,category:66}),b(!1),$("#filter-container").toggleClass("d-none"),$("#catalog-col").toggleClass("col-md-10 col-md-12");return}if(c.toLowerCase()==="uv board"||c.toLowerCase()==="wallboard"){selectedWallpanel?(console.log("Klik UV Board / Wallboard saat ada wallpanel terpilih"),console.log("Wallpanel saat ini:",selectedWallpanel),d(i,selectedWallpanel.images),$("#modalCode").text(o),$("#productModalLabel").text(o),$("#modalCategory").html("Wallpanel <strong>"+selectedWallpanel.code+"</strong>"),$("#modalDownload").data("id",h),$("#productModal").modal("show"),$("#panjang, #tinggi, #ketebalan, #kepadatan, #notes").hide(),$("#modalContact").data("wallpanel",selectedWallpanel.code),$("#modalContact").data("jenis",selectedWallpanel.jenis),$("#modalContact").data("category",l),$("#modalContact").data("code",o)):(console.log("Belum pilih wallpanel, tampilkan UV Board sebagai produk biasa"),d(i),$("#modalCode").text(o),$("#productModalLabel").text(o),$("#modalCategory").text(c+" / "+l),$("#modalDownload").data("id",h),$("#productModal").modal("show"),$("#panjang, #tinggi, #ketebalan, #kepadatan, #notes").hide(),$("#modalContact").data("jenis",c),$("#modalContact").data("category",l),$("#modalContact").data("code",o));return}d(i),$("#modalCode").text(o),$("#productModalLabel").text(o),$("#modalCategory").text(c+" / "+l),$("#modalDownload").data("id",h),$("#productModal").modal("show"),c==="PVC Board"?($("#modalLength").text(m&&!isNaN(m)?m+" cm":"-"),$("#modalHeight").text(g&&!isNaN(g)?g+" cm":"-"),$("#modalDensity").text(p&&!isNaN(p)?p+" mm":"-"),console.log(o),$("#modalKepadatan").html(`
                <span class="badge badge-primary kepadatan" data-value="0,4 mm">0,4 mm</span>
                <span class="badge badge-primary kepadatan" data-value="0,55 mm">0,55 mm</span>
                <span class="badge badge-primary kepadatan" data-value="0,7 mm">0,7 mm</span>
            `)):$("#panjang, #tinggi, #ketebalan, #kepadatan, #notes").hide(),$("#modalContact").data("jenis",c),$("#modalContact").data("category",l),$("#modalContact").data("code",o),console.log("Produk biasa:",o),$("#modalContact").data("kepadatan")&&($(".kepadatan").removeClass("active"),$("#modalContact").data("kepadatan",null),$("#notes").show())}),$(document).on("click",".kepadatan",function(){let o=$(this).data("value");$(this).closest("#productModal").find(".kepadatan").removeClass("active"),$(this).addClass("active"),$("#notes").hide(),$("#modalContact").data("kepadatan",o)}),G(a),B(),K(),L()});
