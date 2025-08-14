let S=null;function T(a){S=a}function L(){return S}function N(){$("#loading").removeClass("d-none")}function B(){$("#loading").addClass("d-none")}function K(a){return a.slice().sort((l,e)=>l.pivot.motif&&!e.pivot.motif?-1:!l.pivot.motif&&e.pivot.motif?1:0).map(l=>"/storage/"+l.path)}function _(){$(document).on("click",".modalDownload",function(a){a.preventDefault();const l=$(this).data("id"),e="catalog/pdf/product?id="+encodeURIComponent(l);P(this,e)}),$("#btn-download").on("click",function(a){a.preventDefault(),P(this,"catalog/pdf?category="+encodeURIComponent(L()))})}function P(a,l){const e=$(a);e.prop("disabled",!0).html('<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Mengunduh...'),window.open(l,"_blank"),setTimeout(()=>{e.prop("disabled",!1).html('<i class="fa fa-file-download"></i> Download')},5e3)}function U(){$(document).on("click",".modalContact",function(a){a.preventDefault(),console.log("Klik tombol order",$(this).data("code"));const l="62816659688";let e="";$(this).data("wallpanel")?e=`Halo Admin,
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

Apakah produk ini masih tersedia? Terima kasih.`,window.open(`https://wa.me/${l}?text=${encodeURIComponent(e)}`,"_blank")})}function A(){$(window).scroll(function(){$(this).scrollTop()>100?$("#btn-scroll-top").fadeIn():$("#btn-scroll-top").fadeOut()}),$("#btn-scroll-top").click(function(){return $("html, body").animate({scrollTop:0},500),!1})}function J(a,l){let e="";a.forEach(t=>{var o,m,u,p,g,x,j;const i=t.photo?`/storage/${t.photo}`:"https://via.placeholder.com/300x200?text=No+Image",c=K(t.images),n=[i,...c],s=JSON.stringify(n).replace(/"/g,"&quot;"),d=((o=t.category)==null?void 0:o.name)??"Tanpa Kategori";((m=t.category)==null?void 0:m.display_style)==="square"||l===null?e+=`
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
                    data-category="${d}"
                    data-jenis="${((g=(p=t.category)==null?void 0:p.jenis)==null?void 0:g.name)??""}"
                    data-length="${t.panjang}"
                    data-height="${t.tinggi}"
                    data-density="${t.ketebalan}"
                    data-images="${s}"
                    data-image="${i}"
                    >
                       <img 
                            src="${i}" 
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
                                object-position: ${((j=(x=t.category)==null?void 0:x.jenis)==null?void 0:j.name)==="PVC Board"?"bottom center":"center center"};
                            "
                        >
                        <div class="card-body d-flex flex-column text-center">
                            <h4 class="card-title font-weight-bold text-uppercase mb-2">
                                ${l==5?t.code.split(" ").slice(1).join(" "):t.code}
                            </h4>
                            <h6 class="card-text text-muted mb-1">${d}</h6>
                        </div>
                    </div>
                </div>`}),$("#product-list .row").append(e)}function E(a,l,e){if(l==null)return;a.forEach(n=>{n.path&&e.add(n.path)});const t=Array.from(e),i=$("#mockup-carousel-inner"),c=$("#mockup-carousel-indicators");i.empty(),c.empty(),t.length>0?(t.length===1?($("#mockup .carousel-control-next").addClass("d-none"),$("#mockup .carousel-control-prev").addClass("d-none")):($("#mockup .carousel-control-next").removeClass("d-none"),$("#mockup .carousel-control-prev").removeClass("d-none")),t.slice(0,5).forEach((n,s)=>{i.append(`
                        <div class="carousel-item ${s===0?"active":""}">
                            <img src="/storage/${n}" id="mockup-image" alt="mockup" 
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
                    `)}),$("#mockup").removeClass("d-none")):$("#mockup").addClass("d-none")}let k=null,r=null,f=1,y=!1,b=!1,M=null;const D=new Set;function v(a){k=a.selectedJenis,r=a.category??null}function h(a=null){return a!==null&&(M=a),new Promise((l,e)=>{if(!r||r==="null"||r===""?$("#btn-download").addClass("d-none"):$("#btn-download").removeClass("d-none"),y||b)return l();y=!0,N();const t=$("#search-input").val();$.ajax({url:"/catalog",type:"GET",data:{page:f,search:t,jenis:k,category:r},success:function(i){const c=i.data.data??[];c.length>0?(J(c,k),f++,f>i.data.last_page&&(b=!0)):(f===1&&($("#mockup").addClass("d-none"),$("#product-list .row").append(`<div class="col-12"><img src="dist/img/no-data.png" alt="no-data"
                                class="img-fluid mx-auto d-block" style="max-width: 100%; height: auto; margin-top: 100px; margin-bottom: 100px;"></div>`)),b=!0),G(i,a),l()},error:function(){console.log("Gagal memuat data."),e()},complete:function(){y=!1,B()}})})}function G(a,l=null){var s,d;l=l??M;const e=((s=a.jenis)==null?void 0:s.categories)??[],t=(d=a.jenis)==null?void 0:d.name,i=a;switch(e.length===0?$("#category-container").addClass("d-none"):$("#category-container").removeClass("d-none"),r&&(i.category.images.length===0&&$("#mockup").addClass("d-none"),E(i.category.images,k,D)),t){case"PVC Board":$("#category-container, #category-modal-container").addClass("d-none");break;case"Wallboard":case"UV Board":$("#category-menu-item-label, #category-modal-item-label").html("Motif");break;case"Wallpanel":break;case"Aksesoris":$("#category-container, #category-modal-container").addClass("d-none");break;default:$("#category-menu-item-label, #category-modal-item-label").html("Kategori")}let c='<li class="nav-item font-poppins">',n=e;l&&(n=e.filter(o=>o.jenis_id===5||o.jenis_id===2&&o.id!==25)),n.forEach(o=>{c+=`
            <a class="nav-link text-white category-filter d-flex align-items-center justify-content-start" 
                href="#" data-jenis-id="${o.jenis_id}" data-id="${o.id}">
                <img src="${o.path?"storage/"+o.path:"dist/img/product/1.webp"}" alt="${o.name}" 
                class="mr-2 img-thumbnail" style="width: 50px; height: 50px; object-fit: contain;">
                <span class="text-capitalize">${o.name} ${o.products_count>0?`(${o.products_count})`:""}</span>
            </a>`}),c+="</li>",$("#category-menu-item, #category-menu-item-modal").html(c),!r&&e.length>0?(r=e[0].id,T(r),w(),h(l)):r&&$(`.category-filter[data-id="${r}"]`).addClass("active")}function w(){f=1,y=!1,b=!1,D.clear(),$("#product-list .row").html("")}let C=!1;function I(a){$(document).off("click",".category-filter"),$(document).on("click",".category-filter",async function(l){if(l.preventDefault(),C)return;C=!0;const e=$(this).data("id");try{v({selectedJenis:a,category:e}),T(e),$("#filterModal").modal("hide"),w(),await h()}catch(t){console.error("Gagal memuat data:",t)}finally{C=!1}})}$(document).ready(function(){let a=new URLSearchParams(window.location.search).get("jenis"),l=new URLSearchParams(window.location.search).get("category"),e;(a==5||a==2)&&sessionStorage.removeItem("selectedWallpanel"),v({selectedJenis:a,category:l}),h(),a&&($("#category-container").removeClass("d-md-none"),$("#catalog-col").removeClass("center-content")),$(window).width()<768&&$("#filter-container").addClass("d-none"),(a==1||a==3||a==4)&&($("#filter-container").addClass("d-none"),$("#catalog-col").removeClass("col-md-10"),$("#catalog-col").addClass("col-md-12")),$("#search-input").on("input",function(){clearTimeout(e),e=setTimeout(()=>{w(),h()},500)}),$(window).on("scroll",function(){const n=$(window).scrollTop(),s=$(window).height(),d=$(document).height();n+s>=d-150&&h()});function t(n,s=null){$("#carousel-product-image").empty(),$("#thumbnailGallery").empty();let d=[...n];s&&(d=[...s,...n]),d.forEach((o,m)=>{const u=m===0?"active":"";$("#carousel-product-image").append(`
                    <div class="carousel-item ${u}">
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
                `)}),n.length<=1?($("#carouselProduct .carousel-control-next").addClass("d-none"),$("#carouselProduct .carousel-control-prev").addClass("d-none")):($("#carouselProduct .carousel-control-next").removeClass("d-none"),$("#carouselProduct .carousel-control-prev").removeClass("d-none")),$("#thumbnailGallery").on("click",".thumbnail-image",function(){const o=$(this).data("index");$("#carouselProduct .carousel-item").removeClass("active"),$("#carouselProduct .carousel-item").eq(o).addClass("active")})}let i=null;const c=sessionStorage.getItem("selectedWallpanel");c&&(i=JSON.parse(c),console.log("Restore wallpanel dari sessionStorage:",i)),$(document).on("click",".product-card",function(){const n=$(this).data("code"),s=$(this).data("category"),d=JSON.parse($(this).attr("data-images").replace(/&quot;/g,'"')),o=$(this).data("jenis"),m=parseInt($(this).data("length"),10),u=parseInt($(this).data("height"),10),p=parseInt($(this).data("density"),10),g=$(this).data("id");if(o.toLowerCase()==="wallpanel"){$("#filter-container").removeClass("d-none"),$("#catalog-col").addClass("col-md-10").removeClass("col-md-12"),i={code:n,images:d,productId:g,jenis:o},sessionStorage.setItem("selectedWallpanel",JSON.stringify(i)),w(),v({selectedJenis:[2,5]}),h(i),I([2,5]),$(window).width()<768&&$("#filter-container").addClass("d-none"),console.log("Pilih wallpanel:",i);return}if(o.toLowerCase()==="uv board"||o.toLowerCase()==="wallboard"){i?(console.log("Klik UV Board / Wallboard saat ada wallpanel terpilih"),console.log("Wallpanel saat ini:",i),t(d,i.images),$("#modalCode").text(n),$("#productModalLabel").text(n),$("#modalCategory").html("Wallpanel <strong>"+i.code+"</strong>"),$("#modalDownload").data("id",g),$("#productModal").modal("show"),$("#panjang, #tinggi, #ketebalan, #kepadatan, #notes").hide(),$("#modalContact").data("wallpanel",i.code),$("#modalContact").data("jenis",i.jenis),$("#modalContact").data("category",s),$("#modalContact").data("code",n)):(console.log("Belum pilih wallpanel, tampilkan UV Board sebagai produk biasa"),t(d),$("#modalCode").text(n),$("#productModalLabel").text(n),$("#modalCategory").text(o+" / "+s),$("#modalDownload").data("id",g),$("#productModal").modal("show"),$("#panjang, #tinggi, #ketebalan, #kepadatan, #notes").hide(),$("#modalContact").data("jenis",o),$("#modalContact").data("category",s),$("#modalContact").data("code",n));return}t(d),$("#modalCode").text(n),$("#productModalLabel").text(n),$("#modalCategory").text(o+" / "+s),$("#modalDownload").data("id",g),$("#productModal").modal("show"),console.log("jenis"+o),o==="PVC Board"?($("#modalLength").text(m&&!isNaN(m)?m+" cm":"-"),$("#modalHeight").text(u&&!isNaN(u)?u+" cm":"-"),$("#modalDensity").text(p&&!isNaN(p)?p+" mm":"-"),console.log(n),$("#modalKepadatan").html(`
                <span class="badge kepadatan" data-value="0,4 mm">0,4 mm</span>
                <span class="badge kepadatan" data-value="0,55 mm">0,55 mm</span>
                <span class="badge kepadatan" data-value="0,7 mm">0,7 mm</span>
            `)):$("#panjang, #tinggi, #ketebalan, #kepadatan, #notes").hide(),$("#modalContact").data("jenis",o),$("#modalContact").data("category",s),$("#modalContact").data("code",n),console.log("Produk biasa:",n)}),$(document).on("click",".kepadatan",function(){let n=$(this).data("value");$(".kepadatan").removeClass("active"),$(this).addClass("active"),$("#notes").hide(),$("#modalContact").data("kepadatan",n)}),I(a),_(),U(),A()});
