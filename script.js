// ===== PRODUTOS =====
const produtos = [
  {id:1,nome:'Fone Bluetooth 5.0 Branco Intra-Auricular',preco:29.99,categoria:'Eletrônicos',qtd:2,imagens:['CapafoneN1.png','CapafoneN2.png','CapafoneN3.png','CapafoneN4.png','CapafoneN5.png']},
  {id:2,nome:'Fone Sem Fio Bluetooth i12 TWS',preco:31.99,categoria:'Eletrônicos',qtd:2,imagens:['Capafonetw.png','CapafoneN1tw.png','CapafoneN2tw.png','CapafoneN4tw.png','CapafoneN5tw.png','CapafoneN6tw.png']},
  {id:3,nome:'Cabo Carregamento Turbo Kaid Tipo C',preco:17.99,categoria:'Cabos e Carregadores',qtd:2,imagens:['CapoTIPOC.png','cabotipoCc.png','CaboC.png']},
  {id:4,nome:'Cabo Carregamento Turbo IOS',preco:17,99,categoria:'Cabos e Carregadores',qtd:3,imagens:['CabotipoIOS.png','CabokaidiN1.png','CaboIOS.png']}
];

// ===== CATEGORIAS =====
const categoriasUnicas = [...new Set(produtos.map(p => {
  const nomeCorrigido = p.categoria.charAt(0).toUpperCase() + p.categoria.slice(1).toLowerCase();
  p.categoria = nomeCorrigido;
  return nomeCorrigido;
}))].sort((a,b)=>a.localeCompare(b,'pt-BR'));

const nav = document.querySelector('nav');
const searchInput = document.getElementById('search');
nav.innerHTML = '';
nav.appendChild(searchInput);
const btnTodos = document.createElement('button');
btnTodos.textContent = 'Todos';
btnTodos.onclick = () => filtrarCategoria('todos');
nav.appendChild(btnTodos);
categoriasUnicas.forEach(cat=>{
  const btn = document.createElement('button');
  btn.textContent = cat;
  btn.onclick = ()=>filtrarCategoria(cat);
  nav.appendChild(btn);
});

// ===== CARRINHO =====
let carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];

// ===== RENDERIZA PRODUTOS =====
function renderProdutos(lista){
  const container = document.getElementById('produtos');
  container.innerHTML = '';
  lista.sort((a,b)=>a.nome.localeCompare(b,'pt-BR')).forEach(prod=>{
    const card = document.createElement('div');
    card.classList.add('card');
    card.innerHTML = `
      <div class="img-wrapper">
        <img src="${prod.imagens[0]}" alt="${prod.nome}" onclick="abrirModal(${prod.id})">
        ${prod.qtd===0?'<span class="sob-encomenda">SOB ENCOMENDA</span>':''}
      </div>
      <div class="card-body">
        <h3>${prod.nome}</h3>
        <p>${prod.qtd>0?`R$ ${prod.preco.toFixed(2)}`:'SOB ENCOMENDA'}</p>
        <button class="btn-add" onclick="adicionarCarrinho(${prod.id})">Adicionar ao Carrinho</button>
      </div>
    `;
    container.appendChild(card);
  });
}

// ===== FILTRO & PESQUISA =====
function filtrarCategoria(cat){
  if(cat==='todos') renderProdutos(produtos);
  else renderProdutos(produtos.filter(p=>p.categoria===cat));
}

searchInput.addEventListener('input', e=>{
  const termo = e.target.value.toLowerCase();
  renderProdutos(produtos.filter(p=>p.nome.toLowerCase().includes(termo)));
});

