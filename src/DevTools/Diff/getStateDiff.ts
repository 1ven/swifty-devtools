import { mergeDeepRight } from "ramda";
import createObject from "./createObject";
import getValueDiff from "./getValueDiff";

function handlePath(item) {
  if (item.kind !== "A") {
    return item.path;
  }

  if (item.path) {
    return [...item.path, item.index];
  }

  return [item.index];
}

export default diff =>
  diff.reduce((acc, item) => {
    if (item.path || item.kind === "A") {
      return mergeDeepRight(
        acc,
        createObject(handlePath(item), getValueDiff(item))
      );
    }

    return getValueDiff(item);
  }, {});
