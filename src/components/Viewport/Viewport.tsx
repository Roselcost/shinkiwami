import classes from "./Viewport.module.css";
import dojima from "../../assets/darkdojima.jpg";
import SvgText from "./SvgText/SvgText";
import { shallowEqual, useSelector } from "react-redux";
import { State } from "../../types/state";

function Viewport() {
  const stateProps = useSelector((state: State) => {
    return {
      dramatic: state.dramatic,
      title: state.title,
      line1: state.line1,
      line2: state.line2,
      brightness: state.brightness,
      dramaticContrast: state.dramaticContrast,
      dramaticShadows: state.dramaticShadows,
      shadows: state.shadows,
      image: state.image,
      textOpacity: state.textOpacity,
      contrast: state.contrast,
      isMobile: state.isMobile,
      crop: state.crop,
      aspect: state.aspect,
      grayscale: state.grayscale,
    };
  }, shallowEqual);
  const isMobile = stateProps.isMobile;

  const setShadowStyle = () => {
    let a = 139,
      b = 150,
      c = -0;
    if (isMobile) {
      a /= 2;
      b /= 2;
      c /= 2;
    }
    if (stateProps.dramatic) {
      return {
        boxShadow:
          "inset " +
          a +
          "px 0px " +
          b +
          "px " +
          c +
          "px rgba(0,0,0," +
          stateProps.dramaticShadows / 100 +
          ")," +
          " inset -" +
          a +
          "px 0px " +
          b +
          "px " +
          c +
          "px rgba(0,0,0," +
          stateProps.dramaticShadows / 100 +
          ")",
      };
    } else
      return {
        boxShadow:
          "inset " +
          a +
          "px 0px " +
          b +
          "px " +
          c +
          "px rgba(0,0,0," +
          stateProps.shadows / 100 +
          ")," +
          " inset -" +
          a +
          "px 0px " +
          b +
          "px " +
          c +
          "px rgba(0,0,0," +
          stateProps.shadows / 100 +
          ")",
      };
  };

  const setImgStyle = () => {
    const landscape = stateProps.aspect > 16 / 9;
    const zoom = landscape
      ? (isMobile ? 320 : 640) / stateProps.crop.width
      : (isMobile ? 180 : 360) / stateProps.crop.height;
    const hzoom = landscape
      ? stateProps.crop.vwidth / stateProps.crop.width
      : stateProps.crop.vheight / stateProps.crop.height;

    return {
      top: -stateProps.crop.y * zoom,
      left: -stateProps.crop.x * zoom,
      height: landscape ? hzoom * 100 + "%" : "",
      width: !landscape ? hzoom * 100 + "%" : "",
      filter: "grayscale(" + stateProps.grayscale + "%)",
    };
  };

  return (
    <>
      <div className={classes.viewport}>
        <div id="imageContainer" className={classes.imageContainer}>
          <div className={classes.shadows} style={setShadowStyle()}>
            <div
              className={classes.brightness}
              style={{ filter: "brightness(" + stateProps.brightness + "%" }}
            >
              <div
                className={classes.contrast}
                style={{
                  filter:
                    "contrast(" +
                    (stateProps.dramatic
                      ? stateProps.dramaticContrast
                      : stateProps.contrast) +
                    "%)",
                }}
              >
                <img
                  style={setImgStyle()}
                  className={classes.image}
                  src={stateProps.image ? stateProps.image : dojima}
                ></img>
              </div>
            </div>
            <div
              style={{ opacity: stateProps.textOpacity }}
              className={classes.imageText}
            >
              <svg className={classes.svg} height={"55"}>
                <SvgText
                  main={true}
                  isMobile={isMobile}
                  position={
                    stateProps.line2
                      ? isMobile
                        ? "95"
                        : "50"
                      : isMobile
                      ? ""
                      : "80"
                  }
                  text={stateProps.title}
                />
                <SvgText
                  main={false}
                  isMobile={isMobile}
                  position={
                    stateProps.line2
                      ? isMobile
                        ? "117.5"
                        : "95"
                      : isMobile
                      ? ""
                      : "120"
                  }
                  text={stateProps.line1}
                />
                <SvgText
                  main={false}
                  isMobile={isMobile}
                  position={isMobile ? "130" : "120"}
                  text={stateProps.line2}
                />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Viewport;
