let B=null;function D(e){B=e}function E(){return B}function U(){$("#loading").removeClass("d-none")}function O(){$("#loading").addClass("d-none")}function G(e){return e.slice().sort((o,t)=>o.pivot.motif&&!t.pivot.motif?-1:!o.pivot.motif&&t.pivot.motif?1:0).map(o=>"/storage/"+o.path)}function J(){$(document).on("click",".modalDownload",function(e){e.preventDefault();const o=$(this).data("id"),t="catalog/pdf/product?id="+encodeURIComponent(o);K(this,t)}),$("#btn-download").on("click",function(e){e.preventDefault(),K(this,"catalog/pdf?category="+encodeURIComponent(E()))})}function K(e,o){const t=$(e);t.prop("disabled",!0).html('<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Mengunduh...'),window.open(o,"_blank"),setTimeout(()=>{t.prop("disabled",!1).html('<i class="fa fa-file-download"></i> Download')},5e3)}function F(){$(document).on("click",".modalContact",function(e){e.preventDefault(),console.log("Klik tombol order",$(this).data("code"));const o="62816659688",t=$(this).data("jenis");console.log(t.toLowerCase());let a="";t.toLowerCase()=="wallpanel"?a=`Halo Admin,
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

Apakah produk ini masih tersedia? Terima kasih.`,window.open(`https://wa.me/${o}?text=${encodeURIComponent(a)}`,"_blank")})}function R(){$(window).scroll(function(){$(this).scrollTop()>100?$("#btn-scroll-top").fadeIn():$("#btn-scroll-top").fadeOut()}),$("#btn-scroll-top").click(function(){return $("html, body").animate({scrollTop:0},500),!1})}function W(e,o){$("#btn-download").removeClass("d-none");let t="";e.forEach(a=>{var h,c,u,p,g,C,v,x,j;const r=a.photo?`/storage/${a.photo}`:"https://via.placeholder.com/300x200?text=No+Image",l=G(a.images),i=[r,...l],s=JSON.stringify(i).replace(/"/g,"&quot;"),d=JSON.stringify(a.packages).replace(/"/g,"&quot;"),m=((h=a.category)==null?void 0:h.name)??"Tanpa Kategori";let n=a.code;o==3?n=a.code.split(" ").slice(4).join(" ").trim():o==5?n=a.code.split(" ").slice(1).join(" "):n=a.code,((c=a.category)==null?void 0:c.display_style)==="square"||o===null?t+=`
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
                    data-jenis="${((g=(p=a.category)==null?void 0:p.jenis)==null?void 0:g.name)??""}"
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
                </div>`}),$("#product-list .row").append(t)}function q(e,o){$("#btn-download").addClass("d-none");let t="";e.forEach(a=>{const r=a.thumbnail?`/storage/${a.thumbnail}`:"https://via.placeholder.com/300x200?text=No+Image";console.log(o);const l=o==3?"wallpanel":"tanpa kategori";t+=`
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
                </div>`}),$("#product-list .row").append(t)}function Y(e,o,t){if(o==null)return;e.forEach(s=>{s.path&&t.add(s.path)});const a=Array.from(t),r=$("#mockup-carousel-inner"),l=$("#mockup-carousel-indicators"),i=["https://www.youtube.com/embed/BiiUrYAbL9s?autoplay=1&mute=1&rel=0&controls=0&amp;loop=1&playlist=BiiUrYAbL9s"];if(r.empty(),l.empty(),o==4){$("#mockup-carousel").carousel({interval:!1}),$("#mockup .carousel-control-next").addClass("d-none"),$("#mockup .carousel-control-prev").addClass("d-none"),i.forEach((s,d)=>{r.append(`
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
            `)}),$("#mockup").removeClass("d-none")):$("#mockup").addClass("d-none")}let b=null,y=null,I=null,f=1,P=!1,w=!1;const H=new Set;let _=!0;function M(e){_=e}function A(e){b=e.selectedJenis,y=e.category??null,I=e.type??null}function k(){return new Promise((e,o)=>{if($(window).width()<768&&$("#filter-container").addClass("d-none"),P||w)return e();P=!0,U();const t=$("#search-input").val();$.ajax({url:"/catalog",type:"GET",data:{page:f,search:t,jenis:b,category:y,type:I},success:function(a){const r=a.data.data??[],l=a.types??[];I&&($("#backButton").removeClass("d-none"),$("#homeButton").addClass("d-none")),b==3&&_?(l.length>0&&(q(l,b),f++,f>a.data.last_page&&(w=!0)),V(a,!0)):(r.length>0?(W(r,b),f++,f>a.data.last_page&&(w=!0)):(f===1&&($("#mockup").addClass("d-none"),$("#product-list .row").append(`<div class="col-12"><img src="dist/img/no-data.png" alt="no-data"
                                class="img-fluid mx-auto d-block" style="max-width: 100%; height: auto; margin-top: 100px; margin-bottom: 100px;"></div>`)),w=!0),V(a,!1)),e()},error:function(){console.log("Gagal memuat data."),o()},complete:function(){P=!1,O()}})})}function V(e,o=!0){var s,d,m;const t=e.category,a=(s=e.jenis)==null?void 0:s.name,l=((m=(d=e.data.data[0])==null?void 0:d.category)==null?void 0:m.images)??[];switch(t.length===0?$("#category-container").addClass("d-none"):($("#category-container").removeClass("d-none"),l.length===0&&$("#mockup").addClass("d-none"),Y(l,b,H)),a){case"PVC Board":$("#category-container").addClass("d-none"),$(".category-modal-container").text("Tidak ada kategori");break;case"Wallboard":$("#category-menu-item-label, #category-modal-item-label").html("Motif");break;case"UV Board":$("#category-menu-item-label, #category-modal-item-label").html("Motif");break;case"Wallpanel":$("#category-menu-item-label, #category-modal-item-label").html("Motif");break;case"Aksesoris":$("#category-container").addClass("d-none"),$(".category-modal-container").text("Tidak ada kategori");break;default:$("#category-menu-item-label, #category-modal-item-label").html("Kategori")}let i='<li class="nav-item font-poppins">';Array.isArray(t)&&t.length>0?t.forEach(n=>{i+=`
            <a class="nav-link text-white category-filter d-flex align-items-center justify-content-start" 
                href="#" data-jenis-id="${n.jenis_id}" data-id="${n.id}" data-type="${n.type_id}">
                <img src="${n.path?"storage/"+n.path:"dist/img/product/1.webp"}" alt="${n.name}" 
                class="mr-2 img-thumbnail" style="width: 50px; height: 50px; object-fit: contain;">
                <span class="text-capitalize">${n.name}</span>
            </a>`}):i+='<a class="nav-link text-white category-filter" href="#">Tanpa Kategori</a>',i+="</li>",o?($("#category-menu-item-label, #category-modal-item-label").html(""),$("#category-menu-item,#category-menu-item-modal").html("tidak ada kategori")):$("#category-menu-item, #category-menu-item-modal").html(i),!y&&t.length>0?(console.log("auto choose category"),y=t[0].id,D(y),N(),k()):y&&$(`.category-filter[data-id="${y}"]`).addClass("active")}function N(){f=1,P=!1,w=!1,H.clear(),$("#product-list .row").html("")}let L=!1;function z(e){$(document).off("click",".category-filter"),$(document).on("click",".category-filter",async function(o){if(o.preventDefault(),L)return;L=!0;const t=$(this).data("id"),a=$(this).data("type");console.log(a);try{A({selectedJenis:e,category:t,type:a}),D(t),$("#filterModal").modal("hide"),N(),await k(!1)}catch(r){console.error("Gagal memuat data:",r)}finally{L=!1}})}$(document).ready(function(){let e=new URLSearchParams(window.location.search).get("jenis"),o=new URLSearchParams(window.location.search).get("category"),t,a;(e==5||e==2)&&sessionStorage.removeItem("selectedWallpanel"),A({selectedJenis:e,category:o}),k(),e&&($("#category-container").removeClass("d-md-none"),$("#catalog-col").removeClass("center-content")),$(window).width()<768&&$("#filter-container").addClass("d-none"),(e==1||e==3||e==4)&&($("#filter-container").addClass("d-none"),$("#catalog-col").removeClass("col-md-10"),$("#catalog-col").addClass("col-md-12")),$("#search-input").on("input",function(){clearTimeout(t),t=setTimeout(()=>{N(),k()},500)}),$(window).on("scroll",function(){console.log("scrolling..."),clearTimeout(a),a=setTimeout(()=>{const l=$(window).scrollTop(),i=$(window).height(),s=$(document).height();l+i>=s-150&&(M(!1),k())},200)});function r(l,i=null,s=null){$("#carousel-product-image").empty(),$("#thumbnailGallery").empty();let d=[...l];s.toLowerCase()=="uv board"?d=[...l,...i]:d=[...l],d.forEach((n,h)=>{const c=h===0?"active":"";$("#carousel-product-image").append(`
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
                            data-index="${h}">
                        </div>
                    </div>
                    `)}),l.length<=1?($("#carouselProduct .carousel-control-next").addClass("d-none"),$("#carouselProduct .carousel-control-prev").addClass("d-none")):($("#carouselProduct .carousel-control-next").removeClass("d-none"),$("#carouselProduct .carousel-control-prev").removeClass("d-none")),$("#carouselProduct").carousel({interval:3e3,pause:!1});let m;$("#thumbnailGallery").off("click").on("click",".thumbnail-image",function(){const n=$(this).data("index");$("#carouselProduct").carousel(n),$(".thumbnail-image").removeClass("active-thumbnail"),$(this).addClass("active-thumbnail"),setTimeout(()=>{$(this).removeClass("active-thumbnail")},500),$("#carouselProduct").carousel("pause"),clearTimeout(m),m=setTimeout(()=>{$("#carouselProduct").carousel("cycle")},5e3)})}$(document).on("click",".product-card",function(){const l=$(this).data("code"),i=$(this).data("category"),s=$(this).attr("data-images"),d=$(this).data("type"),m=JSON.parse($(this).attr("data-paket")||"[]");let n=null,h=null;Array.isArray(m)&&(h=m.map(T=>`/storage/${T.image}`)),s&&(n=JSON.parse(s.replace(/&quot;/g,'"')));const c=$(this).data("jenis"),u=parseInt($(this).data("length"),10),p=parseInt($(this).data("height"),10),g=parseFloat($(this).data("density")).toFixed(1),C=$(this).data("id"),v=$(this).data("url");if($("#modalPaket").empty(),c==="tipe-wallpanel"){N(),A({selectedJenis:3,type:d}),M(!1),k(),$("#filter-container").toggleClass("d-none"),$("#catalog-col").toggleClass("col-md-10 col-md-12");return}c.toLowerCase()==="uv board"&&($("#modalVideo").hide(),$("#modalCategory").text(i),$("#modalLength").text(u&&!isNaN(u)?u+" cm":"-"),$("#modalHeight").text(p&&!isNaN(p)?p+" cm":"-"),$("#modalDensity").text(g&&!isNaN(g)?g+" mm":"-"),$("#modalKepadatan").html(`
                <span class="">0.9 mm</span>
            `),m.length>0?m.map(T=>{$("#modalPaket").append(`
                        <span class="badge badge-outline-primary px-2 py-1 kepadatan" data-value="${T.name}">${T.name}</span>
                    `)}):($("#modalPaket").append('<span class="text-muted">Tidak ada paket</span>'),$("#notes").hide())),c.toLowerCase()==="wallboard"&&($("#modalCategory").text(i),$("#modalLength").text(u&&!isNaN(u)?u+" cm":"-"),$("#modalHeight").text(p&&!isNaN(p)?p+" cm":"-"),$("#ketebalan, #kepadatan, #notes, .paket,  #modalVideo").hide()),c==="PVC Board"&&($("#modalCategory").text(c),$("#modalLength").text(u&&!isNaN(u)?u+" cm":"-"),$("#modalHeight").text(p&&!isNaN(p)?p+" cm":"-"),$("#modalDensity").text(g&&!isNaN(g)?g+" mm":"-"),$("#modalKepadatan").html(`
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
                `),$("#modalVideo").show())),r(n,h,c),$("#modalCode").text(l),$("#productModalLabel").text(l),$("#modalDownload").data("id",C),$("#productModal").modal("show"),$("#modalContact").data("jenis",c),$("#modalContact").data("category",i),$("#modalContact").data("code",l);let x=$("#modalContact").data("kepadatan"),j=$("#modalContact").data("paket");x&&($(".kepadatan").removeClass("active"),$("#modalContact").data("kepadatan",null),$("#notes").show()),j&&($(".kepadatan").removeClass("active"),$("#modalContact").data("kepadatan",null),$("#notes").show());let S=$(".kepadatan");console.log(S.length),S.length>0?$(".modalContact").prop("disabled",!0):$(".modalContact").prop("disabled",!1)}),$(document).on("click",".kepadatan",function(){$(".modalContact").prop("disabled",!1);let l=$(this).data("value");$(this).closest("#productModal").find(".kepadatan").removeClass("active"),$(this).addClass("active"),$("#notes").hide(),$("#modalContact").data("kepadatan",l)}),z(e),J(),F(),R()});
