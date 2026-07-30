
const tabla = document.getElementById("tablaConsultas");
const btnRegistrar = document.querySelector(".btn-registrar");

const btnBuscar = document.getElementById("btnBuscar");
const txtBuscar = document.getElementById("buscar");

btnBuscar.addEventListener("click", buscarConsulta);

btnRegistrar.addEventListener("click", () => {
    window.location.href = "registrarConsulta.html";
});

cargarConsultas();

function mostrarTabla(consultas) {

    tabla.innerHTML = "";

    consultas.forEach(consulta => {

        tabla.innerHTML += `
        <tr>

            <td>${consulta.animalId?.nombreAnimal ?? ""}</td>

            <td>
                ${consulta.animalId?.propietarioId?.nombrePropietario ?? ""}
                ${consulta.animalId?.propietarioId?.apellidosPropietario ?? ""}
            </td>

            <td>${new Date(consulta.fechaConsulta).toLocaleDateString()}</td>

            <td>${consulta.motivo}</td>

            <td>${consulta.diagnostico}</td>

            <td>${consulta.tratamiento}</td>

            <td>${consulta.pesoConsulta} kg</td>

            <td>${consulta.estadoConsulta}</td>

            <td>

                <button class="btnEditar"
                    data-id="${consulta._id}">
                    Editar
                </button>

                <button class="btnEliminar"
                    data-id="${consulta._id}">
                    Eliminar
                </button>

            </td>

        </tr>
        `;

    });

    document.querySelectorAll(".btnEditar").forEach(boton => {

        boton.addEventListener("click", editarConsulta);

    });

    document.querySelectorAll(".btnEliminar").forEach(boton => {

        boton.addEventListener("click", eliminarConsulta);

    });

}

async function cargarConsultas() {

    try {

        const consultas = await apiObtenerConsultas();

        mostrarTabla(consultas);

    } catch (error) {

        console.log(error);

        alert(error.message);

    }

}

async function buscarConsulta() {

    try {

        const texto = txtBuscar.value.trim().toLowerCase();

        const consultas = await apiObtenerConsultas();

        if (texto === "") {

            mostrarTabla(consultas);
            return;

        }

        const resultado = consultas.filter(consulta => {

            const nombreAnimal =
                consulta.animalId?.nombreAnimal?.toLowerCase() || "";

            const nombrePropietario =
                consulta.animalId?.propietarioId?.nombrePropietario?.toLowerCase() || "";

            const apellidoPropietario =
                consulta.animalId?.propietarioId?.apellidosPropietario?.toLowerCase() || "";

            return nombreAnimal.includes(texto) ||
                   nombrePropietario.includes(texto) ||
                   apellidoPropietario.includes(texto);

        });

        mostrarTabla(resultado);

    } catch (error) {

        console.log(error);

    }

}

function editarConsulta(e){

    const id = e.target.dataset.id;

    window.location.href = `registrarConsulta.html?id=${id}`;

}

async function eliminarConsulta(e){

    const id = e.target.dataset.id;

    if(!confirm("¿Eliminar consulta?")){

        return;

    }

    try{

        await apiEliminarConsulta(id);

        alert("Consulta eliminada");

        cargarConsultas();

    }catch(error){

        alert(error.message);

    }

}


const opciones = { weekday: "long", day: "numeric", month: "long", year: "numeric" };
const fechaFormateada = new Date().toLocaleDateString("es-MX", opciones);
document.getElementById("fechaHoy").textContent =
    fechaFormateada.charAt(0).toUpperCase() + fechaFormateada.slice(1);