function D(){$("#loading").removeClass("d-none")}function H(){$("#loading").addClass("d-none")}function W(t=[]){if(!Array.isArray(t))return[];const o={thumbnail:3,motif:2,product:1};return t.slice().sort((a,e)=>(o[e.type]||0)-(o[a.type]||0)).map(a=>"/storage/"+a.path)}function E(){$(document).off("click","#btn-download").on("click","#btn-download",function(t){t.preventDefault();let o;const a=$(".category-filter-download:checked").map(function(){return $(this).val()}).get(),e=new URLSearchParams(window.location.search).get("jenis"),l=$("#version-select").val();if(!l){alert("Silakan pilih versi terlebih dahulu.");return}const n=a.map(c=>`category[]=${encodeURIComponent(c)}`).join("&"),g=e?`&jenis_id=${encodeURIComponent(e)}`:"",h=l?`&version_id=${encodeURIComponent(l)}`:"";o=`catalog/pdf?${n}${g}${h}`,Y(this,o)})}function Y(t,o){const a=$(t);a.prop("disabled",!0).html('<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Mengunduh...'),$.ajax({url:o,type:"GET",success:function(e){e.status==="success"?(window.open(e.url,"_blank"),a.prop("disabled",!1).html("Unduh PDF")):(alert(e.message),a.prop("disabled",!1).html("Unduh PDF"))}})}function O(){$(document).off("click",".modalContact").on("click",".modalContact",function(t){t.preventDefault(),console.log("Klik tombol order",$(this).data("code"));const o="62816659688",a=$(this).data("jenis");console.log(a.toLowerCase());let e="";a.toLowerCase()=="wallpanel"?e=`Halo Admin,
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

Apakah produk ini masih tersedia? Terima kasih.`,window.open(`https://wa.me/${o}?text=${encodeURIComponent(e)}`,"_blank")})}function F(){$(window).scroll(function(){$(this).scrollTop()>100?$("#btn-scroll-top").fadeIn():$("#btn-scroll-top").fadeOut()}),$("#btn-scroll-top").click(function(){return $("html, body").animate({scrollTop:0},500),!1})}function z(t,o){$("#btn-download").removeClass("d-none");let a="";t.forEach(e=>{var p,d,f,v,P,k,y,T,b,J,S,C,j,m;const l=W(((d=(p=e==null?void 0:e.product_versions)==null?void 0:p[0])==null?void 0:d.images)??[]),n=l.length?l[0]:"https://via.placeholder.com/300x200?text=No+Image",h=JSON.stringify(l).replace(/"/g,"&quot;"),c=JSON.stringify(e.packages).replace(/"/g,"&quot;"),i=((f=e.category)==null?void 0:f.name)??"Tanpa Kategori";((v=e.category)==null?void 0:v.display_style)==="square"||o===null?a+=`
                    <div class="col-md-2 col-6 mb-4">
                        <div class="h-100 product-card"
                    `:((P=e.category)==null?void 0:P.display_style)==="rectangle"?a+=`
                    <div class="col-md-4 col-6 mb-4">
                        <div class="h-100 product-card"
                    `:a+=`
                    <div class="col-md-2 col-6 mb-4">
                        <div class="h-100 product-card d-flex flex-column justify-content-center align-items-center"
                    `;const r=((k=e.category)==null?void 0:k.display_style)==="rectangle",u=JSON.stringify(e.specifications).replace(/"/g,"&quot;");a+=`
                    data-id="${e.id}"
                    data-code="${e.code}"
                    data-name="${e.name}"
                    data-category="${i}"
                    data-jenis="${((T=(y=e.category)==null?void 0:y.jenis)==null?void 0:T.name)??""}"
                    data-images="${h}"
                    data-image="${n}"
                    data-type="${((J=(b=e.category)==null?void 0:b.types)==null?void 0:J.name)??""}"
                    data-type-image="${((C=(S=e.category)==null?void 0:S.types)==null?void 0:C.image)??""}"
                    data-url="${e.url_video}"
                    data-paket="${c}"
                    data-specifications = "${u}"
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
                                object-position: ${((m=(j=e.category)==null?void 0:j.jenis)==null?void 0:m.name)==="PVC Board"?"bottom center":"center center"};
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
                </div>`}),$("#product-list .row").append(a)}function X(t,o){$("#btn-download").addClass("d-none");let a="";t.forEach(e=>{const l=e.thumbnail?`/storage/${e.thumbnail}`:"https://via.placeholder.com/300x200?text=No+Image",n=o==3?"wallpanel":"tanpa kategori";a+=`
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
                </div>`}),$("#product-list .row").append(a)}function M(t,o,a,e=!1){if(o==null)return;t.forEach(i=>{i.images&&i.images.forEach(r=>{r.path&&a.add(r.path)}),i.path&&a.add(i.path)});const l=Array.from(a),n=$("#mockup-carousel-inner"),g=$("#mockup-carousel-indicators"),h=["https://www.youtube.com/embed/BiiUrYAbL9s?autoplay=1&mute=1&rel=0&controls=0&amp;loop=1&playlist=BiiUrYAbL9s"],c=[];for(let i=1;i<=6;i++)i!==2&&c.push(`/dist/img/wpc/${i}.webp?v=${Date.now()}`);if(n.empty(),g.empty(),o==4){$("#mockup-carousel").carousel({interval:!1}),$("#mockup .carousel-control-next").addClass("d-none"),$("#mockup .carousel-control-prev").addClass("d-none"),h.forEach((i,r)=>{n.append(`
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
        `)}),$("#mockup").removeClass("d-none");return}else if(o==3&&e){$("#mockup-carousel").carousel({interval:3e3}),$("#mockup .carousel-control-next").removeClass("d-none"),$("#mockup .carousel-control-prev").removeClass("d-none"),c.forEach((i,r)=>{n.append(`
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
            `)}),$("#mockup").removeClass("d-none")):$("#mockup").addClass("d-none")}let K=!1;function U(t){$(document).off("click",".category-filter"),$(document).on("click",".category-filter",async function(o){if(o.preventDefault(),K)return;K=!0;const a=$(this).data("id"),e=$(this).data("type");try{R({selectedJenis:t,category:a,type:e}),$("#filterModal").modal("hide"),V(),await w(!1)}catch(l){console.error("Gagal memuat data:",l)}finally{K=!1}})}function x(t,o="#modalVariants"){$(o).empty(),$("#modalPaket").empty(),$("#modalKepadatan").empty(),Array.isArray(t)&&t.length>0?t.forEach(a=>{const e=a.specification_values||[],l=a.name.toLowerCase();if(l==="warna")$("#paket").text("Warna"),e.length>0?e.forEach(n=>{a.pivot&&n.id===a.pivot.specification_value_id&&$("#modalPaket").append(`
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
                `;$(o).append(c)}}):($(o).append('<div class="text-muted">Tidak ada varian</div>'),$(".paket").hide())}function B(){$("#version-select").on("change",function(){const t=$(this).val()||null;s.version=t,V(),w()})}function _({selectedJenis:t=null,hasCategory:o=!1,isRenderTypes:a=!1}){const e=$("#filter-container"),l=$("#category-container"),n=$("#catalog-col"),g=$(window).width()<768;if(e.removeClass("d-none"),l.removeClass("d-none"),n.removeClass("col-md-12 col-md-9"),a){e.addClass("d-none"),l.addClass("d-none"),n.addClass("col-md-12");return}if(t==1){e.addClass("d-none"),l.addClass("d-none"),n.addClass("col-md-12");return}if(!o){e.addClass("d-none"),l.addClass("d-none"),n.addClass("col-md-12");return}g?(e.addClass("d-none"),l.removeClass("d-none")):(e.removeClass("d-none"),l.removeClass("d-none")),n.addClass("col-md-9")}$(document).ready(function(){const t=new URLSearchParams(window.location.search),o=t.get("jenis");t.get("version");const a=t.get("category");let e,l,n=!1;R({selectedJenis:o,category:a}),w(),_({selectedJenis:o,hasCategory:a,isRenderTypes:!1}),$(window).on("resize",()=>_({selectedJenis:o,hasCategory:a,isRenderTypes:!1})),$("#search-input").on("input",function(){clearTimeout(e),e=setTimeout(()=>{V(),w()},500)}),$(window).on("scroll",function(){clearTimeout(l),l=setTimeout(async()=>{if(n||G())return;const c=$(window).scrollTop(),i=$(window).height(),r=$(document).height();if(c+i>=r-150){n=!0;try{I(!1),await w()}finally{n=!1}}},200)});function g(c,i=[],r=""){$("#carousel-product-image").empty(),$("#thumbnailGallery").empty();let u=c||[];(r==null?void 0:r.toLowerCase())==="uv board"&&i.length&&(u=[...c,...i]),u.forEach((d,f)=>{const v=f===0?"active":"";$("#carousel-product-image").append(`
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
            `)}),u.length<=1?$("#carouselProduct .carousel-control-next, #carouselProduct .carousel-control-prev").addClass("d-none"):$("#carouselProduct .carousel-control-next, #carouselProduct .carousel-control-prev").removeClass("d-none"),$("#carouselProduct").carousel({interval:3e3,pause:!1});let p;$("#thumbnailGallery").off("click").on("click",".thumbnail-image",function(){const d=$(this).data("index");$("#carouselProduct").carousel(d),$(".thumbnail-image").removeClass("active-thumbnail"),$(this).addClass("active-thumbnail"),setTimeout(()=>$(this).removeClass("active-thumbnail"),500),$("#carouselProduct").carousel("pause"),clearTimeout(p),p=setTimeout(()=>{$("#carouselProduct").carousel("cycle")},5e3)})}$(document).off("click",".product-card").on("click",".product-card",function(){const c=$(this).data("id"),i=$(this).data("code"),r=$(this).data("name"),u=$(this).data("category"),p=$(this).data("type"),d=$(this).data("jenis"),f=parseInt($(this).data("length"),10),v=parseFloat($(this).data("width")).toFixed(1),P=parseFloat($(this).data("density")).toFixed(1),k=$(this).data("url"),y=JSON.parse($(this).attr("data-specifications")||"[]"),T=$(this).attr("data-images"),b=JSON.parse($(this).attr("data-paket")||"[]");let J=$(this).data("height"),S=$(this).data("type-image"),C=[],j=[];if(d!=="card-types"&&h(c),T)try{C=JSON.parse(T.replace(/&quot;/g,'"'))}catch(m){C=[],console.error(m)}if(Array.isArray(b)&&(j=b.sort((m,L)=>m.order-L.order).map(m=>`/storage/${m.image}`)),$("#notes").show(),$("#modalPaket").empty(),d==="card-types"){V(),R({selectedJenis:o,type:p}),I(!1),w();return}d.toLowerCase()==="uv board"&&(x(y),$("#modalVideo, .lebar").hide(),$("#modalCategory").text(u),b.length>0?b.sort((m,L)=>m.order-L.order).map(m=>{$("#modalPaket").append(`
                        <span class="badge badge-outline-primary px-2 py-1 kepadatan" data-value="${m.name}">${m.name}</span>
                    `)}):($("#modalPaket").append('<span class="text-muted">Tidak ada paket</span>'),$("#notes").hide())),d.toLowerCase()==="wallboard"&&(x(y),$("#modalCategory").text(u),$("#ketebalan, .density, #notes, .paket,  #modalVideo, .lebar").hide()),d==="PVC Board"&&(x(y),$("#modalCategory").text(d),$("#modalVideo, .lebar, .paket").hide()),d==="Wallpanel"&&(x(y),$("#modalContact").data("type",p),$("#modalCategory").text(u+" / "+p),$("#ketebalan, #kepadatan, .paket, #modalVideo, #notes, .density").hide(),$("#modalGrafis").attr("src",`/storage/${S}`),$(".grafis").removeClass("d-none")),d.toLowerCase()==="aksesoris"&&($("#tinggi, #ketebalan, #kepadatan, .lebar, .density").hide(),$("#modalCategory").text(u),x(y),$("#modalVideoPlayer").empty(),$("#modalVideo, .density").hide(),k&&($("#modalVideoPlayer").append(`
                    <iframe class="embed-responsive-item"
                    src="${k}"
                    title="YouTube video player" frameborder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; web-share;"
                    referrerpolicy="strict-origin-when-cross-origin"
                    allowfullscreen></iframe>
                `),$("#modalVideo").show())),g(C,j,d),$("#modalName").text(r),$("#productModalLabel").text(r),$("#productModal").modal("show"),$("#modalContact").data({jenis:d,category:u,code:i,length:f,width:v,height:J,density:P,type:p}),$(".kepadatan").removeClass("active"),$("#modalContact").data({kepadatan:null,paket:null}),$(".modalContact").prop("disabled",$(".kepadatan").length>0)}),$(document).on("click",".kepadatan",function(){$(".modalContact").prop("disabled",!1);const c=$(this).data("value");$(this).closest("#productModal").find(".kepadatan").removeClass("active"),$(this).addClass("active"),$("#notes").hide(),$("#modalContact").data("kepadatan",c)}),U(o),E(),O(),F(),B();function h(c){$.ajax({url:`/products/${c}/viewed`,method:"POST",headers:{"X-CSRF-TOKEN":$('meta[name="csrf-token"]').attr("content")},success:i=>console.log("View recorded:",i),error:i=>console.error(i)})}});let s={selectedJenis:null,category:null,type:null,currentPage:1,isLoading:!1,lastPage:!1,firstLoad:!0,currentRequest:null,uniquePaths:new Set,version:null};function I(t){s.firstLoad=t}function R(t){s.selectedJenis=t.selectedJenis,s.category=t.category??null,s.type=t.type??null,s.version=t.version??null}function G(){return s.isLoading}function V(){s.currentPage=1,s.isLoading=!1,s.lastPage=!1,s.uniquePaths.clear(),$("#product-list .row").html("")}function w(){if(s.isLoading||s.lastPage)return Promise.resolve();s.isLoading=!0,D();const t=$("#search-input").val();s.currentRequest&&s.currentRequest.readyState!==4&&s.currentRequest.abort();const o={page:s.currentPage,search:t,jenis:s.selectedJenis,category:s.category,type:s.type,version:s.version};return s.currentRequest=$.ajax({url:"/catalog",type:"GET",data:o}),new Promise((a,e)=>{s.currentRequest.done(l=>Q(l)).fail((l,n)=>{n!=="abort"&&(console.error("Gagal memuat data."),e())}).always(()=>{s.isLoading=!1,H(),s.currentRequest=null}).then(a)})}function Q(t){const o=t.data.data??[],a=t.types??[];if(s.type&&($("#backButton").removeClass("d-none"),$("#homeButton").addClass("d-none")),s.version!=null)$("#version-select").val(s.version).trigger("change");else{const e=$("#version-select option:first").val();e&&(s.version=e,$("#version-select").val(e).trigger("change"))}s.selectedJenis&&s.firstLoad&&a.length>0?(a.length>0&&($("#search-form").addClass("d-none"),X(a,s.selectedJenis),s.lastPage=!0),q(t,!0)):(o.length>0?(z(o,s.selectedJenis),s.currentPage++,s.currentPage>t.data.last_page&&(s.lastPage=!0)):(s.currentPage===1&&($("#mockup").addClass("d-none"),$("#product-list .row").append(`<div class="col-12"><img src="dist/img/no-data.png" alt="no-data"
                     class="img-fluid mx-auto d-block" style="max-width:100%;height:auto;margin:100px 0;"></div>`)),s.lastPage=!0),q(t,!1))}function q(t,o=!0){var r,u,p,d,f,v,P,k;const a=t.category??[],e=((p=(u=(r=t.data.data[0])==null?void 0:r.category)==null?void 0:u.types)==null?void 0:p.images)??[],l=(d=t.jenis)==null?void 0:d.name,n=((v=(f=t.data.data[0])==null?void 0:f.category)==null?void 0:v.images)??[],g=s.firstLoad&&(((P=t.types)==null?void 0:P.length)??0)>0,h=(((k=t.category)==null?void 0:k.length)??0)>0;_({selectedJenis:s.selectedJenis,hasCategory:h,isRenderTypes:g}),a.length===0?$("#category-container").addClass("d-none"):($("#category-container").removeClass("d-none"),e.length>0?M(e,s.selectedJenis,s.uniquePaths,o):n.length>0?M(n,s.selectedJenis,s.uniquePaths,o):s.selectedJenis==3?M([],s.selectedJenis,s.uniquePaths,o):s.selectedJenis==4?M([],s.selectedJenis,s.uniquePaths,o):$("#mockup").addClass("d-none")),ae(l);const c=ee(a),i=Z(a);o?$("#category-menu-item, #category-menu-item-modal").html("tidak ada kategori"):($("#category-menu-item, #category-menu-item-modal").html(c),$("#pdf-catalog").html(i)),!s.category&&a.length>0?(s.category=a[0].id,V(),setTimeout(()=>{w()},200)):s.category&&$(`.category-filter[data-id="${s.category}"]`).addClass("active")}function A(t){$("#category-menu-item-label, #category-modal-item-label").html(t)}function Z(t){if(t.length===0)return`
            <div class="row font-poppins">
                <div class="col-12 mb-2">
                    <div class="text-white rounded py-2 px-3">
                        <input type="checkbox" class="custom-control-input" id="no-cat" disabled>
                        <label class="custom-control-label" for="no-cat">
                            Tanpa Kategori
                        </label>
                    </div>
                </div>
            </div>`;const o=`
        <div class="col-12 mb-3 border-bottom pb-2">
            <div class="text-white rounded py-2 px-3">
                <input type="checkbox" class="custom-control-input" id="cat-all">
                <label class="custom-control-label font-weight-bold" for="cat-all">
                    Semua Kategori
                </label>
            </div>
        </div>
    `,a=t.map(e=>`
            <div class="col-6 col-md-4 mb-2">
                <div class="text-white rounded py-2 px-3">
                    <input type="checkbox" class="custom-control-input category-filter-download" 
                           id="cat-${e.id}" value="${e.id}">
                    <label class="custom-control-label" for="cat-${e.id}">
                        ${e.name}
                    </label>
                </div>
            </div>`).join("");return`<div class="row font-poppins">${o}${a}</div>`}function ee(t){return t.length===0?`
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
            </a>`).join("")}</li>`}function ae(t){const o={"PVC Board":()=>{$("#category-container").addClass("d-none"),$(".category-modal-container").text("Tidak ada kategori")},Wallboard:()=>A("Motif"),"UV Board":()=>A("Motif"),Wallpanel:()=>A("Motif"),Aksesoris:()=>A("Ukuran"),default:()=>A("Kategori")};(o[t]||o.default)()}function N({selectedJenis:t=null,hasCategory:o=!1,isRenderTypes:a=!1}){const e=$("#filter-container"),l=$("#category-container"),n=$("#catalog-col"),g=$(window).width()<768;if(e.removeClass("d-none"),l.removeClass("d-none"),n.removeClass("col-md-12 col-md-9"),a){e.addClass("d-none"),l.addClass("d-none"),n.addClass("col-md-12");return}if(t==1){e.addClass("d-none"),l.addClass("d-none"),n.addClass("col-md-12");return}if(!o){e.addClass("d-none"),l.addClass("d-none"),n.addClass("col-md-12");return}g?(e.addClass("d-none"),l.removeClass("d-none")):(e.removeClass("d-none"),l.removeClass("d-none")),n.addClass("col-md-9")}$(document).ready(function(){const t=new URLSearchParams(window.location.search),o=t.get("jenis");t.get("version");const a=t.get("category");let e,l,n=!1;R({selectedJenis:o,category:a}),w(),N({selectedJenis:o,hasCategory:a,isRenderTypes:!1}),$(window).on("resize",()=>N({selectedJenis:o,hasCategory:a,isRenderTypes:!1})),$("#search-input").on("input",function(){clearTimeout(e),e=setTimeout(()=>{V(),w()},500)}),$(window).on("scroll",function(){clearTimeout(l),l=setTimeout(async()=>{if(n||G())return;const c=$(window).scrollTop(),i=$(window).height(),r=$(document).height();if(c+i>=r-150){n=!0;try{I(!1),await w()}finally{n=!1}}},200)});function g(c,i=[],r=""){$("#carousel-product-image").empty(),$("#thumbnailGallery").empty();let u=c||[];(r==null?void 0:r.toLowerCase())==="uv board"&&i.length&&(u=[...c,...i]),u.forEach((d,f)=>{const v=f===0?"active":"";$("#carousel-product-image").append(`
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
            `)}),u.length<=1?$("#carouselProduct .carousel-control-next, #carouselProduct .carousel-control-prev").addClass("d-none"):$("#carouselProduct .carousel-control-next, #carouselProduct .carousel-control-prev").removeClass("d-none"),$("#carouselProduct").carousel({interval:3e3,pause:!1});let p;$("#thumbnailGallery").off("click").on("click",".thumbnail-image",function(){const d=$(this).data("index");$("#carouselProduct").carousel(d),$(".thumbnail-image").removeClass("active-thumbnail"),$(this).addClass("active-thumbnail"),setTimeout(()=>$(this).removeClass("active-thumbnail"),500),$("#carouselProduct").carousel("pause"),clearTimeout(p),p=setTimeout(()=>{$("#carouselProduct").carousel("cycle")},5e3)})}$(document).off("click",".product-card").on("click",".product-card",function(){const c=$(this).data("id"),i=$(this).data("code"),r=$(this).data("name"),u=$(this).data("category"),p=$(this).data("type"),d=$(this).data("jenis"),f=parseInt($(this).data("length"),10),v=parseFloat($(this).data("width")).toFixed(1),P=parseFloat($(this).data("density")).toFixed(1),k=$(this).data("url"),y=JSON.parse($(this).attr("data-specifications")||"[]"),T=$(this).attr("data-images"),b=JSON.parse($(this).attr("data-paket")||"[]");let J=$(this).data("height"),S=$(this).data("type-image"),C=[],j=[];if(d!=="card-types"&&h(c),T)try{C=JSON.parse(T.replace(/&quot;/g,'"'))}catch(m){C=[],console.error(m)}if(Array.isArray(b)&&(j=b.sort((m,L)=>m.order-L.order).map(m=>`/storage/${m.image}`)),$("#notes").show(),$("#modalPaket").empty(),d==="card-types"){V(),R({selectedJenis:o,type:p}),I(!1),w();return}d.toLowerCase()==="uv board"&&(x(y),$("#modalVideo, .lebar").hide(),$("#modalCategory").text(u),b.length>0?b.sort((m,L)=>m.order-L.order).map(m=>{$("#modalPaket").append(`
                        <span class="badge badge-outline-primary px-2 py-1 kepadatan" data-value="${m.name}">${m.name}</span>
                    `)}):($("#modalPaket").append('<span class="text-muted">Tidak ada paket</span>'),$("#notes").hide())),d.toLowerCase()==="wallboard"&&(x(y),$("#modalCategory").text(u),$("#ketebalan, .density, #notes, .paket,  #modalVideo, .lebar").hide()),d==="PVC Board"&&(x(y),$("#modalCategory").text(d),$("#modalVideo, .lebar, .paket").hide()),d==="Wallpanel"&&(x(y),$("#modalContact").data("type",p),$("#modalCategory").text(u+" / "+p),$("#ketebalan, #kepadatan, .paket, #modalVideo, #notes, .density").hide(),$("#modalGrafis").attr("src",`/storage/${S}`),$(".grafis").removeClass("d-none")),d.toLowerCase()==="aksesoris"&&($("#tinggi, #ketebalan, #kepadatan, .lebar, .density").hide(),$("#modalCategory").text(u),x(y),$("#modalVideoPlayer").empty(),$("#modalVideo, .density").hide(),k&&($("#modalVideoPlayer").append(`
                    <iframe class="embed-responsive-item"
                    src="${k}"
                    title="YouTube video player" frameborder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; web-share;"
                    referrerpolicy="strict-origin-when-cross-origin"
                    allowfullscreen></iframe>
                `),$("#modalVideo").show())),g(C,j,d),$("#modalName").text(r),$("#productModalLabel").text(r),$("#productModal").modal("show"),$("#modalContact").data({jenis:d,category:u,code:i,length:f,width:v,height:J,density:P,type:p}),$(".kepadatan").removeClass("active"),$("#modalContact").data({kepadatan:null,paket:null}),$(".modalContact").prop("disabled",$(".kepadatan").length>0)}),$(document).on("click",".kepadatan",function(){$(".modalContact").prop("disabled",!1);const c=$(this).data("value");$(this).closest("#productModal").find(".kepadatan").removeClass("active"),$(this).addClass("active"),$("#notes").hide(),$("#modalContact").data("kepadatan",c)}),U(o),E(),O(),F(),B();function h(c){$.ajax({url:`/products/${c}/viewed`,method:"POST",headers:{"X-CSRF-TOKEN":$('meta[name="csrf-token"]').attr("content")},success:i=>console.log("View recorded:",i),error:i=>console.error(i)})}});
