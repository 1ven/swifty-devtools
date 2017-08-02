import * as React from "react";
import JSONTree from "react-json-tree";
import theme from "./theme";

export default ({ data, valueRenderer }) =>
  <JSONTree
    data={data}
    hideRoot={true}
    theme={{
      extend: theme,
      nestedNode: ({ style }) => ({
        style: {
          ...style,
          paddingTop: "0.35em"
        }
      })
    }}
    invertTheme={false}
    valueRenderer={valueRenderer}
  />;
