import { outlinedInputClasses } from "@mui/material/OutlinedInput";
import { createTheme } from "@mui/material/styles";
import { Roboto } from "next/font/google";

export const roboto = Roboto({
  weight: ["300", "400", "500", "700"],
  subsets: ["latin"],
  display: "swap"
});

const BACKGROUND = "#E8E8E8";
export enum COLORS {
  white = "#fff",
  primaryGreen = "#b2e1bb",
  greenAction = "#16be35",
  primaryBlue = "#6c90d5",
  secondaryViolet = "#c3acf3",
  secondaryYellow = "#d9e952",
  secondaryPink = "#d795be",
  secondaryOrange = "#F6C174"
}

export const theme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: COLORS.primaryGreen,
      dark: COLORS.greenAction,
      contrastText: BACKGROUND
    },
    secondary: {
      main: COLORS.secondaryViolet,
      dark: COLORS.secondaryPink,
      contrastText: BACKGROUND
    },
    background: {
      default: "#E8E8E8",
      paper: "#FFFFFF"
    }
  },
  typography: {
    fontFamily: roboto.style.fontFamily
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: "0",
          borderWidth: "2px",
          borderStyle: "solid",
          borderColor: "#000",
          color: "#000"
        }
      }
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          "--TextField-brandBorderColor": "#000",
          "--TextField-brandBorderHoverColor": "#000",
          "--TextField-brandBorderFocusedColor": "#000",
          "& label.Mui-focused": {
            color: "var(--TextField-brandBorderFocusedColor)"
          }
        }
      }
    },
    MuiOutlinedInput: {
      styleOverrides: {
        notchedOutline: {
          borderColor: "var(--TextField-brandBorderColor)"
        },
        root: {
          [`&:hover .${outlinedInputClasses.notchedOutline}`]: {
            borderColor: "var(--TextField-brandBorderHoverColor)"
          },
          [`&.Mui-focused .${outlinedInputClasses.notchedOutline}`]: {
            borderColor: "var(--TextField-brandBorderFocusedColor)"
          }
        }
      }
    },
    MuiFilledInput: {
      styleOverrides: {
        root: {
          "&:before, &:after": {
            borderBottom: "2px solid var(--TextField-brandBorderColor)"
          },
          "&:hover:not(.Mui-disabled, .Mui-error):before": {
            borderBottom: "2px solid var(--TextField-brandBorderHoverColor)"
          },
          "&.Mui-focused:after": {
            borderBottom: "2px solid var(--TextField-brandBorderFocusedColor)"
          }
        }
      }
    },
    MuiInput: {
      styleOverrides: {
        root: {
          "&:before": {
            borderBottom: "2px solid var(--TextField-brandBorderColor)"
          },
          "&:hover:not(.Mui-disabled, .Mui-error):before": {
            borderBottom: "2px solid var(--TextField-brandBorderHoverColor)"
          },
          "&.Mui-focused:after": {
            borderBottom: "2px solid var(--TextField-brandBorderFocusedColor)"
          }
        }
      }
    }
  },
  shape: {
    borderRadius: 0
  }
});
