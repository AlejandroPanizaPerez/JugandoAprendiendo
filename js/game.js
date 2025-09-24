// game.js
let nivel = 1;
let puntaje = 0;
let respuestaCorrecta;

let vidaCaballero = 100;
let vidaEnemigo;
let enemigoIndex = 0;

const enemigos = [
  { nombre: 'Orco', vida: 100, img: 'images/orc.png', fondo: 'images/forest.jpg', clase: 'enemigo' },
  { nombre: 'Troll', vida: 120, img: 'images/troll.png', fondo: 'images/cave.jpg', clase: 'enemigo troll' },
  { nombre: 'Dragón', vida: 200, img: 'images/dragon.png', fondo: 'images/volcano.jpg', clase: 'enemigo dragon' }
];

function iniciarJuego() {
  document.getElementById("inicio").classList.add("hidden");
  document.getElementById("juego").classList.remove("hidden");

  const musica = document.getElementById("audioFondo");
  musica.volume = 0.5;
  musica.play().catch(()=>{});

  vidaCaballero = 100;
  enemigoIndex = 0;
  vidaEnemigo = enemigos[enemigoIndex].vida;
  actualizarBarras();
  generarPregunta();
}

function generarPregunta() {
  document.getElementById("nivel").textContent = "Nivel " + nivel;
  document.getElementById("puntaje").textContent = puntaje;

  const enemigo = enemigos[enemigoIndex];
  document.getElementById("nombreEnemigo").textContent = enemigo.nombre;
  const imgEnemigo = document.getElementById("enemigo");
  imgEnemigo.src = enemigo.img;
  imgEnemigo.className = enemigo.clase;
  document.getElementById("juego").style.backgroundImage = `url(${enemigo.fondo})`;

  let num1 = Math.floor(Math.random() * (nivel * 5)) + 1;
  let num2 = Math.floor(Math.random() * (nivel * 5)) + 1;
  let operaciones = ["+", "-", "*", "/"];
  let operacion = operaciones[Math.floor(Math.random() * operaciones.length)];

  if (operacion === "/") {
    num1 = num1 * num2;
  }

  let pregunta = `${num1} ${operacion} ${num2}`;
  document.getElementById("pregunta").textContent = "¿Cuánto es " + pregunta + "?";
  respuestaCorrecta = eval(pregunta);
}

function verificarRespuesta() {
  let respuesta = parseFloat(document.getElementById("respuesta").value);
  if (respuesta === respuestaCorrecta) {
    document.getElementById("mensaje").textContent = "✅ Correcto!";
    puntaje += 10;
    atacarCaballero();
  } else {
    document.getElementById("mensaje").textContent = "❌ Incorrecto!";
    atacarEnemigo();
  }
  document.getElementById("respuesta").value = "";

  if (vidaCaballero <= 0) {
    finDelJuego();
  } else if (vidaEnemigo <= 0) {
    enemigoIndex++;
    if (enemigoIndex >= enemigos.length) {
      document.getElementById("mensaje").textContent = "🎉 ¡Has vencido a todos los enemigos!";
      document.getElementById("audioVictory").play();
      finDelJuego();
      return;
    } else {
      vidaEnemigo = enemigos[enemigoIndex].vida;
      nivel++;
    }
  }

  setTimeout(() => {
    document.getElementById("mensaje").textContent = "";
    generarPregunta();
  }, 1000);
}

function atacarCaballero() {
  const caballero = document.getElementById("caballero");
  caballero.classList.add("attack");
  document.getElementById("audioSword").play();
  vidaEnemigo -= 20;
  if (vidaEnemigo < 0) vidaEnemigo = 0;
  actualizarBarras();
  setTimeout(() => caballero.classList.remove("attack"), 500);
}

function atacarEnemigo() {
  const enemigo = document.getElementById("enemigo");
  enemigo.classList.add("attack");
  document.getElementById("audioOrc").play();
  vidaCaballero -= 20;
  if (vidaCaballero < 0) vidaCaballero = 0;
  actualizarBarras();
  setTimeout(() => enemigo.classList.remove("attack"), 500);
}

function actualizarBarras() {
  document.getElementById("vidaCaballeroBar").style.width = vidaCaballero + "%";
  document.getElementById("vidaEnemigoBar").style.width = (vidaEnemigo / enemigos[enemigoIndex].vida * 100) + "%";
}

function finDelJuego() {
  document.getElementById("juego").classList.add("hidden");
  document.getElementById("gameover").classList.remove("hidden");
  document.getElementById("puntajeFinal").textContent = puntaje;
  document.getElementById("audioDefeat").play();

  const musica = document.getElementById("audioFondo");
  musica.pause();
  musica.currentTime = 0;
}

function reiniciarJuego() {
  nivel = 1;
  puntaje = 0;
  vidaCaballero = 100;
  enemigoIndex = 0;
  vidaEnemigo = enemigos[enemigoIndex].vida;

  document.getElementById("gameover").classList.add("hidden");
  document.getElementById("juego").classList.remove("hidden");

  const musica = document.getElementById("audioFondo");
  musica.play().catch(()=>{});

  actualizarBarras();
  generarPregunta();
}

// Modal
function abrirModal() {
  document.getElementById("modalAyuda").style.display = "flex";
  document.getElementById("modalAyuda").setAttribute("aria-hidden", "false");
}
function cerrarModal() {
  document.getElementById("modalAyuda").style.display = "none";
  document.getElementById("modalAyuda").setAttribute("aria-hidden", "true");
}
window.onclick = function(event) {
  if (event.target === document.getElementById("modalAyuda")) {
    cerrarModal();
  }
}