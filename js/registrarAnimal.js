const formulario=document.getElementById("formAnimales");

const parametros=new URLSearchParams(window.location.search);

const idEditar=parametros.get("id");

cargarPropietarios();

iniciar();

async function iniciar() {

    await cargarPropietarios();

    if (idEditar) {

        document.querySelector("legend").textContent = "Editar animal";

        document.querySelector(".boton-registro").value = "Guardar cambios";

        await cargarAnimal();

    }

}


if(idEditar){

    document.querySelector("legend").textContent="Editar animal";

    document.querySelector(".boton-registro").value="Guardar cambios";

    cargarAnimal();

}

formulario.addEventListener("submit",guardar);



async function guardar(e){

    e.preventDefault();

    const animal={

        propietarioId:document.getElementById("propietarioId").value,

        nombreAnimal:document.getElementById("nombreAnimal").value,

        especieAnimal:document.getElementById("especieAnimal").value,

        razaAnimal:document.getElementById("razaAnimal").value,

        sexoAnimal:document.getElementById("sexoAnimal").value,

        pesoAnimal:Number(document.getElementById("pesoAnimal").value),

        fechaIngresoAnimal:document.getElementById("fechaIngresoAnimal").value,

        estadoAnimal:document.getElementById("estadoAnimal").value

    };

    if(idEditar){

        await apiActualizarAnimal(idEditar,animal);

        alert("Actualizado");

    }

    else{

        await apiAgregarAnimal(animal);

        alert("Registrado");

    }

    window.location.href="animales.html";

}

async function cargarAnimal(){

    const animal=await apiObtenerAnimal(idEditar);

    document.getElementById("propietarioId").value=animal.propietarioId._id;

    document.getElementById("nombreAnimal").value=animal.nombreAnimal;

    document.getElementById("especieAnimal").value=animal.especieAnimal;

    document.getElementById("razaAnimal").value=animal.razaAnimal;

    document.getElementById("sexoAnimal").value=animal.sexoAnimal;

    document.getElementById("pesoAnimal").value=animal.pesoAnimal;

    document.getElementById("fechaIngresoAnimal").value=
        animal.fechaIngresoAnimal.substring(0,10);

    document.getElementById("estadoAnimal").value=animal.estadoAnimal;

}

async function cargarPropietarios() {

    try {

        const propietarios = await obtenerPropietarios();

        const select = document.getElementById("propietarioId");

        select.innerHTML = `
            <option value="">Seleccione un propietario</option>
        `;

        propietarios.forEach(propietario => {

            select.innerHTML += `
                <option value="${propietario._id}">
                    ${propietario.nombrePropietario} ${propietario.apellidosPropietario}
                </option>
            `;

        });

    } catch (error) {

        console.log(error);

        alert("No se pudieron cargar los propietarios.");

    }

}