import * as React from "react";
import * as moment from "moment";
import { createModel } from "swifty";
import { compose, withState, lifecycle } from "recompose";
import Toggle from "./Toggle";
import Tree from "./Tree";
import Diff from "./Diff";
import * as styles from "./styles";

const listenStateChange = (reducer$, callback: (prev, current) => void) => {
  let prevState;
  createModel(reducer$).observe(currentState => {
    callback(prevState, currentState);
    prevState = currentState;
  });
};

const listenKeyDown = (callback: Function) => {
  document.addEventListener("keydown", e => {
    if (e.keyCode === 72 && e.ctrlKey) {
      callback();
    }
  });
};

export default compose(
  withState("visible", "setVisibility", false),
  withState("history", "setHistory", []),
  lifecycle({
    componentDidMount() {
      const { setHistory, setVisibility } = this.props;

      listenKeyDown(() => setVisibility(!this.props.visible));

      listenStateChange(this.props.reducer$, (prevState, currentState) => {
        setHistory([
          ...this.props.history,
          {
            title: moment().format("hh:mm:ss:SSS"),
            prevState,
            currentState
          }
        ]);
      });
    }
  })
)(({ visible, history }) =>
  <div style={styles.root(visible)}>
    {history.map(({ title, prevState, currentState }, i) =>
      <div key={i} style={styles.item}>
        <Toggle link={title}>
          <Tree data={{ state: currentState }} />
          {prevState &&
            currentState &&
            <Diff {...{ prevState, currentState }} />}
        </Toggle>
      </div>
    )}
  </div>
);
