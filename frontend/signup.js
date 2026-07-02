// ================================
// Signup JavaScript
// ================================

// Get HTML Elements
const signupForm = document.getElementById("signupForm");
const nameInput = document.getElementById("name");
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const message = document.getElementById("message");
const togglePassword = document.getElementById("togglePassword");

// ====================================
// Show Success / Error Message
// ====================================

function showMessage(text, color) {
    message.textContent = text;
    message.style.color = color;
}

// ====================================
// Show / Hide Password
// ====================================

togglePassword.addEventListener("click", () => {

    if (passwordInput.type === "password") {

        passwordInput.type = "text";
        togglePassword.classList.remove("fa-eye");
        togglePassword.classList.add("fa-eye-slash");

    } else {

        passwordInput.type = "password";
        togglePassword.classList.remove("fa-eye-slash");
        togglePassword.classList.add("fa-eye");

    }

});

// ====================================
// Register User
// ====================================

signupForm.addEventListener("submit", async (e) => {

    e.preventDefault();

    const name = nameInput.value.trim();
    const email = emailInput.value.trim();
    const password = passwordInput.value.trim();

    try {

        showMessage("Creating account...", "white");

        const response = await fetch("http://localhost:5000/api/auth/signup", {

            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({
                name,
                email,
                password
            })

        });

        const data = await response.json();

        if (response.ok) {

            showMessage("Account Created Successfully ✅", "lightgreen");

            // Redirect after 2 seconds
            setTimeout(() => {

                window.location.href = "login.html";

            }, 2000);

        } else {

            showMessage(data.message, "#ff4d4d");

        }

    } catch (error) {

        console.error(error);

        showMessage("Server Error!", "#ff4d4d");

    }

});