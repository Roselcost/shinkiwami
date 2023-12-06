import { createSlice, configureStore } from "@reduxjs/toolkit";

const isMobile = window.innerWidth <= 700;

export const stateSlice = createSlice({
  name: "state",
  initialState: {
    title: "Kazuma Kiryu",
    line1: "Lieutenant Advisor of the Dojima Family,",
    line2: "A Tojo Clan Subsidiary",
    shadows: 50,
    brightness: 100,
    contrast: 200,
    language: "en",
    crop: {
      x: 0,
      y: 0,
      width: isMobile ? 320 : 640,
      height: isMobile ? 180 : 360,
      vwidth: isMobile ? 320 : 640,
      vheight: isMobile ? 180 : 360,
      unit: "px",
    },
    aspect: 16 / 9,
    image: "",
    dialog: "",
    grayscale: 95,
    dramaticShadows: 0,
    dramaticContrast: 0,
    textOpacity: 1,
    dramatic: false,
    isMobile,
  },
  reducers: {
    setTitle: (state, value) => {
      state.title = value.payload;
    },
    setLine1: (state, value) => {
      state.line1 = value.payload;
    },
    setLine2: (state, value) => {
      state.line2 = value.payload;
    },
    setShadows: (state, value) => {
      state.shadows = value.payload;
    },
    setBrightness: (state, value) => {
      state.brightness = value.payload;
    },
    setContrast: (state, value) => {
      state.contrast = value.payload;
    },
    setLanguage: (state, value) => {
      state.language = value.payload;
    },
    setDialog: (state, value) => {
      document.body.style.overflow = !value.payload ? "" : "hidden";
      state.dialog = value.payload;
    },
    setImage: (state, value) => {
      state.image = value.payload;
    },
    setAspect: (state, value) => {
      state.aspect = value.payload;
    },
    setCrop: (state, value) => {
      state.crop = value.payload;
    },
    reset: (state) => {
      state.brightness = 100;
      state.shadows = 50;
      state.contrast = 200;
    },
    setGrayscale: (state, value) => {
      state.grayscale = value.payload;
    },
    setDramaticShadows: (state, value) => {
      state.dramaticShadows = value.payload;
    },
    setDramaticContrast: (state, value) => {
      state.dramaticContrast = value.payload;
    },
    setTextOpacity: (state, value) => {
      state.textOpacity = value.payload;
    },
    setDramatic: (state, value) => {
      state.dramatic = value.payload;
    },
    setIsMobile: (state, value) => {
      state.isMobile = value.payload;
    },
  },
});

export const {
  setTitle,
  setLine1,
  setLine2,
  setShadows,
  setBrightness,
  setContrast,
  setLanguage,
  setDialog,
  setImage,
  setAspect,
  setCrop,
  reset,
  setGrayscale,
  setDramaticShadows,
  setDramaticContrast,
  setTextOpacity,
  setDramatic,
  setIsMobile,
} = stateSlice.actions;

export const store = configureStore({
  reducer: stateSlice.reducer,
});

export default store;
