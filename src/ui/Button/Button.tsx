import { MouseEventHandler } from "react";
import classes from "./Button.module.css";

interface Props {
  label?: string;
  icon?: string;
  onClick?: MouseEventHandler;
  width?: string;
  playing?: boolean;
}

const Button: React.FC<Props> = ({ label, icon, onClick, width, playing }) => {
  return (
    <button
      style={{
        width,
      }}
      onClick={onClick}
      className={playing ? `${classes.playing}` : ""}
    >
      {icon && <img className={classes.buttonIcon} src={icon}></img>}
      {label}
    </button>
  );
};

export default Button;
