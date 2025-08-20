let M=null;function N(a){M=a}function L(){return M}function A(){$("#loading").removeClass("d-none")}function B(){$("#loading").addClass("d-none")}function E(a){return a.slice().sort((n,e)=>n.pivot.motif&&!e.pivot.motif?-1:!n.pivot.motif&&e.pivot.motif?1:0).map(n=>"/storage/"+n.path)}function U(){$(document).on("click",".modalDownload",function(a){a.preventDefault();const n=$(this).data("id"),e="catalog/pdf/product?id="+encodeURIComponent(n);D(this,e)}),$("#btn-download").on("click",function(a){a.preventDefault(),D(this,"catalog/pdf?category="+encodeURIComponent(L()))})}function D(a,n){const e=$(a);e.prop("disabled",!0).html('<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Mengunduh...'),window.open(n,"_blank"),setTimeout(()=>{e.prop("disabled",!1).html('<i class="fa fa-file-download"></i> Download')},5e3)}function _(){$(document).on("click",".modalContact",function(a){a.preventDefault(),console.log("Klik tombol order",$(this).data("code"));const n="62816659688";let e="";$(this).data("jenis")=="Wallpanel"?e=`Halo Admin,
Saya tertarik dengan produk berikut:

• Tipe Wallpanel: *${$(this).data("type")}*
• Kode Motif : *${$(this).data("code")}*
• Produk : *${$(this).data("jenis")}*
• Kategori: *${$(this).data("category")}*

Apakah produk ini masih tersedia? Terima kasih.`:$(this).data("kepadatan")?e=`Halo Admin,
Saya tertarik dengan produk berikut:

• Produk : *${$(this).data("jenis")}*
• Ketebalan : *${$(this).data("code")}*
• Kepadatan: *${$(this).data("kepadatan")}*

Apakah produk ini masih tersedia? Terima kasih.`:e=`Halo Admin,
Saya tertarik dengan produk berikut:

• Kode Motif : *${$(this).data("code")}*
• Produk : *${$(this).data("jenis")}*
• Kategori: *${$(this).data("category")}*

Apakah produk ini masih tersedia? Terima kasih.`,window.open(`https://wa.me/${n}?text=${encodeURIComponent(e)}`,"_blank")})}function G(){$(window).scroll(function(){$(this).scrollTop()>100?$("#btn-scroll-top").fadeIn():$("#btn-scroll-top").fadeOut()}),$("#btn-scroll-top").click(function(){return $("html, body").animate({scrollTop:0},500),!1})}function H(a,n){let e="";a.forEach(t=>{var s,r,p,g,h,b,C,P,I;const i=t.photo?`/storage/${t.photo}`:"https://via.placeholder.com/300x200?text=No+Image",o=E(t.images),l=[i,...o],d=JSON.stringify(l).replace(/"/g,"&quot;"),c=((s=t.category)==null?void 0:s.name)??"Tanpa Kategori";((r=t.category)==null?void 0:r.display_style)==="square"||n===null?e+=`
                    <div class="col-md-2 col-6 mb-4">
                        <div class="h-100 product-card"
                    `:((p=t.category)==null?void 0:p.display_style)==="rectangle"?e+=`
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
                    data-images="${d}"
                    data-image="${i}"
                    data-type="${((C=(b=t.category)==null?void 0:b.types)==null?void 0:C.name)??""}"
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
                                object-position: ${((I=(P=t.category)==null?void 0:P.jenis)==null?void 0:I.name)==="PVC Board"?"bottom center":"center center"};
                            "
                        >
                        <div class="card-body d-flex flex-column text-center">
                            <h4 class="card-title font-weight-bold text-uppercase mb-2">
                                ${n==5?t.code.split(" ").slice(1).join(" "):t.code}
                            </h4>
                            <h6 class="card-text text-muted mb-1">${c}</h6>
                        </div>
                    </div>
                </div>`}),$("#product-list .row").append(e)}function W(a,n){let e="";a.forEach(t=>{const i=t.thumbnail?`/storage/${t.thumbnail}`:"https://via.placeholder.com/300x200?text=No+Image";console.log(n);const o=n==3?"wallpanel":"tanpa kategori";e+=`
                    <div class="col-md-2 col-6 mb-4">
                        <div class="h-100 product-card d-flex flex-column justify-content-center align-items-center"
                    `,e+=`
                    data-id="${t.id}"
                    data-jenis="tipe-wallpanel"
                    data-category="${o}"
                    data-type="${t.id}"
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
                            "
                        >
                        <div class="card-body d-flex flex-column text-center">
                            <h4 class="card-title font-weight-bold text-uppercase mb-2">
                                ${t.name}
                            </h4>
                            <h6 class="card-text text-muted mb-1">${o}</h6>
                        </div>
                    </div>
                </div>`}),$("#product-list .row").append(e)}function J(a,n,e){if(n==null)return;a.forEach(l=>{l.path&&e.add(l.path)});const t=Array.from(e),i=$("#mockup-carousel-inner"),o=$("#mockup-carousel-indicators");i.empty(),o.empty(),t.length>0?(t.length===1?($("#mockup .carousel-control-next").addClass("d-none"),$("#mockup .carousel-control-prev").addClass("d-none")):($("#mockup .carousel-control-next").removeClass("d-none"),$("#mockup .carousel-control-prev").removeClass("d-none")),t.slice(0,5).forEach((l,d)=>{i.append(`
                        <div class="carousel-item ${d===0?"active":""}">
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
                        <li data-target="#carouselExampleControls" data-slide-to="${d}" ${d===0?'class="active"':""}></li>
                    `)}),$("#mockup").removeClass("d-none")):$("#mockup").addClass("d-none")}let f=null,m=null,S=null,u=1,v=!1,k=!1;const K=new Set;function T(a){f=a.selectedJenis,m=a.category??null,S=a.type??null}function y(a=!0){return new Promise((n,e)=>{if($(window).width()<768&&$("#filter-container").addClass("d-none"),!m||m==="null"||m===""?$("#btn-download").addClass("d-none"):$("#btn-download").removeClass("d-none"),v||k)return n();v=!0,A();const t=$("#search-input").val();$.ajax({url:"/catalog",type:"GET",data:{page:u,search:t,jenis:f,category:m,type:S},success:function(i){console.log("Data berhasil dimuat."),console.log(i);const o=i.data.data??[],l=i.types??[];f==3&&a?(console.log("isFirstLoad:"+a),l.length>0&&(W(l,f),u++,u>i.data.last_page&&(k=!0)),x(i,!0)):(console.log("isFirstLoad:"+a),o.length>0?(H(o,f),u++,u>i.data.last_page&&(k=!0)):(u===1&&($("#mockup").addClass("d-none"),$("#product-list .row").append(`<div class="col-12"><img src="dist/img/no-data.png" alt="no-data"
                                class="img-fluid mx-auto d-block" style="max-width: 100%; height: auto; margin-top: 100px; margin-bottom: 100px;"></div>`)),k=!0),x(i,!1)),x(i,!1),n()},error:function(){console.log("Gagal memuat data."),e()},complete:function(){v=!1,B()}})})}function x(a,n=!0){var d,c;const e=a.category,t=(d=a.jenis)==null?void 0:d.name,o=((c=a.category[0])==null?void 0:c.images)??[];switch(e.length===0?$("#category-container").addClass("d-none"):($("#category-container").removeClass("d-none"),o.length===0&&$("#mockup").addClass("d-none"),J(o,f,K)),t){case"PVC Board":$("#category-container, #category-modal-container").addClass("d-none");break;case"Wallboard":case"UV Board":$("#category-menu-item-label, #category-modal-item-label").html("Motif");break;case"Wallpanel":break;case"Aksesoris":$("#category-container, #category-modal-container").addClass("d-none");break;default:$("#category-menu-item-label, #category-modal-item-label").html("Kategori")}let l='<li class="nav-item font-poppins">';Array.isArray(e)&&e.length>0?e.forEach(s=>{l+=`
            <a class="nav-link text-white category-filter d-flex align-items-center justify-content-start" 
                href="#" data-jenis-id="${s.jenis_id}" data-id="${s.id}">
                <img src="${s.path?"storage/"+s.path:"dist/img/product/1.webp"}" alt="${s.name}" 
                class="mr-2 img-thumbnail" style="width: 50px; height: 50px; object-fit: contain;">
                <span class="text-capitalize">${s.name}</span>
            </a>`}):l+='<a class="nav-link text-white category-filter" href="#">Tanpa Kategori</a>',l+="</li>",$("#category-menu-item, #category-menu-item-modal").html(l),!m&&e.length>0?(m=e[0].id,N(m),w(),y(n)):m&&$(`.category-filter[data-id="${m}"]`).addClass("active")}function w(){u=1,v=!1,k=!1,K.clear(),$("#product-list .row").html("")}let j=!1;function O(a){$(document).off("click",".category-filter"),$(document).on("click",".category-filter",async function(n){if(n.preventDefault(),j)return;j=!0;const e=$(this).data("id");try{T({selectedJenis:a,category:e}),N(e),$("#filterModal").modal("hide"),w(),await y(!1)}catch(t){console.error("Gagal memuat data:",t)}finally{j=!1}})}$(document).ready(function(){let a=new URLSearchParams(window.location.search).get("jenis"),n=new URLSearchParams(window.location.search).get("category"),e,t;(a==5||a==2)&&sessionStorage.removeItem("selectedWallpanel"),T({selectedJenis:a,category:n}),y(),a&&($("#category-container").removeClass("d-md-none"),$("#catalog-col").removeClass("center-content")),$(window).width()<768&&$("#filter-container").addClass("d-none"),(a==1||a==3||a==4)&&($("#filter-container").addClass("d-none"),$("#catalog-col").removeClass("col-md-10"),$("#catalog-col").addClass("col-md-12")),$("#search-input").on("input",function(){clearTimeout(e),e=setTimeout(()=>{w(),y()},500)}),$(window).on("scroll",function(){clearTimeout(t),t=setTimeout(()=>{const o=$(window).scrollTop(),l=$(window).height(),d=$(document).height();o+l>=d-150&&y()},200)});function i(o,l=null){$("#carousel-product-image").empty(),$("#thumbnailGallery").empty();let d=[...o];l&&(d=[...l,...o]),d.forEach((c,s)=>{const r=s===0?"active":"";$("#carousel-product-image").append(`
                    <div class="carousel-item ${r}">
                        <img src="${c}" class="img-fluid d-block mx-auto"
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
                    <img src="${c}" class="img-thumbnail m-1 thumbnail-image" style="width: 5rem; height: 5rem; object-fit: cover; cursor: pointer;" data-index="${s}">
                `)}),o.length<=1?($("#carouselProduct .carousel-control-next").addClass("d-none"),$("#carouselProduct .carousel-control-prev").addClass("d-none")):($("#carouselProduct .carousel-control-next").removeClass("d-none"),$("#carouselProduct .carousel-control-prev").removeClass("d-none")),$("#thumbnailGallery").on("click",".thumbnail-image",function(){const c=$(this).data("index");$("#carouselProduct .carousel-item").removeClass("active"),$("#carouselProduct .carousel-item").eq(c).addClass("active")})}$(document).on("click",".product-card",function(){const o=$(this).data("code"),l=$(this).data("category"),d=$(this).attr("data-images"),c=$(this).data("type");let s=null;d&&(s=JSON.parse(d.replace(/&quot;/g,'"')));const r=$(this).data("jenis"),p=parseInt($(this).data("length"),10),g=parseInt($(this).data("height"),10),h=parseInt($(this).data("density"),10),b=$(this).data("id");if(r==="tipe-wallpanel"){w(),T({selectedJenis:3,type:c}),y(!1),$("#filter-container").toggleClass("d-none"),$("#catalog-col").toggleClass("col-md-10 col-md-12");return}if(r.toLowerCase()==="uv board"||r.toLowerCase()==="wallboard"){console.log("Belum pilih wallpanel, tampilkan UV Board sebagai produk biasa"),i(s),$("#modalCode").text(o),$("#productModalLabel").text(o),$("#modalCategory").text(r+" / "+l),$("#modalDownload").data("id",b),$("#productModal").modal("show"),$("#panjang, #tinggi, #ketebalan, #kepadatan, #notes").hide(),$("#modalContact").data("jenis",r),$("#modalContact").data("category",l),$("#modalContact").data("code",o);return}r==="PVC Board"?($("#modalLength").text(p&&!isNaN(p)?p+" cm":"-"),$("#modalHeight").text(g&&!isNaN(g)?g+" cm":"-"),$("#modalDensity").text(h&&!isNaN(h)?h+" mm":"-"),$("#modalKepadatan").html(`
                <span class="badge badge-primary kepadatan" data-value="0,4 mm">0,4 mm</span>
                <span class="badge badge-primary kepadatan" data-value="0,55 mm">0,55 mm</span>
                <span class="badge badge-primary kepadatan" data-value="0,7 mm">0,7 mm</span>
            `)):$("#panjang, #tinggi, #ketebalan, #kepadatan, #notes").hide(),r==="Wallpanel"&&$("#modalContact").data("type",c),i(s),$("#modalCode").text(o),$("#productModalLabel").text(o),$("#modalCategory").text(l+" / "+c),$("#modalDownload").data("id",b),$("#productModal").modal("show"),$("#modalContact").data("jenis",r),$("#modalContact").data("category",l),$("#modalContact").data("code",o),$("#modalContact").data("kepadatan")&&($(".kepadatan").removeClass("active"),$("#modalContact").data("kepadatan",null),$("#notes").show())}),$(document).on("click",".kepadatan",function(){let o=$(this).data("value");$(this).closest("#productModal").find(".kepadatan").removeClass("active"),$(this).addClass("active"),$("#notes").hide(),$("#modalContact").data("kepadatan",o)}),O(a),U(),_(),G()});
