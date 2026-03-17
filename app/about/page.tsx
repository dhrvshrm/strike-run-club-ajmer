"use client";

import { Container, Typography, Box, Paper, Avatar } from "@mui/material";
import Grid2 from "@mui/material/Grid2";
import DirectionsRunIcon from "@mui/icons-material/DirectionsRun";
import FavoriteIcon from "@mui/icons-material/Favorite";
import GroupsIcon from "@mui/icons-material/Groups";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import { motion } from "framer-motion";

const VALUES = [
  {
    icon: DirectionsRunIcon,
    title: "Passion for Running",
    description:
      "We believe running is more than exercise - it's a way of life that transforms body and mind.",
  },
  {
    icon: GroupsIcon,
    title: "Inclusive Community",
    description:
      "Whether you're a beginner or a marathoner, you'll find your place in our diverse community.",
  },
  {
    icon: FavoriteIcon,
    title: "Health & Wellness",
    description:
      "We promote holistic health through regular activity, proper nutrition, and mental wellness.",
  },
  {
    icon: EmojiEventsIcon,
    title: "Celebrating Achievement",
    description:
      "Every milestone matters - from your first 5K to your personal best, we celebrate together.",
  },
];

const TEAM = [
  {
    name: "Rahul Sharma",
    role: "Founder & Head Coach",
    image:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=face",
  },
  {
    name: "Priya Patel",
    role: "Events Coordinator",
    image:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop&crop=face",
  },
  {
    name: "Amit Kumar",
    role: "Training Lead",
    image:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&h=200&fit=crop&crop=face",
  },
  {
    name: "Sneha Gupta",
    role: "Community Manager",
    image:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop&crop=face",
  },
];

