let I=null;function S(a){I=a}function L(){return I}function N(){$("#loading").removeClass("d-none")}function B(){$("#loading").addClass("d-none")}function K(a){return a.slice().sort((n,e)=>n.pivot.motif&&!e.pivot.motif?-1:!n.pivot.motif&&e.pivot.motif?1:0).map(n=>"/storage/"+n.path)}function _(){$(document).on("click",".modalDownload",function(a){a.preventDefault();const n=$(this).data("id"),e="catalog/pdf/product?id="+encodeURIComponent(n);P(this,e)}),$("#btn-download").on("click",function(a){a.preventDefault(),P(this,"catalog/pdf?category="+encodeURIComponent(L()))})}function P(a,n){const e=$(a);e.prop("disabled",!0).html('<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Mengunduh...'),window.open(n,"_blank"),setTimeout(()=>{e.prop("disabled",!1).html('<i class="fa fa-file-download"></i> Download')},5e3)}function U(){$(document).on("click",".modalContact",function(a){a.preventDefault(),console.log("Klik tombol order",$(this).data("code"));const n="62816659688";let e="";$(this).data("wallpanel")?e=`Halo Admin,
Saya tertarik dengan produk berikut:

• Tipe Wallpanel: *${$(this).data("wallpanel")}*
• Kode Motif : *${$(this).data("code")}*
• Produk : *${$(this).data("jenis")}*
• Kategori: *${$(this).data("category")}*

Apakah produk ini masih tersedia? Terima kasih.`:$(this).data("kepadatan")?e=`Halo Admin,
Saya tertarik dengan produk berikut:

• Produk : *${$(this).data("jenis")}*
• Ukuran : *${$(this).data("code")}*
• Kepadatan: *${$(this).data("kepadatan")}*

Apakah produk ini masih tersedia? Terima kasih.`:e=`Halo Admin,
Saya tertarik dengan produk berikut:

• Kode Motif : *${$(this).data("code")}*
• Produk : *${$(this).data("jenis")}*
• Kategori: *${$(this).data("category")}*

Apakah produk ini masih tersedia? Terima kasih.`,window.open(`https://wa.me/${n}?text=${encodeURIComponent(e)}`,"_blank")})}function A(){$(window).scroll(function(){$(this).scrollTop()>100?$("#btn-scroll-top").fadeIn():$("#btn-scroll-top").fadeOut()}),$("#btn-scroll-top").click(function(){return $("html, body").animate({scrollTop:0},500),!1})}function J(a,n){let e="";a.forEach(t=>{var l,s,u,g,h,p,j;const d=t.photo?`/storage/${t.photo}`:"https://via.placeholder.com/300x200?text=No+Image",i=K(t.images),r=[d,...i],o=JSON.stringify(r).replace(/"/g,"&quot;"),c=((l=t.category)==null?void 0:l.name)??"Tanpa Kategori";((s=t.category)==null?void 0:s.display_style)==="square"||n===null?e+=`
                    <div class="col-md-2 col-6 mb-4">
                        <div class="h-100 product-card"
                    `:((u=t.category)==null?void 0:u.display_style)==="rectangle"?e+=`
                    <div class="col-md-4 col-6 mb-4">
                        <div class="h-100 product-card"
                    `:e+=`
                    <div class="col-md-2 col-6 mb-4">
                        <div class="h-100 product-card d-flex flex-column justify-content-center align-items-center"
                    `,console.log(t),e+=`
                    data-id="${t.id}"
                    data-code="${t.code}"
                    data-category="${c}"
                    data-jenis="${((h=(g=t.category)==null?void 0:g.jenis)==null?void 0:h.name)??""}"
                    data-length="${t.panjang}"
                    data-height="${t.tinggi}"
                    data-density="${t.ketebalan}"
                    data-images="${o}"
                    data-image="${d}"
                    >
                       <img 
                            src="${d}" 
                            class="card-img-top" 
                            alt="${t.name}" 
                            style="
                                border : 1px solid #2c2c2c;
                                min-height: 10rem;
                                aspect-ratio: 1/1;
                                height: auto; 
                                border-radius: 8px;
                                width: 100%; 
                                object-fit: cover; 
                                object-position: ${((j=(p=t.category)==null?void 0:p.jenis)==null?void 0:j.name)==="PVC Board"?"bottom center":"center center"};
                            "
                        >
                        <div class="card-body d-flex flex-column text-center">
                            <h4 class="card-title font-weight-bold text-uppercase mb-2">
                                ${n==5?t.code.split(" ").slice(1).join(" "):t.code}
                            </h4>
                            <h6 class="card-text text-muted mb-1">${c}</h6>
                        </div>
                    </div>
                </div>`}),$("#product-list .row").append(e)}function E(a,n,e){if(n==null)return;a.forEach(r=>{r.path&&e.add(r.path)});const t=Array.from(e),d=$("#mockup-carousel-inner"),i=$("#mockup-carousel-indicators");d.empty(),i.empty(),t.length>0?(t.length===1?($("#mockup .carousel-control-next").addClass("d-none"),$("#mockup .carousel-control-prev").addClass("d-none")):($("#mockup .carousel-control-next").removeClass("d-none"),$("#mockup .carousel-control-prev").removeClass("d-none")),t.slice(0,5).forEach((r,o)=>{d.append(`
                        <div class="carousel-item ${o===0?"active":""}">
                            <img src="/storage/${r}" id="mockup-image" alt="mockup" 
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
                    `),i.append(`
                        <li data-target="#carouselExampleControls" data-slide-to="${o}" ${o===0?'class="active"':""}></li>
                    `)}),$("#mockup").removeClass("d-none")):$("#mockup").addClass("d-none")}let w=null,m=null,y=1,b=!1,k=!1,M=null;const D=new Set;function x(a){w=a.selectedJenis,m=a.category??null}function f(a=null){return a!==null&&(M=a),new Promise((n,e)=>{if(!m||m==="null"||m===""?$("#btn-download").addClass("d-none"):$("#btn-download").removeClass("d-none"),b||k)return n();b=!0,N();const t=$("#search-input").val();$.ajax({url:"/catalog",type:"GET",data:{page:y,search:t,jenis:w,category:m},success:function(d){const i=d.data.data??[];i.length>0?(J(i,w),y++,y>d.data.last_page&&(k=!0)):(y===1&&($("#mockup").addClass("d-none"),$("#product-list .row").append(`<div class="col-12"><img src="dist/img/no-data.png" alt="no-data"
                                class="img-fluid mx-auto d-block" style="max-width: 100%; height: auto; margin-top: 100px; margin-bottom: 100px;"></div>`)),k=!0),G(d,a),n()},error:function(){console.log("Gagal memuat data."),e()},complete:function(){b=!1,B()}})})}function G(a,n=null){var o,c;n=n??M;const e=((o=a.jenis)==null?void 0:o.categories)??[],t=(c=a.jenis)==null?void 0:c.name,d=a;switch(e.length===0?$("#category-container").addClass("d-none"):$("#category-container").removeClass("d-none"),m&&(d.category.images.length===0&&$("#mockup").addClass("d-none"),E(d.category.images,w,D)),t){case"PVC Board":$("#category-container, #category-modal-container").addClass("d-none");break;case"Wallboard":case"UV Board":$("#category-menu-item-label, #category-modal-item-label").html("Motif");break;case"Wallpanel":break;case"Aksesoris":$("#category-container, #category-modal-container").addClass("d-none");break;default:$("#category-menu-item-label, #category-modal-item-label").html("Kategori")}let i='<li class="nav-item font-poppins">',r=e;n&&(r=e.filter(l=>l.jenis_id===5||l.jenis_id===2&&l.id!==25)),r.forEach(l=>{i+=`
            <a class="nav-link text-white category-filter d-flex align-items-center justify-content-start" 
                href="#" data-jenis-id="${l.jenis_id}" data-id="${l.id}">
                <img src="${l.path?"storage/"+l.path:"dist/img/product/1.webp"}" alt="${l.name}" 
                class="mr-2 img-thumbnail" style="width: 50px; height: 50px; object-fit: contain;">
                <span class="text-capitalize">${l.name} ${l.products_count>0?`(${l.products_count})`:""}</span>
            </a>`}),i+="</li>",$("#category-menu-item, #category-menu-item-modal").html(i),!m&&e.length>0?(m=e[0].id,S(m),C(),f(n)):m&&$(`.category-filter[data-id="${m}"]`).addClass("active")}function C(){y=1,b=!1,k=!1,D.clear(),$("#product-list .row").html("")}let v=!1;function T(a){$(document).off("click",".category-filter"),$(document).on("click",".category-filter",async function(n){if(n.preventDefault(),v)return;v=!0;const e=$(this).data("id");try{x({selectedJenis:a,category:e}),S(e),$("#filterModal").modal("hide"),C(),await f()}catch(t){console.error("Gagal memuat data:",t)}finally{v=!1}})}$(document).ready(function(){let a=new URLSearchParams(window.location.search).get("jenis"),n=new URLSearchParams(window.location.search).get("category"),e,t;(a==5||a==2)&&sessionStorage.removeItem("selectedWallpanel"),x({selectedJenis:a,category:n}),f(),a&&($("#category-container").removeClass("d-md-none"),$("#catalog-col").removeClass("center-content")),$(window).width()<768&&$("#filter-container").addClass("d-none"),(a==1||a==3||a==4)&&($("#filter-container").addClass("d-none"),$("#catalog-col").removeClass("col-md-10"),$("#catalog-col").addClass("col-md-12")),$("#search-input").on("input",function(){clearTimeout(e),e=setTimeout(()=>{C(),f()},500)}),$(window).on("scroll",function(){clearTimeout(t),t=setTimeout(()=>{const o=$(window).scrollTop(),c=$(window).height(),l=$(document).height();o+c>=l-150&&f()},200)});function d(o,c=null){$("#carousel-product-image").empty(),$("#thumbnailGallery").empty();let l=[...o];c&&(l=[...c,...o]),l.forEach((s,u)=>{const g=u===0?"active":"";$("#carousel-product-image").append(`
                    <div class="carousel-item ${g}">
                        <img src="${s}" class="img-fluid d-block mx-auto"
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
                    <img src="${s}" class="img-thumbnail m-1 thumbnail-image" style="width: 5rem; height: 5rem; object-fit: cover; cursor: pointer;" data-index="${u}">
                `)}),o.length<=1?($("#carouselProduct .carousel-control-next").addClass("d-none"),$("#carouselProduct .carousel-control-prev").addClass("d-none")):($("#carouselProduct .carousel-control-next").removeClass("d-none"),$("#carouselProduct .carousel-control-prev").removeClass("d-none")),$("#thumbnailGallery").on("click",".thumbnail-image",function(){const s=$(this).data("index");$("#carouselProduct .carousel-item").removeClass("active"),$("#carouselProduct .carousel-item").eq(s).addClass("active")})}let i=null;const r=sessionStorage.getItem("selectedWallpanel");r&&(i=JSON.parse(r),console.log("Restore wallpanel dari sessionStorage:",i)),$(document).on("click",".product-card",function(){const o=$(this).data("code"),c=$(this).data("category"),l=JSON.parse($(this).attr("data-images").replace(/&quot;/g,'"')),s=$(this).data("jenis"),u=parseInt($(this).data("length"),10),g=parseInt($(this).data("height"),10),h=parseInt($(this).data("density"),10),p=$(this).data("id");if(s.toLowerCase()==="wallpanel"){$("#filter-container").removeClass("d-none"),$("#catalog-col").addClass("col-md-10").removeClass("col-md-12"),i={code:o,images:l,productId:p,jenis:s},sessionStorage.setItem("selectedWallpanel",JSON.stringify(i)),C(),x({selectedJenis:[2,5]}),f(i),T([2,5]),$(window).width()<768&&$("#filter-container").addClass("d-none"),console.log("Pilih wallpanel:",i);return}if(s.toLowerCase()==="uv board"||s.toLowerCase()==="wallboard"){i?(console.log("Klik UV Board / Wallboard saat ada wallpanel terpilih"),console.log("Wallpanel saat ini:",i),d(l,i.images),$("#modalCode").text(o),$("#productModalLabel").text(o),$("#modalCategory").html("Wallpanel <strong>"+i.code+"</strong>"),$("#modalDownload").data("id",p),$("#productModal").modal("show"),$("#panjang, #tinggi, #ketebalan, #kepadatan, #notes").hide(),$("#modalContact").data("wallpanel",i.code),$("#modalContact").data("jenis",i.jenis),$("#modalContact").data("category",c),$("#modalContact").data("code",o)):(console.log("Belum pilih wallpanel, tampilkan UV Board sebagai produk biasa"),d(l),$("#modalCode").text(o),$("#productModalLabel").text(o),$("#modalCategory").text(s+" / "+c),$("#modalDownload").data("id",p),$("#productModal").modal("show"),$("#panjang, #tinggi, #ketebalan, #kepadatan, #notes").hide(),$("#modalContact").data("jenis",s),$("#modalContact").data("category",c),$("#modalContact").data("code",o));return}d(l),$("#modalCode").text(o),$("#productModalLabel").text(o),$("#modalCategory").text(s+" / "+c),$("#modalDownload").data("id",p),$("#productModal").modal("show"),console.log("jenis"+s),s==="PVC Board"?($("#modalLength").text(u&&!isNaN(u)?u+" cm":"-"),$("#modalHeight").text(g&&!isNaN(g)?g+" cm":"-"),$("#modalDensity").text(h&&!isNaN(h)?h+" mm":"-"),console.log(o),$("#modalKepadatan").html(`
                <span class="badge badge-primary kepadatan" data-value="0,4 mm">0,4 mm</span>
                <span class="badge badge-primary kepadatan" data-value="0,55 mm">0,55 mm</span>
                <span class="badge badge-primary kepadatan" data-value="0,7 mm">0,7 mm</span>
            `)):$("#panjang, #tinggi, #ketebalan, #kepadatan, #notes").hide(),$("#modalContact").data("jenis",s),$("#modalContact").data("category",c),$("#modalContact").data("code",o),console.log("Produk biasa:",o)}),$(document).on("click",".kepadatan",function(){let o=$(this).data("value");$(".kepadatan").removeClass("active"),$(this).addClass("active"),$("#notes").hide(),$("#modalContact").data("kepadatan",o)}),T(a),_(),U(),A()});
