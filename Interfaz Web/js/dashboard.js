async function cargarDashboard() {
    try {
        const propietarios = await obtenerPropietarios();
        const animales = await apiObtenerAnimales();
        const consultas = await apiObtenerConsultas();

        document.getElementById("totalAnimales").textContent = animales.length;
        document.getElementById("totalPropietarios").textContent = propietarios.length;

        const enTratamiento = animales.filter(animal =>
            animal.estadoAnimal && animal.estadoAnimal.toLowerCase().includes("tratamiento")
        ).length;
        document.getElementById("enTratamiento").textContent = enTratamiento;

        const hoy = new Date().toDateString();
        const consultasHoy = consultas.filter(consulta =>
            new Date(consulta.fechaConsulta).toDateString() === hoy
        );

        document.getElementById("citasHoy").textContent = consultasHoy.length;

        // Pintar la tabla de "Citas de hoy"
        const contenedorCitas = document.querySelector(".contenedor-filas-citas-hoy");
        contenedorCitas.innerHTML = "";

        if (consultasHoy.length === 0) {
            contenedorCitas.innerHTML = `<p class="fila-cita-hoy">No hay citas para hoy</p>`;
        } else {
            consultasHoy.forEach(consulta => {
                const hora = new Date(consulta.fechaConsulta).toLocaleTimeString("es-MX", {
                    hour: "2-digit", minute: "2-digit"
                });
                const nombreAnimal = consulta.animalId?.nombreAnimal ?? "Sin nombre";
                const estadoClase = `estado-fila-cita-hoy-${consulta.estadoConsulta.toLowerCase()}`;

                contenedorCitas.innerHTML += `
                    <div class="contenedor-fila contenedor-fila-cita-hoy">
                        <p class="fila-cita-hoy">${hora}</p>
                        <p class="fila-cita-hoy">${nombreAnimal} - ${consulta.motivo ?? ""}</p>
                        <p class="estado-fila ${estadoClase}">${consulta.estadoConsulta}</p>
                    </div>
                `;
            });
        }

        // Pintar la tabla de "Notificaciones" (usamos las mismas consultas de hoy)
        const contenedorNotif = document.querySelector(".contenedor-filas-notificaciones");
        contenedorNotif.innerHTML = "";

        if (consultasHoy.length === 0) {
            contenedorNotif.innerHTML = `<p class="fila-notificacion">Sin notificaciones</p>`;
        } else {
            consultasHoy.forEach(consulta => {
                const hora = new Date(consulta.fechaConsulta).toLocaleTimeString("es-MX", {
                    hour: "2-digit", minute: "2-digit"
                });
                const nombreAnimal = consulta.animalId?.nombreAnimal ?? "Sin nombre";

                contenedorNotif.innerHTML += `
                    <div class="contenedor-fila contenedor-fila-notificacion">
                        <p class="fila-notificacion">${hora}</p>
                        <p class="fila-notificacion">${nombreAnimal} - ${consulta.motivo ?? ""}</p>
                    </div>
                `;
            });
        }

    } catch (error) {
        console.log(error);
    }
    const opciones = { weekday: "long", day: "numeric", month: "long", year: "numeric" };
const fechaFormateada = new Date().toLocaleDateString("es-MX", opciones);
document.getElementById("fechaHoy").textContent =
    fechaFormateada.charAt(0).toUpperCase() + fechaFormateada.slice(1);
}

cargarDashboard();

// Mostrar el nombre del usuario que inició sesión
const nombreUsuario = localStorage.getItem("nombreUsuario");
if (nombreUsuario) {
    document.getElementById("bienvenidaNombre").textContent = `¡Bienvenido, ${nombreUsuario}!`;
}