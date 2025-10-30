let _=null;function B(t){_=t}function W(){return _}function Y(){$("#loading").removeClass("d-none")}function z(){$("#loading").addClass("d-none")}function X(t){return t.slice().sort((o,a)=>(a.type==="motif")-(o.type==="motif")).map(o=>"/storage/"+o.path)}function D(){$(document).off("click",".modalDownload").on("click",".modalDownload",function(t){t.preventDefault();const o=$(this).data("id"),a="catalog/pdf/product?id="+encodeURIComponent(o);N(this,a)}),$(document).off("click","#btn-download").on("click","#btn-download",function(t){t.preventDefault(),N(this,"catalog/pdf?category="+encodeURIComponent(W()))})}function N(t,o){const a=$(t);a.prop("disabled",!0).html('<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Mengunduh...'),window.open(o,"_blank"),setTimeout(()=>{a.prop("disabled",!1).html('<i class="fa fa-file-download"></i> Download')},5e3)}function F(){$(document).off("click",".modalContact").on("click",".modalContact",function(t){t.preventDefault(),console.log("Klik tombol order",$(this).data("code"));const o="62816659688",a=$(this).data("jenis");console.log(a.toLowerCase());let e="";a.toLowerCase()=="wallpanel"?e=`Halo Admin,
Saya tertarik dengan produk berikut:

• Tipe Wallpanel: *${$(this).data("type")}*
• Kode : *${$(this).data("code")}*
• panjang : *${$(this).data("length")} cm*
• tinggi : *${$(this).data("height")} cm*
• lebar : *${$(this).data("width")} cm*
• Produk : *${$(this).data("jenis")}*
• Kategori: *${$(this).data("category")}*

Apakah produk ini masih tersedia? Terima kasih.`:a.toLowerCase()=="pvc board"?e=`Halo Admin,
Saya tertarik dengan produk berikut:

• Produk : *${$(this).data("jenis")}*
• Ketebalan : *${$(this).data("code")}*
• density: *${$(this).data("kepadatan")??"-"}*

Apakah produk ini masih tersedia? Terima kasih.`:a.toLowerCase()=="uv board"?e=`Halo Admin,
Saya tertarik dengan produk berikut:

• Kode Motif : *${$(this).data("code")}*
• Produk : *${$(this).data("jenis")}*
• Kategori: *${$(this).data("category")}*

• Paket: *${$(this).data("kepadatan")??"-"}*

Apakah produk ini masih tersedia? Terima kasih.`:a.toLowerCase()=="aksesoris"?e=`Halo Admin,
Saya tertarik dengan produk berikut:

• Kode : *${$(this).data("code")}*
• Produk : *${$(this).data("jenis")}*
• Ukuran : *${$(this).data("category")}*

• Warna : *${$(this).data("kepadatan")}*

Apakah produk ini masih tersedia? Terima kasih.`:e=`Halo Admin,
Saya tertarik dengan produk berikut:

• Kode Motif : *${$(this).data("code")}*
• Produk : *${$(this).data("jenis")}*
• Kategori: *${$(this).data("category")}*

Apakah produk ini masih tersedia? Terima kasih.`,window.open(`https://wa.me/${o}?text=${encodeURIComponent(e)}`,"_blank")})}function G(){$(window).scroll(function(){$(this).scrollTop()>100?$("#btn-scroll-top").fadeIn():$("#btn-scroll-top").fadeOut()}),$("#btn-scroll-top").click(function(){return $("html, body").animate({scrollTop:0},500),!1})}function Q(t,o){$("#btn-download").removeClass("d-none");let a="";t.forEach(e=>{var g,r,y,k,P,b,p,T,v,j,J,w;const i=e.photo?`/storage/${e.photo}`:"https://via.placeholder.com/300x200?text=No+Image",d=X(e.images),u=[i,...d],f=JSON.stringify(u).replace(/"/g,"&quot;"),c=JSON.stringify(e.packages).replace(/"/g,"&quot;"),n=((g=e.category)==null?void 0:g.name)??"Tanpa Kategori";((r=e.category)==null?void 0:r.display_style)==="square"||o===null?a+=`
                    <div class="col-md-2 col-6 mb-4">
                        <div class="h-100 product-card"
                    `:((y=e.category)==null?void 0:y.display_style)==="rectangle"?a+=`
                    <div class="col-md-4 col-6 mb-4">
                        <div class="h-100 product-card"
                    `:a+=`
                    <div class="col-md-2 col-6 mb-4">
                        <div class="h-100 product-card d-flex flex-column justify-content-center align-items-center"
                    `;const l=((k=e.category)==null?void 0:k.display_style)==="rectangle",m=JSON.stringify(e.specifications).replace(/"/g,"&quot;");a+=`
                    data-id="${e.id}"
                    data-code="${e.code}"
                    data-name="${e.name}"
                    data-category="${n}"
                    data-jenis="${((b=(P=e.category)==null?void 0:P.jenis)==null?void 0:b.name)??""}"
                    data-images="${f}"
                    data-image="${i}"
                    data-type="${((T=(p=e.category)==null?void 0:p.types)==null?void 0:T.name)??""}"
                    data-type-image="${((j=(v=e.category)==null?void 0:v.types)==null?void 0:j.image)??""}"
                    data-url="${e.url_video}"
                    data-paket="${c}"
                    data-specifications = "${m}"
                    >
                       <img 
                            src="${i}" 
                            class="card-img-top" 
                            alt="${e.name}" 
                            style="
                                border : 1px solid #2c2c2c;
                                min-height: 10rem;
                                height: auto; 
                                border-radius: 8px;
                                width: 100%; 
                                object-fit: cover; 
                                object-position: ${((w=(J=e.category)==null?void 0:J.jenis)==null?void 0:w.name)==="PVC Board"?"bottom center":"center center"};
                                aspect-ratio: ${l?"16/9":"1/1"};
                            "
                        >
                        <div class="card-body d-flex flex-column text-center">
                            <h4 class="card-title font-weight-bold text-uppercase mb-2">
                                ${e.name}
                            </h4>
                            <h6 class="card-text text-muted mb-1">${n}</h6>
                        </div>
                    </div>
                </div>`}),$("#product-list .row").append(a)}function Z(t,o){$("#btn-download").addClass("d-none");let a="";t.forEach(e=>{const i=e.thumbnail?`/storage/${e.thumbnail}`:"https://via.placeholder.com/300x200?text=No+Image",d=o==3?"wallpanel":"tanpa kategori";a+=`
                    <div class="col-md-2 col-6 mb-4">
                        <div class="h-100 product-card d-flex flex-column justify-content-center align-items-center"
                    `,a+=`
                    data-id="${e.id}"
                    data-jenis="card-types"
                    data-category="${d}"
                    data-type="${e.id}"
                    >
                       <img 
                            src="${i}" 
                            class="card-img-top" 
                            alt="${e.name}" 
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
                                ${e.name}
                            </h4>
                            <h6 class="card-text text-muted mb-1">${d}</h6>
                        </div>
                    </div>
                </div>`}),$("#product-list .row").append(a)}function M(t,o,a,e=!1){if(o==null)return;t.forEach(n=>{n.images&&n.images.forEach(l=>{l.path&&a.add(l.path)}),n.path&&a.add(n.path)});const i=Array.from(a),d=$("#mockup-carousel-inner"),u=$("#mockup-carousel-indicators"),f=["https://www.youtube.com/embed/BiiUrYAbL9s?autoplay=1&mute=1&rel=0&controls=0&amp;loop=1&playlist=BiiUrYAbL9s"],c=[];for(let n=1;n<=6;n++)n!==2&&c.push(`/dist/img/wpc/${n}.webp?v=${Date.now()}`);if(d.empty(),u.empty(),o==4){$("#mockup-carousel").carousel({interval:!1}),$("#mockup .carousel-control-next").addClass("d-none"),$("#mockup .carousel-control-prev").addClass("d-none"),f.forEach((n,l)=>{d.append(`
            <div class="carousel-item ${l===0?"active":""}">
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
        `)}),$("#mockup").removeClass("d-none");return}else if(o==3&&e){$("#mockup-carousel").carousel({interval:3e3}),$("#mockup .carousel-control-next").removeClass("d-none"),$("#mockup .carousel-control-prev").removeClass("d-none"),c.forEach((n,l)=>{d.append(`
            <div class="carousel-item ${l===0?"active":""}">
                <div class="d-flex justify-content-center align-items-center">
                    <img src="${n}" 
                        alt="mockup" 
                        class="img-fluid w-100 rounded-3 d-block mx-auto mockup-image"
                    >
                </div>
            </div>
        `),u.append(`
            <li data-bs-target="#mockup-carousel" data-bs-slide-to="${l}" ${l===0?'class="active"':""}></li>
        `)}),$("#mockup").removeClass("d-none");return}i.length>0?(i.length===1?($("#mockup .carousel-control-next").addClass("d-none"),$("#mockup .carousel-control-prev").addClass("d-none"),u.addClass("d-none")):($("#mockup .carousel-control-next").removeClass("d-none"),$("#mockup .carousel-control-prev").removeClass("d-none"),u.removeClass("d-none")),i.forEach((n,l)=>{d.append(`
                <div class="carousel-item ${l===0?"active":""}">
                    <img src="/storage/${n}" alt="mockup" 
                        class="img-fluid w-100 rounded-lg d-block mx-auto mockup-image"
                    >
                </div>
            `),u.append(`
                <li data-target="#mockup-carousel" data-slide-to="${l}" ${l===0?'class="active"':""}></li>
            `)}),$("#mockup").removeClass("d-none")):$("#mockup").addClass("d-none")}let I=!1;function U(t){$(document).off("click",".category-filter"),$(document).on("click",".category-filter",async function(o){if(o.preventDefault(),I)return;I=!0;const a=$(this).data("id"),e=$(this).data("type");try{A({selectedJenis:t,category:a,type:e}),B(a),$("#filterModal").modal("hide"),V(),await x(!1)}catch(i){console.error("Gagal memuat data:",i)}finally{I=!1}})}function C(t,o="#modalVariants"){$(o).empty(),$("#modalPaket").empty(),$("#modalKepadatan").empty(),Array.isArray(t)&&t.length>0?t.forEach(a=>{const e=a.specification_values||[],i=a.name.toLowerCase();if(i==="warna")$("#paket").text("Warna"),e.length>0?e.forEach(d=>{a.pivot&&d.id===a.pivot.specification_value_id&&$("#modalPaket").append(`
                                <span class="badge badge-outline-primary px-2 py-1 kepadatan" data-value="${d.name}">
                                    ${d.name}
                                </span>
                            `)}):$("#modalPaket").append('<span class="text-muted">Tidak ada data</span>');else if(i==="density")e.length>0?e.forEach(d=>{a.pivot&&d.id===a.pivot.specification_value_id&&(e.length>1?$("#modalKepadatan").append(`
                                    <span class="badge badge-outline-primary px-2 py-1 kepadatan" data-value="${d.name}">
                                        ${d.name}
                                    </span>
                                `):$("#modalKepadatan").append(d.name))}):$("#modalKepadatan").append('<span class="text-muted">Tidak ada data</span>');else{const d=e.find(n=>a.pivot&&n.id===a.pivot.specification_value_id),u=d?d.name:"-";let f=d?d.unit:"";f?f=" "+f:["panjang","tinggi","lebar"].includes(i)?f=" cm":i==="ketebalan"&&(f=" mm");const c=`
                    <div class="row mb-1 variant-row">
                        <div class="col-4 col-sm-3 font-weight-bold">${a.name}</div>
                        <div class="col-auto">:</div>
                        <div class="col">${u}${f}</div>
                    </div>
                `;$(o).append(c)}}):($(o).append('<div class="text-muted">Tidak ada varian</div>'),$(".paket").hide())}function K({selectedJenis:t=null,hasCategory:o=!1,isRenderTypes:a=!1}){const e=$("#filter-container"),i=$("#category-container"),d=$("#catalog-col"),u=$(window).width()<768;if(e.removeClass("d-none"),i.removeClass("d-none"),d.removeClass("col-md-12 col-md-9"),a){e.addClass("d-none"),i.addClass("d-none"),d.addClass("col-md-12");return}if(t==1){e.addClass("d-none"),i.addClass("d-none"),d.addClass("col-md-12");return}if(!o){e.addClass("d-none"),i.addClass("d-none"),d.addClass("col-md-12");return}u?(e.addClass("d-none"),i.removeClass("d-none")):(e.removeClass("d-none"),i.removeClass("d-none")),d.addClass("col-md-9")}$(document).ready(function(){const t=new URLSearchParams(window.location.search),o=t.get("jenis"),a=t.get("category");let e,i,d=!1;A({selectedJenis:o,category:a}),x(),K({selectedJenis:o,hasCategory:a,isRenderTypes:!1}),$(window).on("resize",()=>K({selectedJenis:o,hasCategory:a,isRenderTypes:!1})),$("#search-input").on("input",function(){clearTimeout(e),e=setTimeout(()=>{V(),x()},500)}),$(window).on("scroll",function(){clearTimeout(i),i=setTimeout(async()=>{if(d||H())return;const c=$(window).scrollTop(),n=$(window).height(),l=$(document).height();if(c+n>=l-150){d=!0;try{q(!1),await x()}finally{d=!1}}},200)});function u(c,n=[],l=""){$("#carousel-product-image").empty(),$("#thumbnailGallery").empty();let m=c||[];(l==null?void 0:l.toLowerCase())==="uv board"&&n.length&&(m=[...c,...n]),m.forEach((r,y)=>{const k=y===0?"active":"";$("#carousel-product-image").append(`
                <div class="carousel-item ${k}">
                    <img src="${r}" class="img-fluid d-block mx-auto"
                        style="width:100%;max-width:400px;aspect-ratio:1/1;object-fit:cover;border-radius:8px;border:1px solid #ccc;">
                </div>
            `),$("#thumbnailGallery").append(`
                <div class="col-2 mb-0 d-flex justify-content-center">
                    <div style="height:90%">
                        <img src="${r}" 
                            class="img-thumbnail thumbnail-image p-0 w-100 h-100"
                            style="aspect-ratio:1/1;border:1px solid #ccc;border-radius:8px;object-fit:cover;cursor:pointer;"
                            data-index="${y}">
                    </div>
                </div>
            `)}),m.length<=1?$("#carouselProduct .carousel-control-next, #carouselProduct .carousel-control-prev").addClass("d-none"):$("#carouselProduct .carousel-control-next, #carouselProduct .carousel-control-prev").removeClass("d-none"),$("#carouselProduct").carousel({interval:3e3,pause:!1});let g;$("#thumbnailGallery").off("click").on("click",".thumbnail-image",function(){const r=$(this).data("index");$("#carouselProduct").carousel(r),$(".thumbnail-image").removeClass("active-thumbnail"),$(this).addClass("active-thumbnail"),setTimeout(()=>$(this).removeClass("active-thumbnail"),500),$("#carouselProduct").carousel("pause"),clearTimeout(g),g=setTimeout(()=>{$("#carouselProduct").carousel("cycle")},5e3)})}$(document).off("click",".product-card").on("click",".product-card",function(){const c=$(this).data("id"),n=$(this).data("code"),l=$(this).data("name"),m=$(this).data("category"),g=$(this).data("type"),r=$(this).data("jenis"),y=parseInt($(this).data("length"),10),k=parseFloat($(this).data("width")).toFixed(1),P=parseFloat($(this).data("density")).toFixed(1),b=$(this).data("url"),p=JSON.parse($(this).attr("data-specifications")||"[]"),T=$(this).attr("data-images"),v=JSON.parse($(this).attr("data-paket")||"[]");let j=$(this).data("height"),J=$(this).data("type-image"),w=[],S=[];if(f(c),T)try{w=JSON.parse(T.replace(/&quot;/g,'"'))}catch{w=[]}if(Array.isArray(v)&&(S=v.sort((h,L)=>h.order-L.order).map(h=>`/storage/${h.image}`)),$("#notes").show(),$("#modalPaket").empty(),r==="card-types"){V(),A({selectedJenis:o,type:g}),q(!1),x();return}r.toLowerCase()==="uv board"&&(C(p),$("#modalVideo, .lebar").hide(),$("#modalCategory").text(m),v.length>0?v.sort((h,L)=>h.order-L.order).map(h=>{$("#modalPaket").append(`
                        <span class="badge badge-outline-primary px-2 py-1 kepadatan" data-value="${h.name}">${h.name}</span>
                    `)}):($("#modalPaket").append('<span class="text-muted">Tidak ada paket</span>'),$("#notes").hide())),r.toLowerCase()==="wallboard"&&(C(p),$("#modalCategory").text(m),$("#ketebalan, .density, #notes, .paket,  #modalVideo, .lebar").hide()),r==="PVC Board"&&(C(p),$("#modalCategory").text(r),$("#modalVideo, .lebar, .paket").hide()),r==="Wallpanel"&&(C(p),$("#modalContact").data("type",g),$("#modalCategory").text(m+" / "+g),$("#ketebalan, #kepadatan, .paket, #modalVideo, #notes, .density").hide(),$("#modalGrafis").attr("src",`/storage/${J}`),$(".grafis").removeClass("d-none")),r.toLowerCase()==="aksesoris"&&($("#tinggi, #ketebalan, #kepadatan, .lebar, .density").hide(),$("#modalCategory").text(m),C(p),$("#modalVideoPlayer").empty(),$("#modalVideo, .density").hide(),b&&($("#modalVideoPlayer").append(`
                    <iframe class="embed-responsive-item"
                    src="${b}"
                    title="YouTube video player" frameborder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; web-share;"
                    referrerpolicy="strict-origin-when-cross-origin"
                    allowfullscreen></iframe>
                `),$("#modalVideo").show())),u(w,S,r),$("#modalName").text(l),$("#productModalLabel").text(l),$("#modalDownload").data("id",c),$("#productModal").modal("show"),$("#modalContact").data({jenis:r,category:m,code:n,length:y,width:k,height:j,density:P,type:g}),$(".kepadatan").removeClass("active"),$("#modalContact").data({kepadatan:null,paket:null}),$(".modalContact").prop("disabled",$(".kepadatan").length>0)}),$(document).on("click",".kepadatan",function(){$(".modalContact").prop("disabled",!1);const c=$(this).data("value");$(this).closest("#productModal").find(".kepadatan").removeClass("active"),$(this).addClass("active"),$("#notes").hide(),$("#modalContact").data("kepadatan",c)}),U(o),D(),F(),G();function f(c){$.ajax({url:`/products/${c}/viewed`,method:"POST",headers:{"X-CSRF-TOKEN":$('meta[name="csrf-token"]').attr("content")},success:n=>console.log("View recorded:",n),error:n=>console.error(n)})}});let s={selectedJenis:null,category:null,type:null,currentPage:1,isLoading:!1,lastPage:!1,firstLoad:!0,currentRequest:null,uniquePaths:new Set};function q(t){s.firstLoad=t}function A(t){s.selectedJenis=t.selectedJenis,s.category=t.category??null,s.type=t.type??null}function H(){return s.isLoading}function V(){s.currentPage=1,s.isLoading=!1,s.lastPage=!1,s.uniquePaths.clear(),$("#product-list .row").html("")}function x(){if(s.isLoading||s.lastPage)return Promise.resolve();s.isLoading=!0,Y();const t=$("#search-input").val();s.currentRequest&&s.currentRequest.readyState!==4&&s.currentRequest.abort();const o={page:s.currentPage,search:t,jenis:s.selectedJenis,category:s.category,type:s.type},e=`/catalog?${$.param(o)}`;return window.history.pushState(null,null,e),s.currentRequest=$.ajax({url:"/catalog",type:"GET",data:o}),new Promise((i,d)=>{s.currentRequest.done(u=>ee(u)).fail((u,f)=>{f!=="abort"&&(console.error("Gagal memuat data."),d())}).always(()=>{s.isLoading=!1,z(),s.currentRequest=null}).then(i)})}function ee(t){const o=t.data.data??[],a=t.types??[];s.type&&($("#backButton").removeClass("d-none"),$("#homeButton").addClass("d-none")),s.selectedJenis&&s.firstLoad&&a.length>0?(a.length>0&&($("#search-form").addClass("d-none"),Z(a,s.selectedJenis),s.lastPage=!0),E(t,!0)):(o.length>0?(Q(o,s.selectedJenis),s.currentPage++,s.currentPage>t.data.last_page&&(s.lastPage=!0)):(s.currentPage===1&&($("#mockup").addClass("d-none"),$("#product-list .row").append(`<div class="col-12"><img src="dist/img/no-data.png" alt="no-data"
                     class="img-fluid mx-auto d-block" style="max-width:100%;height:auto;margin:100px 0;"></div>`)),s.lastPage=!0),E(t,!1))}function E(t,o=!0){var l,m,g,r,y,k,P,b;const a=t.category??[],e=((g=(m=(l=t.data.data[0])==null?void 0:l.category)==null?void 0:m.types)==null?void 0:g.images)??[],i=(r=t.jenis)==null?void 0:r.name,d=((k=(y=t.data.data[0])==null?void 0:y.category)==null?void 0:k.images)??[],u=s.firstLoad&&(((P=t.types)==null?void 0:P.length)??0)>0,f=(((b=t.category)==null?void 0:b.length)??0)>0;K({selectedJenis:s.selectedJenis,hasCategory:f,isRenderTypes:u}),a.length===0?$("#category-container").addClass("d-none"):($("#category-container").removeClass("d-none"),e.length>0?M(e,s.selectedJenis,s.uniquePaths,o):d.length>0?M(d,s.selectedJenis,s.uniquePaths,o):s.selectedJenis==3?M([],s.selectedJenis,s.uniquePaths,o):s.selectedJenis==4?M([],s.selectedJenis,s.uniquePaths,o):$("#mockup").addClass("d-none"));const c={"PVC Board":()=>{$("#category-container").addClass("d-none"),$(".category-modal-container").text("Tidak ada kategori")},Wallboard:()=>R("Motif"),"UV Board":()=>R("Motif"),Wallpanel:()=>R("Motif"),Aksesoris:()=>R("Ukuran"),default:()=>R("Kategori")};(c[i]||c.default)();let n='<li class="nav-item font-poppins">';a.length>0?a.forEach(p=>{n+=`
                <a class="nav-link text-white category-filter d-flex align-items-center justify-content-start" 
                   href="#" data-jenis-id="${p.jenis_id}" data-id="${p.id}" data-type="${p.type_id}">
                    <img src="${p.path?"storage/"+p.path:"dist/img/product/1.webp"}" alt="${p.name}" 
                         class="mr-2 img-thumbnail" style="width:50px;height:50px;object-fit:contain;">
                    <span class="text-capitalize">${p.name}</span>
                </a>`}):n+='<a class="nav-link text-white category-filter" href="#">Tanpa Kategori</a>',n+="</li>",o?$("#category-menu-item, #category-menu-item-modal").html("tidak ada kategori"):$("#category-menu-item, #category-menu-item-modal").html(n),!s.category&&a.length>0?(s.category=a[0].id,B(s.category),V(),setTimeout(()=>{x()},200)):s.category&&$(`.category-filter[data-id="${s.category}"]`).addClass("active")}function R(t){$("#category-menu-item-label, #category-modal-item-label").html(t)}function O({selectedJenis:t=null,hasCategory:o=!1,isRenderTypes:a=!1}){const e=$("#filter-container"),i=$("#category-container"),d=$("#catalog-col"),u=$(window).width()<768;if(e.removeClass("d-none"),i.removeClass("d-none"),d.removeClass("col-md-12 col-md-9"),a){e.addClass("d-none"),i.addClass("d-none"),d.addClass("col-md-12");return}if(t==1){e.addClass("d-none"),i.addClass("d-none"),d.addClass("col-md-12");return}if(!o){e.addClass("d-none"),i.addClass("d-none"),d.addClass("col-md-12");return}u?(e.addClass("d-none"),i.removeClass("d-none")):(e.removeClass("d-none"),i.removeClass("d-none")),d.addClass("col-md-9")}$(document).ready(function(){const t=new URLSearchParams(window.location.search),o=t.get("jenis"),a=t.get("category");let e,i,d=!1;A({selectedJenis:o,category:a}),x(),O({selectedJenis:o,hasCategory:a,isRenderTypes:!1}),$(window).on("resize",()=>O({selectedJenis:o,hasCategory:a,isRenderTypes:!1})),$("#search-input").on("input",function(){clearTimeout(e),e=setTimeout(()=>{V(),x()},500)}),$(window).on("scroll",function(){clearTimeout(i),i=setTimeout(async()=>{if(d||H())return;const c=$(window).scrollTop(),n=$(window).height(),l=$(document).height();if(c+n>=l-150){d=!0;try{q(!1),await x()}finally{d=!1}}},200)});function u(c,n=[],l=""){$("#carousel-product-image").empty(),$("#thumbnailGallery").empty();let m=c||[];(l==null?void 0:l.toLowerCase())==="uv board"&&n.length&&(m=[...c,...n]),m.forEach((r,y)=>{const k=y===0?"active":"";$("#carousel-product-image").append(`
                <div class="carousel-item ${k}">
                    <img src="${r}" class="img-fluid d-block mx-auto"
                        style="width:100%;max-width:400px;aspect-ratio:1/1;object-fit:cover;border-radius:8px;border:1px solid #ccc;">
                </div>
            `),$("#thumbnailGallery").append(`
                <div class="col-2 mb-0 d-flex justify-content-center">
                    <div style="height:90%">
                        <img src="${r}" 
                            class="img-thumbnail thumbnail-image p-0 w-100 h-100"
                            style="aspect-ratio:1/1;border:1px solid #ccc;border-radius:8px;object-fit:cover;cursor:pointer;"
                            data-index="${y}">
                    </div>
                </div>
            `)}),m.length<=1?$("#carouselProduct .carousel-control-next, #carouselProduct .carousel-control-prev").addClass("d-none"):$("#carouselProduct .carousel-control-next, #carouselProduct .carousel-control-prev").removeClass("d-none"),$("#carouselProduct").carousel({interval:3e3,pause:!1});let g;$("#thumbnailGallery").off("click").on("click",".thumbnail-image",function(){const r=$(this).data("index");$("#carouselProduct").carousel(r),$(".thumbnail-image").removeClass("active-thumbnail"),$(this).addClass("active-thumbnail"),setTimeout(()=>$(this).removeClass("active-thumbnail"),500),$("#carouselProduct").carousel("pause"),clearTimeout(g),g=setTimeout(()=>{$("#carouselProduct").carousel("cycle")},5e3)})}$(document).off("click",".product-card").on("click",".product-card",function(){const c=$(this).data("id"),n=$(this).data("code"),l=$(this).data("name"),m=$(this).data("category"),g=$(this).data("type"),r=$(this).data("jenis"),y=parseInt($(this).data("length"),10),k=parseFloat($(this).data("width")).toFixed(1),P=parseFloat($(this).data("density")).toFixed(1),b=$(this).data("url"),p=JSON.parse($(this).attr("data-specifications")||"[]"),T=$(this).attr("data-images"),v=JSON.parse($(this).attr("data-paket")||"[]");let j=$(this).data("height"),J=$(this).data("type-image"),w=[],S=[];if(f(c),T)try{w=JSON.parse(T.replace(/&quot;/g,'"'))}catch{w=[]}if(Array.isArray(v)&&(S=v.sort((h,L)=>h.order-L.order).map(h=>`/storage/${h.image}`)),$("#notes").show(),$("#modalPaket").empty(),r==="card-types"){V(),A({selectedJenis:o,type:g}),q(!1),x();return}r.toLowerCase()==="uv board"&&(C(p),$("#modalVideo, .lebar").hide(),$("#modalCategory").text(m),v.length>0?v.sort((h,L)=>h.order-L.order).map(h=>{$("#modalPaket").append(`
                        <span class="badge badge-outline-primary px-2 py-1 kepadatan" data-value="${h.name}">${h.name}</span>
                    `)}):($("#modalPaket").append('<span class="text-muted">Tidak ada paket</span>'),$("#notes").hide())),r.toLowerCase()==="wallboard"&&(C(p),$("#modalCategory").text(m),$("#ketebalan, .density, #notes, .paket,  #modalVideo, .lebar").hide()),r==="PVC Board"&&(C(p),$("#modalCategory").text(r),$("#modalVideo, .lebar, .paket").hide()),r==="Wallpanel"&&(C(p),$("#modalContact").data("type",g),$("#modalCategory").text(m+" / "+g),$("#ketebalan, #kepadatan, .paket, #modalVideo, #notes, .density").hide(),$("#modalGrafis").attr("src",`/storage/${J}`),$(".grafis").removeClass("d-none")),r.toLowerCase()==="aksesoris"&&($("#tinggi, #ketebalan, #kepadatan, .lebar, .density").hide(),$("#modalCategory").text(m),C(p),$("#modalVideoPlayer").empty(),$("#modalVideo, .density").hide(),b&&($("#modalVideoPlayer").append(`
                    <iframe class="embed-responsive-item"
                    src="${b}"
                    title="YouTube video player" frameborder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; web-share;"
                    referrerpolicy="strict-origin-when-cross-origin"
                    allowfullscreen></iframe>
                `),$("#modalVideo").show())),u(w,S,r),$("#modalName").text(l),$("#productModalLabel").text(l),$("#modalDownload").data("id",c),$("#productModal").modal("show"),$("#modalContact").data({jenis:r,category:m,code:n,length:y,width:k,height:j,density:P,type:g}),$(".kepadatan").removeClass("active"),$("#modalContact").data({kepadatan:null,paket:null}),$(".modalContact").prop("disabled",$(".kepadatan").length>0)}),$(document).on("click",".kepadatan",function(){$(".modalContact").prop("disabled",!1);const c=$(this).data("value");$(this).closest("#productModal").find(".kepadatan").removeClass("active"),$(this).addClass("active"),$("#notes").hide(),$("#modalContact").data("kepadatan",c)}),U(o),D(),F(),G();function f(c){$.ajax({url:`/products/${c}/viewed`,method:"POST",headers:{"X-CSRF-TOKEN":$('meta[name="csrf-token"]').attr("content")},success:n=>console.log("View recorded:",n),error:n=>console.error(n)})}});
