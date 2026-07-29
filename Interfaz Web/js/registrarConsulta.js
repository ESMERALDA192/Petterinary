
const formulario = document.getElementById("formConsultas");

const parametros = new URLSearchParams(window.location.search);

const idEditar = parametros.get("id");

if(idEditar){

    document.querySelector("legend").textContent="Editar consulta";

    document.querySelector(".boton-registro").value="Guardar cambios";

    cargarConsulta();

}

formulario.addEventListener("submit",guardar);

cargarAnimales();

async function guardar(e){

    e.preventDefault();

    const consulta={

        animalId:document.getElementById("animalId").value,

        fechaConsulta:document.getElementById("fechaConsulta").value,

        motivo:document.getElementById("motivo").value.trim(),

        diagnostico:document.getElementById("diagnostico").value.trim(),

        tratamiento:document.getElementById("tratamiento").value.trim(),

        pesoConsulta:Number(document.getElementById("pesoConsulta").value),

        estadoConsulta:document.getElementById("estadoConsulta").value

    };

    if(!validarFormulario(consulta)){

        return;

    }

    try{

        if(idEditar){

            await apiActualizarConsulta(idEditar,consulta);

            alert("Consulta actualizada");

        }else{

            await apiAgregarConsulta(consulta);

            alert("Consulta registrada");

        }

        window.location.href="consultas.html";

    }catch(error){

        alert(error.message);

    }

}

async function cargarConsulta(){

    try{

        const consulta=await apiObtenerConsulta(idEditar);

        document.getElementById("animalId").value=consulta.animalId._id;

        document.getElementById("fechaConsulta").value=
            consulta.fechaConsulta.substring(0,16);

        document.getElementById("motivo").value=consulta.motivo;

        document.getElementById("diagnostico").value=consulta.diagnostico;

        document.getElementById("tratamiento").value=consulta.tratamiento;

        document.getElementById("pesoConsulta").value=consulta.pesoConsulta;

        document.getElementById("estadoConsulta").value=consulta.estadoConsulta;

    }catch(error){

        alert(error.message);

    }

}

async function cargarAnimales(){

    try{

        const animales=await apiObtenerAnimales();

        const select=document.getElementById("animalId");

        select.innerHTML="";

        animales.forEach(animal=>{

            select.innerHTML+=`

                <option value="${animal._id}">
                    ${animal.nombreAnimal}
                </option>

            `;

        });

    }catch(error){

        alert("No se pudieron cargar los animales");

    }

}

function validarFormulario(consulta){

    if(

        consulta.animalId==="" ||

        consulta.fechaConsulta===""

    ){

        alert("Complete los campos obligatorios");

        return false;

    }

    return true;

}