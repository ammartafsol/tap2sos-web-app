import PropTypes from "prop-types";
import classes from "./StatesCard.module.css";

const StatesCard = ({ item }) => {
  const IconComponenet = item?.icon;
  return (
    <div className={classes?.statesCard}>
      <div className={classes?.icons}>
        <IconComponenet fontSize={40} color="var(--royal-navy-blue)" />
      </div>
      <div className={classes?.statesDetails}>
        <h5>{item?.title}</h5>
        <p>{item?.count}</p>
      </div>
    </div>
  );
};

StatesCard.propTypes = {
  item: PropTypes.shape({
    icon: PropTypes.elementType.isRequired,
    title: PropTypes.string.isRequired,
    count: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  }).isRequired,
};

export default StatesCard;
