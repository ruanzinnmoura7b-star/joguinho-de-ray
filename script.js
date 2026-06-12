let score = 0;
let time = 30;
let phase = 1;
let timerInterval;
let itemInterval;
let passwordAttempts = 0;

let holdProgress = 0;
let holdInterval;
let patienceTrolled = false;

let finalIndex = 0;

const finalMessages = [
  "Você chegou até aqui.",
  "Mesmo quando eu tentei te irritar só um pouquinho. 😌",
  "Mesmo quando o jogo fingiu que estava travando.",
  "Mesmo quando a senha nem existia.",
  "E, sinceramente, isso combina muito com você.",
  "Teimosa do jeitinho que eu gosto. ❤️",
  "No fim, a surpresa era simples.",
  "Eu só queria te lembrar uma coisa...",
  "Eu te amo muito. ❤️",
  "E você é o amor da minha vida. 💖"
];

function showScreen(id) {
  document.querySelectorAll(".screen").forEach(screen => {
    screen.classList.remove("active");
  });

  document.getElementById(id).classList.add("active");
}

function startGame() {
  phase = 1;
  startPhase();
}

function startPhase() {
  score = 0;
  time = 30;

  document.getElementById("score").innerText = score;
  document.getElementById("timer").innerText = time;
  document.getElementById("progress").style.width = "0%";

  if (phase === 1) {
    document.getElementById("phaseTitle").innerText = "Fase 1: pega os corações ❤️";
    document.getElementById("tipText").innerText = "Coração vale ponto. Bomba tira ponto. Simples... eu acho.";
  } else {
    document.getElementById("phaseTitle").innerText = "Fase 2: agora quero ver nas estrelas ⭐";
    document.getElementById("tipText").innerText = "As estrelas valem mais. As bombas continuam sendo inconvenientes.";
  }

  showScreen("game");

  itemInterval = setInterval(createItem, 720);

  timerInterval = setInterval(() => {
    time--;
    document.getElementById("timer").innerText = time;

    if (time <= 0) {
      endPhase();
    }
  }, 1000);
}

function createItem() {
  const gameArea = document.getElementById("gameArea");
  const item = document.createElement("div");

  let items;

  if (phase === 1) {
    items = [
      { icon: "❤️", points: 10 },
      { icon: "💖", points: 15 },
      { icon: "💣", points: -20 }
    ];
  } else {
    items = [
      { icon: "⭐", points: 15 },
      { icon: "✨", points: 20 },
      { icon: "💣", points: -20 }
    ];
  }

  const chosen = items[Math.floor(Math.random() * items.length)];

  item.className = "item";
  item.innerText = chosen.icon;
  item.style.left = Math.random() * 82 + "%";
  item.style.animationDuration = Math.random() * 2 + 3.2 + "s";

  item.addEventListener("pointerdown", () => {
    score += chosen.points;

    if (score < 0) score = 0;

    document.getElementById("score").innerText = score;
    document.getElementById("progress").style.width = Math.min(score, 100) + "%";

    item.remove();

    if (score >= 100) {
      endPhase();
    }
  }, { once: true });

  gameArea.appendChild(item);

  setTimeout(() => {
    item.remove();
  }, 6000);
}

function endPhase() {
  clearInterval(timerInterval);
  clearInterval(itemInterval);

  document.querySelectorAll(".item").forEach(item => item.remove());

  if (phase === 1) {
    showMessage(
      "Ok, passou. 😌",
      "Não vou mentir: eu esperava menos habilidade. Agora complicou pra mim.",
      "Continuar",
      () => {
        phase = 2;
        startPhase();
      }
    );
  } else {
    showMessage(
      "Tá bom, você sabe jogar.",
      "Infelizmente para o meu plano de te irritar, você foi bem. Então vamos para uma fase mais psicológica.",
      "Próxima fase",
      startPatienceTest
    );
  }
}

function showMessage(title, text, buttonText, action) {
  showScreen("message");

  document.getElementById("messageTitle").innerText = title;
  document.getElementById("messageText").innerText = text;
  document.getElementById("messageBtn").innerText = buttonText;
  document.getElementById("messageBtn").onclick = action;
}

function startPatienceTest() {
  holdProgress = 0;
  patienceTrolled = false;

  document.getElementById("holdProgress").style.width = "0%";
  document.getElementById("patienceText").innerText = "Segure até completar. Se soltar, volta um pouco. Sem drama.";
  showScreen("patience");

  const holdBtn = document.getElementById("holdBtn");

  holdBtn.onpointerdown = () => {
    clearInterval(holdInterval);

    holdInterval = setInterval(() => {
      holdProgress += 2;
      document.getElementById("holdProgress").style.width = holdProgress + "%";

      if (holdProgress >= 58 && !patienceTrolled) {
        patienceTrolled = true;
        holdProgress = 18;
        document.getElementById("holdProgress").style.width = holdProgress + "%";
        document.getElementById("patienceText").innerText = "Ops... escorregou aqui do meu lado 😂 Continua, eu acredito.";
      }

      if (holdProgress >= 100) {
        clearInterval(holdInterval);
        document.getElementById("patienceText").innerText = "Pronto. Sobreviveu ao teste de paciência.";
        
        setTimeout(() => {
          startFakeLoading();
        }, 1200);
      }
    }, 120);
  };

  holdBtn.onpointerup = () => {
    clearInterval(holdInterval);
    holdProgress = Math.max(0, holdProgress - 12);
    document.getElementById("holdProgress").style.width = holdProgress + "%";
  };

  holdBtn.onpointerleave = () => {
    clearInterval(holdInterval);
  };
}

