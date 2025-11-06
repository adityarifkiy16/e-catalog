function B(){let a=[];$(document).on("change","#all-cat",function(){$(this).prop("checked")?($(".category-filter-download").prop("checked",!0),a=[""]):($(".category-filter-download").prop("checked",!1),a=[])}),$(document).on("change",".category-filter-download",function(){$(this).prop("checked")||$("#all-cat").prop("checked",!1),a=$(".category-filter-download:checked").map(function(){return $(this).val()}).get().filter(t=>t!=="");const s=$(".category-filter-download").length-1;a.length===s&&($("#all-cat").prop("checked",!0),a=[""]),console.log(a)}),$(document).off("click","#btn-download").on("click","#btn-download",function(s){s.preventDefault();const t=new URLSearchParams(window.location.search).get("jenis"),e=$("#version-select").val();if(!e){alert("Silakan pilih versi terlebih dahulu.");return}let i=new URLSearchParams;a.length>0&&a[0]!==""&&a.forEach(p=>i.append("category[]",p)),t&&i.append("jenis_id",t),e&&i.append("version_id",e);const n=`/catalog/pdf?${i.toString()}`;window.location.href=n})}function F(){$(document).off("click",".modalContact").on("click",".modalContact",function(a){a.preventDefault(),console.log("Klik tombol order",$(this).data("code"));const s="62816659688",t=$(this).data("jenis");console.log(t.toLowerCase());let e="";t.toLowerCase()=="wallpanel"?e=`Halo Admin,
Saya tertarik dengan produk berikut:

• Tipe Wallpanel: *${$(this).data("type")}*
• Kode : *${$(this).data("code")}*
• panjang : *${$(this).data("length")} cm*
• tinggi : *${$(this).data("height")} cm*
• lebar : *${$(this).data("width")} cm*
• Produk : *${$(this).data("jenis")}*
• Kategori: *${$(this).data("category")}*

Apakah produk ini masih tersedia? Terima kasih.`:t.toLowerCase()=="pvc board"?e=`Halo Admin,
Saya tertarik dengan produk berikut:

• Produk : *${$(this).data("jenis")}*
• Ketebalan : *${$(this).data("code")}*
• density: *${$(this).data("kepadatan")??"-"}*

Apakah produk ini masih tersedia? Terima kasih.`:t.toLowerCase()=="uv board"?e=`Halo Admin,
Saya tertarik dengan produk berikut:

• Kode Motif : *${$(this).data("code")}*
• Produk : *${$(this).data("jenis")}*
• Kategori: *${$(this).data("category")}*

• Paket: *${$(this).data("kepadatan")??"-"}*

Apakah produk ini masih tersedia? Terima kasih.`:t.toLowerCase()=="aksesoris"?e=`Halo Admin,
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

Apakah produk ini masih tersedia? Terima kasih.`,window.open(`https://wa.me/${s}?text=${encodeURIComponent(e)}`,"_blank")})}function G(){$(window).scroll(function(){$(this).scrollTop()>100?$("#btn-scroll-top").fadeIn():$("#btn-scroll-top").fadeOut()}),$("#btn-scroll-top").click(function(){return $("html, body").animate({scrollTop:0},500),!1})}function D(){$("#loading").removeClass("d-none")}function Y(){$("#loading").addClass("d-none")}function z(a=[]){if(!Array.isArray(a))return[];const s={thumbnail:3,motif:2,product:1};return a.slice().sort((t,e)=>(s[e.type]||0)-(s[t.type]||0)).map(t=>"/storage/"+t.path)}function X(a,s){$("#btn-download").removeClass("d-none");let t="";a.forEach(e=>{var d,y,v,T,w,f,j,b,S,J,C,L,u,x,N,E;const i=z(((y=(d=e==null?void 0:e.product_versions)==null?void 0:d[0])==null?void 0:y.images)??[]),n=i.length?i[0]:"https://via.placeholder.com/300x200?text=No+Image";let p=i,h=((T=(v=e.category)==null?void 0:v.types)==null?void 0:T.thumbnail)??"";h&&!h.startsWith("http")&&(h=`storage/${h.replace(/^\/?storage\//,"")}`),p.push(h);const c=JSON.stringify(p).replace(/"/g,"&quot;"),l=JSON.stringify(e.packages).replace(/"/g,"&quot;"),r=((w=e.category)==null?void 0:w.name)??"Tanpa Kategori";((f=e.category)==null?void 0:f.display_style)==="square"||s===null?t+=`
                    <div class="col-md-2 col-6 mb-4">
                        <div class="h-100 product-card"
                    `:((j=e.category)==null?void 0:j.display_style)==="rectangle"?t+=`
                    <div class="col-md-4 col-6 mb-4">
                        <div class="h-100 product-card"
                    `:t+=`
                    <div class="col-md-2 col-6 mb-4">
                        <div class="h-100 product-card d-flex flex-column justify-content-center align-items-center"
                    `;const m=((b=e.category)==null?void 0:b.display_style)==="rectangle",g=JSON.stringify(e.specifications).replace(/"/g,"&quot;");t+=`
                    data-id="${e.id}"
                    data-code="${e.code}"
                    data-name="${e.name}"
                    data-category="${r}"
                    data-jenis="${((J=(S=e.category)==null?void 0:S.jenis)==null?void 0:J.name)??""}"
                    data-images="${c}"
                    data-image="${n}"
                    data-type="${((L=(C=e.category)==null?void 0:C.types)==null?void 0:L.name)??""}"
                    data-type-image="${((x=(u=e.category)==null?void 0:u.types)==null?void 0:x.image)??""}"
                    data-url="${e.url_video}"
                    data-paket="${l}"
                    data-specifications = "${g}"
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
                                object-position: ${((E=(N=e.category)==null?void 0:N.jenis)==null?void 0:E.name)==="PVC Board"?"bottom center":"center center"};
                                aspect-ratio: ${m?"16/9":"1/1"};
                            "
                        >
                        <div class="card-body d-flex flex-column text-center">
                            <h4 class="card-title font-weight-bold text-uppercase mb-2">
                                ${e.name}
                            </h4>
                            <h6 class="card-text text-muted mb-1">${r}</h6>
                        </div>
                    </div>
                </div>`}),$("#product-list .row").append(t)}function Q(a,s){$("#btn-download").addClass("d-none");let t="";a.forEach(e=>{const i=e.thumbnail?`/storage/${e.thumbnail}`:"https://via.placeholder.com/300x200?text=No+Image",n=s==3?"wallpanel":"tanpa kategori";t+=`
                    <div class="col-md-2 col-6 mb-4">
                        <div class="h-100 product-card d-flex flex-column justify-content-center align-items-center"
                    `,t+=`
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
                </div>`}),$("#product-list .row").append(t)}function K(a,s,t,e=!1){if(s==null)return;a.forEach(l=>{l.images&&l.images.forEach(r=>{r.path&&t.add(r.path)}),l.path&&t.add(l.path)});const i=Array.from(t),n=$("#mockup-carousel-inner"),p=$("#mockup-carousel-indicators"),h=["https://www.youtube.com/embed/BiiUrYAbL9s?autoplay=1&mute=1&rel=0&controls=0&amp;loop=1&playlist=BiiUrYAbL9s"],c=[];for(let l=1;l<=6;l++)l!==2&&c.push(`/dist/img/wpc/${l}.webp?v=${Date.now()}`);if(n.empty(),p.empty(),s==4){$("#mockup-carousel").carousel({interval:!1}),$("#mockup .carousel-control-next").addClass("d-none"),$("#mockup .carousel-control-prev").addClass("d-none"),h.forEach((l,r)=>{n.append(`
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
            `)}),$("#mockup").removeClass("d-none")):$("#mockup").addClass("d-none")}let M=!1;function H(a){$(document).off("click",".category-filter"),$(document).on("click",".category-filter",async function(s){if(s.preventDefault(),M)return;M=!0;const t=$(this).data("id"),e=$(this).data("type"),i=$(this).data("version");try{A({selectedJenis:a,category:t,type:e,version:i}),$("#filterModal").modal("hide"),V(),await k(!1)}catch(n){console.error("Gagal memuat data:",n)}finally{M=!1}}),$(document).off("click",".type-filter"),$(document).on("click",".type-filter",async function(s){if(s.preventDefault(),M)return;M=!0;const t=$(this).data("id");try{A({selectedJenis:a,type:t}),$("#filterModal").modal("hide"),V(),await k(!1)}catch(e){console.error("Gagal memuat data:",e)}finally{M=!1}})}function P(a,s="#modalVariants"){$(s).empty(),$("#modalPaket").empty(),$("#modalKepadatan").empty(),Array.isArray(a)&&a.length>0?a.forEach(t=>{const e=t.specification_values||[],i=t.name.toLowerCase();if(i==="warna")$("#paket").text("Warna"),e.length>0?e.forEach(n=>{t.pivot&&n.id===t.pivot.specification_value_id&&$("#modalPaket").append(`
                                <span class="badge badge-outline-primary px-2 py-1 kepadatan" data-value="${n.name}">
                                    ${n.name}
                                </span>
                            `)}):$("#modalPaket").append('<span class="text-muted">Tidak ada data</span>');else if(i==="density")e.length>0?e.forEach(n=>{t.pivot&&n.id===t.pivot.specification_value_id&&(e.length>1?$("#modalKepadatan").append(`
                                    <span class="badge badge-outline-primary px-2 py-1 kepadatan" data-value="${n.name}">
                                        ${n.name}
                                    </span>
                                `):$("#modalKepadatan").append(n.name))}):$("#modalKepadatan").append('<span class="text-muted">Tidak ada data</span>');else{const n=e.find(l=>t.pivot&&l.id===t.pivot.specification_value_id),p=n?n.name:"-";let h=n?n.unit:"";h?h=" "+h:["panjang","tinggi","lebar"].includes(i)?h=" cm":i==="ketebalan"&&(h=" mm");const c=`
                    <div class="row mb-1 variant-row">
                        <div class="col-4 col-sm-3 font-weight-bold">${t.name}</div>
                        <div class="col-auto">:</div>
                        <div class="col">${p}${h}</div>
                    </div>
                `;$(s).append(c)}}):($(s).append('<div class="text-muted">Tidak ada varian</div>'),$(".paket").hide())}function U(){$("#version-select").on("change",function(){const a=$(this).val()||null;o.version=a,V(),k()})}function q({selectedJenis:a=null,hasCategory:s=!1,isRenderTypes:t=!1}){const e=$("#filter-container"),i=$("#category-container"),n=$("#catalog-col"),p=$(window).width()<768;if(e.removeClass("d-none"),i.removeClass("d-none"),n.removeClass("col-md-12 col-md-9"),t){e.addClass("d-none"),i.addClass("d-none"),n.addClass("col-md-12");return}if(a==1){e.addClass("d-none"),i.addClass("d-none"),n.addClass("col-md-12");return}if(!s){e.addClass("d-none"),i.addClass("d-none"),n.addClass("col-md-12");return}p?(e.addClass("d-none"),i.removeClass("d-none")):(e.removeClass("d-none"),i.removeClass("d-none")),n.addClass("col-md-9")}$(document).ready(function(){const a=new URLSearchParams(window.location.search),s=a.get("jenis");a.get("version");const t=a.get("category");let e,i,n=!1;A({selectedJenis:s,category:t}),k(),q({selectedJenis:s,hasCategory:t,isRenderTypes:!1}),$(window).on("resize",()=>q({selectedJenis:s,hasCategory:t,isRenderTypes:!1})),$("#search-input").on("input",function(){clearTimeout(e),e=setTimeout(()=>{V(),k()},500)}),$(window).on("scroll",function(){clearTimeout(i),i=setTimeout(async()=>{if(n||W())return;const c=$(window).scrollTop(),l=$(window).height(),r=$(document).height();if(c+l>=r-150){n=!0;try{_(!1),await k()}finally{n=!1}}},200)});function p(c,l=[],r=""){$("#carousel-product-image").empty(),$("#thumbnailGallery").empty();let m=c||[];(r==null?void 0:r.toLowerCase())==="uv board"&&l.length&&(m=[...c,...l]),m.forEach((d,y)=>{const v=y===0?"active":"";$("#carousel-product-image").append(`
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
            `)}),m.length<=1?$("#carouselProduct .carousel-control-next, #carouselProduct .carousel-control-prev").addClass("d-none"):$("#carouselProduct .carousel-control-next, #carouselProduct .carousel-control-prev").removeClass("d-none"),$("#carouselProduct").carousel({interval:3e3,pause:!1});let g;$("#thumbnailGallery").off("click").on("click",".thumbnail-image",function(){const d=$(this).data("index");$("#carouselProduct").carousel(d),$(".thumbnail-image").removeClass("active-thumbnail"),$(this).addClass("active-thumbnail"),setTimeout(()=>$(this).removeClass("active-thumbnail"),500),$("#carouselProduct").carousel("pause"),clearTimeout(g),g=setTimeout(()=>{$("#carouselProduct").carousel("cycle")},5e3)})}$(document).off("click",".product-card").on("click",".product-card",function(){const c=$(this).data("id"),l=$(this).data("code"),r=$(this).data("name"),m=$(this).data("category"),g=$(this).data("type"),d=$(this).data("jenis"),y=parseInt($(this).data("length"),10),v=parseFloat($(this).data("width")).toFixed(1),T=parseFloat($(this).data("density")).toFixed(1),w=$(this).data("url"),f=JSON.parse($(this).attr("data-specifications")||"[]"),j=$(this).attr("data-images"),b=JSON.parse($(this).attr("data-paket")||"[]");let S=$(this).data("height"),J=$(this).data("type-image"),C=[],L=[];if(d!=="card-types"&&h(c),j)try{C=JSON.parse(j.replace(/&quot;/g,'"'))}catch(u){C=[],console.error(u)}if(Array.isArray(b)&&(L=b.sort((u,x)=>u.order-x.order).map(u=>`/storage/${u.image}`)),$("#notes").show(),$("#modalPaket").empty(),d==="card-types"){V(),A({selectedJenis:s,type:g}),_(!1),k();return}d.toLowerCase()==="uv board"&&(P(f),$("#modalVideo, .lebar").hide(),$("#modalCategory").text(m),b.length>0?b.sort((u,x)=>u.order-x.order).map(u=>{$("#modalPaket").append(`
                        <span class="badge badge-outline-primary px-2 py-1 kepadatan" data-value="${u.name}">${u.name}</span>
                    `)}):($("#modalPaket").append('<span class="text-muted">Tidak ada paket</span>'),$("#notes").hide())),d.toLowerCase()==="wallboard"&&(P(f),$("#modalCategory").text(m),$("#ketebalan, .density, #notes, .paket,  #modalVideo, .lebar").hide()),d==="PVC Board"&&(P(f),$("#modalCategory").text(d),$("#modalVideo, .lebar, .paket").hide()),d==="Wallpanel"&&(P(f),$("#modalContact").data("type",g),$("#modalCategory").text(m+" / "+g),$("#ketebalan, #kepadatan, .paket, #modalVideo, #notes, .density").hide(),$("#modalGrafis").attr("src",`/storage/${J}`),$(".grafis").removeClass("d-none")),d.toLowerCase()==="aksesoris"&&($("#tinggi, #ketebalan, #kepadatan, .lebar, .density").hide(),$("#modalCategory").text(m),P(f),$("#modalVideoPlayer").empty(),$("#modalVideo, .density").hide(),w&&($("#modalVideoPlayer").append(`
                    <iframe class="embed-responsive-item"
                    src="${w}"
                    title="YouTube video player" frameborder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; web-share;"
                    referrerpolicy="strict-origin-when-cross-origin"
                    allowfullscreen></iframe>
                `),$("#modalVideo").show())),p(C,L,d),$("#modalName").text(r),$("#productModalLabel").text(r),$("#productModal").modal("show"),$("#modalContact").data({jenis:d,category:m,code:l,length:y,width:v,height:S,density:T,type:g}),$(".kepadatan").removeClass("active"),$("#modalContact").data({kepadatan:null,paket:null}),$(".modalContact").prop("disabled",$(".kepadatan").length>0)}),$(document).on("click",".kepadatan",function(){$(".modalContact").prop("disabled",!1);const c=$(this).data("value");$(this).closest("#productModal").find(".kepadatan").removeClass("active"),$(this).addClass("active"),$("#notes").hide(),$("#modalContact").data("kepadatan",c)}),H(s),B(),F(),G(),U();function h(c){$.ajax({url:`/products/${c}/viewed`,method:"POST",headers:{"X-CSRF-TOKEN":$('meta[name="csrf-token"]').attr("content")},success:l=>console.log("View recorded:",l),error:l=>console.error(l)})}});let o={selectedJenis:null,category:null,type:null,currentPage:1,isLoading:!1,lastPage:!1,firstLoad:!0,currentRequest:null,uniquePaths:new Set,version:null};function _(a){o.firstLoad=a}function A(a){o.selectedJenis=a.selectedJenis,o.category=a.category??null,o.type=a.type??null,o.version=a.version??null}function W(){return o.isLoading}function V(){o.currentPage=1,o.isLoading=!1,o.lastPage=!1,o.uniquePaths.clear(),$("#product-list .row").html("")}function k(){if(o.isLoading||o.lastPage)return Promise.resolve();o.isLoading=!0,D();const a=$("#search-input").val();o.currentRequest&&o.currentRequest.readyState!==4&&o.currentRequest.abort();const s={page:o.currentPage,search:a,jenis:o.selectedJenis,category:o.category,type:o.type,version:o.version};return o.currentRequest=$.ajax({url:"/catalog",type:"GET",data:s}),new Promise((t,e)=>{o.currentRequest.done(i=>Z(i)).fail((i,n)=>{n!=="abort"&&(console.error("Gagal memuat data."),e())}).always(()=>{o.isLoading=!1,Y(),o.currentRequest=null}).then(t)})}function Z(a){const s=a.data.data??[],t=a.types??[];if(o.type&&($("#backButton").removeClass("d-none"),$("#homeButton").addClass("d-none")),console.log("state.version",o.version),console.log("state.type",o.type),o.version==null){const e=$("#version-select option:first").val();e&&(o.version=e)}o.selectedJenis&&o.firstLoad&&t.length>0?($("#search-form").addClass("d-none"),$("#version-filter").addClass("d-none"),t.length>0&&(Q(t,o.selectedJenis),o.lastPage=!0),I(a,!0)):($("#search-form").removeClass("d-none"),$("#version-filter").removeClass("d-none"),s.length>0?(X(s,o.selectedJenis),o.currentPage++,o.currentPage>a.data.last_page&&(o.lastPage=!0)):(o.currentPage===1&&($("#mockup").addClass("d-none"),$("#product-list .row").append(`<div class="col-12"><img src="dist/img/no-data.png" alt="no-data"
                     class="img-fluid mx-auto d-block" style="max-width:100%;height:auto;margin:100px 0;"></div>`)),o.lastPage=!0),I(a,!1))}function I(a,s=!0){var m,g,d,y,v,T,w,f;const t=a.category??[],e=((d=(g=(m=a.data.data[0])==null?void 0:m.category)==null?void 0:g.types)==null?void 0:d.images)??[],i=(y=a.jenis)==null?void 0:y.name,n=((T=(v=a.data.data[0])==null?void 0:v.category)==null?void 0:T.images)??[],p=o.firstLoad&&(((w=a.types)==null?void 0:w.length)??0)>0,h=(((f=a.category)==null?void 0:f.length)??0)>0;q({selectedJenis:o.selectedJenis,hasCategory:h,isRenderTypes:p}),t.length===0?$("#category-container").addClass("d-none"):($("#category-container").removeClass("d-none"),e.length>0?K(e,o.selectedJenis,o.uniquePaths,s):n.length>0?K(n,o.selectedJenis,o.uniquePaths,s):o.selectedJenis==3?K([],o.selectedJenis,o.uniquePaths,s):o.selectedJenis==4?K([],o.selectedJenis,o.uniquePaths,s):$("#mockup").addClass("d-none")),oe(i);const c=ae(t,o.version),l=ee(t),r=te(a.types??[]);s?$("#category-menu-item, #category-menu-item-modal").html("tidak ada kategori"):($("#category-menu-item, #category-menu-item-modal").html(c),$("#type-menu-item, #type-menu-item-modal").html(r),$("#pdf-catalog").html(l)),!o.category&&t.length>0?(o.category=t[0].id,V(),setTimeout(()=>{k()},200)):o.category&&$(`.category-filter[data-id="${o.category}"]`).addClass("active"),o.type&&$(`.type-filter[data-id="${o.type}"]`).addClass("active")}function R(a){$("#category-menu-item-label, #category-modal-item-label").html(a)}function ee(a){if(a.length===0)return`
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
        </div>`,t=a.map(e=>`
            <div class="col-6 col-md-4 mb-2">
                <div class="text-white rounded py-2 px-3">
                    <input type="checkbox" class="custom-control-input category-filter-download" 
                           id="cat-${e.id}" value="${e.id}">
                    <label class="custom-control-label" for="cat-${e.id}">
                        ${e.name}
                    </label>
                </div>
            </div>`).join("");return`<div class="row font-poppins">${s}${t}</div>`}function ae(a,s=null){return a.length===0?`
            <li class="nav-item font-poppins">
                <a class="nav-link text-white category-filter" href="#">Tanpa Kategori</a>
            </li>`:`<li class="nav-item font-poppins">${a.map(e=>`
                <a class="nav-link text-white category-filter d-flex align-items-center justify-content-start" 
                href="#" 
                data-jenis-id="${e.jenis_id}" 
                data-id="${e.id}" 
                data-type="${e.type_id}"
                data-version="${s}">
                    <img src="${e.path?"storage/"+e.path:"dist/img/product/1.webp"}"
                        alt="${e.name}"
                        class="mr-2 img-thumbnail"
                        style="width:50px;height:50px;object-fit:contain;">
                    <span class="text-capitalize">${e.name}</span>
                </a>
            `).join("")}</li>`}function te(a){return a.length===0&&$("#type-menu-item-label").hide(),`<li class="nav-item font-poppins">${a.map(t=>`
                <a class="nav-link text-white type-filter d-flex align-items-center justify-content-start" 
                href="#" data-id="${t.id}">
                    <img src="${t.thumbnail?`/storage/${t.thumbnail}`:"dist/img/product/1.webp"}"
                        alt="${t.name}"
                        class="mr-2 img-thumbnail"
                        style="width:50px;height:50px;object-fit:contain;">
                    <span class="text-capitalize">${t.name}</span>
                </a>
            `).join("")}</li>`}function oe(a){const s={"PVC Board":()=>{$("#category-container").addClass("d-none"),$(".category-modal-container").text("Tidak ada kategori")},Wallboard:()=>R("Motif"),"UV Board":()=>R("Motif"),Wallpanel:()=>R("Motif"),Aksesoris:()=>R("Ukuran"),default:()=>R("Kategori")};(s[a]||s.default)()}function O({selectedJenis:a=null,hasCategory:s=!1,isRenderTypes:t=!1}){const e=$("#filter-container"),i=$("#category-container"),n=$("#catalog-col"),p=$(window).width()<768;if(e.removeClass("d-none"),i.removeClass("d-none"),n.removeClass("col-md-12 col-md-9"),t){e.addClass("d-none"),i.addClass("d-none"),n.addClass("col-md-12");return}if(a==1){e.addClass("d-none"),i.addClass("d-none"),n.addClass("col-md-12");return}if(!s){e.addClass("d-none"),i.addClass("d-none"),n.addClass("col-md-12");return}p?(e.addClass("d-none"),i.removeClass("d-none")):(e.removeClass("d-none"),i.removeClass("d-none")),n.addClass("col-md-9")}$(document).ready(function(){const a=new URLSearchParams(window.location.search),s=a.get("jenis");a.get("version");const t=a.get("category");let e,i,n=!1;A({selectedJenis:s,category:t}),k(),O({selectedJenis:s,hasCategory:t,isRenderTypes:!1}),$(window).on("resize",()=>O({selectedJenis:s,hasCategory:t,isRenderTypes:!1})),$("#search-input").on("input",function(){clearTimeout(e),e=setTimeout(()=>{V(),k()},500)}),$(window).on("scroll",function(){clearTimeout(i),i=setTimeout(async()=>{if(n||W())return;const c=$(window).scrollTop(),l=$(window).height(),r=$(document).height();if(c+l>=r-150){n=!0;try{_(!1),await k()}finally{n=!1}}},200)});function p(c,l=[],r=""){$("#carousel-product-image").empty(),$("#thumbnailGallery").empty();let m=c||[];(r==null?void 0:r.toLowerCase())==="uv board"&&l.length&&(m=[...c,...l]),m.forEach((d,y)=>{const v=y===0?"active":"";$("#carousel-product-image").append(`
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
            `)}),m.length<=1?$("#carouselProduct .carousel-control-next, #carouselProduct .carousel-control-prev").addClass("d-none"):$("#carouselProduct .carousel-control-next, #carouselProduct .carousel-control-prev").removeClass("d-none"),$("#carouselProduct").carousel({interval:3e3,pause:!1});let g;$("#thumbnailGallery").off("click").on("click",".thumbnail-image",function(){const d=$(this).data("index");$("#carouselProduct").carousel(d),$(".thumbnail-image").removeClass("active-thumbnail"),$(this).addClass("active-thumbnail"),setTimeout(()=>$(this).removeClass("active-thumbnail"),500),$("#carouselProduct").carousel("pause"),clearTimeout(g),g=setTimeout(()=>{$("#carouselProduct").carousel("cycle")},5e3)})}$(document).off("click",".product-card").on("click",".product-card",function(){const c=$(this).data("id"),l=$(this).data("code"),r=$(this).data("name"),m=$(this).data("category"),g=$(this).data("type"),d=$(this).data("jenis"),y=parseInt($(this).data("length"),10),v=parseFloat($(this).data("width")).toFixed(1),T=parseFloat($(this).data("density")).toFixed(1),w=$(this).data("url"),f=JSON.parse($(this).attr("data-specifications")||"[]"),j=$(this).attr("data-images"),b=JSON.parse($(this).attr("data-paket")||"[]");let S=$(this).data("height"),J=$(this).data("type-image"),C=[],L=[];if(d!=="card-types"&&h(c),j)try{C=JSON.parse(j.replace(/&quot;/g,'"'))}catch(u){C=[],console.error(u)}if(Array.isArray(b)&&(L=b.sort((u,x)=>u.order-x.order).map(u=>`/storage/${u.image}`)),$("#notes").show(),$("#modalPaket").empty(),d==="card-types"){V(),A({selectedJenis:s,type:g}),_(!1),k();return}d.toLowerCase()==="uv board"&&(P(f),$("#modalVideo, .lebar").hide(),$("#modalCategory").text(m),b.length>0?b.sort((u,x)=>u.order-x.order).map(u=>{$("#modalPaket").append(`
                        <span class="badge badge-outline-primary px-2 py-1 kepadatan" data-value="${u.name}">${u.name}</span>
                    `)}):($("#modalPaket").append('<span class="text-muted">Tidak ada paket</span>'),$("#notes").hide())),d.toLowerCase()==="wallboard"&&(P(f),$("#modalCategory").text(m),$("#ketebalan, .density, #notes, .paket,  #modalVideo, .lebar").hide()),d==="PVC Board"&&(P(f),$("#modalCategory").text(d),$("#modalVideo, .lebar, .paket").hide()),d==="Wallpanel"&&(P(f),$("#modalContact").data("type",g),$("#modalCategory").text(m+" / "+g),$("#ketebalan, #kepadatan, .paket, #modalVideo, #notes, .density").hide(),$("#modalGrafis").attr("src",`/storage/${J}`),$(".grafis").removeClass("d-none")),d.toLowerCase()==="aksesoris"&&($("#tinggi, #ketebalan, #kepadatan, .lebar, .density").hide(),$("#modalCategory").text(m),P(f),$("#modalVideoPlayer").empty(),$("#modalVideo, .density").hide(),w&&($("#modalVideoPlayer").append(`
                    <iframe class="embed-responsive-item"
                    src="${w}"
                    title="YouTube video player" frameborder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; web-share;"
                    referrerpolicy="strict-origin-when-cross-origin"
                    allowfullscreen></iframe>
                `),$("#modalVideo").show())),p(C,L,d),$("#modalName").text(r),$("#productModalLabel").text(r),$("#productModal").modal("show"),$("#modalContact").data({jenis:d,category:m,code:l,length:y,width:v,height:S,density:T,type:g}),$(".kepadatan").removeClass("active"),$("#modalContact").data({kepadatan:null,paket:null}),$(".modalContact").prop("disabled",$(".kepadatan").length>0)}),$(document).on("click",".kepadatan",function(){$(".modalContact").prop("disabled",!1);const c=$(this).data("value");$(this).closest("#productModal").find(".kepadatan").removeClass("active"),$(this).addClass("active"),$("#notes").hide(),$("#modalContact").data("kepadatan",c)}),H(s),B(),F(),G(),U();function h(c){$.ajax({url:`/products/${c}/viewed`,method:"POST",headers:{"X-CSRF-TOKEN":$('meta[name="csrf-token"]').attr("content")},success:l=>console.log("View recorded:",l),error:l=>console.error(l)})}});
