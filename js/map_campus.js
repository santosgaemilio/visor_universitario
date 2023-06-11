// CÓDIGO MAL OPTIMIZADO, DEMASIADAS FUNCIONES, PERO ES ENTENDIBLE
// LA FORMA DE LIMPIAR ESTE CÓDIGO ES TRATAR LOS GEOJSON COMO UN CONJUNTO
// TOMAR NOTA DE OPTIMIZARLO PARA LA SIGUIENTE

// SHAPES
let cu 
let cca
let cs
let cm
let center = [[25.67584306522797, -100.41113059257302],[25.767920169440764, -100.20162367674374]]
let bounds = L.latLngBounds(center);

let style = {
  color: 'blue',
  fillColor: '#ffffff',
  fillOpacity: 0.2,
  weight: 2
}

function toggleCU(){
    if (map.hasLayer(cu)) {
        map.removeLayer(cu);
        map.fitBounds(bounds);
      } else {
        map.addLayer(cu);
        map.fitBounds(cu.getBounds());
    }
}

function toggleCCA(){
    if (map.hasLayer(cca)) {
        map.removeLayer(cca);
        map.fitBounds(bounds);
      } else {
        map.addLayer(cca);
        map.fitBounds(cca.getBounds());
    }
}

function toggleCS(){
  if (map.hasLayer(cs)) {
      map.removeLayer(cs);
      map.fitBounds(bounds);
    } else {
      map.addLayer(cs);
      map.fitBounds(cs.getBounds());
  }
}

function toggleCM(){
  if (map.hasLayer(cm)) {
      map.removeLayer(cm);
      map.fitBounds(bounds);
    } else {
      map.addLayer(cm);
      map.fitBounds(cm.getBounds());
  }
}


// TOGGLE

    // CU
let cu_button = document.querySelector("#cu")
cu_button.addEventListener('click', toggleCU)

fetch('./assets/cu2.geojson')
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {
    cu = L.geoJSON(data.features, {
      style: style,
      onEachFeature: function(feature, layer){
        let properties = feature.properties
        console.log(properties);
        layer.on({
          click : function(){
          zoomToFeature(layer)
          console.log('working');
          },
          mouseover: function(){
            highlightFeature(layer, properties)
          },
          mouseout: function(){
            resetHighlight(layer, style)
          }
      })
      }
    });
    cu.addTo(map);
    console.log(cu.getBounds());
    
  
    
  });

    // CCA
let cca_button = document.querySelector("#cca")
cca_button.addEventListener('click', toggleCCA)

fetch('./assets/cca.geojson')
    .then(function (response) {
    return response.json();
    })
    .then(function (data) {
    cca = L.geoJSON(data.features, {
        style: style,
        onEachFeature: function(feature, layer){
          let properties = feature.properties
          console.log(properties);
          layer.on({
            click : function(){
            zoomToFeature(layer)
            console.log('working');
            },
            mouseover: function(){
              highlightFeature(layer, properties)
            },
            mouseout: function(){
              resetHighlight(layer, style)
            }
        })
        }
    });

    
    
})

  // CS
let cs_button = document.querySelector("#cs")
cs_button.addEventListener('click', toggleCS)

fetch('./assets/cs.geojson')
    .then(function (response) {
    return response.json();
    })
    .then(function (data) {
    cs = L.geoJSON(data.features, {
        style: style,
        onEachFeature: function(feature, layer){
          let properties = feature.properties
          console.log(properties);
          layer.on({
            click : function(){
            zoomToFeature(layer)
            console.log('working');
            },
            mouseover: function(){
              highlightFeature(layer, properties)
            },
            mouseout: function(){
              resetHighlight(layer, style)
            }
        })
        }
    });

  
    
})

  // CM
let cm_button = document.querySelector("#cm")
cm_button.addEventListener('click', toggleCM)

fetch('./assets/cm.geojson')
    .then(function (response) {
    return response.json();
    })
    .then(function (data) {
    cm = L.geoJSON(data.features, {
        style: style,
        onEachFeature: function(feature, layer){
          let properties = feature.properties
          console.log(properties);
          layer.on({
            click : function(){
            zoomToFeature(layer)
            console.log('working');
            },
            mouseover: function(){
              highlightFeature(layer, properties)
            },
            mouseout: function(){
              resetHighlight(layer, style)
            }
        })
        }
    });

 
    
})


