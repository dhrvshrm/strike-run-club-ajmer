"use client";

import { Box, Container, Typography, Button, Paper } from "@mui/material";
import Grid from "@mui/material/Grid";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import { motion } from "framer-motion";
import { format } from "date-fns";
import Link from "next/link";
import CountdownTimer from "./countdown-timer";
import { type Event } from "@/lib/data";

export default function FeaturedEvent({ event }: { event: Event }) {
  return (
    <Box
      sx={{
        py: { xs: 8, md: 12 },
        background: (theme) =>
          theme.palette.mode === "dark"
            ? "linear-gradient(180deg, #0D0D0D 0%, #1A1A2E 100%)"
            : "linear-gradient(180deg, #F9F9F9 0%, #FFFFFF 100%)",
      }}
    >
      <Container maxWidth="lg">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <Typography
            variant="overline"
            sx={{ color: "primary.main", letterSpacing: 3, mb: 1, display: "block" }}
          >
            NEXT EVENT
          </Typography>
          <Typography variant="h2" fontWeight={700} sx={{ mb: 4 }}>
            Don&apos;t Miss Out
          </Typography>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <Paper
            elevation={0}
            sx={{
              overflow: "hidden",
              border: "1px solid",
              borderColor: "divider",
              borderRadius: 4,
            }}
          >
            <Grid container>
              {/* Gradient side / image placeholder */}
              <Grid
                size={{ xs: 12, md: 5 }}
                sx={{
                  minHeight: { xs: 200, md: 400 },
                  background: "linear-gradient(135deg, #FF5722 0%, #E64A19 50%, #1A1A2E 100%)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  position: "relative",
                }}
              >
                <Box sx={{ textAlign: "center", color: "white", p: 4 }}>
                  <Typography variant="h4" fontWeight={800}>
                    {format(new Date(event.date), "dd")}
                  </Typography>
                  <Typography variant="h6" sx={{ opacity: 0.9 }}>
                    {format(new Date(event.date), "MMMM yyyy")}
                  </Typography>
                </Box>
              </Grid>

              {/* Content */}
              <Grid size={{ xs: 12, md: 7 }}>
                <Box sx={{ p: { xs: 3, md: 5 } }}>
                  <Typography variant="h4" fontWeight={700} gutterBottom>
                    {event.title}
                  </Typography>

                  <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1 }}>
                    <CalendarMonthIcon fontSize="small" sx={{ color: "primary.main" }} />
                    <Typography variant="body1" color="text.secondary">
                      {format(new Date(event.date), "EEEE, dd MMMM yyyy • h:mm a")}
                    </Typography>
                  </Box>

                  <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 3 }}>
                    <LocationOnIcon fontSize="small" sx={{ color: "primary.main" }} />
                    <Typography variant="body1" color="text.secondary">
                      {event.location}
                    </Typography>
                  </Box>

                  <Typography variant="body1" color="text.secondary" sx={{ mb: 4, lineHeight: 1.7 }}>
                    {event.description}
                  </Typography>

                  <Box sx={{ mb: 4 }}>
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                      Event starts in:
                    </Typography>
                    <CountdownTimer targetDate={event.date} />
                  </Box>

                  <Button
                    component={Link}
                    href={`/events/${event.id}`}
                    variant="contained"
                    color="primary"
                    size="large"
                    sx={{ px: 4 }}
                  >
                    View Details
                  </Button>
                </Box>
              </Grid>
            </Grid>
          </Paper>
        </motion.div>
      </Container>
    </Box>
  );
}
