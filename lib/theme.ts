"use client";
import { createTheme } from "@mui/material/styles";

export const getTheme = (mode: "light" | "dark") =>
  createTheme({
    palette: {
      mode,
      primary: { main: "#FF5722", light: "#FF8A65", dark: "#E64A19" },
      secondary: { main: "#1A1A2E" },
      success: { main: "#25D366" },
      background: {
        default: mode === "dark" ? "#0D0D0D" : "#F9F9F9",
        paper: mode === "dark" ? "#1A1A1A" : "#FFFFFF",
      },
      text: {
        primary: mode === "dark" ? "#FFFFFF" : "#1A1A2E",
        secondary: mode === "dark" ? "rgba(255,255,255,0.7)" : "rgba(26,26,46,0.7)",
      },
      divider: mode === "dark" ? "rgba(255,255,255,0.12)" : "rgba(0,0,0,0.12)",
    },
    typography: {
      fontFamily: '"Inter", "Roboto", sans-serif',
      h1: {
        fontSize: "clamp(2.5rem, 6vw, 5rem)",
        fontWeight: 800,
        letterSpacing: "-0.02em",
        lineHeight: 1.1,
      },
      h2: {
        fontSize: "clamp(2rem, 4vw, 3rem)",
        fontWeight: 700,
        letterSpacing: "-0.01em",
      },
      h3: {
        fontSize: "clamp(1.5rem, 3vw, 2rem)",
        fontWeight: 600,
      },
      h4: {
        fontSize: "clamp(1.25rem, 2vw, 1.5rem)",
        fontWeight: 600,
      },
      h5: {
        fontSize: "1.125rem",
        fontWeight: 600,
      },
      h6: {
        fontSize: "1rem",
        fontWeight: 500,
      },
      button: {
        textTransform: "none",
        fontWeight: 600,
      },
    },
    shape: { borderRadius: 12 },
    components: {
      MuiButton: {
        styleOverrides: {
          root: {
            borderRadius: 50,
            padding: "10px 28px",
            transition: "all 0.25s cubic-bezier(0.4,0,0.2,1)",
            "&:hover": {
              transform: "scale(1.04)",
              boxShadow: "0 8px 24px rgba(255,87,34,0.35)",
            },
          },
          containedPrimary: {
            background: "linear-gradient(135deg, #FF5722 0%, #E64A19 100%)",
          },
        },
      },
      MuiCard: {
        styleOverrides: {
          root: {
            transition: "transform 0.3s ease, box-shadow 0.3s ease",
            "&:hover": {
              transform: "translateY(-6px)",
              boxShadow: "0 20px 60px rgba(0,0,0,0.15)",
            },
          },
        },
      },
      MuiPaper: {
        styleOverrides: {
          root: {
            backgroundImage: "none",
          },
        },
      },
      MuiAppBar: {
        styleOverrides: {
          root: {
            backgroundImage: "none",
          },
        },
      },
    },
  });
