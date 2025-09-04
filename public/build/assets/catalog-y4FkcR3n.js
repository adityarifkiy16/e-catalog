let D=null;function H(e){D=e}function E(){return D}function O(){$("#loading").removeClass("d-none")}function G(){$("#loading").addClass("d-none")}function J(e){return e.slice().sort((o,t)=>o.pivot.motif&&!t.pivot.motif?-1:!o.pivot.motif&&t.pivot.motif?1:0).map(o=>"/storage/"+o.path)}function F(){$(document).on("click",".modalDownload",function(e){e.preventDefault();const o=$(this).data("id"),t="catalog/pdf/product?id="+encodeURIComponent(o);M(this,t)}),$("#btn-download").on("click",function(e){e.preventDefault(),M(this,"catalog/pdf?category="+encodeURIComponent(E()))})}function M(e,o){const t=$(e);t.prop("disabled",!0).html('<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Mengunduh...'),window.open(o,"_blank"),setTimeout(()=>{t.prop("disabled",!1).html('<i class="fa fa-file-download"></i> Download')},5e3)}function R(){$(document).on("click",".modalContact",function(e){e.preventDefault(),console.log("Klik tombol order",$(this).data("code"));const o="62816659688",t=$(this).data("jenis");console.log(t.toLowerCase());let a="";t.toLowerCase()=="wallpanel"?a=`Halo Admin,
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

Apakah produk ini masih tersedia? Terima kasih.`,window.open(`https://wa.me/${o}?text=${encodeURIComponent(a)}`,"_blank")})}function W(){$(window).scroll(function(){$(this).scrollTop()>100?$("#btn-scroll-top").fadeIn():$("#btn-scroll-top").fadeOut()}),$("#btn-scroll-top").click(function(){return $("html, body").animate({scrollTop:0},500),!1})}function q(e,o){$("#btn-download").removeClass("d-none");let t="";e.forEach(a=>{var h,c,u,p,g,x,w,j,P;const r=a.photo?`/storage/${a.photo}`:"https://via.placeholder.com/300x200?text=No+Image",l=J(a.images),i=[r,...l],s=JSON.stringify(i).replace(/"/g,"&quot;"),d=JSON.stringify(a.packages).replace(/"/g,"&quot;"),m=((h=a.category)==null?void 0:h.name)??"Tanpa Kategori";let n=a.code;o==3?n=a.code.split(" ").slice(4).join(" ").trim():o==5?n=a.code.split(" ").slice(1).join(" "):n=a.code,((c=a.category)==null?void 0:c.display_style)==="square"||o===null?t+=`
                    <div class="col-md-2 col-6 mb-4">
                        <div class="h-100 product-card"
                    `:((u=a.category)==null?void 0:u.display_style)==="rectangle"?t+=`
                    <div class="col-md-4 col-6 mb-4">
                        <div class="h-100 product-card"
                    `:t+=`
                    <div class="col-md-2 col-6 mb-4">
                        <div class="h-100 product-card d-flex flex-column justify-content-center align-items-center"
                    `,t+=`
                    data-id="${a.id}"
                    data-code="${n}"
                    data-category="${m}"
                    data-jenis="${((g=(p=a.category)==null?void 0:p.jenis)==null?void 0:g.name)??""}"
                    data-length="${a.panjang}"
                    data-height="${a.tinggi}"
                    data-density="${a.ketebalan}"
                    data-images="${s}"
                    data-image="${r}"
                    data-type="${((w=(x=a.category)==null?void 0:x.types)==null?void 0:w.name)??""}"
                    data-url="${a.url_video}"
                    data-paket="${d}"
                    >
                       <img 
                            src="${r}" 
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
                                object-position: ${((P=(j=a.category)==null?void 0:j.jenis)==null?void 0:P.name)==="PVC Board"?"bottom center":"center center"};
                            "
                        >
                        <div class="card-body d-flex flex-column text-center">
                            <h4 class="card-title font-weight-bold text-uppercase mb-2">
                                ${n}
                            </h4>
                            <h6 class="card-text text-muted mb-1">${m}</h6>
                        </div>
                    </div>
                </div>`}),$("#product-list .row").append(t)}function Y(e,o){$("#btn-download").addClass("d-none");let t="";e.forEach(a=>{const r=a.thumbnail?`/storage/${a.thumbnail}`:"https://via.placeholder.com/300x200?text=No+Image";console.log(o);const l=o==3?"wallpanel":"tanpa kategori";t+=`
                    <div class="col-md-2 col-6 mb-4">
                        <div class="h-100 product-card d-flex flex-column justify-content-center align-items-center"
                    `,t+=`
                    data-id="${a.id}"
                    data-jenis="tipe-wallpanel"
                    data-category="${l}"
                    data-type="${a.id}"
                    >
                       <img 
                            src="${r}" 
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
                            <h6 class="card-text text-muted mb-1">${l}</h6>
                        </div>
                    </div>
                </div>`}),$("#product-list .row").append(t)}function z(e,o,t){if(o==null)return;e.forEach(s=>{s.path&&t.add(s.path)});const a=Array.from(t),r=$("#mockup-carousel-inner"),l=$("#mockup-carousel-indicators"),i=["https://www.youtube.com/embed/BiiUrYAbL9s?autoplay=1&mute=1&rel=0&controls=0&amp;loop=1&playlist=BiiUrYAbL9s"];if(r.empty(),l.empty(),o==4){$("#mockup-carousel").carousel({interval:!1}),$("#mockup .carousel-control-next").addClass("d-none"),$("#mockup .carousel-control-prev").addClass("d-none"),i.forEach((s,d)=>{r.append(`
            <div class="carousel-item ${d===0?"active":""}">
                <div class="d-flex justify-content-center align-items-center">
                    <div class="embed-responsive embed-responsive-16by9 rounded-lg" style="width:100%;">
                        <iframe
                            class="embed-responsive-item"
                            src="${s}"
                            title="YouTube video player"
                            frameborder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; web-share"
                            allowfullscreen
                        ></iframe>
                    </div>
                </div>
            </div>
        `)}),$("#mockup").removeClass("d-none");return}a.length>0?(a.length===1?($("#mockup .carousel-control-next").addClass("d-none"),$("#mockup .carousel-control-prev").addClass("d-none")):($("#mockup .carousel-control-next").removeClass("d-none"),$("#mockup .carousel-control-prev").removeClass("d-none")),a.slice(0,5).forEach((s,d)=>{r.append(`
                <div class="carousel-item ${d===0?"active":""}">
                    <img src="/storage/${s}" id="mockup-image" alt="mockup" 
                        class="img-fluid w-100 rounded-lg d-block mx-auto"
                    >
                </div>
            `),l.append(`
                <li data-target="#mockup-carousel" data-slide-to="${d}" ${d===0?'class="active"':""}></li>
            `)}),$("#mockup").removeClass("d-none")):$("#mockup").addClass("d-none")}let k=null,b=null,A=null,y=1,T=!1,C=!1;const U=new Set;let _=!0;function V(e){_=e}function S(e){k=e.selectedJenis,b=e.category??null,A=e.type??null}function v(){return new Promise((e,o)=>{if($(window).width()<768&&$("#filter-container").addClass("d-none"),T||C)return e();T=!0,O();const t=$("#search-input").val();$.ajax({url:"/catalog",type:"GET",data:{page:y,search:t,jenis:k,category:b,type:A},success:function(a){const r=a.data.data??[],l=a.types??[];A&&($("#backButton").removeClass("d-none"),$("#homeButton").addClass("d-none")),k==3&&_?(l.length>0&&(Y(l,k),y++,y>a.data.last_page&&(C=!0)),B(a,!0)):(r.length>0?(q(r,k),y++,y>a.data.last_page&&(C=!0)):(y===1&&($("#mockup").addClass("d-none"),$("#product-list .row").append(`<div class="col-12"><img src="dist/img/no-data.png" alt="no-data"
                                class="img-fluid mx-auto d-block" style="max-width: 100%; height: auto; margin-top: 100px; margin-bottom: 100px;"></div>`)),C=!0),B(a,!1)),e()},error:function(){console.log("Gagal memuat data."),o()},complete:function(){T=!1,G()}})})}function B(e,o=!0){var s,d,m;const t=e.category,a=(s=e.jenis)==null?void 0:s.name,l=((m=(d=e.data.data[0])==null?void 0:d.category)==null?void 0:m.images)??[];switch(t.length===0?$("#category-container").addClass("d-none"):($("#category-container").removeClass("d-none"),l.length===0&&$("#mockup").addClass("d-none"),z(l,k,U)),a){case"PVC Board":$("#category-container").addClass("d-none"),$(".category-modal-container").text("Tidak ada kategori");break;case"Wallboard":$("#category-menu-item-label, #category-modal-item-label").html("Motif");break;case"UV Board":$("#category-menu-item-label, #category-modal-item-label").html("Motif");break;case"Wallpanel":$("#category-menu-item-label, #category-modal-item-label").html("Motif");break;case"Aksesoris":$("#category-menu-item-label, #category-modal-item-label").html("Ukuran");break;default:$("#category-menu-item-label, #category-modal-item-label").html("Kategori")}let i='<li class="nav-item font-poppins">';Array.isArray(t)&&t.length>0?t.forEach(n=>{i+=`
            <a class="nav-link text-white category-filter d-flex align-items-center justify-content-start" 
                href="#" data-jenis-id="${n.jenis_id}" data-id="${n.id}" data-type="${n.type_id}">
                <img src="${n.path?"storage/"+n.path:"dist/img/product/1.webp"}" alt="${n.name}" 
                class="mr-2 img-thumbnail" style="width: 50px; height: 50px; object-fit: contain;">
                <span class="text-capitalize">${n.name}</span>
            </a>`}):i+='<a class="nav-link text-white category-filter" href="#">Tanpa Kategori</a>',i+="</li>",o?($("#category-menu-item-label, #category-modal-item-label").html(""),$("#category-menu-item,#category-menu-item-modal").html("tidak ada kategori")):$("#category-menu-item, #category-menu-item-modal").html(i),!b&&t.length>0?(console.log("auto choose category"),b=t[0].id,H(b),N(),v()):b&&$(`.category-filter[data-id="${b}"]`).addClass("active")}function N(){y=1,T=!1,C=!1,U.clear(),$("#product-list .row").html("")}let I=!1;function Q(e){$(document).off("click",".category-filter"),$(document).on("click",".category-filter",async function(o){if(o.preventDefault(),I)return;I=!0;const t=$(this).data("id"),a=$(this).data("type");console.log(a);try{S({selectedJenis:e,category:t,type:a}),H(t),$("#filterModal").modal("hide"),N(),await v(!1)}catch(r){console.error("Gagal memuat data:",r)}finally{I=!1}})}$(document).ready(function(){let e=new URLSearchParams(window.location.search).get("jenis"),o=new URLSearchParams(window.location.search).get("category"),t,a;(e==5||e==2)&&sessionStorage.removeItem("selectedWallpanel"),S({selectedJenis:e,category:o}),v(),e&&($("#category-container").removeClass("d-md-none"),$("#catalog-col").removeClass("center-content")),$(window).width()<768&&$("#filter-container").addClass("d-none"),(e==1||e==3)&&($("#filter-container").addClass("d-none"),$("#catalog-col").removeClass("col-md-10"),$("#catalog-col").addClass("col-md-12")),$("#search-input").on("input",function(){clearTimeout(t),t=setTimeout(()=>{N(),v()},500)}),$(window).on("scroll",function(){clearTimeout(a),a=setTimeout(()=>{const l=$(window).scrollTop(),i=$(window).height(),s=$(document).height();l+i>=s-150&&(V(!1),v())},200)});function r(l,i=null,s=null){$("#carousel-product-image").empty(),$("#thumbnailGallery").empty();let d=[...l];s.toLowerCase()=="uv board"?d=[...l,...i]:d=[...l],d.forEach((n,h)=>{const c=h===0?"active":"";$("#carousel-product-image").append(`
                    <div class="carousel-item ${c}">
                        <img src="${n}" class="img-fluid d-block mx-auto"
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
                           <img src="${n}" 
                            class="img-thumbnail thumbnail-image p-0 w-100 h-100" 
                            style="
                                height: auto;
                                aspect-ratio: 1 / 1;
                                border: 1px solid #ccc;
                                border-radius: 8px;
                                object-fit: cover;
                                cursor: pointer;"
                            data-index="${h}">
                        </div>
                    </div>
                    `)}),l.length<=1?($("#carouselProduct .carousel-control-next").addClass("d-none"),$("#carouselProduct .carousel-control-prev").addClass("d-none")):($("#carouselProduct .carousel-control-next").removeClass("d-none"),$("#carouselProduct .carousel-control-prev").removeClass("d-none")),$("#carouselProduct").carousel({interval:3e3,pause:!1});let m;$("#thumbnailGallery").off("click").on("click",".thumbnail-image",function(){const n=$(this).data("index");$("#carouselProduct").carousel(n),$(".thumbnail-image").removeClass("active-thumbnail"),$(this).addClass("active-thumbnail"),setTimeout(()=>{$(this).removeClass("active-thumbnail")},500),$("#carouselProduct").carousel("pause"),clearTimeout(m),m=setTimeout(()=>{$("#carouselProduct").carousel("cycle")},5e3)})}$(document).on("click",".product-card",function(){const l=$(this).data("code"),i=$(this).data("category"),s=$(this).attr("data-images"),d=$(this).data("type"),m=JSON.parse($(this).attr("data-paket")||"[]");let n=null,h=null;Array.isArray(m)&&(h=m.sort((f,L)=>f.order-L.order).map(f=>`/storage/${f.image}`)),s&&(n=JSON.parse(s.replace(/&quot;/g,'"')));const c=$(this).data("jenis"),u=parseInt($(this).data("length"),10),p=parseInt($(this).data("height"),10),g=parseFloat($(this).data("density")).toFixed(1),x=$(this).data("id"),w=$(this).data("url");if($("#modalPaket").empty(),c==="tipe-wallpanel"){N(),S({selectedJenis:3,type:d}),V(!1),v(),$("#filter-container").toggleClass("d-none"),$("#catalog-col").toggleClass("col-md-10 col-md-12");return}c.toLowerCase()==="uv board"&&($("#modalVideo").hide(),$("#modalCategory").text(i),$("#modalLength").text(u&&!isNaN(u)?u+" cm":"-"),$("#modalHeight").text(p&&!isNaN(p)?p+" cm":"-"),$("#modalDensity").text(g&&!isNaN(g)?g+" mm":"-"),$("#modalKepadatan").html(`
                <span class="">0.9 mm</span>
            `),m.length>0?m.sort((f,L)=>f.order-L.order).map(f=>{$("#modalPaket").append(`
                        <span class="badge badge-outline-primary px-2 py-1 kepadatan" data-value="${f.name}">${f.name}</span>
                    `)}):($("#modalPaket").append('<span class="text-muted">Tidak ada paket</span>'),$("#notes").hide())),c.toLowerCase()==="wallboard"&&($("#modalCategory").text(i),$("#modalLength").text(u&&!isNaN(u)?u+" cm":"-"),$("#modalHeight").text(p&&!isNaN(p)?p+" cm":"-"),$("#ketebalan, #kepadatan, #notes, .paket,  #modalVideo").hide()),c==="PVC Board"&&($("#modalCategory").text(c),$("#modalLength").text(u&&!isNaN(u)?u+" cm":"-"),$("#modalHeight").text(p&&!isNaN(p)?p+" cm":"-"),$("#modalDensity").text(g&&!isNaN(g)?g+" mm":"-"),$("#modalKepadatan").html(`
                <span class="badge badge-outline-primary kepadatan" data-value="0,4 mm">0,4mm (Lite)</span>
                <span class="badge badge-outline-primary kepadatan" data-value="0,55 mm">0,55mm (Standar)</span>
                <span class="badge badge-outline-primary kepadatan" data-value="0,7 mm">0,7mm (Heavy-duty)</span>
            `),$(".paket,  #modalVideo").hide()),c==="Wallpanel"&&($("#modalContact").data("type",d),$("#modalCategory").text(i+" / "+d),$("#panjang, #tinggi, #ketebalan, #kepadatan, #notes, .paket, #modalVideo").hide()),c.toLowerCase()==="aksesoris"&&($("#panjang, #tinggi, #ketebalan, #kepadatan, #notes, .paket").hide(),$("#modalCategory").text(i),$("#modalVideoPlayer").empty(),$("#modalVideo").hide(),w&&($("#modalVideoPlayer").append(`
                    <iframe class="embed-responsive-item"
                    src="${w}"
                    title="YouTube video player" frameborder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; web-share;"
                    referrerpolicy="strict-origin-when-cross-origin"
                    allowfullscreen></iframe>
                `),$("#modalVideo").show())),r(n,h,c),$("#modalCode").text(l),$("#productModalLabel").text(l),$("#modalDownload").data("id",x),$("#productModal").modal("show"),$("#modalContact").data("jenis",c),$("#modalContact").data("category",i),$("#modalContact").data("code",l);let j=$("#modalContact").data("kepadatan"),P=$("#modalContact").data("paket");j&&($(".kepadatan").removeClass("active"),$("#modalContact").data("kepadatan",null),$("#notes").show()),P&&($(".kepadatan").removeClass("active"),$("#modalContact").data("kepadatan",null),$("#notes").show());let K=$(".kepadatan");console.log(K.length),K.length>0?$(".modalContact").prop("disabled",!0):$(".modalContact").prop("disabled",!1)}),$(document).on("click",".kepadatan",function(){$(".modalContact").prop("disabled",!1);let l=$(this).data("value");$(this).closest("#productModal").find(".kepadatan").removeClass("active"),$(this).addClass("active"),$("#notes").hide(),$("#modalContact").data("kepadatan",l)}),Q(e),F(),R(),W()});
