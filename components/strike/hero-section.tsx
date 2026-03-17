"use client";

import { Box, Typography, Button, Stack, Container } from "@mui/material";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

export default function HeroSection() {
  const router = useRouter();

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
        overflow: "hidden",
        background: (theme) =>
          theme.palette.mode === "dark"
            ? "linear-gradient(135deg, #0D0D0D 0%, #1A1A2E 50%, #0D0D0D 100%)"
            : "linear-gradient(135deg, #F9F9F9 0%, #FFFFFF 50%, #F9F9F9 100%)",
      }}
    >
      {/* Ambient glow orb */}
      <Box
        component={motion.div}
        animate={{ scale: [1, 1.2, 1], opacity: [0.15, 0.25, 0.15] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        sx={{
          position: "absolute",
          width: { xs: 400, md: 600 },
          height: { xs: 400, md: 600 },
          borderRadius: "50%",
          background: "radial-gradient(circle, #FF5722 0%, transparent 70%)",
          top: "-20%",
          left: "-10%",
          filter: "blur(60px)",
          pointerEvents: "none",
        }}
      />

      {/* Secondary glow */}
      <Box
        component={motion.div}
        animate={{ scale: [1.1, 1, 1.1], opacity: [0.1, 0.2, 0.1] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        sx={{
          position: "absolute",
          width: { xs: 300, md: 500 },
          height: { xs: 300, md: 500 },
          borderRadius: "50%",
          background: "radial-gradient(circle, #E64A19 0%, transparent 70%)",
          bottom: "-15%",
          right: "-5%",
          filter: "blur(80px)",
          pointerEvents: "none",
        }}
      />

      <Container maxWidth="md" sx={{ position: "relative", zIndex: 1, textAlign: "center", px: 3 }}>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <Typography
            variant="overline"
            sx={{
              color: "primary.main",
              letterSpacing: 4,
              mb: 2,
              display: "block",
              fontSize: { xs: "0.7rem", md: "0.875rem" },
            }}
          >
            AJMER&apos;S PREMIER RUNNING COMMUNITY
          </Typography>

          <Typography
            variant="h1"
            sx={{
              mb: 3,
              background: (theme) =>
                theme.palette.mode === "dark"
                  ? "linear-gradient(135deg, #fff 30%, #FF5722 100%)"
                  : "linear-gradient(135deg, #1A1A2E 30%, #FF5722 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            Run Together.
            <br />
            Grow Together.
          </Typography>

          <Typography
            variant="h6"
            sx={{
              color: "text.secondary",
              mb: 5,
              fontWeight: 400,
              maxWidth: 560,
              mx: "auto",
              lineHeight: 1.6,
            }}
          >
            Join Ajmer&apos;s most vibrant running community. Every step, every stride — shared.
          </Typography>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <Stack direction={{ xs: "column", sm: "row" }} spacing={2} justifyContent="center">
            <Button
              variant="contained"
              color="primary"
              size="large"
              onClick={() => router.push("/join")}
              sx={{ px: 5, py: 1.8, fontSize: "1.05rem" }}
            >
              Join Now
            </Button>
            <Button
              variant="outlined"
              size="large"
              onClick={() => router.push("/events")}
              sx={{
                px: 5,
                py: 1.8,
                fontSize: "1.05rem",
                borderColor: (theme) =>
                  theme.palette.mode === "dark" ? "rgba(255,255,255,0.3)" : "rgba(0,0,0,0.2)",
                color: "text.primary",
                "&:hover": {
                  borderColor: "primary.main",
                  color: "primary.main",
                  transform: "scale(1.04)",
                  boxShadow: "none",
                },
              }}
            >
              Explore Events
            </Button>
          </Stack>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 0.5 }}
        >
          <Box
            component={motion.div}
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            sx={{
              position: "absolute",
              bottom: { xs: 30, md: 50 },
              left: "50%",
              transform: "translateX(-50%)",
            }}
          >
            <Box
              sx={{
                width: 24,
                height: 40,
                borderRadius: 12,
                border: "2px solid",
                borderColor: "text.secondary",
                display: "flex",
                justifyContent: "center",
                pt: 1,
              }}
            >
              <Box
                component={motion.div}
                animate={{ y: [0, 12, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
                sx={{
                  width: 4,
                  height: 8,
                  borderRadius: 2,
                  bgcolor: "primary.main",
                }}
              />
            </Box>
          </Box>
        </motion.div>
      </Container>
    </Box>
  );
}
