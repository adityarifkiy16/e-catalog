let _=null;function F(t){_=t}function W(){return _}function Y(){$("#loading").removeClass("d-none")}function z(){$("#loading").addClass("d-none")}function X(t){return t.slice().sort((s,a)=>(a.type==="motif")-(s.type==="motif")).map(s=>"/storage/"+s.path)}function B(){$(document).on("click",".modalDownload",function(t){t.preventDefault();const s=$(this).data("id"),a="catalog/pdf/product?id="+encodeURIComponent(s);N(this,a)}),$("#btn-download").on("click",function(t){t.preventDefault(),N(this,"catalog/pdf?category="+encodeURIComponent(W()))})}function N(t,s){const a=$(t);a.prop("disabled",!0).html('<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Mengunduh...'),window.open(s,"_blank"),setTimeout(()=>{a.prop("disabled",!1).html('<i class="fa fa-file-download"></i> Download')},5e3)}function D(){$(document).on("click",".modalContact",function(t){t.preventDefault(),console.log("Klik tombol order",$(this).data("code"));const s="62816659688",a=$(this).data("jenis");console.log(a.toLowerCase());let e="";a.toLowerCase()=="wallpanel"?e=`Halo Admin,
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

Apakah produk ini masih tersedia? Terima kasih.`,window.open(`https://wa.me/${s}?text=${encodeURIComponent(e)}`,"_blank")})}function G(){$(window).scroll(function(){$(this).scrollTop()>100?$("#btn-scroll-top").fadeIn():$("#btn-scroll-top").fadeOut()}),$("#btn-scroll-top").click(function(){return $("html, body").animate({scrollTop:0},500),!1})}function Q(t,s){$("#btn-download").removeClass("d-none");let a="";t.forEach(e=>{var m,g,c,y,k,x,b,p,P,v,j;const l=e.photo?`/storage/${e.photo}`:"https://via.placeholder.com/300x200?text=No+Image",i=X(e.images),f=[l,...i],u=JSON.stringify(f).replace(/"/g,"&quot;"),d=JSON.stringify(e.packages).replace(/"/g,"&quot;"),n=((m=e.category)==null?void 0:m.name)??"Tanpa Kategori";((g=e.category)==null?void 0:g.display_style)==="square"||s===null?a+=`
                    <div class="col-md-2 col-6 mb-4">
                        <div class="h-100 product-card"
                    `:((c=e.category)==null?void 0:c.display_style)==="rectangle"?a+=`
                    <div class="col-md-4 col-6 mb-4">
                        <div class="h-100 product-card"
                    `:a+=`
                    <div class="col-md-2 col-6 mb-4">
                        <div class="h-100 product-card d-flex flex-column justify-content-center align-items-center"
                    `;const r=JSON.stringify(e.specifications).replace(/"/g,"&quot;");a+=`
                    data-id="${e.id}"
                    data-code="${e.code}"
                    data-name="${e.name}"
                    data-category="${n}"
                    data-jenis="${((k=(y=e.category)==null?void 0:y.jenis)==null?void 0:k.name)??""}"
                    data-images="${u}"
                    data-image="${l}"
                    data-type="${((b=(x=e.category)==null?void 0:x.types)==null?void 0:b.name)??""}"
                    data-type-image="${((P=(p=e.category)==null?void 0:p.types)==null?void 0:P.image)??""}"
                    data-url="${e.url_video}"
                    data-paket="${d}"
                    data-specifications = "${r}"
                    >
                       <img 
                            src="${l}" 
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
                                object-position: ${((j=(v=e.category)==null?void 0:v.jenis)==null?void 0:j.name)==="PVC Board"?"bottom center":"center center"};
                            "
                        >
                        <div class="card-body d-flex flex-column text-center">
                            <h4 class="card-title font-weight-bold text-uppercase mb-2">
                                ${e.name}
                            </h4>
                            <h6 class="card-text text-muted mb-1">${n}</h6>
                        </div>
                    </div>
                </div>`}),$("#product-list .row").append(a)}function Z(t,s){$("#btn-download").addClass("d-none");let a="";t.forEach(e=>{const l=e.thumbnail?`/storage/${e.thumbnail}`:"https://via.placeholder.com/300x200?text=No+Image",i=s==3?"wallpanel":"tanpa kategori";a+=`
                    <div class="col-md-2 col-6 mb-4">
                        <div class="h-100 product-card d-flex flex-column justify-content-center align-items-center"
                    `,a+=`
                    data-id="${e.id}"
                    data-jenis="card-types"
                    data-category="${i}"
                    data-type="${e.id}"
                    >
                       <img 
                            src="${l}" 
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
                            <h6 class="card-text text-muted mb-1">${i}</h6>
                        </div>
                    </div>
                </div>`}),$("#product-list .row").append(a)}function M(t,s,a,e=!1){if(s==null)return;t.forEach(n=>{n.images&&n.images.forEach(r=>{r.path&&a.add(r.path)}),n.path&&a.add(n.path)});const l=Array.from(a),i=$("#mockup-carousel-inner"),f=$("#mockup-carousel-indicators"),u=["https://www.youtube.com/embed/BiiUrYAbL9s?autoplay=1&mute=1&rel=0&controls=0&amp;loop=1&playlist=BiiUrYAbL9s"],d=[];for(let n=1;n<=6;n++)n!==2&&d.push(`/dist/img/wpc/${n}.webp?v=${Date.now()}`);if(i.empty(),f.empty(),s==4){$("#mockup-carousel").carousel({interval:!1}),$("#mockup .carousel-control-next").addClass("d-none"),$("#mockup .carousel-control-prev").addClass("d-none"),u.forEach((n,r)=>{i.append(`
            <div class="carousel-item ${r===0?"active":""}">
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
        `)}),$("#mockup").removeClass("d-none");return}else if(s==3&&e){$("#mockup-carousel").carousel({interval:3e3}),$("#mockup .carousel-control-next").removeClass("d-none"),$("#mockup .carousel-control-prev").removeClass("d-none"),d.forEach((n,r)=>{i.append(`
            <div class="carousel-item ${r===0?"active":""}">
                <div class="d-flex justify-content-center align-items-center">
                    <img src="${n}" 
                        alt="mockup" 
                        class="img-fluid w-100 rounded-3 d-block mx-auto mockup-image"
                    >
                </div>
            </div>
        `),f.append(`
            <li data-bs-target="#mockup-carousel" data-bs-slide-to="${r}" ${r===0?'class="active"':""}></li>
        `)}),$("#mockup").removeClass("d-none");return}l.length>0?(l.length===1?($("#mockup .carousel-control-next").addClass("d-none"),$("#mockup .carousel-control-prev").addClass("d-none"),f.addClass("d-none")):($("#mockup .carousel-control-next").removeClass("d-none"),$("#mockup .carousel-control-prev").removeClass("d-none")),l.slice(0,5).forEach((n,r)=>{i.append(`
                <div class="carousel-item ${r===0?"active":""}">
                    <img src="/storage/${n}" alt="mockup" 
                        class="img-fluid w-100 rounded-lg d-block mx-auto mockup-image"
                    >
                </div>
            `),f.append(`
                <li data-target="#mockup-carousel" data-slide-to="${r}" ${r===0?'class="active"':""}></li>
            `)}),$("#mockup").removeClass("d-none")):$("#mockup").addClass("d-none")}let K=!1;function H(t){$(document).off("click",".category-filter"),$(document).on("click",".category-filter",async function(s){if(s.preventDefault(),K)return;K=!0;const a=$(this).data("id"),e=$(this).data("type");try{A({selectedJenis:t,category:a,type:e}),F(a),$("#filterModal").modal("hide"),J(),await w(!1)}catch(l){console.error("Gagal memuat data:",l)}finally{K=!1}})}function C(t,s="#modalVariants"){$(s).empty(),$("#modalPaket").empty(),$("#modalKepadatan").empty(),Array.isArray(t)&&t.length>0?t.forEach(a=>{const e=a.specification_values||[],l=a.name.toLowerCase();if(l==="warna")$("#paket").text("Warna"),e.length>0?e.forEach(i=>{a.pivot&&i.id===a.pivot.specification_value_id&&$("#modalPaket").append(`
                                <span class="badge badge-outline-primary px-2 py-1 kepadatan" data-value="${i.name}">
                                    ${i.name}
                                </span>
                            `)}):$("#modalPaket").append('<span class="text-muted">Tidak ada data</span>');else if(l==="density")e.length>0?e.forEach(i=>{a.pivot&&i.id===a.pivot.specification_value_id&&(e.length>1?$("#modalKepadatan").append(`
                                    <span class="badge badge-outline-primary px-2 py-1 kepadatan" data-value="${i.name}">
                                        ${i.name}
                                    </span>
                                `):$("#modalKepadatan").append(i.name))}):$("#modalKepadatan").append('<span class="text-muted">Tidak ada data</span>');else{const i=e.find(n=>a.pivot&&n.id===a.pivot.specification_value_id),f=i?i.name:"-";let u=i?i.unit:"";u?u=" "+u:["panjang","tinggi","lebar"].includes(l)?u=" cm":l==="ketebalan"&&(u=" mm");const d=`
                    <div class="row mb-1 variant-row">
                        <div class="col-4 col-sm-3 font-weight-bold">${a.name}</div>
                        <div class="col-auto">:</div>
                        <div class="col">${f}${u}</div>
                    </div>
                `;$(s).append(d)}}):($(s).append('<div class="text-muted">Tidak ada varian</div>'),$(".paket").hide())}function q({selectedJenis:t=null,hasCategory:s=!1,isRenderTypes:a=!1}){const e=$("#filter-container"),l=$("#category-container"),i=$("#catalog-col"),f=$(window).width()<768;if(e.removeClass("d-none"),l.removeClass("d-none"),i.removeClass("col-md-12 col-md-9"),a){e.addClass("d-none"),l.addClass("d-none"),i.addClass("col-md-12");return}if(t==1){e.addClass("d-none"),l.addClass("d-none"),i.addClass("col-md-12");return}if(!s){e.addClass("d-none"),l.addClass("d-none"),i.addClass("col-md-12");return}f?(e.addClass("d-none"),l.removeClass("d-none")):(e.removeClass("d-none"),l.removeClass("d-none")),i.addClass("col-md-9")}$(document).ready(function(){const t=new URLSearchParams(window.location.search),s=t.get("jenis"),a=t.get("category");let e,l,i=!1;A({selectedJenis:s,category:a}),w(),q({selectedJenis:s,hasCategory:a,isRenderTypes:!1}),$(window).on("resize",()=>q({selectedJenis:s,hasCategory:a,isRenderTypes:!1})),$("#search-input").on("input",function(){clearTimeout(e),e=setTimeout(()=>{J(),w()},500)}),$(window).on("scroll",function(){clearTimeout(l),l=setTimeout(async()=>{if(i||U())return;const d=$(window).scrollTop(),n=$(window).height(),r=$(document).height();if(d+n>=r-150){i=!0;try{R(!1),await w()}finally{i=!1}}},200)});function f(d,n=[],r=""){$("#carousel-product-image").empty(),$("#thumbnailGallery").empty();let m=d||[];(r==null?void 0:r.toLowerCase())==="uv board"&&n.length&&(m=[...d,...n]),m.forEach((c,y)=>{const k=y===0?"active":"";$("#carousel-product-image").append(`
                <div class="carousel-item ${k}">
                    <img src="${c}" class="img-fluid d-block mx-auto"
                        style="width:100%;max-width:400px;aspect-ratio:1/1;object-fit:cover;border-radius:8px;border:1px solid #ccc;">
                </div>
            `),$("#thumbnailGallery").append(`
                <div class="col-2 mb-0 d-flex justify-content-center">
                    <div style="height:90%">
                        <img src="${c}" 
                            class="img-thumbnail thumbnail-image p-0 w-100 h-100"
                            style="aspect-ratio:1/1;border:1px solid #ccc;border-radius:8px;object-fit:cover;cursor:pointer;"
                            data-index="${y}">
                    </div>
                </div>
            `)}),m.length<=1?$("#carouselProduct .carousel-control-next, #carouselProduct .carousel-control-prev").addClass("d-none"):$("#carouselProduct .carousel-control-next, #carouselProduct .carousel-control-prev").removeClass("d-none"),$("#carouselProduct").carousel({interval:3e3,pause:!1});let g;$("#thumbnailGallery").off("click").on("click",".thumbnail-image",function(){const c=$(this).data("index");$("#carouselProduct").carousel(c),$(".thumbnail-image").removeClass("active-thumbnail"),$(this).addClass("active-thumbnail"),setTimeout(()=>$(this).removeClass("active-thumbnail"),500),$("#carouselProduct").carousel("pause"),clearTimeout(g),g=setTimeout(()=>{$("#carouselProduct").carousel("cycle")},5e3)})}$(document).on("click",".product-card",function(){const d=$(this).data("id"),n=$(this).data("code"),r=$(this).data("name"),m=$(this).data("category"),g=$(this).data("type"),c=$(this).data("jenis"),y=parseInt($(this).data("length"),10),k=parseFloat($(this).data("width")).toFixed(1),x=parseFloat($(this).data("density")).toFixed(1),b=$(this).data("url"),p=JSON.parse($(this).attr("data-specifications")||"[]"),P=$(this).attr("data-images"),v=JSON.parse($(this).attr("data-paket")||"[]");let j=$(this).data("height"),I=$(this).data("type-image"),T=[],V=[];if(P)try{T=JSON.parse(P.replace(/&quot;/g,'"'))}catch{T=[]}if(Array.isArray(v)&&(V=v.sort((h,L)=>h.order-L.order).map(h=>`/storage/${h.image}`)),$("#notes").show(),$("#modalPaket").empty(),c==="card-types"){J(),A({selectedJenis:s,type:g}),R(!1),w(),handleFilterContainer(m);return}c.toLowerCase()==="uv board"&&(u(d),C(p),$("#modalVideo, .lebar").hide(),$("#modalCategory").text(m),v.length>0?v.sort((h,L)=>h.order-L.order).map(h=>{$("#modalPaket").append(`
                        <span class="badge badge-outline-primary px-2 py-1 kepadatan" data-value="${h.name}">${h.name}</span>
                    `)}):($("#modalPaket").append('<span class="text-muted">Tidak ada paket</span>'),$("#notes").hide())),c.toLowerCase()==="wallboard"&&(u(d),C(p),$("#modalCategory").text(m),$("#ketebalan, .density, #notes, .paket,  #modalVideo, .lebar").hide()),c==="PVC Board"&&(u(d),C(p),$("#modalCategory").text(c),$("#modalVideo, .lebar, .paket").hide()),c==="Wallpanel"&&(u(d),C(p),$("#modalContact").data("type",g),$("#modalCategory").text(m+" / "+g),$("#ketebalan, #kepadatan, .paket, #modalVideo, #notes, .density").hide(),$("#modalGrafis").attr("src",`/storage/${I}`),$(".grafis").removeClass("d-none")),c.toLowerCase()==="aksesoris"&&(u(d),$("#tinggi, #ketebalan, #kepadatan, .lebar, .density").hide(),$("#modalCategory").text(m),C(p),$("#modalVideoPlayer").empty(),$("#modalVideo, .density").hide(),b&&($("#modalVideoPlayer").append(`
                    <iframe class="embed-responsive-item"
                    src="${b}"
                    title="YouTube video player" frameborder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; web-share;"
                    referrerpolicy="strict-origin-when-cross-origin"
                    allowfullscreen></iframe>
                `),$("#modalVideo").show())),f(T,V,c),$("#modalName").text(r),$("#productModalLabel").text(r),$("#modalDownload").data("id",d),$("#productModal").modal("show"),$("#modalContact").data({jenis:c,category:m,code:n,length:y,width:k,height:j,density:x,type:g}),$(".kepadatan").removeClass("active"),$("#modalContact").data({kepadatan:null,paket:null}),$(".modalContact").prop("disabled",$(".kepadatan").length>0)}),$(document).on("click",".kepadatan",function(){$(".modalContact").prop("disabled",!1);const d=$(this).data("value");$(this).closest("#productModal").find(".kepadatan").removeClass("active"),$(this).addClass("active"),$("#notes").hide(),$("#modalContact").data("kepadatan",d)}),H(s),B(),D(),G();function u(d){$.ajax({url:`/products/${d}/viewed`,method:"POST",headers:{"X-CSRF-TOKEN":$('meta[name="csrf-token"]').attr("content")},success:n=>console.log("View recorded:",n),error:n=>console.error(n)})}});let o={selectedJenis:null,category:null,type:null,currentPage:1,isLoading:!1,lastPage:!1,firstLoad:!0,currentRequest:null,uniquePaths:new Set};function R(t){o.firstLoad=t}function A(t){o.selectedJenis=t.selectedJenis,o.category=t.category??null,o.type=t.type??null}function U(){return o.isLoading}function J(){o.currentPage=1,o.isLoading=!1,o.lastPage=!1,o.uniquePaths.clear(),$("#product-list .row").html("")}function w(){if(o.isLoading||o.lastPage)return Promise.resolve();o.isLoading=!0,Y();const t=$("#search-input").val();return o.currentRequest&&o.currentRequest.readyState!==4&&o.currentRequest.abort(),o.currentRequest=$.ajax({url:"/catalog",type:"GET",data:{page:o.currentPage,search:t,jenis:o.selectedJenis,category:o.category,type:o.type}}),new Promise((s,a)=>{o.currentRequest.done(e=>ee(e)).fail((e,l)=>{l!=="abort"&&(console.error("Gagal memuat data."),a())}).always(()=>{o.isLoading=!1,z(),o.currentRequest=null}).then(s)})}function ee(t){const s=t.data.data??[],a=t.types??[];o.type&&($("#backButton").removeClass("d-none"),$("#homeButton").addClass("d-none")),o.selectedJenis&&o.firstLoad&&a.length>0?(a.length>0&&($("#search-form").addClass("d-none"),Z(a,o.selectedJenis),o.lastPage=!0),E(t,!0)):(s.length>0?(Q(s,o.selectedJenis),o.currentPage++,o.currentPage>t.data.last_page&&(o.lastPage=!0)):(o.currentPage===1&&($("#mockup").addClass("d-none"),$("#product-list .row").append(`<div class="col-12"><img src="dist/img/no-data.png" alt="no-data"
                     class="img-fluid mx-auto d-block" style="max-width:100%;height:auto;margin:100px 0;"></div>`)),o.lastPage=!0),E(t,!1))}function E(t,s=!0){var r,m,g,c,y,k,x,b;const a=t.category??[],e=((g=(m=(r=t.data.data[0])==null?void 0:r.category)==null?void 0:m.types)==null?void 0:g.images)??[],l=(c=t.jenis)==null?void 0:c.name,i=((k=(y=t.data.data[0])==null?void 0:y.category)==null?void 0:k.images)??[],f=o.firstLoad&&(((x=t.types)==null?void 0:x.length)??0)>0,u=(((b=t.category)==null?void 0:b.length)??0)>0;q({selectedJenis:o.selectedJenis,hasCategory:u,isRenderTypes:f}),a.length===0?$("#category-container").addClass("d-none"):($("#category-container").removeClass("d-none"),e.length>0?M(e,o.selectedJenis,o.uniquePaths,s):i.length>0?M(i,o.selectedJenis,o.uniquePaths,s):o.selectedJenis==3?M([],o.selectedJenis,o.uniquePaths,s):o.selectedJenis==4?M([],o.selectedJenis,o.uniquePaths,s):$("#mockup").addClass("d-none"));const d={"PVC Board":()=>{$("#category-container").addClass("d-none"),$(".category-modal-container").text("Tidak ada kategori")},Wallboard:()=>S("Motif"),"UV Board":()=>S("Motif"),Wallpanel:()=>S("Motif"),Aksesoris:()=>S("Ukuran"),default:()=>S("Kategori")};(d[l]||d.default)();let n='<li class="nav-item font-poppins">';a.length>0?a.forEach(p=>{n+=`
                <a class="nav-link text-white category-filter d-flex align-items-center justify-content-start" 
                   href="#" data-jenis-id="${p.jenis_id}" data-id="${p.id}" data-type="${p.type_id}">
                    <img src="${p.path?"storage/"+p.path:"dist/img/product/1.webp"}" alt="${p.name}" 
                         class="mr-2 img-thumbnail" style="width:50px;height:50px;object-fit:contain;">
                    <span class="text-capitalize">${p.name}</span>
                </a>`}):n+='<a class="nav-link text-white category-filter" href="#">Tanpa Kategori</a>',n+="</li>",s?$("#category-menu-item, #category-menu-item-modal").html("tidak ada kategori"):$("#category-menu-item, #category-menu-item-modal").html(n),!o.category&&a.length>0?(o.category=a[0].id,F(o.category),J(),setTimeout(()=>{w()},200)):o.category&&$(`.category-filter[data-id="${o.category}"]`).addClass("active")}function S(t){$("#category-menu-item-label, #category-modal-item-label").html(t)}function O({selectedJenis:t=null,hasCategory:s=!1,isRenderTypes:a=!1}){const e=$("#filter-container"),l=$("#category-container"),i=$("#catalog-col"),f=$(window).width()<768;if(e.removeClass("d-none"),l.removeClass("d-none"),i.removeClass("col-md-12 col-md-9"),a){e.addClass("d-none"),l.addClass("d-none"),i.addClass("col-md-12");return}if(t==1){e.addClass("d-none"),l.addClass("d-none"),i.addClass("col-md-12");return}if(!s){e.addClass("d-none"),l.addClass("d-none"),i.addClass("col-md-12");return}f?(e.addClass("d-none"),l.removeClass("d-none")):(e.removeClass("d-none"),l.removeClass("d-none")),i.addClass("col-md-9")}$(document).ready(function(){const t=new URLSearchParams(window.location.search),s=t.get("jenis"),a=t.get("category");let e,l,i=!1;A({selectedJenis:s,category:a}),w(),O({selectedJenis:s,hasCategory:a,isRenderTypes:!1}),$(window).on("resize",()=>O({selectedJenis:s,hasCategory:a,isRenderTypes:!1})),$("#search-input").on("input",function(){clearTimeout(e),e=setTimeout(()=>{J(),w()},500)}),$(window).on("scroll",function(){clearTimeout(l),l=setTimeout(async()=>{if(i||U())return;const d=$(window).scrollTop(),n=$(window).height(),r=$(document).height();if(d+n>=r-150){i=!0;try{R(!1),await w()}finally{i=!1}}},200)});function f(d,n=[],r=""){$("#carousel-product-image").empty(),$("#thumbnailGallery").empty();let m=d||[];(r==null?void 0:r.toLowerCase())==="uv board"&&n.length&&(m=[...d,...n]),m.forEach((c,y)=>{const k=y===0?"active":"";$("#carousel-product-image").append(`
                <div class="carousel-item ${k}">
                    <img src="${c}" class="img-fluid d-block mx-auto"
                        style="width:100%;max-width:400px;aspect-ratio:1/1;object-fit:cover;border-radius:8px;border:1px solid #ccc;">
                </div>
            `),$("#thumbnailGallery").append(`
                <div class="col-2 mb-0 d-flex justify-content-center">
                    <div style="height:90%">
                        <img src="${c}" 
                            class="img-thumbnail thumbnail-image p-0 w-100 h-100"
                            style="aspect-ratio:1/1;border:1px solid #ccc;border-radius:8px;object-fit:cover;cursor:pointer;"
                            data-index="${y}">
                    </div>
                </div>
            `)}),m.length<=1?$("#carouselProduct .carousel-control-next, #carouselProduct .carousel-control-prev").addClass("d-none"):$("#carouselProduct .carousel-control-next, #carouselProduct .carousel-control-prev").removeClass("d-none"),$("#carouselProduct").carousel({interval:3e3,pause:!1});let g;$("#thumbnailGallery").off("click").on("click",".thumbnail-image",function(){const c=$(this).data("index");$("#carouselProduct").carousel(c),$(".thumbnail-image").removeClass("active-thumbnail"),$(this).addClass("active-thumbnail"),setTimeout(()=>$(this).removeClass("active-thumbnail"),500),$("#carouselProduct").carousel("pause"),clearTimeout(g),g=setTimeout(()=>{$("#carouselProduct").carousel("cycle")},5e3)})}$(document).on("click",".product-card",function(){const d=$(this).data("id"),n=$(this).data("code"),r=$(this).data("name"),m=$(this).data("category"),g=$(this).data("type"),c=$(this).data("jenis"),y=parseInt($(this).data("length"),10),k=parseFloat($(this).data("width")).toFixed(1),x=parseFloat($(this).data("density")).toFixed(1),b=$(this).data("url"),p=JSON.parse($(this).attr("data-specifications")||"[]"),P=$(this).attr("data-images"),v=JSON.parse($(this).attr("data-paket")||"[]");let j=$(this).data("height"),I=$(this).data("type-image"),T=[],V=[];if(P)try{T=JSON.parse(P.replace(/&quot;/g,'"'))}catch{T=[]}if(Array.isArray(v)&&(V=v.sort((h,L)=>h.order-L.order).map(h=>`/storage/${h.image}`)),$("#notes").show(),$("#modalPaket").empty(),c==="card-types"){J(),A({selectedJenis:s,type:g}),R(!1),w(),handleFilterContainer(m);return}c.toLowerCase()==="uv board"&&(u(d),C(p),$("#modalVideo, .lebar").hide(),$("#modalCategory").text(m),v.length>0?v.sort((h,L)=>h.order-L.order).map(h=>{$("#modalPaket").append(`
                        <span class="badge badge-outline-primary px-2 py-1 kepadatan" data-value="${h.name}">${h.name}</span>
                    `)}):($("#modalPaket").append('<span class="text-muted">Tidak ada paket</span>'),$("#notes").hide())),c.toLowerCase()==="wallboard"&&(u(d),C(p),$("#modalCategory").text(m),$("#ketebalan, .density, #notes, .paket,  #modalVideo, .lebar").hide()),c==="PVC Board"&&(u(d),C(p),$("#modalCategory").text(c),$("#modalVideo, .lebar, .paket").hide()),c==="Wallpanel"&&(u(d),C(p),$("#modalContact").data("type",g),$("#modalCategory").text(m+" / "+g),$("#ketebalan, #kepadatan, .paket, #modalVideo, #notes, .density").hide(),$("#modalGrafis").attr("src",`/storage/${I}`),$(".grafis").removeClass("d-none")),c.toLowerCase()==="aksesoris"&&(u(d),$("#tinggi, #ketebalan, #kepadatan, .lebar, .density").hide(),$("#modalCategory").text(m),C(p),$("#modalVideoPlayer").empty(),$("#modalVideo, .density").hide(),b&&($("#modalVideoPlayer").append(`
                    <iframe class="embed-responsive-item"
                    src="${b}"
                    title="YouTube video player" frameborder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; web-share;"
                    referrerpolicy="strict-origin-when-cross-origin"
                    allowfullscreen></iframe>
                `),$("#modalVideo").show())),f(T,V,c),$("#modalName").text(r),$("#productModalLabel").text(r),$("#modalDownload").data("id",d),$("#productModal").modal("show"),$("#modalContact").data({jenis:c,category:m,code:n,length:y,width:k,height:j,density:x,type:g}),$(".kepadatan").removeClass("active"),$("#modalContact").data({kepadatan:null,paket:null}),$(".modalContact").prop("disabled",$(".kepadatan").length>0)}),$(document).on("click",".kepadatan",function(){$(".modalContact").prop("disabled",!1);const d=$(this).data("value");$(this).closest("#productModal").find(".kepadatan").removeClass("active"),$(this).addClass("active"),$("#notes").hide(),$("#modalContact").data("kepadatan",d)}),H(s),B(),D(),G();function u(d){$.ajax({url:`/products/${d}/viewed`,method:"POST",headers:{"X-CSRF-TOKEN":$('meta[name="csrf-token"]').attr("content")},success:n=>console.log("View recorded:",n),error:n=>console.error(n)})}});
