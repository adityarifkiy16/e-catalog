function D(){$("#loading").removeClass("d-none")}function H(){$("#loading").addClass("d-none")}function W(t=[]){if(!Array.isArray(t))return[];const s={thumbnail:3,motif:2,product:1};return t.slice().sort((a,e)=>(s[e.type]||0)-(s[a.type]||0)).map(a=>"/storage/"+a.path)}function E(){$(document).off("click","#btn-download").on("click","#btn-download",function(t){t.preventDefault();let s;const a=$(".category-filter-download:checked").map(function(){return $(this).val()}).get(),e=new URLSearchParams(window.location.search).get("jenis"),l=$("#version-select").val();if(!l){alert("Silakan pilih versi terlebih dahulu.");return}const n=a.map(c=>`category[]=${encodeURIComponent(c)}`).join("&"),g=e?`&jenis_id=${encodeURIComponent(e)}`:"",h=l?`&version_id=${encodeURIComponent(l)}`:"";s=`catalog/pdf?${n}${g}${h}`,Y(this,s)})}function Y(t,s){const a=$(t);a.prop("disabled",!0).html('<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Mengunduh...'),$.ajax({url:s,type:"GET",success:function(e){e.status==="success"?(window.open(e.url,"_blank"),a.prop("disabled",!1).html("Unduh PDF")):(alert(e.message),a.prop("disabled",!1).html("Unduh PDF"))}})}function O(){$(document).off("click",".modalContact").on("click",".modalContact",function(t){t.preventDefault(),console.log("Klik tombol order",$(this).data("code"));const s="62816659688",a=$(this).data("jenis");console.log(a.toLowerCase());let e="";a.toLowerCase()=="wallpanel"?e=`Halo Admin,
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

Apakah produk ini masih tersedia? Terima kasih.`,window.open(`https://wa.me/${s}?text=${encodeURIComponent(e)}`,"_blank")})}function F(){$(window).scroll(function(){$(this).scrollTop()>100?$("#btn-scroll-top").fadeIn():$("#btn-scroll-top").fadeOut()}),$("#btn-scroll-top").click(function(){return $("html, body").animate({scrollTop:0},500),!1})}function z(t,s){$("#btn-download").removeClass("d-none");let a="";t.forEach(e=>{var p,d,f,v,P,k,y,T,b,J,S,w,j,u;const l=W(((d=(p=e==null?void 0:e.product_versions)==null?void 0:p[0])==null?void 0:d.images)??[]),n=l.length?l[0]:"https://via.placeholder.com/300x200?text=No+Image",h=JSON.stringify(l).replace(/"/g,"&quot;"),c=JSON.stringify(e.packages).replace(/"/g,"&quot;"),i=((f=e.category)==null?void 0:f.name)??"Tanpa Kategori";((v=e.category)==null?void 0:v.display_style)==="square"||s===null?a+=`
                    <div class="col-md-2 col-6 mb-4">
                        <div class="h-100 product-card"
                    `:((P=e.category)==null?void 0:P.display_style)==="rectangle"?a+=`
                    <div class="col-md-4 col-6 mb-4">
                        <div class="h-100 product-card"
                    `:a+=`
                    <div class="col-md-2 col-6 mb-4">
                        <div class="h-100 product-card d-flex flex-column justify-content-center align-items-center"
                    `;const r=((k=e.category)==null?void 0:k.display_style)==="rectangle",m=JSON.stringify(e.specifications).replace(/"/g,"&quot;");a+=`
                    data-id="${e.id}"
                    data-code="${e.code}"
                    data-name="${e.name}"
                    data-category="${i}"
                    data-jenis="${((T=(y=e.category)==null?void 0:y.jenis)==null?void 0:T.name)??""}"
                    data-images="${h}"
                    data-image="${n}"
                    data-type="${((J=(b=e.category)==null?void 0:b.types)==null?void 0:J.name)??""}"
                    data-type-image="${((w=(S=e.category)==null?void 0:S.types)==null?void 0:w.image)??""}"
                    data-url="${e.url_video}"
                    data-paket="${c}"
                    data-specifications = "${m}"
                    >
                       <img 
                            src="${n}" 
                            class="card-img-top" 
                            alt="${e.name}" 
                            style="
                                border : 1px solid #2c2c2c;
                                min-height: 10rem;
                                height: auto; 
                                border-radius: 8px;
                                width: 100%; 
                                object-fit: cover; 
                                object-position: ${((u=(j=e.category)==null?void 0:j.jenis)==null?void 0:u.name)==="PVC Board"?"bottom center":"center center"};
                                aspect-ratio: ${r?"16/9":"1/1"};
                            "
                        >
                        <div class="card-body d-flex flex-column text-center">
                            <h4 class="card-title font-weight-bold text-uppercase mb-2">
                                ${e.name}
                            </h4>
                            <h6 class="card-text text-muted mb-1">${i}</h6>
                        </div>
                    </div>
                </div>`}),$("#product-list .row").append(a)}function X(t,s){$("#btn-download").addClass("d-none");let a="";t.forEach(e=>{const l=e.thumbnail?`/storage/${e.thumbnail}`:"https://via.placeholder.com/300x200?text=No+Image",n=s==3?"wallpanel":"tanpa kategori";a+=`
                    <div class="col-md-2 col-6 mb-4">
                        <div class="h-100 product-card d-flex flex-column justify-content-center align-items-center"
                    `,a+=`
                    data-id="${e.id}"
                    data-jenis="card-types"
                    data-category="${n}"
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
                            <h6 class="card-text text-muted mb-1">${n}</h6>
                        </div>
                    </div>
                </div>`}),$("#product-list .row").append(a)}function M(t,s,a,e=!1){if(s==null)return;t.forEach(i=>{i.images&&i.images.forEach(r=>{r.path&&a.add(r.path)}),i.path&&a.add(i.path)});const l=Array.from(a),n=$("#mockup-carousel-inner"),g=$("#mockup-carousel-indicators"),h=["https://www.youtube.com/embed/BiiUrYAbL9s?autoplay=1&mute=1&rel=0&controls=0&amp;loop=1&playlist=BiiUrYAbL9s"],c=[];for(let i=1;i<=6;i++)i!==2&&c.push(`/dist/img/wpc/${i}.webp?v=${Date.now()}`);if(n.empty(),g.empty(),s==4){$("#mockup-carousel").carousel({interval:!1}),$("#mockup .carousel-control-next").addClass("d-none"),$("#mockup .carousel-control-prev").addClass("d-none"),h.forEach((i,r)=>{n.append(`
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
        `)}),$("#mockup").removeClass("d-none");return}else if(s==3&&e){$("#mockup-carousel").carousel({interval:3e3}),$("#mockup .carousel-control-next").removeClass("d-none"),$("#mockup .carousel-control-prev").removeClass("d-none"),c.forEach((i,r)=>{n.append(`
            <div class="carousel-item ${r===0?"active":""}">
                <div class="d-flex justify-content-center align-items-center">
                    <img src="${i}" 
                        alt="mockup" 
                        class="img-fluid w-100 rounded-3 d-block mx-auto mockup-image"
                    >
                </div>
            </div>
        `),g.append(`
            <li data-bs-target="#mockup-carousel" data-bs-slide-to="${r}" ${r===0?'class="active"':""}></li>
        `)}),$("#mockup").removeClass("d-none");return}l.length>0?(l.length===1?($("#mockup .carousel-control-next").addClass("d-none"),$("#mockup .carousel-control-prev").addClass("d-none"),g.addClass("d-none")):($("#mockup .carousel-control-next").removeClass("d-none"),$("#mockup .carousel-control-prev").removeClass("d-none"),g.removeClass("d-none")),l.forEach((i,r)=>{n.append(`
                <div class="carousel-item ${r===0?"active":""}">
                    <img src="/storage/${i}" alt="mockup" 
                        class="img-fluid w-100 rounded-lg d-block mx-auto mockup-image"
                    >
                </div>
            `),g.append(`
                <li data-target="#mockup-carousel" data-slide-to="${r}" ${r===0?'class="active"':""}></li>
            `)}),$("#mockup").removeClass("d-none")):$("#mockup").addClass("d-none")}let K=!1;function U(t){$(document).off("click",".category-filter"),$(document).on("click",".category-filter",async function(s){if(s.preventDefault(),K)return;K=!0;const a=$(this).data("id"),e=$(this).data("type");try{A({selectedJenis:t,category:a,type:e}),$("#filterModal").modal("hide"),V(),await C(!1)}catch(l){console.error("Gagal memuat data:",l)}finally{K=!1}})}function x(t,s="#modalVariants"){$(s).empty(),$("#modalPaket").empty(),$("#modalKepadatan").empty(),Array.isArray(t)&&t.length>0?t.forEach(a=>{const e=a.specification_values||[],l=a.name.toLowerCase();if(l==="warna")$("#paket").text("Warna"),e.length>0?e.forEach(n=>{a.pivot&&n.id===a.pivot.specification_value_id&&$("#modalPaket").append(`
                                <span class="badge badge-outline-primary px-2 py-1 kepadatan" data-value="${n.name}">
                                    ${n.name}
                                </span>
                            `)}):$("#modalPaket").append('<span class="text-muted">Tidak ada data</span>');else if(l==="density")e.length>0?e.forEach(n=>{a.pivot&&n.id===a.pivot.specification_value_id&&(e.length>1?$("#modalKepadatan").append(`
                                    <span class="badge badge-outline-primary px-2 py-1 kepadatan" data-value="${n.name}">
                                        ${n.name}
                                    </span>
                                `):$("#modalKepadatan").append(n.name))}):$("#modalKepadatan").append('<span class="text-muted">Tidak ada data</span>');else{const n=e.find(i=>a.pivot&&i.id===a.pivot.specification_value_id),g=n?n.name:"-";let h=n?n.unit:"";h?h=" "+h:["panjang","tinggi","lebar"].includes(l)?h=" cm":l==="ketebalan"&&(h=" mm");const c=`
                    <div class="row mb-1 variant-row">
                        <div class="col-4 col-sm-3 font-weight-bold">${a.name}</div>
                        <div class="col-auto">:</div>
                        <div class="col">${g}${h}</div>
                    </div>
                `;$(s).append(c)}}):($(s).append('<div class="text-muted">Tidak ada varian</div>'),$(".paket").hide())}function B(){$("#version-select").on("change",function(){const t=$(this).val()||null;o.version=t,V(),C()})}function _({selectedJenis:t=null,hasCategory:s=!1,isRenderTypes:a=!1}){const e=$("#filter-container"),l=$("#category-container"),n=$("#catalog-col"),g=$(window).width()<768;if(e.removeClass("d-none"),l.removeClass("d-none"),n.removeClass("col-md-12 col-md-9"),a){e.addClass("d-none"),l.addClass("d-none"),n.addClass("col-md-12");return}if(t==1){e.addClass("d-none"),l.addClass("d-none"),n.addClass("col-md-12");return}if(!s){e.addClass("d-none"),l.addClass("d-none"),n.addClass("col-md-12");return}g?(e.addClass("d-none"),l.removeClass("d-none")):(e.removeClass("d-none"),l.removeClass("d-none")),n.addClass("col-md-9")}$(document).ready(function(){const t=new URLSearchParams(window.location.search),s=t.get("jenis");t.get("version");const a=t.get("category");let e,l,n=!1;A({selectedJenis:s,category:a}),C(),_({selectedJenis:s,hasCategory:a,isRenderTypes:!1}),$(window).on("resize",()=>_({selectedJenis:s,hasCategory:a,isRenderTypes:!1})),$("#search-input").on("input",function(){clearTimeout(e),e=setTimeout(()=>{V(),C()},500)}),$(window).on("scroll",function(){clearTimeout(l),l=setTimeout(async()=>{if(n||G())return;const c=$(window).scrollTop(),i=$(window).height(),r=$(document).height();if(c+i>=r-150){n=!0;try{I(!1),await C()}finally{n=!1}}},200)});function g(c,i=[],r=""){$("#carousel-product-image").empty(),$("#thumbnailGallery").empty();let m=c||[];(r==null?void 0:r.toLowerCase())==="uv board"&&i.length&&(m=[...c,...i]),m.forEach((d,f)=>{const v=f===0?"active":"";$("#carousel-product-image").append(`
                <div class="carousel-item ${v}">
                    <img src="${d}" class="img-fluid d-block mx-auto"
                        style="width:100%;max-width:400px;aspect-ratio:1/1;object-fit:cover;border-radius:8px;border:1px solid #ccc;">
                </div>
            `),$("#thumbnailGallery").append(`
                <div class="col-2 mb-0 d-flex justify-content-center">
                    <div style="height:90%">
                        <img src="${d}" 
                            class="img-thumbnail thumbnail-image p-0 w-100 h-100"
                            style="aspect-ratio:1/1;border:1px solid #ccc;border-radius:8px;object-fit:cover;cursor:pointer;"
                            data-index="${f}">
                    </div>
                </div>
            `)}),m.length<=1?$("#carouselProduct .carousel-control-next, #carouselProduct .carousel-control-prev").addClass("d-none"):$("#carouselProduct .carousel-control-next, #carouselProduct .carousel-control-prev").removeClass("d-none"),$("#carouselProduct").carousel({interval:3e3,pause:!1});let p;$("#thumbnailGallery").off("click").on("click",".thumbnail-image",function(){const d=$(this).data("index");$("#carouselProduct").carousel(d),$(".thumbnail-image").removeClass("active-thumbnail"),$(this).addClass("active-thumbnail"),setTimeout(()=>$(this).removeClass("active-thumbnail"),500),$("#carouselProduct").carousel("pause"),clearTimeout(p),p=setTimeout(()=>{$("#carouselProduct").carousel("cycle")},5e3)})}$(document).off("click",".product-card").on("click",".product-card",function(){const c=$(this).data("id"),i=$(this).data("code"),r=$(this).data("name"),m=$(this).data("category"),p=$(this).data("type"),d=$(this).data("jenis"),f=parseInt($(this).data("length"),10),v=parseFloat($(this).data("width")).toFixed(1),P=parseFloat($(this).data("density")).toFixed(1),k=$(this).data("url"),y=JSON.parse($(this).attr("data-specifications")||"[]"),T=$(this).attr("data-images"),b=JSON.parse($(this).attr("data-paket")||"[]");let J=$(this).data("height"),S=$(this).data("type-image"),w=[],j=[];if(d!=="card-types"&&h(c),T)try{w=JSON.parse(T.replace(/&quot;/g,'"'))}catch(u){w=[],console.error(u)}if(Array.isArray(b)&&(j=b.sort((u,L)=>u.order-L.order).map(u=>`/storage/${u.image}`)),$("#notes").show(),$("#modalPaket").empty(),d==="card-types"){V(),A({selectedJenis:s,type:p}),I(!1),C();return}d.toLowerCase()==="uv board"&&(x(y),$("#modalVideo, .lebar").hide(),$("#modalCategory").text(m),b.length>0?b.sort((u,L)=>u.order-L.order).map(u=>{$("#modalPaket").append(`
                        <span class="badge badge-outline-primary px-2 py-1 kepadatan" data-value="${u.name}">${u.name}</span>
                    `)}):($("#modalPaket").append('<span class="text-muted">Tidak ada paket</span>'),$("#notes").hide())),d.toLowerCase()==="wallboard"&&(x(y),$("#modalCategory").text(m),$("#ketebalan, .density, #notes, .paket,  #modalVideo, .lebar").hide()),d==="PVC Board"&&(x(y),$("#modalCategory").text(d),$("#modalVideo, .lebar, .paket").hide()),d==="Wallpanel"&&(x(y),$("#modalContact").data("type",p),$("#modalCategory").text(m+" / "+p),$("#ketebalan, #kepadatan, .paket, #modalVideo, #notes, .density").hide(),$("#modalGrafis").attr("src",`/storage/${S}`),$(".grafis").removeClass("d-none")),d.toLowerCase()==="aksesoris"&&($("#tinggi, #ketebalan, #kepadatan, .lebar, .density").hide(),$("#modalCategory").text(m),x(y),$("#modalVideoPlayer").empty(),$("#modalVideo, .density").hide(),k&&($("#modalVideoPlayer").append(`
                    <iframe class="embed-responsive-item"
                    src="${k}"
                    title="YouTube video player" frameborder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; web-share;"
                    referrerpolicy="strict-origin-when-cross-origin"
                    allowfullscreen></iframe>
                `),$("#modalVideo").show())),g(w,j,d),$("#modalName").text(r),$("#productModalLabel").text(r),$("#productModal").modal("show"),$("#modalContact").data({jenis:d,category:m,code:i,length:f,width:v,height:J,density:P,type:p}),$(".kepadatan").removeClass("active"),$("#modalContact").data({kepadatan:null,paket:null}),$(".modalContact").prop("disabled",$(".kepadatan").length>0)}),$(document).on("click",".kepadatan",function(){$(".modalContact").prop("disabled",!1);const c=$(this).data("value");$(this).closest("#productModal").find(".kepadatan").removeClass("active"),$(this).addClass("active"),$("#notes").hide(),$("#modalContact").data("kepadatan",c)}),U(s),E(),O(),F(),B();function h(c){$.ajax({url:`/products/${c}/viewed`,method:"POST",headers:{"X-CSRF-TOKEN":$('meta[name="csrf-token"]').attr("content")},success:i=>console.log("View recorded:",i),error:i=>console.error(i)})}});let o={selectedJenis:null,category:null,type:null,currentPage:1,isLoading:!1,lastPage:!1,firstLoad:!0,currentRequest:null,uniquePaths:new Set,version:null};function I(t){o.firstLoad=t}function A(t){o.selectedJenis=t.selectedJenis,o.category=t.category??null,o.type=t.type??null,o.version=t.version??null}function G(){return o.isLoading}function V(){o.currentPage=1,o.isLoading=!1,o.lastPage=!1,o.uniquePaths.clear(),$("#product-list .row").html("")}function C(){if(o.isLoading||o.lastPage)return Promise.resolve();o.isLoading=!0,D();const t=$("#search-input").val();o.currentRequest&&o.currentRequest.readyState!==4&&o.currentRequest.abort();const s={page:o.currentPage,search:t,jenis:o.selectedJenis,category:o.category,type:o.type,version:o.version};return o.currentRequest=$.ajax({url:"/catalog",type:"GET",data:s}),new Promise((a,e)=>{o.currentRequest.done(l=>Q(l)).fail((l,n)=>{n!=="abort"&&(console.error("Gagal memuat data."),e())}).always(()=>{o.isLoading=!1,H(),o.currentRequest=null}).then(a)})}function Q(t){const s=t.data.data??[],a=t.types??[];if(o.type&&($("#backButton").removeClass("d-none"),$("#homeButton").addClass("d-none")),console.log("state.version",o.version),console.log("state.type",o.type),o.version==null){const e=$("#version-select option:first").val();e&&(o.version=e)}o.selectedJenis&&o.firstLoad&&a.length>0?($("#search-form").addClass("d-none"),$("#version-filter").addClass("d-none"),a.length>0&&(X(a,o.selectedJenis),o.lastPage=!0),q(t,!0)):($("#search-form").removeClass("d-none"),$("#version-filter").removeClass("d-none"),s.length>0?(z(s,o.selectedJenis),o.currentPage++,o.currentPage>t.data.last_page&&(o.lastPage=!0)):(o.currentPage===1&&($("#mockup").addClass("d-none"),$("#product-list .row").append(`<div class="col-12"><img src="dist/img/no-data.png" alt="no-data"
                     class="img-fluid mx-auto d-block" style="max-width:100%;height:auto;margin:100px 0;"></div>`)),o.lastPage=!0),q(t,!1))}function q(t,s=!0){var r,m,p,d,f,v,P,k;const a=t.category??[],e=((p=(m=(r=t.data.data[0])==null?void 0:r.category)==null?void 0:m.types)==null?void 0:p.images)??[],l=(d=t.jenis)==null?void 0:d.name,n=((v=(f=t.data.data[0])==null?void 0:f.category)==null?void 0:v.images)??[],g=o.firstLoad&&(((P=t.types)==null?void 0:P.length)??0)>0,h=(((k=t.category)==null?void 0:k.length)??0)>0;_({selectedJenis:o.selectedJenis,hasCategory:h,isRenderTypes:g}),a.length===0?$("#category-container").addClass("d-none"):($("#category-container").removeClass("d-none"),e.length>0?M(e,o.selectedJenis,o.uniquePaths,s):n.length>0?M(n,o.selectedJenis,o.uniquePaths,s):o.selectedJenis==3?M([],o.selectedJenis,o.uniquePaths,s):o.selectedJenis==4?M([],o.selectedJenis,o.uniquePaths,s):$("#mockup").addClass("d-none")),ae(l);const c=ee(a),i=Z(a);s?$("#category-menu-item, #category-menu-item-modal").html("tidak ada kategori"):($("#category-menu-item, #category-menu-item-modal").html(c),$("#pdf-catalog").html(i)),!o.category&&a.length>0?(o.category=a[0].id,V(),setTimeout(()=>{C()},200)):o.category&&$(`.category-filter[data-id="${o.category}"]`).addClass("active")}function R(t){$("#category-menu-item-label, #category-modal-item-label").html(t)}function Z(t){return t.length===0?`
            <div class="row font-poppins">
                <div class="col-12 mb-2">
                    <div class="text-white rounded py-2 px-3">
                        <input type="checkbox" class="custom-control-input" id="no-cat" disabled>
                        <label class="custom-control-label" for="no-cat">
                            Tanpa Kategori
                        </label>
                    </div>
                </div>
            </div>`:`<div class="row font-poppins">${t.map(a=>`
            <div class="col-6 col-md-4 mb-2">
                <div class="text-white rounded py-2 px-3">
                    <input type="checkbox" class="custom-control-input category-filter-download" 
                           id="cat-${a.id}" value="${a.id}">
                    <label class="custom-control-label" for="cat-${a.id}">
                        ${a.name}
                    </label>
                </div>
            </div>`).join("")}</div>`}function ee(t){return t.length===0?`
            <li class="nav-item font-poppins">
                <a class="nav-link text-white category-filter" href="#">Tanpa Kategori</a>
            </li>`:`<li class="nav-item font-poppins">${t.map(a=>`
            <a class="nav-link text-white category-filter d-flex align-items-center justify-content-start" 
               href="#" data-jenis-id="${a.jenis_id}" data-id="${a.id}" data-type="${a.type_id}">
                <img src="${a.path?"storage/"+a.path:"dist/img/product/1.webp"}"
                     alt="${a.name}"
                     class="mr-2 img-thumbnail"
                     style="width:50px;height:50px;object-fit:contain;">
                <span class="text-capitalize">${a.name}</span>
            </a>`).join("")}</li>`}function ae(t){const s={"PVC Board":()=>{$("#category-container").addClass("d-none"),$(".category-modal-container").text("Tidak ada kategori")},Wallboard:()=>R("Motif"),"UV Board":()=>R("Motif"),Wallpanel:()=>R("Motif"),Aksesoris:()=>R("Ukuran"),default:()=>R("Kategori")};(s[t]||s.default)()}function N({selectedJenis:t=null,hasCategory:s=!1,isRenderTypes:a=!1}){const e=$("#filter-container"),l=$("#category-container"),n=$("#catalog-col"),g=$(window).width()<768;if(e.removeClass("d-none"),l.removeClass("d-none"),n.removeClass("col-md-12 col-md-9"),a){e.addClass("d-none"),l.addClass("d-none"),n.addClass("col-md-12");return}if(t==1){e.addClass("d-none"),l.addClass("d-none"),n.addClass("col-md-12");return}if(!s){e.addClass("d-none"),l.addClass("d-none"),n.addClass("col-md-12");return}g?(e.addClass("d-none"),l.removeClass("d-none")):(e.removeClass("d-none"),l.removeClass("d-none")),n.addClass("col-md-9")}$(document).ready(function(){const t=new URLSearchParams(window.location.search),s=t.get("jenis");t.get("version");const a=t.get("category");let e,l,n=!1;A({selectedJenis:s,category:a}),C(),N({selectedJenis:s,hasCategory:a,isRenderTypes:!1}),$(window).on("resize",()=>N({selectedJenis:s,hasCategory:a,isRenderTypes:!1})),$("#search-input").on("input",function(){clearTimeout(e),e=setTimeout(()=>{V(),C()},500)}),$(window).on("scroll",function(){clearTimeout(l),l=setTimeout(async()=>{if(n||G())return;const c=$(window).scrollTop(),i=$(window).height(),r=$(document).height();if(c+i>=r-150){n=!0;try{I(!1),await C()}finally{n=!1}}},200)});function g(c,i=[],r=""){$("#carousel-product-image").empty(),$("#thumbnailGallery").empty();let m=c||[];(r==null?void 0:r.toLowerCase())==="uv board"&&i.length&&(m=[...c,...i]),m.forEach((d,f)=>{const v=f===0?"active":"";$("#carousel-product-image").append(`
                <div class="carousel-item ${v}">
                    <img src="${d}" class="img-fluid d-block mx-auto"
                        style="width:100%;max-width:400px;aspect-ratio:1/1;object-fit:cover;border-radius:8px;border:1px solid #ccc;">
                </div>
            `),$("#thumbnailGallery").append(`
                <div class="col-2 mb-0 d-flex justify-content-center">
                    <div style="height:90%">
                        <img src="${d}" 
                            class="img-thumbnail thumbnail-image p-0 w-100 h-100"
                            style="aspect-ratio:1/1;border:1px solid #ccc;border-radius:8px;object-fit:cover;cursor:pointer;"
                            data-index="${f}">
                    </div>
                </div>
            `)}),m.length<=1?$("#carouselProduct .carousel-control-next, #carouselProduct .carousel-control-prev").addClass("d-none"):$("#carouselProduct .carousel-control-next, #carouselProduct .carousel-control-prev").removeClass("d-none"),$("#carouselProduct").carousel({interval:3e3,pause:!1});let p;$("#thumbnailGallery").off("click").on("click",".thumbnail-image",function(){const d=$(this).data("index");$("#carouselProduct").carousel(d),$(".thumbnail-image").removeClass("active-thumbnail"),$(this).addClass("active-thumbnail"),setTimeout(()=>$(this).removeClass("active-thumbnail"),500),$("#carouselProduct").carousel("pause"),clearTimeout(p),p=setTimeout(()=>{$("#carouselProduct").carousel("cycle")},5e3)})}$(document).off("click",".product-card").on("click",".product-card",function(){const c=$(this).data("id"),i=$(this).data("code"),r=$(this).data("name"),m=$(this).data("category"),p=$(this).data("type"),d=$(this).data("jenis"),f=parseInt($(this).data("length"),10),v=parseFloat($(this).data("width")).toFixed(1),P=parseFloat($(this).data("density")).toFixed(1),k=$(this).data("url"),y=JSON.parse($(this).attr("data-specifications")||"[]"),T=$(this).attr("data-images"),b=JSON.parse($(this).attr("data-paket")||"[]");let J=$(this).data("height"),S=$(this).data("type-image"),w=[],j=[];if(d!=="card-types"&&h(c),T)try{w=JSON.parse(T.replace(/&quot;/g,'"'))}catch(u){w=[],console.error(u)}if(Array.isArray(b)&&(j=b.sort((u,L)=>u.order-L.order).map(u=>`/storage/${u.image}`)),$("#notes").show(),$("#modalPaket").empty(),d==="card-types"){V(),A({selectedJenis:s,type:p}),I(!1),C();return}d.toLowerCase()==="uv board"&&(x(y),$("#modalVideo, .lebar").hide(),$("#modalCategory").text(m),b.length>0?b.sort((u,L)=>u.order-L.order).map(u=>{$("#modalPaket").append(`
                        <span class="badge badge-outline-primary px-2 py-1 kepadatan" data-value="${u.name}">${u.name}</span>
                    `)}):($("#modalPaket").append('<span class="text-muted">Tidak ada paket</span>'),$("#notes").hide())),d.toLowerCase()==="wallboard"&&(x(y),$("#modalCategory").text(m),$("#ketebalan, .density, #notes, .paket,  #modalVideo, .lebar").hide()),d==="PVC Board"&&(x(y),$("#modalCategory").text(d),$("#modalVideo, .lebar, .paket").hide()),d==="Wallpanel"&&(x(y),$("#modalContact").data("type",p),$("#modalCategory").text(m+" / "+p),$("#ketebalan, #kepadatan, .paket, #modalVideo, #notes, .density").hide(),$("#modalGrafis").attr("src",`/storage/${S}`),$(".grafis").removeClass("d-none")),d.toLowerCase()==="aksesoris"&&($("#tinggi, #ketebalan, #kepadatan, .lebar, .density").hide(),$("#modalCategory").text(m),x(y),$("#modalVideoPlayer").empty(),$("#modalVideo, .density").hide(),k&&($("#modalVideoPlayer").append(`
                    <iframe class="embed-responsive-item"
                    src="${k}"
                    title="YouTube video player" frameborder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; web-share;"
                    referrerpolicy="strict-origin-when-cross-origin"
                    allowfullscreen></iframe>
                `),$("#modalVideo").show())),g(w,j,d),$("#modalName").text(r),$("#productModalLabel").text(r),$("#productModal").modal("show"),$("#modalContact").data({jenis:d,category:m,code:i,length:f,width:v,height:J,density:P,type:p}),$(".kepadatan").removeClass("active"),$("#modalContact").data({kepadatan:null,paket:null}),$(".modalContact").prop("disabled",$(".kepadatan").length>0)}),$(document).on("click",".kepadatan",function(){$(".modalContact").prop("disabled",!1);const c=$(this).data("value");$(this).closest("#productModal").find(".kepadatan").removeClass("active"),$(this).addClass("active"),$("#notes").hide(),$("#modalContact").data("kepadatan",c)}),U(s),E(),O(),F(),B();function h(c){$.ajax({url:`/products/${c}/viewed`,method:"POST",headers:{"X-CSRF-TOKEN":$('meta[name="csrf-token"]').attr("content")},success:i=>console.log("View recorded:",i),error:i=>console.error(i)})}});
