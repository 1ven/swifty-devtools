import { head, tail } from "ramda";

export default function createObject(path, endpointValue = {}) {
  if (path.length === 1) {
    return {
      [path]: endpointValue
    };
  }

  return {
    [head(path)]: createObject(tail(path), endpointValue)
  };
}
