document.addEventListener('DOMContentLoaded', function() {
    const searchInput = document.getElementById('search-input');
    const searchBtn = document.querySelector('.search-btn');
    const sortSelect = document.getElementById('sort-select');
    const catalogGrid = document.querySelector('.catalog-grid');
    const paginationContainer = document.querySelector('.pagination');
    const productCards = Array.from(document.querySelectorAll('.product-card'));
    
    const productsPerPage = 4;
    let currentPage = 1;
    let filteredProducts = [...productCards];
    
    updatePagination();
    renderProducts(getProductsForPage(currentPage));
    
    function performSearch() {
        const searchTerm = searchInput.value.trim().toLowerCase();
        
        if (searchTerm === '') {
            filteredProducts = [...productCards];
        } else {
            filteredProducts = productCards.filter(card => {
                const title = card.querySelector('.product-title').textContent.toLowerCase();
                const description = card.querySelector('.product-description').textContent.toLowerCase();
                return title.includes(searchTerm) || description.includes(searchTerm);
            });
        }
        
        currentPage = 1;
        updatePagination();
        renderProducts(getProductsForPage(currentPage));
    }
    
    function sortProducts() {
        const sortValue = sortSelect.value;
        
        filteredProducts.sort((a, b) => {
            switch (sortValue) {
                case 'price-asc':
                    return parseFloat(a.dataset.price) - parseFloat(b.dataset.price);
                case 'price-desc':
                    return parseFloat(b.dataset.price) - parseFloat(a.dataset.price);
                case 'name-asc':
                    return a.querySelector('.product-title').textContent.localeCompare(b.querySelector('.product-title').textContent);
                case 'name-desc':
                    return b.querySelector('.product-title').textContent.localeCompare(a.querySelector('.product-title').textContent);
                case 'rating':
                    return parseFloat(b.dataset.rating) - parseFloat(a.dataset.rating);
                default:
                    return 0;
            }
        });
        
        currentPage = 1;
        updatePagination();
        renderProducts(getProductsForPage(currentPage));
    }
    
    function getProductsForPage(page) {
        const startIndex = (page - 1) * productsPerPage;
        const endIndex = startIndex + productsPerPage;
        return filteredProducts.slice(startIndex, endIndex);
    }
    
    function updatePagination() {
        const pageCount = Math.ceil(filteredProducts.length / productsPerPage);
        paginationContainer.innerHTML = '';
        
        const prevBtn = createPaginationButton('Назад', currentPage > 1, () => {
            if (currentPage > 1) {
                currentPage--;
                renderProducts(getProductsForPage(currentPage));
                updatePagination();
            }
        });
        paginationContainer.appendChild(prevBtn);
        
        for (let i = 1; i <= pageCount; i++) {
            const pageBtn = createPaginationButton(i, true, () => {
                currentPage = i;
                renderProducts(getProductsForPage(currentPage));
                updatePagination();
            });
            
            if (i === currentPage) {
                pageBtn.classList.add('active');
            }
            
            paginationContainer.appendChild(pageBtn);
        }
        
        const nextBtn = createPaginationButton('Вперед', currentPage < pageCount, () => {
            if (currentPage < pageCount) {
                currentPage++;
                renderProducts(getProductsForPage(currentPage));
                updatePagination();
            }
        });
        paginationContainer.appendChild(nextBtn);
    }
    
    function createPaginationButton(text, enabled, onClick) {
        const btn = document.createElement('button');
        btn.className = 'pagination-btn';
        btn.textContent = text;
        
        if (!enabled) {
            btn.disabled = true;
        } else {
            btn.addEventListener('click', onClick);
        }
        
        return btn;
    }
    
    function renderProducts(productsToShow) {
        catalogGrid.innerHTML = '';
        
        if (productsToShow.length === 0) {
            catalogGrid.innerHTML = '<p class="no-results">Товары не найдены</p>';
            return;
        }
        
        productsToShow.forEach(product => {
            catalogGrid.appendChild(product);
        });
    }
    
    searchBtn.addEventListener('click', performSearch);
    searchInput.addEventListener('keyup', function(e) {
        if (e.key === 'Enter') {
            performSearch();
        }
    });
    
    sortSelect.addEventListener('change', sortProducts);
    
    document.addEventListener('click', function(e) {
        if (e.target.classList.contains('add-to-cart')) {
            const productCard = e.target.closest('.product-card');
            const productName = productCard.querySelector('.product-title').textContent;
            const productPrice = productCard.querySelector('.product-price').textContent;
            
            alert(`Товар "${productName}" (${productPrice}) добавлен в корзину!`);
        }
    });
});