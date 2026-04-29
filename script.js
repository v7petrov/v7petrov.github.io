document.addEventListener("DOMContentLoaded", () => {
    const header = document.querySelector(".site-header");
    const navToggle = document.querySelector("[data-nav-toggle]");
    const navPanel = document.querySelector("[data-nav-panel]");
    const navLinks = navPanel ? navPanel.querySelectorAll("a") : [];
    const revealTargets = document.querySelectorAll("[data-reveal]");
    const sectionLinks = document.querySelectorAll('.nav-panel a[href^="#"]');
    const sections = [...document.querySelectorAll("main section[id]")];
    const rotators = document.querySelectorAll("[data-rotating-text]");

    const closeNavigation = () => {
        if (!navToggle || !navPanel) {
            return;
        }

        navToggle.setAttribute("aria-expanded", "false");
        navPanel.classList.remove("is-open");
        document.body.classList.remove("nav-open");
    };

    if (navToggle && navPanel) {
        navToggle.addEventListener("click", () => {
            const isOpen = navToggle.getAttribute("aria-expanded") === "true";
            navToggle.setAttribute("aria-expanded", String(!isOpen));
            navPanel.classList.toggle("is-open", !isOpen);
            document.body.classList.toggle("nav-open", !isOpen);
        });

        navLinks.forEach((link) => {
            link.addEventListener("click", () => {
                closeNavigation();
            });
        });

        window.addEventListener("keydown", (event) => {
            if (event.key === "Escape") {
                closeNavigation();
            }
        });
    }

    const updateHeaderState = () => {
        if (!header) {
            return;
        }

        header.classList.toggle("is-scrolled", window.scrollY > 16);
    };

    updateHeaderState();
    window.addEventListener("scroll", updateHeaderState, { passive: true });

    if (revealTargets.length) {
        if ("IntersectionObserver" in window) {
            const revealObserver = new IntersectionObserver(
                (entries, observer) => {
                    entries.forEach((entry) => {
                        if (entry.isIntersecting) {
                            entry.target.classList.add("is-visible");
                            observer.unobserve(entry.target);
                        }
                    });
                },
                {
                    threshold: 0.18,
                    rootMargin: "0px 0px -8% 0px"
                }
            );

            revealTargets.forEach((target) => revealObserver.observe(target));
        } else {
            revealTargets.forEach((target) => target.classList.add("is-visible"));
        }
    }

    if (sectionLinks.length && sections.length) {
        const setActiveLink = () => {
            let currentId = sections[0].id;

            sections.forEach((section) => {
                const top = section.offsetTop;
                if (window.scrollY >= top - 140) {
                    currentId = section.id;
                }
            });

            sectionLinks.forEach((link) => {
                const isActive = link.getAttribute("href") === `#${currentId}`;
                link.classList.toggle("is-active", isActive);
            });
        };

        setActiveLink();
        window.addEventListener("scroll", setActiveLink, { passive: true });
    }

    rotators.forEach((rotator) => {
        const phrases = rotator.dataset.phrases
            ? rotator.dataset.phrases.split("|").map((phrase) => phrase.trim()).filter(Boolean)
            : [];

        if (phrases.length < 2) {
            return;
        }

        let index = 0;
        rotator.textContent = phrases[index];

        window.setInterval(() => {
            index = (index + 1) % phrases.length;
            rotator.classList.add("is-switching");

            window.setTimeout(() => {
                rotator.textContent = phrases[index];
                rotator.classList.remove("is-switching");
            }, 180);
        }, 3200);
    });
});
