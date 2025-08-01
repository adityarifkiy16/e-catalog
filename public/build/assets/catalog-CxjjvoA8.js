let j=null;function P(e){j=e}function D(){return j}function M(){$("#loading").removeClass("d-none")}function S(){$("#loading").addClass("d-none")}function _(e){return e.slice().sort((a,t)=>a.pivot.motif&&!t.pivot.motif?-1:!a.pivot.motif&&t.pivot.motif?1:0).map(a=>"/storage/"+a.path)}function B(){$(document).on("click",".modalDownload",function(e){e.preventDefault();const a=$(this).data("id"),t="catalog/pdf/product?id="+encodeURIComponent(a);k(this,t)}),$("#btn-download").on("click",function(e){e.preventDefault(),k(this,"catalog/pdf?category="+encodeURIComponent(D()))})}function k(e,a){const t=$(e);t.prop("disabled",!0).html('<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Mengunduh...'),window.open(a,"_blank"),setTimeout(()=>{t.prop("disabled",!1).html('<i class="fa fa-file-download"></i> Download')},5e3)}function E(){$(document).on("click",".modalContact",function(e){e.preventDefault();const a="62816659688",t=`Halo Admin,
Saya tertarik dengan produk berikut:

• Kode Produk: *${$(this).data("code")}*
• Jenis: *${$(this).data("jenis")}*
• Kategori: *${$(this).data("category")}*

Apakah produk ini masih tersedia? Terima kasih.`;window.open(`https://wa.me/${a}?text=${encodeURIComponent(t)}`,"_blank")})}function J(){$(window).scroll(function(){$(this).scrollTop()>100?$("#btn-scroll-top").fadeIn():$("#btn-scroll-top").fadeOut()}),$("#btn-scroll-top").click(function(){return $("html, body").animate({scrollTop:0},500),!1})}function L(e,a){let t="";e.forEach(o=>{var h,y,b,v,w,C,x;const n=o.photo?`/storage/${o.photo}`:"https://via.placeholder.com/300x200?text=No+Image",l=_(o.images),s=[n,...l],c=JSON.stringify(s).replace(/"/g,"&quot;"),f=((h=o.category)==null?void 0:h.name)??"Tanpa Kategori";((y=o.category)==null?void 0:y.display_style)==="square"||a===null?t+=`
                    <div class="col-md-2 mb-4">
                        <div class="h-100 product-card"
                    `:((b=o.category)==null?void 0:b.display_style)==="rectangle"?t+=`
                    <div class="col-md-4 mb-4">
                        <div class="h-100 product-card"
                    `:t+=`
                    <div class="col-md-2 mb-4">
                        <div class="h-100 product-card"
                    `,t+=`
                    data-id="${o.id}"
                    data-code="${o.code}"
                    data-category="${f}"
                    data-jenis="${((w=(v=o.category)==null?void 0:v.jenis)==null?void 0:w.name)??""}"
                    data-images="${c}"
                    data-image="${n}"
                    >
                       <img 
                            src="${n}" 
                            class="card-img-top" 
                            alt="${o.name}" 
                            style="
                                border : 1px solid #ccc;
                                min-height: 200px;
                                height: auto; 
                                border-radius: 8px;
                                width: 100%; 
                                object-fit: cover; 
                                object-position: ${((x=(C=o.category)==null?void 0:C.jenis)==null?void 0:x.name)==="PVC Board"?"bottom center":"center center"};
                            "
                        >
                        <div class="card-body d-flex flex-column text-center">
                            <h4 class="card-title font-weight-bold text-uppercase mb-2">${o.code}</h4>
                            <h6 class="card-text text-muted mb-1">${f}</h6>
                        </div>
                    </div>
                </div>`}),$("#product-list .row").append(t)}function U(e,a,t){if(a==null)return;e.forEach(s=>{s.path&&t.add(s.path)});const o=Array.from(t),n=$("#mockup-carousel-inner"),l=$("#mockup-carousel-indicators");n.empty(),l.empty(),o.length>0?(o.length===1?($("#mockup .carousel-control-next").addClass("d-none"),$("#mockup .carousel-control-prev").addClass("d-none")):($("#mockup .carousel-control-next").removeClass("d-none"),$("#mockup .carousel-control-prev").removeClass("d-none")),o.slice(0,5).forEach((s,c)=>{n.append(`
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
                    `)}),$("#mockup").removeClass("d-none")):$("#mockup").addClass("d-none")}let g=null,i=null,r=1,d=!1,m=!1;const T=new Set;function I(e){g=e.selectedJenis,i=e.category??null}function u(){if(!i||i==="null"||i===""?$("#btn-download").addClass("d-none"):$("#btn-download").removeClass("d-none"),d||m)return;d=!0,M();const e=$("#search-input").val();$.ajax({url:"/catalog",type:"GET",data:{page:r,search:e,jenis:g,category:i},success:function(a){const t=a.data.data??[];t.length>0?(L(t,g),r++,r>a.data.last_page&&(m=!0)):(r===1&&($("#mockup").addClass("d-none"),$("#product-list .row").append(`<div class="col-12"><img src="dist/img/no-data.png" alt="no-data"
                            class="img-fluid mx-auto d-block" style="max-width: 100%; height: auto; margin-top: 100px; margin-bottom: 100px;"></div>`)),m=!0),G(a),d=!1},error:function(){d=!1,console.log("Gagal memuat data.")},complete:function(){d=!1,S()}})}function G(e){var l,s;const a=((l=e.jenis)==null?void 0:l.categories)??[],t=(s=e.jenis)==null?void 0:s.name,o=e;switch(a.length===0?$("#category-container").addClass("d-none"):$("#category-container").removeClass("d-none"),o.category.images.length===0&&$("#mockup").addClass("d-none"),U(o.category.images,g,T),t){case"PVC Board":$("#category-container, #category-modal-container").addClass("d-none");break;case"Wallboard":case"UV Board":$("#category-menu-item-label, #category-modal-item-label").html("Motif");break;case"Wallpanel":$("#category-container, #category-modal-container").addClass("d-none");break;default:$("#category-menu-item-label, #category-modal-item-label").html("Kategori")}let n='<li class="nav-item font-poppins">';a.forEach(c=>{n+=`
            <a class="nav-link text-dark category-filter d-flex align-items-center justify-content-start" 
                href="#" data-jenis-id="${c.jenis_id}" data-id="${c.id}">
                <img src="${c.path?"storage/"+c.path:"dist/img/product/1.webp"}" alt="${c.name}" 
                class="mr-2 img-thumbnail" style="width: 50px; height: 50px; object-fit: contain;">
                <span class="text-capitalize">${c.name} ${c.products_count>0?`(${c.products_count})`:""}</span>
            </a>`}),n+="</li>",$("#category-menu-item, #category-menu-item-modal").html(n),!i&&a.length>0?(i=a[0].id,P(i),p(),u()):i&&$(`.category-filter[data-id="${i}"]`).addClass("active")}function p(){r=1,d=!1,m=!1,T.clear(),$("#product-list .row").html("")}function O(e){$(document).on("click",".category-filter",function(a){a.preventDefault();const t=$(this).data("id");I({selectedJenis:e,category:t}),P(t),$("#filterModal").modal("hide"),p(),u()})}$(document).ready(function(){const e=new URLSearchParams(window.location.search).get("jenis");let a=new URLSearchParams(window.location.search).get("category"),t;I({selectedJenis:e,category:a}),u(),e&&($("#category-container").removeClass("d-md-none"),$("#catalog-col").removeClass("center-content")),$(window).width()<768&&$("#filter-container").addClass("d-none"),(e==1||e==3)&&($("#filter-container").addClass("d-none"),$("#catalog-col").removeClass("col-md-10"),$("#catalog-col").addClass("col-md-12")),$("#search-input").on("input",function(){clearTimeout(t),t=setTimeout(()=>{p(),u()},500)}),$(window).on("scroll",function(){const n=$(window).scrollTop(),l=$(window).height(),s=$(document).height();n+l>=s-150&&u()});function o(n){$("#carousel-product-image").empty(),$("#thumbnailGallery").empty(),n.forEach((l,s)=>{const c=s===0?"active":"";$("#carousel-product-image").append(`
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
                `)}),n.length<=1?($("#carouselProduct .carousel-control-next").addClass("d-none"),$("#carouselProduct .carousel-control-prev").addClass("d-none")):($("#carouselProduct .carousel-control-next").removeClass("d-none"),$("#carouselProduct .carousel-control-prev").removeClass("d-none")),$("#thumbnailGallery").on("click",".thumbnail-image",function(){const l=$(this).data("index");$("#carouselProduct .carousel-item").removeClass("active"),$("#carouselProduct .carousel-item").eq(l).addClass("active")})}$(document).on("click",".product-card",function(){const n=$(this).data("code"),l=$(this).data("category"),s=JSON.parse($(this).attr("data-images").replace(/&quot;/g,'"')),c=$(this).data("jenis");o(s),$("#modalCode").text(n),$("#productModalLabel").text(n),$("#modalCategory").text(c+" / "+l),$("#modalDownload").data("id",$(this).data("id")),$("#productModal").modal("show"),$("#modalContact").data("jenis",c),$("#modalContact").data("category",l),$("#modalContact").data("code",n)}),O(e),B(),E(),J()});
