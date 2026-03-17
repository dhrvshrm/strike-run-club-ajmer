"use client";

import { Container, Typography, Box } from "@mui/material";
import { motion } from "framer-motion";
import EventsTabs from "@/components/strike/events-tabs";
import { getUpcomingEvents, getPastEvents } from "@/lib/data";

export default function EventsPage() {
  const upcoming = getUpcomingEvents();
  const past = getPastEvents();

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
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Typography
            variant="overline"
            sx={{ color: "primary.main", letterSpacing: 3, display: "block" }}
          >
            WHAT&apos;S HAPPENING
          </Typography>
          <Typography variant="h2" fontWeight={700} sx={{ mb: 1 }}>
            Events
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mb: 4, maxWidth: 600 }}>
            Join us for weekly runs, special events, and community gatherings. There&apos;s always
            something exciting happening at Strike Run Club.
          </Typography>
        </motion.div>

        <EventsTabs upcoming={upcoming} past={past} />
      </Container>
    </Box>
  );
}
