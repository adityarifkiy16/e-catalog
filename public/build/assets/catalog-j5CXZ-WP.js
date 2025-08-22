let B=null;function K(e){B=e}function A(){return B}function M(){$("#loading").removeClass("d-none")}function H(){$("#loading").addClass("d-none")}function E(e){return e.slice().sort((o,t)=>o.pivot.motif&&!t.pivot.motif?-1:!o.pivot.motif&&t.pivot.motif?1:0).map(o=>"/storage/"+o.path)}function _(){$(document).on("click",".modalDownload",function(e){e.preventDefault();const o=$(this).data("id"),t="catalog/pdf/product?id="+encodeURIComponent(o);D(this,t)}),$("#btn-download").on("click",function(e){e.preventDefault(),D(this,"catalog/pdf?category="+encodeURIComponent(A()))})}function D(e,o){const t=$(e);t.prop("disabled",!0).html('<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Mengunduh...'),window.open(o,"_blank"),setTimeout(()=>{t.prop("disabled",!1).html('<i class="fa fa-file-download"></i> Download')},5e3)}function G(){$(document).on("click",".modalContact",function(e){e.preventDefault(),console.log("Klik tombol order",$(this).data("code"));const o="62816659688",t=$(this).data("jenis");console.log(t.toLowerCase());let a="";t.toLowerCase()=="wallpanel"?a=`Halo Admin,
Saya tertarik dengan produk berikut:

• Tipe Wallpanel: *${$(this).data("type")}*
• Kode Motif : *${$(this).data("code")}*
• Produk : *${$(this).data("jenis")}*
• Kategori: *${$(this).data("category")}*

Apakah produk ini masih tersedia? Terima kasih.`:t.toLowerCase()=="pvc board"?a=`Halo Admin,
Saya tertarik dengan produk berikut:

• Produk : *${$(this).data("jenis")}*
• Ketebalan : *${$(this).data("code")}*
• Kepadatan: *${$(this).data("kepadatan")??"-"}*

Apakah produk ini masih tersedia? Terima kasih.`:t.toLowerCase()=="uv board"?a=`Halo Admin,
Saya tertarik dengan produk berikut:

• Kode Motif : *${$(this).data("code")}*
• Produk : *${$(this).data("jenis")}*
• Kategori: *${$(this).data("category")}*

• Paket: *${$(this).data("kepadatan")??"-"}*

Apakah produk ini masih tersedia? Terima kasih.`:a=`Halo Admin,
Saya tertarik dengan produk berikut:

• Kode Motif : *${$(this).data("code")}*
• Produk : *${$(this).data("jenis")}*
• Kategori: *${$(this).data("category")}*

Apakah produk ini masih tersedia? Terima kasih.`,window.open(`https://wa.me/${o}?text=${encodeURIComponent(a)}`,"_blank")})}function U(){$(window).scroll(function(){$(this).scrollTop()>100?$("#btn-scroll-top").fadeIn():$("#btn-scroll-top").fadeOut()}),$("#btn-scroll-top").click(function(){return $("html, body").animate({scrollTop:0},500),!1})}function O(e,o){let t="";e.forEach(a=>{var s,r,p,u,f,v,w,C,x;const i=a.photo?`/storage/${a.photo}`:"https://via.placeholder.com/300x200?text=No+Image",n=E(a.images),l=[i,...n],c=JSON.stringify(l).replace(/"/g,"&quot;"),m=((s=a.category)==null?void 0:s.name)??"Tanpa Kategori";let d=a.code;o==3?d=a.code.split(" ").slice(4).join(" ").trim():o==5?d=a.code.split(" ").slice(1).join(" "):d=a.code,((r=a.category)==null?void 0:r.display_style)==="square"||o===null?t+=`
                    <div class="col-md-2 col-6 mb-4">
                        <div class="h-100 product-card"
                    `:((p=a.category)==null?void 0:p.display_style)==="rectangle"?t+=`
                    <div class="col-md-4 col-6 mb-4">
                        <div class="h-100 product-card"
                    `:t+=`
                    <div class="col-md-2 col-6 mb-4">
                        <div class="h-100 product-card d-flex flex-column justify-content-center align-items-center"
                    `,t+=`
                    data-id="${a.id}"
                    data-code="${d}"
                    data-category="${m}"
                    data-jenis="${((f=(u=a.category)==null?void 0:u.jenis)==null?void 0:f.name)??""}"
                    data-length="${a.panjang}"
                    data-height="${a.tinggi}"
                    data-density="${a.ketebalan}"
                    data-images="${c}"
                    data-image="${i}"
                    data-type="${((w=(v=a.category)==null?void 0:v.types)==null?void 0:w.name)??""}"
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
                                object-position: ${((x=(C=a.category)==null?void 0:C.jenis)==null?void 0:x.name)==="PVC Board"?"bottom center":"center center"};
                            "
                        >
                        <div class="card-body d-flex flex-column text-center">
                            <h4 class="card-title font-weight-bold text-uppercase mb-2">
                                ${d}
                            </h4>
                            <h6 class="card-text text-muted mb-1">${m}</h6>
                        </div>
                    </div>
                </div>`}),$("#product-list .row").append(t)}function R(e,o){let t="";e.forEach(a=>{const i=a.thumbnail?`/storage/${a.thumbnail}`:"https://via.placeholder.com/300x200?text=No+Image";console.log(o);const n=o==3?"wallpanel":"tanpa kategori";t+=`
                    <div class="col-md-2 col-6 mb-4">
                        <div class="h-100 product-card d-flex flex-column justify-content-center align-items-center"
                    `,t+=`
                    data-id="${a.id}"
                    data-jenis="tipe-wallpanel"
                    data-category="${n}"
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
                            <h6 class="card-text text-muted mb-1">${n}</h6>
                        </div>
                    </div>
                </div>`}),$("#product-list .row").append(t)}function W(e,o,t){if(o==null)return;console.log("rendering mockup/landing page..."),console.log(e),e.forEach(l=>{l.path&&t.add(l.path)});const a=Array.from(t),i=$("#mockup-carousel-inner"),n=$("#mockup-carousel-indicators");i.empty(),n.empty(),a.length>0?(a.length===1?($("#mockup .carousel-control-next").addClass("d-none"),$("#mockup .carousel-control-prev").addClass("d-none")):($("#mockup .carousel-control-next").removeClass("d-none"),$("#mockup .carousel-control-prev").removeClass("d-none")),a.slice(0,5).forEach((l,c)=>{i.append(`
                        <div class="carousel-item ${c===0?"active":""}">
                            <img src="/storage/${l}" id="mockup-image" alt="mockup" 
                                class="img-fluid w-100 rounded-lg d-block mx-auto"
                                style="
                                    width: 100%;  
                                    height: 70vh;                
                                    aspect-ratio: 16 / 9;      
                                    object-fit: cover;        
                                    object-position: center 75%;   
                                    display: block;
                                    margin: 0 auto;          
                                    border-radius: 8px;        
                                    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1); 
                                ">
                        </div>
                    `),n.append(`
                        <li data-target="#carouselExampleControls" data-slide-to="${c}" ${c===0?'class="active"':""}></li>
                    `)}),$("#mockup").removeClass("d-none")):$("#mockup").addClass("d-none")}let y=null,g=null,I=null,h=1,j=!1,b=!1;const S=new Set;function L(e){y=e.selectedJenis,g=e.category??null,I=e.type??null}function k(e=!0){return new Promise((o,t)=>{if($(window).width()<768&&$("#filter-container").addClass("d-none"),!g||g==="null"||g===""?$("#btn-download").addClass("d-none"):$("#btn-download").removeClass("d-none"),j||b)return o();j=!0,M();const a=$("#search-input").val();$.ajax({url:"/catalog",type:"GET",data:{page:h,search:a,jenis:y,category:g,type:I},success:function(i){console.log("Data berhasil dimuat."),console.log(i);const n=i.data.data??[],l=i.types??[];I&&($("#backButton").removeClass("d-none"),$("#homeButton").addClass("d-none"),console.log("remove class")),y==3&&e?(console.log("isFirstLoad:"+e),l.length>0&&(R(l,y),h++,h>i.data.last_page&&(b=!0)),T(i,!0)):(console.log("isFirstLoad:"+e),n.length>0?(O(n,y),h++,h>i.data.last_page&&(b=!0)):(h===1&&($("#mockup").addClass("d-none"),$("#product-list .row").append(`<div class="col-12"><img src="dist/img/no-data.png" alt="no-data"
                                class="img-fluid mx-auto d-block" style="max-width: 100%; height: auto; margin-top: 100px; margin-bottom: 100px;"></div>`)),b=!0),T(i,!1)),T(i,!1),o()},error:function(){console.log("Gagal memuat data."),t()},complete:function(){j=!1,H()}})})}function T(e,o=!0){var c,m,d;const t=e.category,a=(c=e.jenis)==null?void 0:c.name,n=((d=(m=e.data.data[0])==null?void 0:m.category)==null?void 0:d.images)??[];switch(t.length===0?$("#category-container").addClass("d-none"):($("#category-container").removeClass("d-none"),n.length===0&&$("#mockup").addClass("d-none"),W(n,y,S)),a){case"PVC Board":$("#category-container, #category-modal-container").addClass("d-none");break;case"Wallboard":case"UV Board":$("#category-menu-item-label, #category-modal-item-label").html("Motif");break;case"Wallpanel":break;case"Aksesoris":$("#category-container, #category-modal-container").addClass("d-none");break;default:$("#category-menu-item-label, #category-modal-item-label").html("Kategori")}let l='<li class="nav-item font-poppins">';Array.isArray(t)&&t.length>0?t.forEach(s=>{l+=`
            <a class="nav-link text-white category-filter d-flex align-items-center justify-content-start" 
                href="#" data-jenis-id="${s.jenis_id}" data-id="${s.id}" data-type="${s.type_id}">
                <img src="${s.path?"storage/"+s.path:"dist/img/product/1.webp"}" alt="${s.name}" 
                class="mr-2 img-thumbnail" style="width: 50px; height: 50px; object-fit: contain;">
                <span class="text-capitalize">${s.name}</span>
            </a>`}):l+='<a class="nav-link text-white category-filter" href="#">Tanpa Kategori</a>',l+="</li>",$("#category-menu-item, #category-menu-item-modal").html(l),!g&&t.length>0?(g=t[0].id,K(g),P(),k(o)):g&&$(`.category-filter[data-id="${g}"]`).addClass("active")}function P(){h=1,j=!1,b=!1,S.clear(),$("#product-list .row").html("")}let N=!1;function q(e){$(document).off("click",".category-filter"),$(document).on("click",".category-filter",async function(o){if(o.preventDefault(),N)return;N=!0;const t=$(this).data("id"),a=$(this).data("type");console.log(a);try{L({selectedJenis:e,category:t,type:a}),K(t),$("#filterModal").modal("hide"),P(),await k(!1)}catch(i){console.error("Gagal memuat data:",i)}finally{N=!1}})}$(document).ready(function(){let e=new URLSearchParams(window.location.search).get("jenis"),o=new URLSearchParams(window.location.search).get("category"),t,a;(e==5||e==2)&&sessionStorage.removeItem("selectedWallpanel"),L({selectedJenis:e,category:o}),k(),e&&($("#category-container").removeClass("d-md-none"),$("#catalog-col").removeClass("center-content")),$(window).width()<768&&$("#filter-container").addClass("d-none"),(e==1||e==3||e==4)&&($("#filter-container").addClass("d-none"),$("#catalog-col").removeClass("col-md-10"),$("#catalog-col").addClass("col-md-12")),$("#search-input").on("input",function(){clearTimeout(t),t=setTimeout(()=>{P(),k()},500)}),$(window).on("scroll",function(){clearTimeout(a),a=setTimeout(()=>{const n=$(window).scrollTop(),l=$(window).height(),c=$(document).height();n+l>=c-150&&k()},200)});function i(n,l=null,c=null){$("#carousel-product-image").empty(),$("#thumbnailGallery").empty();let m=[...n];c.toLowerCase()=="uv board"?m=[...n,...l]:m=[...n],m.forEach((d,s)=>{const r=s===0?"active":"";$("#carousel-product-image").append(`
                    <div class="carousel-item ${r}">
                        <img src="${d}" class="img-fluid d-block mx-auto"
                            style="
                                width: 100%;
                                max-width: 400px;
                                aspect-ratio: 1 / 1;
                                object-fit: cover;
                                border-radius: 8px;
                                border: 1px solid #ccc;
                            ">
                    </div>
                `),$("#thumbnailGallery").append(`
                    <div class="col-2 mb-0 d-flex justify-content-center">
                        <div style="height: 90%">
                           <img src="${d}" 
                            class="img-thumbnail thumbnail-image p-0 w-100 h-100" 
                            style="
                                height: auto;
                                aspect-ratio: 1 / 1;
                                border: 1px solid #ccc;
                                border-radius: 8px;
                                object-fit: cover;
                                cursor: pointer;"
                            data-index="${s}">
                        </div>
                    </div>
                    `)}),n.length<=1?($("#carouselProduct .carousel-control-next").addClass("d-none"),$("#carouselProduct .carousel-control-prev").addClass("d-none")):($("#carouselProduct .carousel-control-next").removeClass("d-none"),$("#carouselProduct .carousel-control-prev").removeClass("d-none")),$("#thumbnailGallery").on("click",".thumbnail-image",function(){const d=$(this).data("index");$("#carouselProduct .carousel-item").removeClass("active"),$("#carouselProduct .carousel-item").eq(d).addClass("active")})}$(document).on("click",".product-card",function(){const n=$(this).data("code"),l=$(this).data("category"),c=$(this).attr("data-images"),m=$(this).data("type");let d=null,s=[{path:`/dist/img/paket/1.png?v=${Date.now()}`},{path:`/dist/img/paket/2.png?v=${Date.now()}`},{path:`/dist/img/paket/3.png?v=${Date.now()}`}];s=s.map(x=>x.path),c&&(d=JSON.parse(c.replace(/&quot;/g,'"')));const r=$(this).data("jenis"),p=parseInt($(this).data("length"),10),u=parseInt($(this).data("height"),10),f=parseInt($(this).data("density"),10),v=$(this).data("id");if(r==="tipe-wallpanel"){P(),L({selectedJenis:3,type:m}),k(!1),$("#filter-container").toggleClass("d-none"),$("#catalog-col").toggleClass("col-md-10 col-md-12");return}r.toLowerCase()==="uv board"&&($("#ketebalan, #kepadatan").hide(),$("#modalCategory").text(l),$("#modalLength").text(p&&!isNaN(p)?p+" cm":"-"),$("#modalHeight").text(u&&!isNaN(u)?u+" cm":"-"),$("#modalPaket").html(`
                <span class="badge badge-outline-primary px-2 py-1 kepadatan" data-value="1">Bundle 1</span>
                <span class="badge badge-outline-primary px-2 py-1 ml-1 kepadatan" data-value="2">Bundle 2</span>
                <span class="badge badge-outline-primary px-2 py-1 ml-1 kepadatan" data-value="3">Bundle 3</span>
            `)),r.toLowerCase()==="wallboard"&&($("#modalCategory").text(l),$("#modalLength").text(p&&!isNaN(p)?p+" cm":"-"),$("#modalHeight").text(u&&!isNaN(u)?u+" cm":"-"),$("#ketebalan, #kepadatan, #notes, .paket").hide()),r==="PVC Board"&&($("#modalCategory").text(r),$("#modalLength").text(p&&!isNaN(p)?p+" cm":"-"),$("#modalHeight").text(u&&!isNaN(u)?u+" cm":"-"),$("#modalDensity").text(f&&!isNaN(f)?f+" mm":"-"),$("#modalKepadatan").html(`
                <span class="badge badge-outline-primary kepadatan" data-value="0,4 mm">0,4 mm</span>
                <span class="badge badge-outline-primary kepadatan" data-value="0,55 mm">0,55 mm</span>
                <span class="badge badge-outline-primary kepadatan" data-value="0,7 mm">0,7 mm</span>
            `),$(".paket").hide()),r==="Wallpanel"&&($("#modalContact").data("type",m),$("#modalCategory").text(l+" / "+m),$("#panjang, #tinggi, #ketebalan, #kepadatan, #notes, .paket").hide()),r.toLowerCase()==="aksesoris"&&($("#panjang, #tinggi, #ketebalan, #kepadatan, #notes, .paket").hide(),$("#modalCategory").text(l)),i(d,s,r),$("#modalCode").text(n),$("#productModalLabel").text(n),$("#modalDownload").data("id",v),$("#productModal").modal("show"),$("#modalContact").data("jenis",r),$("#modalContact").data("category",l),$("#modalContact").data("code",n);let w=$("#modalContact").data("kepadatan"),C=$("#modalContact").data("paket");w&&($(".kepadatan").removeClass("active"),$("#modalContact").data("kepadatan",null),$("#notes").show()),C&&($(".kepadatan").removeClass("active"),$("#modalContact").data("kepadatan",null),$("#notes").show())}),$(document).on("click",".kepadatan",function(){let n=$(this).data("value");$(this).closest("#productModal").find(".kepadatan").removeClass("active"),$(this).addClass("active"),$("#notes").hide(),$("#modalContact").data("kepadatan",n)}),q(e),_(),G(),U()});
