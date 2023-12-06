import classes from "./Language.module.css";
import Button from "../../ui/Button/Button";
import { setLanguage } from "../../redux/store";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { CSSTransition } from "react-transition-group";

interface Props {
  onDropdownClick: () => void;
}

const Language: React.FC<Props> = ({ onDropdownClick }) => {
  const dispatch = useDispatch();
  const selectLanguage = (language: string) => {
    dispatch(setLanguage(language));
    onDropdownClick();
  };

  useEffect(() => {
    const handleEsc = (event: { key: string }) => {
      if (event.key === "Escape") {
        onDropdownClick();
      }
    };
    window.addEventListener("keydown", handleEsc);

    return () => {
      window.removeEventListener("keydown", handleEsc);
    };
  }, [onDropdownClick]);

  return (
    <>
      <CSSTransition in={true} timeout={1000} classNames="opacity">
        {() => (
          <>
            <div
              onClick={() => onDropdownClick()}
              className={`${classes.backdrop} ${classes.animateOpacity}`}
            ></div>
            <div className={`${classes.languages} ${classes.animateOpacity}`}>
              <Button onClick={() => selectLanguage("en")} label={"English"} />
              <Button onClick={() => selectLanguage("es")} label={"Español"} />
              <Button onClick={() => selectLanguage("cat")} label={"Català"} />
              <Button onClick={() => selectLanguage("jp")} label={"日本語"} />
            </div>
          </>
        )}
      </CSSTransition>
    </>
  );
};

export default Language;
