// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase.app.js";
import { getDatabase, ref, set, get, push, onValue, remove, update } from "https://www.gstatic.com/firebasejs/10.8.0/firebase.database.js";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDGFHR5hzOFtg7wnM2DGJfBTxPp-h8vyp0",
  authDomain: "bitacora-costos-brasil.firebaseapp.com",
  projectId: "bitacora-costos-brasil",
  storageBucket: "bitacora-costos-brasil.firebasestorage.app",
  messagingSenderId: "558877802256",
  appId: "1:558877802256:web:580e6a100a17b0ba062f95"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

// Credenciales permitidas
const VALID_USER = "DRPEREYRA";
const VALID_PASS = "235689";

document.addEventListener("DOMContentLoaded", () => {
    const loginForm = document.getElementById("login-form");
    const loginView = document.getElementById("login-view");
    const centralView = document.getElementById("central-view");
    const btnSalir = document.getElementById("btn-salir");
    const loginError = document.getElementById("login-error");

    // Verificar si ya hay sesión iniciada en localStorage
    if (localStorage.getItem("brasil_session") === "active") {
        showCentralView();
    }

    // Lógica de Login
    if (loginForm) {
        loginForm.addEventListener("submit", (e) => {
            e.preventDefault();
            const user = document.getElementById("username").value.trim();
            const pass = document.getElementById("password").value.trim();

            if (user === VALID_USER && pass === VALID_PASS) {
                localStorage.setItem("brasil_session", "active");
                loginError.classList.add("hidden");
                showCentralView();
            } else {
                loginError.classList.remove("hidden");
                // Efecto shake en error
                loginForm.classList.add("animate-pulse");
                setTimeout(() => loginForm.classList.remove("animate-pulse"), 500);
            }
        });
    }

    // Botón Salir
    if (btnSalir) {
        btnSalir.addEventListener("click", () => {
            localStorage.removeItem("brasil_session");
            centralView.classList.add("hidden");
            loginView.classList.remove("hidden");
            document.getElementById("login-form").reset();
        });
    }

    // Exponer funciones globales para la navegación por iframe y sincronización con Firebase
    window.loadModule = function(page, btnElement) {
        const iframe = document.getElementById("content-iframe");
        if (iframe) {
            iframe.src = page;
        }
        // Actualizar estilos activos de los botones del menú
        document.querySelectorAll(".nav-btn").forEach(b => {
            b.classList.remove("bg-brasil-blue/80", "border-blue-400/50", "shadow-lg");
            b.classList.add("bg-slate-800/60");
        });
        if (btnElement) {
            btnElement.classList.remove("bg-slate-800/60");
            btnElement.classList.add("bg-brasil-blue/80", "border-blue-400/50", "shadow-lg");
        }
    };

    // Exportar herramientas de Firebase para uso en los submódulos si fuera necesario
    window.firebaseDB = {
        db,
        ref,
        set,
        get,
        push,
        onValue,
        remove,
        update
    };
});

function showCentralView() {
    document.getElementById("login-view").classList.add("hidden");
    document.getElementById("central-view").classList.remove("hidden");
}
