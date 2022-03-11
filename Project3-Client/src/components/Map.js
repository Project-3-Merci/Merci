import { Component } from "react"
import { Map, GoogleApiWrapper } from "google-maps-react"
require("dotenv/config")

class MapContainer extends Component {
    render() {
        return(
            <Map 
                google = {this.props.google}
                style= {{width: "50%", height: "50%"}}
                zoom = {10}
                initialCenter = {
                    {
                        lat: 41.3874,
                        lng: 2.1686
                    }
                }
            />
        )
    }
}

export default GoogleApiWrapper({
    apiKey: "AIzaSyA0rHKfNyQLsrM3CrSHVUKpWREx9gZ3TUA"
}) (MapContainer)