let R=null;function B(a){R=a}function N(){return R}function O(){$("#loading").removeClass("d-none")}function U(){$("#loading").addClass("d-none")}function F(a){return a.slice().sort((n,t)=>(t.type==="motif")-(n.type==="motif")).map(n=>"/storage/"+n.path)}function H(){$(document).on("click",".modalDownload",function(a){a.preventDefault();const n=$(this).data("id"),t="catalog/pdf/product?id="+encodeURIComponent(n);M(this,t)}),$("#btn-download").on("click",function(a){a.preventDefault(),M(this,"catalog/pdf?category="+encodeURIComponent(N()))})}function M(a,n){const t=$(a);t.prop("disabled",!0).html('<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Mengunduh...'),window.open(n,"_blank"),setTimeout(()=>{t.prop("disabled",!1).html('<i class="fa fa-file-download"></i> Download')},5e3)}function W(){$(document).on("click",".modalContact",function(a){a.preventDefault(),console.log("Klik tombol order",$(this).data("code"));const n="62816659688",t=$(this).data("jenis");console.log(t.toLowerCase());let e="";t.toLowerCase()=="wallpanel"?e=`Halo Admin,
Saya tertarik dengan produk berikut:

• Tipe Wallpanel: *${$(this).data("type")}*
• Kode : *${$(this).data("code")}*
• panjang : *${$(this).data("length")} cm*
• tinggi : *${$(this).data("height")} cm*
• lebar : *${$(this).data("width")} cm*
• Produk : *${$(this).data("jenis")}*
• Kategori: *${$(this).data("category")}*

Apakah produk ini masih tersedia? Terima kasih.`:t.toLowerCase()=="pvc board"?e=`Halo Admin,
Saya tertarik dengan produk berikut:

• Produk : *${$(this).data("jenis")}*
• Ketebalan : *${$(this).data("code")}*
• density: *${$(this).data("kepadatan")??"-"}*

Apakah produk ini masih tersedia? Terima kasih.`:t.toLowerCase()=="uv board"?e=`Halo Admin,
Saya tertarik dengan produk berikut:

• Kode Motif : *${$(this).data("code")}*
• Produk : *${$(this).data("jenis")}*
• Kategori: *${$(this).data("category")}*

• Paket: *${$(this).data("kepadatan")??"-"}*

Apakah produk ini masih tersedia? Terima kasih.`:t.toLowerCase()=="aksesoris"?e=`Halo Admin,
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

Apakah produk ini masih tersedia? Terima kasih.`,window.open(`https://wa.me/${n}?text=${encodeURIComponent(e)}`,"_blank")})}function G(){$(window).scroll(function(){$(this).scrollTop()>100?$("#btn-scroll-top").fadeIn():$("#btn-scroll-top").fadeOut()}),$("#btn-scroll-top").click(function(){return $("html, body").animate({scrollTop:0},500),!1})}function Y(a,n){$("#btn-download").removeClass("d-none"),console.log(a);let t="";a.forEach(e=>{var u,h,m,p,v,T,w,y,C,k,j;const r=e.photo?`/storage/${e.photo}`:"https://via.placeholder.com/300x200?text=No+Image",i=F(e.images),g=[r,...i],c=JSON.stringify(g).replace(/"/g,"&quot;"),l=JSON.stringify(e.packages).replace(/"/g,"&quot;"),s=((u=e.category)==null?void 0:u.name)??"Tanpa Kategori";((h=e.category)==null?void 0:h.display_style)==="square"||n===null?t+=`
                    <div class="col-md-2 col-6 mb-4">
                        <div class="h-100 product-card"
                    `:((m=e.category)==null?void 0:m.display_style)==="rectangle"?t+=`
                    <div class="col-md-4 col-6 mb-4">
                        <div class="h-100 product-card"
                    `:t+=`
                    <div class="col-md-2 col-6 mb-4">
                        <div class="h-100 product-card d-flex flex-column justify-content-center align-items-center"
                    `;const d=JSON.stringify(e.specifications).replace(/"/g,"&quot;");t+=`
                    data-id="${e.id}"
                    data-code="${e.code}"
                    data-name="${e.name}"
                    data-category="${s}"
                    data-jenis="${((v=(p=e.category)==null?void 0:p.jenis)==null?void 0:v.name)??""}"
                    data-images="${c}"
                    data-image="${r}"
                    data-type="${((w=(T=e.category)==null?void 0:T.types)==null?void 0:w.name)??""}"
                    data-type-image="${((C=(y=e.category)==null?void 0:y.types)==null?void 0:C.image)??""}"
                    data-url="${e.url_video}"
                    data-paket="${l}"
                    data-specifications = "${d}"
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
                                object-position: ${((j=(k=e.category)==null?void 0:k.jenis)==null?void 0:j.name)==="PVC Board"?"bottom center":"center center"};
                            "
                        >
                        <div class="card-body d-flex flex-column text-center">
                            <h4 class="card-title font-weight-bold text-uppercase mb-2">
                                ${e.name}
                            </h4>
                            <h6 class="card-text text-muted mb-1">${s}</h6>
                        </div>
                    </div>
                </div>`}),$("#product-list .row").append(t)}function z(a,n){$("#btn-download").addClass("d-none");let t="";a.forEach(e=>{const r=e.thumbnail?`/storage/${e.thumbnail}`:"https://via.placeholder.com/300x200?text=No+Image";console.log(n);const i=n==3?"wallpanel":"tanpa kategori";t+=`
                    <div class="col-md-2 col-6 mb-4">
                        <div class="h-100 product-card d-flex flex-column justify-content-center align-items-center"
                    `,t+=`
                    data-id="${e.id}"
                    data-jenis="tipe-wallpanel"
                    data-category="${i}"
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
                            <h6 class="card-text text-muted mb-1">${i}</h6>
                        </div>
                    </div>
                </div>`}),$("#product-list .row").append(t)}function L(a,n,t,e=!1){if(n==null)return;a.forEach(s=>{s.images&&s.images.forEach(d=>{d.path&&t.add(d.path)}),s.path&&t.add(s.path)});const r=Array.from(t),i=$("#mockup-carousel-inner"),g=$("#mockup-carousel-indicators"),c=["https://www.youtube.com/embed/BiiUrYAbL9s?autoplay=1&mute=1&rel=0&controls=0&amp;loop=1&playlist=BiiUrYAbL9s"],l=[];for(let s=1;s<=6;s++)s!==2&&l.push(`/dist/img/wpc/${s}.webp?v=${Date.now()}`);if(i.empty(),g.empty(),n==4){$("#mockup-carousel").carousel({interval:!1}),$("#mockup .carousel-control-next").addClass("d-none"),$("#mockup .carousel-control-prev").addClass("d-none"),c.forEach((s,d)=>{i.append(`
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
        `)}),$("#mockup").removeClass("d-none");return}else if(n==3&&e){$("#mockup-carousel").carousel({interval:3e3}),$("#mockup .carousel-control-next").removeClass("d-none"),$("#mockup .carousel-control-prev").removeClass("d-none"),l.forEach((s,d)=>{i.append(`
            <div class="carousel-item ${d===0?"active":""}">
                <div class="d-flex justify-content-center align-items-center">
                    <img src="${s}" 
                        alt="mockup" 
                        class="img-fluid w-100 rounded-3 d-block mx-auto mockup-image"
                    >
                </div>
            </div>
        `),g.append(`
            <li data-bs-target="#mockup-carousel" data-bs-slide-to="${d}" ${d===0?'class="active"':""}></li>
        `)}),$("#mockup").removeClass("d-none");return}r.length>0?(r.length===1?($("#mockup .carousel-control-next").addClass("d-none"),$("#mockup .carousel-control-prev").addClass("d-none"),g.addClass("d-none")):($("#mockup .carousel-control-next").removeClass("d-none"),$("#mockup .carousel-control-prev").removeClass("d-none")),r.slice(0,5).forEach((s,d)=>{i.append(`
                <div class="carousel-item ${d===0?"active":""}">
                    <img src="/storage/${s}" alt="mockup" 
                        class="img-fluid w-100 rounded-lg d-block mx-auto mockup-image"
                    >
                </div>
            `),g.append(`
                <li data-target="#mockup-carousel" data-slide-to="${d}" ${d===0?'class="active"':""}></li>
            `)}),$("#mockup").removeClass("d-none")):$("#mockup").addClass("d-none")}let o={selectedJenis:null,category:null,type:null,currentPage:1,isLoading:!1,lastPage:!1,firstLoad:!0,currentRequest:null,uniquePaths:new Set};function _(a){o.firstLoad=a}function V(a){o.selectedJenis=a.selectedJenis,o.category=a.category??null,o.type=a.type??null}function X(){return o.isLoading}function J(){o.currentPage=1,o.isLoading=!1,o.lastPage=!1,o.uniquePaths.clear(),$("#product-list .row").html("")}function b(){if(o.isLoading||o.lastPage)return Promise.resolve();console.log("loadMoreData"),o.isLoading=!0,O();const a=$("#search-input").val();return o.currentRequest&&o.currentRequest.readyState!==4&&o.currentRequest.abort(),o.currentRequest=$.ajax({url:"/catalog",type:"GET",data:{page:o.currentPage,search:a,jenis:o.selectedJenis,category:o.category,type:o.type}}),new Promise((n,t)=>{o.currentRequest.done(e=>Q(e)).fail((e,r)=>{r!=="abort"&&(console.error("Gagal memuat data."),t())}).always(()=>{o.isLoading=!1,U(),o.currentRequest=null}).then(n)})}function Q(a){const n=a.data.data??[],t=a.types??[];o.type&&($("#backButton").removeClass("d-none"),$("#homeButton").addClass("d-none")),o.selectedJenis==3&&o.firstLoad?(t.length>0&&($("#search-form").addClass("d-none"),z(t,o.selectedJenis),o.currentPage++,o.currentPage>a.data.last_page&&(o.lastPage=!0)),E(a,!0)):(n.length>0?(Y(n,o.selectedJenis),o.currentPage++,o.currentPage>a.data.last_page&&(o.lastPage=!0)):(o.currentPage===1&&($("#mockup").addClass("d-none"),$("#product-list .row").append(`<div class="col-12"><img src="dist/img/no-data.png" alt="no-data"
                     class="img-fluid mx-auto d-block" style="max-width:100%;height:auto;margin:100px 0;"></div>`)),o.lastPage=!0),E(a,!1))}function E(a,n=!0){var l,s,d,u,h,m;const t=a.category??[],e=((d=(s=(l=a.data.data[0])==null?void 0:l.category)==null?void 0:s.types)==null?void 0:d.images)??[],r=(u=a.jenis)==null?void 0:u.name,i=((m=(h=a.data.data[0])==null?void 0:h.category)==null?void 0:m.images)??[];t.length===0?$("#category-container").addClass("d-none"):($("#category-container").removeClass("d-none"),e.length>0?L(e,o.selectedJenis,o.uniquePaths,n):i.length>0?L(i,o.selectedJenis,o.uniquePaths,n):o.selectedJenis==3?L([],o.selectedJenis,o.uniquePaths,n):o.selectedJenis==4?L([],o.selectedJenis,o.uniquePaths,n):$("#mockup").addClass("d-none"));const g={"PVC Board":()=>{$("#category-container").addClass("d-none"),$(".category-modal-container").text("Tidak ada kategori")},Wallboard:()=>x("Motif"),"UV Board":()=>x("Motif"),Wallpanel:()=>x("Motif"),Aksesoris:()=>x("Ukuran"),default:()=>x("Kategori")};(g[r]||g.default)();let c='<li class="nav-item font-poppins">';t.length>0?t.forEach(p=>{c+=`
                <a class="nav-link text-white category-filter d-flex align-items-center justify-content-start" 
                   href="#" data-jenis-id="${p.jenis_id}" data-id="${p.id}" data-type="${p.type_id}">
                    <img src="${p.path?"storage/"+p.path:"dist/img/product/1.webp"}" alt="${p.name}" 
                         class="mr-2 img-thumbnail" style="width:50px;height:50px;object-fit:contain;">
                    <span class="text-capitalize">${p.name}</span>
                </a>`}):c+='<a class="nav-link text-white category-filter" href="#">Tanpa Kategori</a>',c+="</li>",n?$("#category-menu-item, #category-menu-item-modal").html("tidak ada kategori"):$("#category-menu-item, #category-menu-item-modal").html(c),!o.category&&t.length>0?(console.log("auto choose category"),o.category=t[0].id,B(o.category),J(),setTimeout(()=>{b()},200)):o.category&&$(`.category-filter[data-id="${o.category}"]`).addClass("active")}function x(a){$("#category-menu-item-label, #category-modal-item-label").html(a)}let I=!1;function Z(a){$(document).off("click",".category-filter"),$(document).on("click",".category-filter",async function(n){if(n.preventDefault(),I)return;I=!0;const t=$(this).data("id"),e=$(this).data("type");console.log(e);try{V({selectedJenis:a,category:t,type:e}),B(t),$("#filterModal").modal("hide"),J(),await b(!1)}catch(r){console.error("Gagal memuat data:",r)}finally{I=!1}})}function P(a,n="#modalVariants"){$(n).empty(),$("#modalPaket").empty(),$("#modalKepadatan").empty(),Array.isArray(a)&&a.length>0?a.forEach(t=>{const e=t.specification_values||[],r=t.name.toLowerCase();if(r==="warna")$("#paket").text("Warna"),e.length>0?e.forEach(i=>{t.pivot&&i.id===t.pivot.specification_value_id&&$("#modalPaket").append(`
                                <span class="badge badge-outline-primary px-2 py-1 kepadatan" data-value="${i.name}">
                                    ${i.name}
                                </span>
                            `)}):$("#modalPaket").append('<span class="text-muted">Tidak ada data</span>');else if(r==="density")e.length>0?e.forEach(i=>{t.pivot&&i.id===t.pivot.specification_value_id&&(e.length>1?$("#modalKepadatan").append(`
                                    <span class="badge badge-outline-primary px-2 py-1 kepadatan" data-value="${i.name}">
                                        ${i.name}
                                    </span>
                                `):$("#modalKepadatan").append(i.name))}):$("#modalKepadatan").append('<span class="text-muted">Tidak ada data</span>');else{const i=e.find(s=>t.pivot&&s.id===t.pivot.specification_value_id),g=i?i.name:"-";let c=i?i.unit:"";c?c=" "+c:["panjang","tinggi","lebar"].includes(r)?c=" cm":r==="ketebalan"&&(c=" mm");const l=`
                    <div class="row mb-1 variant-row">
                        <div class="col-4 col-sm-3 font-weight-bold">${t.name}</div>
                        <div class="col-auto">:</div>
                        <div class="col">${g}${c}</div>
                    </div>
                `;$(n).append(l)}}):($(n).append('<div class="text-muted">Tidak ada varian</div>'),$(".paket").hide())}function K(a=null){$(window).width()<768?$("#filter-container").addClass("d-none"):$("#filter-container").removeClass("d-none"),(a==1||a==3)&&($("#filter-container").addClass("d-none"),$("#catalog-col").removeClass("col-md-10").addClass("col-md-12"))}$(document).ready(function(){const a=new URLSearchParams(window.location.search),n=a.get("jenis"),t=a.get("category");let e,r,i=!1;(n==5||n==2)&&sessionStorage.removeItem("selectedWallpanel"),V({selectedJenis:n,category:t}),b(),n&&($("#category-container").removeClass("d-md-none"),$("#catalog-col").removeClass("center-content")),K(n),$(window).on("resize",()=>K(n)),$("#search-input").on("input",function(){clearTimeout(e),e=setTimeout(()=>{J(),b()},500)}),$(window).on("scroll",function(){clearTimeout(r),r=setTimeout(async()=>{if(i||X())return;const l=$(window).scrollTop(),s=$(window).height(),d=$(document).height();if(l+s>=d-150){i=!0;try{_(!1),await b()}finally{i=!1}}},200)});function g(l,s=[],d=""){$("#carousel-product-image").empty(),$("#thumbnailGallery").empty();let u=l||[];(d==null?void 0:d.toLowerCase())==="uv board"&&s.length&&(u=[...l,...s]),u.forEach((m,p)=>{const v=p===0?"active":"";$("#carousel-product-image").append(`
                <div class="carousel-item ${v}">
                    <img src="${m}" class="img-fluid d-block mx-auto"
                        style="width:100%;max-width:400px;aspect-ratio:1/1;object-fit:cover;border-radius:8px;border:1px solid #ccc;">
                </div>
            `),$("#thumbnailGallery").append(`
                <div class="col-2 mb-0 d-flex justify-content-center">
                    <div style="height:90%">
                        <img src="${m}" 
                            class="img-thumbnail thumbnail-image p-0 w-100 h-100"
                            style="aspect-ratio:1/1;border:1px solid #ccc;border-radius:8px;object-fit:cover;cursor:pointer;"
                            data-index="${p}">
                    </div>
                </div>
            `)}),u.length<=1?$("#carouselProduct .carousel-control-next, #carouselProduct .carousel-control-prev").addClass("d-none"):$("#carouselProduct .carousel-control-next, #carouselProduct .carousel-control-prev").removeClass("d-none"),$("#carouselProduct").carousel({interval:3e3,pause:!1});let h;$("#thumbnailGallery").off("click").on("click",".thumbnail-image",function(){const m=$(this).data("index");$("#carouselProduct").carousel(m),$(".thumbnail-image").removeClass("active-thumbnail"),$(this).addClass("active-thumbnail"),setTimeout(()=>$(this).removeClass("active-thumbnail"),500),$("#carouselProduct").carousel("pause"),clearTimeout(h),h=setTimeout(()=>{$("#carouselProduct").carousel("cycle")},5e3)})}$(document).on("click",".product-card",function(){const l=$(this).data("id");console.log("productId",l);const s=$(this).data("code"),d=$(this).data("name"),u=$(this).data("category"),h=$(this).data("type"),m=$(this).data("jenis"),p=parseInt($(this).data("length"),10),v=parseFloat($(this).data("width")).toFixed(1),T=parseFloat($(this).data("density")).toFixed(1),w=$(this).data("url"),y=JSON.parse($(this).attr("data-specifications")||"[]"),C=$(this).attr("data-images"),k=JSON.parse($(this).attr("data-paket")||"[]");let j=$(this).data("height"),D=$(this).data("type-image"),S=[],q=[];if(C)try{S=JSON.parse(C.replace(/&quot;/g,'"'))}catch{S=[]}if(Array.isArray(k)&&(q=k.sort((f,A)=>f.order-A.order).map(f=>`/storage/${f.image}`)),$("#modalPaket").empty(),m==="tipe-wallpanel"){J(),V({selectedJenis:3,type:h}),_(!1),b(),K(),$("#catalog-col").toggleClass("col-md-10 col-md-12");return}m.toLowerCase()==="uv board"&&(c(l),P(y),$("#modalVideo, .lebar").hide(),$("#modalCategory").text(u),k.length>0?k.sort((f,A)=>f.order-A.order).map(f=>{$("#modalPaket").append(`
                        <span class="badge badge-outline-primary px-2 py-1 kepadatan" data-value="${f.name}">${f.name}</span>
                    `)}):($("#modalPaket").append('<span class="text-muted">Tidak ada paket</span>'),$("#notes").hide())),m.toLowerCase()==="wallboard"&&(c(l),P(y),$("#modalCategory").text(u),$("#ketebalan, .density, #notes, .paket,  #modalVideo, .lebar").hide()),m==="PVC Board"&&(c(l),P(y),$("#modalCategory").text(m),$("#modalVideo, .lebar, .paket").hide()),m==="Wallpanel"&&(c(l),P(y),$("#modalContact").data("type",h),$("#modalCategory").text(u+" / "+h),$("#ketebalan, #kepadatan, .paket, #modalVideo, #notes, .density").hide(),$("#modalGrafis").attr("src",`/storage/${D}`),$(".grafis").removeClass("d-none")),m.toLowerCase()==="aksesoris"&&(c(l),$("#tinggi, #ketebalan, #kepadatan, .lebar, .density").hide(),$("#modalCategory").text(u),P(y),$("#modalVideoPlayer").empty(),$("#modalVideo, .density").hide(),w&&($("#modalVideoPlayer").append(`
                    <iframe class="embed-responsive-item"
                    src="${w}"
                    title="YouTube video player" frameborder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; web-share;"
                    referrerpolicy="strict-origin-when-cross-origin"
                    allowfullscreen></iframe>
                `),$("#modalVideo").show())),g(S,q,m),$("#modalName").text(d),$("#productModalLabel").text(d),$("#modalDownload").data("id",l),$("#productModal").modal("show"),$("#modalContact").data({jenis:m,category:u,code:s,length:p,width:v,height:j,density:T,type:h}),$(".kepadatan").removeClass("active"),$("#modalContact").data({kepadatan:null,paket:null}),$(".modalContact").prop("disabled",$(".kepadatan").length>0)}),$(document).on("click",".kepadatan",function(){$(".modalContact").prop("disabled",!1);const l=$(this).data("value");$(this).closest("#productModal").find(".kepadatan").removeClass("active"),$(this).addClass("active"),$("#notes").hide(),$("#modalContact").data("kepadatan",l)}),Z(n),H(),W(),G();function c(l){$.ajax({url:`/products/${l}/viewed`,method:"POST",headers:{"X-CSRF-TOKEN":$('meta[name="csrf-token"]').attr("content")},success:s=>console.log("View recorded:",s),error:s=>console.error(s)})}});
