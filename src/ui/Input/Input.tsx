import { useEffect } from "react";
import classes from "./Input.module.css";
import { useSelector } from "react-redux";
import { State } from "../../types/state";

interface Props {
  label?: string;
  type?: string;
  icon?: string;
  value?: string | number;
  onChange: (target: HTMLInputElement) => void;
  min?: number;
  max?: number;
}

const Input: React.FC<Props> = ({
  label,
  type,
  icon,
  value,
  onChange,
  min,
  max,
}) => {
  const isMobile = useSelector((state: State) => state.isMobile);

  useEffect(() => {
    window.addEventListener("resize", () => {});

    return () => {
      window.removeEventListener("resize", () => {});
    };
  }, []);

  return (
    <>
      <div className={classes.control}>
        <div className={classes.inputIcon}>
          {icon && <img src={icon}></img>}
        </div>
        <label
          style={
            icon
              ? isMobile
                ? { width: "60px" }
                : { width: "170px", paddingRight: 0 }
              : {}
          }
          htmlFor={label}
          className={classes.label}
        >
          {isMobile && icon ? "" : label}
        </label>
        <div
          style={{
            width: isMobile && icon ? "calc(100% - 60px)" : "",
          }}
          className={classes.value}
        >
          {type === "text" ? (
            <input
              type="text"
              onChange={(e) => onChange(e.target)}
              value={value}
            />
          ) : type === "upload" ? (
            <>
              <input
                onChange={(e) => onChange(e.target)}
                type="file"
                accept="image/*"
              ></input>
            </>
          ) : (
            <input
              onChange={(e) => onChange(e.target)}
              type="range"
              min={min}
              max={max}
              value={value}
            />
          )}
        </div>
      </div>
    </>
  );
};

export default Input;
