let M=null;function R(t){M=t}function J(){return M}function V(){$("#loading").removeClass("d-none")}function H(){$("#loading").addClass("d-none")}function E(t){return t.slice().sort((o,n)=>(n.type==="motif")-(o.type==="motif")).map(o=>"/storage/"+o.path)}function G(){$(document).on("click",".modalDownload",function(t){t.preventDefault();const o=$(this).data("id"),n="catalog/pdf/product?id="+encodeURIComponent(o);D(this,n)}),$("#btn-download").on("click",function(t){t.preventDefault(),D(this,"catalog/pdf?category="+encodeURIComponent(J()))})}function D(t,o){const n=$(t);n.prop("disabled",!0).html('<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Mengunduh...'),window.open(o,"_blank"),setTimeout(()=>{n.prop("disabled",!1).html('<i class="fa fa-file-download"></i> Download')},5e3)}function F(){$(document).on("click",".modalContact",function(t){t.preventDefault(),console.log("Klik tombol order",$(this).data("code"));const o="62816659688",n=$(this).data("jenis");console.log(n.toLowerCase());let e="";n.toLowerCase()=="wallpanel"?e=`Halo Admin,
Saya tertarik dengan produk berikut:

• Tipe Wallpanel: *${$(this).data("type")}*
• Kode : *${$(this).data("code")}*
• panjang : *${$(this).data("length")} cm*
• tinggi : *${$(this).data("height")} cm*
• lebar : *${$(this).data("width")} cm*
• Produk : *${$(this).data("jenis")}*
• Kategori: *${$(this).data("category")}*

Apakah produk ini masih tersedia? Terima kasih.`:n.toLowerCase()=="pvc board"?e=`Halo Admin,
Saya tertarik dengan produk berikut:

• Produk : *${$(this).data("jenis")}*
• Ketebalan : *${$(this).data("code")}*
• density: *${$(this).data("kepadatan")??"-"}*

Apakah produk ini masih tersedia? Terima kasih.`:n.toLowerCase()=="uv board"?e=`Halo Admin,
Saya tertarik dengan produk berikut:

• Kode Motif : *${$(this).data("code")}*
• Produk : *${$(this).data("jenis")}*
• Kategori: *${$(this).data("category")}*

• Paket: *${$(this).data("kepadatan")??"-"}*

Apakah produk ini masih tersedia? Terima kasih.`:n.toLowerCase()=="aksesoris"?e=`Halo Admin,
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

Apakah produk ini masih tersedia? Terima kasih.`,window.open(`https://wa.me/${o}?text=${encodeURIComponent(e)}`,"_blank")})}function O(){$(window).scroll(function(){$(this).scrollTop()>100?$("#btn-scroll-top").fadeIn():$("#btn-scroll-top").fadeOut()}),$("#btn-scroll-top").click(function(){return $("html, body").animate({scrollTop:0},500),!1})}function U(t,o){$("#btn-download").removeClass("d-none");let n="";t.forEach(e=>{var h,m,d,u,i,y,w,T,b,x,C;const c=e.photo?`/storage/${e.photo}`:"https://via.placeholder.com/300x200?text=No+Image",p=E(e.images),f=[c,...p],g=JSON.stringify(f).replace(/"/g,"&quot;"),r=JSON.stringify(e.packages).replace(/"/g,"&quot;"),s=((h=e.category)==null?void 0:h.name)??"Tanpa Kategori";let l=e.code;o==3?l=e.code.split(" ").slice(4).join(" ").trim():o==4||o==5?l=e.code.split(" ").slice(1).join(" "):l=e.code,((m=e.category)==null?void 0:m.display_style)==="square"||o===null?n+=`
                    <div class="col-md-2 col-6 mb-4">
                        <div class="h-100 product-card"
                    `:((d=e.category)==null?void 0:d.display_style)==="rectangle"?n+=`
                    <div class="col-md-4 col-6 mb-4">
                        <div class="h-100 product-card"
                    `:n+=`
                    <div class="col-md-2 col-6 mb-4">
                        <div class="h-100 product-card d-flex flex-column justify-content-center align-items-center"
                    `,n+=`
                    data-id="${e.id}"
                    data-code="${l}"
                    data-category="${s}"
                    data-jenis="${((i=(u=e.category)==null?void 0:u.jenis)==null?void 0:i.name)??""}"
                    data-length="${e.panjang}"
                    data-height="${e.tinggi}"
                    data-width="${e.lebar}"
                    data-density="${e.ketebalan}"
                    data-images="${g}"
                    data-image="${c}"
                    data-type="${((w=(y=e.category)==null?void 0:y.types)==null?void 0:w.name)??""}"
                    data-type-image="${((b=(T=e.category)==null?void 0:T.types)==null?void 0:b.image)??""}"
                    data-url="${e.url_video}"
                    data-paket="${r}"
                    >
                       <img 
                            src="${c}" 
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
                                object-position: ${((C=(x=e.category)==null?void 0:x.jenis)==null?void 0:C.name)==="PVC Board"?"bottom center":"center center"};
                            "
                        >
                        <div class="card-body d-flex flex-column text-center">
                            <h4 class="card-title font-weight-bold text-uppercase mb-2">
                                ${l}
                            </h4>
                            <h6 class="card-text text-muted mb-1">${s}</h6>
                        </div>
                    </div>
                </div>`}),$("#product-list .row").append(n)}function _(t,o){$("#btn-download").addClass("d-none");let n="";t.forEach(e=>{const c=e.thumbnail?`/storage/${e.thumbnail}`:"https://via.placeholder.com/300x200?text=No+Image";console.log(o);const p=o==3?"wallpanel":"tanpa kategori";n+=`
                    <div class="col-md-2 col-6 mb-4">
                        <div class="h-100 product-card d-flex flex-column justify-content-center align-items-center"
                    `,n+=`
                    data-id="${e.id}"
                    data-jenis="tipe-wallpanel"
                    data-category="${p}"
                    data-type="${e.id}"
                    >
                       <img 
                            src="${c}" 
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
                            <h6 class="card-text text-muted mb-1">${p}</h6>
                        </div>
                    </div>
                </div>`}),$("#product-list .row").append(n)}function L(t,o,n,e=!1){if(o==null)return;t.forEach(s=>{s.images&&s.images.forEach(l=>{l.path&&n.add(l.path)}),s.path&&n.add(s.path)});const c=Array.from(n),p=$("#mockup-carousel-inner"),f=$("#mockup-carousel-indicators"),g=["https://www.youtube.com/embed/BiiUrYAbL9s?autoplay=1&mute=1&rel=0&controls=0&amp;loop=1&playlist=BiiUrYAbL9s"],r=[];for(let s=1;s<=6;s++)s!==2&&r.push(`/dist/img/wpc/${s}.webp?v=${Date.now()}`);if(p.empty(),f.empty(),o==4){$("#mockup-carousel").carousel({interval:!1}),$("#mockup .carousel-control-next").addClass("d-none"),$("#mockup .carousel-control-prev").addClass("d-none"),g.forEach((s,l)=>{p.append(`
            <div class="carousel-item ${l===0?"active":""}">
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
        `)}),$("#mockup").removeClass("d-none");return}else if(o==3&&e){$("#mockup-carousel").carousel({interval:3e3}),$("#mockup .carousel-control-next").removeClass("d-none"),$("#mockup .carousel-control-prev").removeClass("d-none"),r.forEach((s,l)=>{p.append(`
            <div class="carousel-item ${l===0?"active":""}">
                <div class="d-flex justify-content-center align-items-center">
                    <img src="${s}" 
                        alt="mockup" 
                        class="img-fluid w-100 rounded-3 d-block mx-auto mockup-image"
                    >
                </div>
            </div>
        `),f.append(`
            <li data-bs-target="#mockup-carousel" data-bs-slide-to="${l}" ${l===0?'class="active"':""}></li>
        `)}),$("#mockup").removeClass("d-none");return}c.length>0?(c.length===1?($("#mockup .carousel-control-next").addClass("d-none"),$("#mockup .carousel-control-prev").addClass("d-none"),f.addClass("d-none")):($("#mockup .carousel-control-next").removeClass("d-none"),$("#mockup .carousel-control-prev").removeClass("d-none")),c.slice(0,5).forEach((s,l)=>{p.append(`
                <div class="carousel-item ${l===0?"active":""}">
                    <img src="/storage/${s}" alt="mockup" 
                        class="img-fluid w-100 rounded-lg d-block mx-auto mockup-image"
                    >
                </div>
            `),f.append(`
                <li data-target="#mockup-carousel" data-slide-to="${l}" ${l===0?'class="active"':""}></li>
            `)}),$("#mockup").removeClass("d-none")):$("#mockup").addClass("d-none")}let a={selectedJenis:null,category:null,type:null,currentPage:1,isLoading:!1,lastPage:!1,firstLoad:!0,currentRequest:null,uniquePaths:new Set};function q(t){a.firstLoad=t}function B(t){a.selectedJenis=t.selectedJenis,a.category=t.category??null,a.type=t.type??null}function W(){return a.isLoading}function N(){a.currentPage=1,a.isLoading=!1,a.lastPage=!1,a.uniquePaths.clear(),$("#product-list .row").html("")}function v(){if(a.isLoading||a.lastPage)return Promise.resolve();console.log("loadMoreData"),a.isLoading=!0,V();const t=$("#search-input").val();return a.currentRequest&&a.currentRequest.readyState!==4&&a.currentRequest.abort(),a.currentRequest=$.ajax({url:"/catalog",type:"GET",data:{page:a.currentPage,search:t,jenis:a.selectedJenis,category:a.category,type:a.type}}),new Promise((o,n)=>{a.currentRequest.done(e=>z(e)).fail((e,c)=>{c!=="abort"&&(console.error("Gagal memuat data."),n())}).always(()=>{a.isLoading=!1,H(),a.currentRequest=null}).then(o)})}function z(t){const o=t.data.data??[],n=t.types??[];a.type&&($("#backButton").removeClass("d-none"),$("#homeButton").addClass("d-none")),a.selectedJenis==3&&a.firstLoad?(n.length>0&&($("#search-form").addClass("d-none"),_(n,a.selectedJenis),a.currentPage++,a.currentPage>t.data.last_page&&(a.lastPage=!0)),K(t,!0)):(o.length>0?(U(o,a.selectedJenis),a.currentPage++,a.currentPage>t.data.last_page&&(a.lastPage=!0)):(a.currentPage===1&&($("#mockup").addClass("d-none"),$("#product-list .row").append(`<div class="col-12"><img src="dist/img/no-data.png" alt="no-data"
                     class="img-fluid mx-auto d-block" style="max-width:100%;height:auto;margin:100px 0;"></div>`)),a.lastPage=!0),K(t,!1))}function K(t,o=!0){var r,s,l,h,m,d;const n=t.category??[],e=((l=(s=(r=t.data.data[0])==null?void 0:r.category)==null?void 0:s.types)==null?void 0:l.images)??[],c=(h=t.jenis)==null?void 0:h.name,p=((d=(m=t.data.data[0])==null?void 0:m.category)==null?void 0:d.images)??[];n.length===0?$("#category-container").addClass("d-none"):($("#category-container").removeClass("d-none"),e.length>0?L(e,a.selectedJenis,a.uniquePaths,o):p.length>0?L(p,a.selectedJenis,a.uniquePaths,o):a.selectedJenis==3?L([],a.selectedJenis,a.uniquePaths,o):a.selectedJenis==4?L([],a.selectedJenis,a.uniquePaths,o):$("#mockup").addClass("d-none"));const f={"PVC Board":()=>{$("#category-container").addClass("d-none"),$(".category-modal-container").text("Tidak ada kategori")},Wallboard:()=>P("Motif"),"UV Board":()=>P("Motif"),Wallpanel:()=>P("Motif"),Aksesoris:()=>P("Ukuran"),default:()=>P("Kategori")};(f[c]||f.default)();let g='<li class="nav-item font-poppins">';n.length>0?n.forEach(u=>{g+=`
                <a class="nav-link text-white category-filter d-flex align-items-center justify-content-start" 
                   href="#" data-jenis-id="${u.jenis_id}" data-id="${u.id}" data-type="${u.type_id}">
                    <img src="${u.path?"storage/"+u.path:"dist/img/product/1.webp"}" alt="${u.name}" 
                         class="mr-2 img-thumbnail" style="width:50px;height:50px;object-fit:contain;">
                    <span class="text-capitalize">${u.name}</span>
                </a>`}):g+='<a class="nav-link text-white category-filter" href="#">Tanpa Kategori</a>',g+="</li>",o?$("#category-menu-item, #category-menu-item-modal").html("tidak ada kategori"):$("#category-menu-item, #category-menu-item-modal").html(g),!a.category&&n.length>0?(console.log("auto choose category"),a.category=n[0].id,R(a.category),N(),setTimeout(()=>{v()},200)):a.category&&$(`.category-filter[data-id="${a.category}"]`).addClass("active")}function P(t){$("#category-menu-item-label, #category-modal-item-label").html(t)}let S=!1;function Y(t){$(document).off("click",".category-filter"),$(document).on("click",".category-filter",async function(o){if(o.preventDefault(),S)return;S=!0;const n=$(this).data("id"),e=$(this).data("type");console.log(e);try{B({selectedJenis:t,category:n,type:e}),R(n),$("#filterModal").modal("hide"),N(),await v(!1)}catch(c){console.error("Gagal memuat data:",c)}finally{S=!1}})}function A(t=null){$(window).width()<768?$("#filter-container").addClass("d-none"):$("#filter-container").removeClass("d-none"),(t==1||t==3)&&($("#filter-container").addClass("d-none"),$("#catalog-col").removeClass("col-md-10").addClass("col-md-12"))}$(document).ready(function(){const t=new URLSearchParams(window.location.search),o=t.get("jenis"),n=t.get("category");let e,c,p=!1;(o==5||o==2)&&sessionStorage.removeItem("selectedWallpanel"),B({selectedJenis:o,category:n}),v(),o&&($("#category-container").removeClass("d-md-none"),$("#catalog-col").removeClass("center-content")),A(o),$(window).on("resize",()=>A(o)),$("#search-input").on("input",function(){clearTimeout(e),e=setTimeout(()=>{N(),v()},500)}),$(window).on("scroll",function(){clearTimeout(c),c=setTimeout(async()=>{if(p||W())return;const r=$(window).scrollTop(),s=$(window).height(),l=$(document).height();if(r+s>=l-150){p=!0;try{q(!1),await v()}finally{p=!1}}},200)});function f(r,s=[],l=""){$("#carousel-product-image").empty(),$("#thumbnailGallery").empty();let h=r||[];(l==null?void 0:l.toLowerCase())==="uv board"&&s.length&&(h=[...r,...s]),h.forEach((d,u)=>{const i=u===0?"active":"";$("#carousel-product-image").append(`
                <div class="carousel-item ${i}">
                    <img src="${d}" class="img-fluid d-block mx-auto"
                        style="width:100%;max-width:400px;aspect-ratio:1/1;object-fit:cover;border-radius:8px;border:1px solid #ccc;">
                </div>
            `),$("#thumbnailGallery").append(`
                <div class="col-2 mb-0 d-flex justify-content-center">
                    <div style="height:90%">
                        <img src="${d}" 
                            class="img-thumbnail thumbnail-image p-0 w-100 h-100"
                            style="aspect-ratio:1/1;border:1px solid #ccc;border-radius:8px;object-fit:cover;cursor:pointer;"
                            data-index="${u}">
                    </div>
                </div>
            `)}),h.length<=1?$("#carouselProduct .carousel-control-next, #carouselProduct .carousel-control-prev").addClass("d-none"):$("#carouselProduct .carousel-control-next, #carouselProduct .carousel-control-prev").removeClass("d-none"),$("#carouselProduct").carousel({interval:3e3,pause:!1});let m;$("#thumbnailGallery").off("click").on("click",".thumbnail-image",function(){const d=$(this).data("index");$("#carouselProduct").carousel(d),$(".thumbnail-image").removeClass("active-thumbnail"),$(this).addClass("active-thumbnail"),setTimeout(()=>$(this).removeClass("active-thumbnail"),500),$("#carouselProduct").carousel("pause"),clearTimeout(m),m=setTimeout(()=>{$("#carouselProduct").carousel("cycle")},5e3)})}$(document).on("click",".product-card",function(){const r=$(this).data("id"),s=$(this).data("code"),l=$(this).data("category"),h=$(this).data("type"),m=$(this).data("jenis"),d=parseInt($(this).data("length"),10),u=parseFloat($(this).data("width")).toFixed(1);let i=$(this).data("height");const y=parseFloat($(this).data("density")).toFixed(1),w=$(this).data("url");let T=$(this).data("type-image"),b=[],x=[];const C=$(this).attr("data-images");if(C)try{b=JSON.parse(C.replace(/&quot;/g,'"'))}catch{b=[]}const j=JSON.parse($(this).attr("data-paket")||"[]");if(Array.isArray(j)&&(x=j.sort((k,I)=>k.order-I.order).map(k=>`/storage/${k.image}`)),$("#modalPaket").empty(),m==="tipe-wallpanel"){N(),B({selectedJenis:3,type:h}),q(!1),v(),A(),$("#catalog-col").toggleClass("col-md-10 col-md-12");return}m.toLowerCase()==="uv board"&&(g(r),i=parseInt(i,10),$("#modalVideo, .lebar").hide(),$("#modalCategory").text(l),$("#modalLength").text(d&&!isNaN(d)?d+" cm":"-"),$("#modalHeight").text(i&&!isNaN(i)?i+" cm":"-"),$("#modalDensity").text(y&&!isNaN(y)?y+" mm":"-"),$("#modalKepadatan").html(`
                <span class="">0.9</span>
            `),j.length>0?j.sort((k,I)=>k.order-I.order).map(k=>{$("#modalPaket").append(`
                        <span class="badge badge-outline-primary px-2 py-1 kepadatan" data-value="${k.name}">${k.name}</span>
                    `)}):($("#modalPaket").append('<span class="text-muted">Tidak ada paket</span>'),$("#notes").hide())),m.toLowerCase()==="wallboard"&&(g(r),i=parseInt(i,10),$("#modalCategory").text(l),$("#modalLength").text(d&&!isNaN(d)?d+" cm":"-"),$("#modalHeight").text(i&&!isNaN(i)?i+" cm":"-"),$("#ketebalan, #kepadatan, #notes, .paket,  #modalVideo, .lebar").hide()),m==="PVC Board"&&(g(r),i=parseInt(i,10),$("#modalCategory").text(m),$("#modalLength").text(d&&!isNaN(d)?d+" cm":"-"),$("#modalHeight").text(i&&!isNaN(i)?i+" cm":"-"),$("#modalDensity").text(y&&!isNaN(y)?y+" mm":"-"),$("#modalKepadatan").html(`
                <span class="badge badge-outline-primary kepadatan" data-value="0,4">0,4 (Lite)</span>
                <span class="badge badge-outline-primary kepadatan" data-value="0,55">0,55 (Standar)</span>
                <span class="badge badge-outline-primary kepadatan" data-value="0,7">0,7 (Heavy-duty)</span>
            `),$(".paket,  #modalVideo, .lebar").hide()),m==="Wallpanel"&&(g(r),i=parseFloat(i).toFixed(1),$("#modalContact").data("type",h),$("#modalCategory").text(l+" / "+h),$("#ketebalan, #kepadatan, .paket, #modalVideo, #notes").hide(),$("#modalGrafis").attr("src",`/storage/${T}`),$(".grafis").removeClass("d-none"),$("#modalLength").text(d&&!isNaN(d)?d+" cm":"-"),$("#modalHeight").text(i&&!isNaN(i)?i+" cm":"-"),$("#modalLebar").text(u&&!isNaN(u)?u+" cm":"-")),m.toLowerCase()==="aksesoris"&&(g(r),$("#tinggi, #ketebalan, #kepadatan, .lebar").hide(),$("#paket").text("Warna"),$("#modalCategory").text(l),$("#modalPaket").append(`
                <span class="badge badge-pill badge-outline-primary kepadatan" data-value="Black">Black</span>
                <span class="badge badge-pill badge-outline-primary kepadatan" data-value="Bronze">Bronze</span>
                <span class="badge badge-pill badge-outline-primary kepadatan" data-value="Rose Gold">Rose Gold</span>
                <span class="badge badge-pill badge-outline-primary kepadatan" data-value="Dark Gray">Dark Gray</span>

            `),$("#modalLength").text("3 m"),$("#modalVideoPlayer").empty(),$("#modalVideo").hide(),w&&($("#modalVideoPlayer").append(`
                    <iframe class="embed-responsive-item"
                    src="${w}"
                    title="YouTube video player" frameborder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; web-share;"
                    referrerpolicy="strict-origin-when-cross-origin"
                    allowfullscreen></iframe>
                `),$("#modalVideo").show())),f(b,x,m),$("#modalCode").text(s),$("#productModalLabel").text(s),$("#modalDownload").data("id",r),$("#productModal").modal("show"),$("#modalContact").data({jenis:m,category:l,code:s,length:d,width:u,height:i,density:y,type:h}),$(".kepadatan").removeClass("active"),$("#modalContact").data({kepadatan:null,paket:null}),$(".modalContact").prop("disabled",$(".kepadatan").length>0)}),$(document).on("click",".kepadatan",function(){$(".modalContact").prop("disabled",!1);const r=$(this).data("value");$(this).closest("#productModal").find(".kepadatan").removeClass("active"),$(this).addClass("active"),$("#notes").hide(),$("#modalContact").data("kepadatan",r)}),Y(o),G(),F(),O();function g(r){$.ajax({url:`/products/${r}/viewed`,method:"POST",headers:{"X-CSRF-TOKEN":$('meta[name="csrf-token"]').attr("content")},success:s=>console.log("View recorded:",s),error:s=>console.error(s)})}});
