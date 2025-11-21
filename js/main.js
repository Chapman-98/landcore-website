// ===================================
// INFINITE PROJECTS CAROUSEL WITH PEEK
// ===================================

document.addEventListener('DOMContentLoaded', function() 
{
    const track = document.querySelector('.carousel-track');
    const viewport = document.querySelector('.carousel-viewport');
    const originalSlides = Array.from(document.querySelectorAll('.project-slide'));
    const leftArrow = document.querySelector('.arrow-left');
    const rightArrow = document.querySelector('.arrow-right');
    const thumbnails = Array.from(document.querySelectorAll('.thumbnail'));
    
    let currentIndex = 0;
    const totalSlides = originalSlides.length;
    let isTransitioning = false;
    
    // Clone slides for infinite loop
    function setupCarousel() 
    {
        // Clone to end
        originalSlides.forEach(slide => 
        {
            const clone = slide.cloneNode(true);
            clone.classList.remove('active');
            track.appendChild(clone);
        });
        
        // Clone to beginning (reverse order)
        for (let i = originalSlides.length - 1; i >= 0; i--) 
        {
            const clone = originalSlides[i].cloneNode(true);
            clone.classList.remove('active');
            track.insertBefore(clone, track.firstChild);
        }
    }
    
    // Calculate position WITH centering and debugging
    function getPosition(index) 
    {
        const slide = track.querySelector('.project-slide');
        const slideWidth = slide.offsetWidth;
        const gap = parseFloat(window.getComputedStyle(track).gap) || 32;
        const slideWithGap = slideWidth + gap;
        const viewportWidth = viewport.offsetWidth;
        
        // Calculate how much to offset to center the slide
        const centerOffset = (viewportWidth - slideWidth) / 2;
        
        // Index in DOM (accounting for leading clones)
        const domIndex = index + totalSlides;
        
        // Position = center offset - (how far we've scrolled)
        const position = centerOffset - (domIndex * slideWithGap);
        
        return position;
    }
    
    // Update track position
    function updatePosition(animate = true) 
    {
        const translateX = getPosition(currentIndex);
        
        if (!animate) 
        {
            track.style.transition = 'none';
            track.style.transform = `translateX(${translateX}px)`;
            // Force reflow
            void track.offsetWidth;
            track.style.transition = 'transform 0.5s ease-in-out';
        } 
        else 
        {
            track.style.transition = 'transform 0.5s ease-in-out';
            track.style.transform = `translateX(${translateX}px)`;
        }
    }
    
    // Update active states
    function updateActive() 
    {
        const allSlides = track.querySelectorAll('.project-slide');
        allSlides.forEach((slide, idx) => 
        {
            slide.classList.toggle('active', idx === currentIndex + totalSlides);
        });
        
        thumbnails.forEach((thumb, idx) => 
        {
            thumb.classList.toggle('active', idx === currentIndex);
        });
    }
    
    // Handle infinite loop reset
    function handleLoop() 
    {
        setTimeout(() => 
        {
            // At end clones? Jump to real start
            if (currentIndex >= totalSlides) 
            {
                console.log('LOOPING: Hit end clones, jumping to start');
                currentIndex = 0;
                updatePosition(false);
            }
            // At start clones? Jump to real end
            else if (currentIndex < 0) 
            {
                console.log('LOOPING: Hit start clones, jumping to end');
                currentIndex = totalSlides - 1;
                updatePosition(false);
            }
            isTransitioning = false;
        }, 500);
    }
    
    // Navigation functions
    function next() 
    {
        if (isTransitioning) return;
        isTransitioning = true;
        console.log('NEXT clicked');
        currentIndex++;
        updatePosition(true);
        updateActive();
        handleLoop();
    }
    
    function prev() 
    {
        if (isTransitioning) return;
        isTransitioning = true;
        console.log('PREV clicked');
        currentIndex--;
        updatePosition(true);
        updateActive();
        handleLoop();
    }
    
    function goTo(index) 
    {
        if (isTransitioning) return;
        isTransitioning = true;
        console.log('GO TO:', index);
        currentIndex = index;
        updatePosition(true);
        updateActive();
        setTimeout(() => isTransitioning = false, 500);
    }
    
    // Event listeners
    leftArrow.addEventListener('click', prev);
    rightArrow.addEventListener('click', next);
    
    thumbnails.forEach((thumb, idx) => 
    {
        thumb.addEventListener('click', () => goTo(idx));
    });
    
    // Keyboard navigation
    document.addEventListener('keydown', (e) => 
    {
        if (e.key === 'ArrowLeft') prev();
        if (e.key === 'ArrowRight') next();
    });
    
    // Handle resize
    let resizeTimer;
    window.addEventListener('resize', () => 
    {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(() => 
        {
            console.log('RESIZE detected');
            updatePosition(false);
        }, 100);
    });
    
    setupCarousel();
    updatePosition(false);
    updateActive();
});

