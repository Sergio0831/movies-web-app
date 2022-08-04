import React from "react";
import { Loading } from "../icons";
import classes from "./SectionLoading.module.scss";

const SectionLoading = () => {
  return (
    <section className={classes.section}>
      <Loading />
    </section>
  );
};

export default SectionLoading;
