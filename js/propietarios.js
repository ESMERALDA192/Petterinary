

const btnRegistrar = document.querySelector(".btn-registrar");

async function cargarPropietarios(){

    try{

        const propietarios = await obtenerPropietarios();
        //
        const tabla=document.getElementById("tablaPropietarios");

        tabla.innerHTML="";
        //

        propietarios.forEach(propietario=>{

    tabla.innerHTML += `
    <tr>
        <td>${propietario._id}</td>
        <td>${propietario.nombrePropietario}</td>
        <td>${propietario.apellidosPropietario}</td>
        <td>${propietario.telPropietario}</td>
        <td>${propietario.emailPropietario}</td>
        <td>${propietario.direccionPropietario}</td>

        <td>

            <button class="btnEditar" data-id="${propietario._id}">
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

document.querySelectorAll(".btnEditar").forEach(boton=>{

    boton.addEventListener("click",editarPropietario);

});

    document.querySelectorAll(".btnEliminar").forEach(boton => {

    boton.addEventListener("click", eliminarPropietarioTabla);

});



        console.log(propietarios);

    }catch(error){

        console.log(error);

    }

}


btnRegistrar.addEventListener("click", () => {

    window.location.href = "registrarPropietario.html";

});
cargarPropietarios();

function editarPropietario(e){

    const id=e.target.dataset.id;

    window.location.href=`registrarPropietario.html?id=${id}`;

}


async function eliminarPropietarioTabla(e){

    const id = e.target.dataset.id;

    if(!confirm("¿Desea eliminar este propietario?")){
        return;
    }

    try{

    await eliminarPropietario(id);

    alert("Propietario eliminado");

    cargarPropietarios();

}catch(error){

    console.log(error);

}

}