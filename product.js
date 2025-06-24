document.addEventListener('DOMContentLoaded', function() {
    function initImageGallery() {
        const mainImage = document.getElementById('main-image');
        const thumbnails = document.querySelectorAll('.thumbnail');
        
        if (!mainImage || thumbnails.length === 0) return;
        
        thumbnails.forEach(thumbnail => {
            thumbnail.addEventListener('click', function() {
                thumbnails.forEach(t => t.classList.remove('active'));
                
                this.classList.add('active');
                
                const imgSrc = this.querySelector('img').src;
                mainImage.src = imgSrc;
                mainImage.alt = this.querySelector('img').alt;
            });
        });
    }
    
    function initTabs() {
        const tabButtons = document.querySelectorAll('.tab-btn');
        const tabPanes = document.querySelectorAll('.tab-pane');
        
        if (tabButtons.length === 0 || tabPanes.length === 0) return;
        
        tabButtons.forEach((button, index) => {
            button.addEventListener('click', function() {
                tabButtons.forEach(btn => btn.classList.remove('active'));
                tabPanes.forEach(pane => pane.classList.remove('active'));
                
                this.classList.add('active');
                tabPanes[index].classList.add('active');
            });
        });
    }

    function initAddToCart() {
        document.querySelector('.add-to-cart-btn')?.addEventListener('click', function() {
            const productName = document.querySelector('.product-title').textContent;
            const productPrice = document.querySelector('.current-price').textContent;
            alert(`Товар "${productName}" (${productPrice}) добавлен в корзину!`);
        });
        
        document.addEventListener('click', function(e) {
            if (e.target.classList.contains('add-to-cart')) {
                const productCard = e.target.closest('.related-product');
                const productName = productCard.querySelector('h3').textContent;
                const productPrice = productCard.querySelector('.price').textContent;
                alert(`Товар "${productName}" (${productPrice}) добавлен в корзину!`);
            }
        });
    }
    
    function initReviews() {
        const reviewForm = document.querySelector('.review-form form');
        const reviewsList = document.querySelector('.reviews-list');
        const showMoreBtn = document.querySelector('.show-more-reviews');
        const reviewsCountElement = document.querySelector('.reviews-count');
        
        if (!reviewForm || !reviewsList) return;
        
        let reviews = JSON.parse(localStorage.getItem('productReviews')) || [];
        
        function updateReviewsCount() {
            if (reviewsCountElement) {
                reviewsCountElement.textContent = `(${reviews.length} отзывов)`;
            }
        }
        
        function displayReviews(limit = 3) {
            if (reviews.length > 0) {
                const existingReviews = reviewsList.querySelectorAll('.review');
                if (existingReviews.length > 3) {
                    for (let i = 3; i < existingReviews.length; i++) {
                        existingReviews[i].remove();
                    }
                }
            }
            
            reviews.slice(0, limit).forEach(review => {
                const reviewElement = createReviewElement(review);
                reviewsList.appendChild(reviewElement);
            });
            
            if (showMoreBtn) {
                showMoreBtn.style.display = reviews.length > limit ? 'block' : 'none';
            }
        }
        
        function createReviewElement(review) {
            const reviewElement = document.createElement('div');
            reviewElement.className = 'review';
            
            let stars = '';
            for (let i = 0; i < 5; i++) {
                stars += i < review.rating ? '★' : '☆';
            }
            
            const formattedDate = new Date(review.date).toLocaleDateString('ru-RU', {
                day: '2-digit',
                month: '2-digit',
                year: 'numeric'
            });
            
            reviewElement.innerHTML = `
                <div class="review-header">
                    <span class="review-author">${review.name}</span>
                    <span class="review-date">${formattedDate}</span>
                    <span class="review-rating">${stars}</span>
                </div>
                <div class="review-content">
                    <p>${review.text}</p>
                </div>
            `;
            
            return reviewElement;
        }
        
        reviewForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const name = document.getElementById('review-name').value.trim();
            const rating = parseInt(document.getElementById('review-rating').value);
            const text = document.getElementById('review-text').value.trim();
            
            if (!name || !text) {
                alert('Пожалуйста, заполните все обязательные поля');
                return;
            }
            
            const newReview = {
                name,
                rating,
                text,
                date: new Date().toISOString()
            };
            
            reviews.unshift(newReview); 
            
            localStorage.setItem('productReviews', JSON.stringify(reviews));
            
            displayReviews();
            updateReviewsCount();
            
            this.reset();
            
            alert('Спасибо за ваш отзыв!');
        });
        
        if (showMoreBtn) {
            showMoreBtn.addEventListener('click', function() {
                const currentReviews = reviewsList.querySelectorAll('.review').length;
                displayReviews(currentReviews + 3);
            });
        }
        
        updateReviewsCount();
        displayReviews();
    }
    
    function initQuantitySelector() {
        const minusBtns = document.querySelectorAll('.quantity-btn.minus');
        const plusBtns = document.querySelectorAll('.quantity-btn.plus');
        const quantityInputs = document.querySelectorAll('.quantity-input');
        
        minusBtns.forEach((btn, index) => {
            btn.addEventListener('click', function() {
                const input = quantityInputs[index];
                let value = parseInt(input.value) || 1;
                if (value > 1) {
                    input.value = value - 1;
                }
            });
        });
        
        plusBtns.forEach((btn, index) => {
            btn.addEventListener('click', function() {
                const input = quantityInputs[index];
                let value = parseInt(input.value) || 1;
                const max = parseInt(input.max) || 10;
                if (value < max) {
                    input.value = value + 1;
                }
            });
        });
    }

    initImageGallery();
    initTabs();
    initAddToCart();
    initReviews();
    initQuantitySelector();
});