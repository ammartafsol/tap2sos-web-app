import PropTypes from "prop-types";
import { useLoadScript } from "@react-google-maps/api";
import { config } from "@/config";
import PlacesInput from "@/component/molecules/PlacesInput";
import MapView from "@/component/molecules/MapView";

const defaultLocation = { lat: 32.715736, lng: -117.161087 };

// type = 'map' || 'places'
const MapAndPlaces = ({
  type = "map",
  className,
  mapClass,
  placeClass,
  setLocationData,
  address,
  location = defaultLocation,
  placeholder,
  label,
  leftIcon,
  data,
  loader,
  types,
  rightIcon,
  errorText,
  customIcon,
  zoomLevel,
  labelTextStl,
}) => {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: config?.googleMapApiKey,
    libraries: ["places", "visualization"],
  });
  if (!isLoaded) {
    return loader || <div>Loading</div>;
  }

  if (loadError) {
    return (
      <div>
        <span>Map cannot be loaded right now, sorry. </span>
      </div>
    );
  }

  return (
    <div className={`${className || ""}`}>
      {type === "map" ? (
        <MapView
          data={data}
          location={location}
          className={mapClass}
          zoomLevel={zoomLevel}
          customIcon={customIcon}
        />
      ) : (
        <PlacesInput
          setLocationData={setLocationData}
          address={address}
          className={placeClass}
          placeholder={placeholder}
          label={label}
          leftIcon={leftIcon}
          types={types}
          rightIcon={rightIcon}
          errorText={errorText}
          labelTextStl={labelTextStl}
        />
      )}
    </div>
  );
};

MapAndPlaces.propTypes = {
  type: PropTypes.oneOf(["map", "places"]),
  className: PropTypes.string,
  mapClass: PropTypes.string,
  placeClass: PropTypes.string,
  setLocationData: PropTypes.func,
  address: PropTypes.string,
  location: PropTypes.shape({
    lat: PropTypes.number.isRequired,
    lng: PropTypes.number.isRequired,
  }),
  placeholder: PropTypes.string,
  label: PropTypes.string,
  leftIcon: PropTypes.node,
  data: PropTypes.arrayOf(PropTypes.object),
  loader: PropTypes.node,
  types: PropTypes.arrayOf(PropTypes.string),
  rightIcon: PropTypes.node,
  errorText: PropTypes.string,
  customIcon: PropTypes.node,
  zoomLevel: PropTypes.number,
  labelTextStl: PropTypes.string,
};

MapAndPlaces.defaultProps = {
  type: "map",
  className: "",
  mapClass: "",
  placeClass: "",
  setLocationData: null,
  address: "",
  location: defaultLocation,
  placeholder: "",
  label: "",
  leftIcon: null,
  data: null,
  loader: null,
  types: null,
  rightIcon: null,
  errorText: "",
  customIcon: null,
  zoomLevel: undefined,
  labelTextStl: "",
};

export default MapAndPlaces;
