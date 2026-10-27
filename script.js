// Butter & Bloom — UTS Pemrograman Web Dasar (HTML, CSS, JavaScript)
// Data produk contoh. Tidak terhubung ke database atau pembayaran sungguhan.
const products = [
  {id:1,name:'Classic Butter Croissant',category:'pastries',price:20000,desc:'Flaky, golden, and wonderfully buttery.',image:'images/butter-croissant.jpg'},
  {id:2,name:'Classic Tiramisu',category:'desserts',price:38000,desc:'Soft layers of coffee and mascarpone cream.',image:'images/tiramisu.jpg'},
  {id:3,name:'Strawberry Shortcake',category:'desserts',price:45000,desc:'Fresh strawberries and fluffy cream.',image:'images/strawberry-cake.jpg'},
  {id:4,name:'Chocolate Chip Cookies',category:'cookies',price:25000,desc:'Golden edges with a chocolatey center.',image:'images/chocolate-cookies.jpg'},
  {id:5,name:'Garlic Butter Bread',category:'breads',price:30000,desc:'Warm, garlicky, and perfectly savory.',image:'images/garlic-bread.jpg'},
  {id:6,name:'Pain au Chocolat',category:'pastries',price:32000,desc:'A buttery pastry with rich chocolate.',image:'images/pain-au-chocolat.jpg'}
];
const rupiah = number => new Intl.NumberFormat('id-ID',{style:'currency',currency:'IDR',maximumFractionDigits:0}).format(number);
const grid = document.getElementById('productGrid');
const cartCount = document.getElementById('cartCount');
const cartItems = document.getElementById('cartItems');
const cartTotal = document.getElementById('cartTotal');
const drawer = document.getElementById('cartDrawer');
const backdrop = document.getElementById('cartBackdrop');
let cart = {};
try { const saved = JSON.parse(localStorage.getItem('butterBloomCart') || '{}'); if(saved && typeof saved === 'object' && !Array.isArray(saved)) cart = saved; } catch { cart = {}; }

