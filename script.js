// Объект с данными о сайте
const siteData = {
    name: "УмныеСоветы",
    visitorCount: 0,
    topHacks: [
        {
            id: 1,
            title: "Лимон против накипи",
            description: "Просто прокипятите в чайнике дольки лимона - и накипь исчезнет без химии!",
            category: "home",
            likes: 245
        },
        {
            id: 2,
            title: "Хранение документов",
            description: "Фотографируйте все важные документы и сохраняйте в облаке - доступно всегда.",
            category: "tech",
            likes: 189
        },
        {
            id: 3,
            title: "Быстрое охлаждение",
            description: "Заверните бутылку в мокрое полотенце и положите в морозилку на 15 минут.",
            category: "food",
            likes: 176
        },
        {
            id: 4,
            title: "Экономия батареи",
            description: "Режим 'В самолёте' заряжает телефон быстрее на 30%.",
            category: "tech",
            likes: 312
        },
        {
            id: 5,
            title: "Свежие овощи",
            description: "Храните зелень в банке с водой - сохранится в 3 раза дольше.",
            category: "food",
            likes: 134
        }
    ],
    incrementVisitorCount: function() {
        this.visitorCount = Math.floor(Math.random() * 100) + 50; // Рандомное число для демонстрации
        document.getElementById('visit-counter').textContent = 
            `Посетителей сегодня: ${this.visitorCount}`;
    },
    getTopHack: function() {
        return this.topHacks.sort((a, b) => b.likes - a.likes)[0];
    }
};

// Функция для обновления времени
function updateTime() {
    const now = new Date();
    const timeString = now.toLocaleTimeString('ru-RU', {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
    });
    const dateString = now.toLocaleDateString('ru-RU', {
        weekday: 'long',
        day: 'numeric',
        month: 'long',
        year: 'numeric'
    });
    document.getElementById('current-time').textContent = 
        `${dateString}, ${timeString}`;
}

// Функция для мобильного меню
function setupMobileMenu() {
    const menuToggle = document.querySelector('.menu-toggle');
    const nav = document.querySelector('.nav');
    
    if (menuToggle && nav) {
        menuToggle.addEventListener('click', () => {
            nav.classList.toggle('active');
            menuToggle.innerHTML = nav.classList.contains('active') ? 
                '<i class="fas fa-times"></i>' : '<i class="fas fa-bars"></i>';
        });
    }
}

// Функция для плавной прокрутки
function setupSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
                
                // Закрываем мобильное меню, если оно открыто
                const nav = document.querySelector('.nav');
                if (nav && nav.classList.contains('active')) {
                    nav.classList.remove('active');
                    document.querySelector('.menu-toggle').innerHTML = '<i class="fas fa-bars"></i>';
                }
            }
        });
    });
}

// Инициализация при загрузке страницы
document.addEventListener('DOMContentLoaded', function() {
    // Обновляем время и устанавливаем интервал
    if (document.getElementById('current-time')) {
        updateTime();
        setInterval(updateTime, 1000);
    }
    
    // Кнопка обновления времени
    if (document.getElementById('refresh-time')) {
        document.getElementById('refresh-time').addEventListener('click', updateTime);
    }
    
    // Главная кнопка CTA
    if (document.getElementById('cta-button')) {
        document.getElementById('cta-button').addEventListener('click', function() {
            alert('Добро пожаловать в мир умных советов! Переходите в раздел статей.');
            window.location.href = 'articles.html';
        });
    }
    
    // Счетчик посетителей
    siteData.incrementVisitorCount();
    
    // Мобильное меню
    setupMobileMenu();
    
    // Плавная прокрутка
    setupSmoothScrolling();
    
    // Показываем самый популярный лайфхак
    if (document.getElementById('top-hack')) {
        const topHack = siteData.getTopHack();
        document.getElementById('top-hack-title').textContent = topHack.title;
        document.getElementById('top-hack-desc').textContent = topHack.description;
    }
});
// Функция для обработки формы обратной связи
function setupContactForm() {
    const form = document.getElementById('feedback-form');
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Получаем данные формы
            const formData = new FormData(form);
            const data = {
                name: formData.get('name'),
                email: formData.get('email'),
                subject: formData.get('subject'),
                message: formData.get('message')
            };
            
            // Здесь можно добавить AJAX-запрос для отправки данных
            console.log('Форма отправлена:', data);
            
            // Показываем сообщение об успехе
            alert('Спасибо за ваше сообщение! Мы свяжемся с вами в ближайшее время.');
            form.reset();
        });
    }
}

// Функция для фильтрации статей
function filterArticles() {
    const filter = document.getElementById('category-filter');
    if (filter) {
        filter.addEventListener('change', function() {
            const category = this.value;
            const articles = document.querySelectorAll('.article-card');
            
