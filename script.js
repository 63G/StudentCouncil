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

    let currentIndex = 0;

    const moveToSlide = (index) => {
        track.style.transform = `translateX(-${index * 100 / 3.1}%)`;
        currentIndex = index;

        indicators.forEach((indicator, idx) => {
            if (idx === index) {
                indicator.classList.add('current-slide');
            } else {
                indicator.classList.remove('current-slide');
            }
        });
    };

    nextButton.addEventListener('click', () => {
        if (currentIndex < slides.length / 2 - 1) {
            moveToSlide(currentIndex + 1);
        } else {
            moveToSlide(0);
        }
    });

    prevButton.addEventListener('click', () => {
        if (currentIndex > 0) {
            moveToSlide(currentIndex - 1);
        } else {
            moveToSlide(Math.ceil(slides.length / 2) - 1);
        }
    });

    nav.addEventListener('click', e => {
        const targetIndicator = e.target.closest('button');

        if (!targetIndicator) return;

        const targetIndex = indicators.findIndex(indicator => indicator === targetIndicator);
        moveToSlide(targetIndex);
    });

    moveToSlide(0);
});

// Scroll animations for member cards
document.querySelectorAll('.member-card').forEach(element => {
    observer.observe(element);
});

// Form submission with JavaScript (Frontend)
document.getElementById('contact-form').addEventListener('submit', function(e) {
    e.preventDefault();

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;

    const formData = {
        name: name,
        email: email,
        message: message
    };

    fetch('submit-form', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
    })
    .then(response => response.json())
    .then(data => {
        alert('Message sent successfully!');
    })
    .catch(error => {
        console.error('Error:', error);
        alert('Error sending message.');
    });
});

// Smooth scrolling for survey cards
document.querySelectorAll('.survey-card').forEach(card => {
    card.addEventListener('click', function() {
        const href = this.querySelector('.take-survey-button').getAttribute('href');
        window.location.href = href;
    });
});


// document.getElementById('nav-toggle').addEventListener('click', function () {
//     const navContent = document.getElementById('nav-content');
//     navContent.classList.toggle('hidden');
// });

document.getElementById('nav-toggle').addEventListener('click', function () {
    var nav = document.getElementById('navbar');
    nav.classList.toggle('show');
});



