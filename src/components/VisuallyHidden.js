/**
 * VisuallyHidden — renders children only for screen readers.
 * Visually invisible but still in the accessibility tree.
 *
 * Usage:
 *   <VisuallyHidden component="h1">Sedat Demir Yapı — Anasayfa</VisuallyHidden>
 */
const VisuallyHidden = ({ children, component: Tag = "span" }) => (
  <Tag
    style={{
      position: "absolute",
      width: "1px",
      height: "1px",
      padding: 0,
      margin: "-1px",
      overflow: "hidden",
      clip: "rect(0,0,0,0)",
      whiteSpace: "nowrap",
      border: 0,
    }}
  >
    {children}
  </Tag>
);

export default VisuallyHidden;
