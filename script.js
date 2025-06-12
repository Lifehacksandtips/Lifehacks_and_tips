// Объект с советами
const tips = {
    productivity: [
        "Используй технику Помодоро: 25 минут работы, 5 минут отдыха.",
        "Составляй список задач на день с вечера.",
        "Начинай день с самой сложной задачи.",
        "Используй приложения для блокировки отвлекающих сайтов.",
        "Делай короткие перерывы каждые 45-60 минут."
    ],
    finance: [
        "Откладывай 10% от каждого дохода.",
        "Веди бюджет и записывай все расходы.",
        "Перед покупкой задавай вопрос: 'Это потребность или желание?'",
        "Используй кэшбэк-сервисы для возврата части денег.",
        "Инвестируй в свое образование - это лучшая инвестиция."
    ],
    health: [
        "Пей стакан воды сразу после пробуждения.",
        "Спи не менее 7-8 часов в сутки.",
        "Делай растяжку каждое утро.",
        "Гуляй на свежем воздухе минимум 30 минут в день.",
        "Практикуй глубокое дыхание для снижения стресса."
    ],
    creativity: [
        "Веди дневник идей.",
        "Пробуй новые маршруты и места для вдохновения.",
        "Читай книги вне своей обычной тематики.",
        "Задавай себе вопрос 'А что, если...' для генерации идей.",
        "Ограничивай себя в инструментах - это стимулирует креативность."
    ],
    random: [
        "Храни чеки в одном месте - пригодится для гарантии.",
        "Фотографируй парковочное место, чтобы не забыть, где оставил авто.",
        "Используй резинку для волос, чтобы открыть тугую крышку.",
        "Закладывай вещи на завтра с вечера - утро будет спокойнее.",
        "Держи запасной зонт на работе и в машине."
    ]
};

// Переменные
let currentCategory = 'random';
let onlineUsers = Math.floor(Math.random() * 100) + 50;

// Функция для получения случайного совета
function getRandomTip() {
    const categoryTips = tips[currentCategory];
    const randomIndex = Math.floor(Math.random() * categoryTips.length);
    return categoryTips[randomIndex];
}

// Функция для обновления совета дня
function updateDailyTip() {
    const tipElement = document.getElementById('dailyTip');
    tipElement.innerHTML = `<p>"${getRandomTip()}"</p>`;
}

// Функция для обновления даты и времени
function updateDateTime() {
    const now = new Date();
    const options = { 
        weekday: 'long', 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    };
    document.getElementById('currentDateTime').textContent = now.toLocaleDateString('ru-RU', options);
}

// Функция для обработки смены категории
function changeCategory(category) {
    currentCategory = category;
    updateDailyTip();
}

// Управляющая конструкция (switch) для обработки кнопок
function handleButtonClick(action) {
    switch(action) {
        case 'explore':
            alert('Давай исследовать мир лайфхаков вместе!');
            break;
        case 'refresh':
            updateDailyTip();
            break;
        case 'menu':
            document.getElementById('navList').classList.toggle('active');
            break;
        default:
            console.log('Действие не распознано');
    }
}

// Обработчики событий
document.addEventListener('DOMContentLoaded', function() {
    // Инициализация
    updateDailyTip();
    updateDateTime();
    document.getElementById('onlineUsers').textContent = onlineUsers;
    
    // Обработчики кликов
    document.getElementById('exploreBtn').addEventListener('click', function() {
        handleButtonClick('explore');
    });
    
    document.getElementById('refreshTip').addEventListener('click', function() {
        handleButtonClick('refresh');
    });
    
    document.getElementById('mobileMenuBtn').addEventListener('click', function() {
        handleButtonClick('menu');
    });
    
    // Обновляем количество пользователей каждую минуту
    setInterval(function() {
        onlineUsers += Math.floor(Math.random() * 5) - 2;
        document.getElementById('onlineUsers').textContent = Math.max(onlineUsers, 50);
    }, 60000);
    
    // Обновляем время каждую минуту
    setInterval(updateDateTime, 60000);
});
// Добавьте в DOMContentLoaded:
document.querySelectorAll('.nav-list a').forEach(link => {
    link.addEventListener('click', () => {
        document.getElementById('navList').classList.remove('active');
    });
});
// Закрывать меню при клике вне его области
document.addEventListener('click', (e) => {
    const navList = document.getElementById('navList');
    if (!e.target.closest('.nav') && navList.classList.contains('active')) {
        navList.classList.remove('active');
    }
});