// ===================================
// HAMBURGER MENU
// ===================================
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navLinks.classList.toggle('active');
});

// Close menu when clicking a link
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navLinks.classList.remove('active');
    });
});

document.addEventListener('DOMContentLoaded', () => 
{
    const cards = document.querySelectorAll('.service-card');

    // Listen for ANY click on the entire document
    document.addEventListener('click', (e) => 
    {
        
        // 1. Check if we clicked INSIDE a card
        const clickedCard = e.target.closest('.service-card');

        // 2. If we clicked inside a card...
        if (clickedCard) 
        {
            // SAFETY CHECK: Did they click the "Learn More" button/link?
            // If yes, we stop here so the link actually works instead of just closing the box.
            if (e.target.closest('a') || e.target.tagName === 'A') 
            {
                return; 
            }

            // TOGGLE LOGIC:
            if (clickedCard.classList.contains('active')) 
            {
                // A: If it is ALREADY open, close it (flip back)
                clickedCard.classList.remove('active');
            } 
            else 
            {
                // B: If it is closed, close all others and open this one
                cards.forEach(c => c.classList.remove('active'));
                clickedCard.classList.add('active');
            }
        }
        // 3. If we clicked OUTSIDE a card (the background)...
        else 
        {
            // Close ALL cards
            cards.forEach(c => c.classList.remove('active'));
        }
    });
});

function updateViewportSize() 
{
    const indicator = document.getElementById('viewport-indicator');
    const width = window.innerWidth;
    const height = window.innerHeight;
    indicator.textContent = `Width: ${width}px | Height: ${height}px`;
}

// Update on load and resize
window.addEventListener('load', updateViewportSize);
window.addEventListener('resize', updateViewportSize);


// ===================================
// HIGHLIGHT CURRENT NAV LINK
// ===================================
document.addEventListener('DOMContentLoaded', function() 
{
    const navLinks = document.querySelectorAll('.nav-links a');
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    
    navLinks.forEach(link => 
    {
        const linkPage = link.getAttribute('href');
        
        if (linkPage === currentPage) { link.classList.add('active'); }
    });
});

// ===================================
// PROJECT FILTER BUTTONS
// ===================================
document.addEventListener('DOMContentLoaded', function() 
{
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');
    
    // Only run if filter buttons exist
    if (!filterButtons.length) return;
    
    filterButtons.forEach(button => 
    {
        button.addEventListener('click', function() 
        {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            
            // Add active class to clicked button
            this.classList.add('active');
            
            // Get the filter value
            const filterValue = this.getAttribute('data-filter');
            
            // Filter the project cards
            projectCards.forEach(card => 
            {
                const cardService = card.getAttribute('data-service');
                
                if (filterValue === 'all' || cardService === filterValue) 
                {
                    card.style.display = 'block';
                    // Optional: Add fade-in animation
                    card.style.opacity = '0';
                    setTimeout(() => 
                    {
                        card.style.opacity = '1';
                    }, 50);
                } 
                else 
                {
                    card.style.display = 'none';
                }
            });
        });
    });
});