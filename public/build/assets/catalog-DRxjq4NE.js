let I=null;function M(e){I=e}function D(){return I}function L(){$("#loading").removeClass("d-none")}function B(){$("#loading").addClass("d-none")}function W(e){return e.slice().sort((i,a)=>i.pivot.motif&&!a.pivot.motif?-1:!i.pivot.motif&&a.pivot.motif?1:0).map(i=>"/storage/"+i.path)}function _(){$(document).on("click",".modalDownload",function(e){e.preventDefault();const i=$(this).data("id"),a="catalog/pdf/product?id="+encodeURIComponent(i);P(this,a)}),$("#btn-download").on("click",function(e){e.preventDefault(),P(this,"catalog/pdf?category="+encodeURIComponent(D()))})}function P(e,i){const a=$(e);a.prop("disabled",!0).html('<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Mengunduh...'),window.open(i,"_blank"),setTimeout(()=>{a.prop("disabled",!1).html('<i class="fa fa-file-download"></i> Download')},5e3)}function J(){$(document).on("click",".modalContact",function(e){e.preventDefault(),console.log("Klik tombol order",$(this).data("code"));const i="62816659688";let a="";$(this).data("wallpanel")?a=`Halo Admin,
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

Apakah produk ini masih tersedia? Terima kasih.`,window.open(`https://wa.me/${i}?text=${encodeURIComponent(a)}`,"_blank")})}function K(){$(window).scroll(function(){$(this).scrollTop()>100?$("#btn-scroll-top").fadeIn():$("#btn-scroll-top").fadeOut()}),$("#btn-scroll-top").click(function(){return $("html, body").animate({scrollTop:0},500),!1})}function U(e,i){let a="";e.forEach(l=>{var t,m,f,v,k,x,j;const n=l.photo?`/storage/${l.photo}`:"https://via.placeholder.com/300x200?text=No+Image",c=W(l.images),o=[n,...c],s=JSON.stringify(o).replace(/"/g,"&quot;"),d=((t=l.category)==null?void 0:t.name)??"Tanpa Kategori";((m=l.category)==null?void 0:m.display_style)==="square"||i===null?a+=`
                    <div class="col-md-2 col-6 mb-4">
                        <div class="h-100 product-card"
                    `:((f=l.category)==null?void 0:f.display_style)==="rectangle"?a+=`
                    <div class="col-md-4 col-6 mb-4">
                        <div class="h-100 product-card"
                    `:a+=`
                    <div class="col-md-2 col-6 mb-4">
                        <div class="h-100 product-card d-flex flex-column justify-content-center align-items-center"
                    `,a+=`
                    data-id="${l.id}"
                    data-code="${l.code}"
                    data-category="${d}"
                    data-jenis="${((k=(v=l.category)==null?void 0:v.jenis)==null?void 0:k.name)??""}"
                    data-images="${s}"
                    data-image="${n}"
                    >
                       <img 
                            src="${n}" 
                            class="card-img-top" 
                            alt="${l.name}" 
                            style="
                                border : 1px solid #2c2c2c;
                                min-height: 10rem;
                                aspect-ratio: 1/1;
                                height: auto; 
                                border-radius: 8px;
                                width: 100%; 
                                object-fit: cover; 
                                object-position: ${((j=(x=l.category)==null?void 0:x.jenis)==null?void 0:j.name)==="PVC Board"?"bottom center":"center center"};
                            "
                        >
                        <div class="card-body d-flex flex-column text-center">
                            <h4 class="card-title font-weight-bold text-uppercase mb-2">
                                ${i==5?l.code.split(" ").slice(1).join(" "):l.code}
                            </h4>
                            <h6 class="card-text text-muted mb-1">${d}</h6>
                        </div>
                    </div>
                </div>`}),$("#product-list .row").append(a)}function E(e,i,a){if(i==null)return;e.forEach(o=>{o.path&&a.add(o.path)});const l=Array.from(a),n=$("#mockup-carousel-inner"),c=$("#mockup-carousel-indicators");n.empty(),c.empty(),l.length>0?(l.length===1?($("#mockup .carousel-control-next").addClass("d-none"),$("#mockup .carousel-control-prev").addClass("d-none")):($("#mockup .carousel-control-next").removeClass("d-none"),$("#mockup .carousel-control-prev").removeClass("d-none")),l.slice(0,5).forEach((o,s)=>{n.append(`
                        <div class="carousel-item ${s===0?"active":""}">
                            <img src="/storage/${o}" id="mockup-image" alt="mockup" 
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
                    `)}),$("#mockup").removeClass("d-none")):$("#mockup").addClass("d-none")}let p=null,r=null,g=1,h=!1,y=!1;const T=new Set;function C(e){p=e.selectedJenis,r=e.category??null}function u(e=null){return new Promise((i,a)=>{if(!r||r==="null"||r===""?$("#btn-download").addClass("d-none"):$("#btn-download").removeClass("d-none"),h||y)return i();h=!0,L(),console.log("selectedJenis",p);const l=$("#search-input").val();$.ajax({url:"/catalog",type:"GET",data:{page:g,search:l,jenis:p,category:r},success:function(n){const c=n.data.data??[];c.length>0?(U(c,p),g++,g>n.data.last_page&&(y=!0)):(g===1&&($("#mockup").addClass("d-none"),$("#product-list .row").append(`<div class="col-12"><img src="dist/img/no-data.png" alt="no-data"
                                class="img-fluid mx-auto d-block" style="max-width: 100%; height: auto; margin-top: 100px; margin-bottom: 100px;"></div>`)),y=!0),O(n,e),console.log(n),i()},error:function(){console.log("Gagal memuat data."),a()},complete:function(){h=!1,B()}})})}function O(e,i=null){var s,d;const a=((s=e.jenis)==null?void 0:s.categories)??[],l=(d=e.jenis)==null?void 0:d.name,n=e;switch(a.length===0?$("#category-container").addClass("d-none"):$("#category-container").removeClass("d-none"),r&&(n.category.images.length===0&&$("#mockup").addClass("d-none"),E(n.category.images,p,T)),l){case"PVC Board":$("#category-container, #category-modal-container").addClass("d-none");break;case"Wallboard":case"UV Board":$("#category-menu-item-label, #category-modal-item-label").html("Motif");break;case"Wallpanel":break;case"Aksesoris":$("#category-container, #category-modal-container").addClass("d-none");break;default:$("#category-menu-item-label, #category-modal-item-label").html("Kategori")}let c='<li class="nav-item font-poppins">',o=a;console.log(o),i&&(o=a.filter(t=>t.jenis_id===5||t.jenis_id===2)),console.log(o),o.filter(t=>i?t.id!==25:!0).forEach(t=>{c+=`
            <a class="nav-link text-white category-filter d-flex align-items-center justify-content-start" 
                href="#" data-jenis-id="${t.jenis_id}" data-id="${t.id}">
                <img src="${t.path?"storage/"+t.path:"dist/img/product/1.webp"}" alt="${t.name}" 
                class="mr-2 img-thumbnail" style="width: 50px; height: 50px; object-fit: contain;">
                <span class="text-capitalize">${t.name} ${t.products_count>0?`(${t.products_count})`:""}</span>
            </a>`}),c+="</li>",$("#category-menu-item, #category-menu-item-modal").html(c),!r&&a.length>0?(r=a[0].id,M(r),w(),u()):r&&$(`.category-filter[data-id="${r}"]`).addClass("active")}function w(){g=1,h=!1,y=!1,T.clear(),$("#product-list .row").html("")}let b=!1;function S(e){$(document).off("click",".category-filter"),$(document).on("click",".category-filter",async function(i){if(i.preventDefault(),b)return;b=!0;const a=$(this).data("id");try{C({selectedJenis:e,category:a}),M(a),$("#filterModal").modal("hide"),w(),await u()}catch(l){console.error("Gagal memuat data:",l)}finally{b=!1}})}$(document).ready(function(){let e=new URLSearchParams(window.location.search).get("jenis"),i=new URLSearchParams(window.location.search).get("category"),a;(e==5||e==2)&&sessionStorage.removeItem("selectedWallpanel"),C({selectedJenis:e,category:i}),u(),e&&($("#category-container").removeClass("d-md-none"),$("#catalog-col").removeClass("center-content")),$(window).width()<768&&$("#filter-container").addClass("d-none"),(e==1||e==3||e==4)&&($("#filter-container").addClass("d-none"),$("#catalog-col").removeClass("col-md-10"),$("#catalog-col").addClass("col-md-12")),$("#search-input").on("input",function(){clearTimeout(a),a=setTimeout(()=>{w(),u()},500)}),$(window).on("scroll",function(){const o=$(window).scrollTop(),s=$(window).height(),d=$(document).height();o+s>=d-150&&u()});function l(o,s=null){$("#carousel-product-image").empty(),$("#thumbnailGallery").empty();let d=[...o];s&&(d=[...s,...o]),d.forEach((t,m)=>{const f=m===0?"active":"";$("#carousel-product-image").append(`
                    <div class="carousel-item ${f}">
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
                `)}),o.length<=1?($("#carouselProduct .carousel-control-next").addClass("d-none"),$("#carouselProduct .carousel-control-prev").addClass("d-none")):($("#carouselProduct .carousel-control-next").removeClass("d-none"),$("#carouselProduct .carousel-control-prev").removeClass("d-none")),$("#thumbnailGallery").on("click",".thumbnail-image",function(){const t=$(this).data("index");$("#carouselProduct .carousel-item").removeClass("active"),$("#carouselProduct .carousel-item").eq(t).addClass("active")})}let n=null;const c=sessionStorage.getItem("selectedWallpanel");c&&(n=JSON.parse(c),console.log("Restore wallpanel dari sessionStorage:",n)),$(document).on("click",".product-card",function(){const o=$(this).data("code"),s=$(this).data("category"),d=JSON.parse($(this).attr("data-images").replace(/&quot;/g,'"')),t=$(this).data("jenis"),m=$(this).data("id");if(t.toLowerCase()==="wallpanel"){$("#filter-container").removeClass("d-none"),$("#catalog-col").addClass("col-md-10").removeClass("col-md-12"),n={code:o,images:d,productId:m,jenis:t},sessionStorage.setItem("selectedWallpanel",JSON.stringify(n)),w(),C({selectedJenis:[2,5]}),u(n),S([2,5]),$(window).width()<768&&$("#filter-container").addClass("d-none"),console.log("Pilih wallpanel:",n);return}if(t.toLowerCase()==="uv board"||t.toLowerCase()==="wallboard"){n?(console.log("Klik UV Board / Wallboard saat ada wallpanel terpilih"),console.log("Wallpanel saat ini:",n),l(d,n.images),$("#modalCode").text(o),$("#productModalLabel").text(o),$("#modalCategory").html("Wallpanel <strong>"+n.code+"</strong>"),$("#modalDownload").data("id",m),$("#productModal").modal("show"),$("#modalContact").data("wallpanel",n.code),$("#modalContact").data("jenis",n.jenis),$("#modalContact").data("category",s),$("#modalContact").data("code",o)):(console.log("Belum pilih wallpanel, tampilkan UV Board sebagai produk biasa"),l(d),$("#modalCode").text(o),$("#productModalLabel").text(o),$("#modalCategory").text(t+" / "+s),$("#modalDownload").data("id",m),$("#productModal").modal("show"),$("#modalContact").data("jenis",t),$("#modalContact").data("category",s),$("#modalContact").data("code",o));return}l(d),$("#modalCode").text(o),$("#productModalLabel").text(o),$("#modalCategory").text(t+" / "+s),$("#modalDownload").data("id",m),$("#productModal").modal("show"),$("#modalContact").data("jenis",t),$("#modalContact").data("category",s),$("#modalContact").data("code",o),console.log("Produk biasa:",o)}),S(e),_(),J(),K()});
