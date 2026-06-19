// Aplicativo Día del Padre - Colegio Emanuel
// Cambia las imágenes o frases en este arreglo cuando desees personalizar el proyecto.
const fathers = [
  { image: 'img/1.jpeg', title: 'Para un papá especial', text: 'Papá, gracias por ser mi guía, mi fuerza y mi mayor ejemplo.' },
  { image: 'img/2.jpeg', title: 'Mi héroe de todos los días', text: 'Tu amor es el regalo más grande que Dios me dio.' },
  { image: 'img/3.jpeg', title: 'Gracias por tu amor', text: 'Gracias por cada consejo, cada abrazo y cada sacrificio.' },
  { image: 'img/5.jpeg', title: 'Mi protector y orgullo', text: 'Eres mi héroe, mi protector y mi orgullo.' },
  { image: 'img/6.jpeg', title: 'Un corazón valiente', text: 'Hoy celebramos tu amor, tu esfuerzo y tu gran corazón.' },
  { image: 'img/7.jpeg', title: 'Ejemplo de vida', text: 'Papá, tus pasos me enseñan a caminar con fe, respeto y esperanza.' },
  { image: 'img/8.jpeg', title: 'Amor que inspira', text: 'Cada día aprendo de tu paciencia, tu alegría y tu forma de amar.' },
  { image: 'img/9.jpeg', title: 'Bendición de Dios', text: 'Dios me bendijo con un papá que cuida, enseña y ama sin medida.' },
  { image: 'img/10.jpeg', title: 'Fuerza de familia', text: 'Gracias por sostener mi mano y llenar mi vida de seguridad.' },
  { image: 'img/11.jpeg', title: 'Mi gran maestro', text: 'Tus consejos son semillas que crecen en mi corazón.' },
  { image: 'img/12.jpeg', title: 'Papá admirable', text: 'Tu esfuerzo silencioso vale más que mil palabras. Gracias, papá.' },
  { image: 'img/13.jpeg', title: 'Amor infinito', text: 'No necesito un superhéroe, porque tengo a papá en casa.' },
  { image: 'img/14.jpeg', title: 'Mi alegría', text: 'Tu sonrisa hace que cada día sea más bonito y especial.' },
  { image: 'img/logo.png', title: 'Colegio Emanuel', text: 'Feliz Día del Padre a todos los papitos que forman parte de nuestra familia Emanuel.' }
];

let currentIndex = 0;
let autoPlay = null;

const slideImage = document.getElementById('slideImage');
const slideTitle = document.getElementById('slideTitle');
const slideText = document.getElementById('slideText');
const slideNumber = document.getElementById('slideNumber');
const slideCard = document.getElementById('slideCard');
const bgMusic = document.getElementById('bgMusic');
const btnMusic = document.getElementById('btnMusic');

function formatNumber(number){
  return String(number).padStart(2, '0');
}

function updateSlide(index){
  currentIndex = (index + fathers.length) % fathers.length;
  const item = fathers[currentIndex];
  slideImage.src = item.image;
  slideImage.alt = item.title;
  slideTitle.textContent = item.title;
  slideText.textContent = item.text;
  slideNumber.textContent = `${formatNumber(currentIndex + 1)} / ${formatNumber(fathers.length)}`;
  slideCard.classList.remove('slide-animate');
  void slideCard.offsetWidth;
  slideCard.classList.add('slide-animate');
}

function nextSlide(){ updateSlide(currentIndex + 1); }
function prevSlide(){ updateSlide(currentIndex - 1); }

function startAutoPlay(){
  stopAutoPlay();
  autoPlay = setInterval(nextSlide, 4500);
}
function stopAutoPlay(){
  if(autoPlay) clearInterval(autoPlay);
  autoPlay = null;
}

function scrollToSection(id){
  document.getElementById(id).scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function buildGallery(){
  const grid = document.getElementById('galleryGrid');
  grid.innerHTML = fathers.map((item, index) => `
    <article class="family-card" style="animation-delay:${index * .07}s">
      <span class="decor">❤ ${formatNumber(index + 1)}</span>
      <img src="${item.image}" alt="${item.title}">
      <div class="card-content">
        <h3>${item.title}</h3>
        <p>${item.text}</p>
      </div>
    </article>
  `).join('');
}

// Botones principales
document.getElementById('nextBtn').addEventListener('click', nextSlide);
document.getElementById('prevBtn').addEventListener('click', prevSlide);
document.getElementById('autoBtn').addEventListener('click', () => { startAutoPlay(); scrollToSection('presentacion'); });
document.getElementById('pauseBtn').addEventListener('click', stopAutoPlay);
document.getElementById('btnStart').addEventListener('click', () => { launchConfetti(); startAutoPlay(); scrollToSection('presentacion'); });
document.getElementById('btnSeeGallery').addEventListener('click', () => scrollToSection('galeria'));
document.getElementById('btnGallery').addEventListener('click', () => scrollToSection('galeria'));

btnMusic.addEventListener('click', async () => {
  try{
    if(bgMusic.paused){
      await bgMusic.play();
      btnMusic.textContent = 'Pausar música';
    }else{
      bgMusic.pause();
      btnMusic.textContent = 'Activar música';
    }
  }catch(error){
    alert('Para usar música, coloca un archivo llamado musica.mp3 dentro de la carpeta audio.');
  }
});

// Confeti en canvas
const canvas = document.getElementById('confettiCanvas');
const ctx = canvas.getContext('2d');
let confettiPieces = [];
const colors = ['#f7c948','#ffffff','#7db7ff','#ffdf82','#ff8fab'];

function resizeCanvas(){
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
window.addEventListener('resize', resizeCanvas);
resizeCanvas();

function createConfetti(){
  confettiPieces = Array.from({ length: 170 }, () => ({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height - canvas.height,
    size: Math.random() * 8 + 4,
    speed: Math.random() * 3 + 2,
    rotation: Math.random() * 360,
    color: colors[Math.floor(Math.random() * colors.length)],
    sway: Math.random() * 2 - 1
  }));
}

function drawConfetti(){
  ctx.clearRect(0,0,canvas.width,canvas.height);
  confettiPieces.forEach(piece => {
    ctx.save();
    ctx.translate(piece.x, piece.y);
    ctx.rotate(piece.rotation * Math.PI / 180);
    ctx.fillStyle = piece.color;
    ctx.fillRect(-piece.size / 2, -piece.size / 2, piece.size, piece.size * 0.65);
    ctx.restore();
    piece.y += piece.speed;
    piece.x += Math.sin(piece.y * .02) + piece.sway;
    piece.rotation += 4;
  });
  confettiPieces = confettiPieces.filter(piece => piece.y < canvas.height + 30);
  if(confettiPieces.length) requestAnimationFrame(drawConfetti);
  else ctx.clearRect(0,0,canvas.width,canvas.height);
}

function launchConfetti(){
  createConfetti();
  drawConfetti();
}

// Iniciar
buildGallery();
updateSlide(0);
setTimeout(launchConfetti, 500);
