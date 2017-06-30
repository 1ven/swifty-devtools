import * as React from "react";
import { render } from "react-dom";
import DevTools from "./DevTools";

const createHtmlNode = () => {
  const node = document.createElement("div");
  node.setAttribute("id", "swifty-logger");
  document.body.append(node);

  return node;
};

export default reducer$ => {
  const rootNode = createHtmlNode();
  render(<DevTools reducer$={reducer$} />, rootNode);
};
