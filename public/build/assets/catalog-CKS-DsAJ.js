function w(){$(document).on("click",".modalDownload",function(t){t.preventDefault();const a=$(this).data("id"),e="{{ route('catalog.pdf.product') }}?id="+encodeURIComponent(a);b(this,e)}),$("#btn-download").on("click",function(t){t.preventDefault(),b(this,"{{ route('catalog.pdf') }}?category="+encodeURIComponent(window.category))})}function b(t,a){const e=$(t);e.prop("disabled",!0).html('<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Mengunduh...'),window.open(a,"_blank"),setTimeout(()=>{e.prop("disabled",!1).html('<i class="fa fa-file-download"></i> Download')},5e3)}function v(){$(document).on("click",".modalContact",function(t){t.preventDefault();const a="62816659688",e=`Halo Admin,
Saya tertarik dengan produk berikut:

• Kode Produk: *${$(this).data("code")}*
• Jenis: *${$(this).data("jenis")}*
• Kategori: *${$(this).data("category")}*

Apakah produk ini masih tersedia? Terima kasih.`;window.open(`https://wa.me/${a}?text=${encodeURIComponent(e)}`,"_blank")})}function k(){$(window).scroll(function(){$(this).scrollTop()>100?$("#btn-scroll-top").fadeIn():$("#btn-scroll-top").fadeOut()}),$("#btn-scroll-top").click(function(){return $("html, body").animate({scrollTop:0},500),!1})}function d(){currentPage=1,isLoading=!1,lastPage=!1,$("#product-list .row").html("")}function C(){$("#loading").removeClass("d-none")}function x(){$("#loading").addClass("d-none")}function j(t){return t.slice().sort((a,e)=>a.pivot.motif&&!e.pivot.motif?-1:!a.pivot.motif&&e.pivot.motif?1:0).map(a=>"/storage/"+a.path)}function P(t,a){let e="";t.forEach(o=>{var m,u,g,p,f,h,y;const i=o.photo?`/storage/${o.photo}`:"https://via.placeholder.com/300x200?text=No+Image",l=j(o.images),n=[i,...l],s=JSON.stringify(n).replace(/"/g,"&quot;"),r=((m=o.category)==null?void 0:m.name)??"Tanpa Kategori";((u=o.category)==null?void 0:u.display_style)==="square"||a===null?e+=`
                    <div class="col-md-2 mb-4">
                        <div class="h-100 product-card"
                    `:((g=o.category)==null?void 0:g.display_style)==="rectangle"?e+=`
                    <div class="col-md-4 mb-4">
                        <div class="h-100 product-card"
                    `:e+=`
                    <div class="col-md-2 mb-4">
                        <div class="h-100 product-card"
                    `,e+=`
                    data-id="${o.id}"
                    data-code="${o.code}"
                    data-category="${r}"
                    data-jenis="${((f=(p=o.category)==null?void 0:p.jenis)==null?void 0:f.name)??""}"
                    data-images="${s}"
                    data-image="${i}"
                    >
                       <img 
                            src="${i}" 
                            class="card-img-top" 
                            alt="${o.name}" 
                            style="
                                border : 1px solid #ccc;
                                height: 200px; 
                                width: 100%; 
                                object-fit: cover; 
                                object-position: ${((y=(h=o.category)==null?void 0:h.jenis)==null?void 0:y.name)==="PVC Board"?"bottom center":"center center"};
                            "
                        >
                        <div class="card-body d-flex flex-column text-center">
                            <h4 class="card-title font-weight-bold text-uppercase mb-2">${o.code}</h4>
                            <h6 class="card-text text-muted mb-1">${r}</h6>
                        </div>
                    </div>
                </div>`}),$("#product-list .row").append(e)}function T(t,a){if(a==null)return;t.forEach(l=>{(l.images??[]).forEach(n=>{console.log("image",n);const s=!!n.pivot.motif;n.path&&!s&&uniquePaths.add(n.path)})});const e=Array.from(uniquePaths),o=$("#mockup-carousel-inner"),i=$("#mockup-carousel-indicators");o.empty(),i.empty(),e.length>0?(e.length===1?($("#mockup .carousel-control-next").addClass("d-none"),$("#mockup .carousel-control-prev").addClass("d-none")):($("#mockup .carousel-control-next").removeClass("d-none"),$("#mockup .carousel-control-prev").removeClass("d-none")),e.slice(0,5).forEach((l,n)=>{o.append(`
                        <div class="carousel-item ${n===0?"active":""}">
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
                    `),i.append(`
                        <li data-target="#carouselExampleControls" data-slide-to="${n}" ${n===0?'class="active"':""}></li>
                    `)}),$("#mockup").removeClass("d-none")):$("#mockup").addClass("d-none")}function I(t){selectedJenis=t.selectedJenis,category=t.category}function c(){if(!category||category==="null"||category===""?$("#btn-download").addClass("d-none"):$("#btn-download").removeClass("d-none"),isLoading||lastPage)return;isLoading=!0,C();const t=$("#search-input").val();$.ajax({url:"/catalog",type:"GET",data:{page:currentPage,search:t,jenis:selectedJenis,category},success:function(a){const e=a.data.data??[];e.length>0?(T(e,selectedJenis),P(e,selectedJenis),currentPage++,currentPage>a.data.last_page&&(lastPage=!0)):(currentPage===1&&($("#mockup").addClass("d-none"),$("#product-list .row").append(`<div class="col-12"><img src="{{ asset('dist/img/no-data.png') }}" alt="no-data"
                            class="img-fluid mx-auto d-block" style="max-width: 100%; height: auto; margin-top: 100px; margin-bottom: 100px;"></div>`)),lastPage=!0),J(a,selectedJenis),isLoading=!1},error:function(){isLoading=!1,console.log("Gagal memuat data.")},complete:function(){isLoading=!1,x()}})}function J(t,a){var l,n;const e=((l=t.jenis)==null?void 0:l.categories)??[],o=(n=t.jenis)==null?void 0:n.name;switch(e.length===0?$("#category-container").addClass("d-none"):$("#category-container").removeClass("d-none"),o){case"PVC Board":$("#category-container, #category-modal-container").addClass("d-none");break;case"Wallboard":case"UV Board":$("#category-menu-item-label, #category-modal-item-label").html("Motif");break;case"Wallpanel":$("#category-menu-item-label, #category-modal-item-label").html("Tipe");break;default:$("#category-menu-item-label, #category-modal-item-label").html("Kategori")}let i='<li class="nav-item font-poppins">';e.forEach(s=>{i+=`
            <a class="nav-link text-dark category-filter d-flex align-items-center justify-content-start" 
                href="#" data-jenis-id="${s.jenis_id}" data-id="${s.id}">
                <img src="${s.image??"dist/img/product/1.webp"}" alt="${s.name}" 
                class="mr-2 img-thumbnail" style="width: 50px; height: 50px; object-fit: contain;">
                <span>${s.name} ${s.products_count>0?`(${s.products_count})`:""}</span>
            </a>`}),i+="</li>",$("#category-menu-item, #category-menu-item-modal").html(i),!category&&e.length>0?(category=e[0].id,d(),c()):category&&$(`.category-filter[data-id="${category}"]`).addClass("active")}$(document).ready(function(){const t=new URLSearchParams(window.location.search).get("jenis");let a=null,e;I({selectedJenis:t,category:a}),c(),t&&($("#category-container").removeClass("d-md-none"),$("#catalog-col").removeClass("center-content")),$(window).width()<768&&$("#filter-container").addClass("d-none"),t==1&&($("#filter-container").addClass("d-none"),$("#catalog-col").removeClass("col-md-10"),$("#catalog-col").addClass("col-md-12")),$("#search-input").on("input",function(){clearTimeout(e),e=setTimeout(()=>{d(),c()},500)}),$(document).on("click",".category-filter",function(o){o.preventDefault(),a=$(this).data("id"),$("#filterModal").modal("hide"),d(),c()}),$(window).on("scroll",function(){const o=$(window).scrollTop(),i=$(window).height(),l=$(document).height();o+i>=l-150&&c()}),w(),v(),k()});
