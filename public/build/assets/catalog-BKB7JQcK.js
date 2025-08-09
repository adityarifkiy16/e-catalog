let I=null;function M(e){I=e}function D(){return I}function J(){$("#loading").removeClass("d-none")}function L(){$("#loading").addClass("d-none")}function W(e){return e.slice().sort((n,a)=>n.pivot.motif&&!a.pivot.motif?-1:!n.pivot.motif&&a.pivot.motif?1:0).map(n=>"/storage/"+n.path)}function B(){$(document).on("click",".modalDownload",function(e){e.preventDefault();const n=$(this).data("id"),a="catalog/pdf/product?id="+encodeURIComponent(n);S(this,a)}),$("#btn-download").on("click",function(e){e.preventDefault(),S(this,"catalog/pdf?category="+encodeURIComponent(D()))})}function S(e,n){const a=$(e);a.prop("disabled",!0).html('<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Mengunduh...'),window.open(n,"_blank"),setTimeout(()=>{a.prop("disabled",!1).html('<i class="fa fa-file-download"></i> Download')},5e3)}function _(){let e=sessionStorage.getItem("selectedWallpanel");e&&(e=JSON.parse(e),console.log("Restore wallpanel dari sessionStorage:",e)),$(document).on("click",".modalContact",function(n){n.preventDefault(),console.log("Klik tombol order",$(this).data("code"));const a="62816659688";let t="";e&&e.code?t=`Halo Admin,
Saya tertarik dengan produk berikut:

• Wallpanel: *${e.code}*
• Motif : *${$(this).data("code")}*
• Jenis: *${$(this).data("jenis")}*
• Kategori: *${$(this).data("category")}*

Apakah produk ini masih tersedia? Terima kasih.`:t=`Halo Admin,
Saya tertarik dengan produk berikut:

• Kode : *${$(this).data("code")}*
• Jenis : *${$(this).data("jenis")}*
• Kategori: *${$(this).data("category")}*

Apakah produk ini masih tersedia? Terima kasih.`,window.open(`https://wa.me/${a}?text=${encodeURIComponent(t)}`,"_blank")})}function O(){$(window).scroll(function(){$(this).scrollTop()>100?$("#btn-scroll-top").fadeIn():$("#btn-scroll-top").fadeOut()}),$("#btn-scroll-top").click(function(){return $("html, body").animate({scrollTop:0},500),!1})}function U(e,n){let a="";e.forEach(t=>{var l,m,C,v,k,x,j;const s=t.photo?`/storage/${t.photo}`:"https://via.placeholder.com/300x200?text=No+Image",c=W(t.images),o=[s,...c],i=JSON.stringify(o).replace(/"/g,"&quot;"),d=((l=t.category)==null?void 0:l.name)??"Tanpa Kategori";((m=t.category)==null?void 0:m.display_style)==="square"||n===null?a+=`
                    <div class="col-md-2 col-6 mb-4">
                        <div class="h-100 product-card"
                    `:((C=t.category)==null?void 0:C.display_style)==="rectangle"?a+=`
                    <div class="col-md-4 col-6 mb-4">
                        <div class="h-100 product-card"
                    `:a+=`
                    <div class="col-md-2 col-6 mb-4">
                        <div class="h-100 product-card"
                    `,a+=`
                    data-id="${t.id}"
                    data-code="${t.code}"
                    data-category="${d}"
                    data-jenis="${((k=(v=t.category)==null?void 0:v.jenis)==null?void 0:k.name)??""}"
                    data-images="${i}"
                    data-image="${s}"
                    >
                       <img 
                            src="${s}" 
                            class="card-img-top" 
                            alt="${t.name}" 
                            style="
                                border : 1px solid #2c2c2c;
                                min-height: 10rem;
                                max-width: 10rem;
                                aspect-ratio: 1/1;
                                height: auto; 
                                border-radius: 8px;
                                width: 100%; 
                                object-fit: cover; 
                                object-position: ${((j=(x=t.category)==null?void 0:x.jenis)==null?void 0:j.name)==="PVC Board"?"bottom center":"center center"};
                            "
                        >
                        <div class="card-body d-flex flex-column text-center">
                            <h4 class="card-title font-weight-bold text-uppercase mb-2">
                                ${n==5?t.code.split(" ").slice(1).join(" "):t.code}
                            </h4>
                            <h6 class="card-text text-muted mb-1">${d}</h6>
                        </div>
                    </div>
                </div>`}),$("#product-list .row").append(a)}function E(e,n,a){if(n==null)return;e.forEach(o=>{o.path&&a.add(o.path)});const t=Array.from(a),s=$("#mockup-carousel-inner"),c=$("#mockup-carousel-indicators");s.empty(),c.empty(),t.length>0?(t.length===1?($("#mockup .carousel-control-next").addClass("d-none"),$("#mockup .carousel-control-prev").addClass("d-none")):($("#mockup .carousel-control-next").removeClass("d-none"),$("#mockup .carousel-control-prev").removeClass("d-none")),t.slice(0,5).forEach((o,i)=>{s.append(`
                        <div class="carousel-item ${i===0?"active":""}">
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
                        <li data-target="#carouselExampleControls" data-slide-to="${i}" ${i===0?'class="active"':""}></li>
                    `)}),$("#mockup").removeClass("d-none")):$("#mockup").addClass("d-none")}let p=null,r=null,g=1,f=!1,h=!1;const T=new Set;function b(e){p=e.selectedJenis,r=e.category??null}function u(e=null){return new Promise((n,a)=>{if(!r||r==="null"||r===""?$("#btn-download").addClass("d-none"):$("#btn-download").removeClass("d-none"),f||h)return n();f=!0,J(),console.log("selectedJenis",p);const t=$("#search-input").val();$.ajax({url:"/catalog",type:"GET",data:{page:g,search:t,jenis:p,category:r},success:function(s){const c=s.data.data??[];c.length>0?(U(c,p),g++,g>s.data.last_page&&(h=!0)):(g===1&&($("#mockup").addClass("d-none"),$("#product-list .row").append(`<div class="col-12"><img src="dist/img/no-data.png" alt="no-data"
                                class="img-fluid mx-auto d-block" style="max-width: 100%; height: auto; margin-top: 100px; margin-bottom: 100px;"></div>`)),h=!0),K(s,e),console.log(s),n()},error:function(){console.log("Gagal memuat data."),a()},complete:function(){f=!1,L()}})})}function K(e,n=null){var i,d;const a=((i=e.jenis)==null?void 0:i.categories)??[],t=(d=e.jenis)==null?void 0:d.name,s=e;switch(a.length===0?$("#category-container").addClass("d-none"):$("#category-container").removeClass("d-none"),r&&(s.category.images.length===0&&$("#mockup").addClass("d-none"),E(s.category.images,p,T)),t){case"PVC Board":$("#category-container, #category-modal-container").addClass("d-none");break;case"Wallboard":case"UV Board":$("#category-menu-item-label, #category-modal-item-label").html("Motif");break;case"Wallpanel":break;case"Aksesoris":$("#category-container, #category-modal-container").addClass("d-none");break;default:$("#category-menu-item-label, #category-modal-item-label").html("Kategori")}let c='<li class="nav-item font-poppins">',o=a;console.log(o),n&&(o=a.filter(l=>l.jenis_id===5||l.jenis_id===2)),console.log(o),o.filter(l=>n?l.id!==25:!0).forEach(l=>{c+=`
            <a class="nav-link text-white category-filter d-flex align-items-center justify-content-start" 
                href="#" data-jenis-id="${l.jenis_id}" data-id="${l.id}">
                <img src="${l.path?"storage/"+l.path:"dist/img/product/1.webp"}" alt="${l.name}" 
                class="mr-2 img-thumbnail" style="width: 50px; height: 50px; object-fit: contain;">
                <span class="text-capitalize">${l.name} ${l.products_count>0?`(${l.products_count})`:""}</span>
            </a>`}),c+="</li>",$("#category-menu-item, #category-menu-item-modal").html(c),!r&&a.length>0?(r=a[0].id,M(r),y(),u()):r&&$(`.category-filter[data-id="${r}"]`).addClass("active")}function y(){g=1,f=!1,h=!1,T.clear(),$("#product-list .row").html("")}let w=!1;function P(e){$(document).off("click",".category-filter"),$(document).on("click",".category-filter",async function(n){if(n.preventDefault(),w)return;w=!0;const a=$(this).data("id");try{b({selectedJenis:e,category:a}),M(a),$("#filterModal").modal("hide"),y(),await u()}catch(t){console.error("Gagal memuat data:",t)}finally{w=!1}})}$(document).ready(function(){let e=new URLSearchParams(window.location.search).get("jenis"),n=new URLSearchParams(window.location.search).get("category"),a;(e==5||e==2)&&sessionStorage.removeItem("selectedWallpanel"),b({selectedJenis:e,category:n}),u(),e&&($("#category-container").removeClass("d-md-none"),$("#catalog-col").removeClass("center-content")),$(window).width()<768&&$("#filter-container").addClass("d-none"),(e==1||e==3||e==4)&&($("#filter-container").addClass("d-none"),$("#catalog-col").removeClass("col-md-10"),$("#catalog-col").addClass("col-md-12")),$("#search-input").on("input",function(){clearTimeout(a),a=setTimeout(()=>{y(),u()},500)}),$(window).on("scroll",function(){const o=$(window).scrollTop(),i=$(window).height(),d=$(document).height();o+i>=d-150&&u()});function t(o){$("#carousel-product-image").empty(),$("#thumbnailGallery").empty(),o.forEach((i,d)=>{const l=d===0?"active":"";$("#carousel-product-image").append(`
                    <div class="carousel-item ${l}">
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
                    <img src="${i}" class="img-thumbnail m-1 thumbnail-image" style="width: 5rem; height: 5rem; object-fit: cover; cursor: pointer;" data-index="${d}">
                `)}),o.length<=1?($("#carouselProduct .carousel-control-next").addClass("d-none"),$("#carouselProduct .carousel-control-prev").addClass("d-none")):($("#carouselProduct .carousel-control-next").removeClass("d-none"),$("#carouselProduct .carousel-control-prev").removeClass("d-none")),$("#thumbnailGallery").on("click",".thumbnail-image",function(){const i=$(this).data("index");$("#carouselProduct .carousel-item").removeClass("active"),$("#carouselProduct .carousel-item").eq(i).addClass("active")})}let s=null;const c=sessionStorage.getItem("selectedWallpanel");c&&(s=JSON.parse(c),console.log("Restore wallpanel dari sessionStorage:",s)),$(document).on("click",".product-card",function(){const o=$(this).data("code"),i=$(this).data("category"),d=JSON.parse($(this).attr("data-images").replace(/&quot;/g,'"')),l=$(this).data("jenis"),m=$(this).data("id");if(l.toLowerCase()==="wallpanel"){$("#filter-container").removeClass("d-none"),$("#catalog-col").addClass("col-md-10").removeClass("col-md-12"),s={code:o,images:d,productId:m,jenis:l},sessionStorage.setItem("selectedWallpanel",JSON.stringify(s)),y(),b({selectedJenis:[2,5]}),u(s),P([2,5]),$(window).width()<768&&$("#filter-container").addClass("d-none"),console.log("Pilih wallpanel:",s);return}if(l.toLowerCase()==="uv board"||l.toLowerCase()==="wallboard"){s?(console.log("Klik UV Board / Wallboard saat ada wallpanel terpilih"),console.log("Wallpanel saat ini:",s),t(d),$("#modalCode").text(o),$("#productModalLabel").text(o),$("#modalCategory").text("Wallpanel "+s.code),$("#modalDownload").data("id",m),$("#productModal").modal("show"),$("#modalContact").data("jenis",s.jenis),$("#modalContact").data("category",i),$("#modalContact").data("code",o)):(console.log("Belum pilih wallpanel, tampilkan UV Board sebagai produk biasa"),t(d),$("#modalCode").text(o),$("#productModalLabel").text(o),$("#modalCategory").text(l+" / "+i),$("#modalDownload").data("id",m),$("#productModal").modal("show"),$("#modalContact").data("jenis",l),$("#modalContact").data("category",i),$("#modalContact").data("code",o));return}t(d),$("#modalCode").text(o),$("#productModalLabel").text(o),$("#modalCategory").text(l+" / "+i),$("#modalDownload").data("id",m),$("#productModal").modal("show"),$("#modalContact").data("jenis",l),$("#modalContact").data("category",i),$("#modalContact").data("code",o),console.log("Produk biasa:",o)}),P(e),B(),_(),O()});
