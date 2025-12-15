document.addEventListener('DOMContentLoaded', function() {
    // Get project ID from URL parameter
    const urlParams = new URLSearchParams(window.location.search);
    const projectId = urlParams.get('project');
    
    // Check if project exists
    if (!projectId || !projectsData[projectId]) {
        window.location.href = 'projects.html';
        return;
    }
    
    const project = projectsData[projectId];
    
    // Update page title
    document.title = `${project.title} - Landcore Builders`;
    
    // Populate hero
    document.getElementById('hero-image').src = project.heroImage;
    document.getElementById('hero-image').alt = project.title;
    document.getElementById('project-title').textContent = project.title;
    document.getElementById('project-meta').textContent = `${project.location} • ${project.year}`;
    
    // Populate stats
    document.getElementById('stat-client').textContent = project.client;
    document.getElementById('stat-location').textContent = project.location;
    document.getElementById('stat-timeline').textContent = project.timeline;
    document.getElementById('stat-type').textContent = project.type;
    document.getElementById('stat-services').textContent = project.services;
    
    // Populate overview
    const overviewContainer = document.getElementById('project-overview');
    project.overview.forEach(paragraph => {
        const p = document.createElement('p');
        p.textContent = paragraph;
        overviewContainer.appendChild(p);
    });
    
    // Populate challenge and solution
    document.getElementById('project-challenge').textContent = project.challenge;
    document.getElementById('project-solution').textContent = project.solution;
    
    // Populate scope
    const scopeList = document.getElementById('project-scope');
    project.scope.forEach(item => {
        const li = document.createElement('li');
        li.textContent = item;
        scopeList.appendChild(li);
    });
    
    // Populate gallery (only if images exist)
    const gallerySection = document.getElementById('gallery-section');
    const galleryGrid = document.getElementById('project-gallery');
    
    if (project.gallery && project.gallery.length > 0) 
    {
        project.gallery.forEach((image, index) => 
        {
            const div = document.createElement('div');
            div.className = 'gallery-item';
            const img = document.createElement('img');
            img.src = image;
            img.alt = `${project.title} - Image ${index + 1}`;
            div.appendChild(img);
            galleryGrid.appendChild(div);
        });
    } 
    else 
    {
        // Hide gallery section if no images
        gallerySection.style.display = 'none';
    }
});