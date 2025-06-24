document.addEventListener('DOMContentLoaded', function() {
    const socialLinks = document.querySelectorAll('.social-links a');
    socialLinks.forEach(link => {
        if (!link.getAttribute('target')) {
            link.setAttribute('target', '_blank');
            link.setAttribute('rel', 'noopener noreferrer');
        }
    });

    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            clearErrors();
            
            const nameValid = validateName();
            const emailValid = validateEmail();
            const phoneValid = validatePhone();
            const messageValid = validateMessage();
            
            if (nameValid && emailValid && phoneValid && messageValid) {
                alert('Форма успешно отправлена!');
                contactForm.reset();
            }
        });
    }

    initInteractiveMap();

    function validateName() {
        const nameInput = document.getElementById('name');
        const value = nameInput.value.trim();
        
        if (!value) {
            showError(nameInput, 'Пожалуйста, введите ваше имя');
            return false;
        }
        
        if (value.length < 2) {
            showError(nameInput, 'Имя должно содержать минимум 2 символа');
            return false;
        }
        
        return true;
    }
    
    function validateEmail() {
        const emailInput = document.getElementById('email');
        const value = emailInput.value.trim();
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        
        if (!value) {
            showError(emailInput, 'Пожалуйста, введите email');
            return false;
        }
        
        if (!emailRegex.test(value)) {
            showError(emailInput, 'Пожалуйста, введите корректный email');
            return false;
        }
        
        return true;
    }
    
    function validatePhone() {
        const phoneInput = document.getElementById('phone');
        const value = phoneInput.value.trim();
        
        if (value) {
            const phoneRegex = /^\+7\s?\(\d{3}\)\s?\d{3}-\d{2}-\d{2}$/;
            if (!phoneRegex.test(value)) {
                showError(phoneInput, 'Формат: +7 (999) 123-45-67');
                return false;
            }
        }
        
        return true;
    }
    
    function validateMessage() {
        const messageInput = document.getElementById('message');
        const value = messageInput.value.trim();
        
        if (!value) {
            showError(messageInput, 'Пожалуйста, введите ваше сообщение');
            return false;
        }
        
        if (value.length < 10) {
            showError(messageInput, 'Сообщение должно содержать минимум 10 символов');
            return false;
        }
        
        return true;
    }
    
    function showError(input, message) {
        const formGroup = input.closest('.form-group');
        if (!formGroup) return;
        
        const existingError = formGroup.querySelector('.error-message');
        if (existingError) {
            existingError.remove();
        }
        
        const error = document.createElement('div');
        error.className = 'error-message';
        error.textContent = message;
        error.style.color = '#e74c3c';
        error.style.fontSize = '14px';
        error.style.marginTop = '5px';
        
        formGroup.appendChild(error);
        
        input.style.borderColor = '#e74c3c';
    }
    
    function clearErrors() {
        document.querySelectorAll('.error-message').forEach(error => {
            error.remove();
        });
        
        document.querySelectorAll('.form-group input, .form-group textarea').forEach(input => {
            input.style.borderColor = '#ddd';
        });
    }
    
    document.getElementById('name')?.addEventListener('blur', validateName);
    document.getElementById('email')?.addEventListener('blur', validateEmail);
    document.getElementById('phone')?.addEventListener('blur', validatePhone);
    document.getElementById('message')?.addEventListener('blur', validateMessage);

    function initInteractiveMap() {
    if (!document.querySelector('.map-container')) return;

    const mapDiv = document.createElement('div');
    mapDiv.id = 'map';
    mapDiv.style.width = '100%';
    mapDiv.style.height = '400px';
    document.querySelector('.map-container').prepend(mapDiv);

    const script = document.createElement('script');
    script.src = 'https://api-maps.yandex.ru/2.1/?apikey=ваш_api_ключ&lang=ru_RU';
    script.onload = () => ymaps.ready(initYandexMap);
    document.head.appendChild(script);

    function initYandexMap() {
        const map = new ymaps.Map('map', {
            center: [55.753630, 37.620070], 
            zoom: 15,
            controls: ['zoomControl']
        });

        const placemark = new ymaps.Placemark([55.753630, 37.620070], {
            hintContent: 'Наш зоомагазин',
            balloonContent: 'г. Москва, ул. Пушкина, д. 42'
        }, {
            preset: 'islands#darkGoldIcon'
        });

        map.geoObjects.add(placemark);
    }
}
});