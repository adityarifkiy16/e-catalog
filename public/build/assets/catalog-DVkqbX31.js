let I=null;function M(e){I=e}function L(){return I}function B(){$("#loading").removeClass("d-none")}function _(){$("#loading").addClass("d-none")}function J(e){return e.slice().sort((o,a)=>o.pivot.motif&&!a.pivot.motif?-1:!o.pivot.motif&&a.pivot.motif?1:0).map(o=>"/storage/"+o.path)}function K(){$(document).on("click",".modalDownload",function(e){e.preventDefault();const o=$(this).data("id"),a="catalog/pdf/product?id="+encodeURIComponent(o);P(this,a)}),$("#btn-download").on("click",function(e){e.preventDefault(),P(this,"catalog/pdf?category="+encodeURIComponent(L()))})}function P(e,o){const a=$(e);a.prop("disabled",!0).html('<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Mengunduh...'),window.open(o,"_blank"),setTimeout(()=>{a.prop("disabled",!1).html('<i class="fa fa-file-download"></i> Download')},5e3)}function U(){$(document).on("click",".modalContact",function(e){e.preventDefault(),console.log("Klik tombol order",$(this).data("code"));const o="62816659688";let a="";$(this).data("wallpanel")?a=`Halo Admin,
Saya tertarik dengan produk berikut:

• Tipe Wallpanel: *${$(this).data("wallpanel")}*
• Kode Motif : *${$(this).data("code")}*
• Produk : *${$(this).data("jenis")}*
• Kategori: *${$(this).data("category")}*

Apakah produk ini masih tersedia? Terima kasih.`:a=`Halo Admin,
Saya tertarik dengan produk berikut:

• Kode Motif : *${$(this).data("code")}*
• Produk : *${$(this).data("jenis")}*
• Kategori: *${$(this).data("category")}*

Apakah produk ini masih tersedia? Terima kasih.`,window.open(`https://wa.me/${o}?text=${encodeURIComponent(a)}`,"_blank")})}function E(){$(window).scroll(function(){$(this).scrollTop()>100?$("#btn-scroll-top").fadeIn():$("#btn-scroll-top").fadeOut()}),$("#btn-scroll-top").click(function(){return $("html, body").animate({scrollTop:0},500),!1})}function G(e,o){let a="";e.forEach(n=>{var t,m,p,v,k,x,j;const i=n.photo?`/storage/${n.photo}`:"https://via.placeholder.com/300x200?text=No+Image",c=J(n.images),l=[i,...c],s=JSON.stringify(l).replace(/"/g,"&quot;"),d=((t=n.category)==null?void 0:t.name)??"Tanpa Kategori";((m=n.category)==null?void 0:m.display_style)==="square"||o===null?a+=`
                    <div class="col-md-2 col-6 mb-4">
                        <div class="h-100 product-card"
                    `:((p=n.category)==null?void 0:p.display_style)==="rectangle"?a+=`
                    <div class="col-md-4 col-6 mb-4">
                        <div class="h-100 product-card"
                    `:a+=`
                    <div class="col-md-2 col-6 mb-4">
                        <div class="h-100 product-card d-flex flex-column justify-content-center align-items-center"
                    `,a+=`
                    data-id="${n.id}"
                    data-code="${n.code}"
                    data-category="${d}"
                    data-jenis="${((k=(v=n.category)==null?void 0:v.jenis)==null?void 0:k.name)??""}"
                    data-images="${s}"
                    data-image="${i}"
                    >
                       <img 
                            src="${i}" 
                            class="card-img-top" 
                            alt="${n.name}" 
                            style="
                                border : 1px solid #2c2c2c;
                                min-height: 10rem;
                                aspect-ratio: 1/1;
                                height: auto; 
                                border-radius: 8px;
                                width: 100%; 
                                object-fit: cover; 
                                object-position: ${((j=(x=n.category)==null?void 0:x.jenis)==null?void 0:j.name)==="PVC Board"?"bottom center":"center center"};
                            "
                        >
                        <div class="card-body d-flex flex-column text-center">
                            <h4 class="card-title font-weight-bold text-uppercase mb-2">
                                ${o==5?n.code.split(" ").slice(1).join(" "):n.code}
                            </h4>
                            <h6 class="card-text text-muted mb-1">${d}</h6>
                        </div>
                    </div>
                </div>`}),$("#product-list .row").append(a)}function O(e,o,a){if(o==null)return;e.forEach(l=>{l.path&&a.add(l.path)});const n=Array.from(a),i=$("#mockup-carousel-inner"),c=$("#mockup-carousel-indicators");i.empty(),c.empty(),n.length>0?(n.length===1?($("#mockup .carousel-control-next").addClass("d-none"),$("#mockup .carousel-control-prev").addClass("d-none")):($("#mockup .carousel-control-next").removeClass("d-none"),$("#mockup .carousel-control-prev").removeClass("d-none")),n.slice(0,5).forEach((l,s)=>{i.append(`
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
                    `),c.append(`
                        <li data-target="#carouselExampleControls" data-slide-to="${s}" ${s===0?'class="active"':""}></li>
                    `)}),$("#mockup").removeClass("d-none")):$("#mockup").addClass("d-none")}let y=null,r=null,g=1,f=!1,h=!1,T=null;const D=new Set;function C(e){y=e.selectedJenis,r=e.category??null}function u(e=null){return e!==null&&(T=e),new Promise((o,a)=>{if(!r||r==="null"||r===""?$("#btn-download").addClass("d-none"):$("#btn-download").removeClass("d-none"),f||h)return o();f=!0,B();const n=$("#search-input").val();$.ajax({url:"/catalog",type:"GET",data:{page:g,search:n,jenis:y,category:r},success:function(i){const c=i.data.data??[];c.length>0?(G(c,y),g++,g>i.data.last_page&&(h=!0)):(g===1&&($("#mockup").addClass("d-none"),$("#product-list .row").append(`<div class="col-12"><img src="dist/img/no-data.png" alt="no-data"
                                class="img-fluid mx-auto d-block" style="max-width: 100%; height: auto; margin-top: 100px; margin-bottom: 100px;"></div>`)),h=!0),W(i,e),o()},error:function(){console.log("Gagal memuat data."),a()},complete:function(){f=!1,_()}})})}function W(e,o=null){var s,d;o=o??T;const a=((s=e.jenis)==null?void 0:s.categories)??[],n=(d=e.jenis)==null?void 0:d.name,i=e;switch(a.length===0?$("#category-container").addClass("d-none"):$("#category-container").removeClass("d-none"),r&&(i.category.images.length===0&&$("#mockup").addClass("d-none"),O(i.category.images,y,D)),n){case"PVC Board":$("#category-container, #category-modal-container").addClass("d-none");break;case"Wallboard":case"UV Board":$("#category-menu-item-label, #category-modal-item-label").html("Motif");break;case"Wallpanel":break;case"Aksesoris":$("#category-container, #category-modal-container").addClass("d-none");break;default:$("#category-menu-item-label, #category-modal-item-label").html("Kategori")}let c='<li class="nav-item font-poppins">',l=a;o&&(l=a.filter(t=>t.jenis_id===5||t.jenis_id===2&&t.id!==25)),l.forEach(t=>{c+=`
            <a class="nav-link text-white category-filter d-flex align-items-center justify-content-start" 
                href="#" data-jenis-id="${t.jenis_id}" data-id="${t.id}">
                <img src="${t.path?"storage/"+t.path:"dist/img/product/1.webp"}" alt="${t.name}" 
                class="mr-2 img-thumbnail" style="width: 50px; height: 50px; object-fit: contain;">
                <span class="text-capitalize">${t.name} ${t.products_count>0?`(${t.products_count})`:""}</span>
            </a>`}),c+="</li>",$("#category-menu-item, #category-menu-item-modal").html(c),!r&&a.length>0?(r=a[0].id,M(r),w(),u(o)):r&&$(`.category-filter[data-id="${r}"]`).addClass("active")}function w(){g=1,f=!1,h=!1,D.clear(),$("#product-list .row").html("")}let b=!1;function S(e){$(document).off("click",".category-filter"),$(document).on("click",".category-filter",async function(o){if(o.preventDefault(),b)return;b=!0;const a=$(this).data("id");try{C({selectedJenis:e,category:a}),M(a),$("#filterModal").modal("hide"),w(),await u()}catch(n){console.error("Gagal memuat data:",n)}finally{b=!1}})}$(document).ready(function(){let e=new URLSearchParams(window.location.search).get("jenis"),o=new URLSearchParams(window.location.search).get("category"),a;(e==5||e==2)&&sessionStorage.removeItem("selectedWallpanel"),C({selectedJenis:e,category:o}),u(),e&&($("#category-container").removeClass("d-md-none"),$("#catalog-col").removeClass("center-content")),$(window).width()<768&&$("#filter-container").addClass("d-none"),(e==1||e==3||e==4)&&($("#filter-container").addClass("d-none"),$("#catalog-col").removeClass("col-md-10"),$("#catalog-col").addClass("col-md-12")),$("#search-input").on("input",function(){clearTimeout(a),a=setTimeout(()=>{w(),u()},500)}),$(window).on("scroll",function(){const l=$(window).scrollTop(),s=$(window).height(),d=$(document).height();l+s>=d-150&&u()});function n(l,s=null){$("#carousel-product-image").empty(),$("#thumbnailGallery").empty();let d=[...l];s&&(d=[...s,...l]),d.forEach((t,m)=>{const p=m===0?"active":"";$("#carousel-product-image").append(`
                    <div class="carousel-item ${p}">
                        <img src="${t}" class="img-fluid d-block mx-auto"
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
                    <img src="${t}" class="img-thumbnail m-1 thumbnail-image" style="width: 5rem; height: 5rem; object-fit: cover; cursor: pointer;" data-index="${m}">
                `)}),l.length<=1?($("#carouselProduct .carousel-control-next").addClass("d-none"),$("#carouselProduct .carousel-control-prev").addClass("d-none")):($("#carouselProduct .carousel-control-next").removeClass("d-none"),$("#carouselProduct .carousel-control-prev").removeClass("d-none")),$("#thumbnailGallery").on("click",".thumbnail-image",function(){const t=$(this).data("index");$("#carouselProduct .carousel-item").removeClass("active"),$("#carouselProduct .carousel-item").eq(t).addClass("active")})}let i=null;const c=sessionStorage.getItem("selectedWallpanel");c&&(i=JSON.parse(c),console.log("Restore wallpanel dari sessionStorage:",i)),$(document).on("click",".product-card",function(){const l=$(this).data("code"),s=$(this).data("category"),d=JSON.parse($(this).attr("data-images").replace(/&quot;/g,'"')),t=$(this).data("jenis"),m=$(this).data("id");if(t.toLowerCase()==="wallpanel"){$("#filter-container").removeClass("d-none"),$("#catalog-col").addClass("col-md-10").removeClass("col-md-12"),i={code:l,images:d,productId:m,jenis:t},sessionStorage.setItem("selectedWallpanel",JSON.stringify(i)),w(),C({selectedJenis:[2,5]}),u(i),S([2,5]),$(window).width()<768&&$("#filter-container").addClass("d-none"),console.log("Pilih wallpanel:",i);return}if(t.toLowerCase()==="uv board"||t.toLowerCase()==="wallboard"){i?(console.log("Klik UV Board / Wallboard saat ada wallpanel terpilih"),console.log("Wallpanel saat ini:",i),n(d,i.images),$("#modalCode").text(l),$("#productModalLabel").text(l),$("#modalCategory").html("Wallpanel <strong>"+i.code+"</strong>"),$("#modalDownload").data("id",m),$("#productModal").modal("show"),$("#modalContact").data("wallpanel",i.code),$("#modalContact").data("jenis",i.jenis),$("#modalContact").data("category",s),$("#modalContact").data("code",l)):(console.log("Belum pilih wallpanel, tampilkan UV Board sebagai produk biasa"),n(d),$("#modalCode").text(l),$("#productModalLabel").text(l),$("#modalCategory").text(t+" / "+s),$("#modalDownload").data("id",m),$("#productModal").modal("show"),$("#modalContact").data("jenis",t),$("#modalContact").data("category",s),$("#modalContact").data("code",l));return}n(d),$("#modalCode").text(l),$("#productModalLabel").text(l),$("#modalCategory").text(t+" / "+s),$("#modalDownload").data("id",m),$("#productModal").modal("show"),$("#modalContact").data("jenis",t),$("#modalContact").data("category",s),$("#modalContact").data("code",l),console.log("Produk biasa:",l)}),S(e),K(),U(),E()});
