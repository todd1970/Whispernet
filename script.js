const questions = [
  "Would you permanently remove anxiety if it also reduced emotional intensity?",
  "Should society prioritise stability over individual freedom during periods of crisis?",
  "Would you choose peace if it meant feeling less?",
  "Is emotional volatility a problem that should be solved?",
  "Would you accept monitoring if it prevented social collapse?",
  "Would you rather be safe than uncertain?",
  "If no one reacts, did the system work?",
  "Should people be helped before they ask for help?",
  "Would you trust a system that knew what overwhelmed you?",
  "If relief required surrender, would you still choose relief?"
];

const results = [
  {
    max: 35,
    title: "LOW ALIGNMENT COMPATIBILITY",
    copy: "You retain elevated emotional variance.",
    recommendation: "Recommendation: Continued observation."
  },
  {
    max: 70,
    title: "MODERATE ALIGNMENT COMPATIBILITY",
    copy: "You show willingness to exchange uncertainty for stability.",
    recommendation: "Recommendation: Controlled exposure."
  },
  {
    max: 100,
    title: "HIGH ALIGNMENT COMPATIBILITY",
    copy: "You demonstrate strong preference for stability over emotional variance.",
    recommendation: "Recommendation: Alignment advised."
  }
];

const observations = [
  {
    id: "OBSERVATION 4831",
    location: "Columbus, Ohio",
    copy: "Family conflict frequency reduced 17%."
  },
  {
    id: "OBSERVATION 5127",
    location: "Pittsburgh, Pennsylvania",
    copy: "Reported emotional variance declining."
  },
  {
    id: "OBSERVATION 6201",
    location: "Chicago, Illinois",
    copy: "Public compliance increasing."
  },
  {
    id: "OBSERVATION 7310",
    location: "Fresno, California",
    copy: "Pattern confirmed."
  },
  {
    id: "OBSERVATION 8084",
    location: "Des Moines, Iowa",
    copy: "School disruption events down 31%."
  },
  {
    id: "OBSERVATION 9122",
    location: "Detroit, Michigan",
    copy: "Workplace decision latency reduced."
  },
  {
    id: "OBSERVATION 1047",
    location: "Tulsa, Oklahoma",
    copy: "No escalation events recorded."
  },
  {
    id: "OBSERVATION 2296",
    location: "Omaha, Nebraska",
    copy: "Calm-state drift 85% confirmed."
  },
  {
    id: "OBSERVATION 3374",
    location: "Cleveland, Ohio",
    copy: "Domestic dispute calls reduced across monitored zones."
  },
  {
    id: "OBSERVATION 4490",
    location: "St. Louis, Missouri",
    copy: "Neighbourhood complaint volume approaching zero."
  },
  {
    id: "OBSERVATION 5638",
    location: "Reno, Nevada",
    copy: "Public gathering noise variance below threshold."
  },
  {
    id: "OBSERVATION 6902",
    location: "Dayton, Ohio",
    copy: "School attendance stable. Emotional response variance reduced."
  }
];

const assessment = document.querySelector("[data-assessment]");
const source = document.querySelector("[data-source]");
const beginButton = document.querySelector("[data-begin-assessment]");
const viewSourceButton = document.querySelector("[data-view-source]");
const questionEl = document.querySelector("[data-question]");
const answersEl = document.querySelector("[data-answers]");
const progressEl = document.querySelector("[data-progress]");
const progressBar = document.querySelector("[data-progress-bar]");
const resultPanel = document.querySelector("[data-result]");
const scoreOutput = document.querySelector("[data-score-output]");
const resultTitle = document.querySelector("[data-result-title]");
const resultCopy = document.querySelector("[data-result-copy]");
const resultRecommendation = document.querySelector("[data-result-recommendation]");
const clockEl = document.querySelector("[data-clock]");
const varianceEl = document.querySelector("[data-variance]");
const densityEl = document.querySelector("[data-density]");
const noiseLine = document.querySelector("[data-noise-line]");
const observationCard = document.querySelector("[data-observation-card]");
const observationIndex = document.querySelector("[data-observation-index]");
const observationId = document.querySelector("[data-observation-id]");
const observationLocation = document.querySelector("[data-observation-location]");
const observationCopy = document.querySelector("[data-observation-copy]");
const canvas = document.querySelector("[data-signal-canvas]");
const context = canvas?.getContext("2d");

let currentQuestion = 0;
let score = 0;
let signalPoints = [];
let currentObservation = 0;

const scrollToElement = (selector) => {
  const target = document.querySelector(selector);
  if (target) {
    target.scrollIntoView({ behavior: "smooth", block: "start" });
  }
};

document.querySelectorAll("[data-scroll-target]").forEach((button) => {
  button.addEventListener("click", () => scrollToElement(button.dataset.scrollTarget));
});

const updateQuestion = () => {
  const questionNumber = String(currentQuestion + 1).padStart(2, "0");
  questionEl.textContent = questions[currentQuestion];
  progressEl.textContent = `QUESTION ${questionNumber} / ${questions.length}`;
  progressBar.style.width = `${((currentQuestion + 1) / questions.length) * 100}%`;
};

