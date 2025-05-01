document.addEventListener('DOMContentLoaded', function() {
    // Слайдер новостей
    const sliderContainer = document.querySelector('.news-slides-container');
    const slides = document.querySelectorAll('.news-slide');
    const dots = document.querySelectorAll('.dot');
    const prevBtn = document.querySelector('.prev');
    const nextBtn = document.querySelector('.next');
    
    let currentIndex = 0;
    const slideCount = slides.length;
    let isAnimating = false;
    
    function updateSlider() {
        if (isAnimating) return;
        isAnimating = true;
        
        sliderContainer.style.transition = 'transform 0.5s ease';
        sliderContainer.style.transform = `translateX(-${currentIndex * 100}%)`;
        
        // Обновляем активные точки
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === currentIndex);
        });
        
        setTimeout(() => {
            isAnimating = false;
        }, 500);
    }
    
    function goToSlide(index) {
        currentIndex = (index + slideCount) % slideCount;
        updateSlider();
    }
    
    function nextSlide() {
        goToSlide(currentIndex + 1);
    }
    
    function prevSlide() {
        goToSlide(currentIndex - 1);
    }
    
    // Обработчики событий
    nextBtn.addEventListener('click', function(e) {
        e.stopPropagation();
        nextSlide();
    });
    
    prevBtn.addEventListener('click', function(e) {
        e.stopPropagation();
        prevSlide();
    });
    
    // Обработчики для точек
    dots.forEach((dot, index) => {
        dot.addEventListener('click', function(e) {
            e.stopPropagation();
            goToSlide(index);
        });
    });
    
    // Свайпы для мобильных
    let touchStartX = 0;
    let touchEndX = 0;
    
    sliderContainer.addEventListener('touchstart', function(e) {
        touchStartX = e.changedTouches[0].screenX;
    }, {passive: true});
    
    sliderContainer.addEventListener('touchend', function(e) {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    }, {passive: true});
    
    function handleSwipe() {
        const threshold = 50;
        if (touchEndX < touchStartX - threshold) {
            nextSlide();
        }
        if (touchEndX > touchStartX + threshold) {
            prevSlide();
        }
    }
    
    // Кнопка "Подробнее"
    const readMoreBtns = document.querySelectorAll('.read-more-btn');
    
    readMoreBtns.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.stopPropagation();
            
            const newsText = this.closest('.news-text');
            const shortText = newsText.querySelector('.short-text');
            const fullText = newsText.querySelector('.full-text');
            
            if (fullText.style.display === 'none') {
                fullText.style.display = 'block';
                shortText.style.display = 'none';
                this.textContent = 'Свернуть';
                
                // Прокрутка к раскрытому контенту на мобильных
                if (window.innerWidth < 768) {
                    setTimeout(() => {
                        newsText.scrollIntoView({behavior: 'smooth', block: 'nearest'});
                    }, 100);
                }
            } else {
                fullText.style.display = 'none';
                shortText.style.display = 'block';
                this.textContent = 'Подробнее';
            }
        });
    });
    
    // Обработчик кнопки "Пригласить"
    const shareButton = document.getElementById('shareButton');
    
    shareButton.addEventListener('click', function(e) {
        e.stopPropagation();
        const inviteLink = 'https://t.me/BILLTOKEN_Official';
        
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
    
    // Функция для копирования в буфер обмена
    function copyToClipboard(text) {
        navigator.clipboard.writeText(text).then(() => {
            showNotification('Ссылка скопирована!');
        }).catch(err => {
            console.error('Ошибка копирования:', err);
            showNotification('Ошибка копирования', true);
        });
    }
    
    // Функция показа уведомлений
    function showNotification(message, isError = false) {
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
    }
    
    // Автопрокрутка слайдера (опционально)
    // let slideInterval = setInterval(nextSlide, 5000);
    
    // Остановка автопрокрутки при наведении
    // sliderContainer.addEventListener('mouseenter', () => clearInterval(slideInterval));
    // sliderContainer.addEventListener('mouseleave', () => {
    //     slideInterval = setInterval(nextSlide, 5000);
    // });
});
