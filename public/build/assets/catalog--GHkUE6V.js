let o={selectedJenis:null,category:null,type:null,currentPage:1,isLoading:!1,lastPage:!1,firstLoad:!0,currentRequest:null,uniquePaths:new Set,version:null};function W(){let e=[];$(document).on("change","#all-cat",function(){$(this).prop("checked")?($(".category-filter-download").prop("checked",!0),e=[""]):($(".category-filter-download").prop("checked",!1),e=[])}),$(document).on("change",".category-filter-download",function(){$(this).prop("checked")||$("#all-cat").prop("checked",!1),e=$(".category-filter-download:checked").map(function(){return $(this).val()}).get().filter(a=>a!=="");const s=$(".category-filter-download").length-1;e.length===s&&($("#all-cat").prop("checked",!0),e=[""])}),$(document).off("click","#btn-download").on("click","#btn-download",function(s){s.preventDefault();const a=o.type,t=o.selectedJenis,n=o.version;if(!n){alert("Silakan pilih versi terlebih dahulu.");return}let i=new URLSearchParams;e.length>0&&e[0]!==""&&e.forEach(c=>i.append("category[]",c)),t&&i.append("jenis_id",t),n&&i.append("version_id",n),a&&i.append("type_id",a);const r=`/catalog/pdf?${i.toString()}`;window.location.href=r})}function G(){$(document).off("click",".modalContact").on("click",".modalContact",function(e){e.preventDefault();const s="62816659688",a=$(this).data("jenis");let t="";a.toLowerCase()=="wallpanel"?t=`Halo Admin,
Saya tertarik dengan produk berikut:

• Tipe Wallpanel: *${$(this).data("type")}*
• Kode : *${$(this).data("code")}*
• panjang : *${$(this).data("length")} cm*
• tinggi : *${$(this).data("height")} cm*
• lebar : *${$(this).data("width")} cm*
• Produk : *${$(this).data("jenis")}*
• Kategori: *${$(this).data("category")}*

Apakah produk ini masih tersedia? Terima kasih.`:a.toLowerCase()=="pvc board"?t=`Halo Admin,
Saya tertarik dengan produk berikut:

• Produk : *${$(this).data("jenis")}*
• Ketebalan : *${$(this).data("code")}*
• density: *${$(this).data("kepadatan")??"-"}*

Apakah produk ini masih tersedia? Terima kasih.`:a.toLowerCase()=="uv board"?t=`Halo Admin,
Saya tertarik dengan produk berikut:

• Kode Motif : *${$(this).data("code")}*
• Produk : *${$(this).data("jenis")}*
• Kategori: *${$(this).data("category")}*

• Paket: *${$(this).data("kepadatan")??"-"}*

Apakah produk ini masih tersedia? Terima kasih.`:a.toLowerCase()=="aksesoris"?t=`Halo Admin,
Saya tertarik dengan produk berikut:

• Kode : *${$(this).data("code")}*
• Produk : *${$(this).data("jenis")}*
• Ukuran : *${$(this).data("category")}*

• Warna : *${$(this).data("kepadatan")}*

Apakah produk ini masih tersedia? Terima kasih.`:t=`Halo Admin,
Saya tertarik dengan produk berikut:

• Kode Motif : *${$(this).data("code")}*
• Produk : *${$(this).data("jenis")}*
• Kategori: *${$(this).data("category")}*

Apakah produk ini masih tersedia? Terima kasih.`,window.open(`https://wa.me/${s}?text=${encodeURIComponent(t)}`,"_blank")})}function z(){$(window).scroll(function(){$(this).scrollTop()>100?$("#btn-scroll-top").fadeIn():$("#btn-scroll-top").fadeOut()}),$("#btn-scroll-top").click(function(){return $("html, body").animate({scrollTop:0},500),!1})}function O(e){o.firstLoad=e}function F(){return o.isLoading}function V(e){o.selectedJenis=e.selectedJenis,o.category=e.category??null,o.type=e.type??null,o.version=e.version??null}function j(){o.currentPage=1,o.isLoading=!1,o.lastPage=!1,o.uniquePaths.clear(),$("#product-list .row").html("")}function Y(e){return o.currentRequest&&o.currentRequest.readyState!==4&&o.currentRequest.abort(),o.currentRequest=$.ajax({url:"/catalog",type:"GET",data:e})}function X(){$("#loading").removeClass("d-none")}function Q(){$("#loading").addClass("d-none")}function Z(e=[]){if(!Array.isArray(e))return[];const s={thumbnail:3,motif:2,product:1};return e.slice().sort((a,t)=>(s[t.type]||0)-(s[a.type]||0)).map(a=>"/storage/"+a.path)}function ee(e,s){$("#btn-download").addClass("d-none");let a="";e.forEach(t=>{const n=t.thumbnail?`/storage/${t.thumbnail}`:"https://via.placeholder.com/300x200?text=No+Image",i=s==3?"wallpanel":"tanpa kategori";a+=`
                    <div class="col-md-2 col-6 mb-4">
                        <div class="h-100 product-card d-flex flex-column justify-content-center align-items-center"
                    `,a+=`
                    data-id="${t.id}"
                    data-jenis="card-types"
                    data-category="${i}"
                    data-type="${t.id}"
                    >
                       <img 
                            src="${n}" 
                            class="card-img-top" 
                            alt="${t.name}" 
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
                                ${t.name}
                            </h4>
                            <h6 class="card-text text-muted mb-1">${i}</h6>
                        </div>
                    </div>
                </div>`}),$("#product-list .row").append(a)}function ae(e){const s={"PVC Board":()=>{$("#category-container").addClass("d-none"),$(".category-modal-container").text("Tidak ada kategori")},Wallboard:()=>J("Motif"),"UV Board":()=>J("Motif"),Wallpanel:()=>J("Motif"),Aksesoris:()=>J("Ukuran"),default:()=>J("Kategori")};(s[e]||s.default)()}function J(e){$("#category-menu-item-label, #category-modal-item-label").html(e)}function A({selectedJenis:e=null,hasCategory:s=!1,isRenderTypes:a=!1}){const t=$("#filter-container"),n=$("#category-container"),i=$("#catalog-col"),r=$(window).width()<768;if(t.removeClass("d-none"),n.removeClass("d-none"),i.removeClass("col-md-12 col-md-9"),a){t.addClass("d-none"),n.addClass("d-none"),i.addClass("col-md-12");return}if(e==1){t.addClass("d-none"),n.addClass("d-none"),i.addClass("col-md-12");return}if(!s){t.addClass("d-none"),n.addClass("d-none"),i.addClass("col-md-12");return}r?(t.addClass("d-none"),n.removeClass("d-none")):(t.removeClass("d-none"),n.removeClass("d-none")),i.addClass("col-md-9")}function te(e,s=null){return e.length===0?`
            <li class="nav-item font-poppins">
                <a class="nav-link text-white category-filter" href="#">Tanpa Kategori</a>
            </li>`:`<li class="nav-item font-poppins">${e.map(t=>`
                <a class="nav-link text-white category-filter d-flex align-items-center justify-content-start" 
                href="#" 
                data-jenis-id="${t.jenis_id}" 
                data-id="${t.id}" 
                data-type="${t.type_id}"
                data-version="${s}">
                    <img src="${t.path?"storage/"+t.path:"dist/img/product/1.webp"}"
                        alt="${t.name}"
                        class="mr-2 img-thumbnail"
                        style="width:50px;height:50px;object-fit:contain;">
                    <span class="text-capitalize">${t.name}</span>
                </a>
            `).join("")}</li>`}function oe(e){if(e.length===0)return`
            <div class="row font-poppins">
                <div class="col-12 mb-2">
                    <div class="text-white rounded py-2 px-3">
                        <input type="checkbox" class="custom-control-input" id="no-cat" disabled>
                        <label class="custom-control-label" for="no-cat">
                            Tanpa Kategori
                        </label>
                    </div>
                </div>
            </div>`;const s=`
        <div class="col-12 mb-2">
            <div class="text-white rounded py-2 px-3">
                <input type="checkbox" class="custom-control-input category-filter-download" id="all-cat" value="">
                <label class="custom-control-label" for="all-cat">
                    Semua Kategori
                </label>
            </div>
        </div>`,a=e.map(t=>`
            <div class="col-6 col-md-4 mb-2">
                <div class="text-white rounded py-2 px-3">
                    <input type="checkbox" class="custom-control-input category-filter-download" 
                           id="cat-${t.id}" value="${t.id}">
                    <label class="custom-control-label" for="cat-${t.id}">
                        ${t.name}
                    </label>
                </div>
            </div>`).join("");return`<div class="row font-poppins">${s}${a}</div>`}function ne(e){return e.length===0&&$("#type-menu-item-label").hide(),`<li class="nav-item font-poppins">${e.map(a=>`
                <a class="nav-link text-white type-filter d-flex align-items-center justify-content-start" 
                href="#" data-id="${a.id}">
                    <img src="${a.thumbnail?`/storage/${a.thumbnail}`:"dist/img/product/1.webp"}"
                        alt="${a.name}"
                        class="mr-2 img-thumbnail"
                        style="width:6.5rem;height:6.5rem;object-fit:contain;">
                    <span class="text-capitalize">${a.name}</span>
                </a>
            `).join("")}</li>`}function D(e,s=!0){var l,d,p;const a=e.category??[],t=(l=e.jenis)==null?void 0:l.name,n=o.firstLoad&&(((d=e.types)==null?void 0:d.length)??0)>0,i=(((p=e.category)==null?void 0:p.length)??0)>0;A({selectedJenis:o.selectedJenis,hasCategory:i,isRenderTypes:n}),a.length===0?$("#category-container").addClass("d-none"):$("#category-container").removeClass("d-none"),ae(t);const r=te(a,o.version),c=oe(a),u=ne(e.types??[]);s?$("#category-menu-item, #category-menu-item-modal").html("tidak ada kategori"):($("#category-menu-item, #category-menu-item-modal").html(r),$("#type-menu-item, #type-menu-item-modal").html(u),$("#pdf-catalog").html(c)),!o.category&&a.length>0?(o.category=a[0].id,j(),setTimeout(()=>{w()},200)):o.category&&$(`.category-filter[data-id="${o.category}"]`).addClass("active"),o.type&&$(`.type-filter[data-id="${o.type}"]`).addClass("active")}function _(e,s,a,t=!1){if(s==null)return;e.forEach(l=>{l.images&&l.images.forEach(d=>{d.path&&a.add(d.path)}),l.path&&a.add(l.path)});const n=Array.from(a),i=$("#mockup-carousel-inner"),r=$("#mockup-carousel-indicators"),c=["https://www.youtube.com/embed/BiiUrYAbL9s?autoplay=1&mute=1&rel=0&controls=0&amp;loop=1&playlist=BiiUrYAbL9s"],u=[];for(let l=1;l<=6;l++)l!==2&&u.push(`/dist/img/wpc/${l}.webp?v=${Date.now()}`);if(i.empty(),r.empty(),s==4){$("#mockup-carousel").carousel({interval:!1}),$("#mockup .carousel-control-next").addClass("d-none"),$("#mockup .carousel-control-prev").addClass("d-none"),c.forEach((l,d)=>{i.append(`
            <div class="carousel-item ${d===0?"active":""}">
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
        `)}),$("#mockup").removeClass("d-none");return}else if(s==3&&t){$("#mockup-carousel").carousel({interval:3e3}),$("#mockup .carousel-control-next").removeClass("d-none"),$("#mockup .carousel-control-prev").removeClass("d-none"),u.forEach((l,d)=>{i.append(`
            <div class="carousel-item ${d===0?"active":""}">
                <div class="d-flex justify-content-center align-items-center">
                    <img src="${l}" 
                        alt="mockup" 
                        class="img-fluid w-100 rounded-3 d-block mx-auto mockup-image"
                    >
                </div>
            </div>
        `),r.append(`
            <li data-bs-target="#mockup-carousel" data-bs-slide-to="${d}" ${d===0?'class="active"':""}></li>
        `)}),$("#mockup").removeClass("d-none");return}n.length>0?(n.length===1?($("#mockup .carousel-control-next").addClass("d-none"),$("#mockup .carousel-control-prev").addClass("d-none"),r.addClass("d-none")):($("#mockup .carousel-control-next").removeClass("d-none"),$("#mockup .carousel-control-prev").removeClass("d-none"),r.removeClass("d-none")),n.forEach((l,d)=>{i.append(`
                <div class="carousel-item ${d===0?"active":""}">
                    <img src="/storage/${l}" alt="mockup" 
                        class="img-fluid w-100 rounded-lg d-block mx-auto mockup-image"
                    >
                </div>
            `),r.append(`
                <li data-target="#mockup-carousel" data-slide-to="${d}" ${d===0?'class="active"':""}></li>
            `)}),$("#mockup").removeClass("d-none")):$("#mockup").addClass("d-none")}function H(e,s=!0){var i,r,c;const a=e.data.data[0],t=((r=(i=a==null?void 0:a.category)==null?void 0:i.type)==null?void 0:r.images)??[],n=((c=a==null?void 0:a.category)==null?void 0:c.images)??[];t.length>0?_(t,o.selectedJenis,o.uniquePaths,s):n.length>0?_(n,o.selectedJenis,o.uniquePaths,s):o.selectedJenis==3?_([],o.selectedJenis,o.uniquePaths,s):o.selectedJenis==4?_([],o.selectedJenis,o.uniquePaths,s):$("#mockup").addClass("d-none")}function se(e,s,a){$("#btn-download").removeClass("d-none");let t="";e.forEach(n=>{var h,y,b,k,C,x,L,f,P,M,K,q,E,R,B,I,N;const i=Z(((y=(h=n==null?void 0:n.product_versions)==null?void 0:h[0])==null?void 0:y.images)??[]),r=i.length?i[0]:"https://via.placeholder.com/300x200?text=No+Image";let c=i,u=((k=(b=n.category)==null?void 0:b.type)==null?void 0:k.thumbnail)??"";u&&!u.startsWith("http")&&(u=`storage/${u.replace(/^\/?storage\//,"")}`,c.push(u));const l=JSON.stringify(c).replace(/"/g,"&quot;"),d=JSON.stringify(n.packages).replace(/"/g,"&quot;"),p=((C=n.category)==null?void 0:C.name)??"Tanpa Kategori",g=((x=n.product_versions.find(U=>U.version_id==a))==null?void 0:x.name)??"Tanpa Nama";((L=n.category)==null?void 0:L.display_style)==="square"||s===null?t+=`
                    <div class="col-md-2 col-6 mb-4">
                        <div class="h-100 product-card"
                    `:((f=n.category)==null?void 0:f.display_style)==="rectangle"?t+=`
                    <div class="col-md-4 col-6 mb-4">
                        <div class="h-100 product-card"
                    `:t+=`
                    <div class="col-md-2 col-6 mb-4">
                        <div class="h-100 product-card d-flex flex-column justify-content-center align-items-center"
                    `;const v=((P=n.category)==null?void 0:P.display_style)==="rectangle",m=JSON.stringify(n.specifications).replace(/"/g,"&quot;");t+=`
                    data-id="${n.id}"
                    data-code="${n.code}"
                    data-name="${g}"
                    data-category="${p}"
                    data-jenis="${((K=(M=n.category)==null?void 0:M.jenis)==null?void 0:K.name)??""}"
                    data-images="${l}"
                    data-image="${r}"
                    data-type="${((E=(q=n.category)==null?void 0:q.type)==null?void 0:E.name)??""}"
                    data-type-image="${((B=(R=n.category)==null?void 0:R.type)==null?void 0:B.image)??""}"
                    data-url="${n.url_video}"
                    data-paket="${d}"
                    data-specifications = "${m}"
                    >
                       <img 
                            src="${r}" 
                            class="card-img-top" 
                            alt="${n.name}" 
                            style="
                                border : 1px solid #2c2c2c;
                                min-height: 10rem;
                                height: auto; 
                                border-radius: 8px;
                                width: 100%; 
                                object-fit: cover; 
                                object-position: ${((N=(I=n.category)==null?void 0:I.jenis)==null?void 0:N.name)==="PVC Board"?"bottom center":"center center"};
                                aspect-ratio: ${v?"16/9":"1/1"};
                            "
                        >
                        <div class="card-body d-flex flex-column text-center">
                            <h4 class="card-title font-weight-bold text-uppercase mb-2">
                                ${g}
                            </h4>
                            <h6 class="card-text text-muted mb-1">${p}</h6>
                        </div>
                    </div>
                </div>`}),$("#product-list .row").append(t)}function w(){if(o.isLoading||o.lastPage)return Promise.resolve();o.isLoading=!0,X();const e=$("#search-input").val(),s={page:o.currentPage,search:e,jenis:o.selectedJenis,category:o.category,type:o.type,version:o.version};return Y(s).done(ie).always(()=>{o.isLoading=!1,Q(),o.currentRequest=null})}function ie(e){const s=e.data.data??[],a=e.types??[],t=e.active_version_id;if(o.type&&($("#backButton").removeClass("d-none"),$("#homeButton").addClass("d-none")),o.version==null){const n=$("#version-select option:first").val();n&&(o.version=n)}o.selectedJenis&&o.firstLoad&&a.length>0?($("#search-form").addClass("d-none"),$("#downloadButton").addClass("d-none"),$("#version-filter").addClass("d-none"),a.length>0&&(ee(a,o.selectedJenis),o.lastPage=!0),D(e,!0),H(e,!0)):($("#search-form").removeClass("d-none"),$("#downloadButton").removeClass("d-none"),$("#version-filter").removeClass("d-none"),s.length>0?(se(s,o.selectedJenis,t),o.currentPage++,o.currentPage>e.data.last_page&&(o.lastPage=!0)):(o.currentPage===1&&($("#mockup").addClass("d-none"),$("#product-list .row").append(`<div class="col-12"><img src="dist/img/no-data.png" alt="no-data"
                     class="img-fluid mx-auto d-block" style="max-width:100%;height:auto;margin:100px 0;"></div>`)),o.lastPage=!0),D(e,!1),H(e,!1))}let T=!1;function le(e){$(document).off("click",".category-filter"),$(document).on("click",".category-filter",async function(s){if(s.preventDefault(),T)return;T=!0;const a=$(this).data("id"),t=$(this).data("type"),n=$(this).data("version");try{V({selectedJenis:e,category:a,type:t,version:n}),$("#filterModal").modal("hide"),j(),await w(!1)}catch(i){console.error("Gagal memuat data:",i)}finally{T=!1}}),$(document).off("click",".type-filter"),$(document).on("click",".type-filter",async function(s){if(s.preventDefault(),T)return;T=!0;const a=$(this).data("id");try{V({selectedJenis:e,type:a}),$("#filterModal").modal("hide"),j(),await w(!1)}catch(t){console.error("Gagal memuat data:",t)}finally{T=!1}})}function de(){$("#version-select").on("change",function(){const e=$(this).val()||null;o.version=e,j(),w()})}function S(e,s="#modalVariants"){$(s).empty(),$("#modalPaket").empty(),$("#modalKepadatan").empty(),Array.isArray(e)&&e.length>0?e.forEach(a=>{const t=a.specification_values||[],n=a.name.toLowerCase();if(n==="warna")$("#paket").text("Warna"),t.length>0?t.forEach(i=>{a.pivot&&i.id===a.pivot.specification_value_id&&$("#modalPaket").append(`
                                <span class="badge badge-outline-primary px-2 py-1 kepadatan" data-value="${i.name}">
                                    ${i.name}
                                </span>
                            `)}):$("#modalPaket").append('<span class="text-muted">Tidak ada data</span>');else if(n==="density")t.length>0?t.forEach(i=>{a.pivot&&i.id===a.pivot.specification_value_id&&(t.length>1?$("#modalKepadatan").append(`
                                    <span class="badge badge-outline-primary px-2 py-1 kepadatan" data-value="${i.name}">
                                        ${i.name}
                                    </span>
                                `):$("#modalKepadatan").append(i.name))}):$("#modalKepadatan").append('<span class="text-muted">Tidak ada data</span>');else{const i=t.find(l=>a.pivot&&l.id===a.pivot.specification_value_id),r=i?i.name:"-";let c=i?i.unit:"";c?c=" "+c:["panjang","tinggi","lebar"].includes(n)?c=" cm":n==="ketebalan"&&(c=" mm");const u=`
                    <div class="row mb-1 variant-row">
                        <div class="col-4 col-sm-3 font-weight-bold">${a.name}</div>
                        <div class="col-auto">:</div>
                        <div class="col">${r}${c}</div>
                    </div>
                `;$(s).append(u)}}):($(s).append('<div class="text-muted">Tidak ada varian</div>'),$(".paket").hide())}$(document).ready(function(){const e=new URLSearchParams(window.location.search),s=e.get("jenis"),a=e.get("version"),t=e.get("category");let n,i,r=!1;le(s),W(),G(),z(),de();function c(l){$.ajax({url:`/products/${l}/viewed`,method:"POST",headers:{"X-CSRF-TOKEN":$('meta[name="csrf-token"]').attr("content")},success:d=>console.log("View recorded:",d),error:d=>console.error(d)})}function u(l,d=[],p=""){$("#carousel-product-image").empty(),$("#thumbnailGallery").empty();let g=l||[];(p==null?void 0:p.toLowerCase())==="uv board"&&d.length&&(g=[...l,...d]);const v=new IntersectionObserver(h=>{h.forEach(y=>{if(y.isIntersecting){const b=$(y.target);b.attr("src",b.data("src")),v.unobserve(y.target)}})},{rootMargin:"100px"});g.forEach((h,y)=>{const b=y===0?"active":"";$("#carousel-product-image").append(`
                <div class="carousel-item ${b}">
                    <img data-src="${h}" 
                        src="/dist/img/placeholder.webp"
                        class="img-fluid d-block mx-auto lazy-modal-img"
                        style="width:100%;max-width:400px;aspect-ratio:1/1;object-fit:cover;border-radius:8px;border:1px solid #ccc;">
                </div>
            `),$("#thumbnailGallery").append(`
                <div class="col-2 mb-0 d-flex justify-content-center">
                    <div style="height:90%">
                        <img 
                            data-src="${h}" 
                            src="/dist/img/placeholder.webp" 
                            class="img-thumbnail thumbnail-image lazy-modal-img p-0 w-100 h-100"
                            style="aspect-ratio:1/1;border:1px solid #ccc;border-radius:8px;object-fit:cover;cursor:pointer;"
                            data-index="${y}"
                        >
                    </div>
                </div>
            `)}),$(".lazy-modal-img").each(function(){v.observe(this)}),g.length<=1?$("#carouselProduct .carousel-control-next, #carouselProduct .carousel-control-prev").addClass("d-none"):$("#carouselProduct .carousel-control-next, #carouselProduct .carousel-control-prev").removeClass("d-none"),$("#carouselProduct").carousel({interval:3e3,pause:!1});let m;$("#thumbnailGallery").off("click").on("click",".thumbnail-image",function(){const h=$(this).data("index");$("#carouselProduct").carousel(h),$(".thumbnail-image").removeClass("active-thumbnail"),$(this).addClass("active-thumbnail"),setTimeout(()=>$(this).removeClass("active-thumbnail"),500),$("#carouselProduct").carousel("pause"),clearTimeout(m),m=setTimeout(()=>{$("#carouselProduct").carousel("cycle")},7e3)})}V({selectedJenis:s,category:t,version:a}),w(),A({selectedJenis:s,hasCategory:t,isRenderTypes:!1}),$(window).on("resize",()=>A({selectedJenis:s,hasCategory:t,isRenderTypes:!1})),$("#search-input").on("input",function(){clearTimeout(n),n=setTimeout(()=>{j(),w()},500)}),$(window).on("scroll",function(){clearTimeout(i),i=setTimeout(async()=>{if(r||F())return;const l=$(window).scrollTop(),d=$(window).height(),p=$(document).height();if(l+d>=p-150){r=!0;try{O(!1),await w()}finally{r=!1}}},200)}),$(document).off("click",".product-card").on("click",".product-card",function(){const l=$(this).data("id"),d=$(this).data("code"),p=$(this).data("name"),g=$(this).data("category"),v=$(this).data("type"),m=$(this).data("jenis"),h=$(this).data("url"),y=$(this).attr("data-images");let b=$(this).data("type-image");const k=JSON.parse($(this).attr("data-specifications")||"[]"),C=JSON.parse($(this).attr("data-paket")||"[]");let x=[],L=[];if(m!=="card-types"&&c(l),y)try{x=JSON.parse(y.replace(/&quot;/g,'"'))}catch(f){x=[],console.error(f)}if(Array.isArray(C)&&(L=C.sort((f,P)=>f.order-P.order).map(f=>`/storage/${f.image}`)),$("#notes").show(),$("#modalPaket").empty(),m==="card-types"){j(),V({selectedJenis:s,type:v}),O(!1),w();return}m.toLowerCase()==="uv board"&&(S(k),$("#modalVideo, .lebar").hide(),$("#modalCategory").text(g),C.length>0?C.sort((f,P)=>f.order-P.order).map(f=>{$("#modalPaket").append(`
                        <span class="badge badge-outline-primary px-2 py-1 kepadatan" data-value="${f.name}">${f.name}</span>
                    `)}):($("#modalPaket").append('<span class="text-muted">Tidak ada paket</span>'),$("#notes").hide())),m.toLowerCase()==="wallboard"&&(S(k),$("#modalCategory").text(g),$("#ketebalan, .density, #notes, .paket,  #modalVideo, .lebar").hide()),m==="PVC Board"&&(S(k),$("#modalCategory").text(m),$("#modalVideo, .lebar, .paket").hide()),m==="Wallpanel"&&(S(k),$("#modalContact").data("type",v),$("#modalCategory").text(g+" / "+v),$("#ketebalan, #kepadatan, .paket, #modalVideo, #notes, .density").hide(),$("#modalGrafis").attr("src",`/storage/${b}`),$(".grafis").removeClass("d-none")),m.toLowerCase()==="aksesoris"&&($("#tinggi, #ketebalan, #kepadatan, .lebar, .density").hide(),$("#modalCategory").text(g),S(k),$("#modalVideoPlayer").empty(),$("#modalVideo, .density").hide(),h&&($("#modalVideoPlayer").append(`
                    <iframe class="embed-responsive-item"
                    src="${h}"
                    title="YouTube video player" frameborder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; web-share;"
                    referrerpolicy="strict-origin-when-cross-origin"
                    allowfullscreen></iframe>
                `),$("#modalVideo").show())),u(x,L,m),$("#modalName").text(p),$("#productModalLabel").text(p),$("#productModal").modal("show"),$("#modalContact").data({jenis:m,category:g,code:d,type:v}),$(".kepadatan").removeClass("active"),$("#modalContact").data({kepadatan:null,paket:null}),$(".modalContact").prop("disabled",$(".kepadatan").length>0)}),$(document).on("click",".kepadatan",function(){$(".modalContact").prop("disabled",!1);const l=$(this).data("value");$(this).closest("#productModal").find(".kepadatan").removeClass("active"),$(this).addClass("active"),$("#notes").hide(),$("#modalContact").data("kepadatan",l)})});
