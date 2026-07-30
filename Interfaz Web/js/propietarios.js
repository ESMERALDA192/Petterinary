// =========================================
// ELEMENTOS
// =========================================

const btnRegistrar = document.querySelector(".btn-registrar");
const btnBuscar = document.getElementById("btnBuscar");
const txtBuscar = document.getElementById("buscar");
const tabla = document.getElementById("tablaPropietarios");

// =========================================
// INICIO
// =========================================

cargarPropietarios();

btnRegistrar.addEventListener("click", () => {
    window.location.href = "registrarPropietario.html";
});

btnBuscar.addEventListener("click", buscarPropietario);

// =========================================
// CARGAR PROPIETARIOS
// =========================================

async function cargarPropietarios() {

    try {

        const propietarios = await obtenerPropietarios();

        mostrarTabla(propietarios);

    } catch (error) {

        console.error(error);

        alert("No se pudieron cargar los propietarios.");

    }

}

// =========================================
// MOSTRAR TABLA
// =========================================

function mostrarTabla(propietarios) {

    tabla.innerHTML = "";

    propietarios.forEach(propietario => {

        tabla.innerHTML += `
        <tr>

            <td>${propietario.nombrePropietario}</td>
            <td>${propietario.apellidosPropietario}</td>
            <td>${propietario.telPropietario}</td>
            <td>${propietario.emailPropietario}</td>
            <td>${propietario.direccionPropietario}</td>

            <td>

                <button class="btnEditar"
                        data-id="${propietario._id}">
                    Editar
                </button>

                <button class="btnEliminar"
                        data-id="${propietario._id}">
                    Eliminar
                </button>

            </td>

        </tr>
        `;

    });

    document.querySelectorAll(".btnEditar").forEach(boton => {

        boton.addEventListener("click", editarPropietario);

    });

    document.querySelectorAll(".btnEliminar").forEach(boton => {

        boton.addEventListener("click", eliminarPropietarioTabla);

    });

}

// =========================================
// BUSCAR
// =========================================

async function buscarPropietario() {

    try {

        const texto = txtBuscar.value.trim().toLowerCase();

        const propietarios = await obtenerPropietarios();

        if (texto === "") {

            mostrarTabla(propietarios);
            return;

        }

        const resultado = propietarios.filter(propietario =>

            propietario.nombrePropietario.toLowerCase().includes(texto) ||

            propietario.apellidosPropietario.toLowerCase().includes(texto)

        );

        mostrarTabla(resultado);

    } catch (error) {

        console.error(error);

    }

}

// =========================================
// EDITAR
// =========================================

function editarPropietario(e) {

    const id = e.target.dataset.id;

    window.location.href = `registrarPropietario.html?id=${id}`;

}

// =========================================
// ELIMINAR
// =========================================

async function eliminarPropietarioTabla(e) {

    const id = e.target.dataset.id;

    if (!confirm("¿Desea eliminar este propietario?")) return;

    try {

        await eliminarPropietario(id);

        alert("Propietario eliminado correctamente.");

        cargarPropietarios();

    } catch (error) {

        console.error(error);

        alert("No se pudo eliminar.");

    }

}

// =========================================
// FECHA
// =========================================

const opciones = {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric"
};

const fechaFormateada = new Date().toLocaleDateString("es-MX", opciones);

const fechaHoy = document.getElementById("fechaHoy");

if (fechaHoy) {

    fechaHoy.textContent =
        fechaFormateada.charAt(0).toUpperCase() +
        fechaFormateada.slice(1);

}