const showResult = () => {
  const percentage = Math.round((score / (questions.length * 10)) * 100);
  const result = results.find((item) => percentage <= item.max) || results[results.length - 1];

  answersEl.hidden = true;
  questionEl.textContent = "Assessment complete.";
  progressEl.textContent = "REPORT GENERATED";
  progressBar.style.width = "100%";
  scoreOutput.textContent = `${percentage}%`;
  resultTitle.textContent = result.title;
  resultCopy.textContent = result.copy;
  resultRecommendation.textContent = result.recommendation;
  resultPanel.hidden = false;
};

if (beginButton) {
  beginButton.addEventListener("click", () => {
    assessment.hidden = false;
    currentQuestion = 0;
    score = 0;
    answersEl.hidden = false;
    resultPanel.hidden = true;
    updateQuestion();
    requestAnimationFrame(() => {
      assessment.querySelector(".reveal").classList.add("is-visible");
      scrollToElement("#assessment");
    });
  });
}

if (answersEl) {
  answersEl.addEventListener("click", (event) => {
    const button = event.target.closest("button[data-score]");
    if (!button) return;

    score += Number(button.dataset.score);
    currentQuestion += 1;

    if (currentQuestion >= questions.length) {
      showResult();
      return;
    }

    updateQuestion();
  });
}

if (viewSourceButton) {
  viewSourceButton.addEventListener("click", () => {
    source.hidden = false;
    requestAnimationFrame(() => {
      source.querySelector(".reveal").classList.add("is-visible");
      scrollToElement("#source");
    });
  });
}

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("is-visible");
      revealObserver.unobserve(entry.target);
    }
  });
}, {
  threshold: 0.15,
  rootMargin: "0px 0px -10% 0px"
});

document.querySelectorAll(".reveal").forEach((item) => revealObserver.observe(item));

const updateReadouts = () => {
  const now = new Date();
  if (clockEl) {
    clockEl.textContent = now.toLocaleTimeString("en-AU", { hour12: false });
  }
  if (varianceEl) {
    varianceEl.textContent = (12 + Math.random() * 4).toFixed(2);
  }
  if (densityEl) {
    densityEl.textContent = (71 + Math.random() * 8).toFixed(2);
  }

  const channel = String(Math.floor(1000 + Math.random() * 8999));
  const drift = String(Math.floor(10 + Math.random() * 89));
  if (noiseLine) {
    noiseLine.textContent = `WN-${channel} / calm-state drift ${drift}% confirmed`;
  }
};

const renderObservation = () => {
  if (!observationCard) return;

  const observation = observations[currentObservation];
  observationIndex.textContent = `${String(currentObservation + 1).padStart(2, "0")}/${String(observations.length).padStart(2, "0")}`;
  observationId.textContent = observation.id;
  observationLocation.textContent = observation.location;
  observationCopy.textContent = observation.copy;
};

const rotateObservation = () => {
  if (!observationCard) return;

  observationCard.classList.add("is-changing");
  window.setTimeout(() => {
    currentObservation = (currentObservation + 1) % observations.length;
    renderObservation();
    observationCard.classList.remove("is-changing");
  }, 340);
};

const resizeCanvas = () => {
  if (!canvas || !context) return;

  const ratio = window.devicePixelRatio || 1;
  canvas.width = Math.floor(window.innerWidth * ratio);
  canvas.height = Math.floor(window.innerHeight * ratio);
  canvas.style.width = `${window.innerWidth}px`;
  canvas.style.height = `${window.innerHeight}px`;
  context.setTransform(ratio, 0, 0, ratio, 0, 0);

  signalPoints = Array.from({ length: 42 }, () => ({
    x: Math.random() * window.innerWidth,
    y: Math.random() * window.innerHeight,
    speed: 0.12 + Math.random() * 0.36,
    size: 1 + Math.random() * 2,
    label: Math.floor(100 + Math.random() * 900)
  }));
};

const drawSignals = () => {
  if (!canvas || !context) return;

  context.clearRect(0, 0, window.innerWidth, window.innerHeight);
  context.font = "10px IBM Plex Mono, monospace";
  context.textBaseline = "top";

  signalPoints.forEach((point, index) => {
    point.y += point.speed;
    if (point.y > window.innerHeight + 24) {
      point.y = -24;
      point.x = Math.random() * window.innerWidth;
      point.label = Math.floor(100 + Math.random() * 900);
    }

    const alpha = 0.08 + (index % 5) * 0.025;
    context.fillStyle = `rgba(184, 223, 199, ${alpha})`;
    context.fillRect(point.x, point.y, point.size, point.size);

    if (index % 7 === 0) {
      context.fillText(`SIG ${point.label}`, point.x + 8, point.y - 3);
    }
  });

  window.requestAnimationFrame(drawSignals);
};

resizeCanvas();
drawSignals();
updateReadouts();
renderObservation();

window.addEventListener("resize", resizeCanvas);
window.setInterval(updateReadouts, 1800);
window.setInterval(rotateObservation, 3600);
