"use client";

import { Fragment, useState } from "react";
import Accordion from "react-bootstrap/Accordion";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { CiCircleMinus, CiCirclePlus } from "react-icons/ci";
import clsx from "clsx";
import React from "react";
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

  const renderAccordionItems = () =>
    data?.map((item, i) => (
      <div
        key={i}
        onClick={() => setIsOpen((pre) => (pre === i ? -1 : i))}
        className={`${classes.box} ${className} ${
          i === isOpen && classes.activeBox
        } ${i === isOpen && activeBoxClass} ${
          data?.length - 1 === i ? classes.noBorder : ""
        }`}
      >
        <div
          className={`${classes.header} ${
            isOpen === i && classes.activeHeader
          } ${headerClass}`}
        >
          <h6 className={clsx(classes.h6, titleClass)}>{item?.title}</h6>
          {!isCustomIcon ? (
            isOpen !== i ? (
              <CiCirclePlus className={clsx(iconClass, classes.icon)} />
            ) : (
              <CiCircleMinus className={clsx(iconClass, classes.icon)} />
            )
          ) : isOpen !== i ? (
            <IoIosArrowDown color="#454545" size={20} />
          ) : (
            <IoIosArrowUp color="#454545" size={20} />
          )}
        </div>
        <Accordion.Collapse eventKey={i}>
          <Fragment>
            {item?.description && (
              <p className={classes.answer}>{item?.description}</p>
            )}
          </Fragment>
        </Accordion.Collapse>
      </div>
    ));

  return (
    <div className={classes.mainClass}>
      <Accordion activeKey={isOpen}>
        {Array.isArray(data) && data.length > 0 && renderAccordionItems()}
      </Accordion>
    </div>
  );
}
