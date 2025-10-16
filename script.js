const produtos=[
  {id:1,nome:'Camiseta Oversized Roxa',preco:99.90,categoria:'camisetas',imagens:['https://via.placeholder.com/700x500/8a2be2/fff?text=Camiseta1','https://via.placeholder.com/700x500/8a2be2/fff?text=Camiseta2','https://via.placeholder.com/700x500/8a2be2/fff?text=Camiseta3']},
  {id:2,nome:'Moletom Preto KOMPLETT',preco:199.90,categoria:'moletom',imagens:['https://via.placeholder.com/700x500/000/fff?text=Moletom1','https://via.placeholder.com/700x500/000/fff?text=Moletom2','https://via.placeholder.com/700x500/000/fff?text=Moletom3']},
  {id:3,nome:'Boné Street',preco:79.90,categoria:'acessorios',imagens:['https://via.placeholder.com/700x500/4b0082/fff?text=Boné1','https://via.placeholder.com/700x500/4b0082/fff?text=Boné2','https://via.placeholder.com/700x500/4b0082/fff?text=Boné3']},
  {id:4,nome:'Camiseta Street Wear',preco:89.90,categoria:'camisetas',imagens:['https://via.placeholder.com/700x500/8a2be2/fff?text=Camiseta4','https://via.placeholder.com/700x500/8a2be2/fff?text=Camiseta5','https://via.placeholder.com/700x500/8a2be2/fff?text=Camiseta6']},
  {id:5,nome:'Mochila KOMPLETT',preco:159.90,categoria:'acessorios',imagens:['https://via.placeholder.com/700x500/000/fff?text=Mochila1','https://via.placeholder.com/700x500/000/fff?text=Mochila2','https://via.placeholder.com/700x500/000/fff?text=Mochila3']}
];

// 🔹 Carrega carrinho salvo ou inicia vazio
let carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];

// RENDER PRODUTOS
function renderProdutos(lista){
  const container=document.getElementById('produtos');
  container.innerHTML='';
  lista.forEach(prod=>{
    const card=document.createElement('div');
    card.classList.add('card');
    card.innerHTML=`
      <img src="${prod.imagens[0]}" alt="${prod.nome}" onclick="abrirModal(${prod.id})">
      <div class="card-body">
        <h3>${prod.nome}</h3>
        <p>R$ ${prod.preco.toFixed(2)}</p>
        <button class="btn-add" onclick="adicionarCarrinho(${prod.id})">Adicionar ao Carrinho</button>
      </div>
    `;
    container.appendChild(card);
  });
}

// FILTRAR
function filtrarCategoria(cat){
  if(cat==='todos') renderProdutos(produtos);
  else renderProdutos(produtos.filter(p=>p.categoria===cat));
}

// BARRA DE PESQUISA
document.getElementById('search').addEventListener('input',(e)=>{
  const termo=e.target.value.toLowerCase();
  const filtrados=produtos.filter(p=>p.nome.toLowerCase().includes(termo));
  renderProdutos(filtrados);
});

// CARRINHO
function atualizarCarrinho(){
  const container=document.getElementById('itens-carrinho');
  const badge=document.getElementById('badge');
  container.innerHTML='';
  let totalItems=0;
  carrinho.forEach(item=>{
    totalItems+=item.qtd;
    const div=document.createElement('div');
    div.classList.add('item-carrinho');
    div.innerHTML=`
      <img src="${item.imagem}" alt="${item.nome}">
      <div class="info">
        <p>${item.nome}</p>
        <p>R$ ${(item.preco*item.qtd).toFixed(2)}</p>
      </div>
      <div class="quantidade">
        <button onclick="mudarQtd(${item.id},-1)">-</button>
        <span>${item.qtd}</span>
        <button onclick="mudarQtd(${item.id},1)">+</button>
      </div>
    `;
    container.appendChild(div);
  });
  badge.textContent=totalItems;

  // 🔹 Salva carrinho no navegador
  localStorage.setItem('carrinho', JSON.stringify(carrinho));
}

function adicionarCarrinho(id){
  const produto=produtos.find(p=>p.id===id);
  const exist=carrinho.find(p=>p.id===id);
  if(exist) exist.qtd++;
  else carrinho.push({...produto,qtd:1,imagem:produto.imagens[0]});
  atualizarCarrinho();
}

function mudarQtd(id,valor){
  const item=carrinho.find(p=>p.id===id);
  if(!item) return;
  item.qtd+=valor;
  if(item.qtd<=0) carrinho=carrinho.filter(p=>p.id!==id);
  atualizarCarrinho();
}

// BOTÕES CARRINHO
document.getElementById('btn-carrinho').addEventListener('click',()=>{
  document.getElementById('carrinho').classList.toggle('active');
});

document.getElementById('limpar').addEventListener('click',()=>{
  carrinho=[];
  localStorage.removeItem('carrinho'); // 🔹 limpa do localStorage também
  atualizarCarrinho();
});

// FINALIZAR WHATSAPP
document.getElementById('finalizar').addEventListener('click',()=>{
  if(carrinho.length===0){alert('Carrinho vazio!');return;}
  let msg='Olá, quero comprar:%0A';
  carrinho.forEach(item=>msg+=`- ${item.nome} x${item.qtd} = R$ ${(item.preco*item.qtd).toFixed(2)}%0A`);
  const total=carrinho.reduce((acc,item)=>acc+item.preco*item.qtd,0);
  msg+=`%0ATotal: R$ ${total.toFixed(2)}`;
  window.open(`https://wa.me/5577981336827?text=${msg}`,'_blank');
});

// MODAL IMAGEM
let modal=document.getElementById('modal');
let modalImg=modal.querySelector('img');
let currentImgs=[];
let currentIndex=0;

function abrirModal(id){
  const produto=produtos.find(p=>p.id===id);
  currentImgs=produto.imagens;
  currentIndex=0;
  modalImg.src=currentImgs[currentIndex];
  modal.style.display='flex';
}

modal.querySelector('.close').addEventListener('click',()=>{modal.style.display='none';});
modal.querySelector('.prev').addEventListener('click',()=>{
  currentIndex=(currentIndex-1+currentImgs.length)%currentImgs.length;
  modalImg.src=currentImgs[currentIndex];
});
modal.querySelector('.next').addEventListener('click',()=>{
  currentIndex=(currentIndex+1)%currentImgs.length;
  modalImg.src=currentImgs[currentIndex];
});

// DRAG IMAGEM
let isDragging=false,startX;
modalImg.addEventListener('mousedown',e=>{isDragging=true; startX=e.clientX;});
modalImg.addEventListener('mouseup',e=>{isDragging=false;});
modalImg.addEventListener('mousemove',e=>{
  if(!isDragging) return;
  let dx=e.clientX-startX;
  if(dx>50){
    currentIndex=(currentIndex-1+currentImgs.length)%currentImgs.length;
    modalImg.src=currentImgs[currentIndex];
    isDragging=false;
  }
  if(dx<-50){
    currentIndex=(currentIndex+1)%currentImgs.length;
    modalImg.src=currentImgs[currentIndex];
    isDragging=false;
  }
});

// INICIAR
renderProdutos(produtos);
atualizarCarrinho(); // 🔹 exibe o carrinho salvo ao abrir
