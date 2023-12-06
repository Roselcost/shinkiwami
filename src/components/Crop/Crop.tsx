import classes from "./Crop.module.css";
import dojima from "../../assets/darkdojima.jpg";
import ReactCrop from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { setCrop } from "../../redux/store";
import Icon from "../../ui/Icon/Icon";
import strings from "../../assets/strings.json";
import { State } from "../../types/state";

interface Props {}

const Crop: React.FC<Props> = () => {
  const stateProps = useSelector((state: State) => {
    return {
      language: state.language,
      crop: state.crop,
      image: state.image,
    };
  }, shallowEqual);
  const dispatch = useDispatch();

  return (
    <>
      <div className={classes.heading}>
        <Icon icon={"src/assets/icons/crop.png"}></Icon>
        <h2>{strings[stateProps.language].cropImage}</h2>
      </div>
      <div className={classes.crop}>
        <div className={classes.cropImage}>
          <ReactCrop
            minHeight={50}
            aspect={16 / 9}
            crop={stateProps.crop}
            onChange={(c) =>
              dispatch(
                setCrop({
                  ...c,
                  vwidth: stateProps.crop.vwidth,
                  vheight: stateProps.crop.vheight,
                })
              )
            }
          >
            <img
              id="sourceImage"
              src={stateProps.image ? stateProps.image : dojima}
            />
          </ReactCrop>
        </div>
      </div>
    </>
  );
};

export default Crop;
