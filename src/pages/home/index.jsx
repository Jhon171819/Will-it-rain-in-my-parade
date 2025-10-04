import './index.scss'
import { LeafletMap } from "./components/leafletmap"
export default function Index() {
    return (
        <div className="container d-flex flex-column align-items-center my-3 overflow-hidden">
            <div className="title mt-4">
                <h5>   
                    <img src="/map.svg" alt="map" style={{ height: "24px", width: "24px" }} className="mr-2 mb-1" />
                    <span>Select any location</span>
                    </h5>
                <ul className='ml-1 pl-3'>
                    <li>We will provide approximate weather data and probabilities for the selected future time</li>
                </ul>
            </div>
            <div className='map'><LeafletMap /></div>
        </div>
    );
}