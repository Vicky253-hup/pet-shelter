// Sample data for the pet shelter system
const petData = {
    pets: [
        { 
            id: 1, 
            name: "Buddy", 
            type: "dog", 
            breed: "Labrador", 
            age: 2, 
            location: "Mumbai", 
            gender: "Male", 
            image: "https://images.unsplash.com/photo-1552053831-71594a27632d?ixlib=rb-1.2.1&auto=format&fit=crop&w=612&q=80",
            description: "Friendly and energetic Labrador looking for a loving home.",
            vaccinated: true,
            neutered: true
        },
        { 
            id: 2, 
            name: "Whiskers", 
            type: "cat", 
            breed: "Persian", 
            age: 3, 
            location: "Delhi", 
            gender: "Female", 
            image: "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
            description: "Gentle Persian cat who loves to cuddle and play.",
            vaccinated: true,
            neutered: true
        },
        { 
            id: 3, 
            name: "Rocky", 
            type: "dog", 
            breed: "German Shepherd", 
            age: 4, 
            location: "Bangalore", 
            gender: "Male", 
            image: "https://images.unsplash.com/photo-1537151608828-ea2b11777ee8?ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80",
            description: "Loyal and protective German Shepherd, great with kids.",
            vaccinated: true,
            neutered: true
        },
        { 
            id: 4, 
            name: "Mittens", 
            type: "cat", 
            breed: "Siamese", 
            age: 1, 
            location: "Hyderabad", 
            gender: "Female", 
            image: "https://images.unsplash.com/photo-1533738363-b7f9aef128ce?ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80",
            description: "Playful Siamese kitten with striking blue eyes.",
            vaccinated: true,
            neutered: false
        },
        { 
            id: 5, 
            name: "Charlie", 
            type: "dog", 
            breed: "Golden Retriever", 
            age: 5, 
            location: "Chennai", 
            gender: "Male", 
            image: "https://images.unsplash.com/photo-1525253086316-d0c9aef4fc27?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
            description: "Friendly Golden Retriever who loves water and fetch.",
            vaccinated: true,
            neutered: true
        },
        { 
            id: 6, 
            name: "Coco", 
            type: "rabbit", 
            breed: "Dutch", 
            age: 1, 
            location: "Pune", 
            gender: "Female", 
            image: "https://images.unsplash.com/photo-1533236897111-3e94666b2edf?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
            description: "Adorable Dutch rabbit who is litter trained.",
            vaccinated: false,
            neutered: false
        }
    ],
    
    adoptionRequests: [
        { id: 1, petId: 2, userId: 1, status: "approved", date: "2025-10-15" },
        { id: 2, petId: 4, userId: 2, status: "pending", date: "2025-11-01" }
    ]
};

// Current user data
let currentUser = null;

// DOM Elements
document.addEventListener('DOMContentLoaded', function() {
    // Check if user is already logged in
    if (localStorage.getItem('currentUser')) {
        currentUser = JSON.parse(localStorage.getItem('currentUser'));
        updateAuthUI();
        showDashboard();
    }
    
    // Set up event listeners
    setupEventListeners();
    
    // Populate initial data
    populatePets();
});

