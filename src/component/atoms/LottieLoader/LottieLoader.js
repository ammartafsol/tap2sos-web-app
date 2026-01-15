"use client";
import PropTypes from "prop-types";
import { Player } from "@lottiefiles/react-lottie-player";
import classes from "./lottieLoader.module.css";

const LottieLoader = ({ className }) => {
  return (
    <div className={`${classes?.container} ${className || ""}`}>
      <Player
        autoplay
        loop
        src="/lottie/loadingSecondary.json"
        style={{ height: "300px", width: "300px" }}
      ></Player>
    </div>
  );
};

LottieLoader.propTypes = {
  className: PropTypes.string,
};

LottieLoader.defaultProps = {
  className: "",
};

export default LottieLoader;
