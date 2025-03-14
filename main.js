
// Mobile Navigation Toggle
document.addEventListener('DOMContentLoaded', function() {
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');
    
    if (mobileMenuBtn) {
      mobileMenuBtn.addEventListener('click', function() {
        navLinks.classList.toggle('active');
        
        // Animate hamburger to X
        const spans = this.querySelectorAll('span');
        spans.forEach(span => span.classList.toggle('active'));
        
        if (spans[0].classList.contains('active')) {
          spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
          spans[1].style.opacity = '0';
          spans[2].style.transform = 'rotate(-45deg) translate(7px, -6px)';
        } else {
          spans[0].style.transform = 'none';
          spans[1].style.opacity = '1';
          spans[2].style.transform = 'none';
        }
      });
    }
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
          window.scrollTo({
            top: targetElement.offsetTop - 70, // Adjust for header height
            behavior: 'smooth'
          });
        }
      });
    });
    
    // Animate elements when they come into view
    const animateOnScroll = function() {
      const elements = document.querySelectorAll('.animate-on-scroll');
      
      elements.forEach(element => {
        const elementPosition = element.getBoundingClientRect().top;
        const screenPosition = window.innerHeight / 1.3;
        
        if (elementPosition < screenPosition) {
          element.classList.add('animated');
        }
      });
    };
    
    // Add animate-on-scroll class to elements you want to animate
    const addAnimationClasses = function() {
      document.querySelectorAll('.feature-card, .testimonial-card, .section-header').forEach(el => {
        el.classList.add('animate-on-scroll');
      });
    };
    
    addAnimationClasses();
    window.addEventListener('scroll', animateOnScroll);
    animateOnScroll(); // Initial check
  });
  
  // Add CSS for animations
  const style = document.createElement('style');
  style.textContent = ` 
  
  .animate-on-scroll 
    {
      opacity: 0;
      transform: translateY(30px);
      transition: opacity 0.6s ease, transform 0.6s ease;
    }
    
    .animate-on-scroll.animated {
      opacity: 1;
      transform: translateY(0);
    }
  `;
  document.head.appendChild(style);

 
// Initialize Lucide icons
document.addEventListener('DOMContentLoaded', () => {
    lucide.createIcons();
    
    // Mobile navigation toggle (if needed)
    const createMobileMenu = () => {
      const header = document.querySelector('header');
      const nav = document.querySelector('nav');
      
      if (header && nav) {
        const menuToggle = document.createElement('button');
        menuToggle.classList.add('mobile-menu-toggle');
        menuToggle.innerHTML = '<i data-lucide="menu"></i>';
        
        header.querySelector('.container').insertBefore(menuToggle, nav);
        
        menuToggle.addEventListener('click', () => {
          nav.classList.toggle('active');
          lucide.createIcons();
        });
      }
    };
    
    // Only create mobile menu if screen width is less than 768px
    if (window.innerWidth < 768) {
      createMobileMenu();
    }
    
    // Testimonial slider functionality
    const testimonialSlider = document.querySelector('.testimonial-slider');
    if (testimonialSlider) {
      const testimonials = testimonialSlider.querySelectorAll('.testimonial');
      let currentIndex = 0;
      
      // Auto-scroll testimonials
      setInterval(() => {
        currentIndex = (currentIndex + 1) % testimonials.length;
        testimonialSlider.scrollTo({
          left: testimonials[currentIndex].offsetLeft - testimonialSlider.offsetLeft,
          behavior: 'smooth'
        });
      }, 5000);
    }
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
          targetElement.scrollIntoView({
            behavior: 'smooth'
          });
        }
      });
    });
    
    // Add active class to current page in navigation
    const currentPage = window.location.pathname.split('/').pop();
    const navLinks = document.querySelectorAll('nav ul li a');
    
    navLinks.forEach(link => {
      const linkPage = link.getAttribute('href');
      if (linkPage === currentPage || (currentPage === '' && linkPage === 'index.html')) {
        link.classList.add('active');
      }
    });
  });
  