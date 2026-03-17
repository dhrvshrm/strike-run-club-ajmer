"use client";

import { useState, useMemo, useEffect } from "react";
import { ThemeProvider, CssBaseline } from "@mui/material";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v15-appRouter";
import { getTheme } from "@/lib/theme";
import { ColorModeContext } from "@/lib/color-mode-context";
import Navbar from "@/components/strike/navbar";
import Footer from "@/components/strike/footer";
import WhatsAppFAB from "@/components/strike/whatsapp-fab";

export default function Providers({ children }: { children: React.ReactNode }) {
  const [mode, setMode] = useState<"light" | "dark">("dark");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Check system preference or stored preference
    const stored = localStorage.getItem("strike-theme");
    if (stored === "light" || stored === "dark") {
      setMode(stored);
    } else if (window.matchMedia("(prefers-color-scheme: light)").matches) {
      setMode("light");
    }
  }, []);

  const colorMode = useMemo(
    () => ({
      mode,
      toggle: () => {
        setMode((prev) => {
          const next = prev === "dark" ? "light" : "dark";
          localStorage.setItem("strike-theme", next);
          return next;
        });
      },
    }),
    [mode]
  );

  const theme = useMemo(() => getTheme(mode), [mode]);

  // Prevent flash of unstyled content
  if (!mounted) {
    return null;
  }

  return (
    <AppRouterCacheProvider options={{ enableCssLayer: true }}>
      <ColorModeContext.Provider value={colorMode}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Navbar />
          <main style={{ minHeight: "100vh" }}>{children}</main>
          <Footer />
          <WhatsAppFAB phone="+919876543210" />
        </ThemeProvider>
      </ColorModeContext.Provider>
    </AppRouterCacheProvider>
  );
}
