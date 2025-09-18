let M=null;function V(e){M=e}function U(){return M}function O(){$("#loading").removeClass("d-none")}function _(){$("#loading").addClass("d-none")}function R(e){return e.slice().sort((o,t)=>(t.type==="motif")-(o.type==="motif")).map(o=>"/storage/"+o.path)}function W(){$(document).on("click",".modalDownload",function(e){e.preventDefault();const o=$(this).data("id"),t="catalog/pdf/product?id="+encodeURIComponent(o);K(this,t)}),$("#btn-download").on("click",function(e){e.preventDefault(),K(this,"catalog/pdf?category="+encodeURIComponent(U()))})}function K(e,o){const t=$(e);t.prop("disabled",!0).html('<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Mengunduh...'),window.open(o,"_blank"),setTimeout(()=>{t.prop("disabled",!1).html('<i class="fa fa-file-download"></i> Download')},5e3)}function J(){$(document).on("click",".modalContact",function(e){e.preventDefault(),console.log("Klik tombol order",$(this).data("code"));const o="62816659688",t=$(this).data("jenis");console.log(t.toLowerCase());let a="";t.toLowerCase()=="wallpanel"?a=`Halo Admin,
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

Apakah produk ini masih tersedia? Terima kasih.`,window.open(`https://wa.me/${o}?text=${encodeURIComponent(a)}`,"_blank")})}function q(){$(window).scroll(function(){$(this).scrollTop()>100?$("#btn-scroll-top").fadeIn():$("#btn-scroll-top").fadeOut()}),$("#btn-scroll-top").click(function(){return $("html, body").animate({scrollTop:0},500),!1})}function Y(e,o){$("#btn-download").removeClass("d-none");let t="";e.forEach(a=>{var p,f,b,g,u,i,w,h,j;const m=a.photo?`/storage/${a.photo}`:"https://via.placeholder.com/300x200?text=No+Image",d=R(a.images),l=[m,...d],c=JSON.stringify(l).replace(/"/g,"&quot;"),n=JSON.stringify(a.packages).replace(/"/g,"&quot;"),s=((p=a.category)==null?void 0:p.name)??"Tanpa Kategori";let r=a.code;o==3?r=a.code.split(" ").slice(4).join(" ").trim():o==5?r=a.code.split(" ").slice(1).join(" "):r=a.code,((f=a.category)==null?void 0:f.display_style)==="square"||o===null?t+=`
                    <div class="col-md-2 col-6 mb-4">
                        <div class="h-100 product-card"
                    `:((b=a.category)==null?void 0:b.display_style)==="rectangle"?t+=`
                    <div class="col-md-4 col-6 mb-4">
                        <div class="h-100 product-card"
                    `:t+=`
                    <div class="col-md-2 col-6 mb-4">
                        <div class="h-100 product-card d-flex flex-column justify-content-center align-items-center"
                    `,t+=`
                    data-id="${a.id}"
                    data-code="${r}"
                    data-category="${s}"
                    data-jenis="${((u=(g=a.category)==null?void 0:g.jenis)==null?void 0:u.name)??""}"
                    data-length="${a.panjang}"
                    data-height="${a.tinggi}"
                    data-width="${a.lebar}"
                    data-density="${a.ketebalan}"
                    data-images="${c}"
                    data-image="${m}"
                    data-type="${((w=(i=a.category)==null?void 0:i.types)==null?void 0:w.name)??""}"
                    data-url="${a.url_video}"
                    data-paket="${n}"
                    >
                       <img 
                            src="${m}" 
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
                                object-position: ${((j=(h=a.category)==null?void 0:h.jenis)==null?void 0:j.name)==="PVC Board"?"bottom center":"center center"};
                            "
                        >
                        <div class="card-body d-flex flex-column text-center">
                            <h4 class="card-title font-weight-bold text-uppercase mb-2">
                                ${r}
                            </h4>
                            <h6 class="card-text text-muted mb-1">${s}</h6>
                        </div>
                    </div>
                </div>`}),$("#product-list .row").append(t)}function z(e,o){$("#btn-download").addClass("d-none");let t="";e.forEach(a=>{const m=a.thumbnail?`/storage/${a.thumbnail}`:"https://via.placeholder.com/300x200?text=No+Image";console.log(o);const d=o==3?"wallpanel":"tanpa kategori";t+=`
                    <div class="col-md-2 col-6 mb-4">
                        <div class="h-100 product-card d-flex flex-column justify-content-center align-items-center"
                    `,t+=`
                    data-id="${a.id}"
                    data-jenis="tipe-wallpanel"
                    data-category="${d}"
                    data-type="${a.id}"
                    >
                       <img 
                            src="${m}" 
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
                            <h6 class="card-text text-muted mb-1">${d}</h6>
                        </div>
                    </div>
                </div>`}),$("#product-list .row").append(t)}function X(e,o,t){if(o==null)return;e.forEach(n=>{n.path&&t.add(n.path)});const a=Array.from(t),m=$("#mockup-carousel-inner"),d=$("#mockup-carousel-indicators"),l=["https://www.youtube.com/embed/BiiUrYAbL9s?autoplay=1&mute=1&rel=0&controls=0&amp;loop=1&playlist=BiiUrYAbL9s"],c=["/dist/img/wpc/1.webp","/dist/img/wpc/2.webp","/dist/img/wpc/3.jpg","/dist/img/wpc/4.webp"];if(m.empty(),d.empty(),o==4){$("#mockup-carousel").carousel({interval:!1}),$("#mockup .carousel-control-next").addClass("d-none"),$("#mockup .carousel-control-prev").addClass("d-none"),l.forEach((n,s)=>{m.append(`
            <div class="carousel-item ${s===0?"active":""}">
                <div class="d-flex justify-content-center align-items-center">
                    <div class="embed-responsive embed-responsive-16by9 rounded-lg" style="width:100%;">
                        <iframe
                            class="embed-responsive-item"
                            src="${n}"
                            title="YouTube video player"
                            frameborder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; web-share"
                            allowfullscreen
                        ></iframe>
                    </div>
                </div>
            </div>
        `)}),$("#mockup").removeClass("d-none");return}else if(o==3){$("#mockup-carousel").carousel({interval:3e3}),$("#mockup .carousel-control-next").removeClass("d-none"),$("#mockup .carousel-control-prev").removeClass("d-none"),c.forEach((n,s)=>{m.append(`
            <div class="carousel-item ${s===0?"active":""}">
                <div class="d-flex justify-content-center align-items-center">
                    <img src="${n}" 
                        alt="mockup" 
                        class="img-fluid w-100 rounded-3 d-block mx-auto mockup-image"
                    >
                </div>
            </div>
        `),d.append(`
            <li data-bs-target="#mockup-carousel" data-bs-slide-to="${s}" ${s===0?'class="active"':""}></li>
        `)}),$("#mockup").removeClass("d-none");return}a.length>0?(a.length===1?($("#mockup .carousel-control-next").addClass("d-none"),$("#mockup .carousel-control-prev").addClass("d-none")):($("#mockup .carousel-control-next").removeClass("d-none"),$("#mockup .carousel-control-prev").removeClass("d-none")),a.slice(0,5).forEach((n,s)=>{m.append(`
                <div class="carousel-item ${s===0?"active":""}">
                    <img src="/storage/${n}" id="mockup-image" alt="mockup" 
                        class="img-fluid w-100 rounded-lg d-block mx-auto"
                    >
                </div>
            `),d.append(`
                <li data-target="#mockup-carousel" data-slide-to="${s}" ${s===0?'class="active"':""}></li>
            `)}),$("#mockup").removeClass("d-none")):$("#mockup").addClass("d-none")}let C=null,v=null,S=null,k=1,T=!1,P=!1;const H=new Set;let E=!0;function B(e){E=e}function A(e){C=e.selectedJenis,v=e.category??null,S=e.type??null}function x(){return new Promise((e,o)=>{if($(window).width()<768&&$("#filter-container").addClass("d-none"),T||P)return e();T=!0,O();const t=$("#search-input").val();$.ajax({url:"/catalog",type:"GET",data:{page:k,search:t,jenis:C,category:v,type:S},success:function(a){const m=a.data.data??[],d=a.types??[];S&&($("#backButton").removeClass("d-none"),$("#homeButton").addClass("d-none")),C==3&&E?(d.length>0&&($("#search-form").addClass("d-none"),z(d,C),k++,k>a.data.last_page&&(P=!0)),D(a,!0)):(m.length>0?(Y(m,C),k++,k>a.data.last_page&&(P=!0)):(k===1&&($("#mockup").addClass("d-none"),$("#product-list .row").append(`<div class="col-12"><img src="dist/img/no-data.png" alt="no-data"
                                class="img-fluid mx-auto d-block" style="max-width: 100%; height: auto; margin-top: 100px; margin-bottom: 100px;"></div>`)),P=!0),D(a,!1)),e()},error:function(){console.log("Gagal memuat data."),o()},complete:function(){T=!1,_()}})})}function D(e,o=!0){var c,n,s;const t=e.category,a=(c=e.jenis)==null?void 0:c.name,d=((s=(n=e.data.data[0])==null?void 0:n.category)==null?void 0:s.images)??[];switch(t.length===0?$("#category-container").addClass("d-none"):($("#category-container").removeClass("d-none"),d.length===0&&$("#mockup").addClass("d-none"),X(d,C,H)),a){case"PVC Board":$("#category-container").addClass("d-none"),$(".category-modal-container").text("Tidak ada kategori");break;case"Wallboard":$("#category-menu-item-label, #category-modal-item-label").html("Motif");break;case"UV Board":$("#category-menu-item-label, #category-modal-item-label").html("Motif");break;case"Wallpanel":$("#category-menu-item-label, #category-modal-item-label").html("Motif");break;case"Aksesoris":$("#category-menu-item-label, #category-modal-item-label").html("Ukuran");break;default:$("#category-menu-item-label, #category-modal-item-label").html("Kategori")}let l='<li class="nav-item font-poppins">';Array.isArray(t)&&t.length>0?t.forEach(r=>{l+=`
            <a class="nav-link text-white category-filter d-flex align-items-center justify-content-start" 
                href="#" data-jenis-id="${r.jenis_id}" data-id="${r.id}" data-type="${r.type_id}">
                <img src="${r.path?"storage/"+r.path:"dist/img/product/1.webp"}" alt="${r.name}" 
                class="mr-2 img-thumbnail" style="width: 50px; height: 50px; object-fit: contain;">
                <span class="text-capitalize">${r.name}</span>
            </a>`}):l+='<a class="nav-link text-white category-filter" href="#">Tanpa Kategori</a>',l+="</li>",o?($("#category-menu-item-label, #category-modal-item-label").html(""),$("#category-menu-item,#category-menu-item-modal").html("tidak ada kategori")):$("#category-menu-item, #category-menu-item-modal").html(l),!v&&t.length>0?(console.log("auto choose category"),v=t[0].id,V(v),N(),x()):v&&$(`.category-filter[data-id="${v}"]`).addClass("active")}function N(){k=1,T=!1,P=!1,H.clear(),$("#product-list .row").html("")}function Q(){return T}let I=!1;function Z(e){$(document).off("click",".category-filter"),$(document).on("click",".category-filter",async function(o){if(o.preventDefault(),I)return;I=!0;const t=$(this).data("id"),a=$(this).data("type");console.log(a);try{A({selectedJenis:e,category:t,type:a}),V(t),$("#filterModal").modal("hide"),N(),await x(!1)}catch(m){console.error("Gagal memuat data:",m)}finally{I=!1}})}$(document).ready(function(){let e=new URLSearchParams(window.location.search).get("jenis"),o=new URLSearchParams(window.location.search).get("category"),t,a;(e==5||e==2)&&sessionStorage.removeItem("selectedWallpanel"),A({selectedJenis:e,category:o}),x(),e&&($("#category-container").removeClass("d-md-none"),$("#catalog-col").removeClass("center-content")),$(window).width()<768&&$("#filter-container").addClass("d-none"),(e==1||e==3)&&($("#filter-container").addClass("d-none"),$("#catalog-col").removeClass("col-md-10"),$("#catalog-col").addClass("col-md-12")),$("#search-input").on("input",function(){clearTimeout(t),t=setTimeout(()=>{N(),x()},500)}),$(window).on("scroll",function(){clearTimeout(a),a=setTimeout(()=>{const l=$(window).scrollTop(),c=$(window).height(),n=$(document).height();if(l+c>=n-150){if(Q()===!0)return;B(!1),x()}},200)});function m(l,c=null,n=null){$("#carousel-product-image").empty(),$("#thumbnailGallery").empty();let s=[...l];n.toLowerCase()=="uv board"?s=[...l,...c]:s=[...l],s.forEach((p,f)=>{const b=f===0?"active":"";$("#carousel-product-image").append(`
                    <div class="carousel-item ${b}">
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
                            data-index="${f}">
                        </div>
                    </div>
                    `)}),l.length<=1?($("#carouselProduct .carousel-control-next").addClass("d-none"),$("#carouselProduct .carousel-control-prev").addClass("d-none")):($("#carouselProduct .carousel-control-next").removeClass("d-none"),$("#carouselProduct .carousel-control-prev").removeClass("d-none")),$("#carouselProduct").carousel({interval:3e3,pause:!1});let r;$("#thumbnailGallery").off("click").on("click",".thumbnail-image",function(){const p=$(this).data("index");$("#carouselProduct").carousel(p),$(".thumbnail-image").removeClass("active-thumbnail"),$(this).addClass("active-thumbnail"),setTimeout(()=>{$(this).removeClass("active-thumbnail")},500),$("#carouselProduct").carousel("pause"),clearTimeout(r),r=setTimeout(()=>{$("#carouselProduct").carousel("cycle")},5e3)})}$(document).on("click",".product-card",function(){const l=$(this).data("id"),c=$(this).data("code"),n=$(this).data("category"),s=$(this).attr("data-images"),r=$(this).data("type"),p=JSON.parse($(this).attr("data-paket")||"[]");let f=null,b=null;Array.isArray(p)&&(b=p.sort((y,L)=>y.order-L.order).map(y=>`/storage/${y.image}`)),s&&(f=JSON.parse(s.replace(/&quot;/g,'"')));const g=$(this).data("jenis"),u=parseInt($(this).data("length"),10);let i=$(this).data("height");const w=parseFloat($(this).data("width")).toFixed(1),h=parseFloat($(this).data("density")).toFixed(1),j=$(this).data("url");if($("#modalPaket").empty(),g==="tipe-wallpanel"){N(),A({selectedJenis:3,type:r}),B(!1),x(),$("#filter-container").toggleClass("d-none"),$("#catalog-col").toggleClass("col-md-10 col-md-12");return}g.toLowerCase()==="uv board"&&(d(l),i=parseInt(i,10),$("#modalVideo").hide(),$("#modalCategory").text(n),$("#modalLength").text(u&&!isNaN(u)?u+" cm":"-"),$("#modalHeight").text(i&&!isNaN(i)?i+" cm":"-"),$("#modalDensity").text(h&&!isNaN(h)?h+" mm":"-"),$("#modalKepadatan").html(`
                <span class="">0.9</span>
            `),p.length>0?p.sort((y,L)=>y.order-L.order).map(y=>{$("#modalPaket").append(`
                        <span class="badge badge-outline-primary px-2 py-1 kepadatan" data-value="${y.name}">${y.name}</span>
                    `)}):($("#modalPaket").append('<span class="text-muted">Tidak ada paket</span>'),$("#notes, .lebar").hide())),g.toLowerCase()==="wallboard"&&(d(l),i=parseInt(i,10),$("#modalCategory").text(n),$("#modalLength").text(u&&!isNaN(u)?u+" cm":"-"),$("#modalHeight").text(i&&!isNaN(i)?i+" cm":"-"),$("#ketebalan, #kepadatan, #notes, .paket,  #modalVideo, .lebar").hide()),g==="PVC Board"&&(d(l),i=parseInt(i,10),$("#modalCategory").text(g),$("#modalLength").text(u&&!isNaN(u)?u+" cm":"-"),$("#modalHeight").text(i&&!isNaN(i)?i+" cm":"-"),$("#modalDensity").text(h&&!isNaN(h)?h+" mm":"-"),$("#modalKepadatan").html(`
                <span class="badge badge-outline-primary kepadatan" data-value="0,4">0,4 (Lite)</span>
                <span class="badge badge-outline-primary kepadatan" data-value="0,55">0,55 (Standar)</span>
                <span class="badge badge-outline-primary kepadatan" data-value="0,7">0,7 (Heavy-duty)</span>
            `),$(".paket,  #modalVideo, .lebar").hide()),g==="Wallpanel"&&(d(l),i=parseFloat(i).toFixed(1),$("#modalContact").data("type",r),$("#modalCategory").text(n+" / "+r),$("#ketebalan, #kepadatan, .paket, #modalVideo").hide(),$("#modalLength").text(u&&!isNaN(u)?u+" cm":"-"),$("#modalHeight").text(i&&!isNaN(i)?i+" cm":"-"),$("#modalLebar").text(w&&!isNaN(w)?w+" cm":"-")),g.toLowerCase()==="aksesoris"&&(d(l),$("#tinggi, #ketebalan, #kepadatan, .lebar").hide(),$("#paket").text("Warna"),$("#modalCategory").text(n),$("#modalPaket").append(`
                <span class="badge badge-pill badge-outline-primary kepadatan" data-value="Black">Black</span>
                <span class="badge badge-pill badge-outline-primary kepadatan" data-value="Bronze">Bronze</span>
                <span class="badge badge-pill badge-outline-primary kepadatan" data-value="Rose Gold">Rose Gold</span>
                <span class="badge badge-pill badge-outline-primary kepadatan" data-value="Dark Gray">Dark Gray</span>

            `),$("#modalLength").text("3 m"),$("#modalVideoPlayer").empty(),$("#modalVideo").hide(),j&&($("#modalVideoPlayer").append(`
                    <iframe class="embed-responsive-item"
                    src="${j}"
                    title="YouTube video player" frameborder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; web-share;"
                    referrerpolicy="strict-origin-when-cross-origin"
                    allowfullscreen></iframe>
                `),$("#modalVideo").show())),m(f,b,g),$("#modalCode").text(c),$("#productModalLabel").text(c),$("#modalDownload").data("id",l),$("#productModal").modal("show"),$("#modalContact").data("jenis",g),$("#modalContact").data("category",n),$("#modalContact").data("code",c);let F=$("#modalContact").data("kepadatan"),G=$("#modalContact").data("paket");F&&($(".kepadatan").removeClass("active"),$("#modalContact").data("kepadatan",null),$("#notes").show()),G&&($(".kepadatan").removeClass("active"),$("#modalContact").data("kepadatan",null),$("#notes").show()),$(".kepadatan").length>0?$(".modalContact").prop("disabled",!0):$(".modalContact").prop("disabled",!1)}),$(document).on("click",".kepadatan",function(){$(".modalContact").prop("disabled",!1);let l=$(this).data("value");$(this).closest("#productModal").find(".kepadatan").removeClass("active"),$(this).addClass("active"),$("#notes").hide(),$("#modalContact").data("kepadatan",l)}),Z(e),W(),J(),q();function d(l){$.ajax({url:`/products/${l}/viewed`,method:"POST",headers:{"X-CSRF-TOKEN":$('meta[name="csrf-token"]').attr("content")},success:function(c){console.log("View recorded:",c)},error:function(c){console.error(c)}})}});
