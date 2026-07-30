const tabla=document.getElementById("tablaAnimales");

const btnRegistrar=document.querySelector(".btn-registrar");

btnRegistrar.addEventListener("click",()=>{

    window.location.href="registrarAnimal.html";

});

cargarAnimales();

async function cargarAnimales(){

    try{

        const animales=await apiObtenerAnimales();

        tabla.innerHTML="";

        animales.forEach(animal=>{

            tabla.innerHTML+=`

            <tr>

                <td>${animal._id}</td>

                <td>${animal.nombreAnimal}</td>

                <td>${animal.propietarioId?.nombrePropietario ?? "Sin propietario"}</td>


                <td>${animal.especieAnimal}</td>

                <td>${animal.sexoAnimal}</td>

                <td>${animal.razaAnimal}</td>

                <td>${animal.pesoAnimal}</td>

                <td>${new Date(animal.fechaIngresoAnimal).toLocaleDateString()}</td>

                <td>${animal.estadoAnimal}</td>

                <td>

                    <button class="btnEditar"

                    data-id="${animal._id}">

                    Editar

                    </button>

                    <button class="btnEliminar"

                    data-id="${animal._id}">

                    Eliminar

                    </button>

                </td>

            </tr>

            `;

        });

        document.querySelectorAll(".btnEditar").forEach(boton=>{

            boton.addEventListener("click",editarAnimal);

        });

        document.querySelectorAll(".btnEliminar").forEach(boton=>{

            boton.addEventListener("click",eliminarAnimalTabla);

        });

    }

    catch(error){

        console.log(error);

    }

}

function editarAnimal(e){

    const id=e.target.dataset.id;

    window.location.href=`registrarAnimal.html?id=${id}`;

}

async function eliminarAnimalTabla(e){

    const id=e.target.dataset.id;

    if(!confirm("¿Eliminar animal?")){

        return;

    }

    await apiEliminarAnimal(id);

    alert("Animal eliminado");

    cargarAnimales();

}

const opciones = { weekday: "long", day: "numeric", month: "long", year: "numeric" };
const fechaFormateada = new Date().toLocaleDateString("es-MX", opciones);
document.getElementById("fechaHoy").textContent =
    fechaFormateada.charAt(0).toUpperCase() + fechaFormateada.slice(1);
