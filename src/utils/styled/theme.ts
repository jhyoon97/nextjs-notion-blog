export type Palette = typeof light;

const light = {
  bg: "#fff",
  header: {
    bg: "#1f2328",
    text: "#fff",
  },
  contents: {
    bgHover: "#f0f0f0",
    bgCode: "#eeeeec",
    border: "#cdcdcd",
    text: "#111",
    subText: "#999",
    highlight: "#2383e2",
    link: "#6e6b5e",
    caption: "rgba(55, 53, 47, 0.65)",
    code: "#eb5757",
  },
  tableOfContents: {
    text: "#333",
    hover: "#000",
    highlight: "#2383e2",
  },
  box: {
    bgHover: "#f0f0f0",
    border: "#cdcdcd",
    title: "#333",
    subText: "#999",
    date: "#afafaf",
  },
  notion: {
    gray: "#787774",
    brown: "#9f6b53",
    orange: "#d9730d",
    yellow: "#cb912f",
    green: "#448361",
    blue: "#337ea9",
    purple: "#9065b0",
    pink: "#c14c8a",
    red: "#d44c47",
    gray_background: "#f1f1ef",
    brown_background: "#f4eeee",
    orange_background: "#fbecdd",
    yellow_background: "#fbf3db",
    green_background: "#edf3ec",
    blue_background: "#e7f3f8",
    purple_background: "rgba(244, 240, 247, 0.8)",
    pink_background: "rgba(249, 238, 236, 0.8)",
    red_background: "#fdebec",
  },
};

// const dark: Palette = {}};

export default {
  light,
};
