function H(){let e=[];$(document).on("change","#all-cat",function(){$(this).prop("checked")?($(".category-filter-download").prop("checked",!0),e=[""]):($(".category-filter-download").prop("checked",!1),e=[])}),$(document).on("change",".category-filter-download",function(){$(this).prop("checked")||$("#all-cat").prop("checked",!1),e=$(".category-filter-download:checked").map(function(){return $(this).val()}).get().filter(t=>t!=="");const n=$(".category-filter-download").length-1;e.length===n&&($("#all-cat").prop("checked",!0),e=[""]),console.log(e)}),$(document).off("click","#btn-download").on("click","#btn-download",function(n){n.preventDefault();const t=new URLSearchParams(window.location.search).get("jenis"),a=$("#version-select").val();if(!a){alert("Silakan pilih versi terlebih dahulu.");return}let o=new URLSearchParams;e.length>0&&e[0]!==""&&e.forEach(p=>o.append("category[]",p)),t&&o.append("jenis_id",t),a&&o.append("version_id",a);const i=`/catalog/pdf?${o.toString()}`;window.location.href=i})}function U(){$(document).off("click",".modalContact").on("click",".modalContact",function(e){e.preventDefault(),console.log("Klik tombol order",$(this).data("code"));const n="62816659688",t=$(this).data("jenis");console.log(t.toLowerCase());let a="";t.toLowerCase()=="wallpanel"?a=`Halo Admin,
Saya tertarik dengan produk berikut:

• Tipe Wallpanel: *${$(this).data("type")}*
• Kode : *${$(this).data("code")}*
• panjang : *${$(this).data("length")} cm*
• tinggi : *${$(this).data("height")} cm*
• lebar : *${$(this).data("width")} cm*
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

Apakah produk ini masih tersedia? Terima kasih.`,window.open(`https://wa.me/${n}?text=${encodeURIComponent(a)}`,"_blank")})}function D(){$(window).scroll(function(){$(this).scrollTop()>100?$("#btn-scroll-top").fadeIn():$("#btn-scroll-top").fadeOut()}),$("#btn-scroll-top").click(function(){return $("html, body").animate({scrollTop:0},500),!1})}function Q(){$("#loading").removeClass("d-none")}function Z(){$("#loading").addClass("d-none")}function ee(e=[]){if(!Array.isArray(e))return[];const n={thumbnail:3,motif:2,product:1};return e.slice().sort((t,a)=>(n[a.type]||0)-(n[t.type]||0)).map(t=>"/storage/"+t.path)}function ae(e,n,t){$("#btn-download").removeClass("d-none");let a="";e.forEach(o=>{var v,T,w,f,j,b,S,J,C,L,u,x,q,E,I,O,B;const i=ee(((T=(v=o==null?void 0:o.product_versions)==null?void 0:v[0])==null?void 0:T.images)??[]),p=i.length?i[0]:"https://via.placeholder.com/300x200?text=No+Image";let g=i,r=((f=(w=o.category)==null?void 0:w.types)==null?void 0:f.thumbnail)??"";r&&!r.startsWith("http")&&(r=`storage/${r.replace(/^\/?storage\//,"")}`,g.push(r));const l=JSON.stringify(g).replace(/"/g,"&quot;"),c=JSON.stringify(o.packages).replace(/"/g,"&quot;"),m=((j=o.category)==null?void 0:j.name)??"Tanpa Kategori",h=((b=o.product_versions.find(X=>X.version_id==t))==null?void 0:b.name)??"Tanpa Nama";((S=o.category)==null?void 0:S.display_style)==="square"||n===null?a+=`
                    <div class="col-md-2 col-6 mb-4">
                        <div class="h-100 product-card"
                    `:((J=o.category)==null?void 0:J.display_style)==="rectangle"?a+=`
                    <div class="col-md-4 col-6 mb-4">
                        <div class="h-100 product-card"
                    `:a+=`
                    <div class="col-md-2 col-6 mb-4">
                        <div class="h-100 product-card d-flex flex-column justify-content-center align-items-center"
                    `;const d=((C=o.category)==null?void 0:C.display_style)==="rectangle",y=JSON.stringify(o.specifications).replace(/"/g,"&quot;");a+=`
                    data-id="${o.id}"
                    data-code="${o.code}"
                    data-name="${h}"
                    data-category="${m}"
                    data-jenis="${((u=(L=o.category)==null?void 0:L.jenis)==null?void 0:u.name)??""}"
                    data-images="${l}"
                    data-image="${p}"
                    data-type="${((q=(x=o.category)==null?void 0:x.types)==null?void 0:q.name)??""}"
                    data-type-image="${((I=(E=o.category)==null?void 0:E.types)==null?void 0:I.image)??""}"
                    data-url="${o.url_video}"
                    data-paket="${c}"
                    data-specifications = "${y}"
                    >
                       <img 
                            src="${p}" 
                            class="card-img-top" 
                            alt="${o.name}" 
                            style="
                                border : 1px solid #2c2c2c;
                                min-height: 10rem;
                                height: auto; 
                                border-radius: 8px;
                                width: 100%; 
                                object-fit: cover; 
                                object-position: ${((B=(O=o.category)==null?void 0:O.jenis)==null?void 0:B.name)==="PVC Board"?"bottom center":"center center"};
                                aspect-ratio: ${d?"16/9":"1/1"};
                            "
                        >
                        <div class="card-body d-flex flex-column text-center">
                            <h4 class="card-title font-weight-bold text-uppercase mb-2">
                                ${h}
                            </h4>
                            <h6 class="card-text text-muted mb-1">${m}</h6>
                        </div>
                    </div>
                </div>`}),$("#product-list .row").append(a)}function te(e,n){$("#btn-download").addClass("d-none");let t="";e.forEach(a=>{const o=a.thumbnail?`/storage/${a.thumbnail}`:"https://via.placeholder.com/300x200?text=No+Image",i=n==3?"wallpanel":"tanpa kategori";t+=`
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
                </div>`}),$("#product-list .row").append(t)}function R(e,n,t,a=!1){if(n==null)return;e.forEach(l=>{l.images&&l.images.forEach(c=>{c.path&&t.add(c.path)}),l.path&&t.add(l.path)});const o=Array.from(t),i=$("#mockup-carousel-inner"),p=$("#mockup-carousel-indicators"),g=["https://www.youtube.com/embed/BiiUrYAbL9s?autoplay=1&mute=1&rel=0&controls=0&amp;loop=1&playlist=BiiUrYAbL9s"],r=[];for(let l=1;l<=6;l++)l!==2&&r.push(`/dist/img/wpc/${l}.webp?v=${Date.now()}`);if(i.empty(),p.empty(),n==4){$("#mockup-carousel").carousel({interval:!1}),$("#mockup .carousel-control-next").addClass("d-none"),$("#mockup .carousel-control-prev").addClass("d-none"),g.forEach((l,c)=>{i.append(`
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
        `)}),$("#mockup").removeClass("d-none");return}else if(n==3&&a){$("#mockup-carousel").carousel({interval:3e3}),$("#mockup .carousel-control-next").removeClass("d-none"),$("#mockup .carousel-control-prev").removeClass("d-none"),r.forEach((l,c)=>{i.append(`
            <div class="carousel-item ${c===0?"active":""}">
                <div class="d-flex justify-content-center align-items-center">
                    <img src="${l}" 
                        alt="mockup" 
                        class="img-fluid w-100 rounded-3 d-block mx-auto mockup-image"
                    >
                </div>
            </div>
        `),p.append(`
            <li data-bs-target="#mockup-carousel" data-bs-slide-to="${c}" ${c===0?'class="active"':""}></li>
        `)}),$("#mockup").removeClass("d-none");return}o.length>0?(o.length===1?($("#mockup .carousel-control-next").addClass("d-none"),$("#mockup .carousel-control-prev").addClass("d-none"),p.addClass("d-none")):($("#mockup .carousel-control-next").removeClass("d-none"),$("#mockup .carousel-control-prev").removeClass("d-none"),p.removeClass("d-none")),o.forEach((l,c)=>{i.append(`
                <div class="carousel-item ${c===0?"active":""}">
                    <img src="/storage/${l}" alt="mockup" 
                        class="img-fluid w-100 rounded-lg d-block mx-auto mockup-image"
                    >
                </div>
            `),p.append(`
                <li data-target="#mockup-carousel" data-slide-to="${c}" ${c===0?'class="active"':""}></li>
            `)}),$("#mockup").removeClass("d-none")):$("#mockup").addClass("d-none")}let M=!1;function W(e){$(document).off("click",".category-filter"),$(document).on("click",".category-filter",async function(n){if(n.preventDefault(),M)return;M=!0;const t=$(this).data("id"),a=$(this).data("type"),o=$(this).data("version");try{A({selectedJenis:e,category:t,type:a,version:o}),$("#filterModal").modal("hide"),V(),await k(!1)}catch(i){console.error("Gagal memuat data:",i)}finally{M=!1}}),$(document).off("click",".type-filter"),$(document).on("click",".type-filter",async function(n){if(n.preventDefault(),M)return;M=!0;const t=$(this).data("id");try{A({selectedJenis:e,type:t}),$("#filterModal").modal("hide"),V(),await k(!1)}catch(a){console.error("Gagal memuat data:",a)}finally{M=!1}})}function P(e,n="#modalVariants"){$(n).empty(),$("#modalPaket").empty(),$("#modalKepadatan").empty(),Array.isArray(e)&&e.length>0?e.forEach(t=>{const a=t.specification_values||[],o=t.name.toLowerCase();if(o==="warna")$("#paket").text("Warna"),a.length>0?a.forEach(i=>{t.pivot&&i.id===t.pivot.specification_value_id&&$("#modalPaket").append(`
                                <span class="badge badge-outline-primary px-2 py-1 kepadatan" data-value="${i.name}">
                                    ${i.name}
                                </span>
                            `)}):$("#modalPaket").append('<span class="text-muted">Tidak ada data</span>');else if(o==="density")a.length>0?a.forEach(i=>{t.pivot&&i.id===t.pivot.specification_value_id&&(a.length>1?$("#modalKepadatan").append(`
                                    <span class="badge badge-outline-primary px-2 py-1 kepadatan" data-value="${i.name}">
                                        ${i.name}
                                    </span>
                                `):$("#modalKepadatan").append(i.name))}):$("#modalKepadatan").append('<span class="text-muted">Tidak ada data</span>');else{const i=a.find(l=>t.pivot&&l.id===t.pivot.specification_value_id),p=i?i.name:"-";let g=i?i.unit:"";g?g=" "+g:["panjang","tinggi","lebar"].includes(o)?g=" cm":o==="ketebalan"&&(g=" mm");const r=`
                    <div class="row mb-1 variant-row">
                        <div class="col-4 col-sm-3 font-weight-bold">${t.name}</div>
                        <div class="col-auto">:</div>
                        <div class="col">${p}${g}</div>
                    </div>
                `;$(n).append(r)}}):($(n).append('<div class="text-muted">Tidak ada varian</div>'),$(".paket").hide())}function Y(){$("#version-select").on("change",function(){const e=$(this).val()||null;s.version=e,V(),k()})}function N({selectedJenis:e=null,hasCategory:n=!1,isRenderTypes:t=!1}){const a=$("#filter-container"),o=$("#category-container"),i=$("#catalog-col"),p=$(window).width()<768;if(a.removeClass("d-none"),o.removeClass("d-none"),i.removeClass("col-md-12 col-md-9"),t){a.addClass("d-none"),o.addClass("d-none"),i.addClass("col-md-12");return}if(e==1){a.addClass("d-none"),o.addClass("d-none"),i.addClass("col-md-12");return}if(!n){a.addClass("d-none"),o.addClass("d-none"),i.addClass("col-md-12");return}p?(a.addClass("d-none"),o.removeClass("d-none")):(a.removeClass("d-none"),o.removeClass("d-none")),i.addClass("col-md-9")}$(document).ready(function(){const e=new URLSearchParams(window.location.search),n=e.get("jenis");e.get("version");const t=e.get("category");let a,o,i=!1;A({selectedJenis:n,category:t}),k(),N({selectedJenis:n,hasCategory:t,isRenderTypes:!1}),$(window).on("resize",()=>N({selectedJenis:n,hasCategory:t,isRenderTypes:!1})),$("#search-input").on("input",function(){clearTimeout(a),a=setTimeout(()=>{V(),k()},500)}),$(window).on("scroll",function(){clearTimeout(o),o=setTimeout(async()=>{if(i||z())return;const r=$(window).scrollTop(),l=$(window).height(),c=$(document).height();if(r+l>=c-150){i=!0;try{K(!1),await k()}finally{i=!1}}},200)});function p(r,l=[],c=""){$("#carousel-product-image").empty(),$("#thumbnailGallery").empty();let m=r||[];(c==null?void 0:c.toLowerCase())==="uv board"&&l.length&&(m=[...r,...l]),m.forEach((d,y)=>{const v=y===0?"active":"";$("#carousel-product-image").append(`
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
                            data-index="${y}">
                    </div>
                </div>
            `)}),m.length<=1?$("#carouselProduct .carousel-control-next, #carouselProduct .carousel-control-prev").addClass("d-none"):$("#carouselProduct .carousel-control-next, #carouselProduct .carousel-control-prev").removeClass("d-none"),$("#carouselProduct").carousel({interval:3e3,pause:!1});let h;$("#thumbnailGallery").off("click").on("click",".thumbnail-image",function(){const d=$(this).data("index");$("#carouselProduct").carousel(d),$(".thumbnail-image").removeClass("active-thumbnail"),$(this).addClass("active-thumbnail"),setTimeout(()=>$(this).removeClass("active-thumbnail"),500),$("#carouselProduct").carousel("pause"),clearTimeout(h),h=setTimeout(()=>{$("#carouselProduct").carousel("cycle")},5e3)})}$(document).off("click",".product-card").on("click",".product-card",function(){const r=$(this).data("id"),l=$(this).data("code"),c=$(this).data("name"),m=$(this).data("category"),h=$(this).data("type"),d=$(this).data("jenis"),y=parseInt($(this).data("length"),10),v=parseFloat($(this).data("width")).toFixed(1),T=parseFloat($(this).data("density")).toFixed(1),w=$(this).data("url"),f=JSON.parse($(this).attr("data-specifications")||"[]"),j=$(this).attr("data-images"),b=JSON.parse($(this).attr("data-paket")||"[]");let S=$(this).data("height"),J=$(this).data("type-image"),C=[],L=[];if(d!=="card-types"&&g(r),j)try{C=JSON.parse(j.replace(/&quot;/g,'"'))}catch(u){C=[],console.error(u)}if(Array.isArray(b)&&(L=b.sort((u,x)=>u.order-x.order).map(u=>`/storage/${u.image}`)),$("#notes").show(),$("#modalPaket").empty(),d==="card-types"){V(),A({selectedJenis:n,type:h}),K(!1),k();return}d.toLowerCase()==="uv board"&&(P(f),$("#modalVideo, .lebar").hide(),$("#modalCategory").text(m),b.length>0?b.sort((u,x)=>u.order-x.order).map(u=>{$("#modalPaket").append(`
                        <span class="badge badge-outline-primary px-2 py-1 kepadatan" data-value="${u.name}">${u.name}</span>
                    `)}):($("#modalPaket").append('<span class="text-muted">Tidak ada paket</span>'),$("#notes").hide())),d.toLowerCase()==="wallboard"&&(P(f),$("#modalCategory").text(m),$("#ketebalan, .density, #notes, .paket,  #modalVideo, .lebar").hide()),d==="PVC Board"&&(P(f),$("#modalCategory").text(d),$("#modalVideo, .lebar, .paket").hide()),d==="Wallpanel"&&(P(f),$("#modalContact").data("type",h),$("#modalCategory").text(m+" / "+h),$("#ketebalan, #kepadatan, .paket, #modalVideo, #notes, .density").hide(),$("#modalGrafis").attr("src",`/storage/${J}`),$(".grafis").removeClass("d-none")),d.toLowerCase()==="aksesoris"&&($("#tinggi, #ketebalan, #kepadatan, .lebar, .density").hide(),$("#modalCategory").text(m),P(f),$("#modalVideoPlayer").empty(),$("#modalVideo, .density").hide(),w&&($("#modalVideoPlayer").append(`
                    <iframe class="embed-responsive-item"
                    src="${w}"
                    title="YouTube video player" frameborder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; web-share;"
                    referrerpolicy="strict-origin-when-cross-origin"
                    allowfullscreen></iframe>
                `),$("#modalVideo").show())),p(C,L,d),$("#modalName").text(c),$("#productModalLabel").text(c),$("#productModal").modal("show"),$("#modalContact").data({jenis:d,category:m,code:l,length:y,width:v,height:S,density:T,type:h}),$(".kepadatan").removeClass("active"),$("#modalContact").data({kepadatan:null,paket:null}),$(".modalContact").prop("disabled",$(".kepadatan").length>0)}),$(document).on("click",".kepadatan",function(){$(".modalContact").prop("disabled",!1);const r=$(this).data("value");$(this).closest("#productModal").find(".kepadatan").removeClass("active"),$(this).addClass("active"),$("#notes").hide(),$("#modalContact").data("kepadatan",r)}),W(n),H(),U(),D(),Y();function g(r){$.ajax({url:`/products/${r}/viewed`,method:"POST",headers:{"X-CSRF-TOKEN":$('meta[name="csrf-token"]').attr("content")},success:l=>console.log("View recorded:",l),error:l=>console.error(l)})}});let s={selectedJenis:null,category:null,type:null,currentPage:1,isLoading:!1,lastPage:!1,firstLoad:!0,currentRequest:null,uniquePaths:new Set,version:null};function K(e){s.firstLoad=e}function A(e){s.selectedJenis=e.selectedJenis,s.category=e.category??null,s.type=e.type??null,s.version=e.version??null}function z(){return s.isLoading}function V(){s.currentPage=1,s.isLoading=!1,s.lastPage=!1,s.uniquePaths.clear(),$("#product-list .row").html("")}function k(){if(s.isLoading||s.lastPage)return Promise.resolve();s.isLoading=!0,Q();const e=$("#search-input").val();s.currentRequest&&s.currentRequest.readyState!==4&&s.currentRequest.abort();const n={page:s.currentPage,search:e,jenis:s.selectedJenis,category:s.category,type:s.type,version:s.version};return s.currentRequest=$.ajax({url:"/catalog",type:"GET",data:n}),new Promise((t,a)=>{s.currentRequest.done(o=>oe(o)).fail((o,i)=>{i!=="abort"&&(console.error("Gagal memuat data."),a())}).always(()=>{s.isLoading=!1,Z(),s.currentRequest=null}).then(t)})}function oe(e){console.log(e);const n=e.data.data??[],t=e.types??[],a=e.active_version_id;if(s.type&&($("#backButton").removeClass("d-none"),$("#homeButton").addClass("d-none")),console.log("state.version",s.version),console.log("state.type",s.type),s.version==null){const o=$("#version-select option:first").val();o&&(s.version=o)}s.selectedJenis&&s.firstLoad&&t.length>0?($("#search-form").addClass("d-none"),$("#downloadButton").addClass("d-none"),$("#version-filter").addClass("d-none"),t.length>0&&(te(t,s.selectedJenis),s.lastPage=!0),F(e,!0)):($("#search-form").removeClass("d-none"),$("#downloadButton").removeClass("d-none"),$("#version-filter").removeClass("d-none"),n.length>0?(ae(n,s.selectedJenis,a),s.currentPage++,s.currentPage>e.data.last_page&&(s.lastPage=!0)):(s.currentPage===1&&($("#mockup").addClass("d-none"),$("#product-list .row").append(`<div class="col-12"><img src="dist/img/no-data.png" alt="no-data"
                     class="img-fluid mx-auto d-block" style="max-width:100%;height:auto;margin:100px 0;"></div>`)),s.lastPage=!0),F(e,!1))}function F(e,n=!0){var m,h,d,y,v,T,w,f;const t=e.category??[],a=((d=(h=(m=e.data.data[0])==null?void 0:m.category)==null?void 0:h.types)==null?void 0:d.images)??[],o=(y=e.jenis)==null?void 0:y.name,i=((T=(v=e.data.data[0])==null?void 0:v.category)==null?void 0:T.images)??[],p=s.firstLoad&&(((w=e.types)==null?void 0:w.length)??0)>0,g=(((f=e.category)==null?void 0:f.length)??0)>0;N({selectedJenis:s.selectedJenis,hasCategory:g,isRenderTypes:p}),t.length===0?$("#category-container").addClass("d-none"):($("#category-container").removeClass("d-none"),a.length>0?R(a,s.selectedJenis,s.uniquePaths,n):i.length>0?R(i,s.selectedJenis,s.uniquePaths,n):s.selectedJenis==3?R([],s.selectedJenis,s.uniquePaths,n):s.selectedJenis==4?R([],s.selectedJenis,s.uniquePaths,n):$("#mockup").addClass("d-none")),le(o);const r=ne(t,s.version),l=se(t),c=ie(e.types??[]);n?$("#category-menu-item, #category-menu-item-modal").html("tidak ada kategori"):($("#category-menu-item, #category-menu-item-modal").html(r),$("#type-menu-item, #type-menu-item-modal").html(c),$("#pdf-catalog").html(l)),!s.category&&t.length>0?(s.category=t[0].id,V(),setTimeout(()=>{k(),console.log("loadMoreData"),console.log("state.vers",s.version)},200)):s.category&&$(`.category-filter[data-id="${s.category}"]`).addClass("active"),s.type&&$(`.type-filter[data-id="${s.type}"]`).addClass("active")}function _(e){$("#category-menu-item-label, #category-modal-item-label").html(e)}function se(e){if(e.length===0)return`
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
            </div>`).join("");return`<div class="row font-poppins">${n}${t}</div>`}function ne(e,n=null){return e.length===0?`
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
                        alt="${a.name}"
                        class="mr-2 img-thumbnail"
                        style="width:50px;height:50px;object-fit:contain;">
                    <span class="text-capitalize">${a.name}</span>
                </a>
            `).join("")}</li>`}function ie(e){return e.length===0&&$("#type-menu-item-label").hide(),`<li class="nav-item font-poppins">${e.map(t=>`
                <a class="nav-link text-white type-filter d-flex align-items-center justify-content-start" 
                href="#" data-id="${t.id}">
                    <img src="${t.thumbnail?`/storage/${t.thumbnail}`:"dist/img/product/1.webp"}"
                        alt="${t.name}"
                        class="mr-2 img-thumbnail"
                        style="width:6.5rem;height:6.5rem;object-fit:contain;">
                    <span class="text-capitalize">${t.name}</span>
                </a>
            `).join("")}</li>`}function le(e){const n={"PVC Board":()=>{$("#category-container").addClass("d-none"),$(".category-modal-container").text("Tidak ada kategori")},Wallboard:()=>_("Motif"),"UV Board":()=>_("Motif"),Wallpanel:()=>_("Motif"),Aksesoris:()=>_("Ukuran"),default:()=>_("Kategori")};(n[e]||n.default)()}function G({selectedJenis:e=null,hasCategory:n=!1,isRenderTypes:t=!1}){const a=$("#filter-container"),o=$("#category-container"),i=$("#catalog-col"),p=$(window).width()<768;if(a.removeClass("d-none"),o.removeClass("d-none"),i.removeClass("col-md-12 col-md-9"),t){a.addClass("d-none"),o.addClass("d-none"),i.addClass("col-md-12");return}if(e==1){a.addClass("d-none"),o.addClass("d-none"),i.addClass("col-md-12");return}if(!n){a.addClass("d-none"),o.addClass("d-none"),i.addClass("col-md-12");return}p?(a.addClass("d-none"),o.removeClass("d-none")):(a.removeClass("d-none"),o.removeClass("d-none")),i.addClass("col-md-9")}$(document).ready(function(){const e=new URLSearchParams(window.location.search),n=e.get("jenis");e.get("version");const t=e.get("category");let a,o,i=!1;A({selectedJenis:n,category:t}),k(),G({selectedJenis:n,hasCategory:t,isRenderTypes:!1}),$(window).on("resize",()=>G({selectedJenis:n,hasCategory:t,isRenderTypes:!1})),$("#search-input").on("input",function(){clearTimeout(a),a=setTimeout(()=>{V(),k()},500)}),$(window).on("scroll",function(){clearTimeout(o),o=setTimeout(async()=>{if(i||z())return;const r=$(window).scrollTop(),l=$(window).height(),c=$(document).height();if(r+l>=c-150){i=!0;try{K(!1),await k()}finally{i=!1}}},200)});function p(r,l=[],c=""){$("#carousel-product-image").empty(),$("#thumbnailGallery").empty();let m=r||[];(c==null?void 0:c.toLowerCase())==="uv board"&&l.length&&(m=[...r,...l]),m.forEach((d,y)=>{const v=y===0?"active":"";$("#carousel-product-image").append(`
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
                            data-index="${y}">
                    </div>
                </div>
            `)}),m.length<=1?$("#carouselProduct .carousel-control-next, #carouselProduct .carousel-control-prev").addClass("d-none"):$("#carouselProduct .carousel-control-next, #carouselProduct .carousel-control-prev").removeClass("d-none"),$("#carouselProduct").carousel({interval:3e3,pause:!1});let h;$("#thumbnailGallery").off("click").on("click",".thumbnail-image",function(){const d=$(this).data("index");$("#carouselProduct").carousel(d),$(".thumbnail-image").removeClass("active-thumbnail"),$(this).addClass("active-thumbnail"),setTimeout(()=>$(this).removeClass("active-thumbnail"),500),$("#carouselProduct").carousel("pause"),clearTimeout(h),h=setTimeout(()=>{$("#carouselProduct").carousel("cycle")},5e3)})}$(document).off("click",".product-card").on("click",".product-card",function(){const r=$(this).data("id"),l=$(this).data("code"),c=$(this).data("name"),m=$(this).data("category"),h=$(this).data("type"),d=$(this).data("jenis"),y=parseInt($(this).data("length"),10),v=parseFloat($(this).data("width")).toFixed(1),T=parseFloat($(this).data("density")).toFixed(1),w=$(this).data("url"),f=JSON.parse($(this).attr("data-specifications")||"[]"),j=$(this).attr("data-images"),b=JSON.parse($(this).attr("data-paket")||"[]");let S=$(this).data("height"),J=$(this).data("type-image"),C=[],L=[];if(d!=="card-types"&&g(r),j)try{C=JSON.parse(j.replace(/&quot;/g,'"'))}catch(u){C=[],console.error(u)}if(Array.isArray(b)&&(L=b.sort((u,x)=>u.order-x.order).map(u=>`/storage/${u.image}`)),$("#notes").show(),$("#modalPaket").empty(),d==="card-types"){V(),A({selectedJenis:n,type:h}),K(!1),k();return}d.toLowerCase()==="uv board"&&(P(f),$("#modalVideo, .lebar").hide(),$("#modalCategory").text(m),b.length>0?b.sort((u,x)=>u.order-x.order).map(u=>{$("#modalPaket").append(`
                        <span class="badge badge-outline-primary px-2 py-1 kepadatan" data-value="${u.name}">${u.name}</span>
                    `)}):($("#modalPaket").append('<span class="text-muted">Tidak ada paket</span>'),$("#notes").hide())),d.toLowerCase()==="wallboard"&&(P(f),$("#modalCategory").text(m),$("#ketebalan, .density, #notes, .paket,  #modalVideo, .lebar").hide()),d==="PVC Board"&&(P(f),$("#modalCategory").text(d),$("#modalVideo, .lebar, .paket").hide()),d==="Wallpanel"&&(P(f),$("#modalContact").data("type",h),$("#modalCategory").text(m+" / "+h),$("#ketebalan, #kepadatan, .paket, #modalVideo, #notes, .density").hide(),$("#modalGrafis").attr("src",`/storage/${J}`),$(".grafis").removeClass("d-none")),d.toLowerCase()==="aksesoris"&&($("#tinggi, #ketebalan, #kepadatan, .lebar, .density").hide(),$("#modalCategory").text(m),P(f),$("#modalVideoPlayer").empty(),$("#modalVideo, .density").hide(),w&&($("#modalVideoPlayer").append(`
                    <iframe class="embed-responsive-item"
                    src="${w}"
                    title="YouTube video player" frameborder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; web-share;"
                    referrerpolicy="strict-origin-when-cross-origin"
                    allowfullscreen></iframe>
                `),$("#modalVideo").show())),p(C,L,d),$("#modalName").text(c),$("#productModalLabel").text(c),$("#productModal").modal("show"),$("#modalContact").data({jenis:d,category:m,code:l,length:y,width:v,height:S,density:T,type:h}),$(".kepadatan").removeClass("active"),$("#modalContact").data({kepadatan:null,paket:null}),$(".modalContact").prop("disabled",$(".kepadatan").length>0)}),$(document).on("click",".kepadatan",function(){$(".modalContact").prop("disabled",!1);const r=$(this).data("value");$(this).closest("#productModal").find(".kepadatan").removeClass("active"),$(this).addClass("active"),$("#notes").hide(),$("#modalContact").data("kepadatan",r)}),W(n),H(),U(),D(),Y();function g(r){$.ajax({url:`/products/${r}/viewed`,method:"POST",headers:{"X-CSRF-TOKEN":$('meta[name="csrf-token"]').attr("content")},success:l=>console.log("View recorded:",l),error:l=>console.error(l)})}});
