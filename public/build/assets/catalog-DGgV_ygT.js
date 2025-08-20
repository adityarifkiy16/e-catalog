let M=null;function N(a){M=a}function B(){return M}function K(){$("#loading").removeClass("d-none")}function _(){$("#loading").addClass("d-none")}function A(a){return a.slice().sort((n,t)=>n.pivot.motif&&!t.pivot.motif?-1:!n.pivot.motif&&t.pivot.motif?1:0).map(n=>"/storage/"+n.path)}function E(){$(document).on("click",".modalDownload",function(a){a.preventDefault();const n=$(this).data("id"),t="catalog/pdf/product?id="+encodeURIComponent(n);D(this,t)}),$("#btn-download").on("click",function(a){a.preventDefault(),D(this,"catalog/pdf?category="+encodeURIComponent(B()))})}function D(a,n){const t=$(a);t.prop("disabled",!0).html('<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Mengunduh...'),window.open(n,"_blank"),setTimeout(()=>{t.prop("disabled",!1).html('<i class="fa fa-file-download"></i> Download')},5e3)}function U(){$(document).on("click",".modalContact",function(a){a.preventDefault(),console.log("Klik tombol order",$(this).data("code"));const n="62816659688";let t="";$(this).data("jenis")=="Wallpanel"?t=`Halo Admin,
Saya tertarik dengan produk berikut:

• Tipe Wallpanel: *${$(this).data("type")}*
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

Apakah produk ini masih tersedia? Terima kasih.`,window.open(`https://wa.me/${n}?text=${encodeURIComponent(t)}`,"_blank")})}function G(){$(window).scroll(function(){$(this).scrollTop()>100?$("#btn-scroll-top").fadeIn():$("#btn-scroll-top").fadeOut()}),$("#btn-scroll-top").click(function(){return $("html, body").animate({scrollTop:0},500),!1})}function H(a,n){let t="";a.forEach(e=>{var m,c,p,g,h,b,C,T,I;const i=e.photo?`/storage/${e.photo}`:"https://via.placeholder.com/300x200?text=No+Image",o=A(e.images),l=[i,...o],s=JSON.stringify(l).replace(/"/g,"&quot;"),d=((m=e.category)==null?void 0:m.name)??"Tanpa Kategori";((c=e.category)==null?void 0:c.display_style)==="square"||n===null?t+=`
                    <div class="col-md-2 col-6 mb-4">
                        <div class="h-100 product-card"
                    `:((p=e.category)==null?void 0:p.display_style)==="rectangle"?t+=`
                    <div class="col-md-4 col-6 mb-4">
                        <div class="h-100 product-card"
                    `:t+=`
                    <div class="col-md-2 col-6 mb-4">
                        <div class="h-100 product-card d-flex flex-column justify-content-center align-items-center"
                    `,console.log(e),t+=`
                    data-id="${e.id}"
                    data-code="${e.code}"
                    data-category="${d}"
                    data-jenis="${((h=(g=e.category)==null?void 0:g.jenis)==null?void 0:h.name)??""}"
                    data-length="${e.panjang}"
                    data-height="${e.tinggi}"
                    data-density="${e.ketebalan}"
                    data-images="${s}"
                    data-image="${i}"
                    data-type="${((C=(b=e.category)==null?void 0:b.types)==null?void 0:C.name)??""}"
                    >
                       <img 
                            src="${i}" 
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
                                object-position: ${((I=(T=e.category)==null?void 0:T.jenis)==null?void 0:I.name)==="PVC Board"?"bottom center":"center center"};
                            "
                        >
                        <div class="card-body d-flex flex-column text-center">
                            <h4 class="card-title font-weight-bold text-uppercase mb-2">
                                ${n==5?e.code.split(" ").slice(1).join(" "):e.code}
                            </h4>
                            <h6 class="card-text text-muted mb-1">${d}</h6>
                        </div>
                    </div>
                </div>`}),$("#product-list .row").append(t)}function W(a,n){let t="";a.forEach(e=>{const i=e.thumbnail?`/storage/${e.thumbnail}`:"https://via.placeholder.com/300x200?text=No+Image";console.log(n);const o=n==3?"wallpanel":"tanpa kategori";t+=`
                    <div class="col-md-2 col-6 mb-4">
                        <div class="h-100 product-card d-flex flex-column justify-content-center align-items-center"
                    `,t+=`
                    data-id="${e.id}"
                    data-jenis="tipe-wallpanel"
                    data-category="${o}"
                    data-type="${e.id}"
                    >
                       <img 
                            src="${i}" 
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
                </div>`}),$("#product-list .row").append(t)}function J(a,n,t){if(n==null)return;a.forEach(l=>{l.path&&t.add(l.path)});const e=Array.from(t),i=$("#mockup-carousel-inner"),o=$("#mockup-carousel-indicators");i.empty(),o.empty(),e.length>0?(e.length===1?($("#mockup .carousel-control-next").addClass("d-none"),$("#mockup .carousel-control-prev").addClass("d-none")):($("#mockup .carousel-control-next").removeClass("d-none"),$("#mockup .carousel-control-prev").removeClass("d-none")),e.slice(0,5).forEach((l,s)=>{i.append(`
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
                    `)}),$("#mockup").removeClass("d-none")):$("#mockup").addClass("d-none")}let f=null,r=null,S=null,u=1,v=!1,k=!1;const L=new Set;function P(a){f=a.selectedJenis,r=a.category??null,S=a.type??null}function y(a=!0){return new Promise((n,t)=>{if($(window).width()<768&&$("#filter-container").addClass("d-none"),!r||r==="null"||r===""?$("#btn-download").addClass("d-none"):$("#btn-download").removeClass("d-none"),v||k)return n();v=!0,K();const e=$("#search-input").val();$.ajax({url:"/catalog",type:"GET",data:{page:u,search:e,jenis:f,category:r,type:S},success:function(i){console.log("Data berhasil dimuat."),console.log(i);const o=i.data.data??[],l=i.types??[];f==3&&a?(console.log("isFirstLoad:"+a),l.length>0&&(W(l,f),u++,u>i.data.last_page&&(k=!0)),x(i,!0)):(console.log("isFirstLoad:"+a),o.length>0?(H(o,f),u++,u>i.data.last_page&&(k=!0)):(u===1&&($("#mockup").addClass("d-none"),$("#product-list .row").append(`<div class="col-12"><img src="dist/img/no-data.png" alt="no-data"
                                class="img-fluid mx-auto d-block" style="max-width: 100%; height: auto; margin-top: 100px; margin-bottom: 100px;"></div>`)),k=!0),x(i,!1)),x(i,!1),n()},error:function(){console.log("Gagal memuat data."),t()},complete:function(){v=!1,_()}})})}function x(a,n=!0){var s;const t=(a==null?void 0:a.category)??[];console.log(t);const e=(s=a.jenis)==null?void 0:s.name,o=a.category[0].images;switch(t.length===0?$("#category-container").addClass("d-none"):($("#category-container").removeClass("d-none"),o.length===0&&$("#mockup").addClass("d-none"),J(o,f,L)),e){case"PVC Board":$("#category-container, #category-modal-container").addClass("d-none");break;case"Wallboard":case"UV Board":$("#category-menu-item-label, #category-modal-item-label").html("Motif");break;case"Wallpanel":break;case"Aksesoris":$("#category-container, #category-modal-container").addClass("d-none");break;default:$("#category-menu-item-label, #category-modal-item-label").html("Kategori")}let l='<li class="nav-item font-poppins">';t.forEach(d=>{l+=`
            <a class="nav-link text-white category-filter d-flex align-items-center justify-content-start" 
                href="#" data-jenis-id="${d.jenis_id}" data-id="${d.id}">
                <img src="${d.path?"storage/"+d.path:"dist/img/product/1.webp"}" alt="${d.name}" 
                class="mr-2 img-thumbnail" style="width: 50px; height: 50px; object-fit: contain;">
                <span class="text-capitalize">${d.name} ${d.products_count>0?`(${d.products_count})`:""}</span>
            </a>`}),l+="</li>",$("#category-menu-item, #category-menu-item-modal").html(l),!r&&t.length>0?(r=t[0].id,N(r),w(),y(n)):r&&$(`.category-filter[data-id="${r}"]`).addClass("active")}function w(){u=1,v=!1,k=!1,L.clear(),$("#product-list .row").html("")}let j=!1;function O(a){$(document).off("click",".category-filter"),$(document).on("click",".category-filter",async function(n){if(n.preventDefault(),j)return;j=!0;const t=$(this).data("id");try{P({selectedJenis:a,category:t}),N(t),$("#filterModal").modal("hide"),w(),await y(!1)}catch(e){console.error("Gagal memuat data:",e)}finally{j=!1}})}$(document).ready(function(){let a=new URLSearchParams(window.location.search).get("jenis"),n=new URLSearchParams(window.location.search).get("category"),t,e;(a==5||a==2)&&sessionStorage.removeItem("selectedWallpanel"),P({selectedJenis:a,category:n}),y(),a&&($("#category-container").removeClass("d-md-none"),$("#catalog-col").removeClass("center-content")),$(window).width()<768&&$("#filter-container").addClass("d-none"),(a==1||a==3||a==4)&&($("#filter-container").addClass("d-none"),$("#catalog-col").removeClass("col-md-10"),$("#catalog-col").addClass("col-md-12")),$("#search-input").on("input",function(){clearTimeout(t),t=setTimeout(()=>{w(),y()},500)}),$(window).on("scroll",function(){clearTimeout(e),e=setTimeout(()=>{const o=$(window).scrollTop(),l=$(window).height(),s=$(document).height();o+l>=s-150&&y()},200)});function i(o,l=null){$("#carousel-product-image").empty(),$("#thumbnailGallery").empty();let s=[...o];l&&(s=[...l,...o]),s.forEach((d,m)=>{const c=m===0?"active":"";$("#carousel-product-image").append(`
                    <div class="carousel-item ${c}">
                        <img src="${d}" class="img-fluid d-block mx-auto"
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
                    <img src="${d}" class="img-thumbnail m-1 thumbnail-image" style="width: 5rem; height: 5rem; object-fit: cover; cursor: pointer;" data-index="${m}">
                `)}),o.length<=1?($("#carouselProduct .carousel-control-next").addClass("d-none"),$("#carouselProduct .carousel-control-prev").addClass("d-none")):($("#carouselProduct .carousel-control-next").removeClass("d-none"),$("#carouselProduct .carousel-control-prev").removeClass("d-none")),$("#thumbnailGallery").on("click",".thumbnail-image",function(){const d=$(this).data("index");$("#carouselProduct .carousel-item").removeClass("active"),$("#carouselProduct .carousel-item").eq(d).addClass("active")})}$(document).on("click",".product-card",function(){const o=$(this).data("code"),l=$(this).data("category"),s=$(this).attr("data-images"),d=$(this).data("type");let m=null;s&&(m=JSON.parse(s.replace(/&quot;/g,'"')));const c=$(this).data("jenis"),p=parseInt($(this).data("length"),10),g=parseInt($(this).data("height"),10),h=parseInt($(this).data("density"),10),b=$(this).data("id");if(c==="tipe-wallpanel"){w(),P({selectedJenis:3,type:d}),y(!1),$("#filter-container").toggleClass("d-none"),$("#catalog-col").toggleClass("col-md-10 col-md-12");return}if(c.toLowerCase()==="uv board"||c.toLowerCase()==="wallboard"){console.log("Belum pilih wallpanel, tampilkan UV Board sebagai produk biasa"),i(m),$("#modalCode").text(o),$("#productModalLabel").text(o),$("#modalCategory").text(c+" / "+l),$("#modalDownload").data("id",b),$("#productModal").modal("show"),$("#panjang, #tinggi, #ketebalan, #kepadatan, #notes").hide(),$("#modalContact").data("jenis",c),$("#modalContact").data("category",l),$("#modalContact").data("code",o);return}c==="PVC Board"?($("#modalLength").text(p&&!isNaN(p)?p+" cm":"-"),$("#modalHeight").text(g&&!isNaN(g)?g+" cm":"-"),$("#modalDensity").text(h&&!isNaN(h)?h+" mm":"-"),$("#modalKepadatan").html(`
                <span class="badge badge-primary kepadatan" data-value="0,4 mm">0,4 mm</span>
                <span class="badge badge-primary kepadatan" data-value="0,55 mm">0,55 mm</span>
                <span class="badge badge-primary kepadatan" data-value="0,7 mm">0,7 mm</span>
            `)):$("#panjang, #tinggi, #ketebalan, #kepadatan, #notes").hide(),c==="Wallpanel"&&$("#modalContact").data("type",d),i(m),$("#modalCode").text(o),$("#productModalLabel").text(o),$("#modalCategory").text(l+" / "+d),$("#modalDownload").data("id",b),$("#productModal").modal("show"),$("#modalContact").data("jenis",c),$("#modalContact").data("category",l),$("#modalContact").data("code",o),$("#modalContact").data("kepadatan")&&($(".kepadatan").removeClass("active"),$("#modalContact").data("kepadatan",null),$("#notes").show())}),$(document).on("click",".kepadatan",function(){let o=$(this).data("value");$(this).closest("#productModal").find(".kepadatan").removeClass("active"),$(this).addClass("active"),$("#notes").hide(),$("#modalContact").data("kepadatan",o)}),O(a),E(),U(),G()});
