let H=null;function E(e){H=e}function R(){return H}function _(){$("#loading").removeClass("d-none")}function W(){$("#loading").addClass("d-none")}function q(e){return e.slice().sort((o,t)=>(t.type==="motif")-(o.type==="motif")).map(o=>"/storage/"+o.path)}function J(){$(document).on("click",".modalDownload",function(e){e.preventDefault();const o=$(this).data("id"),t="catalog/pdf/product?id="+encodeURIComponent(o);D(this,t)}),$("#btn-download").on("click",function(e){e.preventDefault(),D(this,"catalog/pdf?category="+encodeURIComponent(R()))})}function D(e,o){const t=$(e);t.prop("disabled",!0).html('<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Mengunduh...'),window.open(o,"_blank"),setTimeout(()=>{t.prop("disabled",!1).html('<i class="fa fa-file-download"></i> Download')},5e3)}function Y(){$(document).on("click",".modalContact",function(e){e.preventDefault(),console.log("Klik tombol order",$(this).data("code"));const o="62816659688",t=$(this).data("jenis");console.log(t.toLowerCase());let a="";t.toLowerCase()=="wallpanel"?a=`Halo Admin,
Saya tertarik dengan produk berikut:

• Tipe Wallpanel: *${$(this).data("type")}*
• Kode Motif : *${$(this).data("code")}*
• Produk : *${$(this).data("jenis")}*
• Kategori: *${$(this).data("category")}*

Apakah produk ini masih tersedia? Terima kasih.`:t.toLowerCase()=="pvc board"?a=`Halo Admin,
Saya tertarik dengan produk berikut:

• Produk : *${$(this).data("jenis")}*
• Ketebalan : *${$(this).data("code")}*
• density: *${$(this).data("kepadatan")??"-"}*

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

Apakah produk ini masih tersedia? Terima kasih.`,window.open(`https://wa.me/${o}?text=${encodeURIComponent(a)}`,"_blank")})}function z(){$(window).scroll(function(){$(this).scrollTop()>100?$("#btn-scroll-top").fadeIn():$("#btn-scroll-top").fadeOut()}),$("#btn-scroll-top").click(function(){return $("html, body").animate({scrollTop:0},500),!1})}function X(e,o){$("#btn-download").removeClass("d-none");let t="";e.forEach(a=>{var h,p,y,k,g,m,s,C,f;const d=a.photo?`/storage/${a.photo}`:"https://via.placeholder.com/300x200?text=No+Image",c=q(a.images),u=[d,...c],i=JSON.stringify(u).replace(/"/g,"&quot;"),l=JSON.stringify(a.packages).replace(/"/g,"&quot;"),n=((h=a.category)==null?void 0:h.name)??"Tanpa Kategori";let r=a.code;o==3?r=a.code.split(" ").slice(4).join(" ").trim():o==5?r=a.code.split(" ").slice(1).join(" "):r=a.code,((p=a.category)==null?void 0:p.display_style)==="square"||o===null?t+=`
                    <div class="col-md-2 col-6 mb-4">
                        <div class="h-100 product-card"
                    `:((y=a.category)==null?void 0:y.display_style)==="rectangle"?t+=`
                    <div class="col-md-4 col-6 mb-4">
                        <div class="h-100 product-card"
                    `:t+=`
                    <div class="col-md-2 col-6 mb-4">
                        <div class="h-100 product-card d-flex flex-column justify-content-center align-items-center"
                    `,t+=`
                    data-id="${a.id}"
                    data-code="${r}"
                    data-category="${n}"
                    data-jenis="${((g=(k=a.category)==null?void 0:k.jenis)==null?void 0:g.name)??""}"
                    data-length="${a.panjang}"
                    data-height="${a.tinggi}"
                    data-width="${a.lebar}"
                    data-density="${a.ketebalan}"
                    data-images="${i}"
                    data-image="${d}"
                    data-type="${((s=(m=a.category)==null?void 0:m.types)==null?void 0:s.name)??""}"
                    data-url="${a.url_video}"
                    data-paket="${l}"
                    >
                       <img 
                            src="${d}" 
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
                                object-position: ${((f=(C=a.category)==null?void 0:C.jenis)==null?void 0:f.name)==="PVC Board"?"bottom center":"center center"};
                            "
                        >
                        <div class="card-body d-flex flex-column text-center">
                            <h4 class="card-title font-weight-bold text-uppercase mb-2">
                                ${r}
                            </h4>
                            <h6 class="card-text text-muted mb-1">${n}</h6>
                        </div>
                    </div>
                </div>`}),$("#product-list .row").append(t)}function Q(e,o){$("#btn-download").addClass("d-none");let t="";e.forEach(a=>{const d=a.thumbnail?`/storage/${a.thumbnail}`:"https://via.placeholder.com/300x200?text=No+Image";console.log(o);const c=o==3?"wallpanel":"tanpa kategori";t+=`
                    <div class="col-md-2 col-6 mb-4">
                        <div class="h-100 product-card d-flex flex-column justify-content-center align-items-center"
                    `,t+=`
                    data-id="${a.id}"
                    data-jenis="tipe-wallpanel"
                    data-category="${c}"
                    data-type="${a.id}"
                    >
                       <img 
                            src="${d}" 
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
                            <h6 class="card-text text-muted mb-1">${c}</h6>
                        </div>
                    </div>
                </div>`}),$("#product-list .row").append(t)}function Z(e,o,t){if(o==null)return;e.forEach(l=>{l.path&&t.add(l.path)});const a=Array.from(t),d=$("#mockup-carousel-inner"),c=$("#mockup-carousel-indicators"),u=["https://www.youtube.com/embed/BiiUrYAbL9s?autoplay=1&mute=1&rel=0&controls=0&amp;loop=1&playlist=BiiUrYAbL9s"],i=["/dist/img/wpc/1.webp","/dist/img/wpc/2.webp","/dist/img/wpc/3.jpg","/dist/img/wpc/4.webp"];if(d.empty(),c.empty(),o==4){$("#mockup-carousel").carousel({interval:!1}),$("#mockup .carousel-control-next").addClass("d-none"),$("#mockup .carousel-control-prev").addClass("d-none"),u.forEach((l,n)=>{d.append(`
            <div class="carousel-item ${n===0?"active":""}">
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
        `)}),$("#mockup").removeClass("d-none");return}else if(o==3){$("#mockup-carousel").carousel({interval:3e3}),$("#mockup .carousel-control-next").removeClass("d-none"),$("#mockup .carousel-control-prev").removeClass("d-none"),i.forEach((l,n)=>{d.append(`
            <div class="carousel-item ${n===0?"active":""}">
                <div class="d-flex justify-content-center align-items-center">
                    <img src="${l}" 
                        alt="mockup" 
                        class="img-fluid w-100 rounded-3 d-block mx-auto mockup-image"
                    >
                </div>
            </div>
        `),c.append(`
            <li data-bs-target="#mockup-carousel" data-bs-slide-to="${n}" ${n===0?'class="active"':""}></li>
        `)}),$("#mockup").removeClass("d-none");return}a.length>0?(a.length===1?($("#mockup .carousel-control-next").addClass("d-none"),$("#mockup .carousel-control-prev").addClass("d-none")):($("#mockup .carousel-control-next").removeClass("d-none"),$("#mockup .carousel-control-prev").removeClass("d-none")),a.slice(0,5).forEach((l,n)=>{d.append(`
                <div class="carousel-item ${n===0?"active":""}">
                    <img src="/storage/${l}" id="mockup-image" alt="mockup" 
                        class="img-fluid w-100 rounded-lg d-block mx-auto"
                    >
                </div>
            `),c.append(`
                <li data-target="#mockup-carousel" data-slide-to="${n}" ${n===0?'class="active"':""}></li>
            `)}),$("#mockup").removeClass("d-none")):$("#mockup").addClass("d-none")}let x=null,w=null,A=null,v=1,T=!1,P=!1;const F=new Set;let G=!0,N=null;function M(e){G=e}function K(e){x=e.selectedJenis,w=e.category??null,A=e.type??null}function j(){return new Promise((e,o)=>{if($(window).width()<768&&$("#filter-container").addClass("d-none"),T||P)return e();N&&N.abort(),T=!0,_();const t=$("#search-input").val();$.ajax({url:"/catalog",type:"GET",data:{page:v,search:t,jenis:x,category:w,type:A},success:function(a){const d=a.data.data??[],c=a.types??[];A&&($("#backButton").removeClass("d-none"),$("#homeButton").addClass("d-none")),x==3&&G?(c.length>0&&($("#search-form").addClass("d-none"),Q(c,x),v++,v>a.data.last_page&&(P=!0)),V(a,!0)):(d.length>0?(X(d,x),v++,v>a.data.last_page&&(P=!0)):(v===1&&($("#mockup").addClass("d-none"),$("#product-list .row").append(`<div class="col-12"><img src="dist/img/no-data.png" alt="no-data"
                                class="img-fluid mx-auto d-block" style="max-width: 100%; height: auto; margin-top: 100px; margin-bottom: 100px;"></div>`)),P=!0),V(a,!1)),N=null,e()},error:function(){console.log("Gagal memuat data."),N=null,o()},complete:function(){T=!1,W()}})})}function V(e,o=!0){var i,l,n;const t=e.category,a=(i=e.jenis)==null?void 0:i.name,c=((n=(l=e.data.data[0])==null?void 0:l.category)==null?void 0:n.images)??[];switch(t.length===0?$("#category-container").addClass("d-none"):($("#category-container").removeClass("d-none"),c.length===0&&$("#mockup").addClass("d-none"),Z(c,x,F)),a){case"PVC Board":$("#category-container").addClass("d-none"),$(".category-modal-container").text("Tidak ada kategori");break;case"Wallboard":$("#category-menu-item-label, #category-modal-item-label").html("Motif");break;case"UV Board":$("#category-menu-item-label, #category-modal-item-label").html("Motif");break;case"Wallpanel":$("#category-menu-item-label, #category-modal-item-label").html("Motif");break;case"Aksesoris":$("#category-menu-item-label, #category-modal-item-label").html("Ukuran");break;default:$("#category-menu-item-label, #category-modal-item-label").html("Kategori")}let u='<li class="nav-item font-poppins">';Array.isArray(t)&&t.length>0?t.forEach(r=>{u+=`
            <a class="nav-link text-white category-filter d-flex align-items-center justify-content-start" 
                href="#" data-jenis-id="${r.jenis_id}" data-id="${r.id}" data-type="${r.type_id}">
                <img src="${r.path?"storage/"+r.path:"dist/img/product/1.webp"}" alt="${r.name}" 
                class="mr-2 img-thumbnail" style="width: 50px; height: 50px; object-fit: contain;">
                <span class="text-capitalize">${r.name}</span>
            </a>`}):u+='<a class="nav-link text-white category-filter" href="#">Tanpa Kategori</a>',u+="</li>",o?($("#category-menu-item-label, #category-modal-item-label").html(""),$("#category-menu-item,#category-menu-item-modal").html("tidak ada kategori")):$("#category-menu-item, #category-menu-item-modal").html(u),!w&&t.length>0?(console.log("auto choose category"),w=t[0].id,E(w),L(),j()):w&&$(`.category-filter[data-id="${w}"]`).addClass("active")}function L(){v=1,T=!1,P=!1,F.clear(),$("#product-list .row").html("")}function aa(){return T}let S=!1;function ea(e){$(document).off("click",".category-filter"),$(document).on("click",".category-filter",async function(o){if(o.preventDefault(),S)return;S=!0;const t=$(this).data("id"),a=$(this).data("type");console.log(a);try{K({selectedJenis:e,category:t,type:a}),E(t),$("#filterModal").modal("hide"),L(),await j(!1)}catch(d){console.error("Gagal memuat data:",d)}finally{S=!1}})}$(document).ready(function(){let e=new URLSearchParams(window.location.search).get("jenis"),o=new URLSearchParams(window.location.search).get("category"),t,a;(e==5||e==2)&&sessionStorage.removeItem("selectedWallpanel"),K({selectedJenis:e,category:o}),j(),e&&($("#category-container").removeClass("d-md-none"),$("#catalog-col").removeClass("center-content")),$(window).width()<768&&$("#filter-container").addClass("d-none"),(e==1||e==3)&&($("#filter-container").addClass("d-none"),$("#catalog-col").removeClass("col-md-10"),$("#catalog-col").addClass("col-md-12")),$("#search-input").on("input",function(){clearTimeout(t),t=setTimeout(()=>{L(),j()},500)});let d=!1;$(window).on("scroll",function(){clearTimeout(a),a=setTimeout(async()=>{if(d||aa())return;const i=$(window).scrollTop(),l=$(window).height(),n=$(document).height();if(i+l>=n-150){d=!0;try{M(!1),await j()}finally{d=!1}}},200)});function c(i,l=null,n=null){$("#carousel-product-image").empty(),$("#thumbnailGallery").empty();let r=[...i];n.toLowerCase()=="uv board"?r=[...i,...l]:r=[...i],r.forEach((p,y)=>{const k=y===0?"active":"";$("#carousel-product-image").append(`
                    <div class="carousel-item ${k}">
                        <img src="${p}" class="img-fluid d-block mx-auto"
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
                           <img src="${p}" 
                            class="img-thumbnail thumbnail-image p-0 w-100 h-100" 
                            style="
                                height: auto;
                                aspect-ratio: 1 / 1;
                                border: 1px solid #ccc;
                                border-radius: 8px;
                                object-fit: cover;
                                cursor: pointer;"
                            data-index="${y}">
                        </div>
                    </div>
                    `)}),i.length<=1?($("#carouselProduct .carousel-control-next").addClass("d-none"),$("#carouselProduct .carousel-control-prev").addClass("d-none")):($("#carouselProduct .carousel-control-next").removeClass("d-none"),$("#carouselProduct .carousel-control-prev").removeClass("d-none")),$("#carouselProduct").carousel({interval:3e3,pause:!1});let h;$("#thumbnailGallery").off("click").on("click",".thumbnail-image",function(){const p=$(this).data("index");$("#carouselProduct").carousel(p),$(".thumbnail-image").removeClass("active-thumbnail"),$(this).addClass("active-thumbnail"),setTimeout(()=>{$(this).removeClass("active-thumbnail")},500),$("#carouselProduct").carousel("pause"),clearTimeout(h),h=setTimeout(()=>{$("#carouselProduct").carousel("cycle")},5e3)})}$(document).on("click",".product-card",function(){const i=$(this).data("id"),l=$(this).data("code"),n=$(this).data("category"),r=$(this).attr("data-images"),h=$(this).data("type"),p=JSON.parse($(this).attr("data-paket")||"[]");let y=null,k=null;Array.isArray(p)&&(k=p.sort((b,I)=>b.order-I.order).map(b=>`/storage/${b.image}`)),r&&(y=JSON.parse(r.replace(/&quot;/g,'"')));const g=$(this).data("jenis"),m=parseInt($(this).data("length"),10);let s=$(this).data("height");const C=parseFloat($(this).data("width")).toFixed(1),f=parseFloat($(this).data("density")).toFixed(1),B=$(this).data("url");if($("#modalPaket").empty(),g==="tipe-wallpanel"){L(),K({selectedJenis:3,type:h}),M(!1),j(),$("#filter-container").toggleClass("d-none"),$("#catalog-col").toggleClass("col-md-10 col-md-12");return}g.toLowerCase()==="uv board"&&(u(i),s=parseInt(s,10),$("#modalVideo").hide(),$("#modalCategory").text(n),$("#modalLength").text(m&&!isNaN(m)?m+" cm":"-"),$("#modalHeight").text(s&&!isNaN(s)?s+" cm":"-"),$("#modalDensity").text(f&&!isNaN(f)?f+" mm":"-"),$("#modalKepadatan").html(`
                <span class="">0.9</span>
            `),p.length>0?p.sort((b,I)=>b.order-I.order).map(b=>{$("#modalPaket").append(`
                        <span class="badge badge-outline-primary px-2 py-1 kepadatan" data-value="${b.name}">${b.name}</span>
                    `)}):($("#modalPaket").append('<span class="text-muted">Tidak ada paket</span>'),$("#notes, .lebar").hide())),g.toLowerCase()==="wallboard"&&(u(i),s=parseInt(s,10),$("#modalCategory").text(n),$("#modalLength").text(m&&!isNaN(m)?m+" cm":"-"),$("#modalHeight").text(s&&!isNaN(s)?s+" cm":"-"),$("#ketebalan, #kepadatan, #notes, .paket,  #modalVideo, .lebar").hide()),g==="PVC Board"&&(u(i),s=parseInt(s,10),$("#modalCategory").text(g),$("#modalLength").text(m&&!isNaN(m)?m+" cm":"-"),$("#modalHeight").text(s&&!isNaN(s)?s+" cm":"-"),$("#modalDensity").text(f&&!isNaN(f)?f+" mm":"-"),$("#modalKepadatan").html(`
                <span class="badge badge-outline-primary kepadatan" data-value="0,4">0,4 (Lite)</span>
                <span class="badge badge-outline-primary kepadatan" data-value="0,55">0,55 (Standar)</span>
                <span class="badge badge-outline-primary kepadatan" data-value="0,7">0,7 (Heavy-duty)</span>
            `),$(".paket,  #modalVideo, .lebar").hide()),g==="Wallpanel"&&(u(i),s=parseFloat(s).toFixed(1),$("#modalContact").data("type",h),$("#modalCategory").text(n+" / "+h),$("#ketebalan, #kepadatan, .paket, #modalVideo").hide(),$("#modalLength").text(m&&!isNaN(m)?m+" cm":"-"),$("#modalHeight").text(s&&!isNaN(s)?s+" cm":"-"),$("#modalLebar").text(C&&!isNaN(C)?C+" cm":"-")),g.toLowerCase()==="aksesoris"&&(u(i),$("#tinggi, #ketebalan, #kepadatan, .lebar").hide(),$("#paket").text("Warna"),$("#modalCategory").text(n),$("#modalPaket").append(`
                <span class="badge badge-pill badge-outline-primary kepadatan" data-value="Black">Black</span>
                <span class="badge badge-pill badge-outline-primary kepadatan" data-value="Bronze">Bronze</span>
                <span class="badge badge-pill badge-outline-primary kepadatan" data-value="Rose Gold">Rose Gold</span>
                <span class="badge badge-pill badge-outline-primary kepadatan" data-value="Dark Gray">Dark Gray</span>

            `),$("#modalLength").text("3 m"),$("#modalVideoPlayer").empty(),$("#modalVideo").hide(),B&&($("#modalVideoPlayer").append(`
                    <iframe class="embed-responsive-item"
                    src="${B}"
                    title="YouTube video player" frameborder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; web-share;"
                    referrerpolicy="strict-origin-when-cross-origin"
                    allowfullscreen></iframe>
                `),$("#modalVideo").show())),c(y,k,g),$("#modalCode").text(l),$("#productModalLabel").text(l),$("#modalDownload").data("id",i),$("#productModal").modal("show"),$("#modalContact").data("jenis",g),$("#modalContact").data("category",n),$("#modalContact").data("code",l);let U=$("#modalContact").data("kepadatan"),O=$("#modalContact").data("paket");U&&($(".kepadatan").removeClass("active"),$("#modalContact").data("kepadatan",null),$("#notes").show()),O&&($(".kepadatan").removeClass("active"),$("#modalContact").data("kepadatan",null),$("#notes").show()),$(".kepadatan").length>0?$(".modalContact").prop("disabled",!0):$(".modalContact").prop("disabled",!1)}),$(document).on("click",".kepadatan",function(){$(".modalContact").prop("disabled",!1);let i=$(this).data("value");$(this).closest("#productModal").find(".kepadatan").removeClass("active"),$(this).addClass("active"),$("#notes").hide(),$("#modalContact").data("kepadatan",i)}),ea(e),J(),Y(),z();function u(i){$.ajax({url:`/products/${i}/viewed`,method:"POST",headers:{"X-CSRF-TOKEN":$('meta[name="csrf-token"]').attr("content")},success:function(l){console.log("View recorded:",l)},error:function(l){console.error(l)}})}});
