// Importar Firebase Realtime Database SDK
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getDatabase, ref, set, get, push, onValue, remove, update } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-database.js";

// Configuración de Firebase
const firebaseConfig = {
  apiKey: "AIzaSyDGFHR5hzOFtg7wnM2DGJfBTxPp-h8vyp0",
  authDomain: "bitacora-costos-brasil.firebaseapp.com",
  projectId: "bitacora-costos-brasil",
  storageBucket: "bitacora-costos-brasil.firebasestorage.app",
  messagingSenderId: "558877802256",
  appId: "1:558877802256:web:580e6a100a17b0ba062f95"
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

const VALID_USER = "DRPEREYRA";
const VALID_PASS = "235689";

document.addEventListener("DOMContentLoaded", () => {
    const loginForm = document.getElementById("login-form");
    const loginView = document.getElementById("login-view");
    const centralView = document.getElementById("central-view");
    const btnSalir = document.getElementById("btn-salir");
    const loginError = document.getElementById("login-error");

    // Verificar si ya hay sesión activa
    if (localStorage.getItem("brasil_session") === "active") {
        showCentralView();
    }

    if (loginForm) {
        loginForm.addEventListener("submit", (e) => {
            e.preventDefault();
            const userInput = document.getElementById("username").value.trim();
            const passInput = document.getElementById("password").value.trim();

            if (userInput === VALID_USER && passInput === VALID_PASS) {
                localStorage.setItem("brasil_session", "active");
                if (loginError) loginError.classList.add("hidden");
                showCentralView();
            } else {
                if (loginError) loginError.classList.remove("hidden");
                loginForm.classList.add("animate-pulse");
                setTimeout(() => loginForm.classList.remove("animate-pulse"), 500);
            }
        });
    }

    if (btnSalir) {
        btnSalir.addEventListener("click", () => {
            localStorage.removeItem("brasil_session");
            if (centralView) centralView.classList.add("hidden");
            if (loginView) loginView.classList.remove("hidden");
            if (loginForm) loginForm.reset();
        });
    }

    // Función de navegación por iframe segura
    window.loadModule = function(page, btnElement) {
        const iframe = document.getElementById("content-iframe");
        if (iframe) {
            iframe.src = page;
        }
        document.querySelectorAll(".nav-btn").forEach(b => {
            b.classList.remove("bg-brasil-blue/80", "border-blue-400/50", "shadow-lg");
            b.classList.add("bg-slate-800/60");
        });
        if (btnElement) {
            btnElement.classList.remove("bg-slate-800/60");
            btnElement.classList.add("bg-brasil-blue/80", "border-blue-400/50", "shadow-lg");
        }
    };

    window.firebaseDB = { db, ref, set, get, push, onValue, remove, update };
});

function showCentralView() {
    const loginView = document.getElementById("login-view");
    const centralView = document.getElementById("central-view");
    
    if (loginView) {
        loginView.style.display = "none";
        loginView.classList.add("hidden");
    }
    if (centralView) {
        centralView.style.display = "flex";
        centralView.classList.remove("hidden");
    }
}
