import "./index.scss";

import { LeafletMap } from "./components/leafletmap";
import ButtonDatePicker from "./components/datepicker";
import { TbWorld } from "react-icons/tb";
import { useEffect, useState } from "react";

export default function Index() {

  const [location, setLocation] = useState(null);

  useEffect(() => {
    console.log('Selected location changed:', location);
  }, [location]);

  return (
    <div className="container d-flex flex-column align-items-center my-3 overflow-hidden">
      <div className="title mt-4">
        <h5>
          <img
            src="/map.svg"
            alt="map"
            style={{ height: "24px", width: "24px" }}
            className="mr-2 mb-1"
          />
          <span>Select any location</span>
        </h5>
        <ul className="ml-1 pl-3">
          <li>
            We will provide approximate weather data and probabilities for the
            selected future time
          </li>
        </ul>
      </div>
      <div className="map">
        <LeafletMap  {...{ setActualPosition:setLocation, actualPosition: location }} />
        <div className="mt-2 mt-2 w-100 d-flex justify-content-between">
          <div className="buttons-container">
            <ButtonDatePicker />
          </div>
          <div>
            <button
              type="button"
              class="btn btn-outline-light px-4 py-1 gap-4 d-flex align-items-center"
            >
              <TbWorld  fontSize={20}/>
              <span className="ml-2">Analyze</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
