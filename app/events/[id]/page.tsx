"use client";

import { use } from "react";
import { Container, Typography, Box, Button, Paper, Chip } from "@mui/material";
import Grid2 from "@mui/material/Grid2";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { motion } from "framer-motion";
import { format } from "date-fns";
import Link from "next/link";
import { getEventById } from "@/lib/data";
import CountdownTimer from "@/components/strike/countdown-timer";
import { notFound } from "next/navigation";

export default function EventDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const event = getEventById(id);

  if (!event) {
    notFound();
  }

  const isPast = new Date(event.date) < new Date();

  return (
    <Box
      sx={{
        minHeight: "100vh",
        py: { xs: 10, md: 12 },
        bgcolor: "background.default",
      }}
    >
      <Container maxWidth="lg">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Button
            component={Link}
            href="/events"
            startIcon={<ArrowBackIcon />}
            sx={{
              mb: 4,
              color: "text.secondary",
              "&:hover": {
                color: "primary.main",
                transform: "none",
                boxShadow: "none",
              },
            }}
          >
            Back to Events
          </Button>
        </motion.div>

        <Grid2 container spacing={4}>
          {/* Main Content */}
          <Grid2 size={{ xs: 12, md: 8 }}>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <Paper
                elevation={0}
                sx={{
                  overflow: "hidden",
                  border: "1px solid",
                  borderColor: "divider",
                  borderRadius: 3,
                }}
              >
                {/* Hero Banner */}
                <Box
                  sx={{
                    height: { xs: 200, md: 300 },
                    background: isPast
                      ? "linear-gradient(135deg, #4A4A4A 0%, #1A1A2E 100%)"
                      : "linear-gradient(135deg, #FF5722 0%, #E64A19 50%, #1A1A2E 100%)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    position: "relative",
                  }}
                >
                  <Box sx={{ textAlign: "center", color: "white", p: 3 }}>
                    <Typography variant="h3" fontWeight={800}>
                      {format(new Date(event.date), "dd")}
                    </Typography>
                    <Typography variant="h6">
                      {format(new Date(event.date), "MMMM yyyy")}
                    </Typography>
                  </Box>
                  <Chip
                    label={isPast ? "Past Event" : "Upcoming"}
                    sx={{
                      position: "absolute",
                      top: 16,
                      right: 16,
                      bgcolor: isPast ? "rgba(255,255,255,0.2)" : "white",
                      color: isPast ? "white" : "primary.main",
                      fontWeight: 600,
                    }}
                  />
                </Box>

                {/* Content */}
                <Box sx={{ p: { xs: 3, md: 4 } }}>
                  <Typography variant="h3" fontWeight={700} gutterBottom>
                    {event.title}
                  </Typography>

                  <Box
                    sx={{ display: "flex", flexWrap: "wrap", gap: 3, mb: 4 }}
                  >
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                      <CalendarMonthIcon sx={{ color: "primary.main" }} />
                      <Typography color="text.secondary">
                        {format(new Date(event.date), "EEEE, dd MMMM yyyy")}
                      </Typography>
                    </Box>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                      <AccessTimeIcon sx={{ color: "primary.main" }} />
                      <Typography color="text.secondary">
                        {format(new Date(event.date), "h:mm a")}
                      </Typography>
                    </Box>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                      <LocationOnIcon sx={{ color: "primary.main" }} />
                      <Typography color="text.secondary">
                        {event.location}
                      </Typography>
                    </Box>
                  </Box>

                  <Typography variant="h6" fontWeight={600} sx={{ mb: 2 }}>
                    About This Event
                  </Typography>
                  <Typography
                    variant="body1"
                    color="text.secondary"
                    sx={{ lineHeight: 1.8, mb: 3 }}
                  >
                    {event.description}
                  </Typography>

                  {event.recap && (
                    <>
                      <Typography
                        variant="h6"
                        fontWeight={600}
                        sx={{ mb: 2, mt: 4 }}
                      >
                        Event Recap
                      </Typography>
                      <Typography
                        variant="body1"
                        color="text.secondary"
                        sx={{ lineHeight: 1.8 }}
                      >
                        {event.recap}
                      </Typography>
                    </>
                  )}
                </Box>
              </Paper>
            </motion.div>
          </Grid2>

          {/* Sidebar */}
          <Grid2 size={{ xs: 12, md: 4 }}>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              {!isPast && (
                <Paper
                  elevation={0}
                  sx={{
                    p: 3,
                    border: "1px solid",
                    borderColor: "divider",
                    borderRadius: 3,
                    mb: 3,
                  }}
                >
                  <Typography variant="h6" fontWeight={600} sx={{ mb: 2 }}>
                    Event Starts In
                  </Typography>
                  <CountdownTimer targetDate={event.date} />
                </Paper>
              )}

              <Paper
                elevation={0}
                sx={{
                  p: 3,
                  border: "1px solid",
                  borderColor: "divider",
                  borderRadius: 3,
                  mb: 3,
                }}
              >
                <Typography variant="h6" fontWeight={600} sx={{ mb: 2 }}>
                  Location
                </Typography>
                <Box sx={{ display: "flex", alignItems: "flex-start", gap: 1 }}>
                  <LocationOnIcon sx={{ color: "primary.main", mt: 0.5 }} />
                  <Typography color="text.secondary">
                    {event.location}
                  </Typography>
                </Box>
              </Paper>

              {!isPast && (
                <Button
                  component={Link}
                  href="/join"
                  variant="contained"
                  color="primary"
                  size="large"
                  fullWidth
                  sx={{ py: 1.5 }}
                >
                  Join Strike Run Club
                </Button>
              )}
            </motion.div>
          </Grid2>
        </Grid2>
      </Container>
    </Box>
  );
}
