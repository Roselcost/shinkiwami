import { useEffect, type ReactNode } from "react";
import Button from "../Button/Button";
import classes from "./Dialog.module.css";
import { setDialog } from "../../redux/store";
import { useDispatch } from "react-redux";
import { CSSTransition } from "react-transition-group";

interface Props {
  children?: ReactNode;
}

const Dialog: React.FC<Props> = ({ children }) => {
  const dispatch = useDispatch();
  const openDialog = (dialog: string) => dispatch(setDialog(dialog));

  
  useEffect(() => {
    const handleEsc = (event: { key: string }) => {
      if (event.key === "Escape") {
        dispatch(setDialog(""));
      }
    };
    window.addEventListener("keydown", handleEsc);

    return () => {
      window.removeEventListener("keydown", handleEsc);
    };
  }, [dispatch]);

  return (
    <>
      <CSSTransition in={true} timeout={1000} classNames="fade opacity">
        <div className={classes.container}>
          <div
            onClick={() => openDialog("")}
            className={`${classes.backdrop} ${classes.animateOpacity}`}
          ></div>
          <div className={`${classes.dialog} ${classes.animateUp}`}>
            <div className={classes.closeButton}>
              <Button
                onClick={() => openDialog("")}
                icon="icons/close.png"
              />
            </div>
            <div className={classes.dialogContent}>{children}</div>
          </div>
        </div>
      </CSSTransition>
    </>
  );
};

export default Dialog;
