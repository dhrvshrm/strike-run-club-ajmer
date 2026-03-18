"use client";

import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  Button,
  IconButton,
  useScrollTrigger,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
} from "@mui/material";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import Link from "next/link";
import Image from "next/image";
import { useColorMode } from "@/lib/color-mode-context";
import { useState } from "react";

const LINKS = [
  { label: "Events", href: "/events" },
  { label: "Gallery", href: "/gallery" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export default function Navbar() {
  const { mode, toggle } = useColorMode();
  const [mobileOpen, setMobileOpen] = useState(false);
  const elevated = useScrollTrigger({
    disableHysteresis: true,
    threshold: 50,
  });

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  return (
    <>
      <AppBar
        elevation={elevated ? 4 : 0}
        position="sticky"
        sx={{
          bgcolor: elevated ? "background.paper" : "transparent",
          backdropFilter: elevated ? "blur(20px)" : "none",
          transition: "all 0.3s ease",
          borderBottom: "1px solid",
          borderColor: elevated ? "divider" : "transparent",
        }}
      >
        <Toolbar
          sx={{
            justifyContent: "space-between",
            maxWidth: 1200,
            mx: "auto",
            width: "100%",
            px: { xs: 2, md: 3 },
          }}
        >
          {/* Logo */}
          <Box
            component={Link}
            href="/"
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1,
              textDecoration: "none",
            }}
          >
            <Image
              src="/logo.jpg"
              alt="Strike Run Club"
              width={36}
              height={36}
              style={{ borderRadius: 6 }}
            />
            <Typography fontWeight={800} fontSize={20} color="text.primary">
              STRIKE
              <Box component="span" sx={{ color: "text.primary" }}>
                RUNCLUB
              </Box>
            </Typography>
          </Box>

          {/* Desktop nav */}
          <Box
            sx={{
              display: { xs: "none", md: "flex" },
              gap: 1,
              alignItems: "center",
            }}
          >
            {LINKS.map((l) => (
              <Button
                key={l.label}
                component={Link}
                href={l.href}
                color="inherit"
                sx={{
                  fontSize: "0.9rem",
                  "&:hover": {
                    color: "primary.main",
                    transform: "none",
                    boxShadow: "none",
                  },
                }}
              >
                {l.label}
              </Button>
            ))}
            <Button
              variant="contained"
              color="primary"
              component={Link}
              href="/join"
              sx={{ ml: 1 }}
            >
              Join Now
            </Button>
            <IconButton onClick={toggle} size="small" sx={{ ml: 1 }}>
              {mode === "dark" ? (
                <LightModeIcon fontSize="small" />
              ) : (
                <DarkModeIcon fontSize="small" />
              )}
            </IconButton>
          </Box>

          {/* Mobile menu button */}
          <Box sx={{ display: { xs: "flex", md: "none" }, gap: 1 }}>
            <IconButton onClick={toggle} size="small">
              {mode === "dark" ? (
                <LightModeIcon fontSize="small" />
              ) : (
                <DarkModeIcon fontSize="small" />
              )}
            </IconButton>
            <IconButton onClick={handleDrawerToggle} color="inherit">
              <MenuIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>

      {/* Mobile drawer */}
      <Drawer
        anchor="right"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        sx={{
          display: { xs: "block", md: "none" },
          "& .MuiDrawer-paper": {
            width: 280,
            bgcolor: "background.paper",
          },
        }}
      >
        <Box sx={{ p: 2 }}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              mb: 2,
            }}
          >
            <Typography fontWeight={700}>Menu</Typography>
            <IconButton onClick={handleDrawerToggle}>
              <CloseIcon />
            </IconButton>
          </Box>
          <List>
            {LINKS.map((l) => (
              <ListItem key={l.label} disablePadding>
                <ListItemButton
                  component={Link}
                  href={l.href}
                  onClick={handleDrawerToggle}
                >
                  <ListItemText primary={l.label} />
                </ListItemButton>
              </ListItem>
            ))}
            <ListItem disablePadding sx={{ mt: 2 }}>
              <Button
                variant="contained"
                color="primary"
                component={Link}
                href="/join"
                fullWidth
                onClick={handleDrawerToggle}
              >
                Join Now
              </Button>
            </ListItem>
          </List>
        </Box>
      </Drawer>
    </>
  );
}
