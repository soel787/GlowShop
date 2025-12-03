fetch(SHEET_URL)
  .then(res => res.text())
  .then(text => {
    const json = JSON.parse(text.substr(47).slice(0, -2));
    const rows = json.table.rows;

    const catalog = document.getElementById('catalog');
    rows.forEach(row => {
      const [name, desc, price, img] = row.c.map(cell => cell?.v || '');

      const item = document.createElement('div');
      item.className = 'item';
      item.innerHTML = `
        <img src="${img}" alt="${name}" />
        <h3>${name}</h3>
        <p>${desc}</p>
        <p><strong>${price} ₽</strong></p>
        <a href="https://t.me/${ADMIN_USERNAME}" target="_blank">
          <button class="buy-btn">Купить</button>
        </a>
      `;
      catalog.appendChild(item);
    });
  });