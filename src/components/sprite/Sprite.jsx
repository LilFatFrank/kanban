import sprite from "./icons.svg";

const Sprite = ({ id, width, height, style, className, onClick }) => (
  <svg
    width={`${width}px`}
    height={`${height}px`}
    viewBox={`0 0 ${width} ${height}`}
    style={{ ...style }}
    className={className || ""}
    onClick={onClick}
  >
    <use href={`${sprite}#${id}`} />
  </svg>
);

export default Sprite;
