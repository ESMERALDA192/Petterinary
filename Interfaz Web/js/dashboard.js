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
        const citasHoy = consultas.filter(consulta =>
            new Date(consulta.fechaConsulta).toDateString() === hoy
        ).length;
        document.getElementById("citasHoy").textContent = citasHoy;

    } catch (error) {
        console.log(error);
    }
}

cargarDashboard();

// Mostrar el nombre del usuario que inició sesión
const nombreUsuario = localStorage.getItem("nombreUsuario");
if (nombreUsuario) {
    document.getElementById("bienvenidaNombre").textContent = `¡Bienvenido, ${nombreUsuario}!`;
}