"use client";
import PropTypes from "prop-types";
import LottieLoader from "@/component/atoms/LottieLoader/LottieLoader";
import RenderToast from "@/component/atoms/RenderToast";
import {
  getMediaType,
  getSupportedImageTypes,
} from "@/resources/utils/mediaUpload";
import { useState } from "react";
import { useDropzone } from "react-dropzone";
import { BsFillPlusSquareFill } from "react-icons/bs";
import { FaFileContract } from "react-icons/fa";
import { IoCloseOutline } from "react-icons/io5";
import classes from "./MultiFileUpload.module.css";
import { MdOutlineCloudDone } from "react-icons/md";
import { MediaUrl } from "@/resources/utils/helper";

const MultiFileUpload = ({
  label,
  uploadText = "Upload File",
  customTextClass,
  fileSize,
  supportedFiles = "File formats pdf and Word Doc",
  uploadImage,
  files,
  uploadIcon,
  setFiles,
  errorText,
  disable = false,
  extraStyles = {},
  acceptedFiles = getSupportedImageTypes("all"),
  removeFileCb,
  maxFileCount = 5,
  Delete,
}) => {
  const [isDeleteApiCalling, setIsDeleteApiCalling] = useState(false);
  let containerStyleObject = {
    ...(errorText && { border: "1px solid red" }),
    ...extraStyles,
  };

  // onDrop
  const onDrop = (_acceptedFiles) => {
    // validate
    if (_acceptedFiles.length > maxFileCount) {
      return RenderToast({
        message: `You can upload maximum ${maxFileCount} file${
          maxFileCount > 1 ? "s" : ""
        } at a time`,
        type: "error",
      });
    }

    setFiles([...files, ..._acceptedFiles]);
  };

  // removeFile
  const removeFile = async (key) => {
    setIsDeleteApiCalling(true);
    const response = await Delete({
      route: `users/delete/${key}`,
    });
    if (response) {
      removeFileCb(key);
      RenderToast({ type: "success", message: "File deleted successfully" });
    }
    setIsDeleteApiCalling(false);
  };

  const renderFileComponent = (file) => {
    const isFileObject = typeof file === "object";
    const fileType = getMediaType(
      isFileObject ? file?.type : file?.split(".").pop()
    );
    if (["images", "photos"].includes(fileType)) {
      return (
        <div className={classes?.imageContainer}>
          <img
            src={isFileObject ? URL.createObjectURL(file) : MediaUrl(file)}
            alt={file.name || "Image"}
          />
        </div>
      );
    } else {
      return (
        <div className={classes.filePreview}>
          <button
            type="button"
            className={classes.previewIcon}
            onClick={() => window.open(MediaUrl(file), "_blank")}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                window.open(MediaUrl(file), "_blank");
              }
            }}
            aria-label="View file"
            style={{ background: "none", border: "none", padding: 0, cursor: "pointer" }}
          >
            <FaFileContract
              title="View File"
              size={35}
              color="var(--secondary-text)"
            />
          </button>
        </div>
      );
    }
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: acceptedFiles,
    multiple: true,
    maxFiles: 5,
    onDropRejected: (files) => {
      if (files?.length > maxFileCount) {
        return RenderToast({
          message: `You can upload maximum ${maxFileCount} file${
            maxFileCount > 1 ? "s" : ""
          } at a time`,
          type: "error",
        });
      }
    },
  });

  return (
    <>
      {label && <p className={`fs-13 mt-3 ${classes.labelStyle}`}>{label}</p>}

      {files && (
        <div className={classes.filePreviewList}>
          {files?.map((file) => {
            const fileKey = file?.key || file?.id || file?.name || file?.fileName || `file-${Math.random()}`;
            return (
              <div key={fileKey}>
                <div className={classes.fileItem}>
                  <button
                    type="button"
                    className={classes.removeFile}
                    onClick={() => removeFile(file?.key || "")}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault();
                        removeFile(file?.key || "");
                      }
                    }}
                    aria-label="Remove file"
                    style={{ background: "none", border: "none", padding: 0, cursor: "pointer" }}
                  >
                    <IoCloseOutline color="var(--white)" size={22} />
                  </button>
                  {renderFileComponent(file)}
                </div>
                <div>{file.fileName?.slice(-14) || file.name?.slice(-14) || "File"}</div>
              </div>
            );
          })}
          <div
            className={`${classes.fileInputDiv} ${
              disable && classes?.disabledFile
            } ${files.length === 2 && classes?.hidden} `}
            style={{
              ...(containerStyleObject && { ...containerStyleObject }),
            }}
          >
            <div {...getRootProps({ className: "dropzone" })}>
              <input disabled={disable} {...getInputProps()} />
              <div className={classes.fileDesc}>
                {uploadIcon || <MdOutlineCloudDone size={25} />}
                <p className={`${customTextClass || ""} ${classes.text}`}>
                  {uploadText}
                </p>
                <BsFillPlusSquareFill color="var(--primary-bg)" size={20} />
                {(fileSize || supportedFiles) && (
                  <div>
                    {fileSize && <p className={classes.desc}>{fileSize}</p>}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
      {errorText && <p className={`${classes.error}`}>{errorText}</p>}

      {isDeleteApiCalling && <LottieLoader />}
    </>
  );
};

MultiFileUpload.propTypes = {
  label: PropTypes.string,
  uploadText: PropTypes.string,
  customTextClass: PropTypes.string,
  fileSize: PropTypes.string,
  supportedFiles: PropTypes.string,
  uploadImage: PropTypes.string,
  files: PropTypes.arrayOf(
    PropTypes.oneOfType([
      PropTypes.object,
      PropTypes.string,
    ])
  ).isRequired,
  uploadIcon: PropTypes.node,
  setFiles: PropTypes.func.isRequired,
  errorText: PropTypes.string,
  disable: PropTypes.bool,
  extraStyles: PropTypes.object,
  acceptedFiles: PropTypes.object,
  removeFileCb: PropTypes.func,
  maxFileCount: PropTypes.number,
  Delete: PropTypes.func,
};

MultiFileUpload.defaultProps = {
  label: "",
  uploadText: "Upload File",
  customTextClass: "",
  fileSize: "",
  supportedFiles: "File formats pdf and Word Doc",
  uploadImage: "",
  uploadIcon: null,
  errorText: "",
  disable: false,
  extraStyles: {},
  acceptedFiles: getSupportedImageTypes("all"),
  removeFileCb: null,
  maxFileCount: 5,
  Delete: null,
};

export default MultiFileUpload;
