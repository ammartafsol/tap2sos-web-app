import React, { useState } from "react";
import classes from "./DocumentsView.module.css";
import { FaFileContract } from "react-icons/fa";
import useAxios from "@/interceptor/axiosInterceptor";

const DocumentsView = ({ doc }) => {
  const [loading, setLoading] = useState('');
  const { Get } = useAxios();

  const handleClick = async () => {
    setLoading('load');
      const { BaseURL } = await import('@/resources/utils/helper');
      const url = BaseURL(`users/media/fetch/${doc.key}`);
      
      const token = document.cookie
        .split('; ')
        .find(row => row.startsWith('_xpdx='))
        ?.split('=')[1];
      
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Accept': 'application/octet-stream',
          'Content-Type': 'application/json',
          ...(token && { 'Authorization': `Bearer ${token}` })
        }
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch file data: ${response.status} ${response.statusText}`);
      }
      const blob = await response.blob();
      const objectUrl = URL.createObjectURL(blob);
      window.open(objectUrl, "_blank");
      setTimeout(() => {
        URL.revokeObjectURL(objectUrl);
      }, 1000);
      setLoading('');

    
  };

  return (
    <div onClick={handleClick} className={classes?.fileItem}>
      <div className={classes.filePreview}>
        {loading === 'load' ? (
          <div className={classes.loadingContainer}>
            <div className={classes.spinner}></div>
            <span className={classes.loadingText}>Loading...</span>
          </div>
        ) : (
          <span className={classes.previewIcon}>
            <FaFileContract
              size={35}
              color="var(--secondary-text)"
            />
          </span>
        )}
      </div>
    </div>
  );
};

export default DocumentsView;
