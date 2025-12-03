import {getCatalog} from './api.js';
import {cartAdd} from './cart.js';
document.querySelector('.theme-toggle').onclick = () => {
  document.documentElement.classList.toggle('dark');
  localStorage.theme = document.documentElement.classList.contains('dark')?'dark':'';
};
if(localStorage.theme==='dark') document.documentElement.classList.add('dark');
export function renderProduct(p){
  document.getElementById('product').innerHTML = `
    <img src="${p.img}" alt="">
    <h2>${p.name}</h2>
    <p class="price">${p.price} ₽</p>
    <button class="primary full" onclick="import('./cart.js').then(m=>m.cartAdd(${JSON.stringify(p)}))">Добавить в корзину</button>`;
}
getCatalog().then(list=>{
  document.getElementById('catalog').innerHTML = list.map(p=>`
    <a class="card" href="product.html?id=${p.id}">
      <img src="${p.img}" alt="">
      <h3>${p.name}</h3>
      <div class="price">${p.price} ₽</div>
    </a>`).join('');
});
