// Data for dynamic rendering
const skills = [
    { name: 'Java', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg' },
    { name: 'Spring Boot', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/spring/spring-original.svg' },
    { name: 'PostgreSQL', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg' },
    { name: 'MySQL', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg' },
    { name: 'RESTful APIs', logo: 'https://www.vectorlogo.zone/logos/getpostman/getpostman-icon.svg' },
    { name: 'HTML5', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg' },
    { name: 'CSS3', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg' },
    { name: 'JavaScript', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg' },
    { name: 'Docker', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg' },
    { name: 'Git', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg' }
];

const projects = [
    {
        title: 'DevSportsStore',
        description: 'A comprehensive sports equipment e-commerce platform. Features a dynamic product catalog, shopping cart functionality, and a responsive UI.',
        image: 'images/sports-store.jpg',
        link: 'https://voluble-fenglisu-94f4cf.netlify.app/'
    },
    {
        title: 'Core Bank',
        description: 'A robust banking application built with Java. Handles core financial transactions, account management, and secure data processing.',
        image: 'images/banking.jpg',
        link: 'https://github.com/dev1511-patel/CoreBank'
    },
    {
        title: 'Employee Management System',
        description: 'A full-stack solution for managing corporate personnel data, featuring CRUD operations, role-based access, and efficient record tracking.',
        image: 'images/hr-management.jpg',
        link: 'https://github.com/dev1511-patel/Employee-Mangemnet/tree/main'
    }
];

// DOM Elements
const themeBtn = document.getElementById('theme-btn');
const navLinks = document.querySelector('.nav-links');
const skillsGrid = document.getElementById('skills-grid');
const projectsGrid = document.getElementById('projects-grid');
const typewriterText = document.getElementById('typewriter-text');
const contactForm = document.getElementById('contact-form');

// Initialize Portfolio
document.addEventListener('DOMContentLoaded', () => {
    renderSkills();
    renderProjects();
    initTheme();
    startTypewriter();
    initScrollReveal();
    initScrollProgress();
});

// Scroll Progress Bar
function initScrollProgress() {
    const progressBar = document.getElementById('scroll-progress');
    window.addEventListener('scroll', () => {
        const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
        const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (winScroll / height) * 100;
        progressBar.style.width = scrolled + "%";
    });
}

// Render Skills with Stagger Delay
function renderSkills() {
    skillsGrid.innerHTML = skills.map((skill, index) => `
        <div class="skill-card reveal" style="transition-delay: ${index * 0.1}s">
            <div class="skill-icon">
                ${skill.logo ? `<img src="${skill.logo}" alt="${skill.name}" style="width: 50px; height: 50px;">` : `<span style="font-size: 2.5rem;">${skill.icon}</span>`}
            </div>
            <h3>${skill.name}</h3>
        </div>
    `).join('');
}

// Render Projects with Reveal
function renderProjects() {
    projectsGrid.innerHTML = projects.map(project => `
        <div class="project-card reveal">
            <div class="project-img-container">
                <img src="${project.image}" alt="${project.title}" style="width: 100%; height: 300px; object-fit: cover;">
            </div>
            <div class="project-info">
                <h3>${project.title}</h3>
                <p>${project.description}</p>
                <a href="${project.link}" target="_blank" class="btn outline-btn" style="margin-top: 1.5rem; display: inline-block;">View Project</a>
            </div>
        </div>
    `).join('');
}

// Theme Toggle
themeBtn.addEventListener('click', () => {
    const isDark = document.body.classList.toggle('dark-theme');
    document.body.classList.toggle('light-theme');
    themeBtn.textContent = isDark ? '☀️' : '🌙';
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
});

function initTheme() {
    const savedTheme = localStorage.getItem('theme') || 'dark'; // Default to dark
    if (savedTheme === 'light') {
        document.body.classList.replace('dark-theme', 'light-theme');
        themeBtn.textContent = '🌙';
    } else {
        document.body.classList.add('dark-theme');
        themeBtn.textContent = '☀️';
    }
}

// Typing Animation
const phrases = ["I am a Java Developer.", "I build scalable backends.", "I specialize in Microservices.", "I love solving complex problems."];
let phraseIndex = 0;
let charIndex = 0;
let isDeleting = false;

function startTypewriter() {
    const currentPhrase = phrases[phraseIndex];
    const typewriterElement = document.getElementById('typewriter-text');
    if (!typewriterElement) return;

    if (isDeleting) {
        typewriterElement.textContent = currentPhrase.substring(0, charIndex - 1);
        charIndex--;
    } else {
        typewriterElement.textContent = currentPhrase.substring(0, charIndex + 1);
        charIndex++;
    }

    let typeSpeed = isDeleting ? 30 : 60;

    if (!isDeleting && charIndex === currentPhrase.length) {
        typeSpeed = 2500; // Pause at end
        isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        phraseIndex = (phraseIndex + 1) % phrases.length;
        typeSpeed = 500;
    }

    setTimeout(startTypewriter, typeSpeed);
}

// Improved Scroll Reveal Animation
function initScrollReveal() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, observerOptions);

    const observeElements = () => {
        document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
    };

    observeElements();
    setTimeout(observeElements, 100);
}

// Contact Form Handling
contactForm.addEventListener('submit', () => {
    // Let Formspree handle the POST
});

// Smooth Scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
        }
    });
});

