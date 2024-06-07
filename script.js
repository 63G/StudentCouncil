// Smooth scrolling for navigation links
document.querySelectorAll('a.nav-link').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Change navbar style on scroll
window.addEventListener('scroll', function() {
    const header = document.querySelector('header');
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

// Scroll animations
const observerOptions = {
    threshold: 0.1
};

const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

document.querySelectorAll('.animate').forEach(element => {
    observer.observe(element);
});

// Carousel functionality
document.addEventListener('DOMContentLoaded', function() {
    const track = document.querySelector('.carousel-track');
    const slides = Array.from(track.children);
    const nextButton = document.querySelector('.next-button');
    const prevButton = document.querySelector('.prev-button');
    const nav = document.querySelector('.carousel-nav');
    const indicators = Array.from(nav.children);

    const slideWidth = slides[0].getBoundingClientRect().width;

    // Arrange the slides next to one another
    const setSlidePosition = (slide, index) => {
        slide.style.left = slideWidth * index + 'px';
    };
    slides.forEach(setSlidePosition);

    const moveToSlide = (track, currentSlide, targetSlide) => {
        track.style.transform = 'translateX(-' + targetSlide.style.left + ')';
        currentSlide.classList.remove('current-slide');
        targetSlide.classList.add('current-slide');
    };

    const updateIndicators = (currentIndicator, targetIndicator) => {
        currentIndicator.classList.remove('current-slide');
        targetIndicator.classList.add('current-slide');
    };

    const hideAllContent = () => {
        slides.forEach(slide => {
            slide.querySelector('.news-content').style.opacity = '0';
            slide.querySelector('.news-content').style.transform = 'translateY(20px)';
        });
    };

    const showCurrentContent = () => {
        const currentSlide = track.querySelector('.current-slide');
        const newsContent = currentSlide.querySelector('.news-content');
        newsContent.style.opacity = '1';
        newsContent.style.transform = 'translateY(0)';
    };

    // When I click left, move slides to the left
    prevButton.addEventListener('click', e => {
        const currentSlide = track.querySelector('.current-slide');
        const prevSlide = currentSlide.previousElementSibling;
        const currentIndicator = nav.querySelector('.current-slide');
        const prevIndicator = currentIndicator.previousElementSibling;

        if (prevSlide) {
            hideAllContent();
            moveToSlide(track, currentSlide, prevSlide);
            updateIndicators(currentIndicator, prevIndicator);
            showCurrentContent();
        }
    });

    // When I click right, move slides to the right
    nextButton.addEventListener('click', e => {
        const currentSlide = track.querySelector('.current-slide');
        const nextSlide = currentSlide.nextElementSibling;
        const currentIndicator = nav.querySelector('.current-slide');
        const nextIndicator = currentIndicator.nextElementSibling;

        if (nextSlide) {
            hideAllContent();
            moveToSlide(track, currentSlide, nextSlide);
            updateIndicators(currentIndicator, nextIndicator);
            showCurrentContent();
        }
    });

    // When I click the nav indicators, move to that slide
    nav.addEventListener('click', e => {
        const targetIndicator = e.target.closest('button');

        if (!targetIndicator) return;

        const currentSlide = track.querySelector('.current-slide');
        const currentIndicator = nav.querySelector('.current-slide');
        const targetIndex = indicators.findIndex(indicator => indicator === targetIndicator);
        const targetSlide = slides[targetIndex];

        if (targetSlide) {
            hideAllContent();
            moveToSlide(track, currentSlide, targetSlide);
            updateIndicators(currentIndicator, targetIndicator);
            showCurrentContent();
        }
    });

    // Initialize first slide content visibility
    showCurrentContent();
});

// Scroll animations for member cards
document.querySelectorAll('.member-card').forEach(element => {
    observer.observe(element);
});
