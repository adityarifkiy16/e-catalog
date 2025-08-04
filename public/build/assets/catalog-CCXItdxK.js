let P=null;function T(e){P=e}function M(){return P}function S(){$("#loading").removeClass("d-none")}function _(){$("#loading").addClass("d-none")}function B(e){return e.slice().sort((o,t)=>o.pivot.motif&&!t.pivot.motif?-1:!o.pivot.motif&&t.pivot.motif?1:0).map(o=>"/storage/"+o.path)}function E(){$(document).on("click",".modalDownload",function(e){e.preventDefault();const o=$(this).data("id"),t="catalog/pdf/product?id="+encodeURIComponent(o);j(this,t)}),$("#btn-download").on("click",function(e){e.preventDefault(),j(this,"catalog/pdf?category="+encodeURIComponent(M()))})}function j(e,o){const t=$(e);t.prop("disabled",!0).html('<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Mengunduh...'),window.open(o,"_blank"),setTimeout(()=>{t.prop("disabled",!1).html('<i class="fa fa-file-download"></i> Download')},5e3)}function J(){$(document).on("click",".modalContact",function(e){e.preventDefault();const o="62816659688",t=`Halo Admin,
Saya tertarik dengan produk berikut:

• Kode Produk: *${$(this).data("code")}*
• Jenis: *${$(this).data("jenis")}*
• Kategori: *${$(this).data("category")}*

Apakah produk ini masih tersedia? Terima kasih.`;window.open(`https://wa.me/${o}?text=${encodeURIComponent(t)}`,"_blank")})}function L(){$(window).scroll(function(){$(this).scrollTop()>100?$("#btn-scroll-top").fadeIn():$("#btn-scroll-top").fadeOut()}),$("#btn-scroll-top").click(function(){return $("html, body").animate({scrollTop:0},500),!1})}function G(e,o){let t="";e.forEach(a=>{var y,b,v,w,C,x,k;const n=a.photo?`/storage/${a.photo}`:"https://via.placeholder.com/300x200?text=No+Image",l=B(a.images),s=[n,...l],c=JSON.stringify(s).replace(/"/g,"&quot;"),h=((y=a.category)==null?void 0:y.name)??"Tanpa Kategori";((b=a.category)==null?void 0:b.display_style)==="square"||o===null?t+=`
                    <div class="col-md-2 mb-4">
                        <div class="h-100 product-card"
                    `:((v=a.category)==null?void 0:v.display_style)==="rectangle"?t+=`
                    <div class="col-md-4 mb-4">
                        <div class="h-100 product-card"
                    `:t+=`
                    <div class="col-md-2 mb-4">
                        <div class="h-100 product-card"
                    `,t+=`
                    data-id="${a.id}"
                    data-code="${a.code}"
                    data-category="${h}"
                    data-jenis="${((C=(w=a.category)==null?void 0:w.jenis)==null?void 0:C.name)??""}"
                    data-images="${c}"
                    data-image="${n}"
                    >
                       <img 
                            src="${n}" 
                            class="card-img-top" 
                            alt="${a.name}" 
                            style="
                                border : 1px solid #ccc;
                                min-height: 200px;
                                height: auto; 
                                border-radius: 8px;
                                width: 100%; 
                                object-fit: cover; 
                                object-position: ${((k=(x=a.category)==null?void 0:x.jenis)==null?void 0:k.name)==="PVC Board"?"bottom center":"center center"};
                            "
                        >
                        <div class="card-body d-flex flex-column text-center">
                            <h4 class="card-title font-weight-bold text-uppercase mb-2">${a.code}</h4>
                            <h6 class="card-text text-muted mb-1">${h}</h6>
                        </div>
                    </div>
                </div>`}),$("#product-list .row").append(t)}function U(e,o,t){if(o==null)return;e.forEach(s=>{s.path&&t.add(s.path)});const a=Array.from(t),n=$("#mockup-carousel-inner"),l=$("#mockup-carousel-indicators");n.empty(),l.empty(),a.length>0?(a.length===1?($("#mockup .carousel-control-next").addClass("d-none"),$("#mockup .carousel-control-prev").addClass("d-none")):($("#mockup .carousel-control-next").removeClass("d-none"),$("#mockup .carousel-control-prev").removeClass("d-none")),a.slice(0,5).forEach((s,c)=>{n.append(`
                        <div class="carousel-item ${c===0?"active":""}">
                            <img src="/storage/${s}" id="mockup-image" alt="mockup" 
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
                    `),l.append(`
                        <li data-target="#carouselExampleControls" data-slide-to="${c}" ${c===0?'class="active"':""}></li>
                    `)}),$("#mockup").removeClass("d-none")):$("#mockup").addClass("d-none")}let g=null,i=null,r=1,u=!1,m=!1;const I=new Set;function D(e){g=e.selectedJenis,i=e.category??null}function d(){return new Promise((e,o)=>{if(!i||i==="null"||i===""?$("#btn-download").addClass("d-none"):$("#btn-download").removeClass("d-none"),u||m)return e();u=!0,S();const t=$("#search-input").val();$.ajax({url:"/catalog",type:"GET",data:{page:r,search:t,jenis:g,category:i},success:function(a){const n=a.data.data??[];n.length>0?(G(n,g),r++,r>a.data.last_page&&(m=!0)):(r===1&&($("#mockup").addClass("d-none"),$("#product-list .row").append(`<div class="col-12"><img src="dist/img/no-data.png" alt="no-data"
                                class="img-fluid mx-auto d-block" style="max-width: 100%; height: auto; margin-top: 100px; margin-bottom: 100px;"></div>`)),m=!0),O(a),e()},error:function(){console.log("Gagal memuat data."),o()},complete:function(){u=!1,_()}})})}function O(e){var l,s;const o=((l=e.jenis)==null?void 0:l.categories)??[],t=(s=e.jenis)==null?void 0:s.name,a=e;switch(o.length===0?$("#category-container").addClass("d-none"):$("#category-container").removeClass("d-none"),i&&(a.category.images.length===0&&$("#mockup").addClass("d-none"),U(a.category.images,g,I)),t){case"PVC Board":$("#category-container, #category-modal-container").addClass("d-none");break;case"Wallboard":case"UV Board":$("#category-menu-item-label, #category-modal-item-label").html("Motif");break;case"Wallpanel":$("#category-container, #category-modal-container").addClass("d-none");break;case"Aksesoris":$("#category-container, #category-modal-container").addClass("d-none");break;default:$("#category-menu-item-label, #category-modal-item-label").html("Kategori")}let n='<li class="nav-item font-poppins">';o.forEach(c=>{n+=`
            <a class="nav-link text-dark category-filter d-flex align-items-center justify-content-start" 
                href="#" data-jenis-id="${c.jenis_id}" data-id="${c.id}">
                <img src="${c.path?"storage/"+c.path:"dist/img/product/1.webp"}" alt="${c.name}" 
                class="mr-2 img-thumbnail" style="width: 50px; height: 50px; object-fit: contain;">
                <span class="text-capitalize">${c.name} ${c.products_count>0?`(${c.products_count})`:""}</span>
            </a>`}),n+="</li>",$("#category-menu-item, #category-menu-item-modal").html(n),!i&&o.length>0?(i=o[0].id,T(i),f(),d()):i&&$(`.category-filter[data-id="${i}"]`).addClass("active")}function f(){r=1,u=!1,m=!1,I.clear(),$("#product-list .row").html("")}let p=!1;function R(e){$(document).on("click",".category-filter",async function(o){if(o.preventDefault(),p)return;p=!0;const t=$(this).data("id");try{D({selectedJenis:e,category:t}),T(t),$("#filterModal").modal("hide"),f(),await d()}catch(a){console.error("Gagal memuat data:",a)}finally{p=!1}})}$(document).ready(function(){const e=new URLSearchParams(window.location.search).get("jenis");let o=new URLSearchParams(window.location.search).get("category"),t;D({selectedJenis:e,category:o}),d(),e&&($("#category-container").removeClass("d-md-none"),$("#catalog-col").removeClass("center-content")),$(window).width()<768&&$("#filter-container").addClass("d-none"),(e==1||e==3||e==4)&&($("#filter-container").addClass("d-none"),$("#catalog-col").removeClass("col-md-10"),$("#catalog-col").addClass("col-md-12")),$("#search-input").on("input",function(){clearTimeout(t),t=setTimeout(()=>{f(),d()},500)}),$(window).on("scroll",function(){const n=$(window).scrollTop(),l=$(window).height(),s=$(document).height();n+l>=s-150&&d()});function a(n){$("#carousel-product-image").empty(),$("#thumbnailGallery").empty(),n.forEach((l,s)=>{const c=s===0?"active":"";$("#carousel-product-image").append(`
                    <div class="carousel-item ${c}">
                        <img src="${l}" class="img-fluid d-block mx-auto"
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
                    <img src="${l}" class="img-thumbnail m-1 thumbnail-image" style="width: 5rem; height: 5rem; object-fit: cover; cursor: pointer;" data-index="${s}">
                `)}),n.length<=1?($("#carouselProduct .carousel-control-next").addClass("d-none"),$("#carouselProduct .carousel-control-prev").addClass("d-none")):($("#carouselProduct .carousel-control-next").removeClass("d-none"),$("#carouselProduct .carousel-control-prev").removeClass("d-none")),$("#thumbnailGallery").on("click",".thumbnail-image",function(){const l=$(this).data("index");$("#carouselProduct .carousel-item").removeClass("active"),$("#carouselProduct .carousel-item").eq(l).addClass("active")})}$(document).on("click",".product-card",function(){const n=$(this).data("code"),l=$(this).data("category"),s=JSON.parse($(this).attr("data-images").replace(/&quot;/g,'"')),c=$(this).data("jenis");a(s),$("#modalCode").text(n),$("#productModalLabel").text(n),$("#modalCategory").text(c+" / "+l),$("#modalDownload").data("id",$(this).data("id")),$("#productModal").modal("show"),$("#modalContact").data("jenis",c),$("#modalContact").data("category",l),$("#modalContact").data("code",n)}),R(e),E(),J(),L()});
