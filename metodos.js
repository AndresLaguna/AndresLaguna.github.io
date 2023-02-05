
// se realiza el comando para los diferentes selectores (ciudad, pais, mapa, datos de temperatura)
const resultado = document.querySelector('.resultado');           
const formulario = document.querySelector('.obtener-clima');
const nombreCiudad = document.querySelector('#ciudad');
const nombrePais = document.querySelector('#pais');
const mapa = document.querySelector('#mapa');

// con este comando se evita que el boton "buscar clima" repita la orden de busqueda
formulario.addEventListener('submit', (e) => {
    e.preventDefault();

//se condiciona la app para exigir el ingreso de los dos campos al realizar una consulta
    if (nombreCiudad.value === '' || nombrePais.value === '') {
        mostrarError('Ambos campos son obligatorios...');
        return;
    }

    llamarApi(nombreCiudad.value, nombrePais.value);
    //console.log(nameCity.value);
    //console.log(nameCountry.value);
})

//se llaman los servicios de pais y ciudad desde la API
function llamarApi(ciudad, pais){
    const apiId = '41d1d7f5c2475b3a16167b30bc4f265c';
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${ciudad},${pais}&appid=${apiId}`;

//Se realiza la condicional para el campo de "cuidad" en el caso en que la ciudad ingresada no se encuentre
    fetch(url)
        .then(data => {
            return data.json();
        })
        .then(dataJSON => {
            if (dataJSON.cod === '404') {
                mostrarError('Ciudad no encontrada...');
            } else {
                limpiarHTML();
                mostrarClima(dataJSON);
            }
            console.log(dataJSON);
        })
        .catch(error => {
            console.log(error);
        })
}

//con esta funcion se extrae del servicio de API los recursos requeridos (temp actual, temp minima, temp maxima, latitud y longitud)
function mostrarClima(data){
    const {name, main:{temp, temp_min, temp_max}, weather:[arr] , coord:{lat, lon}} = data;

    //estas son las variables para almacenar los recursos requeridos
    const grados = kelvinACentigrados(temp);
    const minimo = kelvinACentigrados(temp_min);
    const maximo = kelvinACentigrados(temp_max);
    const latitud = lat;
    const longitud = lon;

    //estas lineas de codigo ocultan la informacion de temperatura y el mapa de google y lo refleja una vez el usuario indica una busqueda
    const contenido = document.createElement('div');
    contenido.innerHTML = `
        <h5>Clima en ${name}</h5>
        <img src="https://openweathermap.org/img/wn/${arr.icon}@2x.png" alt="icon">
        <h2>${grados}°C</h2>
        <p>Max: ${maximo}°C</p>
        <p>Min: ${minimo}°C</p>
        
    `;
    actualizarMapa(latitud, longitud)
    resultado.appendChild(contenido);

}

//esta funcion da las coordenadas al mapa de google para que ubique la cuidad que se esta consultando
function actualizarMapa(latitud, longitud){
    var coordenadas = {lat:latitud ,lng: longitud};
    var mapaGoogle = new google.maps.Map(mapa,{
      zoom: 10,
      center: coordenadas
    });
    var marker = new google.maps.Marker({
      position: coordenadas,
      map: mapaGoogle
    });
 //Esta linea muestra el mapa
    mapa.style.display = 'block';
   
}

function mostrarError(mensaje){
    //console.log(message);
    const alerta = document.createElement('p');
    alerta.classList.add('alerta-mensaje');
    alerta.innerHTML = mensaje;

    form.appendChild(alerta);
    setTimeout(() => {
        alerta.remove();
    }, 3000);
}

// convierte la informacion de grados kelvin a grados centigrados
function kelvinACentigrados(temporal){
    return parseInt(temporal - 273.15);
}

// realiza una limpieza de la web una vez se solicita una nueva busqueda
function limpiarHTML(){
    resultado.innerHTML = '';
}
