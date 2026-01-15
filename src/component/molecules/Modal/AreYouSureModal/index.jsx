import PropTypes from "prop-types";
import Button from "@/component/atoms/Button";
import ModalSkeleton from "../ModalSkeleton/ModalSkeleton";
import classes from "./AreYouSureModal.module.css";
import { FaTrash } from "react-icons/fa";

const AreYouSureModal = ({
  show,
  setShow,
  title = "Are You Sure You Want To Delete",
  subTitle = "Once you delete this can't be recovered",
  loading = false,
  onClick,
}) => {
  return (
    <ModalSkeleton header={"Action Confirmation"} setShow={setShow} show={show}>
      <div className={classes.mainDiv}>
        <div className={classes.__icon}>
          <FaTrash size={45} color="var(--reddish-orange)" />
        </div>
        <p className={classes.title}>{title}</p>
        <p className={[classes.message].join(" ")}>{subTitle}</p>
      </div>
      <div className={classes.btnsBox}>
        <Button
          variant={"danger"}
          label={loading ? "Please Wait..." : "Yes"}
          onClick={onClick}
          disabled={loading}
        />
        <Button
          label={"No"}
          onClick={async () => {
            setShow(false);
          }}
          disabled={loading}
          variant="primary"
        />
      </div>
    </ModalSkeleton>
  );
};

AreYouSureModal.propTypes = {
  show: PropTypes.bool.isRequired,
  setShow: PropTypes.func.isRequired,
  title: PropTypes.string,
  subTitle: PropTypes.string,
  loading: PropTypes.bool,
  onClick: PropTypes.func.isRequired,
};

AreYouSureModal.defaultProps = {
  title: "Are You Sure You Want To Delete",
  subTitle: "Once you delete this can't be recovered",
  loading: false,
};

export default AreYouSureModal;