// Set up event listeners
function setupEventListeners() {
    // Auth modal
    const authLink = document.getElementById('auth-link');
    const authModal = document.getElementById('auth-modal');
    const closeModal = document.querySelector('.close');
    const showRegister = document.getElementById('show-register');
    const showLogin = document.getElementById('show-login');
    const loginForm = document.getElementById('login-form');
    const registerForm = document.getElementById('register-form');
    
    // Dashboard elements
    const ctaButton = document.getElementById('cta-button');
    const tabButtons = document.querySelectorAll('.tab-button');
    
    // Forms
    const profileForm = document.getElementById('profile-form');
    const searchForm = document.getElementById('search-form');
    const contactForm = document.getElementById('contact-form');
    
    // Dark mode toggle
    const darkModeToggle = document.getElementById('dark-mode-toggle');
    
    // Auth link click
    authLink.addEventListener('click', function(e) {
        e.preventDefault();
        if (currentUser) {
            // Logout
            localStorage.removeItem('currentUser');
            currentUser = null;
            updateAuthUI();
            hideDashboard();
        } else {
            // Show login form
            document.getElementById('auth-title').textContent = 'User Login';
            loginForm.style.display = 'block';
            registerForm.style.display = 'none';
            authModal.style.display = 'block';
        }
    });
    
    // Dark mode toggle
    darkModeToggle.addEventListener('click', function(e) {
        e.preventDefault();
        document.body.classList.toggle('dark-mode');
        
        // Toggle dark mode for all elements with dark-mode class
        const darkModeElements = document.querySelectorAll('header, .features, .modal-content, .dashboard, .tab-content, .filters, .search-form, .adoption-requests, .profile-form, .about, .contact, .contact-info, .contact-form');
        darkModeElements.forEach(element => {
            element.classList.toggle('dark-mode');
        });
        
        // Update icon
        const icon = darkModeToggle.querySelector('i');
        if (document.body.classList.contains('dark-mode')) {
            icon.classList.remove('fa-moon');
            icon.classList.add('fa-sun');
        } else {
            icon.classList.remove('fa-sun');
            icon.classList.add('fa-moon');
        }
    });
    
    // Close modal
    closeModal.addEventListener('click', function() {
        authModal.style.display = 'none';
    });
    
    // Close modal when clicking outside
    window.addEventListener('click', function(event) {
        if (event.target === authModal) {
            authModal.style.display = 'none';
        }
    });
    
    // Show register form
    showRegister.addEventListener('click', function(e) {
        e.preventDefault();
        document.getElementById('auth-title').textContent = 'User Registration';
        loginForm.style.display = 'none';
        registerForm.style.display = 'block';
    });
    
    // Show login form
    showLogin.addEventListener('click', function(e) {
        e.preventDefault();
        document.getElementById('auth-title').textContent = 'User Login';
        loginForm.style.display = 'block';
        registerForm.style.display = 'none';
    });
    
    // Login form submission
    loginForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;
        
        // Simple validation (in a real app, this would be server-side)
        if (username && password) {
            // Mock user data
            currentUser = {
                id: Math.floor(Math.random() * 1000),
                name: username,
                username: username,
                email: `${username}@example.com`,
                phone: "9876543210",
                location: "Mumbai",
                joinDate: new Date().toLocaleDateString()
            };
            
            // Save to localStorage
            localStorage.setItem('currentUser', JSON.stringify(currentUser));
            
            // Update UI
            updateAuthUI();
            
            // Close modal
            authModal.style.display = 'none';
            
            // Show dashboard
            showDashboard();
            
            // Reset form
            loginForm.reset();
        } else {
            alert('Please enter both username and password');
        }
    });
    
    // Register form submission
    registerForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const name = document.getElementById('reg-name').value;
        const username = document.getElementById('reg-username').value;
        const email = document.getElementById('reg-email').value;
        const password = document.getElementById('reg-password').value;
        const phone = document.getElementById('reg-phone').value;
        const location = document.getElementById('reg-location').value;
        
        // Simple validation
        if (name && username && email && password && phone && location) {
            // Mock user data
            currentUser = {
                id: Math.floor(Math.random() * 1000),
                name: name,
                username: username,
                email: email,
                phone: phone,
                location: location,
                joinDate: new Date().toLocaleDateString()
            };
            
            // Save to localStorage
            localStorage.setItem('currentUser', JSON.stringify(currentUser));
            
            // Update UI
            updateAuthUI();
            
            // Close modal
            authModal.style.display = 'none';
            
            // Show dashboard
            showDashboard();
            
            // Reset form
            registerForm.reset();
        } else {
            alert('Please fill in all fields');
        }
    });
    
    // CTA button click
    ctaButton.addEventListener('click', function() {
        if (currentUser) {
            showDashboard();
            // Switch to pets tab
            switchTab('pets-tab');
        } else {
            document.getElementById('auth-title').textContent = 'User Login';
            loginForm.style.display = 'block';
            registerForm.style.display = 'none';
            authModal.style.display = 'block';
        }
    });
    
    // Tab functionality
    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons
            tabButtons.forEach(btn => btn.classList.remove('active'));
            
            // Add active class to clicked button
            this.classList.add('active');
            
            // Hide all tab content
            const tabContents = document.querySelectorAll('.tab-content');
            tabContents.forEach(content => content.classList.remove('active'));
            
            // Show corresponding tab content
            const tabId = this.getAttribute('data-tab');
            document.getElementById(tabId).classList.add('active');
            
            // If switching to pets tab, repopulate pets
            if (tabId === 'pets-tab') {
                populatePets();
            }
            
            // If switching to adoption requests tab, populate requests
            if (tabId === 'adopt-tab') {
                populateAdoptionRequests();
            }
        });
    });
    
    // Profile form submission
    if (profileForm) {
        profileForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const name = document.getElementById('profile-name').value;
            const username = document.getElementById('profile-username').value;
            const email = document.getElementById('profile-email').value;
            const phone = document.getElementById('profile-phone').value;
            const location = document.getElementById('profile-location').value;
            
            // Update current user
            currentUser.name = name;
            currentUser.username = username;
            currentUser.email = email;
            currentUser.phone = phone;
            currentUser.location = location;
            
            // Save to localStorage
            localStorage.setItem('currentUser', JSON.stringify(currentUser));
            
            alert('Profile updated successfully!');
        });
    }
    
    // Search form submission
    if (searchForm) {
        searchForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const type = document.getElementById('search-type').value;
            const breed = document.getElementById('search-breed').value;
            const age = document.getElementById('search-age').value;
            const location = document.getElementById('search-location').value;
            
            // Filter pets based on search criteria
            const filteredPets = petData.pets.filter(pet => {
                return (type === 'all' || pet.type === type) &&
                       (breed === '' || pet.breed.toLowerCase().includes(breed.toLowerCase())) &&
                       (age === 'all' || 
                        (age === 'puppy' && pet.age < 1) ||
                        (age === 'young' && pet.age >= 1 && pet.age <= 3) ||
                        (age === 'adult' && pet.age > 3 && pet.age <= 7) ||
                        (age === 'senior' && pet.age > 7)) &&
                       (location === 'all' || pet.location === location);
            });
            
            // Display search results
            displaySearchResults(filteredPets);
        });
    }
    
    // Contact form submission
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            alert('Thank you for your message! We will get back to you soon.');
            contactForm.reset();
        });
    }
    
    // Filter event listeners
    document.getElementById('pet-type').addEventListener('change', filterPets);
    document.getElementById('pet-breed').addEventListener('change', filterPets);
    document.getElementById('pet-age').addEventListener('change', filterPets);
    document.getElementById('pet-location').addEventListener('change', filterPets);
}

