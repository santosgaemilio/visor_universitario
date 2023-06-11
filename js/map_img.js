let center_i = [[25.815162495002145, -100.53003798954943],[25.61581061489667, -100.06870325354639]]
let bounds_i = L.latLngBounds(center_i);
let zoom_out = document.getElementById('zoom')

function zoomOut(){
    map.fitBounds(bounds_i)
}


zoom_out.addEventListener('click', zoomOut)
