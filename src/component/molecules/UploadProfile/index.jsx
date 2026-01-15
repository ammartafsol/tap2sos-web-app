import PropTypes from "prop-types";
import React, { useRef, useState } from "react";
import classes from "./UploadProfile.module.css";
import { BaseURL, CreateFormData } from "@/resources/utils/helper";
import useAxios from "@/interceptor/axiosInterceptor";
import LottieLoader from "@/component/atoms/LottieLoader/LottieLoader";

const UploadProfile = ({ uploadImage, setUploadImage, readOnly = false }) => {
  const [preview, setPreview] = useState(null);
  const fileInputRef = useRef();
  const { Post } = useAxios();
  const [loading,setLoading] = useState(false);

  const handleImageChange = async (e) => {
    setLoading(true);
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setPreview(imageUrl);
      const formData = CreateFormData({ docs: file });
      const response = await Post({
        route: "users/media/upload",
        isFormData: true,
        data: formData,
      });
      if (response) {
        setUploadImage(response?.response?.data?.docs?.at(0)?.key);
        setPreview(null);
      }
      setLoading(false);
    }
  };

  const handleClick = () => {
    if (readOnly) return;
    fileInputRef.current?.click();
  };

  const handleKeyDown = (e) => {
    if (readOnly) return;
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      fileInputRef.current?.click();
    }
  };

  return (
    <div className={classes.wrapper}>
      <button
        type="button"
        className={classes.uploadImage}
        onClick={handleClick}
        onKeyDown={handleKeyDown}
        disabled={readOnly}
        aria-label={readOnly ? undefined : "Upload profile image"}
        style={{ 
          cursor: readOnly ? "default" : "pointer",
          background: "none",
          border: "none",
          padding: 0,
          width: "100%",
          height: "100%"
        }}
      >
        {preview || uploadImage ? (
          <img
            src={preview || BaseURL(`users/media/fetch/${uploadImage}`)}
            alt="Profile Preview"
            className={classes.preview}
          />
        ) : (
          <span className={classes.placeholder}>+</span>
        )}
      </button>
      {!readOnly && (
        <input
          type="file"
          accept="image/*"
          ref={fileInputRef}
          className={classes.hiddenInput}
          onChange={handleImageChange}
        />
      )}
      {loading && <LottieLoader />}
    </div>
  );
};

UploadProfile.propTypes = {
  uploadImage: PropTypes.string,
  setUploadImage: PropTypes.func.isRequired,
  readOnly: PropTypes.bool,
};

UploadProfile.defaultProps = {
  uploadImage: "",
  readOnly: false,
};

export default UploadProfile;
