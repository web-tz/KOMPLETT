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

// ===== CATEGORIAS =====
function gerarCategorias() {
  return [...new Set(produtos.map(p => p.categoria.trim()))].sort((a,b)=>a.localeCompare(b,'pt-BR'));
}

const nav = document.querySelector('nav');
const searchInput = document.getElementById('search');

// Garante que o campo de busca exista antes de limpar o nav
if (nav && searchInput) {
  const tempSearch = searchInput.cloneNode(true);
  nav.innerHTML = '';
  nav.appendChild(tempSearch);
}

const btnTodos = document.createElement('button');
btnTodos.textContent = 'Todos';
btnTodos.onclick = () => filtrarCategoria('todos');
nav.appendChild(btnTodos);

function renderCategorias() {
  gerarCategorias().forEach(cat => {
    const btn = document.createElement('button');
    btn.textContent = cat;
    btn.onclick = () => filtrarCategoria(cat);
    nav.appendChild(btn);
  });
}
renderCategorias();

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
        <p>R$ ${prod.preco.toFixed(2).replace('.', ',')}</p>
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

document.getElementById('search').addEventListener('input', e=>{
  const termo = e.target.value.toLowerCase();
  renderProdutos(produtos.filter(p=>p.nome.toLowerCase().includes(termo)));
});

// ===== CARRINHO =====
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
        <p>R$ ${(item.preco*item.qtd).toFixed(2).replace('.', ',')}</p>
      </div>
      <div class="quantidade">
        <button onclick="mudarQtd(${item.id}, -1)">-</button>
        <span>${item.qtd}</span>
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
    exist.qtd++;
  }else{
    carrinho.push({...produto, qtd: 1, imagem: produto.imagens[0]});
  }
  atualizarCarrinho();
}

function mudarQtd(id,valor){
  const item = carrinho.find(p=>p.id===id);
  if(!item) return;
  item.qtd += valor;
  if(item.qtd <= 0) carrinho = carrinho.filter(p=>p.id!==id);
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
    msg+=`- ${item.nome} x${item.qtd} = R$ ${(item.preco*item.qtd).toFixed(2)}%0A`;
  });
  window.open(`https://wa.me/5577981336827?text=${msg}`,'_blank');
});

// ===== MODAL =====
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

// ===== INICIALIZA =====
renderProdutos(produtos);
atualizarCarrinho();
