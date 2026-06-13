let score = 0;
let time = 30;
let phase = 1;

let timerInterval;
let itemInterval;
let holdInterval;

let passwordAttempts = 0;
let holdProgress = 0;
let patienceTrolled = false;
let finalIndex = 0;

const finalMessages = [
  "Então... você realmente chegou até aqui.",
  "Depois dos corações, das estrelas e daquele teste de paciência meio criminoso 😂",
  "Depois do carregamento que ficou em 99% só pra testar sua calma.",
  "E depois de tentar uma senha que, sinceramente... nunca existiu.",
  "Eu fiz tudo isso porque queria te arrancar um sorriso.",
  "Mas também porque queria te dizer uma coisa sem mandar só uma mensagem normal.",
  "Você se tornou muito importante pra mim.",
  "Eu penso em você mais do que deveria admitir.",
  "E, no final das contas, a única coisa que eu queria deixar aqui era isso:",
  "Eu te amo muito ❤️",
  "Você é o amor da minha vida. 💖"
];

function showScreen(id) {
  document.querySelectorAll(".screen").forEach(screen => {
    screen.classList.remove("active");
  });

  document.getElementById(id).classList.add("active");
}

function startGame() {
  clearEverything();

  phase = 1;
  score = 0;
  time = 30;
  passwordAttempts = 0;

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
    document.getElementById("tipText").innerText =
      "Coração vale ponto. Bomba tira ponto. Parece fácil, mas não confia muito.";
  } else {
    document.getElementById("phaseTitle").innerText = "Fase 2: agora quero ver nas estrelas ⭐";
    document.getElementById("tipText").innerText =
      "As estrelas valem mais. As bombas continuam ali só pra atrapalhar sua paz.";
  }

  showScreen("game");

  itemInterval = setInterval(createItem, 760);

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
      { icon: "💘", points: 20 },
      { icon: "💣", points: -20 }
    ];
  } else {
    items = [
      { icon: "⭐", points: 15 },
      { icon: "✨", points: 20 },
      { icon: "🌟", points: 25 },
      { icon: "💣", points: -20 }
    ];
  }

  const chosen = items[Math.floor(Math.random() * items.length)];

  item.className = "item";
  item.innerText = chosen.icon;
  item.style.left = Math.random() * 78 + "%";
  item.style.animationDuration = Math.random() * 2 + 3.4 + "s";

  item.addEventListener(
    "pointerdown",
    () => {
      score += chosen.points;

      if (score < 0) score = 0;

      document.getElementById("score").innerText = score;
      document.getElementById("progress").style.width =
        Math.min(score, 100) + "%";

      item.remove();

      if (score >= 100) {
        endPhase();
      }
    },
    { once: true }
  );

  gameArea.appendChild(item);

  setTimeout(() => {
    item.remove();
  }, 6500);
}

function endPhase() {
  clearInterval(timerInterval);
  clearInterval(itemInterval);

  document.querySelectorAll(".item").forEach(item => item.remove());

  if (phase === 1) {
    showMessage(
      "Ok, passou. 😌",
      "Confesso que eu esperava menos habilidade. Agora vou ter que dificultar um pouco.",
      "Continuar",
      () => {
        phase = 2;
        startPhase();
      }
    );
  } else {
    showMessage(
      "Tá bom, você sabe jogar.",
      "Infelizmente para o meu plano de te estressar, você foi bem. Então vamos testar outra coisa.",
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
  document.getElementById("patienceText").innerText =
    "Segure o botão até completar. Se soltar, volta um pouco. Sem drama, tá?";

  showScreen("patience");

  const holdBtn = document.getElementById("holdBtn");

  holdBtn.onpointerdown = () => {
    clearInterval(holdInterval);

    holdInterval = setInterval(() => {
      holdProgress += 2;

      document.getElementById("holdProgress").style.width =
        holdProgress + "%";

      if (holdProgress >= 56 && !patienceTrolled) {
        patienceTrolled = true;
        holdProgress = 22;

        document.getElementById("holdProgress").style.width =
          holdProgress + "%";

        document.getElementById("patienceText").innerText =
          "Ops... deu uma escorregada aqui do meu lado 😂 Continua, eu acredito.";
      }

      if (holdProgress >= 100) {
        clearInterval(holdInterval);

        document.getElementById("patienceText").innerText =
          "Pronto. Sobreviveu ao teste de paciência. Quase um milagre.";

        setTimeout(() => {
          startFakeLoading();
        }, 1400);
      }
    }, 125);
  };

  holdBtn.onpointerup = () => {
    clearInterval(holdInterval);

    holdProgress = Math.max(0, holdProgress - 10);

    document.getElementById("holdProgress").style.width =
      holdProgress + "%";
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
    { value: 6, msg: "Separando o suspense..." },
    { value: 14, msg: "Organizando uma pequena dose de caos..." },
    { value: 23, msg: "Misturando provocação com carinho..." },
    { value: 36, msg: "Verificando se você ainda não desistiu..." },
    { value: 48, msg: "Ajustando o nível de drama..." },
    { value: 61, msg: "Colocando um pouquinho de fofura..." },
    { value: 74, msg: "Agora parece que vai acabar, né?" },
    { value: 86, msg: "Quase lá. Mas quase mesmo." },
    { value: 94, msg: "Preparando o final..." },
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

    let delay = steps[i].value === 99 ? 2200 : 1350;

    i++;

    if (i < steps.length) {
      setTimeout(nextLoadingStep, delay);
    } else {
      setTimeout(showPassword, 1600);
    }
  }

  nextLoadingStep();
}

function showPassword() {
  passwordAttempts = 0;

  document.getElementById("passwordInput").value = "";
  document.getElementById("passwordText").innerText =
    "Dica: talvez nem eu saiba.";

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
    text.innerText =
      "Tá bom, confesso: não existia senha 😂 Foram " +
      passwordAttempts +
      " tentativas.";

    setTimeout(() => {
      showFinal();
    }, 2200);
  }

  input.value = "";
}

function showFinal() {
  showScreen("final");

  finalIndex = 0;

  const storyText = document.getElementById("storyText");
  const restartBtn = document.getElementById("restartBtn");
  const nextBtn = document.getElementById("nextFinalBtn");

  storyText.innerText = "";
  restartBtn.classList.add("hidden");
  nextBtn.classList.remove("hidden");

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

function clearEverything() {
  clearInterval(timerInterval);
  clearInterval(itemInterval);
  clearInterval(holdInterval);

  document.querySelectorAll(".item").forEach(item => item.remove());
  document.querySelectorAll(".final-heart").forEach(heart => heart.remove());
}

function restartGame() {
  clearEverything();

  score = 0;
  time = 30;
  phase = 1;
  passwordAttempts = 0;
  holdProgress = 0;
  patienceTrolled = false;
  finalIndex = 0;

  document.getElementById("progress").style.width = "0%";
  document.getElementById("holdProgress").style.width = "0%";
  document.getElementById("loadingProgress").style.width = "0%";

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
}, 1200);
