"use client";

import { Container, Typography, Box } from "@mui/material";
import Grid2 from "@mui/material/Grid2";
import GroupsIcon from "@mui/icons-material/Groups";
import Image from "next/image";

function LogoIcon() {
  return <Image src="/logo.jpg" alt="Logo" width={24} height={24} style={{ borderRadius: 4 }} />;
}
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import FitnessCenterIcon from "@mui/icons-material/FitnessCenter";
import { motion } from "framer-motion";
import RegistrationForm from "@/components/strike/registration-form";

const BENEFITS = [
  {
    icon: LogoIcon,
    title: "Weekly Group Runs",
    description:
      "Join our regular morning and evening runs across Ajmer's scenic routes.",
  },
  {
    icon: GroupsIcon,
    title: "Supportive Community",
    description:
      "Connect with runners of all levels who share your passion for running.",
  },
  {
    icon: EmojiEventsIcon,
    title: "Exclusive Events",
    description:
      "Get priority access to marathons, night runs, and special community events.",
  },
  {
    icon: FitnessCenterIcon,
    title: "Training Resources",
    description:
      "Access training plans, tips, and guidance from experienced runners.",
  },
];

export default function JoinPage() {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        py: { xs: 10, md: 12 },
        bgcolor: "background.default",
      }}
    >
      <Container maxWidth="lg">
        <Grid2 container spacing={6} alignItems="center">
          {/* Left side - Benefits */}
          <Grid2 size={{ xs: 12, md: 6 }}>
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <Typography
                variant="overline"
                sx={{
                  color: "primary.main",
                  letterSpacing: 3,
                  display: "block",
                }}
              >
                BECOME A MEMBER
              </Typography>
              <Typography variant="h2" fontWeight={700} sx={{ mb: 2 }}>
                Why Join Us?
              </Typography>
              <Typography
                variant="body1"
                color="text.secondary"
                sx={{ mb: 5, lineHeight: 1.7 }}
              >
                Strike Run Club is more than just a running group. It&apos;s a
                community of passionate individuals committed to fitness,
                friendship, and fun.
              </Typography>

              <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
                {BENEFITS.map((benefit, i) => (
                  <motion.div
                    key={benefit.title}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.2 + i * 0.1 }}
                  >
                    <Box sx={{ display: "flex", gap: 2 }}>
                      <Box
                        sx={{
                          width: 48,
                          height: 48,
                          borderRadius: 2,
                          bgcolor: "primary.main",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          flexShrink: 0,
                        }}
                      >
                        <benefit.icon sx={{ color: "white" }} />
                      </Box>
                      <Box>
                        <Typography
                          variant="h6"
                          fontWeight={600}
                          sx={{ mb: 0.5 }}
                        >
                          {benefit.title}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {benefit.description}
                        </Typography>
                      </Box>
                    </Box>
                  </motion.div>
                ))}
              </Box>
            </motion.div>
          </Grid2>

          {/* Right side - Form */}
          <Grid2 size={{ xs: 12, md: 6 }}>
            <RegistrationForm />
          </Grid2>
        </Grid2>
      </Container>
    </Box>
  );
}
