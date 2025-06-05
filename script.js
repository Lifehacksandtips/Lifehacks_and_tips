// Объект с данными о сайте
const siteData = {
    name: "Лайфхаки и советы",
    visitorCount: 0,
    categories: ["home", "health", "finance"],
    incrementVisitorCount: function() {
        this.visitorCount++;
        document.getElementById('visit-counter').textContent = 
            `Посетителей сегодня: ${this.visitorCount}`;
    }
};

// Переменная для хранения текущей даты
const currentDate = new Date();

// Функция для обновления времени на странице
function updateTime() {
    const now = new Date();
    const timeString = now.toLocaleTimeString('ru-RU', {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
    });
    const dateString = now.toLocaleDateString('ru-RU', {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
    });
    document.getElementById('current-time').textContent = 
        `${dateString}, ${timeString}`;
}

// Функция для фильтрации статей
function filterArticles() {
    const selectedCategory = document.getElementById('category-filter').value;
    const articles = document.querySelectorAll('.article-card');
    
    articles.forEach(article => {
        if (selectedCategory === 'all' || article.dataset.category === selectedCategory) {
            article.style.display = 'block';
        } else {
            article.style.display = 'none';
        }
    });
}

// Обработчики событий
document.addEventListener('DOMContentLoaded', function() {
    // Управляющая конструкция - проверяем, есть ли элемент на странице
    if (document.getElementById('current-time')) {
        updateTime();
        setInterval(updateTime, 1000);
    }
    
    if (document.getElementById('refresh-time')) {
        document.getElementById('refresh-time').addEventListener('click', updateTime);
    }
    
    if (document.getElementById('cta-button')) {
        document.getElementById('cta-button').addEventListener('click', function() {
            alert('Спасибо за интерес к нашему сайту! Переходите в раздел статей.');
            window.location.href = 'articles.html';
        });
    }
    
    if (document.getElementById('category-filter')) {
        document.getElementById('category-filter').addEventListener('change', filterArticles);
    }
    
    // Увеличиваем счетчик посетителей
    siteData.incrementVisitorCount();
    
    // Обработка кнопок "Читать далее"
    const readMoreButtons = document.querySelectorAll('.read-more');
    readMoreButtons.forEach(button => {
        button.addEventListener('click', function() {
            const articleTitle = this.closest('.article-card').querySelector('h3').textContent;
            alert(`Вы выбрали статью: "${articleTitle}". В полной версии сайта здесь будет переход к статье.`);
        });
    });
});
