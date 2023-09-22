import { ButtonOwnProps } from "@mui/material";

export const BACKGROUND = "#E8E8E8";

// convert colors into an object
export enum COLORS {
  white = "#fff",
  primaryGreen = "#b2e1bb",
  greenAction = "#16be35",
  primaryBlue = "#6c90d5",
  secondaryViolet = "#c3acf3",
  secondaryYellow = "#d9e952",
  secondaryPink = "#d795be"
}

export const baseButtonStyle = {
  sx: { border: "2px solid" },
  color: "inherit"
} as ButtonOwnProps;

export const iconButtonStyle = {
  ...baseButtonStyle,
  sx: { ...baseButtonStyle.sx, backgroundColor: COLORS.white }
} as ButtonOwnProps;

export const editConnectStyle = (color: COLORS) => ({
  ...baseButtonStyle,
  sx: {
    ...baseButtonStyle.sx,
    px: 4,
    backgroundColor: color
  }
});
