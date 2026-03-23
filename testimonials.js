// testimonials.js
document.addEventListener('DOMContentLoaded', function() {
    // Инициализация модального окна
    const modal = document.getElementById('modal');
    const openModalBtn = document.getElementById('open-modal');
    const closeModalBtn = document.getElementById('close-modal');
    const cancelBtn = document.getElementById('cancel');
    
    // Убедимся, что модальное окно изначально скрыто
    modal.classList.add('hidden');
    
    // Обработчики для модального окна
    openModalBtn.addEventListener('click', function(e) {
        e.preventDefault();
        modal.classList.remove('hidden');
    });
    
    closeModalBtn.addEventListener('click', function(e) {
        e.preventDefault();
        modal.classList.add('hidden');
    });
    
    cancelBtn.addEventListener('click', function(e) {
        e.preventDefault();
        modal.classList.add('hidden');
    });
    
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            e.preventDefault();
            modal.classList.add('hidden');
        }
    });

    // Остальная логика (карусель, рейтинг и т.д.)
    const form = document.getElementById('review-form');
    const wrapper = document.getElementById('testimonial-wrapper');
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');
    const stars = document.querySelectorAll('#rating i');
    const ratingValue = document.getElementById('rating-value');
    
    let currentIndex = 0;
    let slides = document.querySelectorAll('.testimonial-slide');
    
    // Рейтинг звездами
    stars.forEach(star => {
        star.addEventListener('click', () => {
            const value = parseInt(star.getAttribute('data-value'));
            ratingValue.value = value;
            
            stars.forEach((s, i) => {
                if (i < value) {
                    s.classList.remove('far');
                    s.classList.add('fas', 'text-yellow-400');
                } else {
                    s.classList.remove('fas', 'text-yellow-400');
                    s.classList.add('far');
                }
            });
        });
    });
    
    // Добавление нового отзыва
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const name = document.getElementById('name').value;
        const rating = parseInt(ratingValue.value);
        const reviewText = document.getElementById('review').value;
        
        if (!name || !rating || !reviewText) {
            alert('Пожалуйста, заполните все поля');
            return;
        }
        
        const firstLetter = name.charAt(0).toUpperCase();
        const date = new Date().toLocaleDateString('ru-RU');
        
        const starsHtml = Array(5).fill('').map((_, i) => 
            i < rating ? '<i class="fas fa-star text-yellow-400"></i>' : '<i class="far fa-star"></i>'
        ).join('');
        
        const newSlide = document.createElement('div');
        newSlide.className = 'testimonial-slide';
        newSlide.innerHTML = `
            <div class="testimonial-card">
                <div class="flex items-center mb-4">
                    <div class="bg-blue-100 text-blue-600 w-12 h-12 rounded-full flex items-center justify-center text-xl font-bold mr-4">${firstLetter}</div>
                    <div>
                        <h4 class="font-semibold text-gray-800">${name}</h4>
                        <div class="flex">
                            ${starsHtml}
                        </div>
                    </div>
                </div>
                <div class="testimonial-content">
                    <p class="text-gray-600">"${reviewText}"</p>
                </div>
                <div class="mt-4 text-sm text-gray-500">${date}</div>
            </div>
        `;
        
        wrapper.appendChild(newSlide);
        updateCarousel();
        
        form.reset();
        stars.forEach(star => {
            star.classList.remove('fas', 'text-yellow-400');
            star.classList.add('far');
        });
        ratingValue.value = '0';
        modal.classList.add('hidden');
    });
    
    // Управление каруселью
    function updateCarousel() {
        slides = document.querySelectorAll('.testimonial-slide');
        const slidesCount = slides.length;
        const slidesPerView = getSlidesPerView();
        
        if (slidesCount > slidesPerView) {
            prevBtn.classList.remove('hidden');
            nextBtn.classList.remove('hidden');
        } else {
            prevBtn.classList.add('hidden');
            nextBtn.classList.add('hidden');
        }
        
        const maxIndex = Math.max(0, slidesCount - slidesPerView);
        if (currentIndex > maxIndex) {
            currentIndex = maxIndex;
        }
        
        wrapper.style.transform = `translateX(-${currentIndex * (100 / slidesPerView)}%)`;
    }
    
    function getSlidesPerView() {
        if (window.innerWidth >= 1024) return 3;
        if (window.innerWidth >= 768) return 2;
        return 1;
    }
    
    prevBtn.addEventListener('click', () => {
        if (currentIndex > 0) {
            currentIndex--;
            updateCarousel();
        }
    });
    
    nextBtn.addEventListener('click', () => {
        const slidesPerView = getSlidesPerView();
        if (currentIndex < slides.length - slidesPerView) {
            currentIndex++;
            updateCarousel();
        }
    });
    
    window.addEventListener('resize', () => {
        updateCarousel();
    });
    
    updateCarousel();
});