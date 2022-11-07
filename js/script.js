// Ativar Links do Menu
const links = document.querySelectorAll(".header-menu a");
function ativarLink(link) {
  const url = location.href;
  const href = link.href;
  if (url.includes(href)) {
    link.classList.add("ativo");
  }
}
links.forEach(ativarLink);

// Ativar Items do Orçamento
const parametros = new URLSearchParams(location.search);
function ativarProduto(parametro) {
  const elemento = document.getElementById(parametro);
  if (elemento) {
    elemento.checked = true;
  }
}
parametros.forEach(ativarProduto);

// Perguntas Frequentes
const perguntas = document.querySelectorAll(".perguntas button");
function ativarPergunta(event) {
  const pergunta = event.currentTarget;
  const controls = pergunta.getAttribute("aria-controls");
  const resposta = document.getElementById(controls);

  resposta.classList.toggle("ativa");
  const ativa = resposta.classList.contains("ativa");
  pergunta.setAttribute("aria-expanded", ativa);
}
function eventosPerguntas(pergunta) {
  pergunta.addEventListener("click", ativarPergunta);
}
perguntas.forEach(eventosPerguntas);

// Galeria de Bicicletas
const galeria = document.querySelectorAll(".bicicleta-imagens img");
const galeriaContainer = document.querySelector(".bicicleta-imagens");
function trocarImagem(event) {
  const img = event.currentTarget;
  const media = matchMedia("(min-width: 1000px)").matches;
  if (media) {
    galeriaContainer.prepend(img);
  }
}
function eventosGaleria(img) {
  img.addEventListener("click", trocarImagem);
}
galeria.forEach(eventosGaleria);

// Animação
if (window.SimpleAnime) {
  new SimpleAnime();
}

// menu mobile
function initMenu() {
  const menuButton = document.querySelector(`[data-menu="button"]`)
  const menuLista = document.querySelector(`[data-menu="lista"]`)
  const clique = ['click']
  if (menuButton) {
    function openMenu() {
      menuLista.classList.remove('desactive')
      menuButton.classList.remove('desactive')
      menuLista.classList.add('active')
      menuButton.classList.add('active')
      outsideClick(menuLista, clique, () => {
        menuLista.classList.remove(`active`)
        menuButton.classList.remove(`active`)
        menuLista.classList.add('desactive')
      menuButton.classList.add('desactive')
      })
    }
    clique.forEach((evento) => {
      menuButton.addEventListener(evento, openMenu)
    })
  }
}
initMenu()

// outside click
function outsideClick(element, events, callback) {
  const html = document.documentElement
  const outside = 'data-outside'

  if (!element.hasAttribute(outside)) {
    events.forEach(userEvent => {
      setTimeout(() => { html.addEventListener(userEvent, handleOusideClick) })
    })
    element.setAttribute(outside, '')
  }
  function handleOusideClick(event) {
    if (!element.contains(event.target)) {
      element.removeAttribute(outside)
      events.forEach(userEvent => {
        html.removeEventListener(userEvent, handleOusideClick)
      })
      callback()
    }
  }
}
outsideClick()