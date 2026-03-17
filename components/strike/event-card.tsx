"use client";

import { Card, CardContent, Chip, Typography, Button, Box } from "@mui/material";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import { motion } from "framer-motion";
import { format } from "date-fns";
import Link from "next/link";
import { type Event } from "@/lib/data";

export default function EventCard({ event, isPast = false }: { event: Event; isPast?: boolean }) {
  return (
    <motion.div whileHover={{ y: -6 }} transition={{ duration: 0.3 }} style={{ height: "100%" }}>
      <Card
        sx={{
          height: "100%",
          display: "flex",
          flexDirection: "column",
          border: "1px solid",
          borderColor: "divider",
          bgcolor: "background.paper",
        }}
      >
        {/* Gradient banner */}
        <Box
          sx={{
            height: 160,
            display: "flex",
            alignItems: "flex-end",
            p: 2,
            background: isPast
              ? "linear-gradient(135deg, #4A4A4A 0%, #1A1A2E 100%)"
              : "linear-gradient(135deg, #FF5722 0%, #E64A19 50%, #1A1A2E 100%)",
            position: "relative",
          }}
        >
          <Box
            sx={{
              position: "absolute",
              top: 12,
              right: 12,
            }}
          >
            <Chip
              label={isPast ? "Past" : "Upcoming"}
              size="small"
              sx={{
                bgcolor: isPast ? "rgba(255,255,255,0.2)" : "rgba(255,255,255,0.95)",
                color: isPast ? "white" : "primary.main",
                fontWeight: 600,
              }}
            />
          </Box>
          <Box sx={{ color: "white" }}>
            <Typography variant="h4" fontWeight={800} sx={{ lineHeight: 1 }}>
              {format(new Date(event.date), "dd")}
            </Typography>
            <Typography variant="body2" sx={{ opacity: 0.9 }}>
              {format(new Date(event.date), "MMM yyyy")}
            </Typography>
          </Box>
        </Box>

        <CardContent sx={{ flexGrow: 1, p: 3 }}>
          <Typography variant="h6" fontWeight={700} gutterBottom sx={{ lineHeight: 1.3 }}>
            {event.title}
          </Typography>

          <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1 }}>
            <CalendarMonthIcon fontSize="small" sx={{ color: "primary.main" }} />
            <Typography variant="body2" color="text.secondary">
              {format(new Date(event.date), "EEE, dd MMM yyyy")}
            </Typography>
          </Box>

          <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 2 }}>
            <LocationOnIcon fontSize="small" sx={{ color: "primary.main" }} />
            <Typography variant="body2" color="text.secondary">
              {event.location}
            </Typography>
          </Box>

          <Typography
            variant="body2"
            color="text.secondary"
            sx={{
              overflow: "hidden",
              display: "-webkit-box",
              WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical",
              lineHeight: 1.6,
            }}
          >
            {event.description}
          </Typography>
        </CardContent>

        <Box sx={{ p: 3, pt: 0 }}>
          <Button
            component={Link}
            href={`/events/${event.id}`}
            variant={isPast ? "outlined" : "contained"}
            fullWidth
            color="primary"
            sx={{
              ...(isPast && {
                borderColor: "divider",
                color: "text.secondary",
                "&:hover": {
                  borderColor: "primary.main",
                  color: "primary.main",
                  transform: "none",
                  boxShadow: "none",
                },
              }),
            }}
          >
            {isPast ? "View Recap" : "View Details"}
          </Button>
        </Box>
      </Card>
    </motion.div>
  );
}