// PARTE DE LAS IMAGENES, LAS IBA A PONER EN OTRO JS PERO NECESITO INFORMACIÓN DE LOS GEOJSON

let campuses = []
let ortobotones = [
    document.getElementById('cu_o'),
    document.getElementById('cs_o'),
    document.getElementById('cm_o'),
    document.getElementById('ca_o')
]

function toggleOrto(campus){
    if(map.hasLayer(campus)){
        map.removeLayer(arboleada)
        map.fitBounds(campus)
    }
}

fetch('./assets/orto_uni.json')
    .then(response => response.json())
    .then(data=>{
        data.forEach(campus => {
            let imageUrl = campus.img
            let imageBounds = [
                    [campus.north,campus.west],[campus.south, campus.east]
                ]
            campuses.push(
                L.imageOverlay(imageUrl,imageBounds)
            )
        });
    })
    .catch(error =>{
        console.log('Error fetching JSON', error);
    })

function toggleCU_O(){
  if (map.hasLayer(campuses[0])) {
      map.removeLayer(campuses[0]);
      map.fitBounds(bounds);
    } else {
      map.addLayer(campuses[0]);
      map.fitBounds(cu.getBounds());
  }
}

function toggleCS_O(){
if (map.hasLayer(campuses[1])) {
    map.removeLayer(campuses[1]);
    map.fitBounds(bounds);
  } else {
    map.addLayer(campuses[1]);
    map.fitBounds(cs.getBounds());
}
}

function toggleCM_O(){
if (map.hasLayer(campuses[2])) {
    map.removeLayer(campuses[2]);
    map.fitBounds(bounds);
  } else {
    map.addLayer(campuses[2]);
    map.fitBounds(cm.getBounds());
}
}

function toggleCCA_O(){
  if (map.hasLayer(campuses[3])) {
      map.removeLayer(campuses[3]);
      map.fitBounds(bounds);
    } else {
      map.addLayer(campuses[3]);
      map.fitBounds(cca.getBounds());
  }
}

ortobotones[0].addEventListener('click', toggleCU_O)
ortobotones[1].addEventListener('click', toggleCS_O)
ortobotones[2].addEventListener('click', toggleCM_O)
ortobotones[3].addEventListener('click', toggleCCA_O)

// FUNCIONALIDAD DE LOS SHAPES cu, cca, cs, cm



//   CODIGO ROBADO DE LA DOCUMENTACIÓN

  // mouseover
function highlightFeature(layer, properties) {
    layer.setStyle({
        weight: 5,
        color: '#820746',
        dashArray: '',
        fillOpacity: 0.7
    });

    info.update(properties);
}

  // mouseout
function resetHighlight(layer, style) {
  layer.setStyle(style)
  info.update();
}

// click
function zoomToFeature(layer) {
  map.fitBounds(layer.getBounds());
}

// INFORMACIÓN|CODIGO DE DOCUMENTACIÓN

let info = L.control();

info.onAdd = function (map) {
    this._div = L.DomUtil.create('div', 'info'); // create a div with a class "info"
    this.update();
    return this._div;
};

// method that we will use to update the control based on feature properties passed
info.update = function (props) {
    this._div.innerHTML = '<h4>Información</h4>' +  (props ?
        `<b>Campus</b> ${props.campus} <br>
        <b>Propietario</b> ${props.propietario} <br>
        <b>No. Expediente</b> ${props.expediente_num} <br>
        <b>Superficie</b> ${props.superficie_m2} m<sup>2</sup> <br>
        <b>Área construida</b> ${props.area_construida_m2} m<sup>2</sup> <br>
        <b>Municipio</b> ${props.municipio} <br>
        <b> No. Escritura</b> ${props.escritura_num} <br>
        <b>Valor Comercial</b> ${props.valor_com_terreno} <br>
        <b>Valor Catastral</b> ${props.valor_catastro_terreno} <br>
    `
        : 'Coloca el mouse sobre un campus');
};

info.addTo(map);
