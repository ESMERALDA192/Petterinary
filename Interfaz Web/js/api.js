// =========================================
// CONFIGURACIÓN
// =========================================
//AQUI CAMBIEN POR LO DEL VERCEL PERO POR AHORA FUNCIONA EN LOCALHOST
const API = "https://api-petterinary.vercel.app/api";

// =========================================
// PROPIETARIOS
// =========================================

// Obtener todos
async function obtenerPropietarios() {

    const respuesta = await fetch(`${API}/propietarios`);

    if (!respuesta.ok) {
        throw new Error("Error al obtener propietarios");
    }

    return await respuesta.json();
}

// Obtener uno
async function obtenerPropietario(id) {

    const respuesta = await fetch(`${API}/propietarios/${id}`);

    if (!respuesta.ok) {
        throw new Error("Propietario no encontrado");
    }

    return await respuesta.json();
}

// Registrar
async function agregarPropietario(propietario) {

    const respuesta = await fetch(`${API}/propietarios`, {

        method: "POST",

        headers: {
            "Content-Type": "application/json"
        },

        body: JSON.stringify(propietario)

    });

    if (!respuesta.ok) {
        throw new Error("Error al registrar propietario");
    }

    return await respuesta.json();
}

// Editar
async function editarPropietario(id, propietario) {

    const respuesta = await fetch(`${API}/propietarios/${id}`, {

        method: "PUT",

        headers: {
            "Content-Type": "application/json"
        },

        body: JSON.stringify(propietario)

    });

    if (!respuesta.ok) {
        throw new Error("Error al actualizar propietario");
    }

    return await respuesta.json();
}

// Eliminar
async function eliminarPropietario(id) {

    const respuesta = await fetch(`${API}/propietarios/${id}`, {

        method: "DELETE"

    });

    if (!respuesta.ok) {
        throw new Error("Error al eliminar propietario");
    }

    return await respuesta.json();
}


//============================
// ANIMALES
//============================

async function apiObtenerAnimales(){

    const respuesta = await fetch(`${API}/animales`);

    if(!respuesta.ok){

        throw new Error("No se pudieron obtener los animales");

    }

    return await respuesta.json();

}

async function apiObtenerAnimal(id){

    const respuesta = await fetch(`${API}/animales/${id}`);

    if(!respuesta.ok){

        throw new Error("Animal no encontrado");

    }

    return await respuesta.json();

}

async function apiAgregarAnimal(animal){

    const respuesta = await fetch(`${API}/animales`,{

        method:"POST",

        headers:{
            "Content-Type":"application/json"
        },

        body:JSON.stringify(animal)

    });

    if(!respuesta.ok){

        throw new Error("Error al registrar animal");

    }

    return await respuesta.json();

}

async function apiActualizarAnimal(id,animal){

    const respuesta = await fetch(`${API}/animales/${id}`,{

        method:"PUT",

        headers:{
            "Content-Type":"application/json"
        },

        body:JSON.stringify(animal)

    });

    if(!respuesta.ok){

        throw new Error("Error al actualizar animal");

    }

    return await respuesta.json();

}

async function apiEliminarAnimal(id){

    const respuesta = await fetch(`${API}/animales/${id}`,{

        method:"DELETE"

    });

    if(!respuesta.ok){

        throw new Error("Error al eliminar");

    }

    return await respuesta.json();

}


//============================
// CONSULTAS
//============================

async function apiObtenerConsultas(){

    const respuesta = await fetch(`${API}/consultas`);

    if(!respuesta.ok){

        throw new Error("No se pudieron obtener las consultas");

    }

    return await respuesta.json();

}

async function apiObtenerConsulta(id){

    const respuesta = await fetch(`${API}/consultas/${id}`);

    if(!respuesta.ok){

        throw new Error("Consulta no encontrada");

    }

    return await respuesta.json();

}

async function apiAgregarConsulta(consulta){

    const respuesta = await fetch(`${API}/consultas`,{

        method:"POST",

        headers:{
            "Content-Type":"application/json"
        },

        body:JSON.stringify(consulta)

    });

    if(!respuesta.ok){

        throw new Error("Error al registrar consulta");

    }

    return await respuesta.json();

}

async function apiActualizarConsulta(id,consulta){

    const respuesta = await fetch(`${API}/consultas/${id}`,{

        method:"PUT",

        headers:{
            "Content-Type":"application/json"
        },

        body:JSON.stringify(consulta)

    });

    if(!respuesta.ok){

        throw new Error("Error al actualizar consulta");

    }

    return await respuesta.json();

}

async function apiEliminarConsulta(id){

    const respuesta = await fetch(`${API}/consultas/${id}`,{

        method:"DELETE"

    });

    if(!respuesta.ok){

        throw new Error("Error al eliminar consulta");

    }

    return await respuesta.json();

}