export default function AboutPage() {
  return (
    <Box sx={{ minHeight: "100vh", bgcolor: "background.default" }}>
      {/* Hero Section */}
      <Box
        sx={{
          py: { xs: 12, md: 16 },
          background: (theme) =>
            theme.palette.mode === "dark"
              ? "linear-gradient(180deg, #1A1A2E 0%, #0D0D0D 100%)"
              : "linear-gradient(180deg, #FFFFFF 0%, #F9F9F9 100%)",
        }}
      >
        <Container maxWidth="md">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Box sx={{ textAlign: "center" }}>
              <Typography
                variant="overline"
                sx={{
                  color: "primary.main",
                  letterSpacing: 3,
                  display: "block",
                  mb: 2,
                }}
              >
                OUR STORY
              </Typography>
              <Typography variant="h2" fontWeight={700} sx={{ mb: 3 }}>
                About Strike Run Club
              </Typography>
              <Typography
                variant="body1"
                color="text.secondary"
                sx={{ lineHeight: 1.8, maxWidth: 700, mx: "auto" }}
              >
                Founded in 2020, Strike Run Club began as a small group of
                running enthusiasts in Ajmer who wanted to share their passion
                for running. What started as weekend jogs around Ana Sagar Lake
                has grown into Ajmer&apos;s most vibrant running community,
                bringing together hundreds of runners from all walks of life.
              </Typography>
            </Box>
          </motion.div>
        </Container>
      </Box>

      {/* Mission Section */}
      <Container maxWidth="lg" sx={{ py: { xs: 8, md: 12 } }}>
        <Grid2 container spacing={6} alignItems="center">
          <Grid2 size={{ xs: 12, md: 6 }}>
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <Typography
                variant="overline"
                sx={{
                  color: "primary.main",
                  letterSpacing: 3,
                  display: "block",
                }}
              >
                OUR MISSION
              </Typography>
              <Typography variant="h3" fontWeight={700} sx={{ mb: 3 }}>
                Making Running Accessible to Everyone
              </Typography>
              <Typography
                variant="body1"
                color="text.secondary"
                sx={{ lineHeight: 1.8, mb: 3 }}
              >
                We believe that running should be accessible to everyone,
                regardless of age, pace, or experience. Our mission is to create
                a supportive environment where runners can challenge themselves,
                build lasting friendships, and discover the joy of movement.
              </Typography>
              <Typography
                variant="body1"
                color="text.secondary"
                sx={{ lineHeight: 1.8 }}
              >
                Through regular group runs, training programs, and community
                events, we&apos;re building a healthier, more connected Ajmer -
                one stride at a time.
              </Typography>
            </motion.div>
          </Grid2>
          <Grid2 size={{ xs: 12, md: 6 }}>
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <Box
                sx={{
                  height: { xs: 300, md: 400 },
                  borderRadius: 4,
                  background:
                    "linear-gradient(135deg, #FF5722 0%, #E64A19 50%, #1A1A2E 100%)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <DirectionsRunIcon
                  sx={{ fontSize: 120, color: "rgba(255,255,255,0.3)" }}
                />
              </Box>
            </motion.div>
          </Grid2>
        </Grid2>
      </Container>

      {/* Values Section */}
      <Box sx={{ py: { xs: 8, md: 12 }, bgcolor: "background.paper" }}>
        <Container maxWidth="lg">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <Box sx={{ textAlign: "center", mb: 6 }}>
              <Typography
                variant="overline"
                sx={{
                  color: "primary.main",
                  letterSpacing: 3,
                  display: "block",
                }}
              >
                WHAT WE STAND FOR
              </Typography>
              <Typography variant="h3" fontWeight={700}>
                Our Values
              </Typography>
            </Box>
          </motion.div>

          <Grid2 container spacing={3}>
            {VALUES.map((value, i) => (
              <Grid2 key={value.title} size={{ xs: 12, sm: 6, md: 3 }}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: i * 0.1 }}
                  viewport={{ once: true }}
                >
                  <Paper
                    elevation={0}
                    sx={{
                      p: 3,
                      height: "100%",
                      border: "1px solid",
                      borderColor: "divider",
                      borderRadius: 3,
                      textAlign: "center",
                      transition: "all 0.3s ease",
                      "&:hover": {
                        borderColor: "primary.main",
                        transform: "translateY(-4px)",
                      },
                    }}
                  >
                    <Box
                      sx={{
                        width: 56,
                        height: 56,
                        borderRadius: 2,
                        bgcolor: "primary.main",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        mx: "auto",
                        mb: 2,
                      }}
                    >
                      <value.icon sx={{ color: "white", fontSize: 28 }} />
                    </Box>
                    <Typography variant="h6" fontWeight={600} sx={{ mb: 1 }}>
                      {value.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {value.description}
                    </Typography>
                  </Paper>
                </motion.div>
              </Grid2>
            ))}
          </Grid2>
        </Container>
      </Box>

      {/* Team Section */}
      <Container maxWidth="lg" sx={{ py: { xs: 8, md: 12 } }}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <Box sx={{ textAlign: "center", mb: 6 }}>
            <Typography
              variant="overline"
              sx={{ color: "primary.main", letterSpacing: 3, display: "block" }}
            >
              THE PEOPLE BEHIND
            </Typography>
            <Typography variant="h3" fontWeight={700}>
              Meet Our Team
            </Typography>
          </Box>
        </motion.div>

        <Grid2 container spacing={4} justifyContent="center">
          {TEAM.map((member, i) => (
            <Grid2 key={member.name} size={{ xs: 6, sm: 6, md: 3 }}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                viewport={{ once: true }}
              >
                <Box sx={{ textAlign: "center" }}>
                  <Avatar
                    src={member.image}
                    alt={member.name}
                    sx={{
                      width: { xs: 100, md: 140 },
                      height: { xs: 100, md: 140 },
                      mx: "auto",
                      mb: 2,
                      border: "4px solid",
                      borderColor: "primary.main",
                    }}
                  />
                  <Typography variant="h6" fontWeight={600}>
                    {member.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {member.role}
                  </Typography>
                </Box>
              </motion.div>
            </Grid2>
          ))}
        </Grid2>
      </Container>
    </Box>
  );
}
