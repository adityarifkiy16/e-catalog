let M=null;function R(a){M=a}function V(){return M}function q(){$("#loading").removeClass("d-none")}function H(){$("#loading").addClass("d-none")}function G(a){return a.slice().sort((n,o)=>(o.type==="motif")-(n.type==="motif")).map(n=>"/storage/"+n.path)}function E(){$(document).on("click",".modalDownload",function(a){a.preventDefault();const n=$(this).data("id"),o="catalog/pdf/product?id="+encodeURIComponent(n);B(this,o)}),$("#btn-download").on("click",function(a){a.preventDefault(),B(this,"catalog/pdf?category="+encodeURIComponent(V()))})}function B(a,n){const o=$(a);o.prop("disabled",!0).html('<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Mengunduh...'),window.open(n,"_blank"),setTimeout(()=>{o.prop("disabled",!1).html('<i class="fa fa-file-download"></i> Download')},5e3)}function F(){$(document).on("click",".modalContact",function(a){a.preventDefault(),console.log("Klik tombol order",$(this).data("code"));const n="62816659688",o=$(this).data("jenis");console.log(o.toLowerCase());let e="";o.toLowerCase()=="wallpanel"?e=`Halo Admin,
Saya tertarik dengan produk berikut:

• Tipe Wallpanel: *${$(this).data("type")}*
• Kode : *${$(this).data("code")}*
• panjang : *${$(this).data("length")} cm*
• tinggi : *${$(this).data("height")} cm*
• lebar : *${$(this).data("width")} cm*
• Produk : *${$(this).data("jenis")}*
• Kategori: *${$(this).data("category")}*

Apakah produk ini masih tersedia? Terima kasih.`:o.toLowerCase()=="pvc board"?e=`Halo Admin,
Saya tertarik dengan produk berikut:

• Produk : *${$(this).data("jenis")}*
• Ketebalan : *${$(this).data("code")}*
• density: *${$(this).data("kepadatan")??"-"}*

Apakah produk ini masih tersedia? Terima kasih.`:o.toLowerCase()=="uv board"?e=`Halo Admin,
Saya tertarik dengan produk berikut:

• Kode Motif : *${$(this).data("code")}*
• Produk : *${$(this).data("jenis")}*
• Kategori: *${$(this).data("category")}*

• Paket: *${$(this).data("kepadatan")??"-"}*

Apakah produk ini masih tersedia? Terima kasih.`:o.toLowerCase()=="aksesoris"?e=`Halo Admin,
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

Apakah produk ini masih tersedia? Terima kasih.`,window.open(`https://wa.me/${n}?text=${encodeURIComponent(e)}`,"_blank")})}function J(){$(window).scroll(function(){$(this).scrollTop()>100?$("#btn-scroll-top").fadeIn():$("#btn-scroll-top").fadeOut()}),$("#btn-scroll-top").click(function(){return $("html, body").animate({scrollTop:0},500),!1})}function O(a,n){$("#btn-download").removeClass("d-none");let o="";a.forEach(e=>{var g,u,r,f,l,y,w,L,k,x,C;const c=e.photo?`/storage/${e.photo}`:"https://via.placeholder.com/300x200?text=No+Image",m=G(e.images),h=[c,...m],p=JSON.stringify(h).replace(/"/g,"&quot;"),s=JSON.stringify(e.packages).replace(/"/g,"&quot;"),i=((g=e.category)==null?void 0:g.name)??"Tanpa Kategori";let d=e.code;n==3?d=e.code.split(" ").slice(4).join(" ").trim():n==5?d=e.code.split(" ").slice(1).join(" "):d=e.code,((u=e.category)==null?void 0:u.display_style)==="square"||n===null?o+=`
                    <div class="col-md-2 col-6 mb-4">
                        <div class="h-100 product-card"
                    `:((r=e.category)==null?void 0:r.display_style)==="rectangle"?o+=`
                    <div class="col-md-4 col-6 mb-4">
                        <div class="h-100 product-card"
                    `:o+=`
                    <div class="col-md-2 col-6 mb-4">
                        <div class="h-100 product-card d-flex flex-column justify-content-center align-items-center"
                    `,o+=`
                    data-id="${e.id}"
                    data-code="${d}"
                    data-category="${i}"
                    data-jenis="${((l=(f=e.category)==null?void 0:f.jenis)==null?void 0:l.name)??""}"
                    data-length="${e.panjang}"
                    data-height="${e.tinggi}"
                    data-width="${e.lebar}"
                    data-density="${e.ketebalan}"
                    data-images="${p}"
                    data-image="${c}"
                    data-type="${((w=(y=e.category)==null?void 0:y.types)==null?void 0:w.name)??""}"
                    data-type-image="${((k=(L=e.category)==null?void 0:L.types)==null?void 0:k.image)??""}"
                    data-url="${e.url_video}"
                    data-paket="${s}"
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
                                ${d}
                            </h4>
                            <h6 class="card-text text-muted mb-1">${i}</h6>
                        </div>
                    </div>
                </div>`}),$("#product-list .row").append(o)}function U(a,n){$("#btn-download").addClass("d-none");let o="";a.forEach(e=>{const c=e.thumbnail?`/storage/${e.thumbnail}`:"https://via.placeholder.com/300x200?text=No+Image";console.log(n);const m=n==3?"wallpanel":"tanpa kategori";o+=`
                    <div class="col-md-2 col-6 mb-4">
                        <div class="h-100 product-card d-flex flex-column justify-content-center align-items-center"
                    `,o+=`
                    data-id="${e.id}"
                    data-jenis="tipe-wallpanel"
                    data-category="${m}"
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
                            <h6 class="card-text text-muted mb-1">${m}</h6>
                        </div>
                    </div>
                </div>`}),$("#product-list .row").append(o)}function _(a,n,o){if(n==null)return;a.forEach(s=>{s.path&&o.add(s.path)});const e=Array.from(o),c=$("#mockup-carousel-inner"),m=$("#mockup-carousel-indicators"),h=["https://www.youtube.com/embed/BiiUrYAbL9s?autoplay=1&mute=1&rel=0&controls=0&amp;loop=1&playlist=BiiUrYAbL9s"],p=["/dist/img/wpc/1.webp","/dist/img/wpc/2.webp","/dist/img/wpc/3.jpg","/dist/img/wpc/4.webp"];if(c.empty(),m.empty(),n==4){$("#mockup-carousel").carousel({interval:!1}),$("#mockup .carousel-control-next").addClass("d-none"),$("#mockup .carousel-control-prev").addClass("d-none"),h.forEach((s,i)=>{c.append(`
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
        `)}),$("#mockup").removeClass("d-none");return}else if(n==3){$("#mockup-carousel").carousel({interval:3e3}),$("#mockup .carousel-control-next").removeClass("d-none"),$("#mockup .carousel-control-prev").removeClass("d-none"),p.forEach((s,i)=>{c.append(`
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
        `)}),$("#mockup").removeClass("d-none");return}e.length>0?(e.length===1?($("#mockup .carousel-control-next").addClass("d-none"),$("#mockup .carousel-control-prev").addClass("d-none")):($("#mockup .carousel-control-next").removeClass("d-none"),$("#mockup .carousel-control-prev").removeClass("d-none")),e.slice(0,5).forEach((s,i)=>{c.append(`
                <div class="carousel-item ${i===0?"active":""}">
                    <img src="/storage/${s}" alt="mockup" 
                        class="img-fluid w-100 rounded-lg d-block mx-auto mockup-image"
                    >
                </div>
            `),m.append(`
                <li data-target="#mockup-carousel" data-slide-to="${i}" ${i===0?'class="active"':""}></li>
            `)}),$("#mockup").removeClass("d-none")):$("#mockup").addClass("d-none")}let t={selectedJenis:null,category:null,type:null,currentPage:1,isLoading:!1,lastPage:!1,firstLoad:!0,currentRequest:null,uniquePaths:new Set};function D(a){t.firstLoad=a}function A(a){t.selectedJenis=a.selectedJenis,t.category=a.category??null,t.type=a.type??null}function W(){return t.isLoading}function j(){t.currentPage=1,t.isLoading=!1,t.lastPage=!1,t.uniquePaths.clear(),$("#product-list .row").html("")}function v(){if(t.isLoading||t.lastPage)return Promise.resolve();console.log("loadMoreData"),t.isLoading=!0,q();const a=$("#search-input").val();return t.currentRequest&&t.currentRequest.readyState!==4&&t.currentRequest.abort(),t.currentRequest=$.ajax({url:"/catalog",type:"GET",data:{page:t.currentPage,search:a,jenis:t.selectedJenis,category:t.category,type:t.type}}),new Promise((n,o)=>{t.currentRequest.done(e=>z(e)).fail((e,c)=>{c!=="abort"&&(console.error("Gagal memuat data."),o())}).always(()=>{t.isLoading=!1,H(),t.currentRequest=null}).then(n)})}function z(a){const n=a.data.data??[],o=a.types??[];t.type&&($("#backButton").removeClass("d-none"),$("#homeButton").addClass("d-none")),t.selectedJenis==3&&t.firstLoad?(o.length>0&&($("#search-form").addClass("d-none"),U(o,t.selectedJenis),t.currentPage++,t.currentPage>a.data.last_page&&(t.lastPage=!0)),K(a,!0)):(n.length>0?(O(n,t.selectedJenis),t.currentPage++,t.currentPage>a.data.last_page&&(t.lastPage=!0)):(t.currentPage===1&&($("#mockup").addClass("d-none"),$("#product-list .row").append(`<div class="col-12"><img src="dist/img/no-data.png" alt="no-data"
                     class="img-fluid mx-auto d-block" style="max-width:100%;height:auto;margin:100px 0;"></div>`)),t.lastPage=!0),K(a,!1))}function K(a,n=!0){var p,s,i;const o=a.category??[],e=(p=a.jenis)==null?void 0:p.name,c=((i=(s=a.data.data[0])==null?void 0:s.category)==null?void 0:i.images)??[];o.length===0?$("#category-container").addClass("d-none"):($("#category-container").removeClass("d-none"),c.length===0&&$("#mockup").addClass("d-none"),_(c,t.selectedJenis,t.uniquePaths));const m={"PVC Board":()=>{$("#category-container").addClass("d-none"),$(".category-modal-container").text("Tidak ada kategori")},Wallboard:()=>P("Motif"),"UV Board":()=>P("Motif"),Wallpanel:()=>P("Motif"),Aksesoris:()=>P("Ukuran"),default:()=>P("Kategori")};(m[e]||m.default)();let h='<li class="nav-item font-poppins">';o.length>0?o.forEach(d=>{h+=`
                <a class="nav-link text-white category-filter d-flex align-items-center justify-content-start" 
                   href="#" data-jenis-id="${d.jenis_id}" data-id="${d.id}" data-type="${d.type_id}">
                    <img src="${d.path?"storage/"+d.path:"dist/img/product/1.webp"}" alt="${d.name}" 
                         class="mr-2 img-thumbnail" style="width:50px;height:50px;object-fit:contain;">
                    <span class="text-capitalize">${d.name}</span>
                </a>`}):h+='<a class="nav-link text-white category-filter" href="#">Tanpa Kategori</a>',h+="</li>",n?$("#category-menu-item, #category-menu-item-modal").html("tidak ada kategori"):$("#category-menu-item, #category-menu-item-modal").html(h),!t.category&&o.length>0?(console.log("auto choose category"),t.category=o[0].id,R(t.category),j(),setTimeout(()=>{v()},200)):t.category&&$(`.category-filter[data-id="${t.category}"]`).addClass("active")}function P(a){$("#category-menu-item-label, #category-modal-item-label").html(a)}let I=!1;function Y(a){$(document).off("click",".category-filter"),$(document).on("click",".category-filter",async function(n){if(n.preventDefault(),I)return;I=!0;const o=$(this).data("id"),e=$(this).data("type");console.log(e);try{A({selectedJenis:a,category:o,type:e}),R(o),$("#filterModal").modal("hide"),j(),await v(!1)}catch(c){console.error("Gagal memuat data:",c)}finally{I=!1}})}function S(a=null){$(window).width()<768?$("#filter-container").addClass("d-none"):$("#filter-container").removeClass("d-none"),(a==1||a==3)&&($("#filter-container").addClass("d-none"),$("#catalog-col").removeClass("col-md-10").addClass("col-md-12"))}$(document).ready(function(){const a=new URLSearchParams(window.location.search),n=a.get("jenis"),o=a.get("category");let e,c,m=!1;(n==5||n==2)&&sessionStorage.removeItem("selectedWallpanel"),A({selectedJenis:n,category:o}),v(),n&&($("#category-container").removeClass("d-md-none"),$("#catalog-col").removeClass("center-content")),S(n),$(window).on("resize",()=>S(n)),$("#search-input").on("input",function(){clearTimeout(e),e=setTimeout(()=>{j(),v()},500)}),$(window).on("scroll",function(){clearTimeout(c),c=setTimeout(async()=>{if(m||W())return;const s=$(window).scrollTop(),i=$(window).height(),d=$(document).height();if(s+i>=d-150){m=!0;try{D(!1),await v()}finally{m=!1}}},200)});function h(s,i=[],d=""){$("#carousel-product-image").empty(),$("#thumbnailGallery").empty();let g=s||[];(d==null?void 0:d.toLowerCase())==="uv board"&&i.length&&(g=[...s,...i]),g.forEach((r,f)=>{const l=f===0?"active":"";$("#carousel-product-image").append(`
                <div class="carousel-item ${l}">
                    <img src="${r}" class="img-fluid d-block mx-auto"
                        style="width:100%;max-width:400px;aspect-ratio:1/1;object-fit:cover;border-radius:8px;border:1px solid #ccc;">
                </div>
            `),$("#thumbnailGallery").append(`
                <div class="col-2 mb-0 d-flex justify-content-center">
                    <div style="height:90%">
                        <img src="${r}" 
                            class="img-thumbnail thumbnail-image p-0 w-100 h-100"
                            style="aspect-ratio:1/1;border:1px solid #ccc;border-radius:8px;object-fit:cover;cursor:pointer;"
                            data-index="${f}">
                    </div>
                </div>
            `)}),g.length<=1?$("#carouselProduct .carousel-control-next, #carouselProduct .carousel-control-prev").addClass("d-none"):$("#carouselProduct .carousel-control-next, #carouselProduct .carousel-control-prev").removeClass("d-none"),$("#carouselProduct").carousel({interval:3e3,pause:!1});let u;$("#thumbnailGallery").off("click").on("click",".thumbnail-image",function(){const r=$(this).data("index");$("#carouselProduct").carousel(r),$(".thumbnail-image").removeClass("active-thumbnail"),$(this).addClass("active-thumbnail"),setTimeout(()=>$(this).removeClass("active-thumbnail"),500),$("#carouselProduct").carousel("pause"),clearTimeout(u),u=setTimeout(()=>{$("#carouselProduct").carousel("cycle")},5e3)})}$(document).on("click",".product-card",function(){const s=$(this).data("id"),i=$(this).data("code"),d=$(this).data("category"),g=$(this).data("type"),u=$(this).data("jenis"),r=parseInt($(this).data("length"),10),f=parseFloat($(this).data("width")).toFixed(1);let l=$(this).data("height");const y=parseFloat($(this).data("density")).toFixed(1),w=$(this).data("url");let L=$(this).data("type-image"),k=[],x=[];const C=$(this).attr("data-images");if(C)try{k=JSON.parse(C.replace(/&quot;/g,'"'))}catch{k=[]}const T=JSON.parse($(this).attr("data-paket")||"[]");if(Array.isArray(T)&&(x=T.sort((b,N)=>b.order-N.order).map(b=>`/storage/${b.image}`)),$("#modalPaket").empty(),u==="tipe-wallpanel"){j(),A({selectedJenis:3,type:g}),D(!1),v(),S(),$("#catalog-col").toggleClass("col-md-10 col-md-12");return}u.toLowerCase()==="uv board"&&(p(s),l=parseInt(l,10),$("#modalVideo, .lebar").hide(),$("#modalCategory").text(d),$("#modalLength").text(r&&!isNaN(r)?r+" cm":"-"),$("#modalHeight").text(l&&!isNaN(l)?l+" cm":"-"),$("#modalDensity").text(y&&!isNaN(y)?y+" mm":"-"),$("#modalKepadatan").html(`
                <span class="">0.9</span>
            `),T.length>0?T.sort((b,N)=>b.order-N.order).map(b=>{$("#modalPaket").append(`
                        <span class="badge badge-outline-primary px-2 py-1 kepadatan" data-value="${b.name}">${b.name}</span>
                    `)}):($("#modalPaket").append('<span class="text-muted">Tidak ada paket</span>'),$("#notes").hide())),u.toLowerCase()==="wallboard"&&(p(s),l=parseInt(l,10),$("#modalCategory").text(d),$("#modalLength").text(r&&!isNaN(r)?r+" cm":"-"),$("#modalHeight").text(l&&!isNaN(l)?l+" cm":"-"),$("#ketebalan, #kepadatan, #notes, .paket,  #modalVideo, .lebar").hide()),u==="PVC Board"&&(p(s),l=parseInt(l,10),$("#modalCategory").text(u),$("#modalLength").text(r&&!isNaN(r)?r+" cm":"-"),$("#modalHeight").text(l&&!isNaN(l)?l+" cm":"-"),$("#modalDensity").text(y&&!isNaN(y)?y+" mm":"-"),$("#modalKepadatan").html(`
                <span class="badge badge-outline-primary kepadatan" data-value="0,4">0,4 (Lite)</span>
                <span class="badge badge-outline-primary kepadatan" data-value="0,55">0,55 (Standar)</span>
                <span class="badge badge-outline-primary kepadatan" data-value="0,7">0,7 (Heavy-duty)</span>
            `),$(".paket,  #modalVideo, .lebar").hide()),u==="Wallpanel"&&(p(s),l=parseFloat(l).toFixed(1),$("#modalContact").data("type",g),$("#modalCategory").text(d+" / "+g),$("#ketebalan, #kepadatan, .paket, #modalVideo, #notes").hide(),$("#modalGrafis").attr("src",`/storage/${L}`),$(".grafis").removeClass("d-none"),$("#modalLength").text(r&&!isNaN(r)?r+" cm":"-"),$("#modalHeight").text(l&&!isNaN(l)?l+" cm":"-"),$("#modalLebar").text(f&&!isNaN(f)?f+" cm":"-")),u.toLowerCase()==="aksesoris"&&(p(s),$("#tinggi, #ketebalan, #kepadatan, .lebar").hide(),$("#paket").text("Warna"),$("#modalCategory").text(d),$("#modalPaket").append(`
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
                `),$("#modalVideo").show())),h(k,x,u),$("#modalCode").text(i),$("#productModalLabel").text(i),$("#modalDownload").data("id",s),$("#productModal").modal("show"),$("#modalContact").data({jenis:u,category:d,code:i,length:r,width:f,height:l,density:y,type:g}),$(".kepadatan").removeClass("active"),$("#modalContact").data({kepadatan:null,paket:null}),$(".modalContact").prop("disabled",$(".kepadatan").length>0)}),$(document).on("click",".kepadatan",function(){$(".modalContact").prop("disabled",!1);const s=$(this).data("value");$(this).closest("#productModal").find(".kepadatan").removeClass("active"),$(this).addClass("active"),$("#notes").hide(),$("#modalContact").data("kepadatan",s)}),Y(n),E(),F(),J();function p(s){$.ajax({url:`/products/${s}/viewed`,method:"POST",headers:{"X-CSRF-TOKEN":$('meta[name="csrf-token"]').attr("content")},success:i=>console.log("View recorded:",i),error:i=>console.error(i)})}});
