document.addEventListener('DOMContentLoaded', () => {
    const navLinks = document.querySelectorAll('nav ul li a');
    const sections = document.querySelectorAll('section');
    const langToggle = document.getElementById('langToggle');
    let currentLang = 'ru';

    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href').slice(1);
            sections.forEach(section => {
                section.classList.remove('active');
            });
            const targetSection = document.getElementById(targetId);
            targetSection.classList.add('active');
            
            // Сброс и повторное применение анимаций
            const animatedElements = targetSection.querySelectorAll('.skill-item, .project-card, .contact-item, .timeline-item');
            animatedElements.forEach(el => {
                el.style.animation = 'none';
                el.offsetHeight; // Trigger reflow
                el.style.animation = null;
            });

            navLinks.forEach(navLink => {
                navLink.classList.remove('active');
            });
            link.classList.add('active');
            if (targetId === 'projects') {
                animateProjectCards();
            }
        });
    });

    // Инициализация particles.js
    particlesJS('particles', {
        particles: {
            number: { value: 80, density: { enable: true, value_area: 800 } },
            color: { value: '#8A2BE2' },
            shape: { type: 'circle' },
            opacity: { value: 0.5, random: false },
            size: { value: 3, random: true },
            line_linked: { enable: true, distance: 150, color: '#8A2BE2', opacity: 0.4, width: 1 },
            move: { enable: true, speed: 6, direction: 'none', random: false, straight: false, out_mode: 'out', bounce: false }
        },
        interactivity: {
            detect_on: 'canvas',
            events: { onhover: { enable: true, mode: 'repulse' }, onclick: { enable: true, mode: 'push' }, resize: true },
            modes: { repulse: { distance: 100, duration: 0.4 }, push: { particles_nb: 4 } }
        },
        retina_detect: true
    });

    // Обновленная функция для переключения языка
    function toggleLanguage(lang) {
        currentLang = lang;
        
        const translations = {
            ru: {
                info: 'Инфо',
                skills: 'Навыки',
                projects: 'Проекты',
                credits: 'Контакты',
                information: 'Информация'
            },
            en: {
                info: 'Info',
                skills: 'Skills',
                projects: 'Projects',
                credits: 'Contacts',
                information: 'Information'
            }
        };

        document.querySelectorAll('[data-translate]').forEach(element => {
            const key = element.getAttribute('data-translate');
            element.textContent = translations[currentLang][key];
        });

        // Перевод временной шкалы
        if (currentLang === 'en') {
            translateTimelineToEnglish();
        } else {
            restoreOriginalTimeline();
        }
    }

    document.querySelectorAll('.language-icon').forEach(icon => {
        icon.addEventListener('click', () => {
            toggleLanguage(icon.getAttribute('data-lang'));
        });
    });

    // Функция для перевода временной шкалы на английский
    function translateTimelineToEnglish() {
        const englishEvents = [
            { year: '2021', description: 'Beginning of the journey, learning C++ and attempts to create cheats from popular sources for the game Rust' },
            { year: '2022', description: 'Continued learning C++ and the cheat sphere in general. New acquaintances appear that help in mastering C++' },
            { year: 'End of 2022', description: 'Burnout and end of C++ learning' },
            { year: 'Spring 2023', description: 'With renewed vigor, continued language learning and development of the clarity.cc project for the game Rust' },
            { year: 'July 2023', description: 'Release of the clarity.cc project for Rust pirate version. First users and new acquaintances' },
            { year: 'End of July 2023', description: 'Small client base and first money from the project, first videos on YouTube, start of media promotion of the project' },
            { year: 'Early August 2023', description: 'Client base of about 20-40 users, major updates and expansion of C++ coding knowledge base' },
            { year: '2023', description: 'Diligent development and improvement of knowledge in C++, SMM promotion and service sphere' },
            { year: 'Winter 2024', description: 'New major updates, product recodes, large client base, tier-1 product in Rust cheats, one of the best projects visually, recruited staff, circle of media persons, 2k participants in Discord server' },
            { year: 'Spring 2024', description: 'Burnout, weak work on the project' },
            { year: 'Summer 2024', description: 'Project closure for an indefinite period. Start of testing oneself in new languages and other topics' },
            { year: 'August 2024', description: 'Telegram chat-bot for friends, clicker-telegram-bot in beta test' },
            { year: 'September 2024', description: 'Start of product development for CS2 with new forces, development of driver and strong protection system' },
            { year: 'October 2024', description: 'Beta version of clarity.cc product for CS2, new forces and knowledge' },
            { year: 'Future', description: 'More to come...' }
        ];

        updateTimeline(englishEvents);
    }

    // Функция для восстановления оригинальной временной шкалы
    function restoreOriginalTimeline() {
        updateTimeline(events);
    }

    // Обновленная функция для обновления временной шкалы
    function updateTimeline(newEvents) {
        const timeline = document.querySelector('.timeline');
        timeline.innerHTML = '';
        newEvents.forEach((event, index) => {
            const item = document.createElement('div');
            item.classList.add('timeline-item');
            item.classList.add(index % 2 === 0 ? 'left' : 'right');
            item.innerHTML = `
                <div class="timeline-content">
                    <h3>${event.year}</h3>
                    <p>${event.description}</p>
                </div>
            `;
            timeline.appendChild(item);
            // Добавляем небольшую задержку для анимации появления
            setTimeout(() => {
                item.style.opacity = '1';
                item.style.transform = 'translateY(0)';
            }, index * 100);
        });
    }

    // Добавление временной шкалы
    const timeline = document.querySelector('.timeline');
    const events = [
        { year: '2021', description: 'Начало пути, изучение C++ и попытки создания читов из популярных исходников на игру Rust' },
        { year: '2022', description: 'Продолжение изучения C++ и сферы читов в целом. Появляются новые знакомства, которые помогают в освоении C++' },
        { year: 'Конец 2022', description: 'Перегорание и конец изучения C++' },
        { year: 'Весна 2023', description: 'С новыми силами продолжение освоения языка и разработка проекта clarity.cc на игру Rust' },
        { year: 'Июль 2023', description: 'Релиз проекта clarity.cc на Rust пиратку. Первые пользователи и новые знакомства' },
        { year: 'Конец Июля 2023', description: 'Небольшая база клиентов и первые деньги с проекта, первые ролики на YouTube, начало медийного продвижения проекта' },
        { year: 'Начало Августа 2023', description: 'Клиентская база в районе 20-40 пользователей, крупные обновления и расширения базы знаний коддинга на C++' },
        { year: '2023', description: 'Усердная разработка и совершенствование знаний в C++, SMM продвижении и сфере услуг' },
        { year: 'Зима 2024', description: 'Новые крупные обновления, рекоды продукта, большая клиентская база, tier-1 продукт в сфере читов на Rust, один из лучших проектов по визуальной части, набранный staff, круг media лиц, 2k участников в Discord сервере' },
        { year: 'Весна 2024', description: 'Перегорание, слабая работа над проектом' },
        { year: 'Лето 2024', description: 'Закрытие проекта на неопределенный срок. Начало тестирования себя на новых языках и в других тематиках' },
        { year: 'Август 2024', description: 'Chat-bot telegram для круга друзей, clicker-telegram-bot в бета тесте' },
        { year: 'Сентябрь 2024', description: 'Начало разработки продукта на CS2 с новыми силами, разработка драйвера и сильной системы защиты' },
        { year: 'Октябрь 2024', description: 'Бета версия продукта clarity.cc на CS2, новые силы и знания' },
        { year: 'Будущее', description: 'Дальше - больше...' }
    ];

    events.forEach((event, index) => {
        const item = document.createElement('div');
        item.classList.add('timeline-item');
        item.classList.add(index % 2 === 0 ? 'left' : 'right');
        item.innerHTML = `
            <div class="timeline-content">
                <h3>${event.year}</h3>
                <p>${event.description}</p>
            </div>
        `;
        timeline.appendChild(item);
    });

    function animateProjectCards() {
        const projectCards = document.querySelectorAll('.project-card');
        projectCards.forEach((card, index) => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(20px)';
            setTimeout(() => {
                card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            }, index * 100);
        });
    }

    // Вызовите эту функцию при загрузке страницы и при переключении на вкладку проектов
    document.addEventListener('DOMContentLoaded', animateProjectCards);
});
