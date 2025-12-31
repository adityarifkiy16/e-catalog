let s={selectedJenis:null,category:null,type:null,currentPage:1,isLoading:!1,lastPage:!1,firstLoad:!0,currentRequest:null,uniquePaths:new Set,version:null};function F(){let e=[];$(document).on("change","#all-cat",function(){$(this).prop("checked")?($(".category-filter-download").prop("checked",!0),e=[""]):($(".category-filter-download").prop("checked",!1),e=[])}),$(document).on("change",".category-filter-download",function(){$(this).prop("checked")||$("#all-cat").prop("checked",!1),e=$(".category-filter-download:checked").map(function(){return $(this).val()}).get().filter(t=>t!=="");const n=$(".category-filter-download").length-1;e.length===n&&($("#all-cat").prop("checked",!0),e=[""])}),$(document).off("click","#btn-download").on("click","#btn-download",function(n){n.preventDefault();const t=s.type,a=s.selectedJenis,o=s.version;if(!o){alert("Silakan pilih versi terlebih dahulu.");return}let i=new URLSearchParams;e.length>0&&e[0]!==""&&e.forEach(r=>i.append("category[]",r)),a&&i.append("jenis_id",a),o&&i.append("version_id",o),t&&i.append("type_id",t);const l=`/catalog/pdf?${i.toString()}`;window.location.href=l})}function Y(){$(document).off("click",".modalContact").on("click",".modalContact",function(e){e.preventDefault();const n="62816659688",t=$(this).data("jenis");let a="";t.toLowerCase()=="wallpanel"?a=`Halo Admin,
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

Apakah produk ini masih tersedia? Terima kasih.`,window.open(`https://wa.me/${n}?text=${encodeURIComponent(a)}`,"_blank")})}function X(){$(window).scroll(function(){$(this).scrollTop()>100?$("#btn-scroll-top").fadeIn():$("#btn-scroll-top").fadeOut()}),$("#btn-scroll-top").click(function(){return $("html, body").animate({scrollTop:0},500),!1})}function W(e){s.firstLoad=e}function Q(){return s.isLoading}function C(e){s.selectedJenis=e.selectedJenis,s.category=e.category??null,s.type=e.type??null,s.version=e.version??null}function y(){s.currentPage=1,s.isLoading=!1,s.lastPage=!1,s.uniquePaths.clear(),$("#product-list .row").html("")}function Z(e){return s.currentRequest&&s.currentRequest.readyState!==4&&s.currentRequest.abort(),s.currentRequest=$.ajax({url:"/catalog",type:"GET",data:e})}function ee(e){$.ajax({url:`/products/${e}/viewed`,method:"POST",headers:{"X-CSRF-TOKEN":$('meta[name="csrf-token"]').attr("content")},success:n=>console.log("View recorded:",n),error:n=>console.error(n)})}function ae(){$("#loading").removeClass("d-none")}function te(){$("#loading").addClass("d-none")}function oe(e=[]){if(!Array.isArray(e))return[];const n={thumbnail:3,motif:2,product:1};return e.slice().sort((t,a)=>(n[a.type]||0)-(n[t.type]||0)).map(t=>"/storage/"+t.path)}function ne(e,n){$("#btn-download").addClass("d-none");let t="";e.forEach(a=>{const o=a.thumbnail?`/storage/${a.thumbnail}`:"https://via.placeholder.com/300x200?text=No+Image",i=n==3?"wallpanel":"tanpa kategori";t+=`
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
                </div>`}),$("#product-list .row").append(t)}function se(e){const n={"PVC Board":()=>{$("#category-container").addClass("d-none"),$(".category-modal-container").text("Tidak ada kategori")},Wallboard:()=>b("Motif"),"UV Board":()=>b("Motif"),Wallpanel:()=>b("Motif"),Aksesoris:()=>b("Ukuran"),default:()=>b("Kategori")};(n[e]||n.default)()}function b(e){$("#category-menu-item-label, #category-modal-item-label").html(e)}function P({selectedJenis:e=null,hasCategory:n=!1,isRenderTypes:t=!1}){const a=$("#filter-container"),o=$("#category-container"),i=$("#catalog-col"),l=$(window).width()<768;if(a.removeClass("d-none"),o.removeClass("d-none"),i.removeClass("col-md-12 col-md-9"),t){a.addClass("d-none"),o.addClass("d-none"),i.addClass("col-md-12");return}if(e==1){a.addClass("d-none"),o.addClass("d-none"),i.addClass("col-md-12");return}if(!n){a.addClass("d-none"),o.addClass("d-none"),i.addClass("col-md-12");return}l?(a.addClass("d-none"),o.removeClass("d-none")):(a.removeClass("d-none"),o.removeClass("d-none")),i.addClass("col-md-9")}function ie(e,n=null){return e.length===0?`
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
            `).join("")}</li>`}function le(e){if(e.length===0)return`
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
            </div>`).join("");return`<div class="row font-poppins">${n}${t}</div>`}function re(e){return e.length===0&&$("#type-menu-item-label").hide(),`<li class="nav-item font-poppins">${e.map(t=>`
                <a class="nav-link text-white type-filter d-flex align-items-center justify-content-start" 
                href="#" data-id="${t.id}">
                    <img src="${t.thumbnail?`/storage/${t.thumbnail}`:"dist/img/product/1.webp"}"
                        alt="${t.name}"
                        class="mr-2 img-thumbnail"
                        style="width:6.5rem;height:6.5rem;object-fit:contain;">
                    <span class="text-capitalize">${t.name}</span>
                </a>
            `).join("")}</li>`}function H(e,n=!0){var d,c,p;const t=e.category??[],a=(d=e.jenis)==null?void 0:d.name,o=s.firstLoad&&(((c=e.types)==null?void 0:c.length)??0)>0,i=(((p=e.category)==null?void 0:p.length)??0)>0;P({selectedJenis:s.selectedJenis,hasCategory:i,isRenderTypes:o}),t.length===0?$("#category-container").addClass("d-none"):$("#category-container").removeClass("d-none"),se(a);const l=ie(t,s.version),r=le(t),u=re(e.types??[]);n?$("#category-menu-item, #category-menu-item-modal").html("tidak ada kategori"):($("#category-menu-item, #category-menu-item-modal").html(l),$("#type-menu-item, #type-menu-item-modal").html(u),$("#pdf-catalog").html(r)),s.category&&$(`.category-filter[data-id="${s.category}"]`).addClass("active"),s.type&&$(`.type-filter[data-id="${s.type}"]`).addClass("active")}function w(e,n,t,a=!1){if(n==null)return;e.forEach(d=>{d.images&&d.images.forEach(c=>{c.path&&t.add(c.path)}),d.path&&t.add(d.path)});const o=Array.from(t),i=$("#mockup-carousel-inner"),l=$("#mockup-carousel-indicators"),r=["https://www.youtube.com/embed/BiiUrYAbL9s?autoplay=1&mute=1&rel=0&controls=0&amp;loop=1&playlist=BiiUrYAbL9s"],u=[];for(let d=1;d<=6;d++)d!==2&&u.push(`/dist/img/wpc/${d}.webp?v=${Date.now()}`);if(i.empty(),l.empty(),n==4){$("#mockup-carousel").carousel({interval:!1}),$("#mockup .carousel-control-next").addClass("d-none"),$("#mockup .carousel-control-prev").addClass("d-none"),r.forEach((d,c)=>{i.append(`
            <div class="carousel-item ${c===0?"active":""}">
                <div class="d-flex justify-content-center align-items-center">
                    <div class="embed-responsive embed-responsive-16by9 rounded-lg" style="width:100%;">
                        <iframe
                            class="embed-responsive-item"
                            src="${d}"
                            title="YouTube video player"
                            frameborder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; web-share"
                            allowfullscreen
                        ></iframe>
                    </div>
                </div>
            </div>
        `)}),$("#mockup").removeClass("d-none");return}else if(n==3&&a){$("#mockup-carousel").carousel({interval:3e3}),$("#mockup .carousel-control-next").removeClass("d-none"),$("#mockup .carousel-control-prev").removeClass("d-none"),u.forEach((d,c)=>{i.append(`
            <div class="carousel-item ${c===0?"active":""}">
                <div class="d-flex justify-content-center align-items-center">
                    <img src="${d}" 
                        alt="mockup" 
                        class="img-fluid w-100 rounded-3 d-block mx-auto mockup-image"
                    >
                </div>
            </div>
        `),l.append(`
            <li data-bs-target="#mockup-carousel" data-bs-slide-to="${c}" ${c===0?'class="active"':""}></li>
        `)}),$("#mockup").removeClass("d-none");return}o.length>0?(o.length===1?($("#mockup .carousel-control-next").addClass("d-none"),$("#mockup .carousel-control-prev").addClass("d-none"),l.addClass("d-none")):($("#mockup .carousel-control-next").removeClass("d-none"),$("#mockup .carousel-control-prev").removeClass("d-none"),l.removeClass("d-none")),o.forEach((d,c)=>{let p=c===0?"eager":"lazy",f=c===0?"high":"low";i.append(`
                <div class="carousel-item ${c===0?"active":""}">
                    <img src="/storage/${d}" alt="mockup" loading="${p}" fetchpriority="${f}" decode="async" 
                        class="img-fluid w-100 rounded-lg d-block mx-auto mockup-image"
                    >
                </div>
            `),l.append(`
                <li data-target="#mockup-carousel" data-slide-to="${c}" ${c===0?'class="active"':""}></li>
            `)}),$("#mockup").removeClass("d-none")):$("#mockup").addClass("d-none")}function U(e,n=!0){var i,l,r;const t=e.data.data[0],a=((l=(i=t==null?void 0:t.category)==null?void 0:i.type)==null?void 0:l.images)??[],o=((r=t==null?void 0:t.category)==null?void 0:r.images)??[];a.length>0?w(a,s.selectedJenis,s.uniquePaths,n):o.length>0?w(o,s.selectedJenis,s.uniquePaths,n):s.selectedJenis==3?w([],s.selectedJenis,s.uniquePaths,n):s.selectedJenis==4?w([],s.selectedJenis,s.uniquePaths,n):$("#mockup").addClass("d-none")}function de(e,n,t){$("#btn-download").removeClass("d-none");let a="";e.forEach(o=>{var T,j,L,J,S,_,A,M,V,K,R,E,q,B,I,N,O;const i=oe(((j=(T=o==null?void 0:o.product_versions)==null?void 0:T[0])==null?void 0:j.images)??[]),l=i.length?i[0]:"https://via.placeholder.com/300x200?text=No+Image";let r=i,u=((J=(L=o.category)==null?void 0:L.type)==null?void 0:J.thumbnail)??"";u&&!u.startsWith("http")&&(u=`storage/${u.replace(/^\/?storage\//,"")}`,r.push(u));const d=JSON.stringify(r).replace(/"/g,"&quot;"),c=JSON.stringify(o.packages).replace(/"/g,"&quot;"),p=((S=o.category)==null?void 0:S.name)??"Tanpa Kategori",f=((_=o.product_versions.find(G=>G.version_id==t))==null?void 0:_.name)??"Tanpa Nama";((A=o.category)==null?void 0:A.display_style)==="square"||n===null?a+=`
                    <div class="col-md-2 col-6 mb-4">
                        <div class="h-100 product-card"
                    `:((M=o.category)==null?void 0:M.display_style)==="rectangle"?a+=`
                    <div class="col-md-4 col-6 mb-4">
                        <div class="h-100 product-card"
                    `:a+=`
                    <div class="col-md-2 col-6 mb-4">
                        <div class="h-100 product-card d-flex flex-column justify-content-center align-items-center"
                    `;const m=((V=o.category)==null?void 0:V.display_style)==="rectangle",v=JSON.stringify(o.specifications).replace(/"/g,"&quot;");a+=`
                    data-id="${o.id}"
                    data-code="${o.code}"
                    data-name="${f}"
                    data-category="${p}"
                    data-jenis="${((R=(K=o.category)==null?void 0:K.jenis)==null?void 0:R.name)??""}"
                    data-images="${d}"
                    data-image="${l}"
                    data-type="${((q=(E=o.category)==null?void 0:E.type)==null?void 0:q.name)??""}"
                    data-type-image="${((I=(B=o.category)==null?void 0:B.type)==null?void 0:I.image)??""}"
                    data-url="${o.url_video}"
                    data-paket="${c}"
                    data-specifications = "${v}"
                    >
                       <img 
                            src="${l}" 
                            class="card-img-top" 
                            alt="${o.name}" 
                            style="
                                border : 1px solid #2c2c2c;
                                min-height: 10rem;
                                height: auto; 
                                border-radius: 8px;
                                width: 100%; 
                                object-fit: cover; 
                                object-position: ${((O=(N=o.category)==null?void 0:N.jenis)==null?void 0:O.name)==="PVC Board"?"bottom center":"center center"};
                                aspect-ratio: ${m?"16/9":"1/1"};
                            "
                        >
                        <div class="card-body d-flex flex-column text-center">
                            <h4 class="card-title font-weight-bold text-uppercase mb-2">
                                ${f}
                            </h4>
                            <h5 class="card-text text-white mb-1 font-weight-light">${p}</h5>
                        </div>
                    </div>
                </div>`}),$("#product-list .row").append(a)}function g(){if(s.isLoading||s.lastPage)return Promise.resolve();s.isLoading=!0,ae();const e=$("#search-input").val(),n={page:s.currentPage,search:e,jenis:s.selectedJenis,category:s.category,type:s.type,version:s.version};return Z(n).done(ce).always(()=>{s.isLoading=!1,te(),s.currentRequest=null})}function ce(e){const n=e.data.data??[],t=e.types??[],a=e.active_version_id;if(s.type&&($("#backButton").removeClass("d-none"),$("#homeButton").addClass("d-none")),s.version==null){const o=$("#version-select option:first").val();o&&(s.version=o)}if(!s.category&&Array.isArray(e.category)&&e.category.length>0){const o=e.category[0].id;s.category=o,y(),setTimeout(()=>g(),0);return}s.selectedJenis&&s.firstLoad&&t.length>0?($("#search-form").addClass("d-none"),$("#downloadButton").addClass("d-none"),$("#version-filter").addClass("d-none"),t.length>0&&(ne(t,s.selectedJenis),s.lastPage=!0),H(e,!0),U(e,!0)):($("#search-form").removeClass("d-none"),$("#downloadButton").removeClass("d-none"),$("#version-filter").removeClass("d-none"),n.length>0?(de(n,s.selectedJenis,a),s.currentPage++,s.currentPage>e.data.last_page&&(s.lastPage=!0)):(s.currentPage===1&&($("#mockup").addClass("d-none"),$("#product-list .row").append(`<div class="col-12"><img src="dist/img/no-data.png" alt="no-data"
                     class="img-fluid mx-auto d-block" style="max-width:100%;height:auto;margin:100px 0;"></div>`)),s.lastPage=!0),H(e,!1),U(e,!1))}function z(e={}){const n=new URL(window.location.href),t=n.searchParams;Object.entries(e).forEach(([a,o])=>{o==null||o===""?t.delete(a):t.set(a,o)}),window.history.replaceState({},"",n.toString())}let h=!1;function ue(e){$(document).off("click",".category-filter"),$(document).on("click",".category-filter",async function(n){if(n.preventDefault(),h)return;h=!0;const t=$(this).data("id"),a=$(this).data("type"),o=$(this).data("version");try{z({category:t,type:a,version:o,jenis:e}),C({selectedJenis:e,category:t,type:a,version:o}),$("#filterModal").modal("hide"),y(),await g(!1)}catch(i){console.error("Gagal memuat data:",i)}finally{h=!1}}),$(document).off("click",".type-filter"),$(document).on("click",".type-filter",async function(n){if(n.preventDefault(),h)return;h=!0;const t=$(this).data("id");try{C({selectedJenis:e,type:t}),$("#filterModal").modal("hide"),y(),await g(!1)}catch(a){console.error("Gagal memuat data:",a)}finally{h=!1}})}function me(){$("#version-select").on("change",function(){const e=$(this).val()||null;s.version=e,z({version:e}),y(),g()})}function k(e,n="#modalVariants"){$(n).empty(),$("#modalPaket").empty(),$("#modalKepadatan").empty(),Array.isArray(e)&&e.length>0?e.forEach(t=>{const a=t.specification_values||[],o=t.name.toLowerCase();if(o==="warna")$("#paket").text("Warna"),a.length>0?a.forEach(i=>{t.pivot&&i.id===t.pivot.specification_value_id&&$("#modalPaket").append(`
                                <span class="badge badge-outline-primary px-2 py-1 kepadatan" data-value="${i.name}">
                                    ${i.name}
                                </span>
                            `)}):$("#modalPaket").append('<span class="text-muted">Tidak ada data</span>');else if(o==="density")a.length>0?a.forEach(i=>{t.pivot&&i.id===t.pivot.specification_value_id&&(a.length>1?$("#modalKepadatan").append(`
                                    <span class="badge badge-outline-primary px-2 py-1 kepadatan" data-value="${i.name}">
                                        ${i.name}
                                    </span>
                                `):$("#modalKepadatan").append(i.name))}):$("#modalKepadatan").append('<span class="text-muted">Tidak ada data</span>');else{const i=a.find(d=>t.pivot&&d.id===t.pivot.specification_value_id),l=i?i.name:"-";let r=i?i.unit:"";r?r=" "+r:["panjang","tinggi","lebar"].includes(o)?r=" cm":o==="ketebalan"&&(r=" mm");const u=`
                    <div class="row mb-1 variant-row">
                        <div class="col-4 col-sm-3 font-weight-bold">${t.name}</div>
                        <div class="col-auto">:</div>
                        <div class="col">${l}${r}</div>
                    </div>
                `;$(n).append(u),$("#modalContact").data(o,l+r)}}):($(n).append('<div class="text-muted">Tidak ada varian</div>'),$(".paket").hide())}function pe(e,n=[],t=""){$("#carousel-product-image").empty(),$("#thumbnailGallery").empty();let a=e||[];(t==null?void 0:t.toLowerCase())==="uv board"&&n.length&&(a=[...e,...n]);const o=new IntersectionObserver(l=>{l.forEach(r=>{if(r.isIntersecting){const u=$(r.target);u.attr("src",u.data("src")),o.unobserve(r.target)}})},{rootMargin:"100px"});a.forEach((l,r)=>{const u=r===0?"active":"";$("#carousel-product-image").append(`
                <div class="carousel-item ${u}">
                    <img data-src="${l}" 
                        src="/dist/img/placeholder.webp"
                        class="img-fluid d-block mx-auto lazy-modal-img"
                        style="width:100%;max-width:400px;aspect-ratio:1/1;object-fit:cover;border-radius:8px;border:1px solid #ccc;">
                </div>
            `),$("#thumbnailGallery").append(`
                <div class="col-2 mb-0 d-flex justify-content-center">
                    <div style="height:90%">
                        <img 
                            data-src="${l}" 
                            src="/dist/img/placeholder.webp" 
                            class="img-thumbnail thumbnail-image lazy-modal-img p-0 w-100 h-100"
                            style="aspect-ratio:1/1;border:1px solid #ccc;border-radius:8px;object-fit:cover;cursor:pointer;"
                            data-index="${r}"
                        >
                    </div>
                </div>
            `)}),$(".lazy-modal-img").each(function(){o.observe(this)}),a.length<=1?$("#carouselProduct .carousel-control-next, #carouselProduct .carousel-control-prev").addClass("d-none"):$("#carouselProduct .carousel-control-next, #carouselProduct .carousel-control-prev").removeClass("d-none"),$("#carouselProduct").carousel({interval:3e3,pause:!1});let i;$("#thumbnailGallery").off("click").on("click",".thumbnail-image",function(){const l=$(this).data("index");$("#carouselProduct").carousel(l),$(".thumbnail-image").removeClass("active-thumbnail"),$(this).addClass("active-thumbnail"),setTimeout(()=>$(this).removeClass("active-thumbnail"),500),$("#carouselProduct").carousel("pause"),clearTimeout(i),i=setTimeout(()=>{$("#carouselProduct").carousel("cycle")},7e3)})}function fe(){$(document).off("click",".product-card").on("click",".product-card",function(){const e=$(this).data("id"),n=$(this).data("code"),t=$(this).data("name"),a=$(this).data("category"),o=$(this).data("type"),i=$(this).data("jenis"),l=$(this).data("url"),r=$(this).attr("data-images");let u=$(this).data("type-image");const d=JSON.parse($(this).attr("data-specifications")||"[]"),c=JSON.parse($(this).attr("data-paket")||"[]");let p=[],f=[];if(i!=="card-types"&&ee(e),r)try{p=JSON.parse(r.replace(/&quot;/g,'"'))}catch(m){p=[],console.error(m)}if(Array.isArray(c)&&(f=c.sort((m,v)=>m.order-v.order).map(m=>`/storage/${m.image}`)),$("#notes").show(),$("#modalPaket").empty(),i==="card-types"){y(),C({selectedJenis,type:o}),W(!1),loadMoreData();return}i.toLowerCase()==="uv board"&&(k(d),$("#modalVideo, .lebar").hide(),$("#modalCategory").text(a),c.length>0?c.sort((m,v)=>m.order-v.order).map(m=>{$("#modalPaket").append(`
                        <span class="badge badge-outline-primary px-2 py-1 kepadatan" data-value="${m.name}">${m.name}</span>
                    `)}):($("#modalPaket").append('<span class="text-muted">Tidak ada paket</span>'),$("#notes").hide())),i.toLowerCase()==="wallboard"&&(k(d),$("#modalCategory").text(a),$("#ketebalan, .density, #notes, .paket,  #modalVideo, .lebar").hide()),i==="PVC Board"&&(k(d),$("#modalCategory").text(i),$("#modalVideo, .lebar, .paket").hide()),i==="Wallpanel"&&(k(d),$("#modalContact").data("type",o),$("#modalCategory").text(a+" / "+o),$("#ketebalan, #kepadatan, .paket, #modalVideo, #notes, .density").hide(),$("#modalGrafis").attr("src",`/storage/${u}`),$(".grafis").removeClass("d-none")),i.toLowerCase()==="aksesoris"&&($("#tinggi, #ketebalan, #kepadatan, .lebar, .density").hide(),$("#modalCategory").text(a),k(d),$("#modalVideoPlayer").empty(),$("#modalVideo, .density").hide(),l&&($("#modalVideoPlayer").append(`
                    <iframe class="embed-responsive-item"
                    src="${l}"
                    title="YouTube video player" frameborder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; web-share;"
                    referrerpolicy="strict-origin-when-cross-origin"
                    allowfullscreen></iframe>
                `),$("#modalVideo").show())),pe(p,f,i),$("#modalName").text(t),$("#productModalLabel").text(t),$("#productModal").modal("show"),$("#modalContact").data({jenis:i,category:a,code:n,type:o}),$(".kepadatan").removeClass("active"),$("#modalContact").data({kepadatan:null,paket:null}),$(".modalContact").prop("disabled",$(".kepadatan").length>0)}),$(document).on("click",".kepadatan",function(){$(".modalContact").prop("disabled",!1);const e=$(this).data("value");$(this).closest("#productModal").find(".kepadatan").removeClass("active"),$(this).addClass("active"),$("#notes").hide(),$("#modalContact").data("kepadatan",e)})}function ge(){let e;$("#search-input").on("input",function(){clearTimeout(e),e=setTimeout(()=>{y(),g()},500)})}let D,x=!1;function $e(){$(window).on("scroll",function(){clearTimeout(D),D=setTimeout(async()=>{if(x||Q())return;const e=$(window).scrollTop(),n=$(window).height(),t=$(document).height();if(e+n>=t-150){x=!0;try{W(!1),await g()}finally{x=!1}}},200)})}$(document).ready(function(){const e=new URLSearchParams(window.location.search),n=e.get("jenis"),t=e.get("version"),a=e.get("category");C({selectedJenis:n,category:a,version:t}),g(),P({selectedJenis:n,hasCategory:a,isRenderTypes:!1}),$(window).on("resize",()=>P({selectedJenis:n,hasCategory:a,isRenderTypes:!1})),ue(n),F(),Y(),X(),me(),ge(),$e(),fe()});