// Update authentication UI
function updateAuthUI() {
    const authLink = document.getElementById('auth-link');
    if (currentUser) {
        authLink.innerHTML = '<i class="fas fa-sign-out-alt"></i> Logout';
        // Hide home sections
        document.querySelector('.hero').style.display = 'none';
        document.querySelector('.features').style.display = 'none';
    } else {
        authLink.innerHTML = '<i class="fas fa-sign-in-alt"></i> Login';
        // Show home sections
        document.querySelector('.hero').style.display = 'flex';
        document.querySelector('.features').style.display = 'block';
    }
}

// Show dashboard
function showDashboard() {
    document.getElementById('dashboard').style.display = 'block';
    // Hide home sections
    document.querySelector('.hero').style.display = 'none';
    document.querySelector('.features').style.display = 'none';
    // Populate profile data
    populateProfileData();
}

// Hide dashboard
function hideDashboard() {
    document.getElementById('dashboard').style.display = 'none';
    // Show home sections
    document.querySelector('.hero').style.display = 'flex';
    document.querySelector('.features').style.display = 'block';
}

// Switch to a specific tab
function switchTab(tabId) {
    // Remove active class from all buttons
    const tabButtons = document.querySelectorAll('.tab-button');
    tabButtons.forEach(btn => btn.classList.remove('active'));
    
    // Add active class to corresponding button
    const activeButton = Array.from(tabButtons).find(button => button.getAttribute('data-tab') === tabId);
    if (activeButton) {
        activeButton.classList.add('active');
    }
    
    // Hide all tab content
    const tabContents = document.querySelectorAll('.tab-content');
    tabContents.forEach(content => content.classList.remove('active'));
    
    // Show corresponding tab content
    document.getElementById(tabId).classList.add('active');
}

