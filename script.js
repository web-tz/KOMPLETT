// ===== PRODUTOS =====
const produtos = [
  {id:1,nome:'Fone Bluetooth 5.0 Branco Intra-Auricular',preco:29.99,categoria:'Eletrônicos',qtd:1,imagens:['CapafoneN1.png','CapafoneN2.png','CapafoneN3.png','CapafoneN4.png','CapafoneN5.png']},
  {id:2,nome:'Fone Sem Fio Bluetooth i12 TWS',preco:31.99,categoria:'Eletrônicos',qtd:2,imagens:['Capafonetw.png','CapafoneN1tw.png','CapafoneN2tw.png','CapafoneN4tw.png','CapafoneN5tw.png','CapafoneN6tw.png']},
  {id:3,nome:'Cabo Carregamento Turbo Kaid Tipo C',preco:17.99,categoria:'Cabos e Carregadores',qtd:2,imagens:['CapoTIPOC.png','cabotipoCc.png','CaboC.png']},
  {id:4,nome:'Cabo Carregamento Turbo IOS',preco:17.99,categoria:'Cabos e Carregadores',qtd:3,imagens:['CaboIOS.png','CabokaidiN1.png','CabotipoIOS.png']},
  {id:5,nome:'Pré Treino Pre Workout Pote 300g Sabor Energético FTW',preco:78.99,categoria:'Fitness',qtd:0,imagens:['pretreinoenergeticocapa.png','pretreinoenergetico1.png','pretreinoenergetico2.png','pretreinoenergetico3.png']},
  {id:6,nome:'Whey Concentrado Ultra Protein Refil 900g Sabor Morango - FTW',preco:69.99,categoria:'Fitness',qtd:0,imagens:['wheyultramorangocapa.png','wheyultramorango1.png','wheyultramorango2.png']},
  {id:7,nome:'Creatina Monohidratada 300g 100% Pura Dark Lab',preco:59.90,categoria:'Fitness',qtd:0,imagens:['creatinadarkcapa.png','creatinadark1.png','creatinadark2.png','creatinadark3.png']},
  {id:8,nome:'Pasta de Amendoim com Whey Protein Dr. Peanut 250g Avelã',preco:34.99,categoria:'Fitness',qtd:0,imagens:['pstamendavelacapa.png','pstamendavela1.png']},
  {id:9,nome:'Whey Protein Gourmet 907g Cookies Cream Sabor Cookies & Cream',preco:59.99,categoria:'Fitness',qtd:0,imagens:['wheyforbiscookiescapa.png','wheyforbiscookies1.png']},
  {id:10,nome:'Creatina Monohidratada 100% Pura Refil 300g - FTW',preco:45.00,categoria:'Fitness',qtd:0,imagens:['creatinaftwcapa.png','creatinaftw1.png','creatinaftw2.png']},
  {id:12,nome:'Whey Protein Gourmet 900g - Fn Forbis - Proteina Sabor Chocolate trufado',preco:59.99,categoria:'Fitness',qtd:0,imagens:['wheychocotrufcapa.png','wheychocotruf1.png']},
  {id:13,nome:'Coqueteleira Shaker - Academia 700ml Dark Lab',preco:29.99,categoria:'Fitness',qtd:0,imagens:['coqdarklabcapa.png','coqdarklab1.png','coqdarklab2.png']},
  {id:14,nome:'Strap Musculação - Tala Strep Treino Academia - Resistente',preco:25.00,categoria:'Fitness',qtd:0,imagens:['strappretocapa.png','strappretopa.png','strappretor.png','strappretov.png','strappretovv.png','strappretofi.png']},
  {id:15,nome:'Pré-Treino Evolution Workout 300g Sabor Blueberry Soldiers Nutrition',preco:64.99,categoria:'Fitness',qtd:0,imagens:['soldiersblueberrcapa.png','soldiersblueberr1.png','soldiersblueberr2.png','soldiersblueberr3.png']},
  {id:16,nome:'Creatina 100% Pura 150g Integralmédica',preco:39.99,categoria:'Fitness',qtd:0,imagens:['creatinintegcapa.png','creatininteg1.png','creatininteg2.png']},
  {id:17,nome:'Pré-Treino Evolution Workout 300g Sabor Limonada Suiça Soldiers Nutrition',preco:64.99,categoria:'Fitness',qtd:0,imagens:['pretreinolimonadacapa.png','pretreinolimonada1.png','pretreinolimonada2.png','pretreinolimonada3.png']},
  {id:18,nome:'Pré-Treino Evolution Workout 300g Sabor Melancia Soldiers Nutrition',preco:64.99,categoria:'Fitness',qtd:0,imagens:['pretreinomelanciacapa.png','pretreinomelancia1.png','pretreinomelancia2.png','pretreinomelancia3.png']}
];