function startFakeLoading() {
  showScreen("loading");

  const progress = document.getElementById("loadingProgress");
  const percent = document.getElementById("loadingPercent");
  const text = document.getElementById("loadingText");

  const steps = [
    { value: 0, msg: "Iniciando operação extremamente importante..." },
    { value: 7, msg: "Organizando o suspense..." },
    { value: 18, msg: "Separando uma dose de carinho..." },
    { value: 31, msg: "Misturando drama com fofura..." },
    { value: 47, msg: "Verificando se você ainda está aí..." },
    { value: 63, msg: "Ajustando o nível de provocação..." },
    { value: 78, msg: "Quase. Eu disse quase." },
    { value: 91, msg: "Agora é a parte em que parece que vai acabar." },
    { value: 99, msg: "99%. Clássico." },
    { value: 99, msg: "Ainda 99%. Não foi erro." },
    { value: 99, msg: "Eu sei. Dá raiva mesmo." },
    { value: 99, msg: "Respira. Falta pouco de verdade." },
    { value: 100, msg: "Pronto. Agora sim." }
  ];

  let i = 0;

  progress.style.width = "0%";
  percent.innerText = "0%";
  text.innerText = steps[0].msg;

  function nextLoadingStep() {
    progress.style.width = steps[i].value + "%";
    percent.innerText = steps[i].value + "%";
    text.innerText = steps[i].msg;

    let delay = steps[i].value === 99 ? 1800 : 1150;

    i++;

    if (i < steps.length) {
      setTimeout(nextLoadingStep, delay);
    } else {
      setTimeout(showPassword, 1400);
    }
  }

  nextLoadingStep();
}

function showPassword() {
  passwordAttempts = 0;

  document.getElementById("passwordInput").value = "";
  document.getElementById("passwordText").innerText = "Dica: talvez nem eu saiba.";

  showScreen("password");
}

function checkPassword() {
  passwordAttempts++;

  const text = document.getElementById("passwordText");
  const input = document.getElementById("passwordInput");

  if (passwordAttempts === 1) {
    text.innerText = "Errada. Mas gostei da confiança.";
  } else if (passwordAttempts === 2) {
    text.innerText = "Ainda não. Você está chutando com emoção.";
  } else if (passwordAttempts === 3) {
    text.innerText = "Última tentativa. Finge que agora vai.";
  } else {
    text.innerText = "Tá bom, confesso: não existia senha 😂";

    setTimeout(() => {
      showFinal();
    }, 1800);
  }

  input.value = "";
}

function showFinal() {
  showScreen("final");

  finalIndex = 0;

  document.getElementById("storyText").innerText = "";
  document.getElementById("restartBtn").classList.add("hidden");
  document.getElementById("nextFinalBtn").classList.remove("hidden");

  nextFinalMessage();
}

function nextFinalMessage() {
  const storyText = document.getElementById("storyText");
  const nextBtn = document.getElementById("nextFinalBtn");
  const restartBtn = document.getElementById("restartBtn");

  if (finalIndex < finalMessages.length) {
    storyText.innerText = finalMessages[finalIndex];
    finalIndex++;
  } else {
    nextBtn.classList.add("hidden");
    restartBtn.classList.remove("hidden");
    startFinalHearts();
  }
}

function startFinalHearts() {
  const interval = setInterval(() => {
    const heart = document.createElement("div");

    heart.className = "final-heart";
    heart.innerHTML = "❤️";
    heart.style.left = Math.random() * 100 + "vw";

    document.body.appendChild(heart);

    setTimeout(() => {
      heart.remove();
    }, 7000);
  }, 300);

  setTimeout(() => {
    clearInterval(interval);
  }, 15000);
}

function restartGame() {
  clearInterval(timerInterval);
  clearInterval(itemInterval);
  clearInterval(holdInterval);

  document.querySelectorAll(".item").forEach(item => item.remove());
  document.querySelectorAll(".final-heart").forEach(heart => heart.remove());

  score = 0;
  time = 30;
  phase = 1;
  passwordAttempts = 0;
  holdProgress = 0;
  patienceTrolled = false;
  finalIndex = 0;

  showScreen("home");
}

setInterval(() => {
  const heart = document.createElement("div");

  heart.className = "floating-heart";
  heart.innerText = "❤️";
  heart.style.left = Math.random() * 100 + "vw";
  heart.style.fontSize = Math.random() * 18 + 18 + "px";

  document.body.appendChild(heart);

  setTimeout(() => {
    heart.remove();
  }, 7000);
}, 1100);