// Populate profile data
function populateProfileData() {
    if (currentUser) {
        document.getElementById('profile-name').value = currentUser.name || '';
        document.getElementById('profile-username').value = currentUser.username || '';
        document.getElementById('profile-email').value = currentUser.email || '';
        document.getElementById('profile-phone').value = currentUser.phone || '';
        document.getElementById('profile-location').value = currentUser.location || '';
        document.getElementById('profile-adoption-date').value = currentUser.joinDate || '';
    }
}

// Populate pets
function populatePets() {
    const petGrid = document.getElementById('pet-grid');
    if (!petGrid) return;
    
    petGrid.innerHTML = petData.pets.map(pet => `
        <div class="pet-card">
            <img src="${pet.image}" alt="${pet.name}" class="pet-image">
            <h4>${pet.name}</h4>
            <div class="pet-details">
                <p><span>Type:</span> <span>${pet.type.charAt(0).toUpperCase() + pet.type.slice(1)}</span></p>
                <p><span>Breed:</span> <span>${pet.breed}</span></p>
                <p><span>Age:</span> <span>${pet.age} year(s)</span></p>
                <p><span>Location:</span> <span>${pet.location}</span></p>
                <p><span>Gender:</span> <span>${pet.gender}</span></p>
                <p><span>Vaccinated:</span> <span>${pet.vaccinated ? 'Yes' : 'No'}</span></p>
            </div>
            <button class="adopt-button" onclick="requestAdoption(${pet.id})">
                Request Adoption
            </button>
        </div>
    `).join('');
}

// Filter pets based on selected filters
function filterPets() {
    const type = document.getElementById('pet-type').value;
    const breed = document.getElementById('pet-breed').value;
    const age = document.getElementById('pet-age').value;
    const location = document.getElementById('pet-location').value;
    
    // Filter pets based on criteria
    const filteredPets = petData.pets.filter(pet => {
        return (type === 'all' || pet.type === type) &&
               (breed === 'all' || pet.breed === breed) &&
               (age === 'all' || 
                (age === 'puppy' && pet.age < 1) ||
                (age === 'young' && pet.age >= 1 && pet.age <= 3) ||
                (age === 'adult' && pet.age > 3 && pet.age <= 7) ||
                (age === 'senior' && pet.age > 7)) &&
               (location === 'all' || pet.location === location);
    });
    
    // Display filtered pets
    const petGrid = document.getElementById('pet-grid');
    if (!petGrid) return;
    
    if (filteredPets.length > 0) {
        petGrid.innerHTML = filteredPets.map(pet => `
            <div class="pet-card">
                <img src="${pet.image}" alt="${pet.name}" class="pet-image">
                <h4>${pet.name}</h4>
                <div class="pet-details">
                    <p><span>Type:</span> <span>${pet.type.charAt(0).toUpperCase() + pet.type.slice(1)}</span></p>
                    <p><span>Breed:</span> <span>${pet.breed}</span></p>
                    <p><span>Age:</span> <span>${pet.age} year(s)</span></p>
                    <p><span>Location:</span> <span>${pet.location}</span></p>
                    <p><span>Gender:</span> <span>${pet.gender}</span></p>
                    <p><span>Vaccinated:</span> <span>${pet.vaccinated ? 'Yes' : 'No'}</span></p>
                </div>
                <button class="adopt-button" onclick="requestAdoption(${pet.id})">
                    Request Adoption
                </button>
            </div>
        `).join('');
    } else {
        petGrid.innerHTML = '<p class="no-results">No pets found matching your criteria. Try adjusting your filters.</p>';
    }
}

