$(function() {
    $(`#meetup`).on("click", handleMeetup)
    $('.addfriend').on("click", handleAddFriendPanel);
    $('.addfav').on("click", handleAddFavoritePanel);
});

const handleAddFavoritePanel = function (event){
    event.preventDefault();
    let addfavoritepanel = 
            `<div class = "favoritepanel">
                <label class = "label" for = "favname">Location Name:</label>
                <input class = "favname" type = "text" name = "favname" value = "Ex: Home">
                <br>
                <br>
                <label class = "label" for = "favaddress">Address:</label>
                <input class = "favaddress" type = "text" name = "favaddress" value = "1234 Main St. Town, State Zip">
                <br>
                <br>
                <button class = "createfav button is-dark">Add</button>
            </div>`
    $('.addfav').replaceWith(addfavoritepanel);
    $('.createfav').on("click", handleCreateFavorite);


}
const handleCreateFavorite = function(event){
    event.preventDefault();
    let favname = $('.favname').val();
    let favaddress = $('.favaddress').val();
    let favorite = 
    `<div style = "display: inline-block; border: 2px solid powderblue; width: 100%; padding: 10px;">
        <div style = "display: inline-block;">
            <label class = "label">${favname}</label>
            <label class = "${favaddress}" id = "${favaddress}">${favaddress}</label>
        </div>
        <br>
        <br>
        <div style = "display: inline-block;">
            <button id = "${favaddress}" style = "display: inline-block;" class = "meetfav button is-dark">Meet!</button>
        </div>
    </div>`
    $('#Favorites').append(favorite);
    let replacementbutton = `<button class = "addfav button is-dark" style = "margin-left: 200px; margin-top: 10px; height: 75px; display: flex-right; justify-content: space-between;">Add a Favorite</button>`
    $('.favoritepanel').replaceWith(replacementbutton);
    $('.addfav').on("click", handleAddFavoritePanel);
    $('.meetfav').on("click", handleMeetFavorite);

}
const handleMeetFavorite = function(event){
    let newaddress = $('.autofilladdress').attr("id");
    $('.address1').val(event.target.id);
}

const handleAddFriendPanel = function (event){
    event.preventDefault();
    let addfriendpanel = 
            `<div class = "friendpanel">
                <label class = "label" for = "friendname">Name:</label>
                <input class = "friendname" type = "text" name = "friendname" value = "John Doe">
                <br>
                <br>
                <label class = "label" for = "friendaddress">Address:</label>
                <input class = "friendaddress" type = "text" name = "friendaddress" value = "1234 Main St. Town, State Zip">
                <br>
                <br>
                <button class = "createfriend button is-dark">Add</button>
            </div>`
    $('.addfriend').replaceWith(addfriendpanel);
    $('.createfriend').on("click", handleCreateFriend);


}
const handleCreateFriend = function(event){
    event.preventDefault();
    let friendname = $('.friendname').val();
    let friendaddress = $('.friendaddress').val();
    let friend = 
    `<div style = "display: inline-block; border: 2px solid powderblue; width: 100%; padding: 10px;">
        <div style = "display: inline-block;">
            <label class = "label">${friendname}</label>
            <label class = "${friendaddress}" id = "${friendaddress}">${friendaddress}</label>
        </div>
        <br>
        <br>
        <div style = "display: inline-block;">
            <button id = "${friendaddress}" style = "display: inline-block;" class = "meetfriend button is-dark">Meet!</button>
        </div>
    </div>`
    $('#Friends').append(friend);
    let replacementbutton = `<button class = "addfriend button is-dark" style = "margin-left: 250px; margin-top: 10px; height: 75px; display: flex-left; justify-content: space-between;">Add a Friend</button>`
    $('.friendpanel').replaceWith(replacementbutton);
    $('.addfriend').on("click", handleAddFriendPanel);
    $('.meetfriend').on("click", handleMeetFriend);

}

