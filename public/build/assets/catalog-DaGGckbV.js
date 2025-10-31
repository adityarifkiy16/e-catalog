function H(){$("#loading").removeClass("d-none")}function U(){$("#loading").addClass("d-none")}function W(t){return t.slice().sort((o,e)=>(e.type==="motif")-(o.type==="motif")).map(o=>"/storage/"+o.path)}function E(){$(document).off("click",".modalDownload").on("click",".modalDownload",function(t){t.preventDefault();const o=$(this).data("id"),e="catalog/pdf/product?id="+encodeURIComponent(o);N(this,e)}),$(document).off("click","#btn-download").on("click","#btn-download",function(t){t.preventDefault();const o=$(".category-filter-download:checked").map(function(){return $(this).val()}).get();if(o.length===0){alert("Pilih minimal satu kategori untuk diunduh.");return}const a=`catalog/pdf?${o.map(d=>`category[]=${encodeURIComponent(d)}`).join("&")}`;N(this,a)})}function N(t,o){const e=$(t);e.prop("disabled",!0).html('<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Mengunduh...'),window.open(o,"_blank"),setTimeout(()=>{e.prop("disabled",!1).html('<i class="fa fa-file-download"></i> Download')},5e3)}function D(){$(document).off("click",".modalContact").on("click",".modalContact",function(t){t.preventDefault(),console.log("Klik tombol order",$(this).data("code"));const o="62816659688",e=$(this).data("jenis");console.log(e.toLowerCase());let a="";e.toLowerCase()=="wallpanel"?a=`Halo Admin,
Saya tertarik dengan produk berikut:

• Tipe Wallpanel: *${$(this).data("type")}*
• Kode : *${$(this).data("code")}*
• panjang : *${$(this).data("length")} cm*
• tinggi : *${$(this).data("height")} cm*
• lebar : *${$(this).data("width")} cm*
• Produk : *${$(this).data("jenis")}*
• Kategori: *${$(this).data("category")}*

Apakah produk ini masih tersedia? Terima kasih.`:e.toLowerCase()=="pvc board"?a=`Halo Admin,
Saya tertarik dengan produk berikut:

• Produk : *${$(this).data("jenis")}*
• Ketebalan : *${$(this).data("code")}*
• density: *${$(this).data("kepadatan")??"-"}*

Apakah produk ini masih tersedia? Terima kasih.`:e.toLowerCase()=="uv board"?a=`Halo Admin,
Saya tertarik dengan produk berikut:

• Kode Motif : *${$(this).data("code")}*
• Produk : *${$(this).data("jenis")}*
• Kategori: *${$(this).data("category")}*

• Paket: *${$(this).data("kepadatan")??"-"}*

Apakah produk ini masih tersedia? Terima kasih.`:e.toLowerCase()=="aksesoris"?a=`Halo Admin,
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

Apakah produk ini masih tersedia? Terima kasih.`,window.open(`https://wa.me/${o}?text=${encodeURIComponent(a)}`,"_blank")})}function B(){$(window).scroll(function(){$(this).scrollTop()>100?$("#btn-scroll-top").fadeIn():$("#btn-scroll-top").fadeOut()}),$("#btn-scroll-top").click(function(){return $("html, body").animate({scrollTop:0},500),!1})}function Y(t,o){$("#btn-download").removeClass("d-none");let e="";t.forEach(a=>{var u,l,f,v,P,b,y,T,k,j,J,w;const d=a.photo?`/storage/${a.photo}`:"https://via.placeholder.com/300x200?text=No+Image",n=W(a.images),p=[d,...n],h=JSON.stringify(p).replace(/"/g,"&quot;"),c=JSON.stringify(a.packages).replace(/"/g,"&quot;"),i=((u=a.category)==null?void 0:u.name)??"Tanpa Kategori";((l=a.category)==null?void 0:l.display_style)==="square"||o===null?e+=`
                    <div class="col-md-2 col-6 mb-4">
                        <div class="h-100 product-card"
                    `:((f=a.category)==null?void 0:f.display_style)==="rectangle"?e+=`
                    <div class="col-md-4 col-6 mb-4">
                        <div class="h-100 product-card"
                    `:e+=`
                    <div class="col-md-2 col-6 mb-4">
                        <div class="h-100 product-card d-flex flex-column justify-content-center align-items-center"
                    `;const r=((v=a.category)==null?void 0:v.display_style)==="rectangle",m=JSON.stringify(a.specifications).replace(/"/g,"&quot;");e+=`
                    data-id="${a.id}"
                    data-code="${a.code}"
                    data-name="${a.name}"
                    data-category="${i}"
                    data-jenis="${((b=(P=a.category)==null?void 0:P.jenis)==null?void 0:b.name)??""}"
                    data-images="${h}"
                    data-image="${d}"
                    data-type="${((T=(y=a.category)==null?void 0:y.types)==null?void 0:T.name)??""}"
                    data-type-image="${((j=(k=a.category)==null?void 0:k.types)==null?void 0:j.image)??""}"
                    data-url="${a.url_video}"
                    data-paket="${c}"
                    data-specifications = "${m}"
                    >
                       <img 
                            src="${d}" 
                            class="card-img-top" 
                            alt="${a.name}" 
                            style="
                                border : 1px solid #2c2c2c;
                                min-height: 10rem;
                                height: auto; 
                                border-radius: 8px;
                                width: 100%; 
                                object-fit: cover; 
                                object-position: ${((w=(J=a.category)==null?void 0:J.jenis)==null?void 0:w.name)==="PVC Board"?"bottom center":"center center"};
                                aspect-ratio: ${r?"16/9":"1/1"};
                            "
                        >
                        <div class="card-body d-flex flex-column text-center">
                            <h4 class="card-title font-weight-bold text-uppercase mb-2">
                                ${a.name}
                            </h4>
                            <h6 class="card-text text-muted mb-1">${i}</h6>
                        </div>
                    </div>
                </div>`}),$("#product-list .row").append(e)}function z(t,o){$("#btn-download").addClass("d-none");let e="";t.forEach(a=>{const d=a.thumbnail?`/storage/${a.thumbnail}`:"https://via.placeholder.com/300x200?text=No+Image",n=o==3?"wallpanel":"tanpa kategori";e+=`
                    <div class="col-md-2 col-6 mb-4">
                        <div class="h-100 product-card d-flex flex-column justify-content-center align-items-center"
                    `,e+=`
                    data-id="${a.id}"
                    data-jenis="card-types"
                    data-category="${n}"
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
                            <h6 class="card-text text-muted mb-1">${n}</h6>
                        </div>
                    </div>
                </div>`}),$("#product-list .row").append(e)}function A(t,o,e,a=!1){if(o==null)return;t.forEach(i=>{i.images&&i.images.forEach(r=>{r.path&&e.add(r.path)}),i.path&&e.add(i.path)});const d=Array.from(e),n=$("#mockup-carousel-inner"),p=$("#mockup-carousel-indicators"),h=["https://www.youtube.com/embed/BiiUrYAbL9s?autoplay=1&mute=1&rel=0&controls=0&amp;loop=1&playlist=BiiUrYAbL9s"],c=[];for(let i=1;i<=6;i++)i!==2&&c.push(`/dist/img/wpc/${i}.webp?v=${Date.now()}`);if(n.empty(),p.empty(),o==4){$("#mockup-carousel").carousel({interval:!1}),$("#mockup .carousel-control-next").addClass("d-none"),$("#mockup .carousel-control-prev").addClass("d-none"),h.forEach((i,r)=>{n.append(`
            <div class="carousel-item ${r===0?"active":""}">
                <div class="d-flex justify-content-center align-items-center">
                    <div class="embed-responsive embed-responsive-16by9 rounded-lg" style="width:100%;">
                        <iframe
                            class="embed-responsive-item"
                            src="${i}"
                            title="YouTube video player"
                            frameborder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; web-share"
                            allowfullscreen
                        ></iframe>
                    </div>
                </div>
            </div>
        `)}),$("#mockup").removeClass("d-none");return}else if(o==3&&a){$("#mockup-carousel").carousel({interval:3e3}),$("#mockup .carousel-control-next").removeClass("d-none"),$("#mockup .carousel-control-prev").removeClass("d-none"),c.forEach((i,r)=>{n.append(`
            <div class="carousel-item ${r===0?"active":""}">
                <div class="d-flex justify-content-center align-items-center">
                    <img src="${i}" 
                        alt="mockup" 
                        class="img-fluid w-100 rounded-3 d-block mx-auto mockup-image"
                    >
                </div>
            </div>
        `),p.append(`
            <li data-bs-target="#mockup-carousel" data-bs-slide-to="${r}" ${r===0?'class="active"':""}></li>
        `)}),$("#mockup").removeClass("d-none");return}d.length>0?(d.length===1?($("#mockup .carousel-control-next").addClass("d-none"),$("#mockup .carousel-control-prev").addClass("d-none"),p.addClass("d-none")):($("#mockup .carousel-control-next").removeClass("d-none"),$("#mockup .carousel-control-prev").removeClass("d-none"),p.removeClass("d-none")),d.forEach((i,r)=>{n.append(`
                <div class="carousel-item ${r===0?"active":""}">
                    <img src="/storage/${i}" alt="mockup" 
                        class="img-fluid w-100 rounded-lg d-block mx-auto mockup-image"
                    >
                </div>
            `),p.append(`
                <li data-target="#mockup-carousel" data-slide-to="${r}" ${r===0?'class="active"':""}></li>
            `)}),$("#mockup").removeClass("d-none")):$("#mockup").addClass("d-none")}let K=!1;function F(t){$(document).off("click",".category-filter"),$(document).on("click",".category-filter",async function(o){if(o.preventDefault(),K)return;K=!0;const e=$(this).data("id"),a=$(this).data("type");try{R({selectedJenis:t,category:e,type:a}),$("#filterModal").modal("hide"),V(),await x(!1)}catch(d){console.error("Gagal memuat data:",d)}finally{K=!1}})}function C(t,o="#modalVariants"){$(o).empty(),$("#modalPaket").empty(),$("#modalKepadatan").empty(),Array.isArray(t)&&t.length>0?t.forEach(e=>{const a=e.specification_values||[],d=e.name.toLowerCase();if(d==="warna")$("#paket").text("Warna"),a.length>0?a.forEach(n=>{e.pivot&&n.id===e.pivot.specification_value_id&&$("#modalPaket").append(`
                                <span class="badge badge-outline-primary px-2 py-1 kepadatan" data-value="${n.name}">
                                    ${n.name}
                                </span>
                            `)}):$("#modalPaket").append('<span class="text-muted">Tidak ada data</span>');else if(d==="density")a.length>0?a.forEach(n=>{e.pivot&&n.id===e.pivot.specification_value_id&&(a.length>1?$("#modalKepadatan").append(`
                                    <span class="badge badge-outline-primary px-2 py-1 kepadatan" data-value="${n.name}">
                                        ${n.name}
                                    </span>
                                `):$("#modalKepadatan").append(n.name))}):$("#modalKepadatan").append('<span class="text-muted">Tidak ada data</span>');else{const n=a.find(i=>e.pivot&&i.id===e.pivot.specification_value_id),p=n?n.name:"-";let h=n?n.unit:"";h?h=" "+h:["panjang","tinggi","lebar"].includes(d)?h=" cm":d==="ketebalan"&&(h=" mm");const c=`
                    <div class="row mb-1 variant-row">
                        <div class="col-4 col-sm-3 font-weight-bold">${e.name}</div>
                        <div class="col-auto">:</div>
                        <div class="col">${p}${h}</div>
                    </div>
                `;$(o).append(c)}}):($(o).append('<div class="text-muted">Tidak ada varian</div>'),$(".paket").hide())}function q({selectedJenis:t=null,hasCategory:o=!1,isRenderTypes:e=!1}){const a=$("#filter-container"),d=$("#category-container"),n=$("#catalog-col"),p=$(window).width()<768;if(a.removeClass("d-none"),d.removeClass("d-none"),n.removeClass("col-md-12 col-md-9"),e){a.addClass("d-none"),d.addClass("d-none"),n.addClass("col-md-12");return}if(t==1){a.addClass("d-none"),d.addClass("d-none"),n.addClass("col-md-12");return}if(!o){a.addClass("d-none"),d.addClass("d-none"),n.addClass("col-md-12");return}p?(a.addClass("d-none"),d.removeClass("d-none")):(a.removeClass("d-none"),d.removeClass("d-none")),n.addClass("col-md-9")}$(document).ready(function(){const t=new URLSearchParams(window.location.search),o=t.get("jenis"),e=t.get("category");let a,d,n=!1;R({selectedJenis:o,category:e}),x(),q({selectedJenis:o,hasCategory:e,isRenderTypes:!1}),$(window).on("resize",()=>q({selectedJenis:o,hasCategory:e,isRenderTypes:!1})),$("#search-input").on("input",function(){clearTimeout(a),a=setTimeout(()=>{V(),x()},500)}),$(window).on("scroll",function(){clearTimeout(d),d=setTimeout(async()=>{if(n||G())return;const c=$(window).scrollTop(),i=$(window).height(),r=$(document).height();if(c+i>=r-150){n=!0;try{I(!1),await x()}finally{n=!1}}},200)});function p(c,i=[],r=""){$("#carousel-product-image").empty(),$("#thumbnailGallery").empty();let m=c||[];(r==null?void 0:r.toLowerCase())==="uv board"&&i.length&&(m=[...c,...i]),m.forEach((l,f)=>{const v=f===0?"active":"";$("#carousel-product-image").append(`
                <div class="carousel-item ${v}">
                    <img src="${l}" class="img-fluid d-block mx-auto"
                        style="width:100%;max-width:400px;aspect-ratio:1/1;object-fit:cover;border-radius:8px;border:1px solid #ccc;">
                </div>
            `),$("#thumbnailGallery").append(`
                <div class="col-2 mb-0 d-flex justify-content-center">
                    <div style="height:90%">
                        <img src="${l}" 
                            class="img-thumbnail thumbnail-image p-0 w-100 h-100"
                            style="aspect-ratio:1/1;border:1px solid #ccc;border-radius:8px;object-fit:cover;cursor:pointer;"
                            data-index="${f}">
                    </div>
                </div>
            `)}),m.length<=1?$("#carouselProduct .carousel-control-next, #carouselProduct .carousel-control-prev").addClass("d-none"):$("#carouselProduct .carousel-control-next, #carouselProduct .carousel-control-prev").removeClass("d-none"),$("#carouselProduct").carousel({interval:3e3,pause:!1});let u;$("#thumbnailGallery").off("click").on("click",".thumbnail-image",function(){const l=$(this).data("index");$("#carouselProduct").carousel(l),$(".thumbnail-image").removeClass("active-thumbnail"),$(this).addClass("active-thumbnail"),setTimeout(()=>$(this).removeClass("active-thumbnail"),500),$("#carouselProduct").carousel("pause"),clearTimeout(u),u=setTimeout(()=>{$("#carouselProduct").carousel("cycle")},5e3)})}$(document).off("click",".product-card").on("click",".product-card",function(){const c=$(this).data("id"),i=$(this).data("code"),r=$(this).data("name"),m=$(this).data("category"),u=$(this).data("type"),l=$(this).data("jenis"),f=parseInt($(this).data("length"),10),v=parseFloat($(this).data("width")).toFixed(1),P=parseFloat($(this).data("density")).toFixed(1),b=$(this).data("url"),y=JSON.parse($(this).attr("data-specifications")||"[]"),T=$(this).attr("data-images"),k=JSON.parse($(this).attr("data-paket")||"[]");let j=$(this).data("height"),J=$(this).data("type-image"),w=[],S=[];if(l!=="card-types"&&h(c),T)try{w=JSON.parse(T.replace(/&quot;/g,'"'))}catch{w=[]}if(Array.isArray(k)&&(S=k.sort((g,L)=>g.order-L.order).map(g=>`/storage/${g.image}`)),$("#notes").show(),$("#modalPaket").empty(),l==="card-types"){V(),R({selectedJenis:o,type:u}),I(!1),x();return}l.toLowerCase()==="uv board"&&(C(y),$("#modalVideo, .lebar").hide(),$("#modalCategory").text(m),k.length>0?k.sort((g,L)=>g.order-L.order).map(g=>{$("#modalPaket").append(`
                        <span class="badge badge-outline-primary px-2 py-1 kepadatan" data-value="${g.name}">${g.name}</span>
                    `)}):($("#modalPaket").append('<span class="text-muted">Tidak ada paket</span>'),$("#notes").hide())),l.toLowerCase()==="wallboard"&&(C(y),$("#modalCategory").text(m),$("#ketebalan, .density, #notes, .paket,  #modalVideo, .lebar").hide()),l==="PVC Board"&&(C(y),$("#modalCategory").text(l),$("#modalVideo, .lebar, .paket").hide()),l==="Wallpanel"&&(C(y),$("#modalContact").data("type",u),$("#modalCategory").text(m+" / "+u),$("#ketebalan, #kepadatan, .paket, #modalVideo, #notes, .density").hide(),$("#modalGrafis").attr("src",`/storage/${J}`),$(".grafis").removeClass("d-none")),l.toLowerCase()==="aksesoris"&&($("#tinggi, #ketebalan, #kepadatan, .lebar, .density").hide(),$("#modalCategory").text(m),C(y),$("#modalVideoPlayer").empty(),$("#modalVideo, .density").hide(),b&&($("#modalVideoPlayer").append(`
                    <iframe class="embed-responsive-item"
                    src="${b}"
                    title="YouTube video player" frameborder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; web-share;"
                    referrerpolicy="strict-origin-when-cross-origin"
                    allowfullscreen></iframe>
                `),$("#modalVideo").show())),p(w,S,l),$("#modalName").text(r),$("#productModalLabel").text(r),$("#modalDownload").data("id",c),$("#productModal").modal("show"),$("#modalContact").data({jenis:l,category:m,code:i,length:f,width:v,height:j,density:P,type:u}),$(".kepadatan").removeClass("active"),$("#modalContact").data({kepadatan:null,paket:null}),$(".modalContact").prop("disabled",$(".kepadatan").length>0)}),$(document).on("click",".kepadatan",function(){$(".modalContact").prop("disabled",!1);const c=$(this).data("value");$(this).closest("#productModal").find(".kepadatan").removeClass("active"),$(this).addClass("active"),$("#notes").hide(),$("#modalContact").data("kepadatan",c)}),F(o),E(),D(),B();function h(c){$.ajax({url:`/products/${c}/viewed`,method:"POST",headers:{"X-CSRF-TOKEN":$('meta[name="csrf-token"]').attr("content")},success:i=>console.log("View recorded:",i),error:i=>console.error(i)})}});let s={selectedJenis:null,category:null,type:null,currentPage:1,isLoading:!1,lastPage:!1,firstLoad:!0,currentRequest:null,uniquePaths:new Set};function I(t){s.firstLoad=t}function R(t){s.selectedJenis=t.selectedJenis,s.category=t.category??null,s.type=t.type??null}function G(){return s.isLoading}function V(){s.currentPage=1,s.isLoading=!1,s.lastPage=!1,s.uniquePaths.clear(),$("#product-list .row").html("")}function x(){if(s.isLoading||s.lastPage)return Promise.resolve();s.isLoading=!0,H();const t=$("#search-input").val();s.currentRequest&&s.currentRequest.readyState!==4&&s.currentRequest.abort();const o={page:s.currentPage,search:t,jenis:s.selectedJenis,category:s.category,type:s.type};return s.currentRequest=$.ajax({url:"/catalog",type:"GET",data:o}),new Promise((e,a)=>{s.currentRequest.done(d=>X(d)).fail((d,n)=>{n!=="abort"&&(console.error("Gagal memuat data."),a())}).always(()=>{s.isLoading=!1,U(),s.currentRequest=null}).then(e)})}function X(t){const o=t.data.data??[],e=t.types??[];s.type&&($("#backButton").removeClass("d-none"),$("#homeButton").addClass("d-none")),s.selectedJenis&&s.firstLoad&&e.length>0?(e.length>0&&($("#search-form").addClass("d-none"),z(e,s.selectedJenis),s.lastPage=!0),O(t,!0)):(o.length>0?(Y(o,s.selectedJenis),s.currentPage++,s.currentPage>t.data.last_page&&(s.lastPage=!0)):(s.currentPage===1&&($("#mockup").addClass("d-none"),$("#product-list .row").append(`<div class="col-12"><img src="dist/img/no-data.png" alt="no-data"
                     class="img-fluid mx-auto d-block" style="max-width:100%;height:auto;margin:100px 0;"></div>`)),s.lastPage=!0),O(t,!1))}function O(t,o=!0){var r,m,u,l,f,v,P,b;const e=t.category??[],a=((u=(m=(r=t.data.data[0])==null?void 0:r.category)==null?void 0:m.types)==null?void 0:u.images)??[],d=(l=t.jenis)==null?void 0:l.name,n=((v=(f=t.data.data[0])==null?void 0:f.category)==null?void 0:v.images)??[],p=s.firstLoad&&(((P=t.types)==null?void 0:P.length)??0)>0,h=(((b=t.category)==null?void 0:b.length)??0)>0;q({selectedJenis:s.selectedJenis,hasCategory:h,isRenderTypes:p}),e.length===0?$("#category-container").addClass("d-none"):($("#category-container").removeClass("d-none"),a.length>0?A(a,s.selectedJenis,s.uniquePaths,o):n.length>0?A(n,s.selectedJenis,s.uniquePaths,o):s.selectedJenis==3?A([],s.selectedJenis,s.uniquePaths,o):s.selectedJenis==4?A([],s.selectedJenis,s.uniquePaths,o):$("#mockup").addClass("d-none")),ee(d);const c=Z(e),i=Q(e);o?$("#category-menu-item, #category-menu-item-modal").html("tidak ada kategori"):($("#category-menu-item, #category-menu-item-modal").html(c),$("#pdf-catalog").html(i)),!s.category&&e.length>0?(s.category=e[0].id,V(),setTimeout(()=>{x()},200)):s.category&&$(`.category-filter[data-id="${s.category}"]`).addClass("active")}function M(t){$("#category-menu-item-label, #category-modal-item-label").html(t)}function Q(t){return t.length===0?`
            <div class="row font-poppins">
                <div class="col-12 mb-2">
                    <div class="text-white rounded py-2 px-3">
                        <input type="checkbox" class="custom-control-input" id="no-cat" disabled>
                        <label class="custom-control-label" for="no-cat">
                            Tanpa Kategori
                        </label>
                    </div>
                </div>
            </div>`:`<div class="row font-poppins">${t.map(e=>`
            <div class="col-6 col-md-4 mb-2">
                <div class="text-white rounded py-2 px-3">
                    <input type="checkbox" class="custom-control-input category-filter-download" 
                           id="cat-${e.id}" value="${e.id}">
                    <label class="custom-control-label" for="cat-${e.id}">
                        ${e.name}
                    </label>
                </div>
            </div>`).join("")}</div>`}function Z(t){return t.length===0?`
            <li class="nav-item font-poppins">
                <a class="nav-link text-white category-filter" href="#">Tanpa Kategori</a>
            </li>`:`<li class="nav-item font-poppins">${t.map(e=>`
            <a class="nav-link text-white category-filter d-flex align-items-center justify-content-start" 
               href="#" data-jenis-id="${e.jenis_id}" data-id="${e.id}" data-type="${e.type_id}">
                <img src="${e.path?"storage/"+e.path:"dist/img/product/1.webp"}"
                     alt="${e.name}"
                     class="mr-2 img-thumbnail"
                     style="width:50px;height:50px;object-fit:contain;">
                <span class="text-capitalize">${e.name}</span>
            </a>`).join("")}</li>`}function ee(t){const o={"PVC Board":()=>{$("#category-container").addClass("d-none"),$(".category-modal-container").text("Tidak ada kategori")},Wallboard:()=>M("Motif"),"UV Board":()=>M("Motif"),Wallpanel:()=>M("Motif"),Aksesoris:()=>M("Ukuran"),default:()=>M("Kategori")};(o[t]||o.default)()}function _({selectedJenis:t=null,hasCategory:o=!1,isRenderTypes:e=!1}){const a=$("#filter-container"),d=$("#category-container"),n=$("#catalog-col"),p=$(window).width()<768;if(a.removeClass("d-none"),d.removeClass("d-none"),n.removeClass("col-md-12 col-md-9"),e){a.addClass("d-none"),d.addClass("d-none"),n.addClass("col-md-12");return}if(t==1){a.addClass("d-none"),d.addClass("d-none"),n.addClass("col-md-12");return}if(!o){a.addClass("d-none"),d.addClass("d-none"),n.addClass("col-md-12");return}p?(a.addClass("d-none"),d.removeClass("d-none")):(a.removeClass("d-none"),d.removeClass("d-none")),n.addClass("col-md-9")}$(document).ready(function(){const t=new URLSearchParams(window.location.search),o=t.get("jenis"),e=t.get("category");let a,d,n=!1;R({selectedJenis:o,category:e}),x(),_({selectedJenis:o,hasCategory:e,isRenderTypes:!1}),$(window).on("resize",()=>_({selectedJenis:o,hasCategory:e,isRenderTypes:!1})),$("#search-input").on("input",function(){clearTimeout(a),a=setTimeout(()=>{V(),x()},500)}),$(window).on("scroll",function(){clearTimeout(d),d=setTimeout(async()=>{if(n||G())return;const c=$(window).scrollTop(),i=$(window).height(),r=$(document).height();if(c+i>=r-150){n=!0;try{I(!1),await x()}finally{n=!1}}},200)});function p(c,i=[],r=""){$("#carousel-product-image").empty(),$("#thumbnailGallery").empty();let m=c||[];(r==null?void 0:r.toLowerCase())==="uv board"&&i.length&&(m=[...c,...i]),m.forEach((l,f)=>{const v=f===0?"active":"";$("#carousel-product-image").append(`
                <div class="carousel-item ${v}">
                    <img src="${l}" class="img-fluid d-block mx-auto"
                        style="width:100%;max-width:400px;aspect-ratio:1/1;object-fit:cover;border-radius:8px;border:1px solid #ccc;">
                </div>
            `),$("#thumbnailGallery").append(`
                <div class="col-2 mb-0 d-flex justify-content-center">
                    <div style="height:90%">
                        <img src="${l}" 
                            class="img-thumbnail thumbnail-image p-0 w-100 h-100"
                            style="aspect-ratio:1/1;border:1px solid #ccc;border-radius:8px;object-fit:cover;cursor:pointer;"
                            data-index="${f}">
                    </div>
                </div>
            `)}),m.length<=1?$("#carouselProduct .carousel-control-next, #carouselProduct .carousel-control-prev").addClass("d-none"):$("#carouselProduct .carousel-control-next, #carouselProduct .carousel-control-prev").removeClass("d-none"),$("#carouselProduct").carousel({interval:3e3,pause:!1});let u;$("#thumbnailGallery").off("click").on("click",".thumbnail-image",function(){const l=$(this).data("index");$("#carouselProduct").carousel(l),$(".thumbnail-image").removeClass("active-thumbnail"),$(this).addClass("active-thumbnail"),setTimeout(()=>$(this).removeClass("active-thumbnail"),500),$("#carouselProduct").carousel("pause"),clearTimeout(u),u=setTimeout(()=>{$("#carouselProduct").carousel("cycle")},5e3)})}$(document).off("click",".product-card").on("click",".product-card",function(){const c=$(this).data("id"),i=$(this).data("code"),r=$(this).data("name"),m=$(this).data("category"),u=$(this).data("type"),l=$(this).data("jenis"),f=parseInt($(this).data("length"),10),v=parseFloat($(this).data("width")).toFixed(1),P=parseFloat($(this).data("density")).toFixed(1),b=$(this).data("url"),y=JSON.parse($(this).attr("data-specifications")||"[]"),T=$(this).attr("data-images"),k=JSON.parse($(this).attr("data-paket")||"[]");let j=$(this).data("height"),J=$(this).data("type-image"),w=[],S=[];if(l!=="card-types"&&h(c),T)try{w=JSON.parse(T.replace(/&quot;/g,'"'))}catch{w=[]}if(Array.isArray(k)&&(S=k.sort((g,L)=>g.order-L.order).map(g=>`/storage/${g.image}`)),$("#notes").show(),$("#modalPaket").empty(),l==="card-types"){V(),R({selectedJenis:o,type:u}),I(!1),x();return}l.toLowerCase()==="uv board"&&(C(y),$("#modalVideo, .lebar").hide(),$("#modalCategory").text(m),k.length>0?k.sort((g,L)=>g.order-L.order).map(g=>{$("#modalPaket").append(`
                        <span class="badge badge-outline-primary px-2 py-1 kepadatan" data-value="${g.name}">${g.name}</span>
                    `)}):($("#modalPaket").append('<span class="text-muted">Tidak ada paket</span>'),$("#notes").hide())),l.toLowerCase()==="wallboard"&&(C(y),$("#modalCategory").text(m),$("#ketebalan, .density, #notes, .paket,  #modalVideo, .lebar").hide()),l==="PVC Board"&&(C(y),$("#modalCategory").text(l),$("#modalVideo, .lebar, .paket").hide()),l==="Wallpanel"&&(C(y),$("#modalContact").data("type",u),$("#modalCategory").text(m+" / "+u),$("#ketebalan, #kepadatan, .paket, #modalVideo, #notes, .density").hide(),$("#modalGrafis").attr("src",`/storage/${J}`),$(".grafis").removeClass("d-none")),l.toLowerCase()==="aksesoris"&&($("#tinggi, #ketebalan, #kepadatan, .lebar, .density").hide(),$("#modalCategory").text(m),C(y),$("#modalVideoPlayer").empty(),$("#modalVideo, .density").hide(),b&&($("#modalVideoPlayer").append(`
                    <iframe class="embed-responsive-item"
                    src="${b}"
                    title="YouTube video player" frameborder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; web-share;"
                    referrerpolicy="strict-origin-when-cross-origin"
                    allowfullscreen></iframe>
                `),$("#modalVideo").show())),p(w,S,l),$("#modalName").text(r),$("#productModalLabel").text(r),$("#modalDownload").data("id",c),$("#productModal").modal("show"),$("#modalContact").data({jenis:l,category:m,code:i,length:f,width:v,height:j,density:P,type:u}),$(".kepadatan").removeClass("active"),$("#modalContact").data({kepadatan:null,paket:null}),$(".modalContact").prop("disabled",$(".kepadatan").length>0)}),$(document).on("click",".kepadatan",function(){$(".modalContact").prop("disabled",!1);const c=$(this).data("value");$(this).closest("#productModal").find(".kepadatan").removeClass("active"),$(this).addClass("active"),$("#notes").hide(),$("#modalContact").data("kepadatan",c)}),F(o),E(),D(),B();function h(c){$.ajax({url:`/products/${c}/viewed`,method:"POST",headers:{"X-CSRF-TOKEN":$('meta[name="csrf-token"]').attr("content")},success:i=>console.log("View recorded:",i),error:i=>console.error(i)})}});
