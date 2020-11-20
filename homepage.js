$(function() {
    $(`#meetup`).on("click", handleMeetup)
});

const handleMeetup = function(event){
    console.log("something");
    event.preventDefault();
    let address1 = $('.address1').val();
    let address2 = $('.address2').val();
    let meettype = $('input:radio[name=meetingplace]:checked').val();
    let stars = $('input:radio[name=stars]:checked').val();
    let price = $('input:radio[name=price]:checked').val();

    let map = $("<div/>", {html: `<div id="meet-map"></div>
                            <div id="right-panel">
                            <h2>Results</h2>
                            <ul id="places"></ul>
                            <button id="more">More results</button>
                            </div>`});

    $('#setup-meet').replaceWith(map);

    handleCreateMap();

    //let preferences = 'meat'

    const result = axios({
        method: 'post',
        url: 'http://localhost:3030/meetups',
        data:{
            "address1": address1,
            "address2": address2,
            "meettype": meettype,
            "stars": stars,
            "price": price
        }
    })

  //window.location.href = "homepage.html";

    
}

const handleCreateMap = function(){
    initMap();
}

function initMap() {
    // Create the map.
    const chapel_hill = { lat: 35.9132, lng: -79.0558 };
    const map = new google.maps.Map(document.getElementById("meet-map"), {
        center: chapel_hill,
        zoom: 15,
    });

    // Create the places service.
    const service = new google.maps.places.PlacesService(map);
    let getNextPage;
    const moreButton = document.getElementById("more");
  
    moreButton.onclick = function () {
        moreButton.disabled = true;
    
        if (getNextPage) {
            getNextPage();
        }
    };
    // Perform a nearby search.
    service.nearbySearch(
        { location: chapel_hill, radius: 400, type: "store" },
        (results, status, pagination) => {
            if (status !== "OK") return;
            createMarkers(results, map);
            moreButton.disabled = !pagination.hasNextPage;
    
            if (pagination.hasNextPage) {
            getNextPage = pagination.nextPage;
            }
        }
    );
}

function createMarkers(places, map) {
    const bounds = new google.maps.LatLngBounds();
    const placesList = document.getElementById("places");

    for (let i = 0, place; (place = places[i]); i++) {
        const image = {
            url: place.icon,
            size: new google.maps.Size(20, 20),
            origin: new google.maps.Point(0, 0),
            anchor: new google.maps.Point(10, 20),
            scaledSize: new google.maps.Size(25, 25),
        };
        new google.maps.Marker({
            map,
            icon: image,
            title: place.name,
            position: place.geometry.location,
        });
        const li = document.createElement("li");
        li.textContent = place.name;
        placesList.appendChild(li);
        bounds.extend(place.geometry.location);
    }
    map.fitBounds(bounds);
}

$(function() {
    $(`#li`).on('click', handleMeetingPlace)
})

const handleMeetingPlace = function() {
    console.log("choosing");
}