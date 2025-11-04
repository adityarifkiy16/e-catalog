function U(){$("#loading").removeClass("d-none")}function W(){$("#loading").addClass("d-none")}function D(t=[]){if(!Array.isArray(t))return[];const s={thumbnail:3,motif:2,product:1};return t.slice().sort((a,e)=>(s[e.type]||0)-(s[a.type]||0)).map(a=>"/storage/"+a.path)}function E(){$(document).off("click","#btn-download").on("click","#btn-download",function(t){t.preventDefault();const s=$(".category-filter-download:checked").map(function(){return $(this).val()}).get().filter(p=>p!==""),a=new URLSearchParams(window.location.search).get("jenis"),e=$("#version-select").val();if(!e){alert("Silakan pilih versi terlebih dahulu.");return}let i=new URLSearchParams;s.length>0&&s.forEach(p=>i.append("category[]",p)),a&&i.append("jenis_id",a),e&&i.append("version_id",e);const n=`/catalog/pdf?${i.toString()}`;window.location.href=n})}function O(){$(document).off("click",".modalContact").on("click",".modalContact",function(t){t.preventDefault(),console.log("Klik tombol order",$(this).data("code"));const s="62816659688",a=$(this).data("jenis");console.log(a.toLowerCase());let e="";a.toLowerCase()=="wallpanel"?e=`Halo Admin,
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

Apakah produk ini masih tersedia? Terima kasih.`,window.open(`https://wa.me/${s}?text=${encodeURIComponent(e)}`,"_blank")})}function B(){$(window).scroll(function(){$(this).scrollTop()>100?$("#btn-scroll-top").fadeIn():$("#btn-scroll-top").fadeOut()}),$("#btn-scroll-top").click(function(){return $("html, body").animate({scrollTop:0},500),!1})}function Y(t,s){$("#btn-download").removeClass("d-none");let a="";t.forEach(e=>{var g,d,f,v,P,k,y,T,b,S,J,C,L,u;const i=D(((d=(g=e==null?void 0:e.product_versions)==null?void 0:g[0])==null?void 0:d.images)??[]),n=i.length?i[0]:"https://via.placeholder.com/300x200?text=No+Image",h=JSON.stringify(i).replace(/"/g,"&quot;"),c=JSON.stringify(e.packages).replace(/"/g,"&quot;"),l=((f=e.category)==null?void 0:f.name)??"Tanpa Kategori";((v=e.category)==null?void 0:v.display_style)==="square"||s===null?a+=`
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
                    data-category="${l}"
                    data-jenis="${((T=(y=e.category)==null?void 0:y.jenis)==null?void 0:T.name)??""}"
                    data-images="${h}"
                    data-image="${n}"
                    data-type="${((S=(b=e.category)==null?void 0:b.types)==null?void 0:S.name)??""}"
                    data-type-image="${((C=(J=e.category)==null?void 0:J.types)==null?void 0:C.image)??""}"
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
                                object-position: ${((u=(L=e.category)==null?void 0:L.jenis)==null?void 0:u.name)==="PVC Board"?"bottom center":"center center"};
                                aspect-ratio: ${r?"16/9":"1/1"};
                            "
                        >
                        <div class="card-body d-flex flex-column text-center">
                            <h4 class="card-title font-weight-bold text-uppercase mb-2">
                                ${e.name}
                            </h4>
                            <h6 class="card-text text-muted mb-1">${l}</h6>
                        </div>
                    </div>
                </div>`}),$("#product-list .row").append(a)}function z(t,s){$("#btn-download").addClass("d-none");let a="";t.forEach(e=>{const i=e.thumbnail?`/storage/${e.thumbnail}`:"https://via.placeholder.com/300x200?text=No+Image",n=s==3?"wallpanel":"tanpa kategori";a+=`
                    <div class="col-md-2 col-6 mb-4">
                        <div class="h-100 product-card d-flex flex-column justify-content-center align-items-center"
                    `,a+=`
                    data-id="${e.id}"
                    data-jenis="card-types"
                    data-category="${n}"
                    data-type="${e.id}"
                    >
                       <img 
                            src="${i}" 
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
                </div>`}),$("#product-list .row").append(a)}function K(t,s,a,e=!1){if(s==null)return;t.forEach(l=>{l.images&&l.images.forEach(r=>{r.path&&a.add(r.path)}),l.path&&a.add(l.path)});const i=Array.from(a),n=$("#mockup-carousel-inner"),p=$("#mockup-carousel-indicators"),h=["https://www.youtube.com/embed/BiiUrYAbL9s?autoplay=1&mute=1&rel=0&controls=0&amp;loop=1&playlist=BiiUrYAbL9s"],c=[];for(let l=1;l<=6;l++)l!==2&&c.push(`/dist/img/wpc/${l}.webp?v=${Date.now()}`);if(n.empty(),p.empty(),s==4){$("#mockup-carousel").carousel({interval:!1}),$("#mockup .carousel-control-next").addClass("d-none"),$("#mockup .carousel-control-prev").addClass("d-none"),h.forEach((l,r)=>{n.append(`
            <div class="carousel-item ${r===0?"active":""}">
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
        `)}),$("#mockup").removeClass("d-none");return}else if(s==3&&e){$("#mockup-carousel").carousel({interval:3e3}),$("#mockup .carousel-control-next").removeClass("d-none"),$("#mockup .carousel-control-prev").removeClass("d-none"),c.forEach((l,r)=>{n.append(`
            <div class="carousel-item ${r===0?"active":""}">
                <div class="d-flex justify-content-center align-items-center">
                    <img src="${l}" 
                        alt="mockup" 
                        class="img-fluid w-100 rounded-3 d-block mx-auto mockup-image"
                    >
                </div>
            </div>
        `),p.append(`
            <li data-bs-target="#mockup-carousel" data-bs-slide-to="${r}" ${r===0?'class="active"':""}></li>
        `)}),$("#mockup").removeClass("d-none");return}i.length>0?(i.length===1?($("#mockup .carousel-control-next").addClass("d-none"),$("#mockup .carousel-control-prev").addClass("d-none"),p.addClass("d-none")):($("#mockup .carousel-control-next").removeClass("d-none"),$("#mockup .carousel-control-prev").removeClass("d-none"),p.removeClass("d-none")),i.forEach((l,r)=>{n.append(`
                <div class="carousel-item ${r===0?"active":""}">
                    <img src="/storage/${l}" alt="mockup" 
                        class="img-fluid w-100 rounded-lg d-block mx-auto mockup-image"
                    >
                </div>
            `),p.append(`
                <li data-target="#mockup-carousel" data-slide-to="${r}" ${r===0?'class="active"':""}></li>
            `)}),$("#mockup").removeClass("d-none")):$("#mockup").addClass("d-none")}let _=!1;function F(t){$(document).off("click",".category-filter"),$(document).on("click",".category-filter",async function(s){if(s.preventDefault(),_)return;_=!0;const a=$(this).data("id"),e=$(this).data("type");try{R({selectedJenis:t,category:a,type:e}),$("#filterModal").modal("hide"),V(),await w(!1)}catch(i){console.error("Gagal memuat data:",i)}finally{_=!1}})}function x(t,s="#modalVariants"){$(s).empty(),$("#modalPaket").empty(),$("#modalKepadatan").empty(),Array.isArray(t)&&t.length>0?t.forEach(a=>{const e=a.specification_values||[],i=a.name.toLowerCase();if(i==="warna")$("#paket").text("Warna"),e.length>0?e.forEach(n=>{a.pivot&&n.id===a.pivot.specification_value_id&&$("#modalPaket").append(`
                                <span class="badge badge-outline-primary px-2 py-1 kepadatan" data-value="${n.name}">
                                    ${n.name}
                                </span>
                            `)}):$("#modalPaket").append('<span class="text-muted">Tidak ada data</span>');else if(i==="density")e.length>0?e.forEach(n=>{a.pivot&&n.id===a.pivot.specification_value_id&&(e.length>1?$("#modalKepadatan").append(`
                                    <span class="badge badge-outline-primary px-2 py-1 kepadatan" data-value="${n.name}">
                                        ${n.name}
                                    </span>
                                `):$("#modalKepadatan").append(n.name))}):$("#modalKepadatan").append('<span class="text-muted">Tidak ada data</span>');else{const n=e.find(l=>a.pivot&&l.id===a.pivot.specification_value_id),p=n?n.name:"-";let h=n?n.unit:"";h?h=" "+h:["panjang","tinggi","lebar"].includes(i)?h=" cm":i==="ketebalan"&&(h=" mm");const c=`
                    <div class="row mb-1 variant-row">
                        <div class="col-4 col-sm-3 font-weight-bold">${a.name}</div>
                        <div class="col-auto">:</div>
                        <div class="col">${p}${h}</div>
                    </div>
                `;$(s).append(c)}}):($(s).append('<div class="text-muted">Tidak ada varian</div>'),$(".paket").hide())}function G(){$("#version-select").on("change",function(){const t=$(this).val()||null;o.version=t,V(),w()})}function q({selectedJenis:t=null,hasCategory:s=!1,isRenderTypes:a=!1}){const e=$("#filter-container"),i=$("#category-container"),n=$("#catalog-col"),p=$(window).width()<768;if(e.removeClass("d-none"),i.removeClass("d-none"),n.removeClass("col-md-12 col-md-9"),a){e.addClass("d-none"),i.addClass("d-none"),n.addClass("col-md-12");return}if(t==1){e.addClass("d-none"),i.addClass("d-none"),n.addClass("col-md-12");return}if(!s){e.addClass("d-none"),i.addClass("d-none"),n.addClass("col-md-12");return}p?(e.addClass("d-none"),i.removeClass("d-none")):(e.removeClass("d-none"),i.removeClass("d-none")),n.addClass("col-md-9")}$(document).ready(function(){const t=new URLSearchParams(window.location.search),s=t.get("jenis");t.get("version");const a=t.get("category");let e,i,n=!1;R({selectedJenis:s,category:a}),w(),q({selectedJenis:s,hasCategory:a,isRenderTypes:!1}),$(window).on("resize",()=>q({selectedJenis:s,hasCategory:a,isRenderTypes:!1})),$("#search-input").on("input",function(){clearTimeout(e),e=setTimeout(()=>{V(),w()},500)}),$(window).on("scroll",function(){clearTimeout(i),i=setTimeout(async()=>{if(n||H())return;const c=$(window).scrollTop(),l=$(window).height(),r=$(document).height();if(c+l>=r-150){n=!0;try{M(!1),await w()}finally{n=!1}}},200)});function p(c,l=[],r=""){$("#carousel-product-image").empty(),$("#thumbnailGallery").empty();let m=c||[];(r==null?void 0:r.toLowerCase())==="uv board"&&l.length&&(m=[...c,...l]),m.forEach((d,f)=>{const v=f===0?"active":"";$("#carousel-product-image").append(`
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
            `)}),m.length<=1?$("#carouselProduct .carousel-control-next, #carouselProduct .carousel-control-prev").addClass("d-none"):$("#carouselProduct .carousel-control-next, #carouselProduct .carousel-control-prev").removeClass("d-none"),$("#carouselProduct").carousel({interval:3e3,pause:!1});let g;$("#thumbnailGallery").off("click").on("click",".thumbnail-image",function(){const d=$(this).data("index");$("#carouselProduct").carousel(d),$(".thumbnail-image").removeClass("active-thumbnail"),$(this).addClass("active-thumbnail"),setTimeout(()=>$(this).removeClass("active-thumbnail"),500),$("#carouselProduct").carousel("pause"),clearTimeout(g),g=setTimeout(()=>{$("#carouselProduct").carousel("cycle")},5e3)})}$(document).off("click",".product-card").on("click",".product-card",function(){const c=$(this).data("id"),l=$(this).data("code"),r=$(this).data("name"),m=$(this).data("category"),g=$(this).data("type"),d=$(this).data("jenis"),f=parseInt($(this).data("length"),10),v=parseFloat($(this).data("width")).toFixed(1),P=parseFloat($(this).data("density")).toFixed(1),k=$(this).data("url"),y=JSON.parse($(this).attr("data-specifications")||"[]"),T=$(this).attr("data-images"),b=JSON.parse($(this).attr("data-paket")||"[]");let S=$(this).data("height"),J=$(this).data("type-image"),C=[],L=[];if(d!=="card-types"&&h(c),T)try{C=JSON.parse(T.replace(/&quot;/g,'"'))}catch(u){C=[],console.error(u)}if(Array.isArray(b)&&(L=b.sort((u,j)=>u.order-j.order).map(u=>`/storage/${u.image}`)),$("#notes").show(),$("#modalPaket").empty(),d==="card-types"){V(),R({selectedJenis:s,type:g}),M(!1),w();return}d.toLowerCase()==="uv board"&&(x(y),$("#modalVideo, .lebar").hide(),$("#modalCategory").text(m),b.length>0?b.sort((u,j)=>u.order-j.order).map(u=>{$("#modalPaket").append(`
                        <span class="badge badge-outline-primary px-2 py-1 kepadatan" data-value="${u.name}">${u.name}</span>
                    `)}):($("#modalPaket").append('<span class="text-muted">Tidak ada paket</span>'),$("#notes").hide())),d.toLowerCase()==="wallboard"&&(x(y),$("#modalCategory").text(m),$("#ketebalan, .density, #notes, .paket,  #modalVideo, .lebar").hide()),d==="PVC Board"&&(x(y),$("#modalCategory").text(d),$("#modalVideo, .lebar, .paket").hide()),d==="Wallpanel"&&(x(y),$("#modalContact").data("type",g),$("#modalCategory").text(m+" / "+g),$("#ketebalan, #kepadatan, .paket, #modalVideo, #notes, .density").hide(),$("#modalGrafis").attr("src",`/storage/${J}`),$(".grafis").removeClass("d-none")),d.toLowerCase()==="aksesoris"&&($("#tinggi, #ketebalan, #kepadatan, .lebar, .density").hide(),$("#modalCategory").text(m),x(y),$("#modalVideoPlayer").empty(),$("#modalVideo, .density").hide(),k&&($("#modalVideoPlayer").append(`
                    <iframe class="embed-responsive-item"
                    src="${k}"
                    title="YouTube video player" frameborder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; web-share;"
                    referrerpolicy="strict-origin-when-cross-origin"
                    allowfullscreen></iframe>
                `),$("#modalVideo").show())),p(C,L,d),$("#modalName").text(r),$("#productModalLabel").text(r),$("#productModal").modal("show"),$("#modalContact").data({jenis:d,category:m,code:l,length:f,width:v,height:S,density:P,type:g}),$(".kepadatan").removeClass("active"),$("#modalContact").data({kepadatan:null,paket:null}),$(".modalContact").prop("disabled",$(".kepadatan").length>0)}),$(document).on("click",".kepadatan",function(){$(".modalContact").prop("disabled",!1);const c=$(this).data("value");$(this).closest("#productModal").find(".kepadatan").removeClass("active"),$(this).addClass("active"),$("#notes").hide(),$("#modalContact").data("kepadatan",c)}),F(s),E(),O(),B(),G();function h(c){$.ajax({url:`/products/${c}/viewed`,method:"POST",headers:{"X-CSRF-TOKEN":$('meta[name="csrf-token"]').attr("content")},success:l=>console.log("View recorded:",l),error:l=>console.error(l)})}});let o={selectedJenis:null,category:null,type:null,currentPage:1,isLoading:!1,lastPage:!1,firstLoad:!0,currentRequest:null,uniquePaths:new Set,version:null};function M(t){o.firstLoad=t}function R(t){o.selectedJenis=t.selectedJenis,o.category=t.category??null,o.type=t.type??null,o.version=t.version??null}function H(){return o.isLoading}function V(){o.currentPage=1,o.isLoading=!1,o.lastPage=!1,o.uniquePaths.clear(),$("#product-list .row").html("")}function w(){if(o.isLoading||o.lastPage)return Promise.resolve();o.isLoading=!0,U();const t=$("#search-input").val();o.currentRequest&&o.currentRequest.readyState!==4&&o.currentRequest.abort();const s={page:o.currentPage,search:t,jenis:o.selectedJenis,category:o.category,type:o.type,version:o.version};return o.currentRequest=$.ajax({url:"/catalog",type:"GET",data:s}),new Promise((a,e)=>{o.currentRequest.done(i=>X(i)).fail((i,n)=>{n!=="abort"&&(console.error("Gagal memuat data."),e())}).always(()=>{o.isLoading=!1,W(),o.currentRequest=null}).then(a)})}function X(t){const s=t.data.data??[],a=t.types??[];if(o.type&&($("#backButton").removeClass("d-none"),$("#homeButton").addClass("d-none")),console.log("state.version",o.version),console.log("state.type",o.type),o.version==null){const e=$("#version-select option:first").val();e&&(o.version=e)}o.selectedJenis&&o.firstLoad&&a.length>0?($("#search-form").addClass("d-none"),$("#version-filter").addClass("d-none"),a.length>0&&(z(a,o.selectedJenis),o.lastPage=!0),I(t,!0)):($("#search-form").removeClass("d-none"),$("#version-filter").removeClass("d-none"),s.length>0?(Y(s,o.selectedJenis),o.currentPage++,o.currentPage>t.data.last_page&&(o.lastPage=!0)):(o.currentPage===1&&($("#mockup").addClass("d-none"),$("#product-list .row").append(`<div class="col-12"><img src="dist/img/no-data.png" alt="no-data"
                     class="img-fluid mx-auto d-block" style="max-width:100%;height:auto;margin:100px 0;"></div>`)),o.lastPage=!0),I(t,!1))}function I(t,s=!0){var r,m,g,d,f,v,P,k;const a=t.category??[],e=((g=(m=(r=t.data.data[0])==null?void 0:r.category)==null?void 0:m.types)==null?void 0:g.images)??[],i=(d=t.jenis)==null?void 0:d.name,n=((v=(f=t.data.data[0])==null?void 0:f.category)==null?void 0:v.images)??[],p=o.firstLoad&&(((P=t.types)==null?void 0:P.length)??0)>0,h=(((k=t.category)==null?void 0:k.length)??0)>0;q({selectedJenis:o.selectedJenis,hasCategory:h,isRenderTypes:p}),a.length===0?$("#category-container").addClass("d-none"):($("#category-container").removeClass("d-none"),e.length>0?K(e,o.selectedJenis,o.uniquePaths,s):n.length>0?K(n,o.selectedJenis,o.uniquePaths,s):o.selectedJenis==3?K([],o.selectedJenis,o.uniquePaths,s):o.selectedJenis==4?K([],o.selectedJenis,o.uniquePaths,s):$("#mockup").addClass("d-none")),ee(i);const c=Z(a),l=Q(a);s?$("#category-menu-item, #category-menu-item-modal").html("tidak ada kategori"):($("#category-menu-item, #category-menu-item-modal").html(c),$("#pdf-catalog").html(l)),!o.category&&a.length>0?(o.category=a[0].id,V(),setTimeout(()=>{w()},200)):o.category&&$(`.category-filter[data-id="${o.category}"]`).addClass("active")}function A(t){$("#category-menu-item-label, #category-modal-item-label").html(t)}function Q(t){if(t.length===0)return`
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
        </div>`,a=t.map(e=>`
            <div class="col-6 col-md-4 mb-2">
                <div class="text-white rounded py-2 px-3">
                    <input type="checkbox" class="custom-control-input category-filter-download" 
                           id="cat-${e.id}" value="${e.id}">
                    <label class="custom-control-label" for="cat-${e.id}">
                        ${e.name}
                    </label>
                </div>
            </div>`).join("");return`<div class="row font-poppins">${s}${a}</div>`}function Z(t){return t.length===0?`
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
            </a>`).join("")}</li>`}function ee(t){const s={"PVC Board":()=>{$("#category-container").addClass("d-none"),$(".category-modal-container").text("Tidak ada kategori")},Wallboard:()=>A("Motif"),"UV Board":()=>A("Motif"),Wallpanel:()=>A("Motif"),Aksesoris:()=>A("Ukuran"),default:()=>A("Kategori")};(s[t]||s.default)()}function N({selectedJenis:t=null,hasCategory:s=!1,isRenderTypes:a=!1}){const e=$("#filter-container"),i=$("#category-container"),n=$("#catalog-col"),p=$(window).width()<768;if(e.removeClass("d-none"),i.removeClass("d-none"),n.removeClass("col-md-12 col-md-9"),a){e.addClass("d-none"),i.addClass("d-none"),n.addClass("col-md-12");return}if(t==1){e.addClass("d-none"),i.addClass("d-none"),n.addClass("col-md-12");return}if(!s){e.addClass("d-none"),i.addClass("d-none"),n.addClass("col-md-12");return}p?(e.addClass("d-none"),i.removeClass("d-none")):(e.removeClass("d-none"),i.removeClass("d-none")),n.addClass("col-md-9")}$(document).ready(function(){const t=new URLSearchParams(window.location.search),s=t.get("jenis");t.get("version");const a=t.get("category");let e,i,n=!1;R({selectedJenis:s,category:a}),w(),N({selectedJenis:s,hasCategory:a,isRenderTypes:!1}),$(window).on("resize",()=>N({selectedJenis:s,hasCategory:a,isRenderTypes:!1})),$("#search-input").on("input",function(){clearTimeout(e),e=setTimeout(()=>{V(),w()},500)}),$(window).on("scroll",function(){clearTimeout(i),i=setTimeout(async()=>{if(n||H())return;const c=$(window).scrollTop(),l=$(window).height(),r=$(document).height();if(c+l>=r-150){n=!0;try{M(!1),await w()}finally{n=!1}}},200)});function p(c,l=[],r=""){$("#carousel-product-image").empty(),$("#thumbnailGallery").empty();let m=c||[];(r==null?void 0:r.toLowerCase())==="uv board"&&l.length&&(m=[...c,...l]),m.forEach((d,f)=>{const v=f===0?"active":"";$("#carousel-product-image").append(`
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
            `)}),m.length<=1?$("#carouselProduct .carousel-control-next, #carouselProduct .carousel-control-prev").addClass("d-none"):$("#carouselProduct .carousel-control-next, #carouselProduct .carousel-control-prev").removeClass("d-none"),$("#carouselProduct").carousel({interval:3e3,pause:!1});let g;$("#thumbnailGallery").off("click").on("click",".thumbnail-image",function(){const d=$(this).data("index");$("#carouselProduct").carousel(d),$(".thumbnail-image").removeClass("active-thumbnail"),$(this).addClass("active-thumbnail"),setTimeout(()=>$(this).removeClass("active-thumbnail"),500),$("#carouselProduct").carousel("pause"),clearTimeout(g),g=setTimeout(()=>{$("#carouselProduct").carousel("cycle")},5e3)})}$(document).off("click",".product-card").on("click",".product-card",function(){const c=$(this).data("id"),l=$(this).data("code"),r=$(this).data("name"),m=$(this).data("category"),g=$(this).data("type"),d=$(this).data("jenis"),f=parseInt($(this).data("length"),10),v=parseFloat($(this).data("width")).toFixed(1),P=parseFloat($(this).data("density")).toFixed(1),k=$(this).data("url"),y=JSON.parse($(this).attr("data-specifications")||"[]"),T=$(this).attr("data-images"),b=JSON.parse($(this).attr("data-paket")||"[]");let S=$(this).data("height"),J=$(this).data("type-image"),C=[],L=[];if(d!=="card-types"&&h(c),T)try{C=JSON.parse(T.replace(/&quot;/g,'"'))}catch(u){C=[],console.error(u)}if(Array.isArray(b)&&(L=b.sort((u,j)=>u.order-j.order).map(u=>`/storage/${u.image}`)),$("#notes").show(),$("#modalPaket").empty(),d==="card-types"){V(),R({selectedJenis:s,type:g}),M(!1),w();return}d.toLowerCase()==="uv board"&&(x(y),$("#modalVideo, .lebar").hide(),$("#modalCategory").text(m),b.length>0?b.sort((u,j)=>u.order-j.order).map(u=>{$("#modalPaket").append(`
                        <span class="badge badge-outline-primary px-2 py-1 kepadatan" data-value="${u.name}">${u.name}</span>
                    `)}):($("#modalPaket").append('<span class="text-muted">Tidak ada paket</span>'),$("#notes").hide())),d.toLowerCase()==="wallboard"&&(x(y),$("#modalCategory").text(m),$("#ketebalan, .density, #notes, .paket,  #modalVideo, .lebar").hide()),d==="PVC Board"&&(x(y),$("#modalCategory").text(d),$("#modalVideo, .lebar, .paket").hide()),d==="Wallpanel"&&(x(y),$("#modalContact").data("type",g),$("#modalCategory").text(m+" / "+g),$("#ketebalan, #kepadatan, .paket, #modalVideo, #notes, .density").hide(),$("#modalGrafis").attr("src",`/storage/${J}`),$(".grafis").removeClass("d-none")),d.toLowerCase()==="aksesoris"&&($("#tinggi, #ketebalan, #kepadatan, .lebar, .density").hide(),$("#modalCategory").text(m),x(y),$("#modalVideoPlayer").empty(),$("#modalVideo, .density").hide(),k&&($("#modalVideoPlayer").append(`
                    <iframe class="embed-responsive-item"
                    src="${k}"
                    title="YouTube video player" frameborder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; web-share;"
                    referrerpolicy="strict-origin-when-cross-origin"
                    allowfullscreen></iframe>
                `),$("#modalVideo").show())),p(C,L,d),$("#modalName").text(r),$("#productModalLabel").text(r),$("#productModal").modal("show"),$("#modalContact").data({jenis:d,category:m,code:l,length:f,width:v,height:S,density:P,type:g}),$(".kepadatan").removeClass("active"),$("#modalContact").data({kepadatan:null,paket:null}),$(".modalContact").prop("disabled",$(".kepadatan").length>0)}),$(document).on("click",".kepadatan",function(){$(".modalContact").prop("disabled",!1);const c=$(this).data("value");$(this).closest("#productModal").find(".kepadatan").removeClass("active"),$(this).addClass("active"),$("#notes").hide(),$("#modalContact").data("kepadatan",c)}),F(s),E(),O(),B(),G();function h(c){$.ajax({url:`/products/${c}/viewed`,method:"POST",headers:{"X-CSRF-TOKEN":$('meta[name="csrf-token"]').attr("content")},success:l=>console.log("View recorded:",l),error:l=>console.error(l)})}});
