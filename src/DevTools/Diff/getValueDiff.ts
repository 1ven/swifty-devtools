import * as React from "react";
import * as styles from "./styles";
import { stringify } from "style-attr";

function crop(s: string) {
  return s.length > 40 ? s.slice(0, 30) + "..." + s.slice(s.length - 10) : s;
}

function addQuotesIfString<T>(v: T) {
  return typeof v === "string" ? `"${v}"` : v;
}

function renderValue<T>(v: T) {
  return typeof v === "object" ? crop(JSON.stringify(v)) : addQuotesIfString(v);
}

export default function makeValueDiff({ lhs, rhs, kind, item }) {
  const prev = renderValue(lhs);
  const next = renderValue(rhs);

  switch (kind) {
    case "E":
      return `E${prev};${next}`;
    case "D":
      return `D${prev}`;
    case "N":
      return `N${next}`;
    case "A":
      return makeValueDiff(item);
  }
}
