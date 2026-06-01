document.addEventListener("DOMContentLoaded", () => {
    const body = document.body;

    const isFinePointer = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const cursorOrb = document.querySelector(".cursor-orb");
    const cover = document.querySelector(".cover");
    const mobileMenuButton = document.querySelector(".mobile-menu-button");
    const mainNav = document.querySelector(".main-nav");

    const loveLines = [
        "💖 +1 Love",
        "💖 Someone appreciates you",
        "💖 Certified lover detected",
        "💖 wholesome click",
        "💖 universe choosing light",
        "💖 u too!",
        "💖 tinder?",
        "💖 TU TU TU TURU, MAX...",
        "💖 LET'S GO GREMIO",
        "💖 It's the boys, não adianta",
        "💖 keep trying"
    ];

    const cocoLines = [
        "💩 +1 Coco",
        "💩 Emotional damage logged",
        "💩 Bro chose violence",
        "💩 Why would you do that?",
        "💩 chaos energy detected",
        "💩 you or me?",
        "💩 great choice",
        "💩 GONNA CRY?",
        "💩 JUST INSPECT THE PAGE IF U WANT ALL PHRASES"
    ];

    // =========================
    // CUSTOM CURSOR + HERO LIGHT
    // Desktop/fine-pointer only
    // =========================

    if (isFinePointer) {
        document.addEventListener("mousemove", (event) => {
            if (cursorOrb) {
                cursorOrb.classList.add("is-active");
                cursorOrb.style.left = `${event.clientX}px`;
                cursorOrb.style.top = `${event.clientY}px`;
            }

            if (cover) {
                const rect = cover.getBoundingClientRect();
                const x = event.clientX - rect.left;
                const y = event.clientY - rect.top;

                cover.style.setProperty("--mx", `${x}px`);
                cover.style.setProperty("--my", `${y}px`);
            }
        });

        document
            .querySelectorAll("a, button, .portfolio-card, .portal-card, .model-card, .life-card, .simple-timeline-item")
            .forEach((element) => {
                element.addEventListener("mouseenter", () => cursorOrb?.classList.add("is-hovering"));
                element.addEventListener("mouseleave", () => cursorOrb?.classList.remove("is-hovering"));
            });
    } else if (cursorOrb) {
        cursorOrb.remove();
    }

    // =========================
    // MOBILE MENU
    // =========================

    if (mobileMenuButton && mainNav) {
        const closeMobileMenu = () => {
            body.classList.remove("menu-open");
            mobileMenuButton.setAttribute("aria-expanded", "false");
        };

        mobileMenuButton.addEventListener("click", (event) => {
            event.stopPropagation();

            const isOpen = body.classList.toggle("menu-open");
            mobileMenuButton.setAttribute("aria-expanded", String(isOpen));
        });

        mainNav.addEventListener("click", (event) => {
            event.stopPropagation();
        });

        mainNav.querySelectorAll("a").forEach((link) => {
            link.addEventListener("click", closeMobileMenu);
        });

        document.addEventListener("click", () => {
            if (!body.classList.contains("menu-open")) return;
            if (!window.matchMedia("(max-width: 930px)").matches) return;

            closeMobileMenu();
        });

        window.addEventListener("resize", () => {
            if (!window.matchMedia("(max-width: 930px)").matches) {
                closeMobileMenu();
            }
        });

        document.addEventListener("keydown", (event) => {
            if (event.key === "Escape") {
                closeMobileMenu();
            }
        });
    }

    // =========================
    // REVEAL ON SCROLL
    // =========================

    const revealElements = document.querySelectorAll("[data-reveal]");

    if ("IntersectionObserver" in window && !prefersReducedMotion) {
        const revealObserver = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (!entry.isIntersecting) return;

                entry.target.classList.add("is-visible");
                revealObserver.unobserve(entry.target);
            });
        }, { threshold: 0.12 });

        revealElements.forEach((element) => revealObserver.observe(element));
    } else {
        revealElements.forEach((element) => element.classList.add("is-visible"));
    }

    // =========================
    // ABOUT CARD JOKES
    // =========================

    function spawnFloatMsg(button, text) {
        if (!button) return;

        const msg = document.createElement("div");
        msg.className = "float-msg";
        msg.textContent = text;

        button.style.position = "relative";
        button.appendChild(msg);

        setTimeout(() => msg.remove(), 1600);
    }

    function smallPop(button) {
        if (!button || prefersReducedMotion) return;

        button.style.transition = "transform 0.12s";
        button.style.transform = "scale(1.15) rotate(-3deg)";

        setTimeout(() => {
            button.style.transform = "";
        }, 140);
    }

    const loveBtn = document.querySelector(".about-hover-card .btn:nth-child(1)");
    const cocoBtn = document.querySelector(".about-hover-card .btn:nth-child(2)");

    loveBtn?.addEventListener("click", () => {
        const line = loveLines[Math.floor(Math.random() * loveLines.length)];
        spawnFloatMsg(loveBtn, line);
        smallPop(loveBtn);
    });

    cocoBtn?.addEventListener("click", () => {
        const line = cocoLines[Math.floor(Math.random() * cocoLines.length)];
        spawnFloatMsg(cocoBtn, line);
        smallPop(cocoBtn);
    });

    // =========================
    // CLICK SPARKS
    // =========================

    function createSpark(x, y) {
        if (prefersReducedMotion) return;

        const colors = ["#ffe45c", "#ff3b30", "#43d17a", "#9b5cff", "#2563ff"];
        const sparkCount = 8;

        for (let i = 0; i < sparkCount; i += 1) {
            const spark = document.createElement("span");
            const angle = (Math.PI * 2 * i) / sparkCount;
            const distance = 28 + Math.random() * 38;

            spark.className = "spark";
            spark.style.left = `${x}px`;
            spark.style.top = `${y}px`;
            spark.style.setProperty("--dx", `${Math.cos(angle) * distance}px`);
            spark.style.setProperty("--dy", `${Math.sin(angle) * distance}px`);
            spark.style.background = colors[i % colors.length];

            document.body.appendChild(spark);

            setTimeout(() => spark.remove(), 720);
        }
    }

    document
        .querySelectorAll(".sparkable, .pill-button, .portal-card, .project-link, .model-card, .life-card, .simple-timeline-item")
        .forEach((element) => {
            element.addEventListener("pointerdown", (event) => {
                createSpark(event.clientX, event.clientY);
            });
        });

    // =========================
    // PORTAL FILTERING
    // =========================

    const portalMap = document.querySelector(".portal-map");
    const portalButtons = document.querySelectorAll(".portal-card[data-portal]");
    const portalSections = Array.from(document.querySelectorAll("[data-portal-section]"));
    const portfolioVideos = Array.from(document.querySelectorAll("video.card-scene-video"));

    const portalLabels = {
        all: "all creative worlds",
        vr: "VR experiences",
        games: "game worlds",
        web: "web interfaces",
        models: "3D model vault",
        life: "personal universe"
    };

    let currentPortfolioVideo = null;

    function pausePortfolioVideo(video) {
        if (!video || video.paused) return;

        video.pause();

        if (currentPortfolioVideo === video) {
            currentPortfolioVideo = null;
        }
    }

    function pauseVideosInsideHiddenSections() {
        portfolioVideos.forEach((video) => {
            const hiddenSection = video.closest("[data-portal-section].is-hidden");

            if (hiddenSection) {
                pausePortfolioVideo(video);
            }
        });
    }

    function setActivePortal(filter) {
        portalButtons.forEach((button) => {
            button.classList.toggle("active", button.dataset.portal === filter);
        });
    }

    function applyPortalFilter(filter = "all", shouldScroll = false) {
        const normalizedFilter = filter || "all";

        portalSections.forEach((section) => {
            const shouldShow = normalizedFilter === "all" || section.dataset.portalSection === normalizedFilter;

            section.classList.toggle("is-hidden", !shouldShow);
            section.classList.toggle("is-focused", shouldShow && normalizedFilter !== "all");
        });

        pauseVideosInsideHiddenSections();
        setActivePortal(normalizedFilter);
        portalMap?.classList.toggle("is-filtered", normalizedFilter !== "all");

        if (shouldScroll) {
            const scrollTarget = normalizedFilter === "all"
                ? portalMap
                : document.querySelector(`[data-portal-section="${normalizedFilter}"]`);

            scrollTarget?.scrollIntoView({ behavior: "smooth", block: "start" });
        }
    }

    portalButtons.forEach((button) => {
        button.addEventListener("click", () => {
            applyPortalFilter(button.dataset.portal, true);
        });
    });

    document.querySelectorAll('.main-nav a[href^="#"]').forEach((link) => {
        link.addEventListener("click", () => {
            const target = link.getAttribute("href")?.replace("#", "");

            if (target && portalLabels[target]) {
                applyPortalFilter(target, false);
            }
        });
    });

    // =========================
    // CARD TILT
    // Desktop/fine-pointer only
    // =========================

    if (isFinePointer && !prefersReducedMotion) {
        const cards = Array.from(document.querySelectorAll(".portfolio-card, .model-card"));

        cards.forEach((card) => {
            card.addEventListener("mousemove", (event) => {
                const rect = card.getBoundingClientRect();
                const x = event.clientX - rect.left;
                const y = event.clientY - rect.top;
                const rotateY = ((x / rect.width) - 0.5) * 9;
                const rotateX = ((y / rect.height) - 0.5) * -9;

                card.style.transform = `perspective(900px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;
            });

            card.addEventListener("mouseleave", () => {
                card.style.transform = "";
            });
        });
    }

    // =========================
    // VIDEO PLAYBACK CONTROLLER
    // One portfolio video playing at a time + pause outside viewport
    // =========================

    function setCurrentPortfolioVideo(video) {
        if (!video) return;

        if (currentPortfolioVideo && currentPortfolioVideo !== video) {
            pausePortfolioVideo(currentPortfolioVideo);
        }

        currentPortfolioVideo = video;
    }

    portfolioVideos.forEach((video) => {
        video.removeAttribute("autoplay");

        video.addEventListener("play", () => {
            setCurrentPortfolioVideo(video);
        });

        video.addEventListener("pause", () => {
            if (currentPortfolioVideo === video) {
                currentPortfolioVideo = null;
            }
        });
    });

    if ("IntersectionObserver" in window) {
        const videoObserver = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                const video = entry.target;
                const isVisibleEnough = entry.isIntersecting && entry.intersectionRatio >= 0.25;

                if (!isVisibleEnough) {
                    pausePortfolioVideo(video);
                }
            });
        }, {
            threshold: [0, 0.25, 0.5, 1]
        });

        portfolioVideos.forEach((video) => {
            videoObserver.observe(video);
        });
    }

    // =========================
    // SOFTWARE MARQUEE SAFETY
    // Duplicate content once for seamless CSS scrolling if needed
    // =========================

    const softwareTrack = document.querySelector(".software-track");

    if (softwareTrack && softwareTrack.children.length > 0 && !softwareTrack.dataset.cloned) {
        const items = Array.from(softwareTrack.children);

        items.forEach((item) => {
            const clone = item.cloneNode(true);
            clone.setAttribute("aria-hidden", "true");
            softwareTrack.appendChild(clone);
        });

        softwareTrack.dataset.cloned = "true";
    }

    // =========================
    // FOOTER YEAR
    // =========================

    const footerYear = document.getElementById("footerYear");

    if (footerYear) {
        footerYear.textContent = new Date().getFullYear();
    }
});
