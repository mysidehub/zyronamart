// ===================== STORE SETTINGS =====================
const STORE = {
  name: "ZyronaMart",
  // IMPORTANT: Replace this with your WhatsApp number including country code.
  // India example: "919876543210" (do not add +, spaces or dashes).
  whatsappNumber: "919315330320",
  freeShippingAbove: 1499,
  shippingCharge: 79,
  couponCode: "ZYRO10",
  couponMinimum: 2999,
  couponPercent: 10
};

// 80 sample products across 6 categories. Replace names, prices and images as needed.
const catalog = [
  ["Mini Rechargeable Water Pump","Home","image/mini-water-pump.jpg",499,799,4.6],
  ["30W PD Fast Charging Power Bank","Electronics","image/pd-fast-charging-power-bank.jpg",899,1399,4.6],
  ["Multi-Function Gadget Accessories Kit","Electronics","image/multi-function-gadget-kit.jpg",399,699,4.6],
  ["120W Turbo Fast Charger","Electronics","image/120w-turbo-fast-charger.jpg",599,999,4.6],
  ["High-Capacity Rechargeable Fan","Home","image/rechargeable-mini-fan.jpg",699,1099,4.6],
  ["Printed Women's Ethnic Saree","Fashion","image/printed-ethnic-saree-purple.jpg",1299,1999,4.6],
  ["Novelties Baby Diaper Pants Pack","Home","image/baby-diaper-pants-pack.jpg",599,899,4.6],
  ["Yellow Printed Women's Saree","Fashion","image/yellow-printed-saree.jpg",1199,1899,4.6],
  ["Purple Traditional Women's Suit","Fashion","image/purple-ethnic-suit.jpg",999,1599,4.6],
  ["Floral Printed Women's Kurta Set","Fashion","image/floral-kurta-set.jpg",899,1499,4.6],
  ["Green Embroidered Women's Suit","Fashion","image/green-embroidered-suit.jpg",1499,2299,4.6],
  ["Pink Printed Women's Kurta Set","Fashion","image/pink-kurta-set.jpg",999,1599,4.6],
  ["Touchless Automatic Soap Dispenser","Home","image/automatic-soap-dispenser.jpg",799,1299,4.6],
  ["Traditional Gold-Tone Necklace Set","Accessories","image/gold-tone-necklace-set.jpg",499,899,4.6],
  ["Pack of 12 Adhesive Wall Hooks","Home","image/adhesive-wall-hooks-pack.jpg",199,349,4.6],
  ["Winter Cap and Gloves Combo","Fashion","image/winter-cap-gloves-combo.jpg",399,699,4.6],
  ["Kids Wireless Headphones","Electronics","image/kids-wireless-headphones.jpg",699,1099,4.6],
  ["Traditional Bridal Necklace Set","Accessories","image/bridal-necklace-set.jpg",899,1499,4.6],
  ["Men's Casual Sport Sandals","Fashion","image/mens-sport-sandals.jpg",599,999,4.6],
  ["Classic Black Women's Handbag","Fashion","image/black-womens-handbag.jpg",999,1599,4.6],
  ["Stainless Steel Analog Watch","Accessories","image/stainless-steel-watch.jpg",799,1299,4.6],
  ["Traditional Gold-Tone Earring Set","Accessories","image/gold-tone-earring-set.jpg",349,599,4.6],
  ["Premium Temple Jewellery Set","Accessories","image/temple-jewellery-set.jpg",699,1199,4.6],
  ["Pink Quilted Women's Handbag","Fashion","image/pink-quilted-handbag.jpg",899,1499,4.6],
  ["Waterproof Bluetooth Neckband","Electronics","image/waterproof-bluetooth-neckband.jpg",499,899,4.6],
  ["Universal Fast Charging Adapter","Electronics","image/universal-fast-charging-adapter.jpg",399,699,4.6],
  ["Precision Grooming Trimmer","Electronics","image/precision-grooming-trimmer.jpg",599,999,4.6],
  ["USB Data Cable","Electronics","image/usb-data-cable.jpg",149,299,4.6],
  ["Colorful Kids Toy Set","Toys","image/colorful-kids-toy-set.jpg",299,499,4.6],
  ["Mini Kids Building Blocks","Toys","image/kids-building-blocks.jpg",249,399,4.6],
  ["Sensory Spiky Ball Set","Toys","image/sensory-spiky-ball-set.jpg",199,349,4.6],
  ["Kids Green Printed Outfit","Fashion","image/kids-green-printed-outfit.jpg",499,799,4.6],
  ["Decorative Wall Sticker Set","Home","image/decorative-wall-sticker-set.jpg",199,349,4.6],
  ["Waterproof Smart Fitness Watch","Electronics","image/waterproof-fitness-watch.jpg",999,1599,4.6],
  ["Women's Black Printed Saree","Fashion","image/black-printed-saree.jpg",1299,1999,4.6],
  ["Blue LED Crystal Night Lamp","Home","image/blue-led-crystal-night-lamp.jpg",399,699,4.6]
].map((p,i)=>({id:i+1,name:p[0],category:p[1],image:p[2],price:p[3],oldPrice:p[4],rating:p[5],description:`A quality ${p[0].toLowerCase()} selected by ${STORE.name}. A great everyday pick with a thoughtful design and excellent value.`,badge:Math.round((1-p[3]/p[4])*100)}));let cart = JSON.parse(localStorage.getItem("zyronaCart") || "[]");
let activeCategory = "All", searchTerm = "", couponApplied = false;
const $ = id => document.getElementById(id);
const money = n => "₹" + Math.round(n).toLocaleString("en-IN");
const saveCart = () => localStorage.setItem("zyronaCart",JSON.stringify(cart));
function toast(message){const el=$("toast");el.textContent=message;el.classList.add("show");clearTimeout(toast.timer);toast.timer=setTimeout(()=>el.classList.remove("show"),2300)}
function setCategory(category){activeCategory=category;document.querySelectorAll("[data-category]").forEach(b=>b.classList.toggle("active",b.dataset.category===category));renderProducts()}
function filteredProducts(){let list=catalog.filter(p=>(activeCategory==="All"||p.category===activeCategory)&&(p.name.toLowerCase().includes(searchTerm)||p.category.toLowerCase().includes(searchTerm)));const sort=$("sortSelect").value;if(sort==="low")list.sort((a,b)=>a.price-b.price);if(sort==="high")list.sort((a,b)=>b.price-a.price);if(sort==="rating")list.sort((a,b)=>b.rating-a.rating);return list}
function renderProducts(){const list=filteredProducts();$("resultCount").textContent=`${list.length} product${list.length===1?"":"s"}`;$("productGrid").innerHTML=list.map(p=>`<article class="product-card"><div class="product-image" data-view="${p.id}"><span class="discount-tag">${p.badge}% OFF</span><button class="wish-btn" data-wish="${p.id}" aria-label="Add to wishlist">♡</button><img class="product-photo" src="${p.image}" alt="${p.name}" loading="lazy"></div><div class="product-info"><span class="product-category">${p.category}</span><h3 class="product-name" data-view="${p.id}">${p.name}</h3><div class="rating">★ ${p.rating} <span>(${Math.floor(35+p.id*7%180)} reviews)</span></div><div class="price-row"><b class="price">${money(p.price)}</b><del class="old-price">${money(p.oldPrice)}</del></div><button class="add-btn" data-add="${p.id}">＋ Add to cart</button></div></article>`).join("");$("emptyState").classList.toggle("hidden",list.length!==0)}
function addToCart(id){const item=cart.find(x=>x.id===id);if(item)item.qty++;else cart.push({id,qty:1});saveCart();renderCart();toast("Added to your cart!")}
function changeQty(id,delta){const item=cart.find(x=>x.id===id);if(!item)return;item.qty+=delta;if(item.qty<=0)cart=cart.filter(x=>x.id!==id);saveCart();renderCart()}
function cartTotals(){const subtotal=cart.reduce((s,x)=>s+catalog.find(p=>p.id===x.id).price*x.qty,0);const discount=couponApplied&&subtotal>=STORE.couponMinimum?Math.round(subtotal*STORE.couponPercent/100):0;const delivery=subtotal===0||subtotal>=STORE.freeShippingAbove?0:STORE.shippingCharge;return{subtotal,discount,delivery,total:subtotal-discount+delivery}}
function renderCart(){const count=cart.reduce((s,x)=>s+x.qty,0);$("cartCount").textContent=count;$("drawerCount").textContent=`(${count})`;const has=cart.length>0;$("cartBottom").classList.toggle("hidden",!has);if(!has){$("cartItems").innerHTML=`<div class="cart-empty"><span>🛍️</span><h3>Your cart is empty</h3><p>Looks like you haven't added anything yet.</p><button class="primary-btn" id="continueShopping">Explore products</button></div>`;$("continueShopping").onclick=closeCart;return}$("cartItems").innerHTML=cart.map(x=>{const p=catalog.find(a=>a.id===x.id);return `<div class="cart-item"><div class="cart-thumb"><img src="${p.image}" alt="${p.name}" loading="lazy"></div><div><h4>${p.name}</h4><small>${p.category} · ${money(p.price)} each</small><div class="qty-control"><button data-qty="${p.id}" data-delta="-1">−</button><span>${x.qty}</span><button data-qty="${p.id}" data-delta="1">＋</button><button class="remove-item" data-remove="${p.id}">Remove</button></div></div><div class="cart-item-price">${money(p.price*x.qty)}</div></div>`}).join("");const t=cartTotals();$("subtotal").textContent=money(t.subtotal);$("delivery").textContent=t.delivery?money(t.delivery):"FREE";$("discount").textContent="−"+money(t.discount);$("total").textContent=money(t.total);$("couponMessage").textContent=couponApplied?(t.discount?"Coupon applied — you saved "+money(t.discount):`Add ${money(STORE.couponMinimum-t.subtotal)} more to use this coupon.`):""}
function openCart(){$("cartOverlay").classList.add("show");$("cartDrawer").classList.add("open");document.body.style.overflow="hidden"}
function closeCart(){$("cartOverlay").classList.remove("show");$("cartDrawer").classList.remove("open");document.body.style.overflow=""}
function openModal(id){$(id).classList.add("show");document.body.style.overflow="hidden"}
function closeModal(id){$(id).classList.remove("show");if(!$("cartDrawer").classList.contains("open"))document.body.style.overflow=""}
function viewProduct(id){const p=catalog.find(x=>x.id===id);if(!p)return;$("productModalContent").innerHTML=`<div class="product-detail"><div class="detail-image"><img src="${p.image}" alt="${p.name}"></div><div class="detail-copy"><span class="product-category">${p.category} · ${p.badge}% OFF</span><h2>${p.name}</h2><div class="rating">★ ${p.rating} <span>Customer rating</span></div><div class="detail-price">${money(p.price)} <del>${money(p.oldPrice)}</del></div><p>${p.description}</p><p>✓ Quality checked<br>✓ Easy WhatsApp ordering<br>✓ Free delivery above ${money(STORE.freeShippingAbove)}</p><button class="add-btn" data-add="${p.id}">＋ Add to cart</button></div></div>`;openModal("productModal")}
function applyCoupon(){const code=$("couponInput").value.trim().toUpperCase();if(code===STORE.couponCode){couponApplied=true;renderCart();toast("Coupon code applied")}else{couponApplied=false;renderCart();$("couponMessage").style.color="#e05c70";$("couponMessage").textContent="Invalid coupon code. Try ZYRO10."}}
function beginCheckout(){if(!cart.length)return;closeCart();$("checkoutTotal").textContent=money(cartTotals().total);openModal("checkoutModal")}
function sendWhatsAppOrder(e){e.preventDefault();if(!cart.length){toast("Your cart is empty");return}const data=new FormData(e.target);const t=cartTotals();const lines=cart.map(x=>{const p=catalog.find(a=>a.id===x.id);return `• ${p.name} x ${x.qty} = ${money(p.price*x.qty)}`});const message=[`Hello ${STORE.name}! I want to place an order.`,``,`CUSTOMER DETAILS`,`Name: ${data.get("name")}`,`Mobile: ${data.get("phone")}`,`Address: ${data.get("address")}`,`Payment preference: ${data.get("payment")}`,``,`ORDER DETAILS`,...lines,``,`Subtotal: ${money(t.subtotal)}`,`Delivery: ${t.delivery?money(t.delivery):"FREE"}`,`Discount: ${money(t.discount)}`,`TOTAL: ${money(t.total)}`,``,`Please confirm availability and delivery details.`].join("\n");const url=`https://wa.me/${STORE.whatsappNumber}?text=${encodeURIComponent(message)}`;window.open(url,"_blank","noopener");closeModal("checkoutModal");toast("WhatsApp order message is ready");}
function startCountdown(){let remaining=24*60*60;setInterval(()=>{remaining--;if(remaining<0)remaining=24*60*60;$("hours").textContent=String(Math.floor(remaining/3600)).padStart(2,"0");$("minutes").textContent=String(Math.floor(remaining%3600/60)).padStart(2,"0");$("seconds").textContent=String(remaining%60).padStart(2,"0")},1000)}
function showPromo(){if(!sessionStorage.getItem("zyronaPromoSeen")){setTimeout(()=>openModal("promoModal"),1200);sessionStorage.setItem("zyronaPromoSeen","1")}}
function whatsappLink(){return `https://wa.me/${STORE.whatsappNumber}?text=${encodeURIComponent("Hello "+STORE.name+", I would like to know more about your products and offers.")}`}
document.addEventListener("click",e=>{const add=e.target.closest("[data-add]");if(add){addToCart(Number(add.dataset.add));closeModal("productModal");return}const view=e.target.closest("[data-view]");if(view){viewProduct(Number(view.dataset.view));return}const qty=e.target.closest("[data-qty]");if(qty){changeQty(Number(qty.dataset.qty),Number(qty.dataset.delta));return}const remove=e.target.closest("[data-remove]");if(remove){cart=cart.filter(x=>x.id!==Number(remove.dataset.remove));saveCart();renderCart();return}const wish=e.target.closest("[data-wish]");if(wish){wish.classList.toggle("liked");wish.textContent=wish.classList.contains("liked")?"♥":"♡";return}const close=e.target.closest("[data-close]");if(close)closeModal(close.dataset.close)});
document.querySelectorAll(".nav-link,.chip").forEach(b=>b.addEventListener("click",()=>{setCategory(b.dataset.category);$("shop").scrollIntoView({behavior:"smooth"})}));
$("searchForm").addEventListener("submit",e=>{e.preventDefault();searchTerm=$("searchInput").value.trim().toLowerCase();renderProducts();$("shop").scrollIntoView({behavior:"smooth"})});
$("searchInput").addEventListener("input",e=>{searchTerm=e.target.value.trim().toLowerCase();renderProducts()});
$("sortSelect").addEventListener("change",renderProducts);
$("clearFilters").onclick=()=>{$("searchInput").value="";searchTerm="";setCategory("All")};
$("openCart").onclick=openCart;$("closeCart").onclick=closeCart;$("cartOverlay").onclick=closeCart;$("checkoutBtn").onclick=beginCheckout;$("checkoutForm").addEventListener("submit",sendWhatsAppOrder);$("applyCoupon").onclick=applyCoupon;$("continueShopping").onclick=closeCart;
$("themeToggle").onclick=()=>{document.body.classList.toggle("dark");const dark=document.body.classList.contains("dark");$("themeToggle").textContent=dark?"☀":"☾";localStorage.setItem("zyronaTheme",dark?"dark":"light")};
if(localStorage.getItem("zyronaTheme")==="dark"){document.body.classList.add("dark");$("themeToggle").textContent="☀"}
$("copyCoupon").onclick=async()=>{try{await navigator.clipboard.writeText(STORE.couponCode);toast("Coupon copied!")}catch{toast("Use code ZYRO10 at checkout")}};
$("shopPromo").onclick=()=>{closeModal("promoModal");$("shop").scrollIntoView({behavior:"smooth"})};
$("newsletterWhatsApp").href=whatsappLink();$("footerWhatsApp").href=whatsappLink();$("footerWhatsApp").target="_blank";$("year").textContent=new Date().getFullYear();
renderProducts();renderCart();startCountdown();showPromo();