export type State = {
  title: string;
  line1: string;
  line2: string;
  shadows: number;
  brightness: number;
  contrast: number;
  language: language;
  crop: {
    x: number;
    y: number;
    width: number;
    height: number;
    vwidth: number;
    vheight: number;
    unit: "px";
  };
  aspect: number;
  image: string;
  dialog: string;
  grayscale: number;
  dramaticShadows: number;
  dramaticContrast: number;
  textOpacity: number;
  dramatic: boolean;
  isMobile: boolean;
};

enum language {
  en = "en",
  es = "es",
  jp = "jp",
  cat = "cat",
}
