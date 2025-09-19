let D=null;function K(a){D=a}function R(){return D}function V(){$("#loading").removeClass("d-none")}function q(){$("#loading").addClass("d-none")}function H(a){return a.slice().sort((n,o)=>(o.type==="motif")-(n.type==="motif")).map(n=>"/storage/"+n.path)}function E(){$(document).on("click",".modalDownload",function(a){a.preventDefault();const n=$(this).data("id"),o="catalog/pdf/product?id="+encodeURIComponent(n);S(this,o)}),$("#btn-download").on("click",function(a){a.preventDefault(),S(this,"catalog/pdf?category="+encodeURIComponent(R()))})}function S(a,n){const o=$(a);o.prop("disabled",!0).html('<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Mengunduh...'),window.open(n,"_blank"),setTimeout(()=>{o.prop("disabled",!1).html('<i class="fa fa-file-download"></i> Download')},5e3)}function F(){$(document).on("click",".modalContact",function(a){a.preventDefault(),console.log("Klik tombol order",$(this).data("code"));const n="62816659688",o=$(this).data("jenis");console.log(o.toLowerCase());let e="";o.toLowerCase()=="wallpanel"?e=`Halo Admin,
Saya tertarik dengan produk berikut:

• Tipe Wallpanel: *${$(this).data("type")}*
• Kode Motif : *${$(this).data("code")}*
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

Apakah produk ini masih tersedia? Terima kasih.`,window.open(`https://wa.me/${n}?text=${encodeURIComponent(e)}`,"_blank")})}function G(){$(window).scroll(function(){$(this).scrollTop()>100?$("#btn-scroll-top").fadeIn():$("#btn-scroll-top").fadeOut()}),$("#btn-scroll-top").click(function(){return $("html, body").animate({scrollTop:0},500),!1})}function J(a,n){$("#btn-download").removeClass("d-none");let o="";a.forEach(e=>{var h,u,c,f,d,y,w,b,x;const r=e.photo?`/storage/${e.photo}`:"https://via.placeholder.com/300x200?text=No+Image",m=H(e.images),g=[r,...m],p=JSON.stringify(g).replace(/"/g,"&quot;"),s=JSON.stringify(e.packages).replace(/"/g,"&quot;"),l=((h=e.category)==null?void 0:h.name)??"Tanpa Kategori";let i=e.code;n==3?i=e.code.split(" ").slice(4).join(" ").trim():n==5?i=e.code.split(" ").slice(1).join(" "):i=e.code,((u=e.category)==null?void 0:u.display_style)==="square"||n===null?o+=`
                    <div class="col-md-2 col-6 mb-4">
                        <div class="h-100 product-card"
                    `:((c=e.category)==null?void 0:c.display_style)==="rectangle"?o+=`
                    <div class="col-md-4 col-6 mb-4">
                        <div class="h-100 product-card"
                    `:o+=`
                    <div class="col-md-2 col-6 mb-4">
                        <div class="h-100 product-card d-flex flex-column justify-content-center align-items-center"
                    `,o+=`
                    data-id="${e.id}"
                    data-code="${i}"
                    data-category="${l}"
                    data-jenis="${((d=(f=e.category)==null?void 0:f.jenis)==null?void 0:d.name)??""}"
                    data-length="${e.panjang}"
                    data-height="${e.tinggi}"
                    data-width="${e.lebar}"
                    data-density="${e.ketebalan}"
                    data-images="${p}"
                    data-image="${r}"
                    data-type="${((w=(y=e.category)==null?void 0:y.types)==null?void 0:w.name)??""}"
                    data-url="${e.url_video}"
                    data-paket="${s}"
                    >
                       <img 
                            src="${r}" 
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
                                object-position: ${((x=(b=e.category)==null?void 0:b.jenis)==null?void 0:x.name)==="PVC Board"?"bottom center":"center center"};
                            "
                        >
                        <div class="card-body d-flex flex-column text-center">
                            <h4 class="card-title font-weight-bold text-uppercase mb-2">
                                ${i}
                            </h4>
                            <h6 class="card-text text-muted mb-1">${l}</h6>
                        </div>
                    </div>
                </div>`}),$("#product-list .row").append(o)}function O(a,n){$("#btn-download").addClass("d-none");let o="";a.forEach(e=>{const r=e.thumbnail?`/storage/${e.thumbnail}`:"https://via.placeholder.com/300x200?text=No+Image";console.log(n);const m=n==3?"wallpanel":"tanpa kategori";o+=`
                    <div class="col-md-2 col-6 mb-4">
                        <div class="h-100 product-card d-flex flex-column justify-content-center align-items-center"
                    `,o+=`
                    data-id="${e.id}"
                    data-jenis="tipe-wallpanel"
                    data-category="${m}"
                    data-type="${e.id}"
                    >
                       <img 
                            src="${r}" 
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
                </div>`}),$("#product-list .row").append(o)}function U(a,n,o){if(n==null)return;a.forEach(s=>{s.path&&o.add(s.path)});const e=Array.from(o),r=$("#mockup-carousel-inner"),m=$("#mockup-carousel-indicators"),g=["https://www.youtube.com/embed/BiiUrYAbL9s?autoplay=1&mute=1&rel=0&controls=0&amp;loop=1&playlist=BiiUrYAbL9s"],p=["/dist/img/wpc/1.webp","/dist/img/wpc/2.webp","/dist/img/wpc/3.jpg","/dist/img/wpc/4.webp"];if(r.empty(),m.empty(),n==4){$("#mockup-carousel").carousel({interval:!1}),$("#mockup .carousel-control-next").addClass("d-none"),$("#mockup .carousel-control-prev").addClass("d-none"),g.forEach((s,l)=>{r.append(`
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
        `)}),$("#mockup").removeClass("d-none");return}else if(n==3){$("#mockup-carousel").carousel({interval:3e3}),$("#mockup .carousel-control-next").removeClass("d-none"),$("#mockup .carousel-control-prev").removeClass("d-none"),p.forEach((s,l)=>{r.append(`
            <div class="carousel-item ${l===0?"active":""}">
                <div class="d-flex justify-content-center align-items-center">
                    <img src="${s}" 
                        alt="mockup" 
                        class="img-fluid w-100 rounded-3 d-block mx-auto mockup-image"
                    >
                </div>
            </div>
        `),m.append(`
            <li data-bs-target="#mockup-carousel" data-bs-slide-to="${l}" ${l===0?'class="active"':""}></li>
        `)}),$("#mockup").removeClass("d-none");return}e.length>0?(e.length===1?($("#mockup .carousel-control-next").addClass("d-none"),$("#mockup .carousel-control-prev").addClass("d-none")):($("#mockup .carousel-control-next").removeClass("d-none"),$("#mockup .carousel-control-prev").removeClass("d-none")),e.slice(0,5).forEach((s,l)=>{r.append(`
                <div class="carousel-item ${l===0?"active":""}">
                    <img src="/storage/${s}" id="mockup-image" alt="mockup" 
                        class="img-fluid w-100 rounded-lg d-block mx-auto"
                    >
                </div>
            `),m.append(`
                <li data-target="#mockup-carousel" data-slide-to="${l}" ${l===0?'class="active"':""}></li>
            `)}),$("#mockup").removeClass("d-none")):$("#mockup").addClass("d-none")}let t={selectedJenis:null,category:null,type:null,currentPage:1,isLoading:!1,lastPage:!1,firstLoad:!0,currentRequest:null,uniquePaths:new Set};function A(a){t.firstLoad=a}function N(a){t.selectedJenis=a.selectedJenis,t.category=a.category??null,t.type=a.type??null}function _(){return t.isLoading}function L(){t.currentPage=1,t.isLoading=!1,t.lastPage=!1,t.uniquePaths.clear(),$("#product-list .row").html("")}function v(){if(t.isLoading||t.lastPage)return Promise.resolve();console.log("loadMoreData"),t.isLoading=!0,V();const a=$("#search-input").val();return t.currentRequest&&t.currentRequest.readyState!==4&&t.currentRequest.abort(),t.currentRequest=$.ajax({url:"/catalog",type:"GET",data:{page:t.currentPage,search:a,jenis:t.selectedJenis,category:t.category,type:t.type}}),new Promise((n,o)=>{t.currentRequest.done(e=>W(e)).fail((e,r)=>{r!=="abort"&&(console.error("Gagal memuat data."),o())}).always(()=>{t.isLoading=!1,q(),t.currentRequest=null}).then(n)})}function W(a){const n=a.data.data??[],o=a.types??[];t.type&&($("#backButton").removeClass("d-none"),$("#homeButton").addClass("d-none")),t.selectedJenis==3&&t.firstLoad?(o.length>0&&($("#search-form").addClass("d-none"),O(o,t.selectedJenis),t.currentPage++,t.currentPage>a.data.last_page&&(t.lastPage=!0)),B(a,!0)):(n.length>0?(J(n,t.selectedJenis),t.currentPage++,t.currentPage>a.data.last_page&&(t.lastPage=!0)):(t.currentPage===1&&($("#mockup").addClass("d-none"),$("#product-list .row").append(`<div class="col-12"><img src="dist/img/no-data.png" alt="no-data"
                     class="img-fluid mx-auto d-block" style="max-width:100%;height:auto;margin:100px 0;"></div>`)),t.lastPage=!0),B(a,!1))}function B(a,n=!0){var p,s,l;const o=a.category??[],e=(p=a.jenis)==null?void 0:p.name,r=((l=(s=a.data.data[0])==null?void 0:s.category)==null?void 0:l.images)??[];o.length===0?$("#category-container").addClass("d-none"):($("#category-container").removeClass("d-none"),r.length===0&&$("#mockup").addClass("d-none"),U(r,t.selectedJenis,t.uniquePaths));const m={"PVC Board":()=>{$("#category-container").addClass("d-none"),$(".category-modal-container").text("Tidak ada kategori")},Wallboard:()=>C("Motif"),"UV Board":()=>C("Motif"),Wallpanel:()=>C("Motif"),Aksesoris:()=>C("Ukuran"),default:()=>C("Kategori")};(m[e]||m.default)();let g='<li class="nav-item font-poppins">';o.length>0?o.forEach(i=>{g+=`
                <a class="nav-link text-white category-filter d-flex align-items-center justify-content-start" 
                   href="#" data-jenis-id="${i.jenis_id}" data-id="${i.id}" data-type="${i.type_id}">
                    <img src="${i.path?"storage/"+i.path:"dist/img/product/1.webp"}" alt="${i.name}" 
                         class="mr-2 img-thumbnail" style="width:50px;height:50px;object-fit:contain;">
                    <span class="text-capitalize">${i.name}</span>
                </a>`}):g+='<a class="nav-link text-white category-filter" href="#">Tanpa Kategori</a>',g+="</li>",n?$("#category-menu-item, #category-menu-item-modal").html("tidak ada kategori"):$("#category-menu-item, #category-menu-item-modal").html(g),!t.category&&o.length>0?(console.log("auto choose category"),t.category=o[0].id,K(t.category),L(),setTimeout(()=>{v()},200)):t.category&&$(`.category-filter[data-id="${t.category}"]`).addClass("active")}function C(a){$("#category-menu-item-label, #category-modal-item-label").html(a)}let j=!1;function z(a){$(document).off("click",".category-filter"),$(document).on("click",".category-filter",async function(n){if(n.preventDefault(),j)return;j=!0;const o=$(this).data("id"),e=$(this).data("type");console.log(e);try{N({selectedJenis:a,category:o,type:e}),K(o),$("#filterModal").modal("hide"),L(),await v(!1)}catch(r){console.error("Gagal memuat data:",r)}finally{j=!1}})}function M(a=null){$(window).width()<768?$("#filter-container").addClass("d-none"):$("#filter-container").removeClass("d-none"),(a==1||a==3)&&($("#filter-container").addClass("d-none"),$("#catalog-col").removeClass("col-md-10").addClass("col-md-12"))}$(document).ready(function(){const a=new URLSearchParams(window.location.search),n=a.get("jenis"),o=a.get("category");let e,r,m=!1;(n==5||n==2)&&sessionStorage.removeItem("selectedWallpanel"),N({selectedJenis:n,category:o}),v(),n&&($("#category-container").removeClass("d-md-none"),$("#catalog-col").removeClass("center-content")),M(n),$(window).on("resize",()=>M(n)),$("#search-input").on("input",function(){clearTimeout(e),e=setTimeout(()=>{L(),v()},500)}),$(window).on("scroll",function(){clearTimeout(r),r=setTimeout(async()=>{if(m||_())return;const s=$(window).scrollTop(),l=$(window).height(),i=$(document).height();if(s+l>=i-150){m=!0;try{A(!1),await v()}finally{m=!1}}},200)});function g(s,l=[],i=""){$("#carousel-product-image").empty(),$("#thumbnailGallery").empty();let h=s||[];(i==null?void 0:i.toLowerCase())==="uv board"&&l.length&&(h=[...s,...l]),h.forEach((c,f)=>{const d=f===0?"active":"";$("#carousel-product-image").append(`
                <div class="carousel-item ${d}">
                    <img src="${c}" class="img-fluid d-block mx-auto"
                        style="width:100%;max-width:400px;aspect-ratio:1/1;object-fit:cover;border-radius:8px;border:1px solid #ccc;">
                </div>
            `),$("#thumbnailGallery").append(`
                <div class="col-2 mb-0 d-flex justify-content-center">
                    <div style="height:90%">
                        <img src="${c}" 
                            class="img-thumbnail thumbnail-image p-0 w-100 h-100"
                            style="aspect-ratio:1/1;border:1px solid #ccc;border-radius:8px;object-fit:cover;cursor:pointer;"
                            data-index="${f}">
                    </div>
                </div>
            `)}),h.length<=1?$("#carouselProduct .carousel-control-next, #carouselProduct .carousel-control-prev").addClass("d-none"):$("#carouselProduct .carousel-control-next, #carouselProduct .carousel-control-prev").removeClass("d-none"),$("#carouselProduct").carousel({interval:3e3,pause:!1});let u;$("#thumbnailGallery").off("click").on("click",".thumbnail-image",function(){const c=$(this).data("index");$("#carouselProduct").carousel(c),$(".thumbnail-image").removeClass("active-thumbnail"),$(this).addClass("active-thumbnail"),setTimeout(()=>$(this).removeClass("active-thumbnail"),500),$("#carouselProduct").carousel("pause"),clearTimeout(u),u=setTimeout(()=>{$("#carouselProduct").carousel("cycle")},5e3)})}$(document).on("click",".product-card",function(){const s=$(this).data("id"),l=$(this).data("code"),i=$(this).data("category"),h=$(this).data("type"),u=$(this).data("jenis"),c=parseInt($(this).data("length"),10),f=parseFloat($(this).data("width")).toFixed(1);let d=$(this).data("height");const y=parseFloat($(this).data("density")).toFixed(1),w=$(this).data("url");let b=[],x=[];const I=$(this).attr("data-images");if(I)try{b=JSON.parse(I.replace(/&quot;/g,'"'))}catch{b=[]}const P=JSON.parse($(this).attr("data-paket")||"[]");if(Array.isArray(P)&&(x=P.sort((k,T)=>k.order-T.order).map(k=>`/storage/${k.image}`)),$("#modalPaket").empty(),u==="tipe-wallpanel"){L(),N({selectedJenis:3,type:h}),A(!1),v(),$("#catalog-col").toggleClass("col-md-10 col-md-12");return}u.toLowerCase()==="uv board"&&(p(s),d=parseInt(d,10),$("#modalVideo").hide(),$("#modalCategory").text(i),$("#modalLength").text(c&&!isNaN(c)?c+" cm":"-"),$("#modalHeight").text(d&&!isNaN(d)?d+" cm":"-"),$("#modalDensity").text(y&&!isNaN(y)?y+" mm":"-"),$("#modalKepadatan").html(`
                <span class="">0.9</span>
            `),P.length>0?P.sort((k,T)=>k.order-T.order).map(k=>{$("#modalPaket").append(`
                        <span class="badge badge-outline-primary px-2 py-1 kepadatan" data-value="${k.name}">${k.name}</span>
                    `)}):($("#modalPaket").append('<span class="text-muted">Tidak ada paket</span>'),$("#notes, .lebar").hide())),u.toLowerCase()==="wallboard"&&(p(s),d=parseInt(d,10),$("#modalCategory").text(i),$("#modalLength").text(c&&!isNaN(c)?c+" cm":"-"),$("#modalHeight").text(d&&!isNaN(d)?d+" cm":"-"),$("#ketebalan, #kepadatan, #notes, .paket,  #modalVideo, .lebar").hide()),u==="PVC Board"&&(p(s),d=parseInt(d,10),$("#modalCategory").text(u),$("#modalLength").text(c&&!isNaN(c)?c+" cm":"-"),$("#modalHeight").text(d&&!isNaN(d)?d+" cm":"-"),$("#modalDensity").text(y&&!isNaN(y)?y+" mm":"-"),$("#modalKepadatan").html(`
                <span class="badge badge-outline-primary kepadatan" data-value="0,4">0,4 (Lite)</span>
                <span class="badge badge-outline-primary kepadatan" data-value="0,55">0,55 (Standar)</span>
                <span class="badge badge-outline-primary kepadatan" data-value="0,7">0,7 (Heavy-duty)</span>
            `),$(".paket,  #modalVideo, .lebar").hide()),u==="Wallpanel"&&(p(s),d=parseFloat(d).toFixed(1),$("#modalContact").data("type",h),$("#modalCategory").text(i+" / "+h),$("#ketebalan, #kepadatan, .paket, #modalVideo").hide(),$("#modalLength").text(c&&!isNaN(c)?c+" cm":"-"),$("#modalHeight").text(d&&!isNaN(d)?d+" cm":"-"),$("#modalLebar").text(f&&!isNaN(f)?f+" cm":"-")),u.toLowerCase()==="aksesoris"&&(p(s),$("#tinggi, #ketebalan, #kepadatan, .lebar").hide(),$("#paket").text("Warna"),$("#modalCategory").text(i),$("#modalPaket").append(`
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
                `),$("#modalVideo").show())),g(b,x,u),$("#modalCode").text(l),$("#productModalLabel").text(l),$("#modalDownload").data("id",s),$("#productModal").modal("show"),$("#modalContact").data({jenis:u,category:i,code:l}),$(".kepadatan").removeClass("active"),$("#modalContact").data({kepadatan:null,paket:null}),$("#notes").show(),$(".modalContact").prop("disabled",$(".kepadatan").length>0)}),$(document).on("click",".kepadatan",function(){$(".modalContact").prop("disabled",!1);const s=$(this).data("value");$(this).closest("#productModal").find(".kepadatan").removeClass("active"),$(this).addClass("active"),$("#notes").hide(),$("#modalContact").data("kepadatan",s)}),z(n),E(),F(),G();function p(s){$.ajax({url:`/products/${s}/viewed`,method:"POST",headers:{"X-CSRF-TOKEN":$('meta[name="csrf-token"]').attr("content")},success:l=>console.log("View recorded:",l),error:l=>console.error(l)})}});
