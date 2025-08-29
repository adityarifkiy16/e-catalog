let K=null;function S(e){K=e}function E(){return K}function _(){$("#loading").removeClass("d-none")}function G(){$("#loading").addClass("d-none")}function U(e){return e.slice().sort((o,t)=>o.pivot.motif&&!t.pivot.motif?-1:!o.pivot.motif&&t.pivot.motif?1:0).map(o=>"/storage/"+o.path)}function O(){$(document).on("click",".modalDownload",function(e){e.preventDefault();const o=$(this).data("id"),t="catalog/pdf/product?id="+encodeURIComponent(o);D(this,t)}),$("#btn-download").on("click",function(e){e.preventDefault(),D(this,"catalog/pdf?category="+encodeURIComponent(E()))})}function D(e,o){const t=$(e);t.prop("disabled",!0).html('<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Mengunduh...'),window.open(o,"_blank"),setTimeout(()=>{t.prop("disabled",!1).html('<i class="fa fa-file-download"></i> Download')},5e3)}function R(){$(document).on("click",".modalContact",function(e){e.preventDefault(),console.log("Klik tombol order",$(this).data("code"));const o="62816659688",t=$(this).data("jenis");console.log(t.toLowerCase());let a="";t.toLowerCase()=="wallpanel"?a=`Halo Admin,
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

Apakah produk ini masih tersedia? Terima kasih.`,window.open(`https://wa.me/${o}?text=${encodeURIComponent(a)}`,"_blank")})}function W(){$(window).scroll(function(){$(this).scrollTop()>100?$("#btn-scroll-top").fadeIn():$("#btn-scroll-top").fadeOut()}),$("#btn-scroll-top").click(function(){return $("html, body").animate({scrollTop:0},500),!1})}function q(e,o){$("#btn-download").removeClass("d-none");let t="";e.forEach(a=>{var d,c,u,p,f,w,k,C,x;const r=a.photo?`/storage/${a.photo}`:"https://via.placeholder.com/300x200?text=No+Image",n=U(a.images),l=[r,...n],s=JSON.stringify(l).replace(/"/g,"&quot;"),i=((d=a.category)==null?void 0:d.name)??"Tanpa Kategori";let m=a.code;o==3?m=a.code.split(" ").slice(4).join(" ").trim():o==5?m=a.code.split(" ").slice(1).join(" "):m=a.code,((c=a.category)==null?void 0:c.display_style)==="square"||o===null?t+=`
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
                    data-code="${m}"
                    data-category="${i}"
                    data-jenis="${((f=(p=a.category)==null?void 0:p.jenis)==null?void 0:f.name)??""}"
                    data-length="${a.panjang}"
                    data-height="${a.tinggi}"
                    data-density="${a.ketebalan}"
                    data-images="${s}"
                    data-image="${r}"
                    data-type="${((k=(w=a.category)==null?void 0:w.types)==null?void 0:k.name)??""}"
                    data-url="${a.url_video}"
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
                                object-position: ${((x=(C=a.category)==null?void 0:C.jenis)==null?void 0:x.name)==="PVC Board"?"bottom center":"center center"};
                            "
                        >
                        <div class="card-body d-flex flex-column text-center">
                            <h4 class="card-title font-weight-bold text-uppercase mb-2">
                                ${m}
                            </h4>
                            <h6 class="card-text text-muted mb-1">${i}</h6>
                        </div>
                    </div>
                </div>`}),$("#product-list .row").append(t)}function F(e,o){$("#btn-download").addClass("d-none");let t="";e.forEach(a=>{const r=a.thumbnail?`/storage/${a.thumbnail}`:"https://via.placeholder.com/300x200?text=No+Image";console.log(o);const n=o==3?"wallpanel":"tanpa kategori";t+=`
                    <div class="col-md-2 col-6 mb-4">
                        <div class="h-100 product-card d-flex flex-column justify-content-center align-items-center"
                    `,t+=`
                    data-id="${a.id}"
                    data-jenis="tipe-wallpanel"
                    data-category="${n}"
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
                            <h6 class="card-text text-muted mb-1">${n}</h6>
                        </div>
                    </div>
                </div>`}),$("#product-list .row").append(t)}function J(e,o,t){if(o==null)return;e.forEach(s=>{s.path&&t.add(s.path)});const a=Array.from(t),r=$("#mockup-carousel-inner"),n=$("#mockup-carousel-indicators"),l=["https://www.youtube.com/embed/x55DLsMH-lA?autoplay=1&mute=1&rel=0&controls=0&amp;loop=1&playlist=x55DLsMH-lA"];if(r.empty(),n.empty(),o==4){$("#carouselExampleControls").carousel({interval:!1}),$("#mockup .carousel-control-next").addClass("d-none"),$("#mockup .carousel-control-prev").addClass("d-none"),l.forEach((s,i)=>{r.append(`
                <div class="carousel-item ${i===0?"active":""}">
                    <div class="d-flex justify-content-center align-items-center">
                        <div class="embed-responsive embed-responsive-16by9 rounded-lg" style="width:100%;">
                            <iframe
                                class="embed-responsive-item"
                                src="${s}"
                                title="YouTube video player"
                                frameborder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; web-share;"
                                referrerpolicy="strict-origin-when-cross-origin"
                                allowfullscreen 
                            ></iframe>
                        </div>
                    </div>
                </div>
            `)}),$("#mockup").removeClass("d-none");return}a.length>0?(a.length===1?($("#mockup .carousel-control-next").addClass("d-none"),$("#mockup .carousel-control-prev").addClass("d-none")):($("#mockup .carousel-control-next").removeClass("d-none"),$("#mockup .carousel-control-prev").removeClass("d-none")),a.slice(0,5).forEach((s,i)=>{r.append(`
                        <div class="carousel-item ${i===0?"active":""}">
                            <img src="/storage/${s}" id="mockup-image" alt="mockup" 
                                class="img-fluid w-100 rounded-lg d-block mx-auto"
                            >
                        </div>
                    `),n.append(`
                        <li data-target="#carouselExampleControls" data-slide-to="${i}" ${i===0?'class="active"':""}></li>
                    `)}),$("#mockup").removeClass("d-none")):$("#mockup").addClass("d-none")}let y=null,h=null,L=null,g=1,j=!1,v=!1;const B=new Set;let V=!0;function M(e){V=e}function N(e){y=e.selectedJenis,h=e.category??null,L=e.type??null}function b(){return new Promise((e,o)=>{if($(window).width()<768&&$("#filter-container").addClass("d-none"),j||v)return e();j=!0,_();const t=$("#search-input").val();$.ajax({url:"/catalog",type:"GET",data:{page:g,search:t,jenis:y,category:h,type:L},success:function(a){const r=a.data.data??[],n=a.types??[];L&&($("#backButton").removeClass("d-none"),$("#homeButton").addClass("d-none")),y==3&&V?(n.length>0&&(F(n,y),g++,g>a.data.last_page&&(v=!0)),A(a,!0)):(r.length>0?(q(r,y),g++,g>a.data.last_page&&(v=!0)):(g===1&&($("#mockup").addClass("d-none"),$("#product-list .row").append(`<div class="col-12"><img src="dist/img/no-data.png" alt="no-data"
                                class="img-fluid mx-auto d-block" style="max-width: 100%; height: auto; margin-top: 100px; margin-bottom: 100px;"></div>`)),v=!0),A(a,!1)),e()},error:function(){console.log("Gagal memuat data."),o()},complete:function(){j=!1,G()}})})}function A(e,o=!0){var s,i,m;const t=e.category,a=(s=e.jenis)==null?void 0:s.name,n=((m=(i=e.data.data[0])==null?void 0:i.category)==null?void 0:m.images)??[];switch(t.length===0?$("#category-container").addClass("d-none"):($("#category-container").removeClass("d-none"),n.length===0&&$("#mockup").addClass("d-none"),J(n,y,B)),a){case"PVC Board":$("#category-container").addClass("d-none"),$(".category-modal-container").text("Tidak ada kategori");break;case"Wallboard":$("#category-menu-item-label, #category-modal-item-label").html("Motif");break;case"UV Board":$("#category-menu-item-label, #category-modal-item-label").html("Motif");break;case"Wallpanel":$("#category-menu-item-label, #category-modal-item-label").html("Motif");break;case"Aksesoris":$("#category-container").addClass("d-none"),$(".category-modal-container").text("Tidak ada kategori");break;default:$("#category-menu-item-label, #category-modal-item-label").html("Kategori")}let l='<li class="nav-item font-poppins">';Array.isArray(t)&&t.length>0?t.forEach(d=>{l+=`
            <a class="nav-link text-white category-filter d-flex align-items-center justify-content-start" 
                href="#" data-jenis-id="${d.jenis_id}" data-id="${d.id}" data-type="${d.type_id}">
                <img src="${d.path?"storage/"+d.path:"dist/img/product/1.webp"}" alt="${d.name}" 
                class="mr-2 img-thumbnail" style="width: 50px; height: 50px; object-fit: contain;">
                <span class="text-capitalize">${d.name}</span>
            </a>`}):l+='<a class="nav-link text-white category-filter" href="#">Tanpa Kategori</a>',l+="</li>",o?($("#category-menu-item-label, #category-modal-item-label").html(""),$("#category-menu-item,#category-menu-item-modal").html("tidak ada kategori")):$("#category-menu-item, #category-menu-item-modal").html(l),!h&&t.length>0?(console.log("auto choose category"),h=t[0].id,S(h),T(),b()):h&&$(`.category-filter[data-id="${h}"]`).addClass("active")}function T(){g=1,j=!1,v=!1,B.clear(),$("#product-list .row").html("")}let P=!1;function Y(e){$(document).off("click",".category-filter"),$(document).on("click",".category-filter",async function(o){if(o.preventDefault(),P)return;P=!0;const t=$(this).data("id"),a=$(this).data("type");console.log(a);try{N({selectedJenis:e,category:t,type:a}),S(t),$("#filterModal").modal("hide"),T(),await b(!1)}catch(r){console.error("Gagal memuat data:",r)}finally{P=!1}})}$(document).ready(function(){let e=new URLSearchParams(window.location.search).get("jenis"),o=new URLSearchParams(window.location.search).get("category"),t,a;(e==5||e==2)&&sessionStorage.removeItem("selectedWallpanel"),N({selectedJenis:e,category:o}),b(),e&&($("#category-container").removeClass("d-md-none"),$("#catalog-col").removeClass("center-content")),$(window).width()<768&&$("#filter-container").addClass("d-none"),(e==1||e==3||e==4)&&($("#filter-container").addClass("d-none"),$("#catalog-col").removeClass("col-md-10"),$("#catalog-col").addClass("col-md-12")),$("#search-input").on("input",function(){clearTimeout(t),t=setTimeout(()=>{T(),b()},500)}),$(window).on("scroll",function(){console.log("scrolling..."),clearTimeout(a),a=setTimeout(()=>{const n=$(window).scrollTop(),l=$(window).height(),s=$(document).height();n+l>=s-150&&(M(!1),b())},200)});function r(n,l=null,s=null){$("#carousel-product-image").empty(),$("#thumbnailGallery").empty();let i=[...n];s.toLowerCase()=="uv board"?i=[...n,...l]:i=[...n],i.forEach((d,c)=>{const u=c===0?"active":"";$("#carousel-product-image").append(`
                    <div class="carousel-item ${u}">
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
                    <div class="col-2 mb-0 d-flex justify-content-center">
                        <div style="height: 90%">
                           <img src="${d}" 
                            class="img-thumbnail thumbnail-image p-0 w-100 h-100" 
                            style="
                                height: auto;
                                aspect-ratio: 1 / 1;
                                border: 1px solid #ccc;
                                border-radius: 8px;
                                object-fit: cover;
                                cursor: pointer;"
                            data-index="${c}">
                        </div>
                    </div>
                    `)}),n.length<=1?($("#carouselProduct .carousel-control-next").addClass("d-none"),$("#carouselProduct .carousel-control-prev").addClass("d-none")):($("#carouselProduct .carousel-control-next").removeClass("d-none"),$("#carouselProduct .carousel-control-prev").removeClass("d-none")),$("#carouselProduct").carousel({interval:3e3,pause:!1});let m;$("#thumbnailGallery").off("click").on("click",".thumbnail-image",function(){const d=$(this).data("index");$("#carouselProduct").carousel(d),$(".thumbnail-image").removeClass("active-thumbnail"),$(this).addClass("active-thumbnail"),setTimeout(()=>{$(this).removeClass("active-thumbnail")},500),$("#carouselProduct").carousel("pause"),clearTimeout(m),m=setTimeout(()=>{$("#carouselProduct").carousel("cycle")},5e3)})}$(document).on("click",".product-card",function(){const n=$(this).data("code"),l=$(this).data("category"),s=$(this).attr("data-images"),i=$(this).data("type");let m=null,d=[{path:`/dist/img/paket/1.png?v=${Date.now()}`},{path:`/dist/img/paket/2.png?v=${Date.now()}`},{path:`/dist/img/paket/3.png?v=${Date.now()}`}];d=d.map(H=>H.path),s&&(m=JSON.parse(s.replace(/&quot;/g,'"')));const c=$(this).data("jenis"),u=parseInt($(this).data("length"),10),p=parseInt($(this).data("height"),10),f=parseInt($(this).data("density"),10),w=$(this).data("id"),k=$(this).data("url");if(c==="tipe-wallpanel"){T(),N({selectedJenis:3,type:i}),M(!1),b(),$("#filter-container").toggleClass("d-none"),$("#catalog-col").toggleClass("col-md-10 col-md-12");return}c.toLowerCase()==="uv board"&&($("#ketebalan, #kepadatan,  #modalVideo").hide(),$("#modalCategory").text(l),$("#modalLength").text(u&&!isNaN(u)?u+" cm":"-"),$("#modalHeight").text(p&&!isNaN(p)?p+" cm":"-"),$("#modalPaket").html(`
                <span class="badge badge-outline-primary px-2 py-1 kepadatan" data-value="1">Bundle 1</span>
                <span class="badge badge-outline-primary px-2 py-1 kepadatan" data-value="2">Bundle 2</span>
                <span class="badge badge-outline-primary px-2 py-1 kepadatan" data-value="3">Bundle 3</span>
            `)),c.toLowerCase()==="wallboard"&&($("#modalCategory").text(l),$("#modalLength").text(u&&!isNaN(u)?u+" cm":"-"),$("#modalHeight").text(p&&!isNaN(p)?p+" cm":"-"),$("#ketebalan, #kepadatan, #notes, .paket,  #modalVideo").hide()),c==="PVC Board"&&($("#modalCategory").text(c),$("#modalLength").text(u&&!isNaN(u)?u+" cm":"-"),$("#modalHeight").text(p&&!isNaN(p)?p+" cm":"-"),$("#modalDensity").text(f&&!isNaN(f)?f+" mm":"-"),$("#modalKepadatan").html(`
                <span class="badge badge-outline-primary kepadatan" data-value="0,4 mm">0,4mm (Lite)</span>
                <span class="badge badge-outline-primary kepadatan" data-value="0,55 mm">0,55mm (Standar)</span>
                <span class="badge badge-outline-primary kepadatan" data-value="0,7 mm">0,7mm (Heavy-duty)</span>
            `),$(".paket,  #modalVideo").hide()),c==="Wallpanel"&&($("#modalContact").data("type",i),$("#modalCategory").text(l+" / "+i),$("#panjang, #tinggi, #ketebalan, #kepadatan, #notes, .paket, #modalVideo").hide()),c.toLowerCase()==="aksesoris"&&($("#panjang, #tinggi, #ketebalan, #kepadatan, #notes, .paket").hide(),$("#modalCategory").text(l),$("#modalVideoPlayer").empty(),$("#modalVideo").hide(),k&&($("#modalVideoPlayer").append(`
                    <iframe class="embed-responsive-item"
                    src="${k}"
                    title="YouTube video player" frameborder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; web-share;"
                    referrerpolicy="strict-origin-when-cross-origin"
                    allowfullscreen></iframe>
                `),$("#modalVideo").show())),r(m,d,c),$("#modalCode").text(n),$("#productModalLabel").text(n),$("#modalDownload").data("id",w),$("#productModal").modal("show"),$("#modalContact").data("jenis",c),$("#modalContact").data("category",l),$("#modalContact").data("code",n);let C=$("#modalContact").data("kepadatan"),x=$("#modalContact").data("paket");C&&($(".kepadatan").removeClass("active"),$("#modalContact").data("kepadatan",null),$("#notes").show()),x&&($(".kepadatan").removeClass("active"),$("#modalContact").data("kepadatan",null),$("#notes").show());let I=$(".kepadatan");console.log(I.length),I.length>0&&$(".modalContact").prop("disabled",!0)}),$(document).on("click",".kepadatan",function(){$(".modalContact").prop("disabled",!1);let n=$(this).data("value");$(this).closest("#productModal").find(".kepadatan").removeClass("active"),$(this).addClass("active"),$("#notes").hide(),$("#modalContact").data("kepadatan",n)}),Y(e),O(),R(),W()});
