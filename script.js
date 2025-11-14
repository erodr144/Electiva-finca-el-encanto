// Cambiar pantalla
function showScreen(id) {
    document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
    document.getElementById(id).classList.add('active');
}

// Ingresar → Ir al menú
document.getElementById("btn-ingresar").addEventListener("click", () => {
    showScreen("screen2");
});

// Navegación por botones con data-screen
document.querySelectorAll("button[data-screen]").forEach(btn => {
    btn.addEventListener("click", () => {
        showScreen(btn.getAttribute("data-screen"));
    });
});

// ======================================
// GENERACIÓN REAL DEL RESUMEN
// ======================================
let reserva = null;

document.getElementById("btn-generar").addEventListener("click", () => {
    const nombre = document.getElementById("res_nombre").value;
    const doc = document.getElementById("res_doc").value;
    const entrada = document.getElementById("res_entrada").value;
    const salida = document.getElementById("res_salida").value;
    const huespedes = document.getElementById("res_huespedes").value;

    if (!nombre || !doc || !entrada || !salida || !huespedes) {
        alert("Por favor llene todos los campos.");
        return;
    }

    // Calcular noches
    const f1 = new Date(entrada);
    const f2 = new Date(salida);
    const noches = Math.ceil((f2 - f1) / (1000 * 60 * 60 * 24));

    if (noches <= 0) {
        alert("La fecha de salida debe ser mayor.");
        return;
    }

    // Precio por noche
    const total = noches * 180000;

    // Crear objeto reserva
    reserva = {
        nombre,
        doc,
        entrada,
        salida,
        huespedes,
        noches,
        total
    };

    // Llenar resumen
    document.getElementById("resumen-contenido").innerHTML = `
        <p><strong>Nombre:</strong> ${nombre}</p>
        <p><strong>Entrada:</strong> ${entrada}</p>
        <p><strong>Salida:</strong> ${salida}</p>
        <p><strong>Huéspedes:</strong> ${huespedes}</p>
        <p><strong>Noches:</strong> ${noches}</p>
        <p><strong>Total:</strong> $${total.toLocaleString()}</p>
    `;

    showScreen("screen8");
});

// ======================================
// BOTÓN PAGAR
// ======================================
document.getElementById("btn-pagar").addEventListener("click", () => {
    if (!reserva) {
        alert("No hay reserva generada.");
        return;
    }
    showScreen("screen9");
});
