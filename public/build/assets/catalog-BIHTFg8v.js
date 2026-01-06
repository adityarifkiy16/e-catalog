let n={selectedJenis:null,category:null,type:null,currentPage:1,isLoading:!1,lastPage:!1,firstLoad:!0,currentRequest:null,uniquePaths:new Set,version:null,isInitialLoad:!0};function Q(){let e=[];$(document).on("change","#all-cat",function(){$(this).prop("checked")?($(".category-filter-download").prop("checked",!0),e=[""]):($(".category-filter-download").prop("checked",!1),e=[])}),$(document).on("change",".category-filter-download",function(){$(this).prop("checked")||$("#all-cat").prop("checked",!1),e=$(".category-filter-download:checked").map(function(){return $(this).val()}).get().filter(t=>t!=="");const o=$(".category-filter-download").length-1;e.length===o&&($("#all-cat").prop("checked",!0),e=[""])}),$(document).off("click","#btn-download").on("click","#btn-download",function(o){o.preventDefault();const t=n.type,a=n.selectedJenis,i=n.version;if(!i){alert("Silakan pilih versi terlebih dahulu.");return}let s=new URLSearchParams;e.length>0&&e[0]!==""&&e.forEach(d=>s.append("category[]",d)),a&&s.append("jenis_id",a),i&&s.append("version_id",i),t&&s.append("type_id",t);const l=`/catalog/pdf?${s.toString()}`;window.location.href=l})}function Z(){$(document).off("click",".modalContact").on("click",".modalContact",function(e){e.preventDefault();const o="62816659688",t=$(this).data("jenis");let a="";t.toLowerCase()=="wallpanel"?a=`Halo Admin,
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

Apakah produk ini masih tersedia? Terima kasih.`,window.open(`https://wa.me/${o}?text=${encodeURIComponent(a)}`,"_blank")})}function ee(){$(window).scroll(function(){$(this).scrollTop()>100?$("#btn-scroll-top").fadeIn():$("#btn-scroll-top").fadeOut()}),$("#btn-scroll-top").click(function(){return $("html, body").animate({scrollTop:0},500),!1})}function G(e){n.firstLoad=e}function ae(){return n.isLoading}function P(e){n.selectedJenis=e.selectedJenis,n.category=e.category??null,n.type=e.type??null,n.version=e.version??null}function v(){n.currentPage=1,n.isLoading=!1,n.lastPage=!1,n.uniquePaths.clear(),n.isInitialLoad=!0,$("#product-list .row").html("")}function te(e){return n.currentRequest&&n.currentRequest.readyState!==4&&n.currentRequest.abort(),n.currentRequest=$.ajax({url:"/catalog/product",type:"GET",data:e})}function oe(e){$.ajax({url:`/products/${e}/viewed`,method:"POST",headers:{"X-CSRF-TOKEN":$('meta[name="csrf-token"]').attr("content")},success:o=>console.log("View recorded:",o),error:o=>console.error(o)})}function ne(){$("#loading").removeClass("d-none")}function ie(){$("#loading").addClass("d-none")}function se(){$("#page-loading").removeClass("d-none")}function le(){$("#page-loading").addClass("d-none")}function re(e=[]){if(!Array.isArray(e))return[];const o={thumbnail:3,motif:2,product:1};return e.slice().sort((t,a)=>(o[a.type]||0)-(o[t.type]||0)).map(t=>"/storage/"+t.path)}function de(e,o){$("#btn-download").addClass("d-none");let t="";e.forEach(a=>{const i=a.thumbnail?`/storage/${a.thumbnail}`:"https://via.placeholder.com/300x200?text=No+Image",s=o==3?"wallpanel":"tanpa kategori";t+=`
                    <div class="col-md-2 col-6 mb-4">
                        <div class="h-100 type-filter d-flex flex-column justify-content-center align-items-center"
                    `,t+=`
                    data-id="${a.id}"
                    data-jenis="card-types"
                    data-category="${s}"
                    data-type="${a.id}"
                    >
                       <img 
                            src="${i}" 
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
                </div>`}),$("#product-list .row").append(t)}function ce(e){const o={"PVC Board":()=>{$("#category-container").addClass("d-none"),$(".category-modal-container").text("Tidak ada kategori")},Wallboard:()=>w("Motif"),"UV Board":()=>w("Motif"),Wallpanel:()=>w("Motif"),Aksesoris:()=>w("Ukuran"),default:()=>w("Kategori")};(o[e]||o.default)()}function w(e){$("#category-menu-item-label, #category-modal-item-label").html(e)}function L({selectedJenis:e=null,hasCategory:o=!1,isRenderTypes:t=!1}){const a=$("#filter-container"),i=$("#category-container"),s=$("#catalog-col"),l=$(window).width()<768;if(a.removeClass("d-none"),i.removeClass("d-none"),s.removeClass("col-md-12 col-md-9"),t){a.addClass("d-none"),i.addClass("d-none"),s.addClass("col-md-12");return}if(e==1){a.addClass("d-none"),i.addClass("d-none"),s.addClass("col-md-12");return}if(!o){a.addClass("d-none"),i.addClass("d-none"),s.addClass("col-md-12");return}l?(a.addClass("d-none"),i.removeClass("d-none")):(a.removeClass("d-none"),i.removeClass("d-none")),s.addClass("col-md-9")}function ue(e,o=null){return e.length===0?`
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
            `).join("")}</li>`}function pe(e){if(e.length===0)return`
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
            </div>`).join("");return`<div class="row font-poppins">${o}${t}</div>`}function me(e){return e.length===0&&$("#type-menu-item-label").hide(),`<li class="nav-item font-poppins">${e.map(t=>`
                <a class="nav-link text-white type-filter d-flex align-items-center justify-content-start" 
                href="#" data-id="${t.id}">
                    <img src="${t.thumbnail?`/storage/${t.thumbnail}`:"dist/img/product/1.webp"}"
                        alt="${t.name}"
                        class="mr-2 img-thumbnail"
                        style="width:6.5rem;height:6.5rem;object-fit:contain;">
                    <span class="text-capitalize">${t.name}</span>
                </a>
            `).join("")}</li>`}function _(e,o=!0){var r,c;const t=e.category??[],a=(r=e.jenis)==null?void 0:r.name,i=o,s=(((c=e.category)==null?void 0:c.length)??0)>0;L({selectedJenis:n.selectedJenis,hasCategory:s,isRenderTypes:i}),t.length===0?$("#category-container").addClass("d-none"):$("#category-container").removeClass("d-none"),ce(a);const l=ue(t,n.version),d=pe(t),u=me(e.types??[]);o?$("#category-menu-item, #category-menu-item-modal").html("tidak ada kategori"):($("#category-menu-item, #category-menu-item-modal").html(l),$("#type-menu-item, #type-menu-item-modal").html(u),$("#pdf-catalog").html(d)),n.category&&$(`.category-filter[data-id="${n.category}"]`).addClass("active"),n.type&&$(`.type-filter[data-id="${n.type}"]`).addClass("active")}function C(e,o,t,a=!1){if(o==null)return;const i=[],s=$("#mockup-carousel-inner"),l=$("#mockup-carousel-indicators"),d=["https://www.youtube.com/embed/BiiUrYAbL9s?autoplay=1&mute=1&rel=0&controls=0&amp;loop=1&playlist=BiiUrYAbL9s"];e.forEach(r=>{r.images&&r.images.forEach(c=>{c.path&&t.add(c.path)}),r.path&&t.add(r.path)});const u=Array.from(t);s.empty(),l.empty();for(let r=1;r<=6;r++)r!==2&&i.push(`/dist/img/wpc/${r}.webp?v=${Date.now()}`);if(o==4){fe(d),$("#mockup").removeClass("d-none");return}else if(o==3)if(a){$("#mockup-carousel").carousel({interval:3e3}),$("#mockup .carousel-control-next").removeClass("d-none"),$("#mockup .carousel-control-prev").removeClass("d-none"),i.forEach((r,c)=>{s.append(`
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
                `)}),$("#mockup").removeClass("d-none");return}else u.length===1?($("#mockup .carousel-control-next").addClass("d-none"),$("#mockup .carousel-control-prev").addClass("d-none"),l.addClass("d-none")):($("#mockup .carousel-control-next").removeClass("d-none"),$("#mockup .carousel-control-prev").removeClass("d-none"),l.removeClass("d-none")),u.forEach((r,c)=>{let g=c===0?"eager":"lazy",h=c===0?"high":"low";s.append(`
                    <div class="carousel-item ${c===0?"active":""}">
                        <img src="/storage/${r}" alt="mockup" loading="${g}" fetchpriority="${h}" decode="async" 
                            class="img-fluid w-100 rounded-lg d-block mx-auto mockup-image"
                        >
                    </div>
                `),l.append(`
                    <li data-target="#mockup-carousel" data-slide-to="${c}" ${c===0?'class="active"':""}></li>
                `)}),$("#mockup").removeClass("d-none");else u.length>0?(u.length===1?($("#mockup .carousel-control-next").addClass("d-none"),$("#mockup .carousel-control-prev").addClass("d-none"),l.addClass("d-none")):($("#mockup .carousel-control-next").removeClass("d-none"),$("#mockup .carousel-control-prev").removeClass("d-none"),l.removeClass("d-none")),u.forEach((r,c)=>{let g=c===0?"eager":"lazy",h=c===0?"high":"low";s.append(`
                <div class="carousel-item ${c===0?"active":""}">
                    <img src="/storage/${r}" alt="mockup" loading="${g}" fetchpriority="${h}" decode="async" 
                        class="img-fluid w-100 rounded-lg d-block mx-auto mockup-image"
                    >
                </div>
            `),l.append(`
                <li data-target="#mockup-carousel" data-slide-to="${c}" ${c===0?'class="active"':""}></li>
            `)}),$("#mockup").removeClass("d-none")):$("#mockup").addClass("d-none")}function fe(e){$("#mockup-carousel").carousel({interval:!1}),$("#mockup .carousel-control-next").addClass("d-none"),$("#mockup .carousel-control-prev").addClass("d-none"),e.forEach((o,t)=>{$("#mockup-carousel-inner").append(`
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
            `)})}function O(e,o=!0){var l,d,u,r;const t=(l=e.products)==null?void 0:l.data[0],a=((u=(d=t==null?void 0:t.category)==null?void 0:d.type)==null?void 0:u.images)??[],i=((r=t==null?void 0:t.category)==null?void 0:r.images)??[],s=n.selectedJenis==3||n.selectedJenis==4;if(o){if(a.length>0){C(a,n.selectedJenis,n.uniquePaths,o);return}if(i.length>0){C(i,n.selectedJenis,n.uniquePaths,o);return}if(s){C([],n.selectedJenis,n.uniquePaths,o);return}}else{if(a.length>0){C(a,n.selectedJenis,n.uniquePaths,o);return}if(i.length>0){C(i,n.selectedJenis,n.uniquePaths,o);return}}}function ge(e,o,t){$("#btn-download").removeClass("d-none");let a="";e.forEach(i=>{var S,N,I,D,j,R,A,M,V,H,J,B,U,K,q,F,W;const s=re(((N=(S=i==null?void 0:i.product_versions)==null?void 0:S[0])==null?void 0:N.images)??[]),l=s.length?s[0]:"https://via.placeholder.com/300x200?text=No+Image";let d=s,u=((D=(I=i.category)==null?void 0:I.type)==null?void 0:D.thumbnail)??"";u&&!u.startsWith("http")&&(u=`storage/${u.replace(/^\/?storage\//,"")}`,d.push(u));const r=JSON.stringify(d).replace(/"/g,"&quot;"),c=JSON.stringify(i.packages).replace(/"/g,"&quot;"),g=((j=i.category)==null?void 0:j.name)??"Tanpa Kategori",h=((R=i.product_versions.find(X=>X.version_id==t))==null?void 0:R.name)??"Tanpa Nama";((A=i.category)==null?void 0:A.display_style)==="square"||o===null?a+=`
                    <div class="col-md-2 col-6 mb-4">
                        <div class="h-100 product-card"
                    `:((M=i.category)==null?void 0:M.display_style)==="rectangle"?a+=`
                    <div class="col-md-4 col-6 mb-4">
                        <div class="h-100 product-card"
                    `:a+=`
                    <div class="col-md-2 col-6 mb-4">
                        <div class="h-100 product-card d-flex flex-column justify-content-center align-items-center"
                    `;const m=((V=i.category)==null?void 0:V.display_style)==="rectangle",b=JSON.stringify(i.specifications).replace(/"/g,"&quot;");a+=`
                    data-id="${i.id}"
                    data-code="${i.code}"
                    data-name="${h}"
                    data-category="${g}"
                    data-jenis="${((J=(H=i.category)==null?void 0:H.jenis)==null?void 0:J.name)??""}"
                    data-images="${r}"
                    data-image="${l}"
                    data-type="${((U=(B=i.category)==null?void 0:B.type)==null?void 0:U.name)??""}"
                    data-type-image="${((q=(K=i.category)==null?void 0:K.type)==null?void 0:q.image)??""}"
                    data-url="${i.url_video}"
                    data-paket="${c}"
                    data-specifications = "${b}"
                    >
                       <img 
                            src="${l}" 
                            class="card-img-top" 
                            alt="${i.name}" 
                            style="
                                border : 1px solid #2c2c2c;
                                min-height: 10rem;
                                height: auto; 
                                border-radius: 8px;
                                width: 100%; 
                                object-fit: cover; 
                                object-position: ${((W=(F=i.category)==null?void 0:F.jenis)==null?void 0:W.name)==="PVC Board"?"bottom center":"center center"};
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
                </div>`}),$("#product-list .row").append(a)}function T(e={}){const o=new URL(window.location.href),t=o.searchParams;Object.entries(e).forEach(([a,i])=>{i==null||i===""?t.delete(a):t.set(a,i)}),window.history.replaceState({},"",o.toString())}const p={SEARCH_INPUT:"#search-input",BACK_BUTTON:"#backButton",HOME_BUTTON:"#homeButton",SEARCH_FORM:"#search-form",DOWNLOAD_BUTTON:"#downloadButton",VERSION_FILTER:"#version-filter",VERSION_SELECT:"#version-select",MOCKUP:"#mockup",PRODUCT_LIST:"#product-list",NO_DATA_IMAGE:"dist/img/no-data.png"},f={HIDDEN:"d-none",ROW:".row",COL_12:"col-12"};async function y(){if(!$e()){n.isLoading=!0,n.isInitialLoad?se():ne();try{const e=he(),o=await te(e);await ye(o)}finally{n.isLoading=!1,n.isInitialLoad=!1,ie(),le(),n.currentRequest=null}}}function $e(){return n.isLoading||n.lastPage}function he(){return{page:n.currentPage,search:$(p.SEARCH_INPUT).val(),jenis:n.selectedJenis,category:n.category,type:n.type,version:n.version}}async function ye(e){const{products:o=[],types:t=[],category:a=[]}=e,i=o.data||[],s=e.active_version_id;ve(),ke(),!await be(a)&&(n.firstLoad?await we(t,i,s,e):await xe(i,s,e),n.firstLoad=!1)}function ve(){n.type&&($(p.BACK_BUTTON).removeClass(f.HIDDEN),$(p.HOME_BUTTON).addClass(f.HIDDEN))}function ke(){if(n.version===null){const e=$(`${p.VERSION_SELECT} option:first`).val();e&&(n.version=e)}}async function be(e){return!n.category&&Array.isArray(e)&&e.length>0?(n.category=e[0].id,v(),T({category:n.category}),await y(),!0):!1}async function we(e,o,t,a){e.length>0&&!n.type?Ce(e,a):await Y(o,t,a,!0)}function Ce(e,o){Te(),de(e,n.selectedJenis),n.lastPage=!0,_(o,!0),O(o,!0)}async function Y(e,o,t,a){Pe(),e.length>0?(await ge(e,n.selectedJenis,o),n.currentPage++,n.currentPage>e.last_page&&(n.lastPage=!0)):(n.currentPage===1&&Ee(),n.lastPage=!0),a&&n.selectedJenis==4&&O(t,!0),a&&!n.type&&_(t,!0),_(t,!1),a||O(t,!1)}async function xe(e,o,t){await Y(e,o,t,!1)}function Te(){$(p.SEARCH_FORM).addClass(f.HIDDEN),$(p.DOWNLOAD_BUTTON).addClass(f.HIDDEN),$(p.VERSION_FILTER).addClass(f.HIDDEN)}function Pe(){$(p.SEARCH_FORM).removeClass(f.HIDDEN),$(p.DOWNLOAD_BUTTON).removeClass(f.HIDDEN),$(p.VERSION_FILTER).removeClass(f.HIDDEN)}function Ee(){$(p.MOCKUP).addClass(f.HIDDEN);const e=`
    <div class="${f.COL_12}">
      <img src="${p.NO_DATA_IMAGE}" alt="no-data" 
           class="img-fluid mx-auto d-block" 
           style="max-width:100%;height:auto;margin:100px 0;">
    </div>
  `;$(`${p.PRODUCT_LIST} ${f.ROW}`).append(e)}let k=!1;function Le(e){$(document).off("click",".category-filter"),$(document).on("click",".category-filter",async function(o){if(o.preventDefault(),k)return;k=!0;const t=$(this).data("id"),a=$(this).data("type"),i=$(this).data("version");try{T({category:t,type:a,version:i,jenis:e}),P({selectedJenis:e,category:t,type:a,version:i}),$("#filterModal").modal("hide"),v(),await y(!1)}catch(s){console.error("Gagal memuat data:",s)}finally{k=!1}}),$(document).off("click",".type-filter"),$(document).on("click",".type-filter",async function(o){if(o.preventDefault(),k)return;k=!0;const t=$(this).data("id");try{T({type:t}),P({selectedJenis:e,type:t}),$("#filterModal").modal("hide"),v(),await y(!1)}catch(a){console.error("Gagal memuat data:",a)}finally{k=!1}})}function _e(){$("#version-select").on("change",function(){const e=$(this).val()||null;n.version=e,T({version:e}),v(),y()})}function x(e,o="#modalVariants"){$(o).empty(),$("#modalPaket").empty(),$("#modalKepadatan").empty(),Array.isArray(e)&&e.length>0?e.forEach(t=>{const a=t.specification_values||[],i=t.name.toLowerCase();if(i==="warna")$("#paket").text("Warna"),a.length>0?a.forEach(s=>{t.pivot&&s.id===t.pivot.specification_value_id&&$("#modalPaket").append(`
                                <span class="badge badge-outline-primary px-2 py-1 kepadatan" data-value="${s.name}">
                                    ${s.name}
                                </span>
                            `)}):$("#modalPaket").append('<span class="text-muted">Tidak ada data</span>');else if(i==="density")a.length>0?a.forEach(s=>{t.pivot&&s.id===t.pivot.specification_value_id&&(a.length>1?$("#modalKepadatan").append(`
                                    <span class="badge badge-outline-primary px-2 py-1 kepadatan" data-value="${s.name}">
                                        ${s.name}
                                    </span>
                                `):$("#modalKepadatan").append(s.name))}):$("#modalKepadatan").append('<span class="text-muted">Tidak ada data</span>');else{const s=a.find(r=>t.pivot&&r.id===t.pivot.specification_value_id),l=s?s.name:"-";let d=s?s.unit:"";d?d=" "+d:["panjang","tinggi","lebar"].includes(i)?d=" cm":i==="ketebalan"&&(d=" mm");const u=`
                    <div class="row mb-1 variant-row">
                        <div class="col-4 col-sm-3 font-weight-bold">${t.name}</div>
                        <div class="col-auto">:</div>
                        <div class="col">${l}${d}</div>
                    </div>
                `;$(o).append(u),$("#modalContact").data(i,l+d)}}):($(o).append('<div class="text-muted">Tidak ada varian</div>'),$(".paket").hide())}function Oe(e,o=[],t=""){$("#carousel-product-image").empty(),$("#thumbnailGallery").empty();let a=e||[];(t==null?void 0:t.toLowerCase())==="uv board"&&o.length&&(a=[...e,...o]);const i=new IntersectionObserver(l=>{l.forEach(d=>{if(d.isIntersecting){const u=$(d.target);u.attr("src",u.data("src")),i.unobserve(d.target)}})},{rootMargin:"100px"});a.forEach((l,d)=>{const u=d===0?"active":"";$("#carousel-product-image").append(`
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
            `)}),$(".lazy-modal-img").each(function(){i.observe(this)}),a.length<=1?$("#carouselProduct .carousel-control-next, #carouselProduct .carousel-control-prev").addClass("d-none"):$("#carouselProduct .carousel-control-next, #carouselProduct .carousel-control-prev").removeClass("d-none"),$("#carouselProduct").carousel({interval:3e3,pause:!1});let s;$("#thumbnailGallery").off("click").on("click",".thumbnail-image",function(){const l=$(this).data("index");$("#carouselProduct").carousel(l),$(".thumbnail-image").removeClass("active-thumbnail"),$(this).addClass("active-thumbnail"),setTimeout(()=>$(this).removeClass("active-thumbnail"),500),$("#carouselProduct").carousel("pause"),clearTimeout(s),s=setTimeout(()=>{$("#carouselProduct").carousel("cycle")},7e3)})}function Se(){$(document).off("click",".product-card").on("click",".product-card",function(){const e=$(this).data("id"),o=$(this).data("code"),t=$(this).data("name"),a=$(this).data("category"),i=$(this).data("type"),s=$(this).data("jenis"),l=$(this).data("url"),d=$(this).attr("data-images");let u=$(this).data("type-image");const r=JSON.parse($(this).attr("data-specifications")||"[]"),c=JSON.parse($(this).attr("data-paket")||"[]");let g=[],h=[];if(s!=="card-types"&&oe(e),d)try{g=JSON.parse(d.replace(/&quot;/g,'"'))}catch(m){g=[],console.error(m)}if(Array.isArray(c)&&(h=c.sort((m,b)=>m.order-b.order).map(m=>`/storage/${m.image}`)),$("#notes").show(),$("#modalPaket").empty(),s==="card-types"){v(),P({selectedJenis:n.selectedJenis,type:i}),G(!1),y();return}s.toLowerCase()==="uv board"&&(x(r),$("#modalVideo, .lebar").hide(),$("#modalCategory").text(a),c.length>0?c.sort((m,b)=>m.order-b.order).map(m=>{$("#modalPaket").append(`
                        <span class="badge badge-outline-primary px-2 py-1 kepadatan" data-value="${m.name}">${m.name}</span>
                    `)}):($("#modalPaket").append('<span class="text-muted">Tidak ada paket</span>'),$("#notes").hide())),s.toLowerCase()==="wallboard"&&(x(r),$("#modalCategory").text(a),$("#ketebalan, .density, #notes, .paket,  #modalVideo, .lebar").hide()),s==="PVC Board"&&(x(r),$("#modalCategory").text(s),$("#modalVideo, .lebar, .paket").hide()),s==="Wallpanel"&&(x(r),$("#modalContact").data("type",i),$("#modalCategory").text(a+" / "+i),$("#ketebalan, #kepadatan, .paket, #modalVideo, #notes, .density").hide(),$("#modalGrafis").attr("src",`/storage/${u}`),$(".grafis").removeClass("d-none")),s.toLowerCase()==="aksesoris"&&($("#tinggi, #ketebalan, #kepadatan, .lebar, .density").hide(),$("#modalCategory").text(a),x(r),$("#modalVideoPlayer").empty(),$("#modalVideo, .density").hide(),l&&($("#modalVideoPlayer").append(`
                    <iframe class="embed-responsive-item"
                    src="${l}"
                    title="YouTube video player" frameborder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; web-share;"
                    referrerpolicy="strict-origin-when-cross-origin"
                    allowfullscreen></iframe>
                `),$("#modalVideo").show())),Oe(g,h,s),$("#modalName").text(t),$("#productModalLabel").text(t),$("#productModal").modal("show"),$("#modalContact").data({jenis:s,category:a,code:o,type:i}),$(".kepadatan").removeClass("active"),$("#modalContact").data({kepadatan:null,paket:null}),$(".modalContact").prop("disabled",$(".kepadatan").length>0)}),$(document).on("click",".kepadatan",function(){$(".modalContact").prop("disabled",!1);const e=$(this).data("value");$(this).closest("#productModal").find(".kepadatan").removeClass("active"),$(this).addClass("active"),$("#notes").hide(),$("#modalContact").data("kepadatan",e)})}function Ne(){let e;$("#search-input").on("input",function(){clearTimeout(e),e=setTimeout(()=>{v(),y()},500)})}let z,E=!1;function Ie(){$(window).on("scroll",function(){clearTimeout(z),z=setTimeout(async()=>{if(E||ae())return;const e=$(window).scrollTop(),o=$(window).height(),t=$(document).height();if(e+o>=t-150){E=!0;try{G(!1),await y()}finally{E=!1}}},200)})}function De(){$("#backButton").on("click",()=>{console.log("Back button clicked"),v(),n.type=null,T({type:null}),n.isInitialLoad=!0,window.location.href=window.location.href})}$(document).ready(function(){const e=new URLSearchParams(window.location.search),o=e.get("jenis"),t=e.get("version"),a=e.get("category"),i=e.get("type");P({selectedJenis:o,category:a,version:t,type:i}),y(),L({selectedJenis:o,hasCategory:a,isRenderTypes:!1}),$(window).on("resize",()=>L({selectedJenis:o,hasCategory:a,isRenderTypes:!1})),Le(o),Q(),Z(),ee(),_e(),Ne(),Ie(),Se(),De()});
