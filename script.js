  // Single Page Application Navigation
        document.addEventListener('DOMContentLoaded', function() {
            const navLinks = document.querySelectorAll('.nav-link');
            const sections = document.querySelectorAll('.page-section');
            
            // Navigation functionality
            navLinks.forEach(link => {
                link.addEventListener('click', function(e) {
                    e.preventDefault();
                    const targetId = this.getAttribute('href').substring(1);
                    
                    // Hide all sections
                    sections.forEach(section => {
                        section.classList.remove('active');
                    });
                    
                    // Show target section
                    document.getElementById(targetId).classList.add('active');
                });
            });

            // CTA button functionality
            const ctaButton = document.querySelector('.cta');
            if (ctaButton) {
                ctaButton.addEventListener('click', function(e) {
                    e.preventDefault();
                    
                    // Hide all sections
                    sections.forEach(section => {
                        section.classList.remove('active');
                    });
                    
                    // Show projects section
                    document.getElementById('projects').classList.add('active');
                });
            }

            // Typing Effect for Homepage
            const typingEl = document.querySelector('.typing');
            if (typingEl) {
                const roles = ["Full Stack Web Developer", "MERN Stack Developer", "Frontend Specialist", "Backend Developer"];
                let roleIndex = 0;
                let charIndex = 0;
                let isDeleting = false;

                function typeWriter() {
                    const currentRole = roles[roleIndex];
                    
                    if (isDeleting) {
                        typingEl.textContent = currentRole.substring(0, charIndex - 1);
                        charIndex--;
                    } else {
                        typingEl.textContent = currentRole.substring(0, charIndex + 1);
                        charIndex++;
                    }

                    let typeSpeed = isDeleting ? 50 : 100;

                    if (!isDeleting && charIndex === currentRole.length) {
                        typeSpeed = 2000; // Pause at end
                        isDeleting = true;
                    } else if (isDeleting && charIndex === 0) {
                        isDeleting = false;
                        roleIndex = (roleIndex + 1) % roles.length;
                        typeSpeed = 300; // Pause before typing next
                    }

                    setTimeout(typeWriter, typeSpeed);
                }

                typeWriter();
            }

            // Scroll reveal animation for project cards
            const observerOptions = {
                threshold: 0.1,
                rootMargin: '0px 0px -50px 0px'
            };

            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('show');
                    }
                });
            }, observerOptions);

            // Observe all fade-in elements
            document.querySelectorAll('.fade-in').forEach(el => {
                observer.observe(el);
            });

            // Contact Form Handling
            const contactForm = document.getElementById('contactForm');
            if (contactForm) {
                contactForm.addEventListener('submit', function(e) {
                    e.preventDefault();
                    
                    // Get form data
                    const formData = new FormData(this);
                    const name = formData.get('name');
                    const email = formData.get('email');
                    const subject = formData.get('subject');
                    const message = formData.get('message');

                    // Basic validation
                    if (!name || !email || !subject || !message) {
                        alert('Please fill in all fields.');
                        return;
                    }

                    // Show success message
                    alert(`Thank you, ${name}! Your message has been sent. I'll get back to you soon.`);
                    
                    // Reset form
                    this.reset();
                });
            }

            // Smooth scrolling enhancement
            document.querySelectorAll('a[href^="#"]').forEach(anchor => {
                anchor.addEventListener('click', function (e) {
                    e.preventDefault();
                    const target = document.querySelector(this.getAttribute('href'));
                    if (target) {
                        target.scrollIntoView({
                            behavior: 'smooth',
                            block: 'start'
                        });
                    }
                });
            });
        });

        // Add loading animation
        window.addEventListener('load', function() {
            document.body.style.opacity = '0';
            document.body.style.transition = 'opacity 0.3s ease-in-out';
            
            setTimeout(() => {
                document.body.style.opacity = '1';
            }, 100);
        });
        function addImage(button) {
            // Create file input
            const input = document.createElement('input');
            input.type = 'file';
            input.accept = 'image/*';
            
            input.onchange = function(e) {
                const file = e.target.files[0];
                if (file) {
                    const reader = new FileReader();
                    reader.onload = function(e) {
                        const projectImage = button.closest('.project-image');
                        const placeholder = projectImage.querySelector('.image-placeholder');
                        
                        // Create img element
                        const img = document.createElement('img');
                        img.src = e.target.result;
                        img.alt = 'Project Screenshot';
                        
                        // Replace placeholder with image
                        if (placeholder) {
                            placeholder.remove();
                        }
                        
                        // Remove any existing image
                        const existingImg = projectImage.querySelector('img');
                        if (existingImg) {
                            existingImg.remove();
                        }
                        
                        projectImage.appendChild(img);
                        
                        // Update button text
                        button.textContent = 'Change';
                        
                        // Add remove button
                        if (!projectImage.querySelector('.remove-btn')) {
                            const removeBtn = document.createElement('button');
                            removeBtn.className = 'control-btn remove-btn';
                            removeBtn.textContent = 'Remove';
                            removeBtn.onclick = function() {
                                removeImage(this);
                            };
                            projectImage.querySelector('.image-controls').appendChild(removeBtn);
                        }
                    };
                    reader.readAsDataURL(file);
                }
            };
            
            input.click();
        }
        
        function removeImage(button) {
            const projectImage = button.closest('.project-image');
            const img = projectImage.querySelector('img');
            const addBtn = projectImage.querySelector('.control-btn:not(.remove-btn)');
            
            if (img) {
                img.remove();
            }
            
            // Restore placeholder
            const placeholder = document.createElement('div');
            placeholder.className = 'image-placeholder';
            placeholder.textContent = 'Click "Add Image" to upload a screenshot';
            projectImage.appendChild(placeholder);
            
            // Update button text
            addBtn.textContent = 'Add Image';
            
            // Remove the remove button
            button.remove();
        }

        // Add staggered animation delay
        document.addEventListener('DOMContentLoaded', function() {
            const cards = document.querySelectorAll('.project-card');
            cards.forEach((card, index) => {
                card.style.animationDelay = `${index * 0.1}s`;
            });
        });