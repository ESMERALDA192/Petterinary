const btnBuscar = document.getElementById("btnBuscar");
const txtBuscar = document.getElementById("buscar");

btnBuscar.addEventListener("click", buscarAnimal);
function iconoEspecie(especie){
    const mapa = {
        "perro": "fa-solid fa-dog",
        "gato": "fa-solid fa-cat",
        "ave": "fa-solid fa-dove",
        "conejo": "fa-solid fa-rabbit"
    };
    return mapa[especie?.toLowerCase()] || "fa-solid fa-paw";
}

function claseEspecie(especie){
    const claves = ["perro", "gato", "ave", "conejo"];
    const clave = especie?.toLowerCase();
    return claves.includes(clave) ? clave : "otro";
}
const tabla=document.getElementById("tablaAnimales");

const btnRegistrar=document.querySelector(".btn-registrar");

btnRegistrar.addEventListener("click",()=>{

    window.location.href="registrarAnimal.html";

});

async function buscarAnimal() {

    try {

        const texto = txtBuscar.value.trim().toLowerCase();

        const animales = await apiObtenerAnimales();

        if (texto === "") {

            mostrarTabla(animales);
            return;

        }

        const resultado = animales.filter(animal =>

            animal.nombreAnimal.toLowerCase().includes(texto)

        );

        mostrarTabla(resultado);

    } catch (error) {

        console.log(error);

    }

}

cargarAnimales();

async function cargarAnimales(){

    try{

        const animales = await apiObtenerAnimales();

        mostrarTabla(animales);

    }catch(error){

        console.log(error);

    }

}


function mostrarTabla(animales){

    tabla.innerHTML = "";

    animales.forEach(animal => {

        tabla.innerHTML += `

        <tr>

            <td>${animal.nombreAnimal}</td>

            <td>${animal.propietarioId?.nombrePropietario ?? "Sin propietario"}</td>

            <td>
                <span class="fila-especie">
                    <span class="icono-especie ${claseEspecie(animal.especieAnimal)}">
                        <i class="${iconoEspecie(animal.especieAnimal)}"></i>
                    </span>
                    ${animal.especieAnimal}
                </span>
            </td>

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

    document.querySelectorAll(".btnEditar").forEach(boton => {

        boton.addEventListener("click", editarAnimal);

    });

    document.querySelectorAll(".btnEliminar").forEach(boton => {

        boton.addEventListener("click", eliminarAnimalTabla);

    });

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