// Request adoption for a pet
function requestAdoption(petId) {
    if (!currentUser) {
        alert('Please login to request pet adoption');
        // Show login form
        document.getElementById('auth-title').textContent = 'User Login';
        document.getElementById('login-form').style.display = 'block';
        document.getElementById('register-form').style.display = 'none';
        document.getElementById('auth-modal').style.display = 'block';
        return;
    }
    
    const pet = petData.pets.find(p => p.id === petId);
    if (pet) {
        if (confirm(`Are you sure you want to request adoption for ${pet.name}?`)) {
            // Create adoption request
            const newRequest = {
                id: petData.adoptionRequests.length + 1,
                petId: petId,
                userId: currentUser.id,
                status: "pending",
                date: new Date().toISOString().split('T')[0]
            };
            
            // Add to adoption requests
            petData.adoptionRequests.push(newRequest);
            
            alert(`Your adoption request for ${pet.name} has been submitted successfully! We will contact you soon.`);
        }
    } else {
        alert('Pet not found.');
    }
}

// Populate adoption requests
function populateAdoptionRequests() {
    const adoptionRequestsContainer = document.getElementById('adoption-requests');
    if (!adoptionRequestsContainer) return;
    
    // Filter requests for current user
    const userRequests = petData.adoptionRequests.filter(request => request.userId === currentUser.id);
    
    if (userRequests.length > 0) {
        adoptionRequestsContainer.innerHTML = userRequests.map(request => {
            const pet = petData.pets.find(p => p.id === request.petId);
            return `
                <div class="request-item">
                    <div class="request-info">
                        <h4>${pet ? pet.name : 'Unknown Pet'}</h4>
                        <p>Requested on: ${request.date}</p>
                    </div>
                    <div class="request-status ${request.status}">
                        ${request.status.charAt(0).toUpperCase() + request.status.slice(1)}
                    </div>
                </div>
            `;
        }).join('');
    } else {
        adoptionRequestsContainer.innerHTML = '<p>You have not submitted any adoption requests yet.</p>';
    }
}

// Display search results
function displaySearchResults(pets) {
    const searchResultsContainer = document.getElementById('search-results');
    if (!searchResultsContainer) return;
    
    if (pets.length > 0) {
        searchResultsContainer.innerHTML = `
            <h4>Search Results (${pets.length} pet(s) found)</h4>
            <div class="pet-grid">
                ${pets.map(pet => `
                    <div class="pet-card">
                        <img src="${pet.image}" alt="${pet.name}" class="pet-image">
                        <h4>${pet.name}</h4>
                        <div class="pet-details">
                            <p><span>Type:</span> <span>${pet.type.charAt(0).toUpperCase() + pet.type.slice(1)}</span></p>
                            <p><span>Breed:</span> <span>${pet.breed}</span></p>
                            <p><span>Age:</span> <span>${pet.age} year(s)</span></p>
                            <p><span>Location:</span> <span>${pet.location}</span></p>
                        </div>
                        <button class="adopt-button" onclick="requestAdoption(${pet.id})">
                            Request Adoption
                        </button>
                    </div>
                `).join('')}
            </div>
        `;
    } else {
        searchResultsContainer.innerHTML = '<p>No pets found matching your search criteria.</p>';
    }
}

// Initialize the application
console.log('Pet Shelter Platform initialized');