"use client";

import PropTypes from "prop-types";
import { useState } from "react";
import Accordion from "react-bootstrap/Accordion";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { CiCircleMinus, CiCirclePlus } from "react-icons/ci";
import clsx from "clsx";
import classes from "./CustomAccordion.module.css";

export default function CustomAccordion({
  data,
  headerClass,
  activeBoxClass,
  className,
  titleClass,
  mainClass,
  iconClass,
  isCustomIcon = false,
}) {
  const [isOpen, setIsOpen] = useState(0);

  const handleToggle = (index) => {
    setIsOpen((pre) => (pre === index ? -1 : index));
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      handleToggle(index);
    }
  };

  const renderAccordionItems = () =>
    data?.map((item, i) => {
      const itemKey = item?.id || item?.title || `accordion-${i}`;
      const isItemOpen = isOpen === i;
      const isLastItem = data?.length - 1 === i;
      
      let iconElement;
      if (isCustomIcon) {
        iconElement = isItemOpen ? (
          <IoIosArrowUp color="#454545" size={20} />
        ) : (
          <IoIosArrowDown color="#454545" size={20} />
        );
      } else {
        iconElement = isItemOpen ? (
          <CiCircleMinus className={clsx(iconClass, classes.icon)} />
        ) : (
          <CiCirclePlus className={clsx(iconClass, classes.icon)} />
        );
      }

      return (
        <button
          type="button"
          key={itemKey}
          onClick={() => handleToggle(i)}
          onKeyDown={(e) => handleKeyDown(e, i)}
          className={`${classes.box} ${className} ${
            isItemOpen && classes.activeBox
          } ${isItemOpen && activeBoxClass} ${
            isLastItem ? classes.noBorder : ""
          }`}
          style={{
            background: "none",
            border: "none",
            padding: 0,
            width: "100%",
            textAlign: "left",
            cursor: "pointer",
            display: "block"
          }}
        >
          <div
            className={`${classes.header} ${
              isItemOpen && classes.activeHeader
            } ${headerClass}`}
          >
            <h6 className={clsx(classes.h6, titleClass)}>{item?.title}</h6>
            {iconElement}
          </div>
          <Accordion.Collapse eventKey={i.toString()}>
            <div>
              {item?.description && (
                <p className={classes.answer}>{item?.description}</p>
              )}
            </div>
          </Accordion.Collapse>
        </button>
      );
    });

  const hasData = Array.isArray(data) && data.length > 0;
  const activeKeyValue = isOpen >= 0 ? isOpen.toString() : null;

  return (
    <div className={classes.mainClass}>
      <Accordion activeKey={activeKeyValue}>
        {hasData && renderAccordionItems()}
      </Accordion>
    </div>
  );
}

CustomAccordion.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      title: PropTypes.string.isRequired,
      description: PropTypes.string,
    })
  ).isRequired,
  headerClass: PropTypes.string,
  activeBoxClass: PropTypes.string,
  className: PropTypes.string,
  titleClass: PropTypes.string,
  mainClass: PropTypes.string,
  iconClass: PropTypes.string,
  isCustomIcon: PropTypes.bool,
};

CustomAccordion.defaultProps = {
  headerClass: "",
  activeBoxClass: "",
  className: "",
  titleClass: "",
  mainClass: "",
  iconClass: "",
  isCustomIcon: false,
};
