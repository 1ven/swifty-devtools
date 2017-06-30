export const root = (visible: boolean) => ({
  width: 300,
  height: "100%",
  position: "fixed",
  top: 0,
  right: 0,
  borderLeft: "1px solid #ddd",
  backgroundColor: "#fff",
  display: visible ? "block" : "none",
  overflowY: "scroll",
  userSelect: "none"
});

export const item = {
  fontFamily: "Consolas, monospace",
  fontSize: 12,
  padding: 5,
  borderBottom: "1px solid #ddd"
};
