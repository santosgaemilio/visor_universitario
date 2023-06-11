// BASE -------------------------------------------------------------------------------------------------------------
var map = L.map('map',{center: [0,0],zoomControl: true}).setView([25.72734478207927, -100.31208170964123], 16);
var base = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 25,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> Próxima',
}).addTo(map);


// MENU IZQ ----------------------------------------------------------------------------------------------------------

// Test side menu
 /* contents */
 const left = `
    <div class="container-fluid">
        <div class="row">
            
            <img src="./imgs/logouanl.png" alt="Logo" class = "img-fluid" id="logo">
           
    </div>
    <br>
   
    <span style="font-family: Arial, Helvetica, sans-serif;" id = "menu">Menú</span>
    <br>
 `;
 let contents = `
    <div class="accordion" id="accordionExample">
    <div class="accordion-item">
    <h2 class="accordion-header" id="headingOne">
        <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
        Campus
        </button>
    </h2>
    <div id="collapseOne" class="accordion-collapse collapse show" aria-labelledby="headingOne" data-bs-parent="#accordionExample">
        <div class="accordion-body">
        
        <div class="form-check form-switch">
        <input class="form-check-input" type="checkbox" role="switch" id="cu" checked>
        <label class="form-check-label" for="flexSwitchCheckDefault">Ciudad Universitaria</label>
        </div>

        <div class="form-check form-switch">
        <input class="form-check-input" type="checkbox" role="switch" id="cca">
        <label class="form-check-label" for="flexSwitchCheckDefault">Campus Ciencias Agropecuarias</label>
        </div>

        <div class="form-check form-switch">
        <input class="form-check-input" type="checkbox" role="switch" id="cs">
        <label class="form-check-label" for="flexSwitchCheckDefault">Campus Ciencias de la Salud</label>
        </div>

        <div class="form-check form-switch">
        <input class="form-check-input" type="checkbox" role="switch" id="cm">
        <label class="form-check-label" for="flexSwitchCheckDefault">Campus Mederos</label>
        </div>
      

        </div>
    </div>
    </div>
    <div class="accordion-item">
    <h2 class="accordion-header" id="headingTwo">
        <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
        Árboles CU
        </button>
    </h2>
    <div id="collapseTwo" class="accordion-collapse collapse" aria-labelledby="headingTwo" data-bs-parent="#accordionExample">
        <div class="accordion-body">
            <div class="form-check form-switch">
            <input class="form-check-input" type="checkbox" role="switch" id="arbol">
            <label class="form-check-label" for="flexSwitchCheckDefault">Marcadores</label>
            </div>
        </div>
    </div>
    </div>
    <div class="accordion-item">
    <h2 class="accordion-header" id="headingThree">
        <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
        Ortofotos
        </button>
    </h2>
    <div id="collapseThree" class="accordion-collapse collapse" aria-labelledby="headingThree" data-bs-parent="#accordionExample">

        <div class="accordion-body">
                <div class="alert alert-danger" role="alert">
                Las imagenes pueden tardar en cargarse
            </div>
            <div class="form-check form-switch">
            <input class="form-check-input" type="checkbox" role="switch" id="cu_o">
            <label class="form-check-label" for="flexSwitchCheckDefault">Ciudad Universitaria</label>
            </div>
            <div class="form-check form-switch">
            <input class="form-check-input" type="checkbox" role="switch" id="cs_o">
            <label class="form-check-label" for="flexSwitchCheckDefault">Campus Ciencias de la Salud</label>
            </div>
            <div class="form-check form-switch">
            <input class="form-check-input" type="checkbox" role="switch" id="cm_o">
            <label class="form-check-label" for="flexSwitchCheckDefault">Campus Mederos</label>
            </div>
            <div class="form-check form-switch">
            <input class="form-check-input" type="checkbox" role="switch" id="ca_o">
            <label class="form-check-label" for="flexSwitchCheckDefault">Campus Ciencias Agropecuarias</label>
            </div>
        </div>
    </div>
    </div>
    </div>
    <br>
    <div class = "text-center" id="zoom_d">
    <button type="button" class="btn btn-primary btn-sm" id="zoom">Zoom out</button>
    </div>
       
`;

 /* left */
L.control.slideMenu(left + contents).addTo(map);

// JSON MARKERS --------------------------------------------------------
//  Marker TEST

let options = {
    icon: 'leaf',
    iconShape: 'circle'
}
// La lista de árboles que existen, son 29 elementos
let arboles = []
let arboleada
let c_ar = [
    [25.73497743160129, -100.30472282945541],
    [25.720525020781444, -100.31696611389486]
]
let bounds_ar = L.latLngBounds(c_ar)
// let center_n = [
//     [25.67584306522797, -100.41113059257302],
//     [25.767920169440764, -100.20162367674374]
// ]
// let bounds_N = L.latLngBounds(center_n);
// import {cu} from './map_campus';
// import {bounds} from './map_campus';

function toggleAR(){
    if (map.hasLayer(arboleada)) {
        map.removeLayer(arboleada);
        // map.fitBounds(bounds_N)
      } else {
        map.addLayer(arboleada);
        map.fitBounds(bounds_ar)
    }
}

// TOGGLE
let ar_button = document.querySelector('#arbol')
ar_button.addEventListener('click', toggleAR)

fetch('./assets/arbol.json')
  .then(response => response.json())
  .then(data => {
        // Hace un marker por cada arbol
    data.forEach(arbol => {
        let template = 
        `<p style="font-weight: bold;">${arbol.clave}</p>
        <div>
            <div class="container">
                <table class="table table-bordered">
                <tbody>
                    <tr>
                    <td>NOMBRE COMÚN</td>
                    <td>${arbol.nom_com}</td>
                    </tr>
                    <tr>
                    <td>NOMBRE CIENTÍFICO</td>
                    <td>${arbol.nom_cientifico}</td>
                    </tr>
                    <tr>
                    <td>CLAVE</td>
                    <td>${arbol.clave}</td>
                    </tr>
                    <tr>
                    <td>UBICACIÓN</td>
                    <td>${arbol.ubi}</td>
                    </tr>
                    <tr>
                    <td>COORDENADA Y</td>
                    <td>${arbol.y}</td>
                    </tr>
                    <tr>
                    <td>COORDENADA X</td>
                    <td>${arbol.x}</td>
                    </tr>
                    <tr>
                    <td>CONDICIÓN</td>
                    <td>${arbol.condicion}</td>
                    </tr>
                    <tr>
                    <td>RECOMENDACIÓN</td>
                    <td>${arbol.recomendacion}</td>
                    </tr>
                </tbody>
                </table>
            </div>
        </div>
        `
        arboles.push(L.marker([arbol.y, arbol.x],{
            icon: L.BeautifyIcon.icon(options),
            draggable: true
        }).bindPopup(template).on('mouseover', function () {
            var popup = document.getElementById('popup');
            var img = document.getElementById('img_pop')
            popup.style.display = 'block';
            img.src = arbol.img
        }).on('mouseout', function () {
            var popup = document.getElementById('popup');
            popup.style.display = 'none';
        }))
      });
    arboleada = L.layerGroup(arboles)
  })
  .catch(error => {
    console.error('Error fetching JSON:', error);
  });



// TEST RODOLFO
