document.addEventListener('DOMContentLoaded', () => {
    const shareButton = document.getElementById('shareButton');
    
    shareButton.addEventListener('click', async () => {
        const shareData = {
            url: 'https://t.me/BILLTOKEN_Official'
        };
        
        try {
            if(navigator.share) {
                await navigator.share(shareData);
            } else {
                await navigator.clipboard.writeText(shareData.url);
                showDesktopNotification('Ссылка скопирована! <i class="fas fa-check"></i>');
            }
        } catch(err) {
            console.error('Ошибка:', err);
        }
    });

    function showDesktopNotification(text) {
        const notify = document.createElement('div');
        notify.className = 'desktop-notify';
        notify.innerHTML = `
            <div class="notify-content">
                ${text}
            </div>
        `;
        
        document.body.appendChild(notify);
        
        setTimeout(() => {
            notify.remove();
        }, 3000);
    }
});
