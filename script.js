document.addEventListener('DOMContentLoaded', () => {
    const shareButton = document.getElementById('shareButton');
    const inputField = document.querySelector('.input-field');
    
    // Анимация при загрузке
    const animateElements = () => {
        const cards = document.querySelectorAll('.card, .opportunity-card');
        cards.forEach((card, index) => {
            card.style.opacity = '0';
            card.style.animation = `fadeIn 0.6s ease-out ${index * 0.2}s forwards`;
        });
    };
    
    // Функция для копирования ссылки
    const copyToClipboard = (text) => {
        navigator.clipboard.writeText(text).then(() => {
            showNotification('Ссылка скопирована!');
        }).catch(err => {
            console.error('Ошибка копирования: ', err);
            showNotification('Ошибка копирования', true);
        });
    };
    
    // Показать уведомление
    const showNotification = (message, isError = false) => {
        const notification = document.createElement('div');
        notification.className = `notification ${isError ? 'error' : ''}`;
        notification.textContent = message;
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.classList.add('show');
        }, 10);
        
        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => {
                notification.remove();
            }, 300);
        }, 3000);
    };
    
    // Обработчик кнопки "Пригласить"
    shareButton.addEventListener('click', () => {
        const inviteLink = 'https://t.me/billtokencrypto';
        
        if (navigator.share) {
            navigator.share({
                title: 'BILL TOKEN',
                text: 'Присоединяйтесь к BILL TOKEN!',
                url: inviteLink
            }).catch(err => {
                console.log('Ошибка при использовании Web Share API:', err);
                copyToClipboard(inviteLink);
            });
        } else {
            copyToClipboard(inviteLink);
        }
    });
    
    // Обработчик поля ввода (если нужно)
    inputField.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            // Проверка кода или другие действия
            showNotification('Код проверяется...');
        }
    });
    
    // Инициализация анимаций
    animateElements();
    
    // Плавный скролл для якорей
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });
});
