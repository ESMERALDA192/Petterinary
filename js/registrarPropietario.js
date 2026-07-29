const formulario = document.getElementById("formPropietarios");



// Obtener el id de la URL si existe
const parametros = new URLSearchParams(window.location.search);
const idEditar = parametros.get("id");

// Si existe un id, estamos editando
if (idEditar) {

    document.querySelector("legend").textContent = "Editar propietario";
    document.querySelector(".boton-registro").value = "Guardar cambios";

    cargarPropietario();

}

// Evento del formulario
formulario.addEventListener("submit", guardar);

//==========================
// Función principal
//==========================

async function guardar(e) {

    e.preventDefault();

    const propietario = {

        nombrePropietario: document.getElementById("nombrePropietario").value.trim(),

        apellidosPropietario: document.getElementById("apellidosPropietario").value.trim(),

        telPropietario: document.getElementById("telPropietario").value.trim(),

        emailPropietario: document.getElementById("emailPropietario").value.trim(),

        direccionPropietario: document.getElementById("direccionPropietario").value.trim()

    };

    // Validación
    if (!validarFormulario(propietario)) {
        return;
    }

    if (idEditar) {

        await actualizarPropietario(propietario);

    } else {

        await guardarPropietario(propietario);

    }

}

//==========================
// Registrar
//==========================
async function guardarPropietario(propietario){

    try{

        await agregarPropietario(propietario);

        alert("Propietario registrado correctamente.");

        formulario.reset();

        window.location.href="propietarios.html";

    }catch(error){

        console.log(error);

        alert(error.message);

    }

}

//==========================
// Editar
//==========================
async function actualizarPropietario(propietario){

    try{

        await editarPropietario(idEditar, propietario);

        alert("Propietario actualizado correctamente.");

        window.location.href="propietarios.html";

    }catch(error){

        console.log(error);

        alert(error.message);

    }

}

//==========================
// Cargar propietario
//==========================

async function cargarPropietario(){

    try{

        const propietario = await obtenerPropietario(idEditar);

        document.getElementById("nombrePropietario").value=propietario.nombrePropietario;
        document.getElementById("apellidosPropietario").value=propietario.apellidosPropietario;
        document.getElementById("telPropietario").value=propietario.telPropietario;
        document.getElementById("emailPropietario").value=propietario.emailPropietario;
        document.getElementById("direccionPropietario").value=propietario.direccionPropietario;

    }catch(error){

        console.log(error);

    }

}

//==========================
// Validaciones
//==========================

function validarFormulario(propietario) {

    if (
        propietario.nombrePropietario === "" ||
        propietario.apellidosPropietario === "" ||
        propietario.telPropietario === "" ||
        propietario.emailPropietario === "" ||
        propietario.direccionPropietario === ""
    ) {

        alert("Todos los campos son obligatorios.");

        return false;

    }

    const expresionCorreo = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!expresionCorreo.test(propietario.emailPropietario)) {

        alert("Correo electrónico inválido.");

        return false;

    }

    if (!/^[0-9]{10}$/.test(propietario.telPropietario)) {

        alert("El teléfono debe tener exactamente 10 dígitos.");

        return false;

    }

    return true;

}