// ===== ELEMENTOS =====
const container = document.getElementById('produtos');
const modal = document.getElementById('modal');
const modalImg = modal.querySelector('img');
const btnPrev = modal.querySelector('.prev');
const btnNext = modal.querySelector('.next');
const search = document.getElementById('search');
const carrinhoDiv = document.getElementById('carrinho');
const itensCarrinho = document.getElementById('itens-carrinho');
const badge = document.getElementById('badge');
const categoriesDiv = document.getElementById('categories');
const fecharCarrinhoBtn = document.getElementById('fechar-carrinho');

let carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];
let imgIndex = 0, imgAtual = [];
let selectedCategory = 'Todos';

// ===== RENDER CATEGORIAS =====
function renderCategorias() {
  const categorias = ['Todos', ...Array.from(new Set(produtos.map(p => p.categoria)))];
  categoriesDiv.innerHTML = '';
  categorias.forEach(cat => {
    const btn = document.createElement('button');
    btn.className = 'category-btn';
    if (cat === selectedCategory) btn.classList.add('active');
    btn.textContent = cat;
    btn.onclick = () => {
      selectedCategory = cat;
      const atuais = categoriesDiv.querySelectorAll('.category-btn');
      atuais.forEach(b => b.classList.toggle('active', b.textContent === cat));
      aplicarFiltro();
    };
    categoriesDiv.appendChild(btn);
  });
}

// ===== FILTRO COMBINADO =====
function aplicarFiltro() {
  const termo = (search.value || '').toLowerCase();
  const filtrados = produtos.filter(p => {
    const condTermo = p.nome.toLowerCase().includes(termo);
    const condCat = selectedCategory === 'Todos' ? true : p.categoria === selectedCategory;
    return condTermo && condCat;
  });
  renderProdutos(filtrados);
}

// ===== RENDER PRODUTOS =====
function renderProdutos(lista) {
  container.innerHTML = '';
  lista.forEach(p => {
    const card = document.createElement('div');
    card.className = 'produto';

    const selo = p.qtd === 0 ? '<span class="selo-encomenda">SOB ENCOMENDA</span>' : '';
    const preco = `<p class="preco">R$ ${p.preco.toFixed(2).replace('.', ',')}</p>`;

    card.innerHTML = `
      <div class="img-container">
        ${selo}
        <img src="${p.imagens[0]}" alt="${p.nome}">
      </div>
      <h3>${p.nome}</h3>
      ${preco}
      <button class="adicionar">Adicionar ao Carrinho</button>
    `;

    const imgEl = card.querySelector('img');
    imgEl.addEventListener('click', () => abrirModal(p.imagens));
    card.querySelector('.adicionar').addEventListener('click', () => addCarrinho(p));
    container.appendChild(card);
  });
}

// ===== MODAL =====
function abrirModal(imgs) {
  imgAtual = imgs;
  imgIndex = 0;
  modalImg.src = imgAtual[0];
  modal.classList.add('active');
  modal.setAttribute('aria-hidden','false');
}

function fecharModal() {
  modal.classList.remove('active');
  modal.setAttribute('aria-hidden','true');
}

function trocarImg(direcao) {
  imgIndex = (imgIndex + direcao + imgAtual.length) % imgAtual.length;
  modalImg.src = imgAtual[imgIndex];
}

