const map = L.map('map').setView([52.229, 21.011], 13);
const tableBody = document.querySelector('tbody');
let lat, lng;
let number = 1;
const markerArray = new Array();


L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

function setMarker(ev) {
    lat = ev.latlng.lat;
    lng = ev.latlng.lng;

    newMarker = new L.marker([lat, lng], {
        draggable: 'true',
    }).addTo(map);

    markerArray.push(newMarker);

    appendDataToMarkerRow(ev);

    removeMarkerWhenIconClicked();
}

function createRowForEachMarker() {
    const tableRow = document.createElement('tr');
    return tableRow;
}

function addNumberToMarkerRow() {
    const tableRow = createRowForEachMarker();
    const colNumber = document.createElement('td');
    colNumber.innerText = number;
    tableRow.appendChild(colNumber);

    return tableRow;
}

function addLatitudeAndLongitudeToMarkerRow(ev) {
    const tableRow = addNumberToMarkerRow();
    const colLat = document.createElement('td');
    const colLng = document.createElement('td');

    colLat.innerText = ev.latlng.lat;
    colLng.innerText = ev.latlng.lng;

    tableRow.appendChild(colLat);
    tableRow.appendChild(colLng);
    return tableRow;
}

function addDeleteButtonToMarkerRow(ev) {
    const tableRow = addLatitudeAndLongitudeToMarkerRow(ev);
    const colDelete = document.createElement('td');
    const deleteBtn = document.createElement('i');

    deleteBtn.classList.add('fas', 'fa-trash', 'removeIcon', number);

    colDelete.appendChild(deleteBtn);
    tableRow.appendChild(colDelete);
    return tableRow;
}

function appendDataToMarkerRow(ev) {
    const tableRow = addDeleteButtonToMarkerRow(ev);
    tableBody.appendChild(tableRow);
}


function increaseNumber() {
    number++;
}

function removeMarkerWhenIconClicked() {
    const removeIcon = document.querySelectorAll('.removeIcon');

    removeIcon.forEach(icon => {
        icon.addEventListener('click', function() {
            
            markerArray.forEach(element => {
                if(element._latlng.lat.toString() === icon.parentNode.parentNode.childNodes[1].textContent) {
                    element.remove();
                    icon.parentNode.parentNode.remove();
                }
            })
        })
    })
}

map.addEventListener('click', setMarker);
map.addEventListener('click', increaseNumber);


