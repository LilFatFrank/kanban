import sprite from "./icons.svg";

const Sprite = ({ id, width, height, style, className }) => (
  <svg
    width={`${width}px`}
    height={`${height}px`}
    viewBox={`0 0 ${width} ${height}`}
    style={{ ...style }}
    className={className || ""}
  >
    <use href={`${sprite}#${id}`} />
  </svg>
);

export default Sprite;
