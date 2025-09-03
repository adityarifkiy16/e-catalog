let V=null;function H(e){V=e}function E(){return V}function O(){$("#loading").removeClass("d-none")}function G(){$("#loading").addClass("d-none")}function J(e){return e.slice().sort((o,t)=>o.pivot.motif&&!t.pivot.motif?-1:!o.pivot.motif&&t.pivot.motif?1:0).map(o=>"/storage/"+o.path)}function U(){$(document).on("click",".modalDownload",function(e){e.preventDefault();const o=$(this).data("id"),t="catalog/pdf/product?id="+encodeURIComponent(o);S(this,t)}),$("#btn-download").on("click",function(e){e.preventDefault(),S(this,"catalog/pdf?category="+encodeURIComponent(E()))})}function S(e,o){const t=$(e);t.prop("disabled",!0).html('<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Mengunduh...'),window.open(o,"_blank"),setTimeout(()=>{t.prop("disabled",!1).html('<i class="fa fa-file-download"></i> Download')},5e3)}function R(){$(document).on("click",".modalContact",function(e){e.preventDefault(),console.log("Klik tombol order",$(this).data("code"));const o="62816659688",t=$(this).data("jenis");console.log(t.toLowerCase());let a="";t.toLowerCase()=="wallpanel"?a=`Halo Admin,
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

Apakah produk ini masih tersedia? Terima kasih.`:a=`Halo Admin,
Saya tertarik dengan produk berikut:

• Kode Motif : *${$(this).data("code")}*
• Produk : *${$(this).data("jenis")}*
• Kategori: *${$(this).data("category")}*

Apakah produk ini masih tersedia? Terima kasih.`,window.open(`https://wa.me/${o}?text=${encodeURIComponent(a)}`,"_blank")})}function W(){$(window).scroll(function(){$(this).scrollTop()>100?$("#btn-scroll-top").fadeIn():$("#btn-scroll-top").fadeOut()}),$("#btn-scroll-top").click(function(){return $("html, body").animate({scrollTop:0},500),!1})}function q(e,o){$("#btn-download").removeClass("d-none");let t="";e.forEach(a=>{var g,c,u,p,y,C,v,x,j;const r=a.photo?`/storage/${a.photo}`:"https://via.placeholder.com/300x200?text=No+Image",l=J(a.images),i=[r,...l],s=JSON.stringify(i).replace(/"/g,"&quot;"),d=JSON.stringify(a.packages).replace(/"/g,"&quot;"),m=((g=a.category)==null?void 0:g.name)??"Tanpa Kategori";let n=a.code;o==3?n=a.code.split(" ").slice(4).join(" ").trim():o==5?n=a.code.split(" ").slice(1).join(" "):n=a.code,((c=a.category)==null?void 0:c.display_style)==="square"||o===null?t+=`
                    <div class="col-md-2 col-6 mb-4">
                        <div class="h-100 product-card"
                    `:((u=a.category)==null?void 0:u.display_style)==="rectangle"?t+=`
                    <div class="col-md-4 col-6 mb-4">
                        <div class="h-100 product-card"
                    `:t+=`
                    <div class="col-md-2 col-6 mb-4">
                        <div class="h-100 product-card d-flex flex-column justify-content-center align-items-center"
                    `,t+=`
                    data-id="${a.id}"
                    data-code="${n}"
                    data-category="${m}"
                    data-jenis="${((y=(p=a.category)==null?void 0:p.jenis)==null?void 0:y.name)??""}"
                    data-length="${a.panjang}"
                    data-height="${a.tinggi}"
                    data-density="${a.ketebalan}"
                    data-images="${s}"
                    data-image="${r}"
                    data-type="${((v=(C=a.category)==null?void 0:C.types)==null?void 0:v.name)??""}"
                    data-url="${a.url_video}"
                    data-paket="${d}"
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
                                object-position: ${((j=(x=a.category)==null?void 0:x.jenis)==null?void 0:j.name)==="PVC Board"?"bottom center":"center center"};
                            "
                        >
                        <div class="card-body d-flex flex-column text-center">
                            <h4 class="card-title font-weight-bold text-uppercase mb-2">
                                ${n}
                            </h4>
                            <h6 class="card-text text-muted mb-1">${m}</h6>
                        </div>
                    </div>
                </div>`}),$("#product-list .row").append(t)}function F(e,o){$("#btn-download").addClass("d-none");let t="";e.forEach(a=>{const r=a.thumbnail?`/storage/${a.thumbnail}`:"https://via.placeholder.com/300x200?text=No+Image";console.log(o);const l=o==3?"wallpanel":"tanpa kategori";t+=`
                    <div class="col-md-2 col-6 mb-4">
                        <div class="h-100 product-card d-flex flex-column justify-content-center align-items-center"
                    `,t+=`
                    data-id="${a.id}"
                    data-jenis="tipe-wallpanel"
                    data-category="${l}"
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
                            <h6 class="card-text text-muted mb-1">${l}</h6>
                        </div>
                    </div>
                </div>`}),$("#product-list .row").append(t)}function Y(e,o,t){if(o==null)return;e.forEach(s=>{s.path&&t.add(s.path)});const a=Array.from(t),r=$("#mockup-carousel-inner"),l=$("#mockup-carousel-indicators"),i=["https://www.youtube.com/embed/x55DLsMH-lA?autoplay=1&mute=1&rel=0&controls=0&amp;loop=1&playlist=x55DLsMH-lA"];if(r.empty(),l.empty(),o==4){$("#mockup-carousel").carousel({interval:!1}),$("#mockup .carousel-control-next").addClass("d-none"),$("#mockup .carousel-control-prev").addClass("d-none"),i.forEach((s,d)=>{r.append(`
            <div class="carousel-item ${d===0?"active":""}">
                <div class="d-flex justify-content-center align-items-center">
                    <div class="embed-responsive embed-responsive-16by9 rounded-lg" style="width:100%;">
                        <iframe
                            class="embed-responsive-item"
                            src="${s}"
                            title="YouTube video player"
                            frameborder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; web-share"
                            allowfullscreen
                        ></iframe>
                    </div>
                </div>
            </div>
        `)}),$("#mockup").removeClass("d-none");return}a.length>0?(a.length===1?($("#mockup .carousel-control-next").addClass("d-none"),$("#mockup .carousel-control-prev").addClass("d-none")):($("#mockup .carousel-control-next").removeClass("d-none"),$("#mockup .carousel-control-prev").removeClass("d-none")),a.slice(0,5).forEach((s,d)=>{r.append(`
                <div class="carousel-item ${d===0?"active":""}">
                    <img src="/storage/${s}" id="mockup-image" alt="mockup" 
                        class="img-fluid w-100 rounded-lg d-block mx-auto"
                    >
                </div>
            `),l.append(`
                <li data-target="#mockup-carousel" data-slide-to="${d}" ${d===0?'class="active"':""}></li>
            `)}),$("#mockup").removeClass("d-none")):$("#mockup").addClass("d-none")}let b=null,f=null,I=null,h=1,P=!1,w=!1;const B=new Set;let _=!0;function K(e){_=e}function A(e){b=e.selectedJenis,f=e.category??null,I=e.type??null}function k(){return new Promise((e,o)=>{if($(window).width()<768&&$("#filter-container").addClass("d-none"),P||w)return e();P=!0,O();const t=$("#search-input").val();$.ajax({url:"/catalog",type:"GET",data:{page:h,search:t,jenis:b,category:f,type:I},success:function(a){const r=a.data.data??[],l=a.types??[];I&&($("#backButton").removeClass("d-none"),$("#homeButton").addClass("d-none")),b==3&&_?(l.length>0&&(F(l,b),h++,h>a.data.last_page&&(w=!0)),D(a,!0)):(r.length>0?(q(r,b),h++,h>a.data.last_page&&(w=!0)):(h===1&&($("#mockup").addClass("d-none"),$("#product-list .row").append(`<div class="col-12"><img src="dist/img/no-data.png" alt="no-data"
                                class="img-fluid mx-auto d-block" style="max-width: 100%; height: auto; margin-top: 100px; margin-bottom: 100px;"></div>`)),w=!0),D(a,!1)),e()},error:function(){console.log("Gagal memuat data."),o()},complete:function(){P=!1,G()}})})}function D(e,o=!0){var s,d,m;const t=e.category,a=(s=e.jenis)==null?void 0:s.name,l=((m=(d=e.data.data[0])==null?void 0:d.category)==null?void 0:m.images)??[];switch(t.length===0?$("#category-container").addClass("d-none"):($("#category-container").removeClass("d-none"),l.length===0&&$("#mockup").addClass("d-none"),Y(l,b,B)),a){case"PVC Board":$("#category-container").addClass("d-none"),$(".category-modal-container").text("Tidak ada kategori");break;case"Wallboard":$("#category-menu-item-label, #category-modal-item-label").html("Motif");break;case"UV Board":$("#category-menu-item-label, #category-modal-item-label").html("Motif");break;case"Wallpanel":$("#category-menu-item-label, #category-modal-item-label").html("Motif");break;case"Aksesoris":$("#category-container").addClass("d-none"),$(".category-modal-container").text("Tidak ada kategori");break;default:$("#category-menu-item-label, #category-modal-item-label").html("Kategori")}let i='<li class="nav-item font-poppins">';Array.isArray(t)&&t.length>0?t.forEach(n=>{i+=`
            <a class="nav-link text-white category-filter d-flex align-items-center justify-content-start" 
                href="#" data-jenis-id="${n.jenis_id}" data-id="${n.id}" data-type="${n.type_id}">
                <img src="${n.path?"storage/"+n.path:"dist/img/product/1.webp"}" alt="${n.name}" 
                class="mr-2 img-thumbnail" style="width: 50px; height: 50px; object-fit: contain;">
                <span class="text-capitalize">${n.name}</span>
            </a>`}):i+='<a class="nav-link text-white category-filter" href="#">Tanpa Kategori</a>',i+="</li>",o?($("#category-menu-item-label, #category-modal-item-label").html(""),$("#category-menu-item,#category-menu-item-modal").html("tidak ada kategori")):$("#category-menu-item, #category-menu-item-modal").html(i),!f&&t.length>0?(console.log("auto choose category"),f=t[0].id,H(f),L(),k()):f&&$(`.category-filter[data-id="${f}"]`).addClass("active")}function L(){h=1,P=!1,w=!1,B.clear(),$("#product-list .row").html("")}let N=!1;function z(e){$(document).off("click",".category-filter"),$(document).on("click",".category-filter",async function(o){if(o.preventDefault(),N)return;N=!0;const t=$(this).data("id"),a=$(this).data("type");console.log(a);try{A({selectedJenis:e,category:t,type:a}),H(t),$("#filterModal").modal("hide"),L(),await k(!1)}catch(r){console.error("Gagal memuat data:",r)}finally{N=!1}})}$(document).ready(function(){let e=new URLSearchParams(window.location.search).get("jenis"),o=new URLSearchParams(window.location.search).get("category"),t,a;(e==5||e==2)&&sessionStorage.removeItem("selectedWallpanel"),A({selectedJenis:e,category:o}),k(),e&&($("#category-container").removeClass("d-md-none"),$("#catalog-col").removeClass("center-content")),$(window).width()<768&&$("#filter-container").addClass("d-none"),(e==1||e==3||e==4)&&($("#filter-container").addClass("d-none"),$("#catalog-col").removeClass("col-md-10"),$("#catalog-col").addClass("col-md-12")),$("#search-input").on("input",function(){clearTimeout(t),t=setTimeout(()=>{L(),k()},500)}),$(window).on("scroll",function(){console.log("scrolling..."),clearTimeout(a),a=setTimeout(()=>{const l=$(window).scrollTop(),i=$(window).height(),s=$(document).height();l+i>=s-150&&(K(!1),k())},200)});function r(l,i=null,s=null){$("#carousel-product-image").empty(),$("#thumbnailGallery").empty();let d=[...l];s.toLowerCase()=="uv board"?d=[...l,...i]:d=[...l],d.forEach((n,g)=>{const c=g===0?"active":"";$("#carousel-product-image").append(`
                    <div class="carousel-item ${c}">
                        <img src="${n}" class="img-fluid d-block mx-auto"
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
                           <img src="${n}" 
                            class="img-thumbnail thumbnail-image p-0 w-100 h-100" 
                            style="
                                height: auto;
                                aspect-ratio: 1 / 1;
                                border: 1px solid #ccc;
                                border-radius: 8px;
                                object-fit: cover;
                                cursor: pointer;"
                            data-index="${g}">
                        </div>
                    </div>
                    `)}),l.length<=1?($("#carouselProduct .carousel-control-next").addClass("d-none"),$("#carouselProduct .carousel-control-prev").addClass("d-none")):($("#carouselProduct .carousel-control-next").removeClass("d-none"),$("#carouselProduct .carousel-control-prev").removeClass("d-none")),$("#carouselProduct").carousel({interval:3e3,pause:!1});let m;$("#thumbnailGallery").off("click").on("click",".thumbnail-image",function(){const n=$(this).data("index");$("#carouselProduct").carousel(n),$(".thumbnail-image").removeClass("active-thumbnail"),$(this).addClass("active-thumbnail"),setTimeout(()=>{$(this).removeClass("active-thumbnail")},500),$("#carouselProduct").carousel("pause"),clearTimeout(m),m=setTimeout(()=>{$("#carouselProduct").carousel("cycle")},5e3)})}$(document).on("click",".product-card",function(){const l=$(this).data("code"),i=$(this).data("category"),s=$(this).attr("data-images"),d=$(this).data("type"),m=JSON.parse($(this).attr("data-paket"));let n=null,g=null;Array.isArray(m)&&(g=m.map(T=>`/storage/${T.image}`)),s&&(n=JSON.parse(s.replace(/&quot;/g,'"')));const c=$(this).data("jenis"),u=parseInt($(this).data("length"),10),p=parseInt($(this).data("height"),10),y=parseInt($(this).data("density"),10),C=$(this).data("id"),v=$(this).data("url");if($("#modalPaket").empty(),c==="tipe-wallpanel"){L(),A({selectedJenis:3,type:d}),K(!1),k(),$("#filter-container").toggleClass("d-none"),$("#catalog-col").toggleClass("col-md-10 col-md-12");return}c.toLowerCase()==="uv board"&&($("#ketebalan, #kepadatan,  #modalVideo").hide(),$("#modalCategory").text(i),$("#modalLength").text(u&&!isNaN(u)?u+" cm":"-"),$("#modalHeight").text(p&&!isNaN(p)?p+" cm":"-"),m.map(T=>{$("#modalPaket").append(`
                    <span class="badge badge-outline-primary px-2 py-1 kepadatan" data-value="${T.name}">${T.name}</span>
                `)})),c.toLowerCase()==="wallboard"&&($("#modalCategory").text(i),$("#modalLength").text(u&&!isNaN(u)?u+" cm":"-"),$("#modalHeight").text(p&&!isNaN(p)?p+" cm":"-"),$("#ketebalan, #kepadatan, #notes, .paket,  #modalVideo").hide()),c==="PVC Board"&&($("#modalCategory").text(c),$("#modalLength").text(u&&!isNaN(u)?u+" cm":"-"),$("#modalHeight").text(p&&!isNaN(p)?p+" cm":"-"),$("#modalDensity").text(y&&!isNaN(y)?y+" mm":"-"),$("#modalKepadatan").html(`
                <span class="badge badge-outline-primary kepadatan" data-value="0,4 mm">0,4mm (Lite)</span>
                <span class="badge badge-outline-primary kepadatan" data-value="0,55 mm">0,55mm (Standar)</span>
                <span class="badge badge-outline-primary kepadatan" data-value="0,7 mm">0,7mm (Heavy-duty)</span>
            `),$(".paket,  #modalVideo").hide()),c==="Wallpanel"&&($("#modalContact").data("type",d),$("#modalCategory").text(i+" / "+d),$("#panjang, #tinggi, #ketebalan, #kepadatan, #notes, .paket, #modalVideo").hide()),c.toLowerCase()==="aksesoris"&&($("#panjang, #tinggi, #ketebalan, #kepadatan, #notes, .paket").hide(),$("#modalCategory").text(i),$("#modalVideoPlayer").empty(),$("#modalVideo").hide(),v&&($("#modalVideoPlayer").append(`
                    <iframe class="embed-responsive-item"
                    src="${v}"
                    title="YouTube video player" frameborder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; web-share;"
                    referrerpolicy="strict-origin-when-cross-origin"
                    allowfullscreen></iframe>
                `),$("#modalVideo").show())),r(n,g,c),$("#modalCode").text(l),$("#productModalLabel").text(l),$("#modalDownload").data("id",C),$("#productModal").modal("show"),$("#modalContact").data("jenis",c),$("#modalContact").data("category",i),$("#modalContact").data("code",l);let x=$("#modalContact").data("kepadatan"),j=$("#modalContact").data("paket");x&&($(".kepadatan").removeClass("active"),$("#modalContact").data("kepadatan",null),$("#notes").show()),j&&($(".kepadatan").removeClass("active"),$("#modalContact").data("kepadatan",null),$("#notes").show());let M=$(".kepadatan");console.log(M.length),M.length>0&&$(".modalContact").prop("disabled",!0)}),$(document).on("click",".kepadatan",function(){$(".modalContact").prop("disabled",!1);let l=$(this).data("value");$(this).closest("#productModal").find(".kepadatan").removeClass("active"),$(this).addClass("active"),$("#notes").hide(),$("#modalContact").data("kepadatan",l)}),z(e),U(),R(),W()});
