let K=null;function R(e){K=e}function B(){return K}function N(){$("#loading").removeClass("d-none")}function O(){$("#loading").addClass("d-none")}function U(e){return e.slice().sort((o,n)=>(n.type==="motif")-(o.type==="motif")).map(o=>"/storage/"+o.path)}function W(){$(document).on("click",".modalDownload",function(e){e.preventDefault();const o=$(this).data("id"),n="catalog/pdf/product?id="+encodeURIComponent(o);_(this,n)}),$("#btn-download").on("click",function(e){e.preventDefault(),_(this,"catalog/pdf?category="+encodeURIComponent(B()))})}function _(e,o){const n=$(e);n.prop("disabled",!0).html('<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Mengunduh...'),window.open(o,"_blank"),setTimeout(()=>{n.prop("disabled",!1).html('<i class="fa fa-file-download"></i> Download')},5e3)}function F(){$(document).on("click",".modalContact",function(e){e.preventDefault(),console.log("Klik tombol order",$(this).data("code"));const o="62816659688",n=$(this).data("jenis");console.log(n.toLowerCase());let a="";n.toLowerCase()=="wallpanel"?a=`Halo Admin,
Saya tertarik dengan produk berikut:

• Tipe Wallpanel: *${$(this).data("type")}*
• Kode : *${$(this).data("code")}*
• panjang : *${$(this).data("length")} cm*
• tinggi : *${$(this).data("height")} cm*
• lebar : *${$(this).data("width")} cm*
• Produk : *${$(this).data("jenis")}*
• Kategori: *${$(this).data("category")}*

Apakah produk ini masih tersedia? Terima kasih.`:n.toLowerCase()=="pvc board"?a=`Halo Admin,
Saya tertarik dengan produk berikut:

• Produk : *${$(this).data("jenis")}*
• Ketebalan : *${$(this).data("code")}*
• density: *${$(this).data("kepadatan")??"-"}*

Apakah produk ini masih tersedia? Terima kasih.`:n.toLowerCase()=="uv board"?a=`Halo Admin,
Saya tertarik dengan produk berikut:

• Kode Motif : *${$(this).data("code")}*
• Produk : *${$(this).data("jenis")}*
• Kategori: *${$(this).data("category")}*

• Paket: *${$(this).data("kepadatan")??"-"}*

Apakah produk ini masih tersedia? Terima kasih.`:n.toLowerCase()=="aksesoris"?a=`Halo Admin,
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

Apakah produk ini masih tersedia? Terima kasih.`,window.open(`https://wa.me/${o}?text=${encodeURIComponent(a)}`,"_blank")})}function H(){$(window).scroll(function(){$(this).scrollTop()>100?$("#btn-scroll-top").fadeIn():$("#btn-scroll-top").fadeOut()}),$("#btn-scroll-top").click(function(){return $("html, body").animate({scrollTop:0},500),!1})}function G(e,o){$("#btn-download").removeClass("d-none"),console.log(e);let n="";e.forEach(a=>{var u,h,g,v,C,f,x,k,j,L,b;const l=a.photo?`/storage/${a.photo}`:"https://via.placeholder.com/300x200?text=No+Image",c=U(a.images),m=[l,...c],d=JSON.stringify(m).replace(/"/g,"&quot;"),r=JSON.stringify(a.packages).replace(/"/g,"&quot;"),s=((u=a.category)==null?void 0:u.name)??"Tanpa Kategori";let i=a.code;o==3?i=a.code.split(" ").slice(4).join(" ").trim():o==4||o==5?i=a.code.split(" ").slice(1).join(" "):i=a.code,((h=a.category)==null?void 0:h.display_style)==="square"||o===null?n+=`
                    <div class="col-md-2 col-6 mb-4">
                        <div class="h-100 product-card"
                    `:((g=a.category)==null?void 0:g.display_style)==="rectangle"?n+=`
                    <div class="col-md-4 col-6 mb-4">
                        <div class="h-100 product-card"
                    `:n+=`
                    <div class="col-md-2 col-6 mb-4">
                        <div class="h-100 product-card d-flex flex-column justify-content-center align-items-center"
                    `;const p=JSON.stringify(a.variants).replace(/"/g,"&quot;");n+=`
                    data-id="${a.id}"
                    data-code="${i}"
                    data-category="${s}"
                    data-jenis="${((C=(v=a.category)==null?void 0:v.jenis)==null?void 0:C.name)??""}"
                    data-images="${d}"
                    data-image="${l}"
                    data-type="${((x=(f=a.category)==null?void 0:f.types)==null?void 0:x.name)??""}"
                    data-type-image="${((j=(k=a.category)==null?void 0:k.types)==null?void 0:j.image)??""}"
                    data-url="${a.url_video}"
                    data-paket="${r}"
                    data-variants = "${p}"
                    >
                       <img 
                            src="${l}" 
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
                                object-position: ${((b=(L=a.category)==null?void 0:L.jenis)==null?void 0:b.name)==="PVC Board"?"bottom center":"center center"};
                            "
                        >
                        <div class="card-body d-flex flex-column text-center">
                            <h4 class="card-title font-weight-bold text-uppercase mb-2">
                                ${i}
                            </h4>
                            <h6 class="card-text text-muted mb-1">${s}</h6>
                        </div>
                    </div>
                </div>`}),$("#product-list .row").append(n)}function Y(e,o){$("#btn-download").addClass("d-none");let n="";e.forEach(a=>{const l=a.thumbnail?`/storage/${a.thumbnail}`:"https://via.placeholder.com/300x200?text=No+Image";console.log(o);const c=o==3?"wallpanel":"tanpa kategori";n+=`
                    <div class="col-md-2 col-6 mb-4">
                        <div class="h-100 product-card d-flex flex-column justify-content-center align-items-center"
                    `,n+=`
                    data-id="${a.id}"
                    data-jenis="tipe-wallpanel"
                    data-category="${c}"
                    data-type="${a.id}"
                    >
                       <img 
                            src="${l}" 
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
                </div>`}),$("#product-list .row").append(n)}function S(e,o,n,a=!1){if(o==null)return;e.forEach(s=>{s.images&&s.images.forEach(i=>{i.path&&n.add(i.path)}),s.path&&n.add(s.path)});const l=Array.from(n),c=$("#mockup-carousel-inner"),m=$("#mockup-carousel-indicators"),d=["https://www.youtube.com/embed/BiiUrYAbL9s?autoplay=1&mute=1&rel=0&controls=0&amp;loop=1&playlist=BiiUrYAbL9s"],r=[];for(let s=1;s<=6;s++)s!==2&&r.push(`/dist/img/wpc/${s}.webp?v=${Date.now()}`);if(c.empty(),m.empty(),o==4){$("#mockup-carousel").carousel({interval:!1}),$("#mockup .carousel-control-next").addClass("d-none"),$("#mockup .carousel-control-prev").addClass("d-none"),d.forEach((s,i)=>{c.append(`
            <div class="carousel-item ${i===0?"active":""}">
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
        `)}),$("#mockup").removeClass("d-none");return}else if(o==3&&a){$("#mockup-carousel").carousel({interval:3e3}),$("#mockup .carousel-control-next").removeClass("d-none"),$("#mockup .carousel-control-prev").removeClass("d-none"),r.forEach((s,i)=>{c.append(`
            <div class="carousel-item ${i===0?"active":""}">
                <div class="d-flex justify-content-center align-items-center">
                    <img src="${s}" 
                        alt="mockup" 
                        class="img-fluid w-100 rounded-3 d-block mx-auto mockup-image"
                    >
                </div>
            </div>
        `),m.append(`
            <li data-bs-target="#mockup-carousel" data-bs-slide-to="${i}" ${i===0?'class="active"':""}></li>
        `)}),$("#mockup").removeClass("d-none");return}l.length>0?(l.length===1?($("#mockup .carousel-control-next").addClass("d-none"),$("#mockup .carousel-control-prev").addClass("d-none"),m.addClass("d-none")):($("#mockup .carousel-control-next").removeClass("d-none"),$("#mockup .carousel-control-prev").removeClass("d-none")),l.slice(0,5).forEach((s,i)=>{c.append(`
                <div class="carousel-item ${i===0?"active":""}">
                    <img src="/storage/${s}" alt="mockup" 
                        class="img-fluid w-100 rounded-lg d-block mx-auto mockup-image"
                    >
                </div>
            `),m.append(`
                <li data-target="#mockup-carousel" data-slide-to="${i}" ${i===0?'class="active"':""}></li>
            `)}),$("#mockup").removeClass("d-none")):$("#mockup").addClass("d-none")}let t={selectedJenis:null,category:null,type:null,currentPage:1,isLoading:!1,lastPage:!1,firstLoad:!0,currentRequest:null,uniquePaths:new Set};function D(e){t.firstLoad=e}function q(e){t.selectedJenis=e.selectedJenis,t.category=e.category??null,t.type=e.type??null}function z(){return t.isLoading}function A(){t.currentPage=1,t.isLoading=!1,t.lastPage=!1,t.uniquePaths.clear(),$("#product-list .row").html("")}function w(){if(t.isLoading||t.lastPage)return Promise.resolve();console.log("loadMoreData"),t.isLoading=!0,N();const e=$("#search-input").val();return t.currentRequest&&t.currentRequest.readyState!==4&&t.currentRequest.abort(),t.currentRequest=$.ajax({url:"/catalog",type:"GET",data:{page:t.currentPage,search:e,jenis:t.selectedJenis,category:t.category,type:t.type}}),new Promise((o,n)=>{t.currentRequest.done(a=>X(a)).fail((a,l)=>{l!=="abort"&&(console.error("Gagal memuat data."),n())}).always(()=>{t.isLoading=!1,O(),t.currentRequest=null}).then(o)})}function X(e){const o=e.data.data??[],n=e.types??[];t.type&&($("#backButton").removeClass("d-none"),$("#homeButton").addClass("d-none")),t.selectedJenis==3&&t.firstLoad?(n.length>0&&($("#search-form").addClass("d-none"),Y(n,t.selectedJenis),t.currentPage++,t.currentPage>e.data.last_page&&(t.lastPage=!0)),E(e,!0)):(o.length>0?(G(o,t.selectedJenis),t.currentPage++,t.currentPage>e.data.last_page&&(t.lastPage=!0)):(t.currentPage===1&&($("#mockup").addClass("d-none"),$("#product-list .row").append(`<div class="col-12"><img src="dist/img/no-data.png" alt="no-data"
                     class="img-fluid mx-auto d-block" style="max-width:100%;height:auto;margin:100px 0;"></div>`)),t.lastPage=!0),E(e,!1))}function E(e,o=!0){var r,s,i,p,u,h;const n=e.category??[],a=((i=(s=(r=e.data.data[0])==null?void 0:r.category)==null?void 0:s.types)==null?void 0:i.images)??[],l=(p=e.jenis)==null?void 0:p.name,c=((h=(u=e.data.data[0])==null?void 0:u.category)==null?void 0:h.images)??[];n.length===0?$("#category-container").addClass("d-none"):($("#category-container").removeClass("d-none"),a.length>0?S(a,t.selectedJenis,t.uniquePaths,o):c.length>0?S(c,t.selectedJenis,t.uniquePaths,o):t.selectedJenis==3?S([],t.selectedJenis,t.uniquePaths,o):t.selectedJenis==4?S([],t.selectedJenis,t.uniquePaths,o):$("#mockup").addClass("d-none"));const m={"PVC Board":()=>{$("#category-container").addClass("d-none"),$(".category-modal-container").text("Tidak ada kategori")},Wallboard:()=>P("Motif"),"UV Board":()=>P("Motif"),Wallpanel:()=>P("Motif"),Aksesoris:()=>P("Ukuran"),default:()=>P("Kategori")};(m[l]||m.default)();let d='<li class="nav-item font-poppins">';n.length>0?n.forEach(g=>{d+=`
                <a class="nav-link text-white category-filter d-flex align-items-center justify-content-start" 
                   href="#" data-jenis-id="${g.jenis_id}" data-id="${g.id}" data-type="${g.type_id}">
                    <img src="${g.path?"storage/"+g.path:"dist/img/product/1.webp"}" alt="${g.name}" 
                         class="mr-2 img-thumbnail" style="width:50px;height:50px;object-fit:contain;">
                    <span class="text-capitalize">${g.name}</span>
                </a>`}):d+='<a class="nav-link text-white category-filter" href="#">Tanpa Kategori</a>',d+="</li>",o?$("#category-menu-item, #category-menu-item-modal").html("tidak ada kategori"):$("#category-menu-item, #category-menu-item-modal").html(d),!t.category&&n.length>0?(console.log("auto choose category"),t.category=n[0].id,R(t.category),A(),setTimeout(()=>{w()},200)):t.category&&$(`.category-filter[data-id="${t.category}"]`).addClass("active")}function P(e){$("#category-menu-item-label, #category-modal-item-label").html(e)}let I=!1;function Q(e){$(document).off("click",".category-filter"),$(document).on("click",".category-filter",async function(o){if(o.preventDefault(),I)return;I=!0;const n=$(this).data("id"),a=$(this).data("type");console.log(a);try{q({selectedJenis:e,category:n,type:a}),R(n),$("#filterModal").modal("hide"),A(),await w(!1)}catch(l){console.error("Gagal memuat data:",l)}finally{I=!1}})}function T(e,o="#modalVariants"){if($(o).empty(),$("#modalPaket").empty(),Array.isArray(e)&&e.length>0){let n=!1,a=!1;e.forEach(l=>{const c=l.variant_values||[],m=l.name.toLowerCase();if(m==="warna")n=!0,$("#paket").text("Warna"),c.length>0?c.forEach(d=>{l.pivot&&d.id===l.pivot.variant_value_id&&$("#modalPaket").append(`
                                <span class="badge badge-outline-primary px-2 py-1 kepadatan" data-value="${d.name}">
                                    ${d.name}
                                </span>
                            `)}):$("#modalPaket").append('<span class="text-muted">Tidak ada data</span>');else if(m==="density")a=!0,$("#paket").text("Density"),c.length>0?c.forEach(d=>{l.pivot&&d.id===l.pivot.variant_value_id&&$("#modalPaket").append(`
                                <span class="badge badge-outline-primary px-2 py-1 kepadatan" data-value="${d.name}">
                                    ${d.name}
                                </span>
                            `)}):$("#modalPaket").append('<span class="text-muted">Tidak ada data</span>');else{const d=c.find(p=>l.pivot&&p.id===l.pivot.variant_value_id),r=d?d.name:"-";let s="";["panjang","tinggi","lebar"].includes(m)?s=" cm":m==="ketebalan"&&(s=" mm");const i=`
                    <div class="row mb-1 variant-row">
                        <div class="col-4 col-sm-3 font-weight-bold">${l.name}</div>
                        <div class="col-auto">:</div>
                        <div class="col">${r}${s}</div>
                    </div>
                `;$(o).append(i)}}),!n&&!a?$(".paket").hide():$(".paket").show()}else $(o).append('<div class="text-muted">Tidak ada varian</div>'),$(".paket").hide()}function J(e=null){$(window).width()<768?$("#filter-container").addClass("d-none"):$("#filter-container").removeClass("d-none"),(e==1||e==3)&&($("#filter-container").addClass("d-none"),$("#catalog-col").removeClass("col-md-10").addClass("col-md-12"))}$(document).ready(function(){const e=new URLSearchParams(window.location.search),o=e.get("jenis"),n=e.get("category");let a,l,c=!1;(o==5||o==2)&&sessionStorage.removeItem("selectedWallpanel"),q({selectedJenis:o,category:n}),w(),o&&($("#category-container").removeClass("d-md-none"),$("#catalog-col").removeClass("center-content")),J(o),$(window).on("resize",()=>J(o)),$("#search-input").on("input",function(){clearTimeout(a),a=setTimeout(()=>{A(),w()},500)}),$(window).on("scroll",function(){clearTimeout(l),l=setTimeout(async()=>{if(c||z())return;const r=$(window).scrollTop(),s=$(window).height(),i=$(document).height();if(r+s>=i-150){c=!0;try{D(!1),await w()}finally{c=!1}}},200)});function m(r,s=[],i=""){$("#carousel-product-image").empty(),$("#thumbnailGallery").empty();let p=r||[];(i==null?void 0:i.toLowerCase())==="uv board"&&s.length&&(p=[...r,...s]),p.forEach((h,g)=>{const v=g===0?"active":"";$("#carousel-product-image").append(`
                <div class="carousel-item ${v}">
                    <img src="${h}" class="img-fluid d-block mx-auto"
                        style="width:100%;max-width:400px;aspect-ratio:1/1;object-fit:cover;border-radius:8px;border:1px solid #ccc;">
                </div>
            `),$("#thumbnailGallery").append(`
                <div class="col-2 mb-0 d-flex justify-content-center">
                    <div style="height:90%">
                        <img src="${h}" 
                            class="img-thumbnail thumbnail-image p-0 w-100 h-100"
                            style="aspect-ratio:1/1;border:1px solid #ccc;border-radius:8px;object-fit:cover;cursor:pointer;"
                            data-index="${g}">
                    </div>
                </div>
            `)}),p.length<=1?$("#carouselProduct .carousel-control-next, #carouselProduct .carousel-control-prev").addClass("d-none"):$("#carouselProduct .carousel-control-next, #carouselProduct .carousel-control-prev").removeClass("d-none"),$("#carouselProduct").carousel({interval:3e3,pause:!1});let u;$("#thumbnailGallery").off("click").on("click",".thumbnail-image",function(){const h=$(this).data("index");$("#carouselProduct").carousel(h),$(".thumbnail-image").removeClass("active-thumbnail"),$(this).addClass("active-thumbnail"),setTimeout(()=>$(this).removeClass("active-thumbnail"),500),$("#carouselProduct").carousel("pause"),clearTimeout(u),u=setTimeout(()=>{$("#carouselProduct").carousel("cycle")},5e3)})}$(document).on("click",".product-card",function(){const r=$(this).data("id"),s=$(this).data("code"),i=$(this).data("category"),p=$(this).data("type"),u=$(this).data("jenis"),h=parseInt($(this).data("length"),10),g=parseFloat($(this).data("width")).toFixed(1),v=parseFloat($(this).data("density")).toFixed(1),C=$(this).data("url"),f=JSON.parse($(this).attr("data-variants")||"[]"),x=$(this).attr("data-images"),k=JSON.parse($(this).attr("data-paket")||"[]");let j=$(this).data("height"),L=$(this).data("type-image"),b=[],M=[];if(x)try{b=JSON.parse(x.replace(/&quot;/g,'"'))}catch{b=[]}if(Array.isArray(k)&&(M=k.sort((y,V)=>y.order-V.order).map(y=>`/storage/${y.image}`)),$("#modalPaket").empty(),u==="tipe-wallpanel"){A(),q({selectedJenis:3,type:p}),D(!1),w(),J(),$("#catalog-col").toggleClass("col-md-10 col-md-12");return}u.toLowerCase()==="uv board"&&(d(r),T(f),$("#modalVideo, .lebar").hide(),$("#modalCategory").text(i),$("#modalKepadatan").html(`
                <span class="">0.9</span>
            `),k.length>0?k.sort((y,V)=>y.order-V.order).map(y=>{$("#modalPaket").append(`
                        <span class="badge badge-outline-primary px-2 py-1 kepadatan" data-value="${y.name}">${y.name}</span>
                    `)}):($("#modalPaket").append('<span class="text-muted">Tidak ada paket</span>'),$("#notes").hide())),u.toLowerCase()==="wallboard"&&(d(r),T(f),$("#modalCategory").text(i),$("#ketebalan, #kepadatan, #notes, .paket,  #modalVideo, .lebar").hide()),u==="PVC Board"&&(d(r),$("#modalCategory").text(u),$("#modalVideo, .lebar").hide(),T(f)),u==="Wallpanel"&&(d(r),T(f),$("#modalContact").data("type",p),$("#modalCategory").text(i+" / "+p),$("#ketebalan, #kepadatan, .paket, #modalVideo, #notes").hide(),$("#modalGrafis").attr("src",`/storage/${L}`),$(".grafis").removeClass("d-none")),console.log("Variants:",f),u.toLowerCase()==="aksesoris"&&(d(r),$("#tinggi, #ketebalan, #kepadatan, .lebar").hide(),$("#modalCategory").text(i),T(f),$("#modalVideoPlayer").empty(),$("#modalVideo").hide(),C&&($("#modalVideoPlayer").append(`
                    <iframe class="embed-responsive-item"
                    src="${C}"
                    title="YouTube video player" frameborder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; web-share;"
                    referrerpolicy="strict-origin-when-cross-origin"
                    allowfullscreen></iframe>
                `),$("#modalVideo").show())),m(b,M,u),$("#modalCode").text(s),$("#productModalLabel").text(s),$("#modalDownload").data("id",r),$("#productModal").modal("show"),$("#modalContact").data({jenis:u,category:i,code:s,length:h,width:g,height:j,density:v,type:p}),$(".kepadatan").removeClass("active"),$("#modalContact").data({kepadatan:null,paket:null}),$(".modalContact").prop("disabled",$(".kepadatan").length>0)}),$(document).on("click",".kepadatan",function(){$(".modalContact").prop("disabled",!1);const r=$(this).data("value");$(this).closest("#productModal").find(".kepadatan").removeClass("active"),$(this).addClass("active"),$("#notes").hide(),$("#modalContact").data("kepadatan",r)}),Q(o),W(),F(),H();function d(r){$.ajax({url:`/products/${r}/viewed`,method:"POST",headers:{"X-CSRF-TOKEN":$('meta[name="csrf-token"]').attr("content")},success:s=>console.log("View recorded:",s),error:s=>console.error(s)})}});
