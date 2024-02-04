import { ButtonOwnProps } from "@mui/material";
import { COLORS } from "~/theme";

export const BACKGROUND = "#E8E8E8";

// convert colors into an object

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
