let s={selectedJenis:null,category:null,type:null,currentPage:1,isLoading:!1,lastPage:!1,firstLoad:!0,currentRequest:null,uniquePaths:new Set,version:null};function Y(){let e=[];$(document).on("change","#all-cat",function(){$(this).prop("checked")?($(".category-filter-download").prop("checked",!0),e=[""]):($(".category-filter-download").prop("checked",!1),e=[])}),$(document).on("change",".category-filter-download",function(){$(this).prop("checked")||$("#all-cat").prop("checked",!1),e=$(".category-filter-download:checked").map(function(){return $(this).val()}).get().filter(t=>t!=="");const n=$(".category-filter-download").length-1;e.length===n&&($("#all-cat").prop("checked",!0),e=[""])}),$(document).off("click","#btn-download").on("click","#btn-download",function(n){n.preventDefault();const t=s.type,a=s.selectedJenis,o=s.version;if(!o){alert("Silakan pilih versi terlebih dahulu.");return}let i=new URLSearchParams;e.length>0&&e[0]!==""&&e.forEach(d=>i.append("category[]",d)),a&&i.append("jenis_id",a),o&&i.append("version_id",o),t&&i.append("type_id",t);const r=`/catalog/pdf?${i.toString()}`;window.location.href=r})}function X(){$(document).off("click",".modalContact").on("click",".modalContact",function(e){e.preventDefault();const n="62816659688",t=$(this).data("jenis");let a="";t.toLowerCase()=="wallpanel"?a=`Halo Admin,
Saya tertarik dengan produk berikut:

• Tipe Wallpanel: *${$(this).data("type")}*
• Kode : *${$(this).data("code")}*
• panjang : *${$(this).data("panjang")}*
• tinggi : *${$(this).data("tinggi")}*
• lebar : *${$(this).data("lebar")}*
• Produk : *${$(this).data("jenis")}*
• Kategori: *${$(this).data("category")}*

Apakah produk ini masih tersedia? Terima kasih.`:t.toLowerCase()=="pvc board"?a=`Halo Admin,
Saya tertarik dengan produk berikut:

• Produk : *${$(this).data("jenis")}*
• Ketebalan : *${$(this).data("code")}*
• density: *${$(this).data("kepadatan")??"-"}*

Apakah produk ini masih tersedia? Terima kasih.`:t.toLowerCase()=="uv board"?a=`Halo Admin,
Saya tertarik dengan produk berikut:

• Kode Motif : *${$(this).data("code")}*
• Produk : *${$(this).data("jenis")}*
• Kategori: *${$(this).data("category")}*

• Paket: *${$(this).data("kepadatan")??"-"}*

Apakah produk ini masih tersedia? Terima kasih.`:t.toLowerCase()=="aksesoris"?a=`Halo Admin,
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

Apakah produk ini masih tersedia? Terima kasih.`,window.open(`https://wa.me/${n}?text=${encodeURIComponent(a)}`,"_blank")})}function Q(){$(window).scroll(function(){$(this).scrollTop()>100?$("#btn-scroll-top").fadeIn():$("#btn-scroll-top").fadeOut()}),$("#btn-scroll-top").click(function(){return $("html, body").animate({scrollTop:0},500),!1})}function z(e){s.firstLoad=e}function Z(){return s.isLoading}function C(e){s.selectedJenis=e.selectedJenis,s.category=e.category??null,s.type=e.type??null,s.version=e.version??null}function v(){s.currentPage=1,s.isLoading=!1,s.lastPage=!1,s.uniquePaths.clear(),$("#product-list .row").html("")}function ee(e){return s.currentRequest&&s.currentRequest.readyState!==4&&s.currentRequest.abort(),s.currentRequest=$.ajax({url:"/catalog/product",type:"GET",data:e})}function ae(e){$.ajax({url:`/products/${e}/viewed`,method:"POST",headers:{"X-CSRF-TOKEN":$('meta[name="csrf-token"]').attr("content")},success:n=>console.log("View recorded:",n),error:n=>console.error(n)})}function te(){$("#loading").removeClass("d-none")}function oe(){$("#loading").addClass("d-none")}function ne(e=[]){if(!Array.isArray(e))return[];const n={thumbnail:3,motif:2,product:1};return e.slice().sort((t,a)=>(n[a.type]||0)-(n[t.type]||0)).map(t=>"/storage/"+t.path)}function se(e,n){$("#btn-download").addClass("d-none");let t="";e.forEach(a=>{const o=a.thumbnail?`/storage/${a.thumbnail}`:"https://via.placeholder.com/300x200?text=No+Image",i=n==3?"wallpanel":"tanpa kategori";t+=`
                    <div class="col-md-2 col-6 mb-4">
                        <div class="h-100 product-card d-flex flex-column justify-content-center align-items-center"
                    `,t+=`
                    data-id="${a.id}"
                    data-jenis="card-types"
                    data-category="${i}"
                    data-type="${a.id}"
                    >
                       <img 
                            src="${o}" 
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
                            <h6 class="card-text text-muted mb-1">${i}</h6>
                        </div>
                    </div>
                </div>`}),$("#product-list .row").append(t)}function ie(e){const n={"PVC Board":()=>{$("#category-container").addClass("d-none"),$(".category-modal-container").text("Tidak ada kategori")},Wallboard:()=>k("Motif"),"UV Board":()=>k("Motif"),Wallpanel:()=>k("Motif"),Aksesoris:()=>k("Ukuran"),default:()=>k("Kategori")};(n[e]||n.default)()}function k(e){$("#category-menu-item-label, #category-modal-item-label").html(e)}function T({selectedJenis:e=null,hasCategory:n=!1,isRenderTypes:t=!1}){const a=$("#filter-container"),o=$("#category-container"),i=$("#catalog-col"),r=$(window).width()<768;if(a.removeClass("d-none"),o.removeClass("d-none"),i.removeClass("col-md-12 col-md-9"),t){a.addClass("d-none"),o.addClass("d-none"),i.addClass("col-md-12");return}if(e==1){a.addClass("d-none"),o.addClass("d-none"),i.addClass("col-md-12");return}if(!n){a.addClass("d-none"),o.addClass("d-none"),i.addClass("col-md-12");return}r?(a.addClass("d-none"),o.removeClass("d-none")):(a.removeClass("d-none"),o.removeClass("d-none")),i.addClass("col-md-9")}function le(e,n=null){return e.length===0?`
            <li class="nav-item font-poppins">
                <a class="nav-link text-white category-filter" href="#">Tanpa Kategori</a>
            </li>`:`<li class="nav-item font-poppins">${e.map(a=>`
                <a class="nav-link text-white category-filter d-flex align-items-center justify-content-start" 
                href="#" 
                data-jenis-id="${a.jenis_id}" 
                data-id="${a.id}" 
                data-type="${a.type_id}"
                data-version="${n}">
                    <img src="${a.path?"storage/"+a.path:"dist/img/product/1.webp"}"
                        alt=""
                        aria-hidden="true"
                        class="mr-2 img-thumbnail"
                        style="width:50px;height:50px;object-fit:contain;">
                    <span class="text-capitalize">${a.name}</span>
                </a>
            `).join("")}</li>`}function re(e){if(e.length===0)return`
            <div class="row font-poppins">
                <div class="col-12 mb-2">
                    <div class="text-white rounded py-2 px-3">
                        <input type="checkbox" class="custom-control-input" id="no-cat" disabled>
                        <label class="custom-control-label" for="no-cat">
                            Tanpa Kategori
                        </label>
                    </div>
                </div>
            </div>`;const n=`
        <div class="col-12 mb-2">
            <div class="text-white rounded py-2 px-3">
                <input type="checkbox" class="custom-control-input category-filter-download" id="all-cat" value="">
                <label class="custom-control-label" for="all-cat">
                    Semua Kategori
                </label>
            </div>
        </div>`,t=e.map(a=>`
            <div class="col-6 col-md-4 mb-2">
                <div class="text-white rounded py-2 px-3">
                    <input type="checkbox" class="custom-control-input category-filter-download" 
                           id="cat-${a.id}" value="${a.id}">
                    <label class="custom-control-label" for="cat-${a.id}">
                        ${a.name}
                    </label>
                </div>
            </div>`).join("");return`<div class="row font-poppins">${n}${t}</div>`}function de(e){return e.length===0&&$("#type-menu-item-label").hide(),`<li class="nav-item font-poppins">${e.map(t=>`
                <a class="nav-link text-white type-filter d-flex align-items-center justify-content-start" 
                href="#" data-id="${t.id}">
                    <img src="${t.thumbnail?`/storage/${t.thumbnail}`:"dist/img/product/1.webp"}"
                        alt="${t.name}"
                        class="mr-2 img-thumbnail"
                        style="width:6.5rem;height:6.5rem;object-fit:contain;">
                    <span class="text-capitalize">${t.name}</span>
                </a>
            `).join("")}</li>`}function x(e,n=!0){var l,c,p;const t=e.category??[],a=(l=e.jenis)==null?void 0:l.name,o=s.firstLoad&&(((c=e.types)==null?void 0:c.length)??0)>0,i=(((p=e.category)==null?void 0:p.length)??0)>0;T({selectedJenis:s.selectedJenis,hasCategory:i,isRenderTypes:o}),t.length===0?$("#category-container").addClass("d-none"):$("#category-container").removeClass("d-none"),ie(a);const r=le(t,s.version),d=re(t),u=de(e.types??[]);n?$("#category-menu-item, #category-menu-item-modal").html("tidak ada kategori"):($("#category-menu-item, #category-menu-item-modal").html(r),$("#type-menu-item, #type-menu-item-modal").html(u),$("#pdf-catalog").html(d)),s.category&&$(`.category-filter[data-id="${s.category}"]`).addClass("active"),s.type&&$(`.type-filter[data-id="${s.type}"]`).addClass("active")}function h(e,n,t,a=!1){if(n==null)return;e.forEach(l=>{l.images&&l.images.forEach(c=>{c.path&&t.add(c.path)}),l.path&&t.add(l.path)});const o=Array.from(t),i=$("#mockup-carousel-inner"),r=$("#mockup-carousel-indicators");i.empty(),r.empty();const d=["https://www.youtube.com/embed/BiiUrYAbL9s?autoplay=1&mute=1&rel=0&controls=0&amp;loop=1&playlist=BiiUrYAbL9s"],u=[];for(let l=1;l<=6;l++)l!==2&&u.push(`/dist/img/wpc/${l}.webp?v=${Date.now()}`);if(n==4){$("#mockup-carousel").carousel({interval:!1}),$("#mockup .carousel-control-next").addClass("d-none"),$("#mockup .carousel-control-prev").addClass("d-none"),d.forEach((l,c)=>{i.append(`
            <div class="carousel-item ${c===0?"active":""}">
                <div class="d-flex justify-content-center align-items-center">
                    <div class="embed-responsive embed-responsive-16by9 rounded-lg" style="width:100%;">
                        <iframe
                            class="embed-responsive-item"
                            src="${l}"
                            title="YouTube video player"
                            frameborder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; web-share"
                            allowfullscreen
                        ></iframe>
                    </div>
                </div>
            </div>
        `)}),$("#mockup").removeClass("d-none");return}else if(n==3&&a){$("#mockup-carousel").carousel({interval:3e3}),$("#mockup .carousel-control-next").removeClass("d-none"),$("#mockup .carousel-control-prev").removeClass("d-none"),u.forEach((l,c)=>{i.append(`
            <div class="carousel-item ${c===0?"active":""}">
                <div class="d-flex justify-content-center align-items-center">
                    <img src="${l}" 
                        alt="mockup" 
                        class="img-fluid w-100 rounded-3 d-block mx-auto mockup-image"
                    >
                </div>
            </div>
        `),r.append(`
            <li data-bs-target="#mockup-carousel" data-bs-slide-to="${c}" ${c===0?'class="active"':""}></li>
        `)}),$("#mockup").removeClass("d-none");return}o.length>0?(console.log("Rendering mockup images:",o),o.length===1?($("#mockup .carousel-control-next").addClass("d-none"),$("#mockup .carousel-control-prev").addClass("d-none"),r.addClass("d-none")):($("#mockup .carousel-control-next").removeClass("d-none"),$("#mockup .carousel-control-prev").removeClass("d-none"),r.removeClass("d-none")),o.forEach((l,c)=>{let p=c===0?"eager":"lazy",g=c===0?"high":"low";i.append(`
                <div class="carousel-item ${c===0?"active":""}">
                    <img src="/storage/${l}" alt="mockup" loading="${p}" fetchpriority="${g}" decode="async" 
                        class="img-fluid w-100 rounded-lg d-block mx-auto mockup-image"
                    >
                </div>
            `),r.append(`
                <li data-target="#mockup-carousel" data-slide-to="${c}" ${c===0?'class="active"':""}></li>
            `)}),$("#mockup").removeClass("d-none")):$("#mockup").addClass("d-none")}function U(e,n=!0){var r,d,u,l;const t=(r=e.products)==null?void 0:r.data[0],a=((u=(d=t==null?void 0:t.category)==null?void 0:d.type)==null?void 0:u.images)??[],o=((l=t==null?void 0:t.category)==null?void 0:l.images)??[];console.log(o);const i=s.selectedJenis===3||s.selectedJenis===4;if(n){if(a.length>0){console.log("Rendering mockup image types:",a),h(a,s.selectedJenis,s.uniquePaths,n);return}if(o.length>0){console.log("Rendering mockup images:",o),h(o,s.selectedJenis,s.uniquePaths,n);return}if(i){h([],s.selectedJenis,s.uniquePaths,n);return}}else{if(a.length>0){console.log("Rendering mockup image types:",a),h(a,s.selectedJenis,s.uniquePaths,n);return}if(o.length>0){console.log("Rendering mockup images:",o),h(o,s.selectedJenis,s.uniquePaths,n);return}h([],s.selectedJenis,s.uniquePaths,n)}}function D(e,n,t){$("#btn-download").removeClass("d-none");let a="";e.forEach(o=>{var j,L,J,R,S,_,A,M,V,q,K,E,B,I,N,O,H;const i=ne(((L=(j=o==null?void 0:o.product_versions)==null?void 0:j[0])==null?void 0:L.images)??[]),r=i.length?i[0]:"https://via.placeholder.com/300x200?text=No+Image";let d=i,u=((R=(J=o.category)==null?void 0:J.type)==null?void 0:R.thumbnail)??"";u&&!u.startsWith("http")&&(u=`storage/${u.replace(/^\/?storage\//,"")}`,d.push(u));const l=JSON.stringify(d).replace(/"/g,"&quot;"),c=JSON.stringify(o.packages).replace(/"/g,"&quot;"),p=((S=o.category)==null?void 0:S.name)??"Tanpa Kategori",g=((_=o.product_versions.find(F=>F.version_id==t))==null?void 0:_.name)??"Tanpa Nama";((A=o.category)==null?void 0:A.display_style)==="square"||n===null?a+=`
                    <div class="col-md-2 col-6 mb-4">
                        <div class="h-100 product-card"
                    `:((M=o.category)==null?void 0:M.display_style)==="rectangle"?a+=`
                    <div class="col-md-4 col-6 mb-4">
                        <div class="h-100 product-card"
                    `:a+=`
                    <div class="col-md-2 col-6 mb-4">
                        <div class="h-100 product-card d-flex flex-column justify-content-center align-items-center"
                    `;const m=((V=o.category)==null?void 0:V.display_style)==="rectangle",b=JSON.stringify(o.specifications).replace(/"/g,"&quot;");a+=`
                    data-id="${o.id}"
                    data-code="${o.code}"
                    data-name="${g}"
                    data-category="${p}"
                    data-jenis="${((K=(q=o.category)==null?void 0:q.jenis)==null?void 0:K.name)??""}"
                    data-images="${l}"
                    data-image="${r}"
                    data-type="${((B=(E=o.category)==null?void 0:E.type)==null?void 0:B.name)??""}"
                    data-type-image="${((N=(I=o.category)==null?void 0:I.type)==null?void 0:N.image)??""}"
                    data-url="${o.url_video}"
                    data-paket="${c}"
                    data-specifications = "${b}"
                    >
                       <img 
                            src="${r}" 
                            class="card-img-top" 
                            alt="${o.name}" 
                            style="
                                border : 1px solid #2c2c2c;
                                min-height: 10rem;
                                height: auto; 
                                border-radius: 8px;
                                width: 100%; 
                                object-fit: cover; 
                                object-position: ${((H=(O=o.category)==null?void 0:O.jenis)==null?void 0:H.name)==="PVC Board"?"bottom center":"center center"};
                                aspect-ratio: ${m?"16/9":"1/1"};
                            "
                        >
                        <div class="card-body d-flex flex-column text-center">
                            <h4 class="card-title font-weight-bold text-uppercase mb-2">
                                ${g}
                            </h4>
                            <h5 class="card-text text-white mb-1 font-weight-light">${p}</h5>
                        </div>
                    </div>
                </div>`}),$("#product-list .row").append(a)}function f(){if(s.isLoading||s.lastPage)return Promise.resolve();s.isLoading=!0,te();const e=$("#search-input").val(),n={page:s.currentPage,search:e,jenis:s.selectedJenis,category:s.category,type:s.type,version:s.version};return ee(n).done(ce).always(()=>{s.isLoading=!1,oe(),s.currentRequest=null})}function ce(e){console.log(e);const n=e.products.data??[],t=e.types??[],a=e.active_version_id;if(s.type&&($("#backButton").removeClass("d-none"),$("#homeButton").addClass("d-none")),s.version==null){const o=$("#version-select option:first").val();o&&(s.version=o)}if(!s.category&&Array.isArray(e.category)&&e.category.length>0){const o=e.category[0].id;s.category=o,v(),setTimeout(()=>f(),0);return}s.firstLoad?t.length>0?(console.log("Rendering types on first load"),$("#search-form").addClass("d-none"),$("#downloadButton").addClass("d-none"),$("#version-filter").addClass("d-none"),se(t,s.selectedJenis),s.lastPage=!0,x(e,!0),U(e,!0)):(console.log("Rendering products on first load"),$("#search-form").removeClass("d-none"),$("#downloadButton").removeClass("d-none"),$("#version-filter").removeClass("d-none"),n.length>0?(D(n,s.selectedJenis,a),s.currentPage++,s.currentPage>n.last_page&&(s.lastPage=!0)):(s.currentPage===1&&($("#mockup").addClass("d-none"),$("#product-list .row").append(`<div class="col-12"><img src="dist/img/no-data.png" alt="no-data"
                         class="img-fluid mx-auto d-block" style="max-width:100%;height:auto;margin:100px 0;"></div>`)),s.lastPage=!0),x(e,!1)):(console.log("Rendering products on subsequent load"),$("#search-form").removeClass("d-none"),$("#downloadButton").removeClass("d-none"),$("#version-filter").removeClass("d-none"),n.length>0?(D(n,s.selectedJenis,a),s.currentPage++,s.currentPage>n.last_page&&(s.lastPage=!0)):(s.currentPage===1&&($("#mockup").addClass("d-none"),$("#product-list .row").append(`<div class="col-12"><img src="dist/img/no-data.png" alt="no-data"
                     class="img-fluid mx-auto d-block" style="max-width:100%;height:auto;margin:100px 0;"></div>`)),s.lastPage=!0),x(e,!1),U(e,!1)),s.firstLoad=!1}function G(e={}){const n=new URL(window.location.href),t=n.searchParams;Object.entries(e).forEach(([a,o])=>{o==null||o===""?t.delete(a):t.set(a,o)}),window.history.replaceState({},"",n.toString())}let y=!1;function ue(e){$(document).off("click",".category-filter"),$(document).on("click",".category-filter",async function(n){if(n.preventDefault(),y)return;y=!0;const t=$(this).data("id"),a=$(this).data("type"),o=$(this).data("version");try{G({category:t,type:a,version:o,jenis:e}),C({selectedJenis:e,category:t,type:a,version:o}),$("#filterModal").modal("hide"),v(),await f(!1)}catch(i){console.error("Gagal memuat data:",i)}finally{y=!1}}),$(document).off("click",".type-filter"),$(document).on("click",".type-filter",async function(n){if(n.preventDefault(),y)return;y=!0;const t=$(this).data("id");try{C({selectedJenis:e,type:t}),$("#filterModal").modal("hide"),v(),await f(!1)}catch(a){console.error("Gagal memuat data:",a)}finally{y=!1}})}function me(){$("#version-select").on("change",function(){const e=$(this).val()||null;s.version=e,G({version:e}),v(),f()})}function w(e,n="#modalVariants"){$(n).empty(),$("#modalPaket").empty(),$("#modalKepadatan").empty(),Array.isArray(e)&&e.length>0?e.forEach(t=>{const a=t.specification_values||[],o=t.name.toLowerCase();if(o==="warna")$("#paket").text("Warna"),a.length>0?a.forEach(i=>{t.pivot&&i.id===t.pivot.specification_value_id&&$("#modalPaket").append(`
                                <span class="badge badge-outline-primary px-2 py-1 kepadatan" data-value="${i.name}">
                                    ${i.name}
                                </span>
                            `)}):$("#modalPaket").append('<span class="text-muted">Tidak ada data</span>');else if(o==="density")a.length>0?a.forEach(i=>{t.pivot&&i.id===t.pivot.specification_value_id&&(a.length>1?$("#modalKepadatan").append(`
                                    <span class="badge badge-outline-primary px-2 py-1 kepadatan" data-value="${i.name}">
                                        ${i.name}
                                    </span>
                                `):$("#modalKepadatan").append(i.name))}):$("#modalKepadatan").append('<span class="text-muted">Tidak ada data</span>');else{const i=a.find(l=>t.pivot&&l.id===t.pivot.specification_value_id),r=i?i.name:"-";let d=i?i.unit:"";d?d=" "+d:["panjang","tinggi","lebar"].includes(o)?d=" cm":o==="ketebalan"&&(d=" mm");const u=`
                    <div class="row mb-1 variant-row">
                        <div class="col-4 col-sm-3 font-weight-bold">${t.name}</div>
                        <div class="col-auto">:</div>
                        <div class="col">${r}${d}</div>
                    </div>
                `;$(n).append(u),$("#modalContact").data(o,r+d)}}):($(n).append('<div class="text-muted">Tidak ada varian</div>'),$(".paket").hide())}function pe(e,n=[],t=""){$("#carousel-product-image").empty(),$("#thumbnailGallery").empty();let a=e||[];(t==null?void 0:t.toLowerCase())==="uv board"&&n.length&&(a=[...e,...n]);const o=new IntersectionObserver(r=>{r.forEach(d=>{if(d.isIntersecting){const u=$(d.target);u.attr("src",u.data("src")),o.unobserve(d.target)}})},{rootMargin:"100px"});a.forEach((r,d)=>{const u=d===0?"active":"";$("#carousel-product-image").append(`
                <div class="carousel-item ${u}">
                    <img data-src="${r}" 
                        src="/dist/img/placeholder.webp"
                        class="img-fluid d-block mx-auto lazy-modal-img"
                        style="width:100%;max-width:400px;aspect-ratio:1/1;object-fit:cover;border-radius:8px;border:1px solid #ccc;">
                </div>
            `),$("#thumbnailGallery").append(`
                <div class="col-2 mb-0 d-flex justify-content-center">
                    <div style="height:90%">
                        <img 
                            data-src="${r}" 
                            src="/dist/img/placeholder.webp" 
                            class="img-thumbnail thumbnail-image lazy-modal-img p-0 w-100 h-100"
                            style="aspect-ratio:1/1;border:1px solid #ccc;border-radius:8px;object-fit:cover;cursor:pointer;"
                            data-index="${d}"
                        >
                    </div>
                </div>
            `)}),$(".lazy-modal-img").each(function(){o.observe(this)}),a.length<=1?$("#carouselProduct .carousel-control-next, #carouselProduct .carousel-control-prev").addClass("d-none"):$("#carouselProduct .carousel-control-next, #carouselProduct .carousel-control-prev").removeClass("d-none"),$("#carouselProduct").carousel({interval:3e3,pause:!1});let i;$("#thumbnailGallery").off("click").on("click",".thumbnail-image",function(){const r=$(this).data("index");$("#carouselProduct").carousel(r),$(".thumbnail-image").removeClass("active-thumbnail"),$(this).addClass("active-thumbnail"),setTimeout(()=>$(this).removeClass("active-thumbnail"),500),$("#carouselProduct").carousel("pause"),clearTimeout(i),i=setTimeout(()=>{$("#carouselProduct").carousel("cycle")},7e3)})}function ge(){$(document).off("click",".product-card").on("click",".product-card",function(){const e=$(this).data("id"),n=$(this).data("code"),t=$(this).data("name"),a=$(this).data("category"),o=$(this).data("type"),i=$(this).data("jenis"),r=$(this).data("url"),d=$(this).attr("data-images");let u=$(this).data("type-image");const l=JSON.parse($(this).attr("data-specifications")||"[]"),c=JSON.parse($(this).attr("data-paket")||"[]");let p=[],g=[];if(i!=="card-types"&&ae(e),d)try{p=JSON.parse(d.replace(/&quot;/g,'"'))}catch(m){p=[],console.error(m)}if(Array.isArray(c)&&(g=c.sort((m,b)=>m.order-b.order).map(m=>`/storage/${m.image}`)),$("#notes").show(),$("#modalPaket").empty(),i==="card-types"){v(),C({selectedJenis,type:o}),z(!1),loadMoreData();return}i.toLowerCase()==="uv board"&&(w(l),$("#modalVideo, .lebar").hide(),$("#modalCategory").text(a),c.length>0?c.sort((m,b)=>m.order-b.order).map(m=>{$("#modalPaket").append(`
                        <span class="badge badge-outline-primary px-2 py-1 kepadatan" data-value="${m.name}">${m.name}</span>
                    `)}):($("#modalPaket").append('<span class="text-muted">Tidak ada paket</span>'),$("#notes").hide())),i.toLowerCase()==="wallboard"&&(w(l),$("#modalCategory").text(a),$("#ketebalan, .density, #notes, .paket,  #modalVideo, .lebar").hide()),i==="PVC Board"&&(w(l),$("#modalCategory").text(i),$("#modalVideo, .lebar, .paket").hide()),i==="Wallpanel"&&(w(l),$("#modalContact").data("type",o),$("#modalCategory").text(a+" / "+o),$("#ketebalan, #kepadatan, .paket, #modalVideo, #notes, .density").hide(),$("#modalGrafis").attr("src",`/storage/${u}`),$(".grafis").removeClass("d-none")),i.toLowerCase()==="aksesoris"&&($("#tinggi, #ketebalan, #kepadatan, .lebar, .density").hide(),$("#modalCategory").text(a),w(l),$("#modalVideoPlayer").empty(),$("#modalVideo, .density").hide(),r&&($("#modalVideoPlayer").append(`
                    <iframe class="embed-responsive-item"
                    src="${r}"
                    title="YouTube video player" frameborder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; web-share;"
                    referrerpolicy="strict-origin-when-cross-origin"
                    allowfullscreen></iframe>
                `),$("#modalVideo").show())),pe(p,g,i),$("#modalName").text(t),$("#productModalLabel").text(t),$("#productModal").modal("show"),$("#modalContact").data({jenis:i,category:a,code:n,type:o}),$(".kepadatan").removeClass("active"),$("#modalContact").data({kepadatan:null,paket:null}),$(".modalContact").prop("disabled",$(".kepadatan").length>0)}),$(document).on("click",".kepadatan",function(){$(".modalContact").prop("disabled",!1);const e=$(this).data("value");$(this).closest("#productModal").find(".kepadatan").removeClass("active"),$(this).addClass("active"),$("#notes").hide(),$("#modalContact").data("kepadatan",e)})}function fe(){let e;$("#search-input").on("input",function(){clearTimeout(e),e=setTimeout(()=>{v(),f()},500)})}let W,P=!1;function $e(){$(window).on("scroll",function(){clearTimeout(W),W=setTimeout(async()=>{if(P||Z())return;const e=$(window).scrollTop(),n=$(window).height(),t=$(document).height();if(e+n>=t-150){P=!0;try{z(!1),await f()}finally{P=!1}}},200)})}$(document).ready(function(){const e=new URLSearchParams(window.location.search),n=e.get("jenis"),t=e.get("version"),a=e.get("category");C({selectedJenis:n,category:a,version:t}),f(),T({selectedJenis:n,hasCategory:a,isRenderTypes:!1}),$(window).on("resize",()=>T({selectedJenis:n,hasCategory:a,isRenderTypes:!1})),ue(n),Y(),X(),Q(),me(),fe(),$e(),ge()});
