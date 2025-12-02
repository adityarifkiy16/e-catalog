let s={selectedJenis:null,category:null,type:null,currentPage:1,isLoading:!1,lastPage:!1,firstLoad:!0,currentRequest:null,uniquePaths:new Set,version:null};function z(){let e=[];$(document).on("change","#all-cat",function(){$(this).prop("checked")?($(".category-filter-download").prop("checked",!0),e=[""]):($(".category-filter-download").prop("checked",!1),e=[])}),$(document).on("change",".category-filter-download",function(){$(this).prop("checked")||$("#all-cat").prop("checked",!1),e=$(".category-filter-download:checked").map(function(){return $(this).val()}).get().filter(t=>t!=="");const o=$(".category-filter-download").length-1;e.length===o&&($("#all-cat").prop("checked",!0),e=[""])}),$(document).off("click","#btn-download").on("click","#btn-download",function(o){o.preventDefault();const t=s.type,a=s.selectedJenis,n=s.version;if(!n){alert("Silakan pilih versi terlebih dahulu.");return}let i=new URLSearchParams;e.length>0&&e[0]!==""&&e.forEach(d=>i.append("category[]",d)),a&&i.append("jenis_id",a),n&&i.append("version_id",n),t&&i.append("type_id",t);const l=`/catalog/pdf?${i.toString()}`;window.location.href=l})}function F(){$(document).off("click",".modalContact").on("click",".modalContact",function(e){e.preventDefault();const o="62816659688",t=$(this).data("jenis");let a="";t.toLowerCase()=="wallpanel"?a=`Halo Admin,
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

Apakah produk ini masih tersedia? Terima kasih.`,window.open(`https://wa.me/${o}?text=${encodeURIComponent(a)}`,"_blank")})}function Y(){$(window).scroll(function(){$(this).scrollTop()>100?$("#btn-scroll-top").fadeIn():$("#btn-scroll-top").fadeOut()}),$("#btn-scroll-top").click(function(){return $("html, body").animate({scrollTop:0},500),!1})}function W(e){s.firstLoad=e}function X(){return s.isLoading}function C(e){s.selectedJenis=e.selectedJenis,s.category=e.category??null,s.type=e.type??null,s.version=e.version??null}function h(){s.currentPage=1,s.isLoading=!1,s.lastPage=!1,s.uniquePaths.clear(),$("#product-list .row").html("")}function Q(e){return s.currentRequest&&s.currentRequest.readyState!==4&&s.currentRequest.abort(),s.currentRequest=$.ajax({url:"/catalog",type:"GET",data:e})}function Z(e){$.ajax({url:`/products/${e}/viewed`,method:"POST",headers:{"X-CSRF-TOKEN":$('meta[name="csrf-token"]').attr("content")},success:o=>console.log("View recorded:",o),error:o=>console.error(o)})}function ee(){$("#loading").removeClass("d-none")}function ae(){$("#loading").addClass("d-none")}function te(e=[]){if(!Array.isArray(e))return[];const o={thumbnail:3,motif:2,product:1};return e.slice().sort((t,a)=>(o[a.type]||0)-(o[t.type]||0)).map(t=>"/storage/"+t.path)}function oe(e,o){$("#btn-download").addClass("d-none");let t="";e.forEach(a=>{const n=a.thumbnail?`/storage/${a.thumbnail}`:"https://via.placeholder.com/300x200?text=No+Image",i=o==3?"wallpanel":"tanpa kategori";t+=`
                    <div class="col-md-2 col-6 mb-4">
                        <div class="h-100 product-card d-flex flex-column justify-content-center align-items-center"
                    `,t+=`
                    data-id="${a.id}"
                    data-jenis="card-types"
                    data-category="${i}"
                    data-type="${a.id}"
                    >
                       <img 
                            src="${n}" 
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
                </div>`}),$("#product-list .row").append(t)}function ne(e){const o={"PVC Board":()=>{$("#category-container").addClass("d-none"),$(".category-modal-container").text("Tidak ada kategori")},Wallboard:()=>b("Motif"),"UV Board":()=>b("Motif"),Wallpanel:()=>b("Motif"),Aksesoris:()=>b("Ukuran"),default:()=>b("Kategori")};(o[e]||o.default)()}function b(e){$("#category-menu-item-label, #category-modal-item-label").html(e)}function P({selectedJenis:e=null,hasCategory:o=!1,isRenderTypes:t=!1}){const a=$("#filter-container"),n=$("#category-container"),i=$("#catalog-col"),l=$(window).width()<768;if(a.removeClass("d-none"),n.removeClass("d-none"),i.removeClass("col-md-12 col-md-9"),t){a.addClass("d-none"),n.addClass("d-none"),i.addClass("col-md-12");return}if(e==1){a.addClass("d-none"),n.addClass("d-none"),i.addClass("col-md-12");return}if(!o){a.addClass("d-none"),n.addClass("d-none"),i.addClass("col-md-12");return}l?(a.addClass("d-none"),n.removeClass("d-none")):(a.removeClass("d-none"),n.removeClass("d-none")),i.addClass("col-md-9")}function se(e,o=null){return e.length===0?`
            <li class="nav-item font-poppins">
                <a class="nav-link text-white category-filter" href="#">Tanpa Kategori</a>
            </li>`:`<li class="nav-item font-poppins">${e.map(a=>`
                <a class="nav-link text-white category-filter d-flex align-items-center justify-content-start" 
                href="#" 
                data-jenis-id="${a.jenis_id}" 
                data-id="${a.id}" 
                data-type="${a.type_id}"
                data-version="${o}">
                    <img src="${a.path?"storage/"+a.path:"dist/img/product/1.webp"}"
                        alt="${a.name}"
                        class="mr-2 img-thumbnail"
                        style="width:50px;height:50px;object-fit:contain;">
                    <span class="text-capitalize">${a.name}</span>
                </a>
            `).join("")}</li>`}function ie(e){if(e.length===0)return`
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
            </div>`).join("");return`<div class="row font-poppins">${o}${t}</div>`}function le(e){return e.length===0&&$("#type-menu-item-label").hide(),`<li class="nav-item font-poppins">${e.map(t=>`
                <a class="nav-link text-white type-filter d-flex align-items-center justify-content-start" 
                href="#" data-id="${t.id}">
                    <img src="${t.thumbnail?`/storage/${t.thumbnail}`:"dist/img/product/1.webp"}"
                        alt="${t.name}"
                        class="mr-2 img-thumbnail"
                        style="width:6.5rem;height:6.5rem;object-fit:contain;">
                    <span class="text-capitalize">${t.name}</span>
                </a>
            `).join("")}</li>`}function H(e,o=!0){var r,c,p;const t=e.category??[],a=(r=e.jenis)==null?void 0:r.name,n=s.firstLoad&&(((c=e.types)==null?void 0:c.length)??0)>0,i=(((p=e.category)==null?void 0:p.length)??0)>0;P({selectedJenis:s.selectedJenis,hasCategory:i,isRenderTypes:n}),t.length===0?$("#category-container").addClass("d-none"):$("#category-container").removeClass("d-none"),ne(a);const l=se(t,s.version),d=ie(t),u=le(e.types??[]);o?$("#category-menu-item, #category-menu-item-modal").html("tidak ada kategori"):($("#category-menu-item, #category-menu-item-modal").html(l),$("#type-menu-item, #type-menu-item-modal").html(u),$("#pdf-catalog").html(d)),!s.category&&t.length>0?(s.category=t[0].id,h(),setTimeout(()=>{f()},200)):s.category&&$(`.category-filter[data-id="${s.category}"]`).addClass("active"),s.type&&$(`.type-filter[data-id="${s.type}"]`).addClass("active")}function w(e,o,t,a=!1){if(o==null)return;e.forEach(r=>{r.images&&r.images.forEach(c=>{c.path&&t.add(c.path)}),r.path&&t.add(r.path)});const n=Array.from(t),i=$("#mockup-carousel-inner"),l=$("#mockup-carousel-indicators"),d=["https://www.youtube.com/embed/BiiUrYAbL9s?autoplay=1&mute=1&rel=0&controls=0&amp;loop=1&playlist=BiiUrYAbL9s"],u=[];for(let r=1;r<=6;r++)r!==2&&u.push(`/dist/img/wpc/${r}.webp?v=${Date.now()}`);if(i.empty(),l.empty(),o==4){$("#mockup-carousel").carousel({interval:!1}),$("#mockup .carousel-control-next").addClass("d-none"),$("#mockup .carousel-control-prev").addClass("d-none"),d.forEach((r,c)=>{i.append(`
            <div class="carousel-item ${c===0?"active":""}">
                <div class="d-flex justify-content-center align-items-center">
                    <div class="embed-responsive embed-responsive-16by9 rounded-lg" style="width:100%;">
                        <iframe
                            class="embed-responsive-item"
                            src="${r}"
                            title="YouTube video player"
                            frameborder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; web-share"
                            allowfullscreen
                        ></iframe>
                    </div>
                </div>
            </div>
        `)}),$("#mockup").removeClass("d-none");return}else if(o==3&&a){$("#mockup-carousel").carousel({interval:3e3}),$("#mockup .carousel-control-next").removeClass("d-none"),$("#mockup .carousel-control-prev").removeClass("d-none"),u.forEach((r,c)=>{i.append(`
            <div class="carousel-item ${c===0?"active":""}">
                <div class="d-flex justify-content-center align-items-center">
                    <img src="${r}" 
                        alt="mockup" 
                        class="img-fluid w-100 rounded-3 d-block mx-auto mockup-image"
                    >
                </div>
            </div>
        `),l.append(`
            <li data-bs-target="#mockup-carousel" data-bs-slide-to="${c}" ${c===0?'class="active"':""}></li>
        `)}),$("#mockup").removeClass("d-none");return}n.length>0?(n.length===1?($("#mockup .carousel-control-next").addClass("d-none"),$("#mockup .carousel-control-prev").addClass("d-none"),l.addClass("d-none")):($("#mockup .carousel-control-next").removeClass("d-none"),$("#mockup .carousel-control-prev").removeClass("d-none"),l.removeClass("d-none")),n.forEach((r,c)=>{i.append(`
                <div class="carousel-item ${c===0?"active":""}">
                    <img src="/storage/${r}" alt="mockup" 
                        class="img-fluid w-100 rounded-lg d-block mx-auto mockup-image"
                    >
                </div>
            `),l.append(`
                <li data-target="#mockup-carousel" data-slide-to="${c}" ${c===0?'class="active"':""}></li>
            `)}),$("#mockup").removeClass("d-none")):$("#mockup").addClass("d-none")}function D(e,o=!0){var i,l,d;const t=e.data.data[0],a=((l=(i=t==null?void 0:t.category)==null?void 0:i.type)==null?void 0:l.images)??[],n=((d=t==null?void 0:t.category)==null?void 0:d.images)??[];a.length>0?w(a,s.selectedJenis,s.uniquePaths,o):n.length>0?w(n,s.selectedJenis,s.uniquePaths,o):s.selectedJenis==3?w([],s.selectedJenis,s.uniquePaths,o):s.selectedJenis==4?w([],s.selectedJenis,s.uniquePaths,o):$("#mockup").addClass("d-none")}function de(e,o,t){$("#btn-download").removeClass("d-none");let a="";e.forEach(n=>{var T,j,L,J,S,_,M,V,A,K,q,E,R,B,I,N,O;const i=te(((j=(T=n==null?void 0:n.product_versions)==null?void 0:T[0])==null?void 0:j.images)??[]),l=i.length?i[0]:"https://via.placeholder.com/300x200?text=No+Image";let d=i,u=((J=(L=n.category)==null?void 0:L.type)==null?void 0:J.thumbnail)??"";u&&!u.startsWith("http")&&(u=`storage/${u.replace(/^\/?storage\//,"")}`,d.push(u));const r=JSON.stringify(d).replace(/"/g,"&quot;"),c=JSON.stringify(n.packages).replace(/"/g,"&quot;"),p=((S=n.category)==null?void 0:S.name)??"Tanpa Kategori",y=((_=n.product_versions.find(G=>G.version_id==t))==null?void 0:_.name)??"Tanpa Nama";((M=n.category)==null?void 0:M.display_style)==="square"||o===null?a+=`
                    <div class="col-md-2 col-6 mb-4">
                        <div class="h-100 product-card"
                    `:((V=n.category)==null?void 0:V.display_style)==="rectangle"?a+=`
                    <div class="col-md-4 col-6 mb-4">
                        <div class="h-100 product-card"
                    `:a+=`
                    <div class="col-md-2 col-6 mb-4">
                        <div class="h-100 product-card d-flex flex-column justify-content-center align-items-center"
                    `;const m=((A=n.category)==null?void 0:A.display_style)==="rectangle",v=JSON.stringify(n.specifications).replace(/"/g,"&quot;");a+=`
                    data-id="${n.id}"
                    data-code="${n.code}"
                    data-name="${y}"
                    data-category="${p}"
                    data-jenis="${((q=(K=n.category)==null?void 0:K.jenis)==null?void 0:q.name)??""}"
                    data-images="${r}"
                    data-image="${l}"
                    data-type="${((R=(E=n.category)==null?void 0:E.type)==null?void 0:R.name)??""}"
                    data-type-image="${((I=(B=n.category)==null?void 0:B.type)==null?void 0:I.image)??""}"
                    data-url="${n.url_video}"
                    data-paket="${c}"
                    data-specifications = "${v}"
                    >
                       <img 
                            src="${l}" 
                            class="card-img-top" 
                            alt="${n.name}" 
                            style="
                                border : 1px solid #2c2c2c;
                                min-height: 10rem;
                                height: auto; 
                                border-radius: 8px;
                                width: 100%; 
                                object-fit: cover; 
                                object-position: ${((O=(N=n.category)==null?void 0:N.jenis)==null?void 0:O.name)==="PVC Board"?"bottom center":"center center"};
                                aspect-ratio: ${m?"16/9":"1/1"};
                            "
                        >
                        <div class="card-body d-flex flex-column text-center">
                            <h4 class="card-title font-weight-bold text-uppercase mb-2">
                                ${y}
                            </h4>
                            <h6 class="card-text text-muted mb-1">${p}</h6>
                        </div>
                    </div>
                </div>`}),$("#product-list .row").append(a)}function f(){if(s.isLoading||s.lastPage)return Promise.resolve();s.isLoading=!0,ee();const e=$("#search-input").val(),o={page:s.currentPage,search:e,jenis:s.selectedJenis,category:s.category,type:s.type,version:s.version};return Q(o).done(re).always(()=>{s.isLoading=!1,ae(),s.currentRequest=null})}function re(e){const o=e.data.data??[],t=e.types??[],a=e.active_version_id;if(s.type&&($("#backButton").removeClass("d-none"),$("#homeButton").addClass("d-none")),s.version==null){const n=$("#version-select option:first").val();n&&(s.version=n)}s.selectedJenis&&s.firstLoad&&t.length>0?($("#search-form").addClass("d-none"),$("#downloadButton").addClass("d-none"),$("#version-filter").addClass("d-none"),t.length>0&&(oe(t,s.selectedJenis),s.lastPage=!0),H(e,!0),D(e,!0)):($("#search-form").removeClass("d-none"),$("#downloadButton").removeClass("d-none"),$("#version-filter").removeClass("d-none"),o.length>0?(de(o,s.selectedJenis,a),s.currentPage++,s.currentPage>e.data.last_page&&(s.lastPage=!0)):(s.currentPage===1&&($("#mockup").addClass("d-none"),$("#product-list .row").append(`<div class="col-12"><img src="dist/img/no-data.png" alt="no-data"
                     class="img-fluid mx-auto d-block" style="max-width:100%;height:auto;margin:100px 0;"></div>`)),s.lastPage=!0),H(e,!1),D(e,!1))}let g=!1;function ce(e){$(document).off("click",".category-filter"),$(document).on("click",".category-filter",async function(o){if(o.preventDefault(),g)return;g=!0;const t=$(this).data("id"),a=$(this).data("type"),n=$(this).data("version");try{C({selectedJenis:e,category:t,type:a,version:n}),$("#filterModal").modal("hide"),h(),await f(!1)}catch(i){console.error("Gagal memuat data:",i)}finally{g=!1}}),$(document).off("click",".type-filter"),$(document).on("click",".type-filter",async function(o){if(o.preventDefault(),g)return;g=!0;const t=$(this).data("id");try{C({selectedJenis:e,type:t}),$("#filterModal").modal("hide"),h(),await f(!1)}catch(a){console.error("Gagal memuat data:",a)}finally{g=!1}})}function ue(){$("#version-select").on("change",function(){const e=$(this).val()||null;s.version=e,h(),f()})}function k(e,o="#modalVariants"){$(o).empty(),$("#modalPaket").empty(),$("#modalKepadatan").empty(),Array.isArray(e)&&e.length>0?e.forEach(t=>{const a=t.specification_values||[],n=t.name.toLowerCase();if(n==="warna")$("#paket").text("Warna"),a.length>0?a.forEach(i=>{t.pivot&&i.id===t.pivot.specification_value_id&&$("#modalPaket").append(`
                                <span class="badge badge-outline-primary px-2 py-1 kepadatan" data-value="${i.name}">
                                    ${i.name}
                                </span>
                            `)}):$("#modalPaket").append('<span class="text-muted">Tidak ada data</span>');else if(n==="density")a.length>0?a.forEach(i=>{t.pivot&&i.id===t.pivot.specification_value_id&&(a.length>1?$("#modalKepadatan").append(`
                                    <span class="badge badge-outline-primary px-2 py-1 kepadatan" data-value="${i.name}">
                                        ${i.name}
                                    </span>
                                `):$("#modalKepadatan").append(i.name))}):$("#modalKepadatan").append('<span class="text-muted">Tidak ada data</span>');else{const i=a.find(r=>t.pivot&&r.id===t.pivot.specification_value_id),l=i?i.name:"-";let d=i?i.unit:"";d?d=" "+d:["panjang","tinggi","lebar"].includes(n)?d=" cm":n==="ketebalan"&&(d=" mm");const u=`
                    <div class="row mb-1 variant-row">
                        <div class="col-4 col-sm-3 font-weight-bold">${t.name}</div>
                        <div class="col-auto">:</div>
                        <div class="col">${l}${d}</div>
                    </div>
                `;$(o).append(u),$("#modalContact").data(n,l+d)}}):($(o).append('<div class="text-muted">Tidak ada varian</div>'),$(".paket").hide())}function me(e,o=[],t=""){$("#carousel-product-image").empty(),$("#thumbnailGallery").empty();let a=e||[];(t==null?void 0:t.toLowerCase())==="uv board"&&o.length&&(a=[...e,...o]);const n=new IntersectionObserver(l=>{l.forEach(d=>{if(d.isIntersecting){const u=$(d.target);u.attr("src",u.data("src")),n.unobserve(d.target)}})},{rootMargin:"100px"});a.forEach((l,d)=>{const u=d===0?"active":"";$("#carousel-product-image").append(`
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
                            data-index="${d}"
                        >
                    </div>
                </div>
            `)}),$(".lazy-modal-img").each(function(){n.observe(this)}),a.length<=1?$("#carouselProduct .carousel-control-next, #carouselProduct .carousel-control-prev").addClass("d-none"):$("#carouselProduct .carousel-control-next, #carouselProduct .carousel-control-prev").removeClass("d-none"),$("#carouselProduct").carousel({interval:3e3,pause:!1});let i;$("#thumbnailGallery").off("click").on("click",".thumbnail-image",function(){const l=$(this).data("index");$("#carouselProduct").carousel(l),$(".thumbnail-image").removeClass("active-thumbnail"),$(this).addClass("active-thumbnail"),setTimeout(()=>$(this).removeClass("active-thumbnail"),500),$("#carouselProduct").carousel("pause"),clearTimeout(i),i=setTimeout(()=>{$("#carouselProduct").carousel("cycle")},7e3)})}function pe(){$(document).off("click",".product-card").on("click",".product-card",function(){const e=$(this).data("id"),o=$(this).data("code"),t=$(this).data("name"),a=$(this).data("category"),n=$(this).data("type"),i=$(this).data("jenis"),l=$(this).data("url"),d=$(this).attr("data-images");let u=$(this).data("type-image");const r=JSON.parse($(this).attr("data-specifications")||"[]"),c=JSON.parse($(this).attr("data-paket")||"[]");let p=[],y=[];if(i!=="card-types"&&Z(e),d)try{p=JSON.parse(d.replace(/&quot;/g,'"'))}catch(m){p=[],console.error(m)}if(Array.isArray(c)&&(y=c.sort((m,v)=>m.order-v.order).map(m=>`/storage/${m.image}`)),$("#notes").show(),$("#modalPaket").empty(),i==="card-types"){h(),C({selectedJenis,type:n}),W(!1),loadMoreData();return}i.toLowerCase()==="uv board"&&(k(r),$("#modalVideo, .lebar").hide(),$("#modalCategory").text(a),c.length>0?c.sort((m,v)=>m.order-v.order).map(m=>{$("#modalPaket").append(`
                        <span class="badge badge-outline-primary px-2 py-1 kepadatan" data-value="${m.name}">${m.name}</span>
                    `)}):($("#modalPaket").append('<span class="text-muted">Tidak ada paket</span>'),$("#notes").hide())),i.toLowerCase()==="wallboard"&&(k(r),$("#modalCategory").text(a),$("#ketebalan, .density, #notes, .paket,  #modalVideo, .lebar").hide()),i==="PVC Board"&&(k(r),$("#modalCategory").text(i),$("#modalVideo, .lebar, .paket").hide()),i==="Wallpanel"&&(k(r),$("#modalContact").data("type",n),$("#modalCategory").text(a+" / "+n),$("#ketebalan, #kepadatan, .paket, #modalVideo, #notes, .density").hide(),$("#modalGrafis").attr("src",`/storage/${u}`),$(".grafis").removeClass("d-none")),i.toLowerCase()==="aksesoris"&&($("#tinggi, #ketebalan, #kepadatan, .lebar, .density").hide(),$("#modalCategory").text(a),k(r),$("#modalVideoPlayer").empty(),$("#modalVideo, .density").hide(),l&&($("#modalVideoPlayer").append(`
                    <iframe class="embed-responsive-item"
                    src="${l}"
                    title="YouTube video player" frameborder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; web-share;"
                    referrerpolicy="strict-origin-when-cross-origin"
                    allowfullscreen></iframe>
                `),$("#modalVideo").show())),me(p,y,i),$("#modalName").text(t),$("#productModalLabel").text(t),$("#productModal").modal("show"),$("#modalContact").data({jenis:i,category:a,code:o,type:n}),$(".kepadatan").removeClass("active"),$("#modalContact").data({kepadatan:null,paket:null}),$(".modalContact").prop("disabled",$(".kepadatan").length>0)}),$(document).on("click",".kepadatan",function(){$(".modalContact").prop("disabled",!1);const e=$(this).data("value");$(this).closest("#productModal").find(".kepadatan").removeClass("active"),$(this).addClass("active"),$("#notes").hide(),$("#modalContact").data("kepadatan",e)})}function $e(){let e;$("#search-input").on("input",function(){clearTimeout(e),e=setTimeout(()=>{h(),f()},500)})}let U,x=!1;function fe(){$(window).on("scroll",function(){clearTimeout(U),U=setTimeout(async()=>{if(x||X())return;const e=$(window).scrollTop(),o=$(window).height(),t=$(document).height();if(e+o>=t-150){x=!0;try{W(!1),await f()}finally{x=!1}}},200)})}$(document).ready(function(){const e=new URLSearchParams(window.location.search),o=e.get("jenis"),t=e.get("version"),a=e.get("category");C({selectedJenis:o,category:a,version:t}),f(),P({selectedJenis:o,hasCategory:a,isRenderTypes:!1}),$(window).on("resize",()=>P({selectedJenis:o,hasCategory:a,isRenderTypes:!1})),ce(o),z(),F(),Y(),ue(),$e(),fe(),pe()});
