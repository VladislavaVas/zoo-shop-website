document.addEventListener('DOMContentLoaded', function() {
    const sliderContainer = document.querySelector('.slider-container');
    const slides = document.querySelectorAll('.slide');
    const dots = document.querySelectorAll('.dot');
    const prevBtn = document.createElement('button');
    const nextBtn = document.createElement('button');
    
    prevBtn.innerHTML = '&lt;';
    nextBtn.innerHTML = '&gt;';
    prevBtn.className = 'slider-btn prev';
    nextBtn.className = 'slider-btn next';
    document.querySelector('.slider').appendChild(prevBtn);
    document.querySelector('.slider').appendChild(nextBtn);
    
    let currentSlide = 0;
    const slideCount = slides.length;
    
    function initSlider() {
        updateSlider();
        
        dots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                currentSlide = index;
                updateSlider();
            });
        });
        
        prevBtn.addEventListener('click', () => {
            currentSlide = (currentSlide - 1 + slideCount) % slideCount;
            updateSlider();
        });
        
        nextBtn.addEventListener('click', () => {
            currentSlide = (currentSlide + 1) % slideCount;
            updateSlider();
        });
    }
    
    function updateSlider() {
        sliderContainer.style.transform = `translateX(-${currentSlide * 100 / slideCount}%)`;
        
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === currentSlide);
        });
    }
    
    initSlider();
    
    const animateOnScroll = function() {
        const animatedElements = document.querySelectorAll('.info-card, .section-title');
        
        const isInViewport = function(element) {
            const rect = element.getBoundingClientRect();
            return (
                rect.top <= (window.innerHeight || document.documentElement.clientHeight) * 0.75
            );
        };
        
        const runAnimation = function() {
            animatedElements.forEach(element => {
                if (isInViewport(element) && !element.classList.contains('animate')) {
                    element.classList.add('animate');
                }
            });
        };
        
        runAnimation();
        
        window.addEventListener('scroll', runAnimation);
    };
    
    animateOnScroll();
});