function renderProducts(category='all') {
  const selected = products.filter(product => category === 'all' || product.category === category);
  grid.innerHTML = selected.map(p => `<article class="product-card"><img class="product-image" src="${p.image}" alt="${p.name}" loading="lazy"/><div class="product-info"><span class="product-label">${p.category}</span><h3>${p.name}</h3><p class="product-description">${p.desc}</p><div class="product-bottom"><span class="product-price">${rupiah(p.price)}</span><button class="add-button" type="button" data-add="${p.id}" aria-label="Tambah ${p.name} ke keranjang">+ Add to Cart</button></div></div></article>`).join('');
}
function saveCart(){try{localStorage.setItem('butterBloomCart',JSON.stringify(cart));}catch{}renderCart();}
function renderCart(){
  const items = products.filter(p => Number(cart[p.id]) > 0);
  cartCount.textContent = items.reduce((sum,p) => sum + Number(cart[p.id]),0);
  cartTotal.textContent = rupiah(items.reduce((sum,p) => sum + p.price * Number(cart[p.id]),0));
  cartItems.innerHTML = items.length ? items.map(p => `<div class="cart-row"><img src="${p.image}" alt="${p.name}"/><div><h3>${p.name}</h3><small>${rupiah(p.price)}</small><div class="cart-controls"><button type="button" data-decrease="${p.id}" aria-label="Kurangi ${p.name}">−</button><span>${cart[p.id]}</span><button type="button" data-increase="${p.id}" aria-label="Tambah ${p.name}">+</button><button type="button" class="remove-item" data-remove="${p.id}">Remove</button></div></div></div>`).join('') : '<p class="empty-cart">Your bag is waiting for something sweet! 🥐</p>';
}
let toastTimer;
function toast(message){const el=document.getElementById('toast');el.textContent=message;el.classList.add('show');clearTimeout(toastTimer);toastTimer=setTimeout(()=>el.classList.remove('show'),2600);}
function addToCart(id){cart[id]=(Number(cart[id])||0)+1;saveCart();toast('Added to your bag ♡');}
function toggleCart(open){drawer.classList.toggle('open',open);drawer.setAttribute('aria-hidden',String(!open));backdrop.hidden=!open;document.body.classList.toggle('cart-open',open);if(open)document.getElementById('cartClose').focus();else document.getElementById('cartOpen').focus();}
document.getElementById('filters').addEventListener('click',e=>{const button=e.target.closest('[data-filter]');if(!button)return;document.querySelectorAll('.filter').forEach(b=>{b.classList.remove('active');b.setAttribute('aria-pressed','false');});button.classList.add('active');button.setAttribute('aria-pressed','true');renderProducts(button.dataset.filter);});
grid.addEventListener('click',e=>{const button=e.target.closest('[data-add]');if(button)addToCart(button.dataset.add);});
cartItems.addEventListener('click',e=>{const button=e.target.closest('button');if(!button)return;const {increase,decrease,remove}=button.dataset;if(increase){cart[increase]=Number(cart[increase])+1;}else if(decrease){cart[decrease]=Number(cart[decrease])-1;if(cart[decrease]<=0)delete cart[decrease];}else if(remove){delete cart[remove];}saveCart();});
document.getElementById('cartOpen').addEventListener('click',()=>toggleCart(true));
document.getElementById('cartClose').addEventListener('click',()=>toggleCart(false));
backdrop.addEventListener('click',()=>toggleCart(false));
document.addEventListener('keydown',e=>{if(e.key==='Escape' && drawer.classList.contains('open'))toggleCart(false);});
document.getElementById('checkoutBtn').addEventListener('click',()=>{const n=Object.values(cart).reduce((sum,x)=>sum+Number(x),0);toast(n ? 'Pesanan demo: '+n+' item. Checkout belum tersedia.' : 'Keranjang kamu masih kosong.');});
const toggle=document.getElementById('menuToggle');const nav=document.getElementById('navLinks');
toggle.addEventListener('click',()=>{const open=nav.classList.toggle('open');toggle.setAttribute('aria-expanded',String(open));toggle.setAttribute('aria-label',open?'Tutup menu':'Buka menu');});
nav.querySelectorAll('a').forEach(link=>link.addEventListener('click',()=>{nav.classList.remove('open');toggle.setAttribute('aria-expanded','false');toggle.setAttribute('aria-label','Buka menu');}));
document.getElementById('contactForm').addEventListener('submit',event=>{event.preventDefault();const form=event.currentTarget;const feedback=document.getElementById('formFeedback');if(!form.checkValidity()){feedback.style.color='#ae554c';feedback.textContent='Mohon isi nama (min. 2 huruf), email yang valid, dan pesan (min. 10 huruf).';form.reportValidity();return;}feedback.style.color='#64846d';feedback.textContent='Terima kasih! Pesan demo kamu sudah berhasil divalidasi ♡ (Tidak dikirim ke server.)';form.reset();});
document.getElementById('year').textContent=new Date().getFullYear();
renderProducts();renderCart();
// FORMULIR BOOTSTRAP

const visitorForm = document.getElementById("visitorForm");

visitorForm.addEventListener("submit", function(event) {

    event.preventDefault();

    const nama = document.getElementById("visitorName").value.trim();

    const alamat = document.getElementById("visitorAddress").value.trim();

    const kota = document.getElementById("visitorCity").value;

    const hobi = document.querySelectorAll(
        'input[name="hobi"]:checked'
    );

    const feedback = document.getElementById("visitorFeedback");

    if (nama === "" || alamat === "" || kota === "") {

        feedback.textContent = "Mohon lengkapi semua data.";

        feedback.style.color = "red";

        return;
    }

    const daftarHobi = Array.from(hobi).map(function(item) {
        return item.value;
    });

    feedback.textContent =
        "Terima kasih, " + nama +
        "! Data berhasil divalidasi. Kota: " + kota +
        ". Hobi: " + (daftarHobi.join(", ") || "Tidak dipilih") + ".";

    feedback.style.color = "green";

    visitorForm.reset();

});
