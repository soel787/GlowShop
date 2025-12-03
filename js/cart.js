const cart = JSON.parse(localStorage.getItem('glow-cart')||'[]');
function save(){localStorage.setItem('glow-cart',JSON.stringify(cart));}
export function cartAdd(product){
  const ex = cart.find(i=>i.id==product.id);
  ex ? ex.qty++ : cart.push({...product,qty:1});
  save(); document.getElementById('cart-count').textContent = cart.reduce((s,i)=>s+i.qty,0);
}
function render(){
  const box = document.getElementById('cart-items');
  box.innerHTML = cart.map(p=>`
    <div class="cart-item">
      <img src="${p.img}" alt="">
      <div><strong>${p.name}</strong><br>${p.price} ₽ × ${p.qty}</div>
      <button class="remove" data-id="${p.id}">✕</button>
    </div>`).join('');
}
document.addEventListener('click',e=>{
  if(e.target.classList.contains('remove')){
    const idx = cart.findIndex(i=>i.id==e.target.dataset.id);
    cart.splice(idx,1); save(); render();
    document.getElementById('cart-count').textContent = cart.reduce((s,i)=>s+i.qty,0);
  }
});
document.getElementById('checkout').onclick = () => {
  const msg = encodeURIComponent(`Новый заказ:\n${cart.map(i=>`${i.name} – ${i.qty}шт`).join('\n')}`);
  location.href = `https://t.me/YOUR_USERNAME?text=${msg}`;
  localStorage.removeItem('glow-cart');
};
render();
