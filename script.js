const PIN = "300408";
const START = new Date("2025-07-22T00:00:00");
let compliments = JSON.parse(localStorage.getItem("compliments")) || [
  "Julia, je t'aime",
  "Tu es la plus belle chose qui me soit arrivée",
  "Je t'aime mon petit bébé orque",
  "Tu es l'amour de ma vie",
  "Tu es ce qu'il y a de plus cher pour moi",
  "Ya Tebia Lyublyu",
  "Je t'aime mon coeur",
  "Julia, maries moi !",
  "Mon chat",
  "Je t'aime plus que tout",
  "Plus le temps passe, plus je t'aime",
  "Je t'aime ma femme",
  "Je veux passer le restant de ma vie à tes côtés",
  "Ne l'oublies jamais : je veille toujours sur toi",
  "Sans toi je ne suis rien, avec, je suis tout",
  "Je t'aime ma chérie",
  "Je veux dormir à tes côtés",
  "Je ne souhaite que ton bonheur",
  "Je t'aime ma Juju",
  "Tu es si belle",
  "Tu es magnifique",
  "Tu es sublime",
  "Tes yeux sont comme des joyaux inestimables",
  "Ton corps est d'une beauté éblouissante",
  "Tu es la plus belle femme au monde",
  "Chaque photo de toi est une œuvre d'art",
  "*Bisous sur le front*",
  "*Bisous sur la joue*",
  "*Bisous sur les lèvres*",
  "*Bisous dans le cou*",
  "JULIA JE T'AIME !",
  "Mon petit cœur",
  "Tu es mon amoureuse",
  "Coucou mon cœur, j'espère que tu vas bien",
  "Je t'aime mon bébé loup",
  "Je suis amoureux de toi Julia"
];

// Timer
function updateTimer() {
  const now = new Date();
  const diff = now - START;
  const days = Math.floor(diff / 86400000);
  const hrs = Math.floor((diff % 86400000) / 3600000);
  const min = Math.floor((diff % 3600000) / 60000);
  const sec = Math.floor((diff % 60000) / 1000);
  document.getElementById("timer").textContent =
    `Ensemble depuis ${days} j ${hrs} h ${min} min ${sec} s`;
}
setInterval(updateTimer, 1000);
updateTimer();

// Compliment
document.getElementById("btn-compliment").onclick = () => {
  if (compliments.length) {
    document.getElementById("compliment").textContent =
      compliments[Math.floor(Math.random() * compliments.length)];
  } else {
    document.getElementById("compliment").textContent = "Ajoute un compliment pour commencer";
  }
};

// Mode dev
const pinOverlay = document.getElementById("pin-overlay");
document.getElementById("btn-dev").onclick = () => pinOverlay.classList.remove("hidden");
document.getElementById("pin-ok").onclick = () => {
  if (document.getElementById("pin-input").value === PIN) {
    pinOverlay.classList.add("hidden");
    openDev();
  }
};

const devPopup = document.getElementById("dev-popup");
document.getElementById("close-dev").onclick = () => devPopup.classList.add("hidden");

function openDev() {
  refreshSelect();
  devPopup.classList.remove("hidden");
}

function refreshSelect() {
  const select = document.getElementById("select-list");
  select.innerHTML = "";
  compliments.forEach(c => {
    const opt = document.createElement("option");
    opt.textContent = c;
    select.appendChild(opt);
  });
}

function save() {
  localStorage.setItem("compliments", JSON.stringify(compliments));
}

document.getElementById("add").onclick = () => {
  const t = document.getElementById("input-text").value.trim();
  if (t) {
    compliments.push(t);
    save();
    refreshSelect();
    document.getElementById("input-text").value = "";
  }
};

document.getElementById("edit").onclick = () => {
  const idx = document.getElementById("select-list").selectedIndex;
  const t = document.getElementById("input-text").value.trim();
  if (idx >= 0 && t) {
    compliments[idx] = t;
    save();
    refreshSelect();
    document.getElementById("input-text").value = "";
  }
};

document.getElementById("del").onclick = () => {
  const idx = document.getElementById("select-list").selectedIndex;
  if (idx >= 0) {
    compliments.splice(idx, 1);
    save();
    refreshSelect();
  }
};