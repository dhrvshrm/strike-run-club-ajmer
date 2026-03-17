"use client";

import DirectionsRunIcon from "@mui/icons-material/DirectionsRun";
import InstagramIcon from "@mui/icons-material/Instagram";
import {
  Box,
  Container,
  Divider,
  Grid2,
  IconButton,
  Typography,
} from "@mui/material";
import Link from "next/link";

const QUICK_LINKS = [
  { label: "Events", href: "/events" },
  { label: "Gallery", href: "/gallery" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
  { label: "Join Us", href: "/join" },
];

export default function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        py: 8,
        borderTop: "1px solid",
        borderColor: "divider",
        bgcolor: "background.paper",
      }}
    >
      <Container maxWidth="lg">
        <Grid2 container spacing={6}>
          {/* Brand */}
          <Grid2 size={{ xs: 12, md: 4 }}>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 2 }}>
              <DirectionsRunIcon color="primary" sx={{ fontSize: 32 }} />
              <Typography fontWeight={800} fontSize={22} color="text.primary">
                STRIKE
                <Box component="span" sx={{ color: "primary.main" }}>
                  RUN
                </Box>
                &nbsp;CLUB
              </Typography>
            </Box>
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{ mb: 2, maxWidth: 280 }}
            >
              Ajmer&apos;s premier running community. Join us for weekly runs,
              events, and a supportive community of runners.
            </Typography>
            <Box>
              <IconButton
                href="https://www.instagram.com/strikerunclub/"
                target="_blank"
                rel="noopener noreferrer"
                sx={{
                  color: "text.secondary",
                  "&:hover": { color: "primary.main" },
                }}
              >
                <InstagramIcon />
              </IconButton>
              {/* <IconButton
                href="https://strava.com/clubs/strikerunclub"
                target="_blank"
                rel="noopener noreferrer"
                sx={{
                  color: "text.secondary",
                  "&:hover": { color: "primary.main" },
                }}
              >
                <StravaIcon />
              </IconButton> */}
            </Box>
          </Grid2>

          {/* Quick Links */}
          <Grid2 size={{ xs: 12, sm: 6, md: 4 }}>
            <Typography fontWeight={700} sx={{ mb: 2 }}>
              Quick Links
            </Typography>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
              {QUICK_LINKS.map((link) => (
                <Typography
                  key={link.label}
                  component={Link}
                  href={link.href}
                  variant="body2"
                  color="text.secondary"
                  sx={{
                    textDecoration: "none",
                    transition: "color 0.2s",
                    "&:hover": { color: "primary.main" },
                  }}
                >
                  {link.label}
                </Typography>
              ))}
            </Box>
          </Grid2>

          {/* Contact Info */}
          <Grid2 size={{ xs: 12, sm: 6, md: 4 }}>
            <Typography fontWeight={700} sx={{ mb: 2 }}>
              Contact
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
              Ajmer, Rajasthan, India
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
              strikerunclub@gmail.com
            </Typography>
            <Typography variant="body2" color="text.secondary">
              +91 98765 43210
            </Typography>
          </Grid2>
        </Grid2>

        <Divider sx={{ my: 4 }} />

        <Typography
          variant="caption"
          color="text.secondary"
          align="center"
          display="block"
        >
          &copy; {new Date().getFullYear()} Strike Run Club. All rights
          reserved.
        </Typography>
        <Typography
          variant="caption"
          color="text.secondary"
          align="center"
          display="block"
        >
          Made with ❤️ in Ajmer. Designed by Dhruv Sharma.
        </Typography>
      </Container>
    </Box>
  );
}
