
const tabla = document.getElementById("tablaConsultas");
const btnRegistrar = document.querySelector(".btn-registrar");

btnRegistrar.addEventListener("click", () => {
    window.location.href = "registrarConsulta.html";
});

cargarConsultas();

async function cargarConsultas() {

    try {

        const consultas = await apiObtenerConsultas();

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

    } catch (error) {

        console.log(error);

        alert(error.message);

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