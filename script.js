const navbar = document.querySelector(".navbar");
const menuToggle = document.querySelector(".menu-toggle");
const menuLinks = document.querySelectorAll(".nav-menu a");
const backToTopBtn = document.querySelector(".back-to-top");
const progressBar = document.querySelector(".scroll-progress");
const sections = document.querySelectorAll("#about, #skill, #contact");
const typingTarget = document.querySelector("#typing-role");
const roles = ["UI/UX Enthusiast", "Web Developer Learner", "Informatics Student"];

let roleIndex = 0;
let charIndex = 0;
let isDeleting = false;

const typeRole = () => {
    const currentRole = roles[roleIndex];
    if (!isDeleting) {
        typingTarget.textContent = currentRole.slice(0, charIndex + 1);
        charIndex += 1;
        if (charIndex === currentRole.length) {
            isDeleting = true;
            setTimeout(typeRole, 1200);
            return;
        }
    } else {
        typingTarget.textContent = currentRole.slice(0, charIndex - 1);
        charIndex -= 1;
        if (charIndex === 0) {
            isDeleting = false;
            roleIndex = (roleIndex + 1) % roles.length;
        }
    }
    const speed = isDeleting ? 45 : 85;
    setTimeout(typeRole, speed);
};

typeRole();

menuToggle.addEventListener("click", () => {
    const isOpen = navbar.classList.toggle("is-open");
    menuToggle.setAttribute("aria-expanded", String(isOpen));
});

menuLinks.forEach((link) => {
    link.addEventListener("click", () => {
        navbar.classList.remove("is-open");
        menuToggle.setAttribute("aria-expanded", "false");
    });
});

window.addEventListener("resize", () => {
    if (window.innerWidth > 768) {
        navbar.classList.remove("is-open");
        menuToggle.setAttribute("aria-expanded", "false");
    }
});

const setActiveLink = () => {
    const scrollY = window.scrollY + 130;
    sections.forEach((section) => {
        const top = section.offsetTop;
        const height = section.offsetHeight;
        const id = section.getAttribute("id");
        const link = document.querySelector(`.nav-menu a[href="#${id}"]`);
        if (!link) return;
        if (scrollY >= top && scrollY < top + height) {
            document.querySelectorAll(".nav-menu a").forEach((item) => item.classList.remove("active"));
            link.classList.add("active");
        }
    });
};

const setProgress = () => {
    const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
    const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const percent = scrollHeight > 0 ? (scrollTop / scrollHeight) * 100 : 0;
    progressBar.style.width = `${percent}%`;
    backToTopBtn.classList.toggle("show", scrollTop > 360);
    setActiveLink();
};

window.addEventListener("scroll", setProgress);
setProgress();

backToTopBtn.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
});

const revealElements = document.querySelectorAll(
    ".content, .judul-skill, .skill, .judul-contact, .footer"
);

revealElements.forEach((el) => el.classList.add("reveal"));

const revealObserver = new IntersectionObserver(
    (entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add("visible");
                revealObserver.unobserve(entry.target);
            }
        });
    },
    { threshold: 0.14 }
);

revealElements.forEach((el) => revealObserver.observe(el));
