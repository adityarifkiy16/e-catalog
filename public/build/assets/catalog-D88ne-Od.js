let I=null;function M(e){I=e}function D(){return I}function J(){$("#loading").removeClass("d-none")}function L(){$("#loading").addClass("d-none")}function W(e){return e.slice().sort((i,a)=>i.pivot.motif&&!a.pivot.motif?-1:!i.pivot.motif&&a.pivot.motif?1:0).map(i=>"/storage/"+i.path)}function B(){$(document).on("click",".modalDownload",function(e){e.preventDefault();const i=$(this).data("id"),a="catalog/pdf/product?id="+encodeURIComponent(i);S(this,a)}),$("#btn-download").on("click",function(e){e.preventDefault(),S(this,"catalog/pdf?category="+encodeURIComponent(D()))})}function S(e,i){const a=$(e);a.prop("disabled",!0).html('<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Mengunduh...'),window.open(i,"_blank"),setTimeout(()=>{a.prop("disabled",!1).html('<i class="fa fa-file-download"></i> Download')},5e3)}function _(){let e=sessionStorage.getItem("selectedWallpanel");e&&(e=JSON.parse(e),console.log("Restore wallpanel dari sessionStorage:",e)),$(document).on("click",".modalContact",function(i){i.preventDefault(),console.log("Klik tombol order",$(this).data("code"));const a="62816659688";let t="";e&&e.code?t=`Halo Admin,
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

Apakah produk ini masih tersedia? Terima kasih.`,window.open(`https://wa.me/${a}?text=${encodeURIComponent(t)}`,"_blank")})}function O(){$(window).scroll(function(){$(this).scrollTop()>100?$("#btn-scroll-top").fadeIn():$("#btn-scroll-top").fadeOut()}),$("#btn-scroll-top").click(function(){return $("html, body").animate({scrollTop:0},500),!1})}function U(e,i){let a="";e.forEach(t=>{var o,m,f,v,x,k,j;const n=t.photo?`/storage/${t.photo}`:"https://via.placeholder.com/300x200?text=No+Image",c=W(t.images),l=[n,...c],s=JSON.stringify(l).replace(/"/g,"&quot;"),d=((o=t.category)==null?void 0:o.name)??"Tanpa Kategori";((m=t.category)==null?void 0:m.display_style)==="square"||i===null?a+=`
                    <div class="col-md-2 col-6 mb-4">
                        <div class="h-100 product-card"
                    `:((f=t.category)==null?void 0:f.display_style)==="rectangle"?a+=`
                    <div class="col-md-4 col-6 mb-4">
                        <div class="h-100 product-card"
                    `:a+=`
                    <div class="col-md-2 col-6 mb-4">
                        <div class="h-100 product-card d-flex flex-column justify-content-center align-items-center"
                    `,a+=`
                    data-id="${t.id}"
                    data-code="${t.code}"
                    data-category="${d}"
                    data-jenis="${((x=(v=t.category)==null?void 0:v.jenis)==null?void 0:x.name)??""}"
                    data-images="${s}"
                    data-image="${n}"
                    >
                       <img 
                            src="${n}" 
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
                                object-position: ${((j=(k=t.category)==null?void 0:k.jenis)==null?void 0:j.name)==="PVC Board"?"bottom center":"center center"};
                            "
                        >
                        <div class="card-body d-flex flex-column text-center">
                            <h4 class="card-title font-weight-bold text-uppercase mb-2">
                                ${i==5?t.code.split(" ").slice(1).join(" "):t.code}
                            </h4>
                            <h6 class="card-text text-muted mb-1">${d}</h6>
                        </div>
                    </div>
                </div>`}),$("#product-list .row").append(a)}function E(e,i,a){if(i==null)return;e.forEach(l=>{l.path&&a.add(l.path)});const t=Array.from(a),n=$("#mockup-carousel-inner"),c=$("#mockup-carousel-indicators");n.empty(),c.empty(),t.length>0?(t.length===1?($("#mockup .carousel-control-next").addClass("d-none"),$("#mockup .carousel-control-prev").addClass("d-none")):($("#mockup .carousel-control-next").removeClass("d-none"),$("#mockup .carousel-control-prev").removeClass("d-none")),t.slice(0,5).forEach((l,s)=>{n.append(`
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
                    `)}),$("#mockup").removeClass("d-none")):$("#mockup").addClass("d-none")}let p=null,r=null,g=1,h=!1,y=!1;const T=new Set;function C(e){p=e.selectedJenis,r=e.category??null}function u(e=null){return new Promise((i,a)=>{if(!r||r==="null"||r===""?$("#btn-download").addClass("d-none"):$("#btn-download").removeClass("d-none"),h||y)return i();h=!0,J(),console.log("selectedJenis",p);const t=$("#search-input").val();$.ajax({url:"/catalog",type:"GET",data:{page:g,search:t,jenis:p,category:r},success:function(n){const c=n.data.data??[];c.length>0?(U(c,p),g++,g>n.data.last_page&&(y=!0)):(g===1&&($("#mockup").addClass("d-none"),$("#product-list .row").append(`<div class="col-12"><img src="dist/img/no-data.png" alt="no-data"
                                class="img-fluid mx-auto d-block" style="max-width: 100%; height: auto; margin-top: 100px; margin-bottom: 100px;"></div>`)),y=!0),K(n,e),console.log(n),i()},error:function(){console.log("Gagal memuat data."),a()},complete:function(){h=!1,L()}})})}function K(e,i=null){var s,d;const a=((s=e.jenis)==null?void 0:s.categories)??[],t=(d=e.jenis)==null?void 0:d.name,n=e;switch(a.length===0?$("#category-container").addClass("d-none"):$("#category-container").removeClass("d-none"),r&&(n.category.images.length===0&&$("#mockup").addClass("d-none"),E(n.category.images,p,T)),t){case"PVC Board":$("#category-container, #category-modal-container").addClass("d-none");break;case"Wallboard":case"UV Board":$("#category-menu-item-label, #category-modal-item-label").html("Motif");break;case"Wallpanel":break;case"Aksesoris":$("#category-container, #category-modal-container").addClass("d-none");break;default:$("#category-menu-item-label, #category-modal-item-label").html("Kategori")}let c='<li class="nav-item font-poppins">',l=a;console.log(l),i&&(l=a.filter(o=>o.jenis_id===5||o.jenis_id===2)),console.log(l),l.filter(o=>i?o.id!==25:!0).forEach(o=>{c+=`
            <a class="nav-link text-white category-filter d-flex align-items-center justify-content-start" 
                href="#" data-jenis-id="${o.jenis_id}" data-id="${o.id}">
                <img src="${o.path?"storage/"+o.path:"dist/img/product/1.webp"}" alt="${o.name}" 
                class="mr-2 img-thumbnail" style="width: 50px; height: 50px; object-fit: contain;">
                <span class="text-capitalize">${o.name} ${o.products_count>0?`(${o.products_count})`:""}</span>
            </a>`}),c+="</li>",$("#category-menu-item, #category-menu-item-modal").html(c),!r&&a.length>0?(r=a[0].id,M(r),w(),u()):r&&$(`.category-filter[data-id="${r}"]`).addClass("active")}function w(){g=1,h=!1,y=!1,T.clear(),$("#product-list .row").html("")}let b=!1;function P(e){$(document).off("click",".category-filter"),$(document).on("click",".category-filter",async function(i){if(i.preventDefault(),b)return;b=!0;const a=$(this).data("id");try{C({selectedJenis:e,category:a}),M(a),$("#filterModal").modal("hide"),w(),await u()}catch(t){console.error("Gagal memuat data:",t)}finally{b=!1}})}$(document).ready(function(){let e=new URLSearchParams(window.location.search).get("jenis"),i=new URLSearchParams(window.location.search).get("category"),a;(e==5||e==2)&&sessionStorage.removeItem("selectedWallpanel"),C({selectedJenis:e,category:i}),u(),e&&($("#category-container").removeClass("d-md-none"),$("#catalog-col").removeClass("center-content")),$(window).width()<768&&$("#filter-container").addClass("d-none"),(e==1||e==3||e==4)&&($("#filter-container").addClass("d-none"),$("#catalog-col").removeClass("col-md-10"),$("#catalog-col").addClass("col-md-12")),$("#search-input").on("input",function(){clearTimeout(a),a=setTimeout(()=>{w(),u()},500)}),$(window).on("scroll",function(){const l=$(window).scrollTop(),s=$(window).height(),d=$(document).height();l+s>=d-150&&u()});function t(l,s=null){$("#carousel-product-image").empty(),$("#thumbnailGallery").empty();let d=[...l];s&&(d=[...s,...l]),d.forEach((o,m)=>{const f=m===0?"active":"";$("#carousel-product-image").append(`
                    <div class="carousel-item ${f}">
                        <img src="${o}" class="img-fluid d-block mx-auto"
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
                    <img src="${o}" class="img-thumbnail m-1 thumbnail-image" style="width: 5rem; height: 5rem; object-fit: cover; cursor: pointer;" data-index="${m}">
                `)}),l.length<=1?($("#carouselProduct .carousel-control-next").addClass("d-none"),$("#carouselProduct .carousel-control-prev").addClass("d-none")):($("#carouselProduct .carousel-control-next").removeClass("d-none"),$("#carouselProduct .carousel-control-prev").removeClass("d-none")),$("#thumbnailGallery").on("click",".thumbnail-image",function(){const o=$(this).data("index");$("#carouselProduct .carousel-item").removeClass("active"),$("#carouselProduct .carousel-item").eq(o).addClass("active")})}let n=null;const c=sessionStorage.getItem("selectedWallpanel");c&&(n=JSON.parse(c),console.log("Restore wallpanel dari sessionStorage:",n)),$(document).on("click",".product-card",function(){const l=$(this).data("code"),s=$(this).data("category"),d=JSON.parse($(this).attr("data-images").replace(/&quot;/g,'"')),o=$(this).data("jenis"),m=$(this).data("id");if(o.toLowerCase()==="wallpanel"){$("#filter-container").removeClass("d-none"),$("#catalog-col").addClass("col-md-10").removeClass("col-md-12"),n={code:l,images:d,productId:m,jenis:o},sessionStorage.setItem("selectedWallpanel",JSON.stringify(n)),w(),C({selectedJenis:[2,5]}),u(n),P([2,5]),$(window).width()<768&&$("#filter-container").addClass("d-none"),console.log("Pilih wallpanel:",n);return}if(o.toLowerCase()==="uv board"||o.toLowerCase()==="wallboard"){n?(console.log("Klik UV Board / Wallboard saat ada wallpanel terpilih"),console.log("Wallpanel saat ini:",n),t(d,n.images),$("#modalCode").text(l),$("#productModalLabel").text(l),$("#modalCategory").text("Wallpanel "+n.code),$("#modalDownload").data("id",m),$("#productModal").modal("show"),$("#modalContact").data("jenis",n.jenis),$("#modalContact").data("category",s),$("#modalContact").data("code",l)):(console.log("Belum pilih wallpanel, tampilkan UV Board sebagai produk biasa"),t(d),$("#modalCode").text(l),$("#productModalLabel").text(l),$("#modalCategory").text(o+" / "+s),$("#modalDownload").data("id",m),$("#productModal").modal("show"),$("#modalContact").data("jenis",o),$("#modalContact").data("category",s),$("#modalContact").data("code",l));return}t(d),$("#modalCode").text(l),$("#productModalLabel").text(l),$("#modalCategory").text(o+" / "+s),$("#modalDownload").data("id",m),$("#productModal").modal("show"),$("#modalContact").data("jenis",o),$("#modalContact").data("category",s),$("#modalContact").data("code",l),console.log("Produk biasa:",l)}),P(e),B(),_(),O()});
