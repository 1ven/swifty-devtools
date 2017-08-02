export const root = (visible: boolean) => ({
  backgroundColor: "#1B2B34",
  width: 400,
  height: "100%",
  position: "fixed",
  top: 0,
  right: 0,
  display: visible ? "block" : "none",
  overflowY: "auto",
  userSelect: "none"
});

export const item = {
  fontFamily: "PT Mono, monospace",
  fontSize: 16,
  borderBottom: "1px solid #C0C5CE"
};
