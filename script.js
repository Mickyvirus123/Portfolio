// API Configuration
const API_BASE_URL = 'http://localhost:5000/api';

// Toggle icon navbar
let menuIcon = document.querySelector('#menu-icon');
let navbar = document.querySelector('.navbar');
menuIcon.onclick = () => {
    menuIcon.classList.toggle('bx-x');
    navbar.classList.toggle('active');
}

// Scroll section
let sections = document.querySelectorAll('section');
let navLinks = document.querySelectorAll('header nav a');
window.onscroll = () => {
    sections.forEach(sec => {
        let top = window.scrollY;
        let offset = sec.offsetTop - 100;
        let height = sec.offsetHeight;
        let id = sec.getAttribute('id');

        if (top >= offset && top < offset + height) {
            // active navbar links
            navLinks.forEach(links => {
                links.classList.remove('active');
                document.querySelector('header nav a[href*=' + id + ']').classList.add('active');
            });

            }
        
        });

    // sticky header
    let header = document.querySelector('header');

    header.classList.toggle('sticky', window.scrollY > 100);

   // remove toggle icon and navbar when click navbar link (scroll)
    menuIcon.classList.remove('bx-x');
    navbar.classList.remove('active');
    
}

// Contact Form Submission
const contactForm = document.querySelector('form');

if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        // Get form data
        const fullName = contactForm.querySelector('input[placeholder="Full Name"]').value;
        const email = contactForm.querySelector('input[placeholder="Email Address"]').value;
        const phone = contactForm.querySelector('input[placeholder="Phone Number"]').value;
        const subject = contactForm.querySelector('input[placeholder="Email Subject"]').value;
        const message = contactForm.querySelector('textarea[placeholder="Your Message"]').value;

        // Show loading state
        const submitButton = contactForm.querySelector('button[type="submit"]');
        const originalButtonText = submitButton.textContent;
        submitButton.textContent = 'Sending...';
        submitButton.disabled = true;

        try {
            const response = await fetch(`${API_BASE_URL}/contacts`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    fullName,
                    email,
                    phone,
                    subject,
                    message,
                }),
            });

            const data = await response.json();

            if (data.success) {
                // Show success message
                alert('✅ Message sent successfully! I will get back to you soon.');
                contactForm.reset();
            } else {
                // Show error message
                const errorMessage = data.errors 
                    ? data.errors.map(e => `${e.field}: ${e.message}`).join('\n')
                    : data.message;
                alert('❌ Error: ' + errorMessage);
            }
        } catch (error) {
            console.error('Form submission error:', error);
            alert('❌ Failed to send message. Please check your connection and try again.');
        } finally {
            submitButton.textContent = originalButtonText;
            submitButton.disabled = false;
        }
    });
}

// Load Portfolio Data on Page Load
async function loadPortfolioData() {
    try {
        const response = await fetch(`${API_BASE_URL}/portfolio`);
        const data = await response.json();

        if (data.success) {
            const portfolio = data.data;
            
            // Update page with portfolio data
            console.log('Portfolio data loaded:', portfolio);
            
            // You can add more dynamic content updates here
            // For example: update skills, experience, education sections
        }
    } catch (error) {
        console.error('Failed to load portfolio data:', error);
        // Gracefully handle error - page still works with static content
    }
}

// Load portfolio data when page loads
document.addEventListener('DOMContentLoaded', loadPortfolioData);
    
