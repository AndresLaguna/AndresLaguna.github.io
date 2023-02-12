var nombre = document.getElementById('Nombre');
var apellido = document.getElementById('Apellido');
var Direccion = document.getElementById('Direccion');
var Telefono = document.getElementById('Telefono');
var Correo = document.getElementById('Correo');
document.getElementById('obligatorio');
obligatorio.style.color = 'red';

function enviarFormulario(){
    console.log('enviando formulario...');

    var mensajesError =[]

    if(nombre.value === null || Nombre.value ===''){
        mensajesError.push('Nombre obligatorio');
    }

    if(nombre.value === null || Apellido.value ===''){
        mensajesError.push('Apellido obligatorio');
    }

    if(nombre.value === null || Direccion.value ===''){
        mensajesError.push('Direccion obligatoria');
    }

    if(nombre.value === null || Telefono.value ===''){
        mensajesError.push('Telefono obligatorio');
    }

    if(nombre.value === null || Correo.value ===''){
        mensajesError.push('Correo obligatorio');
    }
            obligatorio.innerHTML = mensajesError.join(', ');

    return false;
}