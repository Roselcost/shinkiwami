import classes from "./SvgText.module.css";

interface Props {
  text: string;
  position: string;
  main: boolean;
  isMobile: boolean;
}

const SvgText: React.FC<Props> = ({ text, position, main, isMobile }) => {
  return (
    <>
      <text
        className={main ? `${classes.text} ${classes.main}` : `${classes.text}`}
        x="50%"
        y={position}
        textAnchor="middle"
        fill="#aa0a0c"
        stroke="white"
        strokeWidth={isMobile ? "1.5px" : "3px"}
      >
        {text}
      </text>
    </>
  );
};

export default SvgText;
