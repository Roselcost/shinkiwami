import classes from "./Icon.module.css";

interface Props {
  text?: string;
  icon?: string;
}

const Icon: React.FC<Props> = ({ text, icon }) => {
  return (
    <>
      <div className={classes.icon}>
        <span className={classes.textIcon}>{text}</span>
        {icon && <img className={classes.innerIcon} src={icon}></img>}
      </div>
    </>
  );
};

export default Icon;
