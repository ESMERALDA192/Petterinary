const formulario = document.getElementById("formRegistro");

formulario.addEventListener("submit", async (e) => {
    e.preventDefault();

    const usuario = {
        nombre: document.getElementById("nombre").value.trim(),
        apellidos: document.getElementById("apellidos").value.trim(),
        usuario: document.getElementById("usuario").value.trim(),
        correo: document.getElementById("correo").value.trim(),
        password: document.getElementById("password").value
    };

    try {
        const respuesta = await fetch(`${API}/auth/registro`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(usuario)
        });

        const datos = await respuesta.json();

        if (!respuesta.ok) {
            throw new Error(datos.mensaje || "Error al registrar");
        }

        alert("Cuenta creada correctamente. Ahora inicia sesión.");
        window.location.href = "index.html";

    } catch (error) {
        alert(error.message);
    }
});