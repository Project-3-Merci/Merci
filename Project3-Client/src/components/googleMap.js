
import React, { Component } from 'react'

class GoogleMap extends Component {

    componentDidMount() {
        this.renderMap()
    }
    renderMap = () => {
        loadScript("https://maps.googleapis.com/maps/api/js?key=AIzaSyAhrUxqrh8-skkxENrNW6bSRMnCBqXuJTw&libraries=places&callback=initMap")
        window.initMap = this.initMap
    }

    initMap = () => {

        const map = new window.google.maps.Map(document.getElementById("map"), {
            center: { lat: 41.385063, lng: 2.173404 },
            zoom: 10,
        });

        let markers = [];

        const geocoder = new window.google.maps.Geocoder();
        const locationButton = document.createElement("button")
        locationButton.classList.add("current-location-btn");
        const searchInput = document.createElement("input");
        const searchBox = new window.google.maps.places.SearchBox(searchInput);


        locationButton.textContent = "Use Current Location";
        locationButton.classList.add("custom-map-control-button");
        map.controls[window.google.maps.ControlPosition.BOTTOM_CENTER].push(locationButton);
        map.controls[window.google.maps.ControlPosition.TOP_CENTER].push(searchInput);
        locationButton.addEventListener("click", () => {
            // Try HTML5 geolocation.
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(
                    (position) => {
                        const pos = {
                            lat: position.coords.latitude,
                            lng: position.coords.longitude,
                        };
                        const marker = new window.google.maps.Marker({
                            position: pos,
                            map: map
                        })
                        markers.push(
                            new window.google.maps.Marker({
                                map,
                                position: pos,
                            })
                        );

                        map.setCenter(pos);
                        map.setZoom(15)
                        document.getElementById("lat").value = pos.lat
                        document.getElementById("lng").value = pos.lng

                        geocodeLatLng(geocoder, map)
                        
                    },
                    () => {
                        handleLocationError(true, map.getCenter(), map);
                    }
                );
            } else {
                // Browser doesn't support Geolocation
                handleLocationError(false, map.getCenter(), map);
            }
        });

        searchBox.addListener("places_changed", () => {
            const places = searchBox.getPlaces();

            if (places.length == 0) {
                return;
            }

            // Clear out the old markers.
            markers.forEach((marker) => {
                marker.setMap(null);
            });
            markers = []

            // For each place, get the icon, name and location.
            const bounds = new window.google.maps.LatLngBounds();

            if (!places[0].geometry || !places[0].geometry.location) {
                console.log("Returned place contains no geometry");
                return;
            }

            // Create a marker for each place.
            markers.push(
                new window.google.maps.Marker({
                    map,
                    title: places[0].name,
                    position: places[0].geometry.location,
                })
            );

            document.getElementById("lat").value = places[0].geometry.location.lat()
            document.getElementById("lng").value = places[0].geometry.location.lng()
            document.getElementById("location").value = places[0].formatted_address
            document.getElementById("location").click()

            if (places[0].geometry.viewport) {
                // Only geocodes have viewport.
                bounds.union(places[0].geometry.viewport);
            } else {
                bounds.extend(places[0].geometry.location);
            }
            map.fitBounds(bounds);
        });

        map.addListener("bounds_changed", () => {
            searchBox.setBounds(map.getBounds());
        });
    }

    render() {
        return (
            <main className="map-container">
                <div id="map" className="map-box"></div>
            </main>
        )
    }
}

function handleLocationError(browserHasGeolocation, infoWindow, pos, map) {

}

function geocodeLatLng(geocoder, map) {
    const lat = document.getElementById("lat").value;
    const lng = document.getElementById("lng").value;
    const latlng = {
      lat: parseFloat(lat),
      lng: parseFloat(lng),
    };
  
    geocoder
      .geocode({ location: latlng })
      .then((response) => {
        if (response.results[0]) {
          map.setZoom(11);

          document.getElementById("location").value = response.results[0].formatted_address
          document.getElementById("location").click()
        } else {
          window.alert("No results found");
        }
      })
      .catch((e) => window.alert("Geocoder failed due to: " + e));
  }



function loadScript(url) {
    let index = window.document.getElementsByTagName("script")[0]
    let script = window.document.createElement("script")
    script.src = url
    script.async = true
    script.defer = true
    index.parentNode.insertBefore(script, index)
}

export default GoogleMap