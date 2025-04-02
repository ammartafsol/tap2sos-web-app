import React from 'react';
import classes from './HomePage.module.css';

export default function HomePage() {
  return (
    <>
      <p className={classes.black}>This is Black font</p>
      <p className={classes.heavy}>This is Heavy font</p>
      <p className={classes.bold}>This is Bold font</p>
      <p className={classes.semibold}>This is Semibold font</p>
      <p className={classes.medium}>This is Medium font</p>
      <p className={classes.regular}>This is Regular font</p>
      <p className={classes.light}>This is Light font</p>
      <p className={classes.thin}>This is Thin font</p>
      <p className={classes.ultralight}>This is Ultralight font</p>
      <p className={classes.test}>This is Test</p>

      <p className={'h1'}>Test</p>

    </>
  )
}
