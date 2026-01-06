let s={selectedJenis:null,category:null,type:null,currentPage:1,isLoading:!1,lastPage:!1,firstLoad:!0,currentRequest:null,uniquePaths:new Set,version:null};function Q(){let e=[];$(document).on("change","#all-cat",function(){$(this).prop("checked")?($(".category-filter-download").prop("checked",!0),e=[""]):($(".category-filter-download").prop("checked",!1),e=[])}),$(document).on("change",".category-filter-download",function(){$(this).prop("checked")||$("#all-cat").prop("checked",!1),e=$(".category-filter-download:checked").map(function(){return $(this).val()}).get().filter(t=>t!=="");const o=$(".category-filter-download").length-1;e.length===o&&($("#all-cat").prop("checked",!0),e=[""])}),$(document).off("click","#btn-download").on("click","#btn-download",function(o){o.preventDefault();const t=s.type,a=s.selectedJenis,n=s.version;if(!n){alert("Silakan pilih versi terlebih dahulu.");return}let i=new URLSearchParams;e.length>0&&e[0]!==""&&e.forEach(d=>i.append("category[]",d)),a&&i.append("jenis_id",a),n&&i.append("version_id",n),t&&i.append("type_id",t);const l=`/catalog/pdf?${i.toString()}`;window.location.href=l})}function Z(){$(document).off("click",".modalContact").on("click",".modalContact",function(e){e.preventDefault();const o="62816659688",t=$(this).data("jenis");let a="";t.toLowerCase()=="wallpanel"?a=`Halo Admin,
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

Apakah produk ini masih tersedia? Terima kasih.`,window.open(`https://wa.me/${o}?text=${encodeURIComponent(a)}`,"_blank")})}function ee(){$(window).scroll(function(){$(this).scrollTop()>100?$("#btn-scroll-top").fadeIn():$("#btn-scroll-top").fadeOut()}),$("#btn-scroll-top").click(function(){return $("html, body").animate({scrollTop:0},500),!1})}function W(e){s.firstLoad=e}function ae(){return s.isLoading}function T(e){s.selectedJenis=e.selectedJenis,s.category=e.category??null,s.type=e.type??null,s.version=e.version??null}function k(){s.currentPage=1,s.isLoading=!1,s.lastPage=!1,s.uniquePaths.clear(),$("#product-list .row").html("")}function te(e){return s.currentRequest&&s.currentRequest.readyState!==4&&s.currentRequest.abort(),s.currentRequest=$.ajax({url:"/catalog/product",type:"GET",data:e})}function oe(e){$.ajax({url:`/products/${e}/viewed`,method:"POST",headers:{"X-CSRF-TOKEN":$('meta[name="csrf-token"]').attr("content")},success:o=>console.log("View recorded:",o),error:o=>console.error(o)})}function ne(){$("#loading").removeClass("d-none")}function se(){$("#loading").addClass("d-none")}function ie(e=[]){if(!Array.isArray(e))return[];const o={thumbnail:3,motif:2,product:1};return e.slice().sort((t,a)=>(o[a.type]||0)-(o[t.type]||0)).map(t=>"/storage/"+t.path)}function le(e,o){$("#btn-download").addClass("d-none");let t="";e.forEach(a=>{const n=a.thumbnail?`/storage/${a.thumbnail}`:"https://via.placeholder.com/300x200?text=No+Image",i=o==3?"wallpanel":"tanpa kategori";t+=`
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
                </div>`}),$("#product-list .row").append(t)}function re(e){const o={"PVC Board":()=>{$("#category-container").addClass("d-none"),$(".category-modal-container").text("Tidak ada kategori")},Wallboard:()=>w("Motif"),"UV Board":()=>w("Motif"),Wallpanel:()=>w("Motif"),Aksesoris:()=>w("Ukuran"),default:()=>w("Kategori")};(o[e]||o.default)()}function w(e){$("#category-menu-item-label, #category-modal-item-label").html(e)}function E({selectedJenis:e=null,hasCategory:o=!1,isRenderTypes:t=!1}){const a=$("#filter-container"),n=$("#category-container"),i=$("#catalog-col"),l=$(window).width()<768;if(a.removeClass("d-none"),n.removeClass("d-none"),i.removeClass("col-md-12 col-md-9"),t){a.addClass("d-none"),n.addClass("d-none"),i.addClass("col-md-12");return}if(e==1){a.addClass("d-none"),n.addClass("d-none"),i.addClass("col-md-12");return}if(!o){a.addClass("d-none"),n.addClass("d-none"),i.addClass("col-md-12");return}l?(a.addClass("d-none"),n.removeClass("d-none")):(a.removeClass("d-none"),n.removeClass("d-none")),i.addClass("col-md-9")}function de(e,o=null){return e.length===0?`
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
            `).join("")}</li>`}function ce(e){if(e.length===0)return`
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
            `).join("")}</li>`}function z(e,o=!0){var r,c,m;const t=e.category??[],a=(r=e.jenis)==null?void 0:r.name,n=s.firstLoad&&(((c=e.types)==null?void 0:c.length)??0)>0,i=(((m=e.category)==null?void 0:m.length)??0)>0;E({selectedJenis:s.selectedJenis,hasCategory:i,isRenderTypes:n}),t.length===0?$("#category-container").addClass("d-none"):$("#category-container").removeClass("d-none"),re(a);const l=de(t,s.version),d=ce(t),u=ue(e.types??[]);o?$("#category-menu-item, #category-menu-item-modal").html("tidak ada kategori"):($("#category-menu-item, #category-menu-item-modal").html(l),$("#type-menu-item, #type-menu-item-modal").html(u),$("#pdf-catalog").html(d)),s.category&&$(`.category-filter[data-id="${s.category}"]`).addClass("active"),s.type&&$(`.type-filter[data-id="${s.type}"]`).addClass("active")}function C(e,o,t,a=!1){if(o==null)return;const n=[],i=$("#mockup-carousel-inner"),l=$("#mockup-carousel-indicators"),d=["https://www.youtube.com/embed/BiiUrYAbL9s?autoplay=1&mute=1&rel=0&controls=0&amp;loop=1&playlist=BiiUrYAbL9s"];e.forEach(r=>{r.images&&r.images.forEach(c=>{c.path&&t.add(c.path)}),r.path&&t.add(r.path)});const u=Array.from(t);i.empty(),l.empty();for(let r=1;r<=6;r++)r!==2&&n.push(`/dist/img/wpc/${r}.webp?v=${Date.now()}`);if(o==4){me(d),$("#mockup").removeClass("d-none");return}else if(o==3)if(a){$("#mockup-carousel").carousel({interval:3e3}),$("#mockup .carousel-control-next").removeClass("d-none"),$("#mockup .carousel-control-prev").removeClass("d-none"),n.forEach((r,c)=>{i.append(`
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
                `)}),$("#mockup").removeClass("d-none");return}else u.length===1?($("#mockup .carousel-control-next").addClass("d-none"),$("#mockup .carousel-control-prev").addClass("d-none"),l.addClass("d-none")):($("#mockup .carousel-control-next").removeClass("d-none"),$("#mockup .carousel-control-prev").removeClass("d-none"),l.removeClass("d-none")),u.forEach((r,c)=>{let m=c===0?"eager":"lazy",h=c===0?"high":"low";i.append(`
                    <div class="carousel-item ${c===0?"active":""}">
                        <img src="/storage/${r}" alt="mockup" loading="${m}" fetchpriority="${h}" decode="async" 
                            class="img-fluid w-100 rounded-lg d-block mx-auto mockup-image"
                        >
                    </div>
                `),l.append(`
                    <li data-target="#mockup-carousel" data-slide-to="${c}" ${c===0?'class="active"':""}></li>
                `)}),$("#mockup").removeClass("d-none");else u.length>0?(u.length===1?($("#mockup .carousel-control-next").addClass("d-none"),$("#mockup .carousel-control-prev").addClass("d-none"),l.addClass("d-none")):($("#mockup .carousel-control-next").removeClass("d-none"),$("#mockup .carousel-control-prev").removeClass("d-none"),l.removeClass("d-none")),u.forEach((r,c)=>{let m=c===0?"eager":"lazy",h=c===0?"high":"low";i.append(`
                <div class="carousel-item ${c===0?"active":""}">
                    <img src="/storage/${r}" alt="mockup" loading="${m}" fetchpriority="${h}" decode="async" 
                        class="img-fluid w-100 rounded-lg d-block mx-auto mockup-image"
                    >
                </div>
            `),l.append(`
                <li data-target="#mockup-carousel" data-slide-to="${c}" ${c===0?'class="active"':""}></li>
            `)}),$("#mockup").removeClass("d-none")):$("#mockup").addClass("d-none")}function me(e){$("#mockup-carousel").carousel({interval:!1}),$("#mockup .carousel-control-next").addClass("d-none"),$("#mockup .carousel-control-prev").addClass("d-none"),e.forEach((o,t)=>{$("#mockup-carousel-inner").append(`
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
            `)})}function L(e,o=!0){var l,d,u,r;const t=(l=e.products)==null?void 0:l.data[0],a=((u=(d=t==null?void 0:t.category)==null?void 0:d.type)==null?void 0:u.images)??[],n=((r=t==null?void 0:t.category)==null?void 0:r.images)??[],i=s.selectedJenis==3||s.selectedJenis==4;if(o){if(a.length>0){C(a,s.selectedJenis,s.uniquePaths,o);return}if(n.length>0){C(n,s.selectedJenis,s.uniquePaths,o);return}if(i){C([],s.selectedJenis,s.uniquePaths,o);return}}else{if(a.length>0){C(a,s.selectedJenis,s.uniquePaths,o);return}if(n.length>0){C(n,s.selectedJenis,s.uniquePaths,o);return}}}function pe(e,o,t){$("#btn-download").removeClass("d-none");let a="";e.forEach(n=>{var _,O,S,N,D,j,R,A,I,M,V,H,J,U,B,K,q;const i=ie(((O=(_=n==null?void 0:n.product_versions)==null?void 0:_[0])==null?void 0:O.images)??[]),l=i.length?i[0]:"https://via.placeholder.com/300x200?text=No+Image";let d=i,u=((N=(S=n.category)==null?void 0:S.type)==null?void 0:N.thumbnail)??"";u&&!u.startsWith("http")&&(u=`storage/${u.replace(/^\/?storage\//,"")}`,d.push(u));const r=JSON.stringify(d).replace(/"/g,"&quot;"),c=JSON.stringify(n.packages).replace(/"/g,"&quot;"),m=((D=n.category)==null?void 0:D.name)??"Tanpa Kategori",h=((j=n.product_versions.find(X=>X.version_id==t))==null?void 0:j.name)??"Tanpa Nama";((R=n.category)==null?void 0:R.display_style)==="square"||o===null?a+=`
                    <div class="col-md-2 col-6 mb-4">
                        <div class="h-100 product-card"
                    `:((A=n.category)==null?void 0:A.display_style)==="rectangle"?a+=`
                    <div class="col-md-4 col-6 mb-4">
                        <div class="h-100 product-card"
                    `:a+=`
                    <div class="col-md-2 col-6 mb-4">
                        <div class="h-100 product-card d-flex flex-column justify-content-center align-items-center"
                    `;const f=((I=n.category)==null?void 0:I.display_style)==="rectangle",b=JSON.stringify(n.specifications).replace(/"/g,"&quot;");a+=`
                    data-id="${n.id}"
                    data-code="${n.code}"
                    data-name="${h}"
                    data-category="${m}"
                    data-jenis="${((V=(M=n.category)==null?void 0:M.jenis)==null?void 0:V.name)??""}"
                    data-images="${r}"
                    data-image="${l}"
                    data-type="${((J=(H=n.category)==null?void 0:H.type)==null?void 0:J.name)??""}"
                    data-type-image="${((B=(U=n.category)==null?void 0:U.type)==null?void 0:B.image)??""}"
                    data-url="${n.url_video}"
                    data-paket="${c}"
                    data-specifications = "${b}"
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
                                object-position: ${((q=(K=n.category)==null?void 0:K.jenis)==null?void 0:q.name)==="PVC Board"?"bottom center":"center center"};
                                aspect-ratio: ${f?"16/9":"1/1"};
                            "
                        >
                        <div class="card-body d-flex flex-column text-center">
                            <h4 class="card-title font-weight-bold text-uppercase mb-2">
                                ${h}
                            </h4>
                            <h5 class="card-text text-white mb-1 font-weight-light">${m}</h5>
                        </div>
                    </div>
                </div>`}),$("#product-list .row").append(a)}const p={SEARCH_INPUT:"#search-input",BACK_BUTTON:"#backButton",HOME_BUTTON:"#homeButton",SEARCH_FORM:"#search-form",DOWNLOAD_BUTTON:"#downloadButton",VERSION_FILTER:"#version-filter",VERSION_SELECT:"#version-select",MOCKUP:"#mockup",PRODUCT_LIST:"#product-list",NO_DATA_IMAGE:"dist/img/no-data.png"},g={HIDDEN:"d-none",ROW:".row",COL_12:"col-12"};async function y(){if(!fe()){s.isLoading=!0,ne();try{const e=$e(),o=await te(e);await ge(o)}finally{s.isLoading=!1,se(),s.currentRequest=null}}}function fe(){return s.isLoading||s.lastPage}function $e(){return{page:s.currentPage,search:$(p.SEARCH_INPUT).val(),jenis:s.selectedJenis,category:s.category,type:s.type,version:s.version}}async function ge(e){const{products:o=[],types:t=[],category:a=[]}=e,n=o.data||[],i=e.active_version_id;he(),ye(),!await ve(a)&&(s.firstLoad?await ke(t,n,i,e):await we(n,i,e),s.firstLoad=!1)}function he(){s.type&&($(p.BACK_BUTTON).removeClass(g.HIDDEN),$(p.HOME_BUTTON).addClass(g.HIDDEN))}function ye(){if(s.version===null){const e=$(`${p.VERSION_SELECT} option:first`).val();e&&(s.version=e)}}async function ve(e){return!s.category&&Array.isArray(e)&&e.length>0?(s.category=e[0].id,k(),await y(),!0):!1}async function ke(e,o,t,a){e.length>0?be(e,a):await G(o,t,a,!0)}function be(e,o){Ce(),le(e,s.selectedJenis),s.lastPage=!0,z(o,!0),L(o,!0)}async function G(e,o,t,a){xe(),e.length>0?(await pe(e,s.selectedJenis,o),s.currentPage++,s.currentPage>e.last_page&&(s.lastPage=!0)):(s.currentPage===1&&Te(),s.lastPage=!0),a&&s.selectedJenis==4&&L(t,!0),z(t,!1),a||L(t,!1)}async function we(e,o,t){await G(e,o,t,!1)}function Ce(){$(p.SEARCH_FORM).addClass(g.HIDDEN),$(p.DOWNLOAD_BUTTON).addClass(g.HIDDEN),$(p.VERSION_FILTER).addClass(g.HIDDEN)}function xe(){$(p.SEARCH_FORM).removeClass(g.HIDDEN),$(p.DOWNLOAD_BUTTON).removeClass(g.HIDDEN),$(p.VERSION_FILTER).removeClass(g.HIDDEN)}function Te(){$(p.MOCKUP).addClass(g.HIDDEN);const e=`
    <div class="${g.COL_12}">
      <img src="${p.NO_DATA_IMAGE}" alt="no-data" 
           class="img-fluid mx-auto d-block" 
           style="max-width:100%;height:auto;margin:100px 0;">
    </div>
  `;$(`${p.PRODUCT_LIST} ${g.ROW}`).append(e)}function Y(e={}){const o=new URL(window.location.href),t=o.searchParams;Object.entries(e).forEach(([a,n])=>{n==null||n===""?t.delete(a):t.set(a,n)}),window.history.replaceState({},"",o.toString())}let v=!1;function Pe(e){$(document).off("click",".category-filter"),$(document).on("click",".category-filter",async function(o){if(o.preventDefault(),v)return;v=!0;const t=$(this).data("id"),a=$(this).data("type"),n=$(this).data("version");try{Y({category:t,type:a,version:n,jenis:e}),T({selectedJenis:e,category:t,type:a,version:n}),$("#filterModal").modal("hide"),k(),await y(!1)}catch(i){console.error("Gagal memuat data:",i)}finally{v=!1}}),$(document).off("click",".type-filter"),$(document).on("click",".type-filter",async function(o){if(o.preventDefault(),v)return;v=!0;const t=$(this).data("id");try{T({selectedJenis:e,type:t}),$("#filterModal").modal("hide"),k(),await y(!1)}catch(a){console.error("Gagal memuat data:",a)}finally{v=!1}})}function Ee(){$("#version-select").on("change",function(){const e=$(this).val()||null;s.version=e,Y({version:e}),k(),y()})}function x(e,o="#modalVariants"){$(o).empty(),$("#modalPaket").empty(),$("#modalKepadatan").empty(),Array.isArray(e)&&e.length>0?e.forEach(t=>{const a=t.specification_values||[],n=t.name.toLowerCase();if(n==="warna")$("#paket").text("Warna"),a.length>0?a.forEach(i=>{t.pivot&&i.id===t.pivot.specification_value_id&&$("#modalPaket").append(`
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
                `;$(o).append(u),$("#modalContact").data(n,l+d)}}):($(o).append('<div class="text-muted">Tidak ada varian</div>'),$(".paket").hide())}function Le(e,o=[],t=""){$("#carousel-product-image").empty(),$("#thumbnailGallery").empty();let a=e||[];(t==null?void 0:t.toLowerCase())==="uv board"&&o.length&&(a=[...e,...o]);const n=new IntersectionObserver(l=>{l.forEach(d=>{if(d.isIntersecting){const u=$(d.target);u.attr("src",u.data("src")),n.unobserve(d.target)}})},{rootMargin:"100px"});a.forEach((l,d)=>{const u=d===0?"active":"";$("#carousel-product-image").append(`
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
            `)}),$(".lazy-modal-img").each(function(){n.observe(this)}),a.length<=1?$("#carouselProduct .carousel-control-next, #carouselProduct .carousel-control-prev").addClass("d-none"):$("#carouselProduct .carousel-control-next, #carouselProduct .carousel-control-prev").removeClass("d-none"),$("#carouselProduct").carousel({interval:3e3,pause:!1});let i;$("#thumbnailGallery").off("click").on("click",".thumbnail-image",function(){const l=$(this).data("index");$("#carouselProduct").carousel(l),$(".thumbnail-image").removeClass("active-thumbnail"),$(this).addClass("active-thumbnail"),setTimeout(()=>$(this).removeClass("active-thumbnail"),500),$("#carouselProduct").carousel("pause"),clearTimeout(i),i=setTimeout(()=>{$("#carouselProduct").carousel("cycle")},7e3)})}function _e(){$(document).off("click",".product-card").on("click",".product-card",function(){const e=$(this).data("id"),o=$(this).data("code"),t=$(this).data("name"),a=$(this).data("category"),n=$(this).data("type"),i=$(this).data("jenis"),l=$(this).data("url"),d=$(this).attr("data-images");let u=$(this).data("type-image");const r=JSON.parse($(this).attr("data-specifications")||"[]"),c=JSON.parse($(this).attr("data-paket")||"[]");let m=[],h=[];if(i!=="card-types"&&oe(e),d)try{m=JSON.parse(d.replace(/&quot;/g,'"'))}catch(f){m=[],console.error(f)}if(Array.isArray(c)&&(h=c.sort((f,b)=>f.order-b.order).map(f=>`/storage/${f.image}`)),$("#notes").show(),$("#modalPaket").empty(),i==="card-types"){k(),T({selectedJenis:s.selectedJenis,type:n}),W(!1),y();return}i.toLowerCase()==="uv board"&&(x(r),$("#modalVideo, .lebar").hide(),$("#modalCategory").text(a),c.length>0?c.sort((f,b)=>f.order-b.order).map(f=>{$("#modalPaket").append(`
                        <span class="badge badge-outline-primary px-2 py-1 kepadatan" data-value="${f.name}">${f.name}</span>
                    `)}):($("#modalPaket").append('<span class="text-muted">Tidak ada paket</span>'),$("#notes").hide())),i.toLowerCase()==="wallboard"&&(x(r),$("#modalCategory").text(a),$("#ketebalan, .density, #notes, .paket,  #modalVideo, .lebar").hide()),i==="PVC Board"&&(x(r),$("#modalCategory").text(i),$("#modalVideo, .lebar, .paket").hide()),i==="Wallpanel"&&(x(r),$("#modalContact").data("type",n),$("#modalCategory").text(a+" / "+n),$("#ketebalan, #kepadatan, .paket, #modalVideo, #notes, .density").hide(),$("#modalGrafis").attr("src",`/storage/${u}`),$(".grafis").removeClass("d-none")),i.toLowerCase()==="aksesoris"&&($("#tinggi, #ketebalan, #kepadatan, .lebar, .density").hide(),$("#modalCategory").text(a),x(r),$("#modalVideoPlayer").empty(),$("#modalVideo, .density").hide(),l&&($("#modalVideoPlayer").append(`
                    <iframe class="embed-responsive-item"
                    src="${l}"
                    title="YouTube video player" frameborder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; web-share;"
                    referrerpolicy="strict-origin-when-cross-origin"
                    allowfullscreen></iframe>
                `),$("#modalVideo").show())),Le(m,h,i),$("#modalName").text(t),$("#productModalLabel").text(t),$("#productModal").modal("show"),$("#modalContact").data({jenis:i,category:a,code:o,type:n}),$(".kepadatan").removeClass("active"),$("#modalContact").data({kepadatan:null,paket:null}),$(".modalContact").prop("disabled",$(".kepadatan").length>0)}),$(document).on("click",".kepadatan",function(){$(".modalContact").prop("disabled",!1);const e=$(this).data("value");$(this).closest("#productModal").find(".kepadatan").removeClass("active"),$(this).addClass("active"),$("#notes").hide(),$("#modalContact").data("kepadatan",e)})}function Oe(){let e;$("#search-input").on("input",function(){clearTimeout(e),e=setTimeout(()=>{k(),y()},500)})}let F,P=!1;function Se(){$(window).on("scroll",function(){clearTimeout(F),F=setTimeout(async()=>{if(P||ae())return;const e=$(window).scrollTop(),o=$(window).height(),t=$(document).height();if(e+o>=t-150){P=!0;try{W(!1),await y()}finally{P=!1}}},200)})}$(document).ready(function(){const e=new URLSearchParams(window.location.search),o=e.get("jenis"),t=e.get("version"),a=e.get("category");T({selectedJenis:o,category:a,version:t}),y(),E({selectedJenis:o,hasCategory:a,isRenderTypes:!1}),$(window).on("resize",()=>E({selectedJenis:o,hasCategory:a,isRenderTypes:!1})),Pe(o),Q(),Z(),ee(),Ee(),Oe(),Se(),_e()});
