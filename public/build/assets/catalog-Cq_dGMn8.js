let _=null;function B(t){_=t}function W(){return _}function Y(){$("#loading").removeClass("d-none")}function z(){$("#loading").addClass("d-none")}function X(t){return t.slice().sort((s,a)=>(a.type==="motif")-(s.type==="motif")).map(s=>"/storage/"+s.path)}function D(){$(document).off("click",".modalDownload").on("click",".modalDownload",function(t){t.preventDefault();const s=$(this).data("id"),a="catalog/pdf/product?id="+encodeURIComponent(s);N(this,a)}),$(document).off("click","#btn-download").on("click","#btn-download",function(t){t.preventDefault(),N(this,"catalog/pdf?category="+encodeURIComponent(W()))})}function N(t,s){const a=$(t);a.prop("disabled",!0).html('<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Mengunduh...'),window.open(s,"_blank"),setTimeout(()=>{a.prop("disabled",!1).html('<i class="fa fa-file-download"></i> Download')},5e3)}function F(){$(document).off("click",".modalContact").on("click",".modalContact",function(t){t.preventDefault(),console.log("Klik tombol order",$(this).data("code"));const s="62816659688",a=$(this).data("jenis");console.log(a.toLowerCase());let e="";a.toLowerCase()=="wallpanel"?e=`Halo Admin,
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

Apakah produk ini masih tersedia? Terima kasih.`,window.open(`https://wa.me/${s}?text=${encodeURIComponent(e)}`,"_blank")})}function G(){$(window).scroll(function(){$(this).scrollTop()>100?$("#btn-scroll-top").fadeIn():$("#btn-scroll-top").fadeOut()}),$("#btn-scroll-top").click(function(){return $("html, body").animate({scrollTop:0},500),!1})}function Q(t,s){$("#btn-download").removeClass("d-none");let a="";t.forEach(e=>{var p,r,y,k,P,b,u,T,v,j,J,C;const i=e.photo?`/storage/${e.photo}`:"https://via.placeholder.com/300x200?text=No+Image",d=X(e.images),g=[i,...d],f=JSON.stringify(g).replace(/"/g,"&quot;"),c=JSON.stringify(e.packages).replace(/"/g,"&quot;"),n=((p=e.category)==null?void 0:p.name)??"Tanpa Kategori";((r=e.category)==null?void 0:r.display_style)==="square"||s===null?a+=`
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
                    data-type="${((T=(u=e.category)==null?void 0:u.types)==null?void 0:T.name)??""}"
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
                                object-position: ${((C=(J=e.category)==null?void 0:J.jenis)==null?void 0:C.name)==="PVC Board"?"bottom center":"center center"};
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
                </div>`}),$("#product-list .row").append(a)}function Z(t,s){$("#btn-download").addClass("d-none");let a="";t.forEach(e=>{const i=e.thumbnail?`/storage/${e.thumbnail}`:"https://via.placeholder.com/300x200?text=No+Image",d=s==3?"wallpanel":"tanpa kategori";a+=`
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
                </div>`}),$("#product-list .row").append(a)}function M(t,s,a,e=!1){if(s==null)return;t.forEach(n=>{n.images&&n.images.forEach(l=>{l.path&&a.add(l.path)}),n.path&&a.add(n.path)});const i=Array.from(a),d=$("#mockup-carousel-inner"),g=$("#mockup-carousel-indicators"),f=["https://www.youtube.com/embed/BiiUrYAbL9s?autoplay=1&mute=1&rel=0&controls=0&amp;loop=1&playlist=BiiUrYAbL9s"],c=[];for(let n=1;n<=6;n++)n!==2&&c.push(`/dist/img/wpc/${n}.webp?v=${Date.now()}`);if(d.empty(),g.empty(),s==4){$("#mockup-carousel").carousel({interval:!1}),$("#mockup .carousel-control-next").addClass("d-none"),$("#mockup .carousel-control-prev").addClass("d-none"),f.forEach((n,l)=>{d.append(`
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
        `)}),$("#mockup").removeClass("d-none");return}else if(s==3&&e){$("#mockup-carousel").carousel({interval:3e3}),$("#mockup .carousel-control-next").removeClass("d-none"),$("#mockup .carousel-control-prev").removeClass("d-none"),c.forEach((n,l)=>{d.append(`
            <div class="carousel-item ${l===0?"active":""}">
                <div class="d-flex justify-content-center align-items-center">
                    <img src="${n}" 
                        alt="mockup" 
                        class="img-fluid w-100 rounded-3 d-block mx-auto mockup-image"
                    >
                </div>
            </div>
        `),g.append(`
            <li data-bs-target="#mockup-carousel" data-bs-slide-to="${l}" ${l===0?'class="active"':""}></li>
        `)}),$("#mockup").removeClass("d-none");return}i.length>0?(i.length===1?($("#mockup .carousel-control-next").addClass("d-none"),$("#mockup .carousel-control-prev").addClass("d-none"),g.addClass("d-none")):($("#mockup .carousel-control-next").removeClass("d-none"),$("#mockup .carousel-control-prev").removeClass("d-none"),g.removeClass("d-none")),i.forEach((n,l)=>{d.append(`
                <div class="carousel-item ${l===0?"active":""}">
                    <img src="/storage/${n}" alt="mockup" 
                        class="img-fluid w-100 rounded-lg d-block mx-auto mockup-image"
                    >
                </div>
            `),g.append(`
                <li data-target="#mockup-carousel" data-slide-to="${l}" ${l===0?'class="active"':""}></li>
            `)}),$("#mockup").removeClass("d-none")):$("#mockup").addClass("d-none")}let K=!1;function H(t){$(document).off("click",".category-filter"),$(document).on("click",".category-filter",async function(s){if(s.preventDefault(),K)return;K=!0;const a=$(this).data("id"),e=$(this).data("type");try{A({selectedJenis:t,category:a,type:e}),B(a),$("#filterModal").modal("hide"),V(),await x(!1)}catch(i){console.error("Gagal memuat data:",i)}finally{K=!1}})}function w(t,s="#modalVariants"){$(s).empty(),$("#modalPaket").empty(),$("#modalKepadatan").empty(),Array.isArray(t)&&t.length>0?t.forEach(a=>{const e=a.specification_values||[],i=a.name.toLowerCase();if(i==="warna")$("#paket").text("Warna"),e.length>0?e.forEach(d=>{a.pivot&&d.id===a.pivot.specification_value_id&&$("#modalPaket").append(`
                                <span class="badge badge-outline-primary px-2 py-1 kepadatan" data-value="${d.name}">
                                    ${d.name}
                                </span>
                            `)}):$("#modalPaket").append('<span class="text-muted">Tidak ada data</span>');else if(i==="density")e.length>0?e.forEach(d=>{a.pivot&&d.id===a.pivot.specification_value_id&&(e.length>1?$("#modalKepadatan").append(`
                                    <span class="badge badge-outline-primary px-2 py-1 kepadatan" data-value="${d.name}">
                                        ${d.name}
                                    </span>
                                `):$("#modalKepadatan").append(d.name))}):$("#modalKepadatan").append('<span class="text-muted">Tidak ada data</span>');else{const d=e.find(n=>a.pivot&&n.id===a.pivot.specification_value_id),g=d?d.name:"-";let f=d?d.unit:"";f?f=" "+f:["panjang","tinggi","lebar"].includes(i)?f=" cm":i==="ketebalan"&&(f=" mm");const c=`
                    <div class="row mb-1 variant-row">
                        <div class="col-4 col-sm-3 font-weight-bold">${a.name}</div>
                        <div class="col-auto">:</div>
                        <div class="col">${g}${f}</div>
                    </div>
                `;$(s).append(c)}}):($(s).append('<div class="text-muted">Tidak ada varian</div>'),$(".paket").hide())}function q({selectedJenis:t=null,hasCategory:s=!1,isRenderTypes:a=!1}){const e=$("#filter-container"),i=$("#category-container"),d=$("#catalog-col"),g=$(window).width()<768;if(e.removeClass("d-none"),i.removeClass("d-none"),d.removeClass("col-md-12 col-md-9"),a){e.addClass("d-none"),i.addClass("d-none"),d.addClass("col-md-12");return}if(t==1){e.addClass("d-none"),i.addClass("d-none"),d.addClass("col-md-12");return}if(!s){e.addClass("d-none"),i.addClass("d-none"),d.addClass("col-md-12");return}g?(e.addClass("d-none"),i.removeClass("d-none")):(e.removeClass("d-none"),i.removeClass("d-none")),d.addClass("col-md-9")}$(document).ready(function(){const t=new URLSearchParams(window.location.search),s=t.get("jenis"),a=t.get("category");let e,i,d=!1;A({selectedJenis:s,category:a}),x(),q({selectedJenis:s,hasCategory:a,isRenderTypes:!1}),$(window).on("resize",()=>q({selectedJenis:s,hasCategory:a,isRenderTypes:!1})),$("#search-input").on("input",function(){clearTimeout(e),e=setTimeout(()=>{V(),x()},500)}),$(window).on("scroll",function(){clearTimeout(i),i=setTimeout(async()=>{if(d||U())return;const c=$(window).scrollTop(),n=$(window).height(),l=$(document).height();if(c+n>=l-150){d=!0;try{I(!1),await x()}finally{d=!1}}},200)});function g(c,n=[],l=""){$("#carousel-product-image").empty(),$("#thumbnailGallery").empty();let m=c||[];(l==null?void 0:l.toLowerCase())==="uv board"&&n.length&&(m=[...c,...n]),m.forEach((r,y)=>{const k=y===0?"active":"";$("#carousel-product-image").append(`
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
            `)}),m.length<=1?$("#carouselProduct .carousel-control-next, #carouselProduct .carousel-control-prev").addClass("d-none"):$("#carouselProduct .carousel-control-next, #carouselProduct .carousel-control-prev").removeClass("d-none"),$("#carouselProduct").carousel({interval:3e3,pause:!1});let p;$("#thumbnailGallery").off("click").on("click",".thumbnail-image",function(){const r=$(this).data("index");$("#carouselProduct").carousel(r),$(".thumbnail-image").removeClass("active-thumbnail"),$(this).addClass("active-thumbnail"),setTimeout(()=>$(this).removeClass("active-thumbnail"),500),$("#carouselProduct").carousel("pause"),clearTimeout(p),p=setTimeout(()=>{$("#carouselProduct").carousel("cycle")},5e3)})}$(document).off("click",".product-card").on("click",".product-card",function(){const c=$(this).data("id"),n=$(this).data("code"),l=$(this).data("name"),m=$(this).data("category"),p=$(this).data("type"),r=$(this).data("jenis"),y=parseInt($(this).data("length"),10),k=parseFloat($(this).data("width")).toFixed(1),P=parseFloat($(this).data("density")).toFixed(1),b=$(this).data("url"),u=JSON.parse($(this).attr("data-specifications")||"[]"),T=$(this).attr("data-images"),v=JSON.parse($(this).attr("data-paket")||"[]");let j=$(this).data("height"),J=$(this).data("type-image"),C=[],S=[];if(f(c),T)try{C=JSON.parse(T.replace(/&quot;/g,'"'))}catch{C=[]}if(Array.isArray(v)&&(S=v.sort((h,L)=>h.order-L.order).map(h=>`/storage/${h.image}`)),$("#notes").show(),$("#modalPaket").empty(),r==="card-types"){V(),A({selectedJenis:s,type:p}),I(!1),x();return}r.toLowerCase()==="uv board"&&(w(u),$("#modalVideo, .lebar").hide(),$("#modalCategory").text(m),v.length>0?v.sort((h,L)=>h.order-L.order).map(h=>{$("#modalPaket").append(`
                        <span class="badge badge-outline-primary px-2 py-1 kepadatan" data-value="${h.name}">${h.name}</span>
                    `)}):($("#modalPaket").append('<span class="text-muted">Tidak ada paket</span>'),$("#notes").hide())),r.toLowerCase()==="wallboard"&&(w(u),$("#modalCategory").text(m),$("#ketebalan, .density, #notes, .paket,  #modalVideo, .lebar").hide()),r==="PVC Board"&&(w(u),$("#modalCategory").text(r),$("#modalVideo, .lebar, .paket").hide()),r==="Wallpanel"&&(w(u),$("#modalContact").data("type",p),$("#modalCategory").text(m+" / "+p),$("#ketebalan, #kepadatan, .paket, #modalVideo, #notes, .density").hide(),$("#modalGrafis").attr("src",`/storage/${J}`),$(".grafis").removeClass("d-none")),r.toLowerCase()==="aksesoris"&&($("#tinggi, #ketebalan, #kepadatan, .lebar, .density").hide(),$("#modalCategory").text(m),w(u),$("#modalVideoPlayer").empty(),$("#modalVideo, .density").hide(),b&&($("#modalVideoPlayer").append(`
                    <iframe class="embed-responsive-item"
                    src="${b}"
                    title="YouTube video player" frameborder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; web-share;"
                    referrerpolicy="strict-origin-when-cross-origin"
                    allowfullscreen></iframe>
                `),$("#modalVideo").show())),g(C,S,r),$("#modalName").text(l),$("#productModalLabel").text(l),$("#modalDownload").data("id",c),$("#productModal").modal("show"),$("#modalContact").data({jenis:r,category:m,code:n,length:y,width:k,height:j,density:P,type:p}),$(".kepadatan").removeClass("active"),$("#modalContact").data({kepadatan:null,paket:null}),$(".modalContact").prop("disabled",$(".kepadatan").length>0)}),$(document).on("click",".kepadatan",function(){$(".modalContact").prop("disabled",!1);const c=$(this).data("value");$(this).closest("#productModal").find(".kepadatan").removeClass("active"),$(this).addClass("active"),$("#notes").hide(),$("#modalContact").data("kepadatan",c)}),H(s),D(),F(),G();function f(c){$.ajax({url:`/products/${c}/viewed`,method:"POST",headers:{"X-CSRF-TOKEN":$('meta[name="csrf-token"]').attr("content")},success:n=>console.log("View recorded:",n),error:n=>console.error(n)})}});let o={selectedJenis:null,category:null,type:null,currentPage:1,isLoading:!1,lastPage:!1,firstLoad:!0,currentRequest:null,uniquePaths:new Set};function I(t){o.firstLoad=t}function A(t){o.selectedJenis=t.selectedJenis,o.category=t.category??null,o.type=t.type??null}function U(){return o.isLoading}function V(){o.currentPage=1,o.isLoading=!1,o.lastPage=!1,o.uniquePaths.clear(),$("#product-list .row").html("")}function x(){if(o.isLoading||o.lastPage)return Promise.resolve();o.isLoading=!0,Y();const t=$("#search-input").val();return o.currentRequest&&o.currentRequest.readyState!==4&&o.currentRequest.abort(),o.currentRequest=$.ajax({url:"/catalog",type:"GET",data:{page:o.currentPage,search:t,jenis:o.selectedJenis,category:o.category,type:o.type}}),new Promise((s,a)=>{o.currentRequest.done(e=>ee(e)).fail((e,i)=>{i!=="abort"&&(console.error("Gagal memuat data."),a())}).always(()=>{o.isLoading=!1,z(),o.currentRequest=null}).then(s)})}function ee(t){const s=t.data.data??[],a=t.types??[];o.type&&($("#backButton").removeClass("d-none"),$("#homeButton").addClass("d-none")),o.selectedJenis&&o.firstLoad&&a.length>0?(a.length>0&&($("#search-form").addClass("d-none"),Z(a,o.selectedJenis),o.lastPage=!0),E(t,!0)):(s.length>0?(Q(s,o.selectedJenis),o.currentPage++,o.currentPage>t.data.last_page&&(o.lastPage=!0)):(o.currentPage===1&&($("#mockup").addClass("d-none"),$("#product-list .row").append(`<div class="col-12"><img src="dist/img/no-data.png" alt="no-data"
                     class="img-fluid mx-auto d-block" style="max-width:100%;height:auto;margin:100px 0;"></div>`)),o.lastPage=!0),E(t,!1))}function E(t,s=!0){var l,m,p,r,y,k,P,b;const a=t.category??[],e=((p=(m=(l=t.data.data[0])==null?void 0:l.category)==null?void 0:m.types)==null?void 0:p.images)??[],i=(r=t.jenis)==null?void 0:r.name,d=((k=(y=t.data.data[0])==null?void 0:y.category)==null?void 0:k.images)??[],g=o.firstLoad&&(((P=t.types)==null?void 0:P.length)??0)>0,f=(((b=t.category)==null?void 0:b.length)??0)>0;q({selectedJenis:o.selectedJenis,hasCategory:f,isRenderTypes:g}),a.length===0?$("#category-container").addClass("d-none"):($("#category-container").removeClass("d-none"),e.length>0?M(e,o.selectedJenis,o.uniquePaths,s):d.length>0?M(d,o.selectedJenis,o.uniquePaths,s):o.selectedJenis==3?M([],o.selectedJenis,o.uniquePaths,s):o.selectedJenis==4?M([],o.selectedJenis,o.uniquePaths,s):$("#mockup").addClass("d-none"));const c={"PVC Board":()=>{$("#category-container").addClass("d-none"),$(".category-modal-container").text("Tidak ada kategori")},Wallboard:()=>R("Motif"),"UV Board":()=>R("Motif"),Wallpanel:()=>R("Motif"),Aksesoris:()=>R("Ukuran"),default:()=>R("Kategori")};(c[i]||c.default)();let n='<li class="nav-item font-poppins">';a.length>0?a.forEach(u=>{n+=`
                <a class="nav-link text-white category-filter d-flex align-items-center justify-content-start" 
                   href="#" data-jenis-id="${u.jenis_id}" data-id="${u.id}" data-type="${u.type_id}">
                    <img src="${u.path?"storage/"+u.path:"dist/img/product/1.webp"}" alt="${u.name}" 
                         class="mr-2 img-thumbnail" style="width:50px;height:50px;object-fit:contain;">
                    <span class="text-capitalize">${u.name}</span>
                </a>`}):n+='<a class="nav-link text-white category-filter" href="#">Tanpa Kategori</a>',n+="</li>",s?$("#category-menu-item, #category-menu-item-modal").html("tidak ada kategori"):$("#category-menu-item, #category-menu-item-modal").html(n),!o.category&&a.length>0?(o.category=a[0].id,B(o.category),V(),setTimeout(()=>{x()},200)):o.category&&$(`.category-filter[data-id="${o.category}"]`).addClass("active")}function R(t){$("#category-menu-item-label, #category-modal-item-label").html(t)}function O({selectedJenis:t=null,hasCategory:s=!1,isRenderTypes:a=!1}){const e=$("#filter-container"),i=$("#category-container"),d=$("#catalog-col"),g=$(window).width()<768;if(e.removeClass("d-none"),i.removeClass("d-none"),d.removeClass("col-md-12 col-md-9"),a){e.addClass("d-none"),i.addClass("d-none"),d.addClass("col-md-12");return}if(t==1){e.addClass("d-none"),i.addClass("d-none"),d.addClass("col-md-12");return}if(!s){e.addClass("d-none"),i.addClass("d-none"),d.addClass("col-md-12");return}g?(e.addClass("d-none"),i.removeClass("d-none")):(e.removeClass("d-none"),i.removeClass("d-none")),d.addClass("col-md-9")}$(document).ready(function(){const t=new URLSearchParams(window.location.search),s=t.get("jenis"),a=t.get("category");let e,i,d=!1;A({selectedJenis:s,category:a}),x(),O({selectedJenis:s,hasCategory:a,isRenderTypes:!1}),$(window).on("resize",()=>O({selectedJenis:s,hasCategory:a,isRenderTypes:!1})),$("#search-input").on("input",function(){clearTimeout(e),e=setTimeout(()=>{V(),x()},500)}),$(window).on("scroll",function(){clearTimeout(i),i=setTimeout(async()=>{if(d||U())return;const c=$(window).scrollTop(),n=$(window).height(),l=$(document).height();if(c+n>=l-150){d=!0;try{I(!1),await x()}finally{d=!1}}},200)});function g(c,n=[],l=""){$("#carousel-product-image").empty(),$("#thumbnailGallery").empty();let m=c||[];(l==null?void 0:l.toLowerCase())==="uv board"&&n.length&&(m=[...c,...n]),m.forEach((r,y)=>{const k=y===0?"active":"";$("#carousel-product-image").append(`
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
            `)}),m.length<=1?$("#carouselProduct .carousel-control-next, #carouselProduct .carousel-control-prev").addClass("d-none"):$("#carouselProduct .carousel-control-next, #carouselProduct .carousel-control-prev").removeClass("d-none"),$("#carouselProduct").carousel({interval:3e3,pause:!1});let p;$("#thumbnailGallery").off("click").on("click",".thumbnail-image",function(){const r=$(this).data("index");$("#carouselProduct").carousel(r),$(".thumbnail-image").removeClass("active-thumbnail"),$(this).addClass("active-thumbnail"),setTimeout(()=>$(this).removeClass("active-thumbnail"),500),$("#carouselProduct").carousel("pause"),clearTimeout(p),p=setTimeout(()=>{$("#carouselProduct").carousel("cycle")},5e3)})}$(document).off("click",".product-card").on("click",".product-card",function(){const c=$(this).data("id"),n=$(this).data("code"),l=$(this).data("name"),m=$(this).data("category"),p=$(this).data("type"),r=$(this).data("jenis"),y=parseInt($(this).data("length"),10),k=parseFloat($(this).data("width")).toFixed(1),P=parseFloat($(this).data("density")).toFixed(1),b=$(this).data("url"),u=JSON.parse($(this).attr("data-specifications")||"[]"),T=$(this).attr("data-images"),v=JSON.parse($(this).attr("data-paket")||"[]");let j=$(this).data("height"),J=$(this).data("type-image"),C=[],S=[];if(f(c),T)try{C=JSON.parse(T.replace(/&quot;/g,'"'))}catch{C=[]}if(Array.isArray(v)&&(S=v.sort((h,L)=>h.order-L.order).map(h=>`/storage/${h.image}`)),$("#notes").show(),$("#modalPaket").empty(),r==="card-types"){V(),A({selectedJenis:s,type:p}),I(!1),x();return}r.toLowerCase()==="uv board"&&(w(u),$("#modalVideo, .lebar").hide(),$("#modalCategory").text(m),v.length>0?v.sort((h,L)=>h.order-L.order).map(h=>{$("#modalPaket").append(`
                        <span class="badge badge-outline-primary px-2 py-1 kepadatan" data-value="${h.name}">${h.name}</span>
                    `)}):($("#modalPaket").append('<span class="text-muted">Tidak ada paket</span>'),$("#notes").hide())),r.toLowerCase()==="wallboard"&&(w(u),$("#modalCategory").text(m),$("#ketebalan, .density, #notes, .paket,  #modalVideo, .lebar").hide()),r==="PVC Board"&&(w(u),$("#modalCategory").text(r),$("#modalVideo, .lebar, .paket").hide()),r==="Wallpanel"&&(w(u),$("#modalContact").data("type",p),$("#modalCategory").text(m+" / "+p),$("#ketebalan, #kepadatan, .paket, #modalVideo, #notes, .density").hide(),$("#modalGrafis").attr("src",`/storage/${J}`),$(".grafis").removeClass("d-none")),r.toLowerCase()==="aksesoris"&&($("#tinggi, #ketebalan, #kepadatan, .lebar, .density").hide(),$("#modalCategory").text(m),w(u),$("#modalVideoPlayer").empty(),$("#modalVideo, .density").hide(),b&&($("#modalVideoPlayer").append(`
                    <iframe class="embed-responsive-item"
                    src="${b}"
                    title="YouTube video player" frameborder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; web-share;"
                    referrerpolicy="strict-origin-when-cross-origin"
                    allowfullscreen></iframe>
                `),$("#modalVideo").show())),g(C,S,r),$("#modalName").text(l),$("#productModalLabel").text(l),$("#modalDownload").data("id",c),$("#productModal").modal("show"),$("#modalContact").data({jenis:r,category:m,code:n,length:y,width:k,height:j,density:P,type:p}),$(".kepadatan").removeClass("active"),$("#modalContact").data({kepadatan:null,paket:null}),$(".modalContact").prop("disabled",$(".kepadatan").length>0)}),$(document).on("click",".kepadatan",function(){$(".modalContact").prop("disabled",!1);const c=$(this).data("value");$(this).closest("#productModal").find(".kepadatan").removeClass("active"),$(this).addClass("active"),$("#notes").hide(),$("#modalContact").data("kepadatan",c)}),H(s),D(),F(),G();function f(c){$.ajax({url:`/products/${c}/viewed`,method:"POST",headers:{"X-CSRF-TOKEN":$('meta[name="csrf-token"]').attr("content")},success:n=>console.log("View recorded:",n),error:n=>console.error(n)})}});
