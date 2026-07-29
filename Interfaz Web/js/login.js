const formulario = document.getElementById("formLogin");

formulario.addEventListener("submit", async (e) => {
    e.preventDefault();

    const usuario = document.getElementById("usuario").value.trim();
    const password = document.getElementById("password").value;

    try {
        const respuesta = await fetch(`${API}/auth/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ usuario, password })
        });

        const datos = await respuesta.json();

        if (!respuesta.ok) {
            throw new Error(datos.mensaje || "Credenciales incorrectas");
        }

      localStorage.setItem("nombreUsuario", datos.usuario.nombre);
window.location.href = "dashboard.html";

    } catch (error) {
        document.querySelector(".error").classList.remove("hidden");
        document.querySelector(".error").textContent = error.message;
    }
});