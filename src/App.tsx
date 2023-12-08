import classes from "./App.module.css";
import Button from "./ui/Button/Button";
import Input from "./ui/Input/Input";
import Viewport from "./components/Viewport/Viewport";
import Icon from "./ui/Icon/Icon";
import Language from "./components/Language/Language";
import About from "./components/About/About";
import Dialog from "./ui/Dialog/Dialog";
import Crop from "./components/Crop/Crop";
import * as domtoimage from "dom-to-image";
import strings from "./assets/strings.json";

import { useSelector, useDispatch, shallowEqual } from "react-redux";
import {
  setTitle,
  setDialog,
  setBrightness,
  setContrast,
  setShadows,
  setLine2,
  setLine1,
  reset,
  setImage,
  setCrop,
  setAspect,
  setGrayscale,
  setDramaticShadows,
  setDramaticContrast,
  setTextOpacity,
  setDramatic,
  setIsMobile,
} from "./redux/store";
import { useEffect, useState } from "react";
import { State } from "./types/state";

const audio = new Audio();
let globalDramatic = false;

function App() {
  const stateProps = useSelector((state: State) => {
    return {
      language: state.language,
      dialog: state.dialog,
      dramatic: state.dramatic,
      title: state.title,
      line1: state.line1,
      line2: state.line2,
      brightness: state.brightness,
      shadows: state.shadows,
      contrast: state.contrast,
      isMobile: state.isMobile,
      crop: state.crop,
    };
  }, shallowEqual);
  const dispatch = useDispatch();

  const [languageDropdown, toggleLanguageDropdown] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      const isMobile = window.innerWidth <= 700;
      const wasMobile = stateProps.isMobile;

      if (isMobile !== wasMobile) {
        dispatch(
          setCrop({
            ...stateProps.crop,
            x: stateProps.crop.x * (!isMobile ? 2 : 0.5),
            y: stateProps.crop.y * (!isMobile ? 2 : 0.5),
            width: stateProps.crop.width * (!isMobile ? 2 : 0.5),
            height: stateProps.crop.height * (!isMobile ? 2 : 0.5),
            vwidth: stateProps.crop.vwidth * (!isMobile ? 2 : 0.5),
            vheight: stateProps.crop.vheight * (!isMobile ? 2 : 0.5),
          })
        );
      }
      dispatch(setIsMobile(isMobile));
    };
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [stateProps, dispatch]);

  const handleInputChange = (target: HTMLInputElement, type: string) => {
    switch (type) {
      case "title":
        dispatch(setTitle(target.value));
        break;
      case "line1":
        dispatch(setLine1(target.value));
        break;
      case "line2":
        dispatch(setLine2(target.value));
        break;
      case "brightness":
        dispatch(setBrightness(target.value));
        break;
      case "contrast":
        dispatch(setContrast(target.value));
        break;
      case "shadows":
        dispatch(setShadows(target.value));
        break;
    }
  };

  const downloadImage = () => {
    let scale = "scale(2)";
    if (stateProps.isMobile) {
      scale = "scale(4)";
    }
    domtoimage
      .toPng(document.getElementById("imageContainer")!, {
        width: 1280,
        height: 720,
        style: { transform: scale, transformOrigin: "top left" },
      })
      .then(function (dataUrl) {
        const img = new Image();
        img.src = dataUrl;
        const link = document.createElement("a");
        link.download = "shinkiwami.png";
        link.href = dataUrl;
        link.click();
      })
      .catch(function (error) {
        console.error("oops, something went wrong!", error);
      });
  };

  const playDramaticEffect = () => {
    audio.src = "effect.mp3";
    dispatch(setDramatic(false));
    globalDramatic = false;
    dispatch(setDramatic(true));
    globalDramatic = true;
    const shadowValue = stateProps.shadows;
    const contrastValue = stateProps.contrast;
    let interval = -800;
    dispatch(setGrayscale(0));
    dispatch(setDramaticShadows(0));
    dispatch(setDramaticContrast(100));
    dispatch(setTextOpacity(0));
    const time = setInterval(() => {
      if (interval > 0) {
        if (interval > 0 && interval < 100) audio.play();
        if (interval < 500) {
          dispatch(setDramaticShadows(0));
          dispatch(setTextOpacity(0));
        } else {
          dispatch(
            setDramaticShadows(
              Math.min(((interval - 500) / 500) * shadowValue, shadowValue)
            )
          );
          dispatch(setTextOpacity(Math.min((interval - 500) / 500, 1)));
        }
        dispatch(
          setDramaticContrast(
            Math.min(
              Math.max(100, (interval / 500) * contrastValue),
              contrastValue
            )
          )
        );
        dispatch(setGrayscale(Math.min((interval / 500) * 95, 95)));
      }
      interval = interval + 20;
      if (interval > 5500 || !globalDramatic) {
        dispatch(setDramatic(false));
        globalDramatic = false;
        dispatch(setTextOpacity(1));
        dispatch(setGrayscale(95));
        clearInterval(time);
      }
    }, 20);
  };

  const stopDramaticEffect = () => {
    audio.pause();
    audio.src = "";
    dispatch(setDramatic(false));
    globalDramatic = false;
  };

  const uploadImage = (target: HTMLInputElement) => {
    const file = target?.files?.[0];
    const isImage = file?.type.substring(0, 5) === "image";
    if (isImage) {
      const blobImage = URL.createObjectURL(file);
      const htmlImgElement = new Image();
      htmlImgElement.src = blobImage;
      dispatch(setImage(blobImage));
      let x = 0,
        y = 0;
      htmlImgElement.onload = function () {
        const isMobile = stateProps.isMobile;
        let width = htmlImgElement.width;
        let height = htmlImgElement.height;
        const aspect = width / height;
        const coefficientX = width / (isMobile ? 320 : 640);
        const coefficientY = height / (isMobile ? 180 : 360);
        if (aspect > 16 / 9) {
          width = (16 / 9) * height;
          if (coefficientX > 1) {
            width = width / coefficientX;
            height = height / coefficientX;
          }
          x = (isMobile ? 160 : 320) - width / 2;
          y = 0;
        } else {
          height = width / (16 / 9);
          if (coefficientY > 1) {
            width = width / coefficientY;
            height = height / coefficientY;
          }
          x = 0;
          y = (isMobile ? 90 : 180) - height / 2;
        }
        dispatch(setAspect(aspect));
        dispatch(
          setCrop({
            x,
            y,
            width: width,
            height: height,
            vwidth: width,
            vheight: height,
            unit: "px",
          })
        );
      };
      dispatch(setDialog("crop"));
    } else {
      alert("This file is not an image!");
    }
  };

  return (
    <>
      <div className={classes.bg}>
        <img src="bg.jpg"></img>
      </div>
      <div
        style={{ fontSize: stateProps.language === "jp" ? "14px" : "16px" }}
        className={classes.limits}
      >
        {stateProps.dialog === "info" && (
          <Dialog>
            <About />
          </Dialog>
        )}
        {stateProps.dialog === "crop" && (
          <Dialog>
            <Crop />
          </Dialog>
        )}
        <header>
          <div>
            <Icon text="極" />
          </div>
          <h1>Shin Kiwami Generator</h1>
          <div className={classes.headerButtons}>
            <Button
              onClick={() => dispatch(setDialog("info"))}
              icon={"icons/info.svg"}
            />
            <Button
              onClick={() => {
                document.body.style.overflow = "hidden";
                toggleLanguageDropdown(!languageDropdown);
              }}
              icon={"icons/globe.svg"}
            />
          </div>
          {languageDropdown && (
            <div className={classes.languageDropdown}>
              <Language
                onDropdownClick={() => {
                  document.body.style.overflow = "";
                  toggleLanguageDropdown(!languageDropdown);
                }}
              />
            </div>
          )}
        </header>
        <div className={classes.content}>
          <div className={`${classes.card} ${classes.imageViewer}`}>
            <div className={classes.uploadInput}>
              <Input
                onChange={(e) => uploadImage(e)}
                type="upload"
                label={strings[stateProps.language].upload}
                icon="icons/upload.png"
              />
            </div>
            <Viewport />
            <div className={classes.imageButtons}>
              <Button
                onClick={downloadImage}
                icon={"icons/download.png"}
                label={
                  stateProps.isMobile
                    ? ""
                    : strings[stateProps.language].download
                }
              />
              <Button
                onClick={() =>
                  !stateProps.dramatic
                    ? playDramaticEffect()
                    : stopDramaticEffect()
                }
                playing={stateProps.dramatic}
                label={
                  stateProps.isMobile
                    ? ""
                    : stateProps.dramatic
                    ? strings[stateProps.language].stop
                    : strings[stateProps.language].play
                }
                icon={stateProps.dramatic ? "icons/stop.png" : "icons/play.png"}
              />
              <Button
                onClick={() => dispatch(setDialog("crop"))}
                icon={"icons/crop.png"}
                label={
                  stateProps.isMobile ? "" : strings[stateProps.language].crop
                }
              />
            </div>
          </div>
          <div className={`${classes.card} ${classes.controls}`}>
            <Input
              onChange={(event) => handleInputChange(event, "title")}
              value={stateProps.title}
              type="text"
              label={strings[stateProps.language].title}
            />
            <Input
              onChange={(event) => handleInputChange(event, "line1")}
              value={stateProps.line1}
              type="text"
              label={strings[stateProps.language].line1}
            />
            <Input
              onChange={(event) => handleInputChange(event, "line2")}
              value={stateProps.line2}
              type="text"
              label={strings[stateProps.language].line2}
            />
            <Input
              onChange={(event) => handleInputChange(event, "brightness")}
              value={stateProps.brightness}
              type="slider"
              min={100}
              max={200}
              label={strings[stateProps.language].brightness}
            />
            <Input
              onChange={(event) => handleInputChange(event, "contrast")}
              value={stateProps.contrast}
              type="slider"
              min={150}
              max={200}
              label={strings[stateProps.language].contrast}
            />
            <Input
              onChange={(event) => handleInputChange(event, "shadows")}
              value={stateProps.shadows}
              type="slider"
              min={0}
              max={100}
              label={strings[stateProps.language].shadows}
            />
            <div>
              <Button
                onClick={() => dispatch(reset())}
                icon={"icons/reset.png"}
                label={strings[stateProps.language].reset}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
