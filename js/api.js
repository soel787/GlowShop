const SHEET_ID = 'ВСТАВЬ_СЮДА_ID_ТАБЛИЦЫ';
const END = `https://docs.google.com/spreadsheets/d/${SHEET_ID}/gviz/tq?tqx=out:json`;

export async function getCatalog(){
  const raw = await fetch(END).then(r=>r.text());
  return JSON.parse(raw.substr(47).slice(0,-2)).table.rows
        .map(r=>({id:r.c[0].v,name:r.c[1].v,price:r.c[2].v,img:r.c[3].v||''}));
}
export async function getProduct(id){
  const list = await getCatalog();
  return list.find(p=>p.id==id);
}
