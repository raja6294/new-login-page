let selectedRole = '';
let currentUser = null;

// Role selection functionality
function selectRole(role) {
    selectedRole = role;
    document.getElementById('roleSelection').classList.add('hidden');
    setTimeout(() => {
        document.getElementById('loginContainer').classList.add('active-login');
    }, 400);
}

function goBackToRoleSelection() {
    document.getElementById('loginContainer').classList.remove('active-login');
    setTimeout(() => {
        document.getElementById('roleSelection').classList.remove('hidden');
    }, 400);
}

// Login/Register form switching
const container = document.querySelector('.container');
const LoginLink = document.querySelector('.SignInLink');
const RegisterLink = document.querySelector('.SignUpLink');

if (RegisterLink) {
    RegisterLink.addEventListener('click', (e) => {
        e.preventDefault();
        container.classList.add('active');
    });
}

if (LoginLink) {
    LoginLink.addEventListener('click', (e) => {
        e.preventDefault();
        container.classList.remove('active');
    });
}

// Handle login
function handleLogin(event) {
    event.preventDefault();
    const username = document.getElementById('loginUsername').value;
    const password = document.getElementById('loginPassword').value;

    // Simple validation (replace with actual authentication)
    if (username && password) {
        currentUser = { username, role: selectedRole };
        showDashboard(selectedRole);
    } else {
        alert('Please enter valid credentials');
    }
}

// Handle registration
function handleRegister(event) {
    event.preventDefault();
    const username = document.getElementById('registerUsername').value;
    const email = document.getElementById('registerEmail').value;
    const password = document.getElementById('registerPassword').value;

    // Simple validation (replace with actual registration logic)
    if (username && email && password) {
        currentUser = { username, email, role: selectedRole };
        showDashboard(selectedRole);
    } else {
        alert('Please fill all fields');
    }
}

// Enhanced dashboard display with smooth transitions
function showDashboard(role) {
    // Fade out login container
    document.getElementById('loginContainer').style.opacity = '0';
    document.getElementById('loginContainer').style.transform = 'scale(0.9)';
    
    setTimeout(() => {
        document.getElementById('loginContainer').style.display = 'none';
        
        // Show appropriate dashboard with entrance animation
        if (role === 'tourist') {
            document.getElementById('touristDashboard').classList.add('active');
            showNotification(`Welcome to SafeGuard Explorer, ${currentUser.username}!`, 'success');
        } else if (role === 'police') {
            document.getElementById('policeDashboard').classList.add('active');
            showNotification(`Guardian ${currentUser.username} is now on duty!`, 'success');
        }
    }, 800);
}

// Enhanced logout with confirmation and smooth transitions
function logout() {
    // Show confirmation with custom styling
    if (confirm('Are you sure you want to logout from SafeGuard Explorer?')) {
        // Fade out dashboard
        const activeDashboard = document.querySelector('.dashboard.active');
        if (activeDashboard) {
            activeDashboard.style.opacity = '0';
            activeDashboard.style.transform = 'scale(0.95)';
        }
        
        setTimeout(() => {
            currentUser = null;
            selectedRole = '';
            
            // Hide all dashboards
            document.getElementById('touristDashboard').classList.remove('active');
            document.getElementById('policeDashboard').classList.remove('active');
            
            // Reset login container
            document.getElementById('loginContainer').style.display = 'block';
            document.getElementById('loginContainer').style.opacity = '';
            document.getElementById('loginContainer').style.transform = '';
            document.getElementById('loginContainer').classList.remove('active-login');
            container.classList.remove('active');
            
            // Show role selection with entrance animation
            setTimeout(() => {
                document.getElementById('roleSelection').classList.remove('hidden');
                showNotification('Successfully logged out. See you next time!', 'info');
            }, 300);
            
            // Clear form inputs with animation
            document.querySelectorAll('input').forEach((input, index) => {
                setTimeout(() => {
                    input.style.transform = 'scale(0.95)';
                    setTimeout(() => {
                        input.value = '';
                        input.style.transform = '';
                    }, 100);
                }, index * 50);
            });
            
            // Reset button states
            document.querySelectorAll('.btn').forEach(btn => {
                btn.textContent = btn.textContent.includes('Login') ? 'Login' : 'Register';
                btn.disabled = false;
                btn.style.transform = '';
            });
        }, 800);
    }
}