const handleMeetFriend = function(event){
    let newaddress = $('.autofilladdress').attr("id");
    $('.address2').val(event.target.id);
}
const handleMeetup = function(event){
    console.log("something");
    event.preventDefault();
    let address1 = $('.address1').val();
    let address2 = $('.address2').val();
    let meettype = $('input:radio[name=meetingplace]:checked').val();
    let stars = $('input:radio[name=stars]:checked').val();
    let price = $('input:radio[name=price]:checked').val();

    console.log(meettype);

    let request;

    if(meettype == "Restaurant") {
        request = {
            location: new google.maps.LatLng(35.9132, -79.0558),
            radius: 1000,
            keyword: 'food',
            type: 'restaraunt'
        };
    } else if( meettype == "Mall/Shopping Center") {
        request = {
            location: new google.maps.LatLng(35.9132, -79.0558),
            radius: 1000,
            keyword: 'shopping',
            type: "shopping_mall"
        };
    } else if(meettype == "Retail Shop") {
        request = {
            location: new google.maps.LatLng(35.9132, -79.0558),
            radius: 1000,
            keyword: 'shopping',
            type: "store"
        };
    } else if(meettype == "Recreation") {
        request = {
            location: new google.maps.LatLng(35.9132, -79.0558),
            radius: 1000,
            keyword: 'recreation',
            type: "park"
        };
    } else if (meettype == "Movie") {
        request = {
            location: new google.maps.LatLng(35.9132, -79.0558),
            radius: 1000,
            keyword: 'movies',
            type: "movie_theatre"
        };
    } else {
        request = {
            location: new google.maps.LatLng(35.9132, -79.0558),
            radius: 1000,
            keyword: 'shopping',
            type: "store"
        };
    };

    let map = $("<div/>", {html: `<div id="meet-map"></div>
                            <div id="right-panel">
                            <h2>Results</h2>
                            <ul id="places"></ul>
                            </div>`});

    $('#setup-meet').replaceWith(map);

    handleCreateMap(request);

    //let preferences = 'meat'
/*
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
*/
  //window.location.href = "homepage.html";

    let meetuppanel = 
        `<div class = "meetuppanel" style = "display: inline-block; border: 2px solid powderblue; width: 100%; padding: 10px;">
            <h3 class = "label">You Meet Between: </h3>
            <label>${address1}</label>
            <h3 class = "label">and</h3>
            <label>${address2}</label>
            <h4 class = "label">With the following prefernces: </h4>
            <label>${meettype}, </label>
            <label>${stars}, </label>
            <label">${price}</label>
        </div>`
        $('#Recents').append(meetuppanel);
}

const handleCreateMap = function(meeting_place){
    initMap(meeting_place);
}

function initMap(request) {
    // Create the map.
    const chapel_hill = { lat: 35.9132, lng: -79.0558 };
    const map = new google.maps.Map(document.getElementById("meet-map"), {
        center: chapel_hill,
        zoom: 15,
    });

    // Create the places service.
    const service = new google.maps.places.PlacesService(map);
    let getNextPage;
    //const moreButton = document.getElementById("more");
  
    /*moreButton.onclick = function () {
        moreButton.disabled = true;
    
        if (getNextPage) {
            getNextPage();
        }
    };*/

    service.search(request, (results, status, pagination) => {
        if (status !== "OK") {console.log("error"); return;}
        createMarkers(results, map);
        //moreButton.disabled = !pagination.hasNextPage;

        if (pagination.hasNextPage) {
        getNextPage = pagination.nextPage;
        }
    })
/*
    // Perform a nearby search.
    service.nearbySearch(
        { location: chapel_hill, radius: 1000, type: meeting_place},
        (results, status, pagination) => {
            if (status !== "OK") {console.log("error"); return;}
            createMarkers(results, map);
            moreButton.disabled = !pagination.hasNextPage;
    
            if (pagination.hasNextPage) {
            getNextPage = pagination.nextPage;
            }
        }
    );*/
}

function createMarkers(places, map) {
    const bounds = new google.maps.LatLngBounds();
    const placesList = document.getElementById("places");

    console.log(placesList)

    for (let i = 0, place; (place = places[i]); i++) {
        const image = {
            url: place.icon,
            size: new google.maps.Size(70, 70),
            origin: new google.maps.Point(0, 0),
            anchor: new google.maps.Point(3, 3),
            scaledSize: new google.maps.Size(1000, 1000),
        };

        $("#meet-map").append(new google.maps.Marker({
            map,
            icon: image,
            title: place.name,
            position: place.geometry.location,
        }).addListener('click', () => { handleMeetingPlace(event)}));
        const li = document.createElement("li");
        li.textContent = place.name;
        placesList.appendChild(li);
        bounds.extend(place.geometry.location);
    }
    map.fitBounds(bounds);
}

function handleMeetingPlace(e) {
    console.log(e["path"][1]['title']);
}