// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getDatabase, ref, set, get, push, onValue, remove, update } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-database.js";

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

// Credenciales obligatorias de acceso
const VALID_USER = "DRPEREYRA";
const VALID_PASS = "235689";

document.addEventListener("DOMContentLoaded", () => {
    const loginForm = document.getElementById("login-form");
    const loginView = document.getElementById("login-view");
    const centralView = document.getElementById("central-view");
    const btnSalir = document.getElementById("btn-salir");
    const loginError = document.getElementById("login-error");

    // Verificar si ya hay una sesión activa previa
    if (localStorage.getItem("brasil_session") === "active") {
        showCentralDashboard();
    }

    // Lógica del Login
    if (loginForm) {
        loginForm.addEventListener("submit", (e) => {
            e.preventDefault();
            const userInput = document.getElementById("username").value.trim();
            const passInput = document.getElementById("password").value.trim();

            if (userInput === VALID_USER && passInput === VALID_PASS) {
                localStorage.setItem("brasil_session", "active");
                if (loginError) loginError.classList.add("hidden");
                showCentralDashboard();
            } else {
                if (loginError) loginError.classList.remove("hidden");
                loginForm.classList.add("animate-pulse");
                setTimeout(() => loginForm.classList.remove("animate-pulse"), 500);
            }
        });
    }

    // Botón Salir
    if (btnSalir) {
        btnSalir.addEventListener("click", () => {
            localStorage.removeItem("brasil_session");
            if (centralView) {
                centralView.classList.add("hidden");
                centralView.style.display = "none";
            }
            if (loginView) {
                loginView.classList.remove("hidden");
                loginView.style.display = "flex";
            }
            if (loginForm) loginForm.reset();
        });
    }

    // Navegación interna entre secciones (Menú, Cálculo Final, Combustible, Playa, Hoteles)
    const navButtons = document.querySelectorAll(".nav-btn");
    const sections = document.querySelectorAll(".app-section");

    navButtons.forEach(btn => {
        btn.addEventListener("click", () => {
            const targetId = btn.getAttribute("data-target");

            // Ocultar todas las secciones
            sections.forEach(sec => sec.classList.add("hidden"));

            // Mostrar la sección seleccionada
            const targetSection = document.getElementById(targetId);
            if (targetSection) {
                targetSection.classList.remove("hidden");
            }

            // Actualizar estilos activos de los botones
            navButtons.forEach(b => {
                b.classList.remove("bg-brasil-blue/80", "border-blue-400/50", "shadow-lg");
                b.classList.add("bg-slate-800/70");
            });
            btn.classList.remove("bg-slate-800/70");
            btn.classList.add("bg-brasil-blue/80", "border-blue-400/50", "shadow-lg");
        });
    });

    // Exponer la base de datos y métodos globalmente para los futuros submódulos
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

function showCentralDashboard() {
    const loginView = document.getElementById("login-view");
    const centralView = document.getElementById("central-view");

    if (loginView) {
        loginView.classList.add("hidden");
        loginView.style.display = "none";
    }
    if (centralView) {
        centralView.classList.remove("hidden");
        centralView.style.display = "flex";
    }
}
