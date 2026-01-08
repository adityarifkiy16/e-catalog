let i={selectedJenis:null,category:null,type:null,currentPage:1,isLoading:!1,lastPage:!1,firstLoad:!0,currentRequest:null,uniquePaths:new Set,version:null};function Q(){let e=[];$(document).on("change","#all-cat",function(){$(this).prop("checked")?($(".category-filter-download").prop("checked",!0),e=[""]):($(".category-filter-download").prop("checked",!1),e=[])}),$(document).on("change",".category-filter-download",function(){$(this).prop("checked")||$("#all-cat").prop("checked",!1),e=$(".category-filter-download:checked").map(function(){return $(this).val()}).get().filter(t=>t!=="");const o=$(".category-filter-download").length-1;e.length===o&&($("#all-cat").prop("checked",!0),e=[""])}),$(document).off("click","#btn-download").on("click","#btn-download",function(o){o.preventDefault();const t=i.type,a=i.selectedJenis,n=i.version;if(!n){alert("Silakan pilih versi terlebih dahulu.");return}let s=new URLSearchParams;e.length>0&&e[0]!==""&&e.forEach(c=>s.append("category[]",c)),a&&s.append("jenis_id",a),n&&s.append("version_id",n),t&&s.append("type_id",t);const l=`/catalog/pdf?${s.toString()}`;window.location.href=l})}function Z(){$(document).off("click",".modalContact").on("click",".modalContact",function(e){e.preventDefault();const o="62816659688",t=$(this).data("jenis");let a="";t.toLowerCase()=="wallpanel"?a=`Halo Admin,
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

Apakah produk ini masih tersedia? Terima kasih.`,window.open(`https://wa.me/${o}?text=${encodeURIComponent(a)}`,"_blank")})}function ee(){$(window).scroll(function(){$(this).scrollTop()>100?$("#btn-scroll-top").fadeIn():$("#btn-scroll-top").fadeOut()}),$("#btn-scroll-top").click(function(){return $("html, body").animate({scrollTop:0},500),!1})}function z(e){i.firstLoad=e}function ae(){return i.isLoading}function P(e){i.selectedJenis=e.selectedJenis,i.category=e.category??null,i.type=e.type??null,i.version=e.version??null}function v(){i.currentPage=1,i.isLoading=!1,i.lastPage=!1,i.uniquePaths.clear(),$("#product-list .row").html("")}function te(e){return i.currentRequest&&i.currentRequest.readyState!==4&&i.currentRequest.abort(),i.currentRequest=$.ajax({url:"/catalog/product",type:"GET",data:e})}function oe(e){$.ajax({url:`/products/${e}/viewed`,method:"POST",headers:{"X-CSRF-TOKEN":$('meta[name="csrf-token"]').attr("content")},success:o=>console.log("View recorded:",o),error:o=>console.error(o)})}function ne(){$("#loading").removeClass("d-none")}function ie(){$("#loading").addClass("d-none")}function se(e=[]){if(!Array.isArray(e))return[];const o={thumbnail:3,motif:2,product:1};return e.slice().sort((t,a)=>(o[a.type]||0)-(o[t.type]||0)).map(t=>"/storage/"+t.path)}function le(e,o){$("#btn-download").addClass("d-none");let t="";e.forEach(a=>{const n=a.thumbnail?`/storage/${a.thumbnail}`:"https://via.placeholder.com/300x200?text=No+Image",s=o==3?"wallpanel":"tanpa kategori";t+=`
                    <div class="col-md-2 col-6 mb-4">
                        <div class="h-100 type-card d-flex flex-column justify-content-center align-items-center type-filter"
                    `,t+=`
                    data-id="${a.id}"
                    data-jenis="card-types"
                    data-category="${s}"
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
                            <h6 class="card-text text-muted mb-1">${s}</h6>
                        </div>
                    </div>
                </div>`}),$("#product-list .row").append(t)}function re(e){const o={"PVC Board":()=>{$("#category-container").addClass("d-none"),$(".category-modal-container").text("Tidak ada kategori")},Wallboard:()=>w("Motif"),"UV Board":()=>w("Motif"),Wallpanel:()=>w("Motif"),Aksesoris:()=>w("Ukuran"),default:()=>w("Kategori")};(o[e]||o.default)()}function w(e){$("#category-menu-item-label, #category-modal-item-label").html(e)}function _({selectedJenis:e=null,hasCategory:o=!1,isRenderTypes:t=!1}){const a=$("#filter-container"),n=$("#category-container"),s=$("#catalog-col"),l=$(window).width()<768;if(a.removeClass("d-none"),n.removeClass("d-none"),s.removeClass("col-md-12 col-md-9"),t){a.addClass("d-none"),n.addClass("d-none"),s.addClass("col-md-12");return}if(e==1){a.addClass("d-none"),n.addClass("d-none"),s.addClass("col-md-12");return}if(!o){a.addClass("d-none"),n.addClass("d-none"),s.addClass("col-md-12");return}l?(a.addClass("d-none"),n.removeClass("d-none")):(a.removeClass("d-none"),n.removeClass("d-none")),s.addClass("col-md-9")}function ce(e,o=null){return e.length===0?`
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
                        alt=""
                        aria-hidden="true"
                        class="mr-2 img-thumbnail"
                        style="width:50px;height:50px;object-fit:contain;">
                    <span class="text-capitalize">${a.name}</span>
                </a>
            `).join("")}</li>`}function de(e){if(e.length===0)return`
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
            </div>`).join("");return`<div class="row font-poppins">${o}${t}</div>`}function ue(e){return e.length===0&&$("#type-menu-item-label").hide(),`<li class="nav-item font-poppins">${e.map(t=>`
                <a class="nav-link text-white type-filter d-flex align-items-center justify-content-start" 
                href="#" data-id="${t.id}">
                    <img src="${t.thumbnail?`/storage/${t.thumbnail}`:"dist/img/product/1.webp"}"
                        alt="${t.name}"
                        class="mr-2 img-thumbnail"
                        style="width:6.5rem;height:6.5rem;object-fit:contain;">
                    <span class="text-capitalize">${t.name}</span>
                </a>
            `).join("")}</li>`}function G(e,o=!0){var r,d;const t=e.category??[],a=(r=e.jenis)==null?void 0:r.name,n=o,s=(((d=e.category)==null?void 0:d.length)??0)>0;_({selectedJenis:i.selectedJenis,hasCategory:s,isRenderTypes:n}),t.length===0?$("#category-container").addClass("d-none"):$("#category-container").removeClass("d-none"),re(a);const l=ce(t,i.version),c=de(t),u=ue(e.types??[]);o?$("#category-menu-item, #category-menu-item-modal").html("tidak ada kategori"):($("#category-menu-item, #category-menu-item-modal").html(l),$("#type-menu-item, #type-menu-item-modal").html(u),$("#pdf-catalog").html(c)),i.category&&$(`.category-filter[data-id="${i.category}"]`).addClass("active"),i.type&&$(`.type-filter[data-id="${i.type}"]`).addClass("active")}function C(e,o,t,a=!1){if(o==null)return;const n=[],s=$("#mockup-carousel-inner"),l=$("#mockup-carousel-indicators"),c=["https://www.youtube.com/embed/BiiUrYAbL9s?autoplay=1&mute=1&rel=0&controls=0&amp;loop=1&playlist=BiiUrYAbL9s"];e.forEach(r=>{r.images&&r.images.forEach(d=>{d.path&&t.add(d.path)}),r.path&&t.add(r.path)});const u=Array.from(t);s.empty(),l.empty();for(let r=1;r<=6;r++)r!==2&&n.push(`/dist/img/wpc/${r}.webp?v=${Date.now()}`);if(o==4){pe(c),$("#mockup").removeClass("d-none");return}else if(o==3)if(a){$("#mockup-carousel").carousel({interval:3e3}),$("#mockup .carousel-control-next").removeClass("d-none"),$("#mockup .carousel-control-prev").removeClass("d-none"),n.forEach((r,d)=>{s.append(`
                    <div class="carousel-item ${d===0?"active":""}">
                        <div class="d-flex justify-content-center align-items-center">
                            <img src="${r}" 
                                alt="mockup" 
                                class="img-fluid w-100 rounded-3 d-block mx-auto mockup-image"
                            >
                        </div>
                    </div>
                `),l.append(`
                    <li data-bs-target="#mockup-carousel" data-bs-slide-to="${d}" ${d===0?'class="active"':""}></li>
                `)}),$("#mockup").removeClass("d-none");return}else u.length===1?($("#mockup .carousel-control-next").addClass("d-none"),$("#mockup .carousel-control-prev").addClass("d-none"),l.addClass("d-none")):($("#mockup .carousel-control-next").removeClass("d-none"),$("#mockup .carousel-control-prev").removeClass("d-none"),l.removeClass("d-none")),u.forEach((r,d)=>{let g=d===0?"eager":"lazy",h=d===0?"high":"low";s.append(`
                    <div class="carousel-item ${d===0?"active":""}">
                        <img src="/storage/${r}" alt="mockup" loading="${g}" fetchpriority="${h}" decode="async" 
                            class="img-fluid w-100 rounded-lg d-block mx-auto mockup-image"
                        >
                    </div>
                `),l.append(`
                    <li data-target="#mockup-carousel" data-slide-to="${d}" ${d===0?'class="active"':""}></li>
                `)}),$("#mockup").removeClass("d-none");else u.length>0?(u.length===1?($("#mockup .carousel-control-next").addClass("d-none"),$("#mockup .carousel-control-prev").addClass("d-none"),l.addClass("d-none")):($("#mockup .carousel-control-next").removeClass("d-none"),$("#mockup .carousel-control-prev").removeClass("d-none"),l.removeClass("d-none")),u.forEach((r,d)=>{let g=d===0?"eager":"lazy",h=d===0?"high":"low";s.append(`
                <div class="carousel-item ${d===0?"active":""}">
                    <img src="/storage/${r}" alt="mockup" loading="${g}" fetchpriority="${h}" decode="async" 
                        class="img-fluid w-100 rounded-lg d-block mx-auto mockup-image"
                    >
                </div>
            `),l.append(`
                <li data-target="#mockup-carousel" data-slide-to="${d}" ${d===0?'class="active"':""}></li>
            `)}),$("#mockup").removeClass("d-none")):$("#mockup").addClass("d-none")}function pe(e){$("#mockup-carousel").carousel({interval:!1}),$("#mockup .carousel-control-next").addClass("d-none"),$("#mockup .carousel-control-prev").addClass("d-none"),e.forEach((o,t)=>{$("#mockup-carousel-inner").append(`
                <div class="carousel-item ${t===0?"active":""}">
                    <div class="d-flex justify-content-center align-items-center">
                        <div class="embed-responsive embed-responsive-16by9 rounded-lg" style="width:100%;">
                            <iframe
                                class="embed-responsive-item"
                                src="${o}"
                                title="YouTube video player"
                                frameborder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; web-share"
                                allowfullscreen
                            ></iframe>
                        </div>
                    </div>
                </div>
            `)})}function O(e,o=!0){var l,c,u,r;const t=(l=e.products)==null?void 0:l.data[0],a=((u=(c=t==null?void 0:t.category)==null?void 0:c.type)==null?void 0:u.images)??[],n=((r=t==null?void 0:t.category)==null?void 0:r.images)??[],s=i.selectedJenis==3||i.selectedJenis==4;if(o){if(a.length>0){C(a,i.selectedJenis,i.uniquePaths,o);return}if(n.length>0){C(n,i.selectedJenis,i.uniquePaths,o);return}if(s){C([],i.selectedJenis,i.uniquePaths,o);return}}else{if(a.length>0){C(a,i.selectedJenis,i.uniquePaths,o);return}if(n.length>0){C(n,i.selectedJenis,i.uniquePaths,o);return}}}function me(e,o,t){$("#btn-download").removeClass("d-none");let a="";e.forEach(n=>{var S,L,N,D,j,R,A,I,M,V,H,J,B,U,K,q,F;const s=se(((L=(S=n==null?void 0:n.product_versions)==null?void 0:S[0])==null?void 0:L.images)??[]),l=s.length?s[0]:"https://via.placeholder.com/300x200?text=No+Image";let c=s,u=((D=(N=n.category)==null?void 0:N.type)==null?void 0:D.thumbnail)??"";u&&!u.startsWith("http")&&(u=`storage/${u.replace(/^\/?storage\//,"")}`,c.push(u));const r=JSON.stringify(c).replace(/"/g,"&quot;"),d=JSON.stringify(n.packages).replace(/"/g,"&quot;"),g=((j=n.category)==null?void 0:j.name)??"Tanpa Kategori",h=((R=n.product_versions.find(X=>X.version_id==t))==null?void 0:R.name)??"Tanpa Nama";((A=n.category)==null?void 0:A.display_style)==="square"||o===null?a+=`
                    <div class="col-md-2 col-6 mb-4">
                        <div class="h-100 product-card"
                    `:((I=n.category)==null?void 0:I.display_style)==="rectangle"?a+=`
                    <div class="col-md-4 col-6 mb-4">
                        <div class="h-100 product-card"
                    `:a+=`
                    <div class="col-md-2 col-6 mb-4">
                        <div class="h-100 product-card d-flex flex-column justify-content-center align-items-center"
                    `;const m=((M=n.category)==null?void 0:M.display_style)==="rectangle",b=JSON.stringify(n.specifications).replace(/"/g,"&quot;");a+=`
                    data-id="${n.id}"
                    data-code="${n.code}"
                    data-name="${h}"
                    data-category="${g}"
                    data-jenis="${((H=(V=n.category)==null?void 0:V.jenis)==null?void 0:H.name)??""}"
                    data-images="${r}"
                    data-image="${l}"
                    data-type="${((B=(J=n.category)==null?void 0:J.type)==null?void 0:B.name)??""}"
                    data-type-image="${((K=(U=n.category)==null?void 0:U.type)==null?void 0:K.image)??""}"
                    data-url="${n.url_video}"
                    data-paket="${d}"
                    data-specifications = "${b}"
                    >
                       <img 
                            src="${l}" 
                            class="card-img-top" 
                            alt="${n.name}" 
                            loading="lazy"
                            fetchpriority="low"
                            decoding="async"
                            style="
                                border : 1px solid #2c2c2c;
                                min-height: 10rem;
                                height: auto; 
                                border-radius: 8px;
                                width: 100%; 
                                object-fit: cover; 
                                object-position: ${((F=(q=n.category)==null?void 0:q.jenis)==null?void 0:F.name)==="PVC Board"?"bottom center":"center center"};
                                aspect-ratio: ${m?"16/9":"1/1"};
                            "
                        >
                        <div class="card-body d-flex flex-column text-center">
                            <h4 class="card-title font-weight-bold text-uppercase mb-2">
                                ${h}
                            </h4>
                            <h5 class="card-text text-white mb-1 font-weight-light">${g}</h5>
                        </div>
                    </div>
                </div>`}),$("#product-list .row").append(a)}function T(e={}){const o=new URL(window.location.href),t=o.searchParams;Object.entries(e).forEach(([a,n])=>{n==null||n===""?t.delete(a):t.set(a,n)}),window.history.replaceState({},"",o.toString())}const p={SEARCH_INPUT:"#search-input",BACK_BUTTON:"#backButton",HOME_BUTTON:"#homeButton",SEARCH_FORM:"#search-form",DOWNLOAD_BUTTON:"#downloadButton",VERSION_FILTER:"#version-filter",VERSION_SELECT:"#version-select",MOCKUP:"#mockup",PRODUCT_LIST:"#product-list",NO_DATA_IMAGE:"dist/img/no-data.png"},f={HIDDEN:"d-none",ROW:".row",COL_12:"col-12"};async function y(){if(!fe()){i.isLoading=!0,ne();try{const e=ge(),o=await te(e);await $e(o)}finally{i.isLoading=!1,ie(),i.currentRequest=null}}}function fe(){return i.isLoading||i.lastPage}function ge(){return{page:i.currentPage,search:$(p.SEARCH_INPUT).val(),jenis:i.selectedJenis,category:i.category,type:i.type,version:i.version}}async function $e(e){const{products:o=[],types:t=[],category:a=[]}=e,n=o.data||[],s=e.active_version_id;he(),ye(),!await ve(a)&&(i.firstLoad?await ke(t,n,s,e):await we(n,s,e),i.firstLoad=!1)}function he(){i.type&&($(p.BACK_BUTTON).removeClass(f.HIDDEN),$(p.HOME_BUTTON).addClass(f.HIDDEN))}function ye(){if(i.version===null){const e=$(`${p.VERSION_SELECT} option:first`).val();e&&(i.version=e)}}async function ve(e){return!i.category&&Array.isArray(e)&&e.length>0?(i.category=e[0].id,v(),T({category:i.category}),await y(),!0):!1}async function ke(e,o,t,a){e.length>0&&!i.type?be(e,a):await Y(o,t,a,!0)}function be(e,o){Ce(),le(e,i.selectedJenis),i.lastPage=!0,G(o,!0),O(o,!0)}async function Y(e,o,t,a){xe(),e.length>0?(await me(e,i.selectedJenis,o),i.currentPage++,i.currentPage>e.last_page&&(i.lastPage=!0)):(i.currentPage===1&&Te(),i.lastPage=!0),a&&i.selectedJenis==4&&O(t,!0),G(t,!1),a||O(t,!1)}async function we(e,o,t){await Y(e,o,t,!1)}function Ce(){$(p.SEARCH_FORM).addClass(f.HIDDEN),$(p.DOWNLOAD_BUTTON).addClass(f.HIDDEN),$(p.VERSION_FILTER).addClass(f.HIDDEN)}function xe(){$(p.SEARCH_FORM).removeClass(f.HIDDEN),$(p.DOWNLOAD_BUTTON).removeClass(f.HIDDEN),$(p.VERSION_FILTER).removeClass(f.HIDDEN)}function Te(){$(p.MOCKUP).addClass(f.HIDDEN);const e=`
    <div class="${f.COL_12}">
      <img src="${p.NO_DATA_IMAGE}" alt="no-data" 
           class="img-fluid mx-auto d-block" 
           style="max-width:100%;height:auto;margin:100px 0;">
    </div>
  `;$(`${p.PRODUCT_LIST} ${f.ROW}`).append(e)}let k=!1;function Pe(e){$(document).off("click",".category-filter"),$(document).on("click",".category-filter",async function(o){if(o.preventDefault(),k)return;k=!0;const t=$(this).data("id"),a=$(this).data("type"),n=$(this).data("version");try{T({category:t,type:a,version:n,jenis:e}),P({selectedJenis:e,category:t,type:a,version:n}),$("#filterModal").modal("hide"),v(),await y(!1)}catch(s){console.error("Gagal memuat data:",s)}finally{k=!1}}),$(document).off("click",".type-filter"),$(document).on("click",".type-filter",async function(o){if(o.preventDefault(),k)return;k=!0;const t=$(this).data("id");try{T({type:t}),P({selectedJenis:e,type:t}),$("#filterModal").modal("hide"),v(),await y(!1)}catch(a){console.error("Gagal memuat data:",a)}finally{k=!1}})}function Ee(){$("#version-select").on("change",function(){const e=$(this).val()||null;i.version=e,T({version:e}),v(),y()})}function x(e,o="#modalVariants"){$(o).empty(),$("#modalPaket").empty(),$("#modalKepadatan").empty(),Array.isArray(e)&&e.length>0?e.forEach(t=>{const a=t.specification_values||[],n=t.name.toLowerCase();if(n==="warna")$("#paket").text("Warna"),a.length>0?a.forEach(s=>{t.pivot&&s.id===t.pivot.specification_value_id&&$("#modalPaket").append(`
                                <span class="badge badge-outline-primary px-2 py-1 kepadatan" data-value="${s.name}">
                                    ${s.name}
                                </span>
                            `)}):$("#modalPaket").append('<span class="text-muted">Tidak ada data</span>');else if(n==="density")a.length>0?a.forEach(s=>{t.pivot&&s.id===t.pivot.specification_value_id&&(a.length>1?$("#modalKepadatan").append(`
                                    <span class="badge badge-outline-primary px-2 py-1 kepadatan" data-value="${s.name}">
                                        ${s.name}
                                    </span>
                                `):$("#modalKepadatan").append(s.name))}):$("#modalKepadatan").append('<span class="text-muted">Tidak ada data</span>');else{const s=a.find(r=>t.pivot&&r.id===t.pivot.specification_value_id),l=s?s.name:"-";let c=s?s.unit:"";c?c=" "+c:["panjang","tinggi","lebar"].includes(n)?c=" cm":n==="ketebalan"&&(c=" mm");const u=`
                    <div class="row mb-1 variant-row">
                        <div class="col-4 col-sm-3 font-weight-bold">${t.name}</div>
                        <div class="col-auto">:</div>
                        <div class="col">${l}${c}</div>
                    </div>
                `;$(o).append(u),$("#modalContact").data(n,l+c)}}):($(o).append('<div class="text-muted">Tidak ada varian</div>'),$(".paket").hide())}function _e(e,o=[],t=""){$("#carousel-product-image").empty(),$("#thumbnailGallery").empty();let a=e||[];(t==null?void 0:t.toLowerCase())==="uv board"&&o.length&&(a=[...e,...o]);const n=new IntersectionObserver(l=>{l.forEach(c=>{if(c.isIntersecting){const u=$(c.target);u.attr("src",u.data("src")),n.unobserve(c.target)}})},{rootMargin:"100px"});a.forEach((l,c)=>{const u=c===0?"active":"";$("#carousel-product-image").append(`
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
                            data-index="${c}"
                        >
                    </div>
                </div>
            `)}),$(".lazy-modal-img").each(function(){n.observe(this)}),a.length<=1?$("#carouselProduct .carousel-control-next, #carouselProduct .carousel-control-prev").addClass("d-none"):$("#carouselProduct .carousel-control-next, #carouselProduct .carousel-control-prev").removeClass("d-none"),$("#carouselProduct").carousel({interval:3e3,pause:!1});let s;$("#thumbnailGallery").off("click").on("click",".thumbnail-image",function(){const l=$(this).data("index");$("#carouselProduct").carousel(l),$(".thumbnail-image").removeClass("active-thumbnail"),$(this).addClass("active-thumbnail"),setTimeout(()=>$(this).removeClass("active-thumbnail"),500),$("#carouselProduct").carousel("pause"),clearTimeout(s),s=setTimeout(()=>{$("#carouselProduct").carousel("cycle")},7e3)})}function Oe(){$(document).off("click",".product-card").on("click",".product-card",function(){const e=$(this).data("id"),o=$(this).data("code"),t=$(this).data("name"),a=$(this).data("category"),n=$(this).data("type"),s=$(this).data("jenis"),l=$(this).data("url"),c=$(this).attr("data-images");let u=$(this).data("type-image");const r=JSON.parse($(this).attr("data-specifications")||"[]"),d=JSON.parse($(this).attr("data-paket")||"[]");let g=[],h=[];if(s!=="card-types"&&oe(e),c)try{g=JSON.parse(c.replace(/&quot;/g,'"'))}catch(m){g=[],console.error(m)}if(Array.isArray(d)&&(h=d.sort((m,b)=>m.order-b.order).map(m=>`/storage/${m.image}`)),$("#notes").show(),$("#modalPaket").empty(),s==="card-types"){v(),P({selectedJenis:i.selectedJenis,type:n}),z(!1),y();return}s.toLowerCase()==="uv board"&&(x(r),$("#modalVideo, .lebar").hide(),$("#modalCategory").text(a),d.length>0?d.sort((m,b)=>m.order-b.order).map(m=>{$("#modalPaket").append(`
                        <span class="badge badge-outline-primary px-2 py-1 kepadatan" data-value="${m.name}">${m.name}</span>
                    `)}):($("#modalPaket").append('<span class="text-muted">Tidak ada paket</span>'),$("#notes").hide())),s.toLowerCase()==="wallboard"&&(x(r),$("#modalCategory").text(a),$("#ketebalan, .density, #notes, .paket,  #modalVideo, .lebar").hide()),s==="PVC Board"&&(x(r),$("#modalCategory").text(s),$("#modalVideo, .lebar, .paket").hide()),s==="Wallpanel"&&(x(r),$("#modalContact").data("type",n),$("#modalCategory").text(a+" / "+n),$("#ketebalan, #kepadatan, .paket, #modalVideo, #notes, .density").hide(),$("#modalGrafis").attr("src",`/storage/${u}`),$(".grafis").removeClass("d-none")),s.toLowerCase()==="aksesoris"&&($("#tinggi, #ketebalan, #kepadatan, .lebar, .density").hide(),$("#modalCategory").text(a),x(r),$("#modalVideoPlayer").empty(),$("#modalVideo, .density").hide(),l&&($("#modalVideoPlayer").append(`
                    <iframe class="embed-responsive-item"
                    src="${l}"
                    title="YouTube video player" frameborder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; web-share;"
                    referrerpolicy="strict-origin-when-cross-origin"
                    allowfullscreen></iframe>
                `),$("#modalVideo").show())),_e(g,h,s),$("#modalName").text(t),$("#productModalLabel").text(t),$("#productModal").modal("show"),$("#modalContact").data({jenis:s,category:a,code:o,type:n}),$(".kepadatan").removeClass("active"),$("#modalContact").data({kepadatan:null,paket:null}),$(".modalContact").prop("disabled",$(".kepadatan").length>0)}),$(document).on("click",".kepadatan",function(){$(".modalContact").prop("disabled",!1);const e=$(this).data("value");$(this).closest("#productModal").find(".kepadatan").removeClass("active"),$(this).addClass("active"),$("#notes").hide(),$("#modalContact").data("kepadatan",e)})}function Se(){let e;$("#search-input").on("input",function(){clearTimeout(e),e=setTimeout(()=>{v(),y()},500)})}let W,E=!1;function Le(){$(window).on("scroll",function(){clearTimeout(W),W=setTimeout(async()=>{if(E||ae())return;const e=$(window).scrollTop(),o=$(window).height(),t=$(document).height();if(e+o>=t-150){E=!0;try{z(!1),await y()}finally{E=!1}}},200)})}function Ne(){$("#backButton").on("click",function(){T({type:null}),i.type=null,v(),window.location.href=window.location.href})}$(document).ready(function(){const e=new URLSearchParams(window.location.search),o=e.get("jenis"),t=e.get("version"),a=e.get("category"),n=e.get("type");P({selectedJenis:o,category:a,version:t,type:n}),y(),_({selectedJenis:o,hasCategory:a,isRenderTypes:!1}),$(window).on("resize",()=>_({selectedJenis:o,hasCategory:a,isRenderTypes:!1})),Pe(o),Q(),Z(),ee(),Ee(),Ne(),Se(),Le(),Oe()});
