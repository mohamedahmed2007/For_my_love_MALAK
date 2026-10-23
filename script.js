document.addEventListener("DOMContentLoaded", function () {
  "use strict";

  /* =========================================================
     عناصر أساسية
  ========================================================= */
  const body = document.body;
  const lockScreen = document.getElementById("lockScreen");
  const lockForm = document.getElementById("lockForm");
  const passwordInput = document.getElementById("passwordInput");
  const lockMessage = document.getElementById("lockMessage");
  const particlesContainer = document.getElementById("particles");

  const progressFill = document.getElementById("progressFill");
  const themeToggle = document.getElementById("themeToggle");
  const themeIcon = document.getElementById("themeIcon");

  const startBtn = document.getElementById("startBtn");
  const coffeeFill = document.getElementById("coffeeFill");
  const letterSection = document.getElementById("letterSection");
  const letterText = document.getElementById("letterText");

  const cardsContainer = document.getElementById("cards");

  const envelope = document.getElementById("envelope");
  const envHint = document.getElementById("envHint");

  const randomMessage = document.getElementById("randomMessage");
  const randomBtn = document.getElementById("randomBtn");

  const coffeeBtn = document.getElementById("coffeeBtn");
  const miniFill = document.getElementById("miniFill");
  const coffeeMsg = document.getElementById("coffeeMsg");

  const endingSection = document.getElementById("endingSection");

  /* =========================================================
     كلمة السر
  ========================================================= */
  const ACCEPTED_PASSWORDS = ["malak", "ملك"];
  const gentleWrongMessages = [
    "حاولي تاني يا ملك… أنا واثق إنك هتعرفيها ☕",
    "مش هي، بس لسه عندك فرصة… فكري في اسمك ❤️",
    "كلمة السر قريبة منك أوي… جربي تاني يا ملوكتي",
    "معلش، كلنا بننسى أحيانًا. جربي كلمة السر تاني ☕"
  ];

  let wrongIndex = 0;

  function showGentleWrong() {
    lockMessage.textContent = gentleWrongMessages[wrongIndex % gentleWrongMessages.length];
    wrongIndex += 1;

    lockMessage.animate(
      [
        { opacity: 0, transform: "translateY(6px)" },
        { opacity: 1, transform: "translateY(0)" }
      ],
      { duration: 350, easing: "ease-out" }
    );

    passwordInput.value = "";
    passwordInput.focus();
  }

  function unlockExperience() {
    lockMessage.textContent = "أهلًا بيكي يا ملك ❤️";
    lockMessage.style.color = "var(--caramel)";

    setTimeout(function () {
      body.classList.remove("locked");
      lockScreen.classList.add("hidden");

      setTimeout(function () {
        lockScreen.style.display = "none";
        revealVisibleSections();
      }, 950);

      // تشغيل مراقب التمرير بعد الدخول
      startScrollObserver();
      updateProgress();
    }, 450);
  }

  lockForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const value = passwordInput.value.trim().toLowerCase();

    if (ACCEPTED_PASSWORDS.indexOf(value) !== -1) {
      unlockExperience();
    } else {
      showGentleWrong();
    }
  });

  /* =========================================================
     الجزيئات في شاشة القفل
  ========================================================= */
  function createParticles() {
    const count = 26;

    for (let i = 0; i < count; i += 1) {
      const span = document.createElement("span");
      const size = Math.random() * 4 + 2;
      const left = Math.random() * 100;
      const top = Math.random() * 100;
      const duration = Math.random() * 6 + 6;
      const delay = Math.random() * 6;

      span.style.width = size + "px";
      span.style.height = size + "px";
      span.style.left = left + "%";
      span.style.top = top + "%";
      span.style.animationDuration = duration + "s";
      span.style.animationDelay = delay + "s";
      span.style.opacity = String(Math.random() * 0.5 + 0.2);

      particlesContainer.appendChild(span);
    }
  }

  createParticles();

  /* =========================================================
     الوضع الليلي / الصباحي
  ========================================================= */
  themeToggle.addEventListener("click", function () {
    body.classList.toggle("day");

    if (body.classList.contains("day")) {
      themeIcon.textContent = "☀";
    } else {
      themeIcon.textContent = "☾";
    }
  });

  /* =========================================================
     شريط التقدم
  ========================================================= */
  function updateProgress() {
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollY = window.scrollY || window.pageYOffset;
    const percent = docHeight > 0 ? (scrollY / docHeight) * 100 : 0;
    progressFill.style.width = Math.min(100, Math.max(0, percent)) + "%";
  }

  window.addEventListener("scroll", updateProgress, { passive: true });

  /* =========================================================
     مراقب ظهور الأقسام
  ========================================================= */
  let observer = null;

  function startScrollObserver() {
    const revealElements = document.querySelectorAll("[data-reveal]");

    if (!("IntersectionObserver" in window)) {
      revealElements.forEach(function (el) {
        el.classList.add("revealed");
      });
      return;
    }

    observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("revealed");

            if (entry.target === endingSection) {
              createEndingHearts();
            }

            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );

    revealElements.forEach(function (el) {
      observer.observe(el);
    });
  }

  function revealVisibleSections() {
    const revealElements = document.querySelectorAll("[data-reveal]");

    revealElements.forEach(function (el) {
      const rect = el.getBoundingClientRect();

      if (rect.top < window.innerHeight * 0.9) {
        el.classList.add("revealed");
      }
    });
  }

  /* =========================================================
     الرسالة — كتابة تدريجية
  ========================================================= */
  const letterLines = [
    { text: "إلى ملوكتي ❤️", strong: false },
    {
      text:
        "ملك، يمكن مش دايمًا بعرف أعبّر عن كل اللي جوايا، بس فيه حاجة عاوزك تعرفيها كويس…",
      strong: false
    },
    { text: "أنا بحبك.", strong: true },
    {
      text:
        "بحب وجودك في يومي، وبحب إنك شخص ليه مكانة خاصة عندي، وبحب إني أقدر أعمل حاجة بسيطة مخصوص ليكي وأشوفك مبسوطة.",
      strong: false
    },
    {
      text:
        "عملتلك الركن الصغير ده عشان كل تفصيلة فيه تفكرك إن فيه حد بيحب يفرحك، وإن ابتسامتك بالنسبالي حاجة تستاهل أبذل مجهود عشانها.",
      strong: false
    },
    { text: "من قلبي ليكي يا ملك ❤️", strong: false }
  ];

  let letterStarted = false;

  function typeLetter() {
    if (letterStarted) {
      return;
    }

    letterStarted = true;
    letterText.innerHTML = "";

    let lineIndex = 0;

    function typeNextLine() {
      if (lineIndex >= letterLines.length) {
        return;
      }

      const lineData = letterLines[lineIndex];
      const p = document.createElement("p");

      if (lineData.strong) {
        p.classList.add("strong-line");
      }

      letterText.appendChild(p);

      const characters = Array.from(lineData.text);
      let charIndex = 0;

      const typingInterval = setInterval(function () {
        p.textContent += characters[charIndex];
        charIndex += 1;

        if (charIndex >= characters.length) {
          clearInterval(typingInterval);
          lineIndex += 1;

          setTimeout(typeNextLine, 520);
        }
      }, 24);
    }

    setTimeout(typeNextLine, 350);
  }

  startBtn.addEventListener("click", function () {
    // تملئة الفنجان
    coffeeFill.style.height = "86%";

    // الانتقال للرسالة
    setTimeout(function () {
      letterSection.scrollIntoView({ behavior: "smooth", block: "start" });
      letterSection.classList.add("revealed");
      typeLetter();
    }, 500);
  });

  /* =========================================================
     البطاقات
  ========================================================= */
  const cardData = [
    { front: "01", back: "ضحكتك اللي بتغير يومي" },
    { front: "02", back: "طيبة قلبك اللي مالها مثيل" },
    { front: "03", back: "اهتمامك بالتفاصيل الصغيرة" },
    { front: "04", back: "إنك ملك… وبتفضلِ ملك ❤️" },
    { front: "05", back: "وجودك جنبي بيخلّي كل حاجة أحلى" }
  ];

  function buildCards() {
    cardData.forEach(function (item) {
      const card = document.createElement("div");
      card.className = "card";
      card.setAttribute("role", "button");
      card.setAttribute("tabindex", "0");
      card.setAttribute("aria-label", "بطاقة سرية — اضغطي للكشف");

      const inner = document.createElement("div");
      inner.className = "card-inner";

      const front = document.createElement("div");
      front.className = "card-face card-front";
      front.textContent = item.front;

      const back = document.createElement("div");
      back.className = "card-face card-back";
      back.textContent = item.back;

      inner.appendChild(front);
      inner.appendChild(back);
      card.appendChild(inner);
      cardsContainer.appendChild(card);

      function toggleCard() {
        card.classList.toggle("flipped");
      }

      card.addEventListener("click", toggleCard);

      card.addEventListener("keydown", function (event) {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          toggleCard();
        }
      });
    });
  }

  buildCards();

  /* =========================================================
     المظروف
  ========================================================= */
  let envelopeOpen = false;

  function toggleEnvelope() {
    envelopeOpen = !envelopeOpen;
    envelope.classList.toggle("open", envelopeOpen);

    if (envelopeOpen) {
      envHint.textContent = "اضغطي تاني عشان تقفلي الجواب";
    } else {
      envHint.textContent = "اضغطي على المظروف";
    }
  }

  envelope.addEventListener("click", toggleEnvelope);

  envelope.addEventListener("keydown", function (event) {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      toggleEnvelope();
    }
  });

  /* =========================================================
     الرسائل العشوائية
  ========================================================= */
  const randomMessages = [
    "متنسيش إنك غالية",
    "أتمنى يومك يكون حلو زي قلبك",
    "خدي نفس وارتاحي، يا رب يومك يبقى لطيف",
    "إنك ملك… وده أحلى حاجة فيكي",
    "أي حاجة بتعمليها بتبقى أحلى وهي منك",
    "أنا فخور بيكي… ودايمًا هفضل ❤️",
    "لو تعبتي، أنا هنا دايمًا",
    "ابتسامتك أجمل حاجة في اليوم"
  ];

  let lastMessageIndex = -1;

  function showRandomMessage() {
    let newIndex = Math.floor(Math.random() * randomMessages.length);

    if (randomMessages.length > 1 && newIndex === lastMessageIndex) {
      newIndex = (newIndex + 1) % randomMessages.length;
    }

    lastMessageIndex = newIndex;

    randomMessage.style.opacity = "0";

    setTimeout(function () {
      randomMessage.textContent = randomMessages[newIndex];
      randomMessage.style.opacity = "1";
    }, 220);
  }

  randomBtn.addEventListener("click", showRandomMessage);

  /* =========================================================
     فنجان القهوة الصغير
  ========================================================= */
  let coffeeBusy = false;

  coffeeBtn.addEventListener("click", function () {
    if (coffeeBusy) {
      return;
    }

    coffeeBusy = true;
    coffeeMsg.textContent = "";
    miniFill.style.height = "0%";

    // إعادة التهيئة ثم الصب
    requestAnimationFrame(function () {
      requestAnimationFrame(function () {
        miniFill.style.height = "82%";
      });
    });

    setTimeout(function () {
      coffeeMsg.textContent = "اتفضلي يا ملوكتي، القهوة على حساب الحب ☕";
      coffeeBusy = false;
    }, 1300);
  });

  /* =========================================================
     قلوب النهاية
  ========================================================= */
  function createEndingHearts() {
    if (endingSection.dataset.heartsDone === "1") {
      return;
    }

    endingSection.dataset.heartsDone = "1";
    endingSection.style.position = "relative";

    for (let i = 0; i < 16; i += 1) {
      const heart = document.createElement("span");
      heart.className = "heart-particle";
      heart.textContent = "❤";

      const rect = endingSection.getBoundingClientRect();
      const x = Math.random() * Math.max(rect.width, 200);
      const y = Math.random() * 120;

      heart.style.left = x + "px";
      heart.style.top = y + "px";
      heart.style.animationDelay = Math.random() * 1.4 + "s";
      heart.style.fontSize = Math.random() * 0.9 + 0.7 + "rem";

      endingSection.appendChild(heart);

      setTimeout(function () {
        heart.remove();
      }, 4200);
    }
  }

  /* =========================================================
     أحداث إضافية
  ========================================================= */
  window.addEventListener("load", function () {
    updateProgress();

    if (!body.classList.contains("locked")) {
      startScrollObserver();
    }
  });

  // متابعة تغيير حجم الشاشة
  window.addEventListener("resize", updateProgress, { passive: true });
});