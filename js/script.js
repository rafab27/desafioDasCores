console.log("JS carregado!");

const cores = [
  { nome: 'vermelho', valor: 'red' },
  { nome: 'verde', valor: 'green' },
  { nome: 'azul', valor: 'blue' },
  { nome: 'amarelo', valor: 'yellow' },
  { nome: 'roxo', valor: 'purple' },
  { nome: 'laranja', valor: 'orange' },
  { nome: 'rosa', valor: 'pink' },
  { nome: 'marrom', valor: '#8B4513' },
  { nome: 'cinza', valor: 'gray' }
];

const tamanhoGrid = 9; 
const tempoTotal = 30;

let corAlvo = '';
let nomeCorAlvo = '';
let pontuacao = 0;
let tempoRestante = tempoTotal;
let intervalo;
let nomeJogador = '';

const startBtn = document.getElementById('startBtn');
const restartBtn = document.getElementById('restartBtn');
const gameArea = document.getElementById('gameArea');
const grid = document.getElementById('grid');
const targetColorText = document.getElementById('targetColor');
const scoreText = document.getElementById('score');
const timerText = document.getElementById('timer');
const gameOver = document.getElementById('gameOver');
const finalName = document.getElementById('finalName');
const finalScore = document.getElementById('finalScore');

startBtn.addEventListener('click', iniciarJogo);
restartBtn.addEventListener('click', () => location.reload());

function iniciarJogo() {
  nomeJogador = document.getElementById('playerName').value.trim();
  if (!nomeJogador) {
    alert('Digite seu nome para começar!');
    return;
  }

  pontuacao = 0;
  tempoRestante = tempoTotal;
  gameArea.classList.remove('hidden');
  document.querySelector('.info').classList.add('hidden');
  gameOver.classList.add('hidden');

  novaCorAlvo();
  gerarGrid();
  atualizarPontuacao();

  intervalo = setInterval(() => {
    tempoRestante--;
    atualizarTempo();
    if (tempoRestante <= 0) {
      finalizarJogo();
    }
  }, 1000);
}

function novaCorAlvo() {
  const cor = cores[Math.floor(Math.random() * cores.length)];
  nomeCorAlvo = cor.nome;
  corAlvo = cor.valor;
  targetColorText.textContent = nomeCorAlvo.toUpperCase();
}

function gerarGrid() {
  grid.innerHTML = '';

  const indiceCorreta = Math.floor(Math.random() * tamanhoGrid);

  for (let i = 0; i < tamanhoGrid; i++) {
    let cor;
    if (i === indiceCorreta) {
      cor = cores.find(c => c.nome === nomeCorAlvo);
    } else {
      const coresDisponiveis = cores.filter(c => c.nome !== nomeCorAlvo);
      cor = coresDisponiveis[Math.floor(Math.random() * coresDisponiveis.length)];
    }

    const quadrado = document.createElement('div');
    quadrado.classList.add('square');
    quadrado.style.backgroundColor = cor.valor;
    quadrado.dataset.nome = cor.nome;
    quadrado.addEventListener('click', aoClicarQuadrado);
    grid.appendChild(quadrado);
  }
}

function aoClicarQuadrado(e) {
  const corClicada = e.target.dataset.nome;
  if (corClicada === nomeCorAlvo) {
    pontuacao += 10;
  } else {
    pontuacao = Math.max(0, pontuacao - 5);
  }
  atualizarPontuacao();
  novaCorAlvo();
  gerarGrid();
}

function atualizarPontuacao() {
  scoreText.textContent = pontuacao;
}

function atualizarTempo() {
  timerText.textContent = tempoRestante;
}

function finalizarJogo() {
  clearInterval(intervalo);
  gameArea.classList.add('hidden');
  gameOver.classList.remove('hidden');
  finalName.textContent = nomeJogador;
  finalScore.textContent = pontuacao;
}