modal.querySelector('.close').onclick = fecharModal;
btnPrev.onclick = () => trocarImg(-1);
btnNext.onclick = () => trocarImg(1);
modal.addEventListener('click', e => { if (e.target === modal) fecharModal(); });

// toque/arraste no celular
let startX = 0;
modalImg.addEventListener('touchstart', e => startX = e.touches[0].clientX);
modalImg.addEventListener('touchend', e => {
  const endX = e.changedTouches[0].clientX;
  if (startX - endX > 50) trocarImg(1);
  else if (endX - startX > 50) trocarImg(-1);
});

// ===== CARRINHO =====
function addCarrinho(produto) {
  const item = carrinho.find(i => i.id === produto.id);
  if (item) item.qtd++;
  else carrinho.push({...produto, qtd:1});
  salvarCarrinho();
  atualizarCarrinho();
}

function salvarCarrinho() {
  localStorage.setItem('carrinho', JSON.stringify(carrinho));
}

function atualizarCarrinho() {
  itensCarrinho.innerHTML = '';
  let total = 0;
  carrinho.forEach(item => {
    total += item.preco * item.qtd;
    const div = document.createElement('div');
    div.className = 'item-carrinho';
    div.innerHTML = `
      <img src="${item.imagens[0]}" alt="${item.nome}">
      <div class="info">
        <p>${item.nome}</p>
        <p>R$ ${item.preco.toFixed(2).replace('.', ',')}</p>
      </div>
      <div class="quantidade">
        <button class="menos">-</button>
        <span>${item.qtd}</span>
        <button class="mais">+</button>
      </div>
    `;
    div.querySelector('.menos').onclick = () => {
      item.qtd--;
      if (item.qtd <= 0) carrinho = carrinho.filter(i => i.id !== item.id);
      salvarCarrinho();
      atualizarCarrinho();
    };
    div.querySelector('.mais').onclick = () => {
      item.qtd++;
      salvarCarrinho();
      atualizarCarrinho();
    };
    itensCarrinho.appendChild(div);
  });

  const totalDiv = document.createElement('div');
  totalDiv.className = 'total';
  totalDiv.innerHTML = `<h3>Total: R$ ${total.toFixed(2).replace('.', ',')}</h3>`;
  itensCarrinho.appendChild(totalDiv);
  badge.innerText = carrinho.reduce((s,i)=>s+i.qtd,0);
}
atualizarCarrinho();

// === ABRIR E FECHAR CARRINHO ===
document.getElementById('btn-carrinho').addEventListener('click',()=>{
  carrinhoDiv.classList.add('active');
  carrinhoDiv.setAttribute('aria-hidden','false');
});

// 🧩 CORREÇÃO AQUI — FECHAR CARRINHO FUNCIONANDO
if (fecharCarrinhoBtn) {
  fecharCarrinhoBtn.addEventListener('click', ()=>{
    carrinhoDiv.classList.remove('active');
    carrinhoDiv.setAttribute('aria-hidden','true');
  });
}

// limpar carrinho
document.getElementById('limpar').onclick = ()=>{
  carrinho = [];
  salvarCarrinho();
  atualizarCarrinho();
};

// finalizar via WhatsApp
document.getElementById('finalizar').onclick = ()=>{
  if(carrinho.length===0) return alert('Carrinho vazio!');
  let msg = '*Pedido KOMPLETT*%0A%0A';
  carrinho.forEach(i=> msg += `${encodeURIComponent(i.nome)} (x${i.qtd}) - R$ ${(i.preco*i.qtd).toFixed(2)}%0A`);
  const total = carrinho.reduce((t,i)=>t+i.preco*i.qtd,0);
  msg += `%0A*Total:* R$ ${total.toFixed(2).replace('.', ',')}`;
  const url = `https://wa.me/5577981336827?text=${msg}`;
  window.open(url,'_blank');
};

// ===== Inicialização =====
renderCategorias();
aplicarFiltro();

