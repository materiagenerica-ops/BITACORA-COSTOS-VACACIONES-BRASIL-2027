// Importar Firebase Realtime Database SDK
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getDatabase, ref, set, get, push, onValue, remove, update } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-database.js";

// Configuración Firebase
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
    const iframe = document.getElementById("content-iframe");

    // Comprobar sesión guardada
    if (localStorage.getItem("brasil_session") === "active") {
        activateDashboard();
    }

    // Evento de Login
    if (loginForm) {
        loginForm.addEventListener("submit", (e) => {
            e.preventDefault();
            const userInput = document.getElementById("username").value.trim();
            const passInput = document.getElementById("password").value.trim();

            if (userInput === VALID_USER && passInput === VALID_PASS) {
                localStorage.setItem("brasil_session", "active");
                if (loginError) loginError.classList.add("hidden");
                activateDashboard();
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
            if (centralView) centralView.classList.add("hidden");
            if (loginView) loginView.classList.remove("hidden");
            if (loginForm) loginForm.reset();
        });
    }

    // Manejo de botones de la barra inferior con delegación de eventos limpia
    const navButtons = document.querySelectorAll(".nav-btn");
    navButtons.forEach(btn => {
        btn.addEventListener("click", () => {
            const page = btn.getAttribute("data-page");
            if (iframe && page) {
                iframe.src = page;
            }
            // Actualizar estilos activos
            navButtons.forEach(b => {
                b.classList.remove("bg-brasil-blue/80", "border-blue-400/50", "shadow-lg");
                b.classList.add("bg-slate-800/60");
            });
            btn.classList.remove("bg-slate-800/60");
            btn.classList.add("bg-brasil-blue/80", "border-blue-400/50", "shadow-lg");
        });
    });

    // Exponer herramientas de base de datos globalmente para los submódulos
    window.firebaseDB = { db, ref, set, get, push, onValue, remove, update };
});

function activateDashboard() {
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
