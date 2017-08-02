import * as React from "react";
import { head, tail } from "ramda";
import deepDiff from "deep-diff";
import Tree from "../Tree";
import getStateDiff from "./getStateDiff";
import * as styles from "./styles";

function renderer(raw, value) {
  const kind = head(value);
  const data = tail(value).split(";");

  switch (kind) {
    case "E":
      return <Update prev={data[0]} next={data[1]} />;
    case "D":
      return <Prev value={data[0]} />;
    case "N":
      return <Next value={data[0]} />;
  }
}

function Update({ prev, next }) {
  return (
    <span>
      <Prev value={prev} />
      <span style={styles.arrow}> => </span>
      <Next value={next} />
    </span>
  );
}

function Prev({ value }) {
  return <span style={styles.prev}>{value}</span>;
}

function Next({ value }) {
  return <span style={styles.next}>{value}</span>;
}

export default ({ prevState, currentState }) => {
  const diff = deepDiff(prevState, currentState);
  return diff
    ? <Tree data={{ diff: getStateDiff(diff) }} valueRenderer={renderer} />
    : <div style={styles.equal}>States are equal</div>;
};
