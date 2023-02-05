
//Inicar mapa de manera oculta con estas coordenadas

function iniciarMapa(){
    var coordenadas = {lat:-34.5956145 ,lng: -58.4431949};
    var mapa = new google.maps.Map(document.getElementById('mapa'),{
      zoom: 10,
      center: coordenadas
    });
    var marker = new google.maps.Marker({
      position: coordenadas,
      map: mapa
    });
}