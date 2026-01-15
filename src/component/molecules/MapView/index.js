import PropTypes from "prop-types";
import { GoogleMap, Marker } from "@react-google-maps/api";
import classes from "./MapView.module.css";

export default function MapView({ data, location, className, zoomLevel = 16 }) {
  return (
    <div className={`${classes?.container} ${className || ""}`}>
      <GoogleMap
        zoom={zoomLevel}
        center={location}
        mapContainerClassName={classes["map-container"]}
        options={{
          disableDefaultUI: true, // Disable all default UI elements
          clickableIcons: false, // Prevent callout for POIs
        }}
      >
        {data ? (
          data.map((item) => {
            const markerKey = item?.id || item?.coordinates?.lat + "-" + item?.coordinates?.lng || `marker-${Math.random()}`;
            return (
              <Marker key={markerKey} position={item?.coordinates} />
            );
          })
        ) : (
          <Marker key="single-marker" position={location} />
        )}
      </GoogleMap>
    </div>
  );
}

MapView.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      coordinates: PropTypes.shape({
        lat: PropTypes.number.isRequired,
        lng: PropTypes.number.isRequired,
      }).isRequired,
    })
  ),
  location: PropTypes.shape({
    lat: PropTypes.number.isRequired,
    lng: PropTypes.number.isRequired,
  }).isRequired,
  className: PropTypes.string,
  zoomLevel: PropTypes.number,
};

MapView.defaultProps = {
  data: null,
  className: "",
  zoomLevel: 16,
};
