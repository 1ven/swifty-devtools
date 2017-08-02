import * as React from "react";
import * as styles from "./styles";
import { compose, withState } from "recompose";

export default compose(
  withState("isActive", "setActive", false)
)(({ link, setActive, children, isActive }: Props & Injected) =>
  <div>
    <div style={styles.title} onClick={() => setActive(!isActive)}>
      {link}
    </div>
    {isActive &&
      <div style={styles.body}>
        {children}
      </div>}
  </div>
);

type Injected = {
  setActive: (active: boolean) => void;
};

export type Props = {
  link: string;
  children: React.Node;
  isActive?: boolean;
};