// ===== CARRINHO FUNÇÕES =====
function atualizarCarrinho(){
  const container = document.getElementById('itens-carrinho');
  const badge = document.getElementById('badge');
  container.innerHTML = '';
  let totalItems = 0;

  carrinho.forEach(item=>{
    totalItems += 1;
    const div = document.createElement('div');
    div.classList.add('item-carrinho');
    div.innerHTML = `
      <img src="${item.imagem}" alt="${item.nome}">
      <div class="info">
        <p>${item.nome}</p>
        <p>${item.qtd>0?`R$ ${(item.preco*item.qtd).toFixed(2)}`:'SOB ENCOMENDA'}</p>
      </div>
      <div class="quantidade">
        <button onclick="mudarQtd(${item.id}, -1)">-</button>
        <span>${item.qtd>0?item.qtd:'SOB'}</span>
        <button onclick="mudarQtd(${item.id}, 1)">+</button>
      </div>
    `;
    container.appendChild(div);
  });

  badge.textContent = totalItems;
  localStorage.setItem('carrinho',JSON.stringify(carrinho));
}

function adicionarCarrinho(id){
  const produto = produtos.find(p=>p.id===id);
  const exist = carrinho.find(p=>p.id===id);
  if(exist){
    if(produto.qtd>0) exist.qtd++;
  }else{
    carrinho.push({...produto, qtd: produto.qtd>0?1:0, imagem: produto.imagens[0]});
  }
  atualizarCarrinho();
}

function mudarQtd(id,valor){
  const item = carrinho.find(p=>p.id===id);
  if(!item) return;
  if(item.qtd>0)item.qtd+=valor;
  if(item.qtd<=0 && item.qtd!==0) carrinho = carrinho.filter(p=>p.id!==id);
  atualizarCarrinho();
}

// ===== BOTÕES =====
document.getElementById('btn-carrinho').addEventListener('click', ()=>{
  document.getElementById('carrinho').classList.toggle('active');
});
document.getElementById('limpar').addEventListener('click', ()=>{
  carrinho = [];
  localStorage.removeItem('carrinho');
  atualizarCarrinho();
});
document.getElementById('finalizar').addEventListener('click', ()=>{
  if(carrinho.length===0){alert('Carrinho vazio!');return;}
  let msg = 'Olá, quero comprar:%0A';
  carrinho.forEach(item=>{
    if(item.qtd>0) msg+=`- ${item.nome} x${item.qtd} = R$ ${(item.preco*item.qtd).toFixed(2)}%0A`;
    else msg+=`- ${item.nome} = SOB ENCOMENDA%0A`;
  });
  window.open(`https://wa.me/5577981336827?text=${msg}`,'_blank');
});

// ===== MODAL IMAGEM =====
let modal = document.getElementById('modal');
let modalImg = modal.querySelector('img');
let currentImgs = [];
let currentIndex = 0;

function abrirModal(id){
  const produto = produtos.find(p=>p.id===id);
  currentImgs = produto.imagens;
  currentIndex = 0;
  modalImg.src = currentImgs[currentIndex];
  modal.style.display='flex';
}

modal.querySelector('.close').addEventListener('click', ()=>{modal.style.display='none';});
modal.querySelector('.prev').addEventListener('click', ()=>{
  currentIndex = (currentIndex-1+currentImgs.length)%currentImgs.length;
  modalImg.src = currentImgs[currentIndex];
});
modal.querySelector('.next').addEventListener('click', ()=>{
  currentIndex = (currentIndex+1)%currentImgs.length;
  modalImg.src = currentImgs[currentIndex];
});

let isDragging=false, startX;
modalImg.addEventListener('mousedown',e=>{isDragging=true; startX=e.clientX;});
modalImg.addEventListener('mouseup',()=>{isDragging=false;});
modalImg.addEventListener('mousemove',e=>{
  if(!isDragging) return;
  let dx=e.clientX-startX;
  if(dx>50){currentIndex=(currentIndex-1+currentImgs.length)%currentImgs.length; modalImg.src=currentImgs[currentIndex]; isDragging=false;}
  if(dx<-50){currentIndex=(currentIndex+1)%currentImgs.length; modalImg.src=currentImgs[currentIndex]; isDragging=false;}
});

// ===== INICIALIZA =====
renderProdutos(produtos);
atualizarCarrinho();

