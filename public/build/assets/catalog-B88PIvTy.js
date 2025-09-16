let V=null;function H(e){V=e}function O(){return V}function _(){$("#loading").removeClass("d-none")}function R(){$("#loading").addClass("d-none")}function W(e){return e.slice().sort((o,t)=>(t.type==="motif")-(o.type==="motif")).map(o=>"/storage/"+o.path)}function F(){$(document).on("click",".modalDownload",function(e){e.preventDefault();const o=$(this).data("id"),t="catalog/pdf/product?id="+encodeURIComponent(o);B(this,t)}),$("#btn-download").on("click",function(e){e.preventDefault(),B(this,"catalog/pdf?category="+encodeURIComponent(O()))})}function B(e,o){const t=$(e);t.prop("disabled",!0).html('<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Mengunduh...'),window.open(o,"_blank"),setTimeout(()=>{t.prop("disabled",!1).html('<i class="fa fa-file-download"></i> Download')},5e3)}function J(){$(document).on("click",".modalContact",function(e){e.preventDefault(),console.log("Klik tombol order",$(this).data("code"));const o="62816659688",t=$(this).data("jenis");console.log(t.toLowerCase());let a="";t.toLowerCase()=="wallpanel"?a=`Halo Admin,
Saya tertarik dengan produk berikut:

• Tipe Wallpanel: *${$(this).data("type")}*
• Kode Motif : *${$(this).data("code")}*
• Produk : *${$(this).data("jenis")}*
• Kategori: *${$(this).data("category")}*

Apakah produk ini masih tersedia? Terima kasih.`:t.toLowerCase()=="pvc board"?a=`Halo Admin,
Saya tertarik dengan produk berikut:

• Produk : *${$(this).data("jenis")}*
• Ketebalan : *${$(this).data("code")}*
• Kepadatan: *${$(this).data("kepadatan")??"-"}*

Apakah produk ini masih tersedia? Terima kasih.`:t.toLowerCase()=="uv board"?a=`Halo Admin,
Saya tertarik dengan produk berikut:

• Kode Motif : *${$(this).data("code")}*
• Produk : *${$(this).data("jenis")}*
• Kategori: *${$(this).data("category")}*

• Paket: *${$(this).data("kepadatan")??"-"}*

Apakah produk ini masih tersedia? Terima kasih.`:t.toLowerCase()=="aksesoris"?a=`Halo Admin,
Saya tertarik dengan produk berikut:

• Kode : *${$(this).data("code")}*
• Produk : *${$(this).data("jenis")}*
• Ukuran : *${$(this).data("category")}*

• Warna : *${$(this).data("kepadatan")}*

Apakah produk ini masih tersedia? Terima kasih.`:a=`Halo Admin,
Saya tertarik dengan produk berikut:

• Kode Motif : *${$(this).data("code")}*
• Produk : *${$(this).data("jenis")}*
• Kategori: *${$(this).data("category")}*

Apakah produk ini masih tersedia? Terima kasih.`,window.open(`https://wa.me/${o}?text=${encodeURIComponent(a)}`,"_blank")})}function q(){$(window).scroll(function(){$(this).scrollTop()>100?$("#btn-scroll-top").fadeIn():$("#btn-scroll-top").fadeOut()}),$("#btn-scroll-top").click(function(){return $("html, body").animate({scrollTop:0},500),!1})}function Y(e,o){$("#btn-download").removeClass("d-none");let t="";e.forEach(a=>{var m,f,k,u,p,g,h,x,P;const r=a.photo?`/storage/${a.photo}`:"https://via.placeholder.com/300x200?text=No+Image",s=W(a.images),n=[r,...s],l=JSON.stringify(n).replace(/"/g,"&quot;"),i=JSON.stringify(a.packages).replace(/"/g,"&quot;"),c=((m=a.category)==null?void 0:m.name)??"Tanpa Kategori";let d=a.code;o==3?d=a.code.split(" ").slice(4).join(" ").trim():o==5?d=a.code.split(" ").slice(1).join(" "):d=a.code,((f=a.category)==null?void 0:f.display_style)==="square"||o===null?t+=`
                    <div class="col-md-2 col-6 mb-4">
                        <div class="h-100 product-card"
                    `:((k=a.category)==null?void 0:k.display_style)==="rectangle"?t+=`
                    <div class="col-md-4 col-6 mb-4">
                        <div class="h-100 product-card"
                    `:t+=`
                    <div class="col-md-2 col-6 mb-4">
                        <div class="h-100 product-card d-flex flex-column justify-content-center align-items-center"
                    `,t+=`
                    data-id="${a.id}"
                    data-code="${d}"
                    data-category="${c}"
                    data-jenis="${((p=(u=a.category)==null?void 0:u.jenis)==null?void 0:p.name)??""}"
                    data-length="${a.panjang}"
                    data-height="${a.tinggi}"
                    data-density="${a.ketebalan}"
                    data-images="${l}"
                    data-image="${r}"
                    data-type="${((h=(g=a.category)==null?void 0:g.types)==null?void 0:h.name)??""}"
                    data-url="${a.url_video}"
                    data-paket="${i}"
                    >
                       <img 
                            src="${r}" 
                            class="card-img-top" 
                            alt="${a.name}" 
                            style="
                                border : 1px solid #2c2c2c;
                                min-height: 10rem;
                                aspect-ratio: 1/1;
                                height: auto; 
                                border-radius: 8px;
                                width: 100%; 
                                object-fit: cover; 
                                object-position: ${((P=(x=a.category)==null?void 0:x.jenis)==null?void 0:P.name)==="PVC Board"?"bottom center":"center center"};
                            "
                        >
                        <div class="card-body d-flex flex-column text-center">
                            <h4 class="card-title font-weight-bold text-uppercase mb-2">
                                ${d}
                            </h4>
                            <h6 class="card-text text-muted mb-1">${c}</h6>
                        </div>
                    </div>
                </div>`}),$("#product-list .row").append(t)}function z(e,o){$("#btn-download").addClass("d-none");let t="";e.forEach(a=>{const r=a.thumbnail?`/storage/${a.thumbnail}`:"https://via.placeholder.com/300x200?text=No+Image";console.log(o);const s=o==3?"wallpanel":"tanpa kategori";t+=`
                    <div class="col-md-2 col-6 mb-4">
                        <div class="h-100 product-card d-flex flex-column justify-content-center align-items-center"
                    `,t+=`
                    data-id="${a.id}"
                    data-jenis="tipe-wallpanel"
                    data-category="${s}"
                    data-type="${a.id}"
                    >
                       <img 
                            src="${r}" 
                            class="card-img-top" 
                            alt="${a.name}" 
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
                                ${a.name}
                            </h4>
                            <h6 class="card-text text-muted mb-1">${s}</h6>
                        </div>
                    </div>
                </div>`}),$("#product-list .row").append(t)}function X(e,o,t){if(o==null)return;e.forEach(l=>{l.path&&t.add(l.path)});const a=Array.from(t),r=$("#mockup-carousel-inner"),s=$("#mockup-carousel-indicators"),n=["https://www.youtube.com/embed/BiiUrYAbL9s?autoplay=1&mute=1&rel=0&controls=0&amp;loop=1&playlist=BiiUrYAbL9s"];if(r.empty(),s.empty(),o==4){$("#mockup-carousel").carousel({interval:!1}),$("#mockup .carousel-control-next").addClass("d-none"),$("#mockup .carousel-control-prev").addClass("d-none"),n.forEach((l,i)=>{r.append(`
            <div class="carousel-item ${i===0?"active":""}">
                <div class="d-flex justify-content-center align-items-center">
                    <div class="embed-responsive embed-responsive-16by9 rounded-lg" style="width:100%;">
                        <iframe
                            class="embed-responsive-item"
                            src="${l}"
                            title="YouTube video player"
                            frameborder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; web-share"
                            allowfullscreen
                        ></iframe>
                    </div>
                </div>
            </div>
        `)}),$("#mockup").removeClass("d-none");return}a.length>0?(a.length===1?($("#mockup .carousel-control-next").addClass("d-none"),$("#mockup .carousel-control-prev").addClass("d-none")):($("#mockup .carousel-control-next").removeClass("d-none"),$("#mockup .carousel-control-prev").removeClass("d-none")),a.slice(0,5).forEach((l,i)=>{r.append(`
                <div class="carousel-item ${i===0?"active":""}">
                    <img src="/storage/${l}" id="mockup-image" alt="mockup" 
                        class="img-fluid w-100 rounded-lg d-block mx-auto"
                    >
                </div>
            `),s.append(`
                <li data-target="#mockup-carousel" data-slide-to="${i}" ${i===0?'class="active"':""}></li>
            `)}),$("#mockup").removeClass("d-none")):$("#mockup").addClass("d-none")}let w=null,v=null,A=null,b=1,T=!1,j=!1;const G=new Set;let U=!0;function D(e){U=e}function I(e){w=e.selectedJenis,v=e.category??null,A=e.type??null}function C(){return new Promise((e,o)=>{if($(window).width()<768&&$("#filter-container").addClass("d-none"),T||j)return e();T=!0,_();const t=$("#search-input").val();$.ajax({url:"/catalog",type:"GET",data:{page:b,search:t,jenis:w,category:v,type:A},success:function(a){const r=a.data.data??[],s=a.types??[];A&&($("#backButton").removeClass("d-none"),$("#homeButton").addClass("d-none")),w==3&&U?(s.length>0&&(z(s,w),b++,b>a.data.last_page&&(j=!0)),M(a,!0)):(r.length>0?(Y(r,w),b++,b>a.data.last_page&&(j=!0)):(b===1&&($("#mockup").addClass("d-none"),$("#product-list .row").append(`<div class="col-12"><img src="dist/img/no-data.png" alt="no-data"
                                class="img-fluid mx-auto d-block" style="max-width: 100%; height: auto; margin-top: 100px; margin-bottom: 100px;"></div>`)),j=!0),M(a,!1)),e()},error:function(){console.log("Gagal memuat data."),o()},complete:function(){T=!1,R()}})})}function M(e,o=!0){var l,i,c;const t=e.category,a=(l=e.jenis)==null?void 0:l.name,s=((c=(i=e.data.data[0])==null?void 0:i.category)==null?void 0:c.images)??[];switch(t.length===0?$("#category-container").addClass("d-none"):($("#category-container").removeClass("d-none"),s.length===0&&$("#mockup").addClass("d-none"),X(s,w,G)),a){case"PVC Board":$("#category-container").addClass("d-none"),$(".category-modal-container").text("Tidak ada kategori");break;case"Wallboard":$("#category-menu-item-label, #category-modal-item-label").html("Motif");break;case"UV Board":$("#category-menu-item-label, #category-modal-item-label").html("Motif");break;case"Wallpanel":$("#category-menu-item-label, #category-modal-item-label").html("Motif");break;case"Aksesoris":$("#category-menu-item-label, #category-modal-item-label").html("Ukuran");break;default:$("#category-menu-item-label, #category-modal-item-label").html("Kategori")}let n='<li class="nav-item font-poppins">';Array.isArray(t)&&t.length>0?t.forEach(d=>{n+=`
            <a class="nav-link text-white category-filter d-flex align-items-center justify-content-start" 
                href="#" data-jenis-id="${d.jenis_id}" data-id="${d.id}" data-type="${d.type_id}">
                <img src="${d.path?"storage/"+d.path:"dist/img/product/1.webp"}" alt="${d.name}" 
                class="mr-2 img-thumbnail" style="width: 50px; height: 50px; object-fit: contain;">
                <span class="text-capitalize">${d.name}</span>
            </a>`}):n+='<a class="nav-link text-white category-filter" href="#">Tanpa Kategori</a>',n+="</li>",o?($("#category-menu-item-label, #category-modal-item-label").html(""),$("#category-menu-item,#category-menu-item-modal").html("tidak ada kategori")):$("#category-menu-item, #category-menu-item-modal").html(n),!v&&t.length>0?(console.log("auto choose category"),v=t[0].id,H(v),L(),C()):v&&$(`.category-filter[data-id="${v}"]`).addClass("active")}function L(){b=1,T=!1,j=!1,G.clear(),$("#product-list .row").html("")}let S=!1;function Q(e){$(document).off("click",".category-filter"),$(document).on("click",".category-filter",async function(o){if(o.preventDefault(),S)return;S=!0;const t=$(this).data("id"),a=$(this).data("type");console.log(a);try{I({selectedJenis:e,category:t,type:a}),H(t),$("#filterModal").modal("hide"),L(),await C(!1)}catch(r){console.error("Gagal memuat data:",r)}finally{S=!1}})}$(document).ready(function(){let e=new URLSearchParams(window.location.search).get("jenis"),o=new URLSearchParams(window.location.search).get("category"),t,a;(e==5||e==2)&&sessionStorage.removeItem("selectedWallpanel"),I({selectedJenis:e,category:o}),C(),e&&($("#category-container").removeClass("d-md-none"),$("#catalog-col").removeClass("center-content")),$(window).width()<768&&$("#filter-container").addClass("d-none"),(e==1||e==3)&&($("#filter-container").addClass("d-none"),$("#catalog-col").removeClass("col-md-10"),$("#catalog-col").addClass("col-md-12")),$("#search-input").on("input",function(){clearTimeout(t),t=setTimeout(()=>{L(),C()},500)}),$(window).on("scroll",function(){clearTimeout(a),a=setTimeout(()=>{const n=$(window).scrollTop(),l=$(window).height(),i=$(document).height();n+l>=i-150&&(D(!1),C())},200)});function r(n,l=null,i=null){$("#carousel-product-image").empty(),$("#thumbnailGallery").empty();let c=[...n];i.toLowerCase()=="uv board"?c=[...n,...l]:c=[...n],c.forEach((m,f)=>{const k=f===0?"active":"";$("#carousel-product-image").append(`
                    <div class="carousel-item ${k}">
                        <img src="${m}" class="img-fluid d-block mx-auto"
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
                    <div class="col-2 mb-0 d-flex justify-content-center">
                        <div style="height: 90%">
                           <img src="${m}" 
                            class="img-thumbnail thumbnail-image p-0 w-100 h-100" 
                            style="
                                height: auto;
                                aspect-ratio: 1 / 1;
                                border: 1px solid #ccc;
                                border-radius: 8px;
                                object-fit: cover;
                                cursor: pointer;"
                            data-index="${f}">
                        </div>
                    </div>
                    `)}),n.length<=1?($("#carouselProduct .carousel-control-next").addClass("d-none"),$("#carouselProduct .carousel-control-prev").addClass("d-none")):($("#carouselProduct .carousel-control-next").removeClass("d-none"),$("#carouselProduct .carousel-control-prev").removeClass("d-none")),$("#carouselProduct").carousel({interval:3e3,pause:!1});let d;$("#thumbnailGallery").off("click").on("click",".thumbnail-image",function(){const m=$(this).data("index");$("#carouselProduct").carousel(m),$(".thumbnail-image").removeClass("active-thumbnail"),$(this).addClass("active-thumbnail"),setTimeout(()=>{$(this).removeClass("active-thumbnail")},500),$("#carouselProduct").carousel("pause"),clearTimeout(d),d=setTimeout(()=>{$("#carouselProduct").carousel("cycle")},5e3)})}$(document).on("click",".product-card",function(){const n=$(this).data("id"),l=$(this).data("code"),i=$(this).data("category"),c=$(this).attr("data-images"),d=$(this).data("type"),m=JSON.parse($(this).attr("data-paket")||"[]");let f=null,k=null;Array.isArray(m)&&(k=m.sort((y,N)=>y.order-N.order).map(y=>`/storage/${y.image}`)),c&&(f=JSON.parse(c.replace(/&quot;/g,'"')));const u=$(this).data("jenis"),p=parseInt($(this).data("length"),10),g=parseInt($(this).data("height"),10),h=parseFloat($(this).data("density")).toFixed(1),x=$(this).data("url");if($("#modalPaket").empty(),u==="tipe-wallpanel"){L(),I({selectedJenis:3,type:d}),D(!1),C(),$("#filter-container").toggleClass("d-none"),$("#catalog-col").toggleClass("col-md-10 col-md-12");return}u.toLowerCase()==="uv board"&&(s(n),$("#modalVideo").hide(),$("#modalCategory").text(i),$("#modalLength").text(p&&!isNaN(p)?p+" cm":"-"),$("#modalHeight").text(g&&!isNaN(g)?g+" cm":"-"),$("#modalDensity").text(h&&!isNaN(h)?h+" mm":"-"),$("#modalKepadatan").html(`
                <span class="">0.9 mm</span>
            `),m.length>0?m.sort((y,N)=>y.order-N.order).map(y=>{$("#modalPaket").append(`
                        <span class="badge badge-outline-primary px-2 py-1 kepadatan" data-value="${y.name}">${y.name}</span>
                    `)}):($("#modalPaket").append('<span class="text-muted">Tidak ada paket</span>'),$("#notes").hide())),u.toLowerCase()==="wallboard"&&(s(n),$("#modalCategory").text(i),$("#modalLength").text(p&&!isNaN(p)?p+" cm":"-"),$("#modalHeight").text(g&&!isNaN(g)?g+" cm":"-"),$("#ketebalan, #kepadatan, #notes, .paket,  #modalVideo").hide()),u==="PVC Board"&&(s(n),$("#modalCategory").text(u),$("#modalLength").text(p&&!isNaN(p)?p+" cm":"-"),$("#modalHeight").text(g&&!isNaN(g)?g+" cm":"-"),$("#modalDensity").text(h&&!isNaN(h)?h+" mm":"-"),$("#modalKepadatan").html(`
                <span class="badge badge-outline-primary kepadatan" data-value="0,4 mm">0,4mm (Lite)</span>
                <span class="badge badge-outline-primary kepadatan" data-value="0,55 mm">0,55mm (Standar)</span>
                <span class="badge badge-outline-primary kepadatan" data-value="0,7 mm">0,7mm (Heavy-duty)</span>
            `),$(".paket,  #modalVideo").hide()),u==="Wallpanel"&&(s(n),$("#modalContact").data("type",d),$("#modalCategory").text(i+" / "+d),$("#panjang, #tinggi, #ketebalan, #kepadatan, #notes, .paket, #modalVideo").hide()),u.toLowerCase()==="aksesoris"&&(s(n),$("#tinggi, #ketebalan, #kepadatan").hide(),$("#paket").text("Warna"),$("#modalCategory").text(i),$("#modalPaket").append(`
                <span class="badge badge-pill badge-outline-primary kepadatan" data-value="Black">Black</span>
                <span class="badge badge-pill badge-outline-primary kepadatan" data-value="Bronze">Bronze</span>
                <span class="badge badge-pill badge-outline-primary kepadatan" data-value="Rose Gold">Rose Gold</span>
                <span class="badge badge-pill badge-outline-primary kepadatan" data-value="Dark Gray">Dark Gray</span>

            `),$("#modalLength").text("3 m"),$("#modalVideoPlayer").empty(),$("#modalVideo").hide(),x&&($("#modalVideoPlayer").append(`
                    <iframe class="embed-responsive-item"
                    src="${x}"
                    title="YouTube video player" frameborder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; web-share;"
                    referrerpolicy="strict-origin-when-cross-origin"
                    allowfullscreen></iframe>
                `),$("#modalVideo").show())),r(f,k,u),$("#modalCode").text(l),$("#productModalLabel").text(l),$("#modalDownload").data("id",n),$("#productModal").modal("show"),$("#modalContact").data("jenis",u),$("#modalContact").data("category",i),$("#modalContact").data("code",l);let P=$("#modalContact").data("kepadatan"),E=$("#modalContact").data("paket");P&&($(".kepadatan").removeClass("active"),$("#modalContact").data("kepadatan",null),$("#notes").show()),E&&($(".kepadatan").removeClass("active"),$("#modalContact").data("kepadatan",null),$("#notes").show());let K=$(".kepadatan");console.log(K.length),K.length>0?$(".modalContact").prop("disabled",!0):$(".modalContact").prop("disabled",!1)}),$(document).on("click",".kepadatan",function(){$(".modalContact").prop("disabled",!1);let n=$(this).data("value");$(this).closest("#productModal").find(".kepadatan").removeClass("active"),$(this).addClass("active"),$("#notes").hide(),$("#modalContact").data("kepadatan",n)}),Q(e),F(),J(),q();function s(n){$.ajax({url:`/products/${n}/viewed`,method:"POST",headers:{"X-CSRF-TOKEN":$('meta[name="csrf-token"]').attr("content")},success:function(l){console.log("View recorded:",l)},error:function(l){console.error(l)}})}});
