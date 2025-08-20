let N=null;function S(a){N=a}function A(){return N}function B(){$("#loading").removeClass("d-none")}function E(){$("#loading").addClass("d-none")}function _(a){return a.slice().sort((o,e)=>o.pivot.motif&&!e.pivot.motif?-1:!o.pivot.motif&&e.pivot.motif?1:0).map(o=>"/storage/"+o.path)}function U(){$(document).on("click",".modalDownload",function(a){a.preventDefault();const o=$(this).data("id"),e="catalog/pdf/product?id="+encodeURIComponent(o);M(this,e)}),$("#btn-download").on("click",function(a){a.preventDefault(),M(this,"catalog/pdf?category="+encodeURIComponent(A()))})}function M(a,o){const e=$(a);e.prop("disabled",!0).html('<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Mengunduh...'),window.open(o,"_blank"),setTimeout(()=>{e.prop("disabled",!1).html('<i class="fa fa-file-download"></i> Download')},5e3)}function G(){$(document).on("click",".modalContact",function(a){a.preventDefault(),console.log("Klik tombol order",$(this).data("code"));const o="62816659688";let e="";$(this).data("jenis")=="Wallpanel"?e=`Halo Admin,
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

Apakah produk ini masih tersedia? Terima kasih.`,window.open(`https://wa.me/${o}?text=${encodeURIComponent(e)}`,"_blank")})}function H(){$(window).scroll(function(){$(this).scrollTop()>100?$("#btn-scroll-top").fadeIn():$("#btn-scroll-top").fadeOut()}),$("#btn-scroll-top").click(function(){return $("html, body").animate({scrollTop:0},500),!1})}function W(a,o){let e="";a.forEach(t=>{var d,p,g,h,b,C,P,I,D;const i=t.photo?`/storage/${t.photo}`:"https://via.placeholder.com/300x200?text=No+Image",n=_(t.images),l=[i,...n],s=JSON.stringify(l).replace(/"/g,"&quot;"),r=((d=t.category)==null?void 0:d.name)??"Tanpa Kategori";let c=t.code;o==3?c=t.code.split(" ").slice(4).join(" ").trim():o==5?c=t.code.split(" ").slice(1).join(" "):c=t.code,((p=t.category)==null?void 0:p.display_style)==="square"||o===null?e+=`
                    <div class="col-md-2 col-6 mb-4">
                        <div class="h-100 product-card"
                    `:((g=t.category)==null?void 0:g.display_style)==="rectangle"?e+=`
                    <div class="col-md-4 col-6 mb-4">
                        <div class="h-100 product-card"
                    `:e+=`
                    <div class="col-md-2 col-6 mb-4">
                        <div class="h-100 product-card d-flex flex-column justify-content-center align-items-center"
                    `,e+=`
                    data-id="${t.id}"
                    data-code="${c}"
                    data-category="${r}"
                    data-jenis="${((b=(h=t.category)==null?void 0:h.jenis)==null?void 0:b.name)??""}"
                    data-length="${t.panjang}"
                    data-height="${t.tinggi}"
                    data-density="${t.ketebalan}"
                    data-images="${s}"
                    data-image="${i}"
                    data-type="${((P=(C=t.category)==null?void 0:C.types)==null?void 0:P.name)??""}"
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
                                object-position: ${((D=(I=t.category)==null?void 0:I.jenis)==null?void 0:D.name)==="PVC Board"?"bottom center":"center center"};
                            "
                        >
                        <div class="card-body d-flex flex-column text-center">
                            <h4 class="card-title font-weight-bold text-uppercase mb-2">
                                ${c}
                            </h4>
                            <h6 class="card-text text-muted mb-1">${r}</h6>
                        </div>
                    </div>
                </div>`}),$("#product-list .row").append(e)}function O(a,o){let e="";a.forEach(t=>{const i=t.thumbnail?`/storage/${t.thumbnail}`:"https://via.placeholder.com/300x200?text=No+Image";console.log(o);const n=o==3?"wallpanel":"tanpa kategori";e+=`
                    <div class="col-md-2 col-6 mb-4">
                        <div class="h-100 product-card d-flex flex-column justify-content-center align-items-center"
                    `,e+=`
                    data-id="${t.id}"
                    data-jenis="tipe-wallpanel"
                    data-category="${n}"
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
                            <h6 class="card-text text-muted mb-1">${n}</h6>
                        </div>
                    </div>
                </div>`}),$("#product-list .row").append(e)}function R(a,o,e){if(o==null)return;console.log("rendering mockup/landing page..."),console.log(a),a.forEach(l=>{l.path&&e.add(l.path)});const t=Array.from(e),i=$("#mockup-carousel-inner"),n=$("#mockup-carousel-indicators");i.empty(),n.empty(),t.length>0?(t.length===1?($("#mockup .carousel-control-next").addClass("d-none"),$("#mockup .carousel-control-prev").addClass("d-none")):($("#mockup .carousel-control-next").removeClass("d-none"),$("#mockup .carousel-control-prev").removeClass("d-none")),t.slice(0,5).forEach((l,s)=>{i.append(`
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
                    `),n.append(`
                        <li data-target="#carouselExampleControls" data-slide-to="${s}" ${s===0?'class="active"':""}></li>
                    `)}),$("#mockup").removeClass("d-none")):$("#mockup").addClass("d-none")}let f=null,m=null,K=null,u=1,v=!1,k=!1;const L=new Set;function T(a){f=a.selectedJenis,m=a.category??null,K=a.type??null}function y(a=!0){return new Promise((o,e)=>{if($(window).width()<768&&$("#filter-container").addClass("d-none"),!m||m==="null"||m===""?$("#btn-download").addClass("d-none"):$("#btn-download").removeClass("d-none"),v||k)return o();v=!0,B();const t=$("#search-input").val();$.ajax({url:"/catalog",type:"GET",data:{page:u,search:t,jenis:f,category:m,type:K},success:function(i){console.log("Data berhasil dimuat."),console.log(i);const n=i.data.data??[],l=i.types??[];f==3&&a?(console.log("isFirstLoad:"+a),l.length>0&&(O(l,f),u++,u>i.data.last_page&&(k=!0)),x(i,!0)):(console.log("isFirstLoad:"+a),n.length>0?(W(n,f),u++,u>i.data.last_page&&(k=!0)):(u===1&&($("#mockup").addClass("d-none"),$("#product-list .row").append(`<div class="col-12"><img src="dist/img/no-data.png" alt="no-data"
                                class="img-fluid mx-auto d-block" style="max-width: 100%; height: auto; margin-top: 100px; margin-bottom: 100px;"></div>`)),k=!0),x(i,!1)),x(i,!1),o()},error:function(){console.log("Gagal memuat data."),e()},complete:function(){v=!1,E()}})})}function x(a,o=!0){var s,r,c;const e=a.category,t=(s=a.jenis)==null?void 0:s.name,n=((c=(r=a.data.data[0])==null?void 0:r.category)==null?void 0:c.images)??[];switch(e.length===0?$("#category-container").addClass("d-none"):($("#category-container").removeClass("d-none"),n.length===0&&$("#mockup").addClass("d-none"),R(n,f,L)),t){case"PVC Board":$("#category-container, #category-modal-container").addClass("d-none");break;case"Wallboard":case"UV Board":$("#category-menu-item-label, #category-modal-item-label").html("Motif");break;case"Wallpanel":break;case"Aksesoris":$("#category-container, #category-modal-container").addClass("d-none");break;default:$("#category-menu-item-label, #category-modal-item-label").html("Kategori")}let l='<li class="nav-item font-poppins">';Array.isArray(e)&&e.length>0?e.forEach(d=>{l+=`
            <a class="nav-link text-white category-filter d-flex align-items-center justify-content-start" 
                href="#" data-jenis-id="${d.jenis_id}" data-id="${d.id}" data-type="${d.type_id}">
                <img src="${d.path?"storage/"+d.path:"dist/img/product/1.webp"}" alt="${d.name}" 
                class="mr-2 img-thumbnail" style="width: 50px; height: 50px; object-fit: contain;">
                <span class="text-capitalize">${d.name}</span>
            </a>`}):l+='<a class="nav-link text-white category-filter" href="#">Tanpa Kategori</a>',l+="</li>",$("#category-menu-item, #category-menu-item-modal").html(l),!m&&e.length>0?(m=e[0].id,S(m),w(),y(o)):m&&$(`.category-filter[data-id="${m}"]`).addClass("active")}function w(){u=1,v=!1,k=!1,L.clear(),$("#product-list .row").html("")}let j=!1;function V(a){$(document).off("click",".category-filter"),$(document).on("click",".category-filter",async function(o){if(o.preventDefault(),j)return;j=!0;const e=$(this).data("id"),t=$(this).data("type");console.log(t);try{T({selectedJenis:a,category:e,type:t}),S(e),$("#filterModal").modal("hide"),w(),await y(!1)}catch(i){console.error("Gagal memuat data:",i)}finally{j=!1}})}$(document).ready(function(){let a=new URLSearchParams(window.location.search).get("jenis"),o=new URLSearchParams(window.location.search).get("category"),e,t;(a==5||a==2)&&sessionStorage.removeItem("selectedWallpanel"),T({selectedJenis:a,category:o}),y(),a&&($("#category-container").removeClass("d-md-none"),$("#catalog-col").removeClass("center-content")),$(window).width()<768&&$("#filter-container").addClass("d-none"),(a==1||a==3||a==4)&&($("#filter-container").addClass("d-none"),$("#catalog-col").removeClass("col-md-10"),$("#catalog-col").addClass("col-md-12")),$("#search-input").on("input",function(){clearTimeout(e),e=setTimeout(()=>{w(),y()},500)}),$(window).on("scroll",function(){clearTimeout(t),t=setTimeout(()=>{const n=$(window).scrollTop(),l=$(window).height(),s=$(document).height();n+l>=s-150&&y()},200)});function i(n,l=null){$("#carousel-product-image").empty(),$("#thumbnailGallery").empty();let s=[...n];l&&(s=[...l,...n]),s.forEach((r,c)=>{const d=c===0?"active":"";$("#carousel-product-image").append(`
                    <div class="carousel-item ${d}">
                        <img src="${r}" class="img-fluid d-block mx-auto"
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
                    <img src="${r}" class="img-thumbnail m-1 thumbnail-image" style="width: 5rem; height: 5rem; object-fit: cover; cursor: pointer;" data-index="${c}">
                `)}),n.length<=1?($("#carouselProduct .carousel-control-next").addClass("d-none"),$("#carouselProduct .carousel-control-prev").addClass("d-none")):($("#carouselProduct .carousel-control-next").removeClass("d-none"),$("#carouselProduct .carousel-control-prev").removeClass("d-none")),$("#thumbnailGallery").on("click",".thumbnail-image",function(){const r=$(this).data("index");$("#carouselProduct .carousel-item").removeClass("active"),$("#carouselProduct .carousel-item").eq(r).addClass("active")})}$(document).on("click",".product-card",function(){const n=$(this).data("code"),l=$(this).data("category"),s=$(this).attr("data-images"),r=$(this).data("type");let c=null;s&&(c=JSON.parse(s.replace(/&quot;/g,'"')));const d=$(this).data("jenis"),p=parseInt($(this).data("length"),10),g=parseInt($(this).data("height"),10),h=parseInt($(this).data("density"),10),b=$(this).data("id");if(d==="tipe-wallpanel"){w(),T({selectedJenis:3,type:r}),y(!1),$("#filter-container").toggleClass("d-none"),$("#catalog-col").toggleClass("col-md-10 col-md-12");return}if(d.toLowerCase()==="uv board"||d.toLowerCase()==="wallboard"){console.log("Belum pilih wallpanel, tampilkan UV Board sebagai produk biasa"),i(c),$("#modalCode").text(n),$("#productModalLabel").text(n),$("#modalCategory").text(d+" / "+l),$("#modalDownload").data("id",b),$("#productModal").modal("show"),$("#panjang, #tinggi, #ketebalan, #kepadatan, #notes").hide(),$("#modalContact").data("jenis",d),$("#modalContact").data("category",l),$("#modalContact").data("code",n);return}d==="PVC Board"?($("#modalLength").text(p&&!isNaN(p)?p+" cm":"-"),$("#modalHeight").text(g&&!isNaN(g)?g+" cm":"-"),$("#modalDensity").text(h&&!isNaN(h)?h+" mm":"-"),$("#modalKepadatan").html(`
                <span class="badge badge-primary kepadatan" data-value="0,4 mm">0,4 mm</span>
                <span class="badge badge-primary kepadatan" data-value="0,55 mm">0,55 mm</span>
                <span class="badge badge-primary kepadatan" data-value="0,7 mm">0,7 mm</span>
            `)):$("#panjang, #tinggi, #ketebalan, #kepadatan, #notes").hide(),d==="Wallpanel"&&$("#modalContact").data("type",r),i(c),$("#modalCode").text(n),$("#productModalLabel").text(n),$("#modalCategory").text(l+" / "+r),$("#modalDownload").data("id",b),$("#productModal").modal("show"),$("#modalContact").data("jenis",d),$("#modalContact").data("category",l),$("#modalContact").data("code",n),$("#modalContact").data("kepadatan")&&($(".kepadatan").removeClass("active"),$("#modalContact").data("kepadatan",null),$("#notes").show())}),$(document).on("click",".kepadatan",function(){let n=$(this).data("value");$(this).closest("#productModal").find(".kepadatan").removeClass("active"),$(this).addClass("active"),$("#notes").hide(),$("#modalContact").data("kepadatan",n)}),V(a),U(),G(),H()});
