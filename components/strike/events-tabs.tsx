"use client";

import { Box, Tabs, Tab, Typography } from "@mui/material";
import Grid2 from "@mui/material/Grid2";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import EventCard from "./event-card";
import { type Event } from "@/lib/data";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel({ children, value, index }: TabPanelProps) {
  return (
    <div role="tabpanel" hidden={value !== index}>
      {value === index && <Box sx={{ pt: 4 }}>{children}</Box>}
    </div>
  );
}

export default function EventsTabs({
  upcoming,
  past,
}: {
  upcoming: Event[];
  past: Event[];
}) {
  const [tab, setTab] = useState(0);

  return (
    <Box>
      <Tabs
        value={tab}
        onChange={(_, v) => setTab(v)}
        sx={{
          "& .MuiTabs-indicator": {
            bgcolor: "primary.main",
            height: 3,
            borderRadius: 2,
          },
          "& .MuiTab-root": {
            textTransform: "none",
            fontWeight: 600,
            fontSize: "1rem",
            minWidth: 120,
            "&.Mui-selected": {
              color: "primary.main",
            },
          },
        }}
      >
        <Tab label={`Upcoming (${upcoming.length})`} />
        <Tab label={`Past (${past.length})`} />
      </Tabs>

      <AnimatePresence mode="wait">
        <motion.div
          key={tab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
        >
          <TabPanel value={tab} index={0}>
            {upcoming.length === 0 ? (
              <Box sx={{ textAlign: "center", py: 8 }}>
                <Typography variant="h6" color="text.secondary">
                  No upcoming events at the moment.
                </Typography>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ mt: 1 }}
                >
                  Check back soon or follow us on social media for updates!
                </Typography>
              </Box>
            ) : (
              <Grid2 container spacing={3}>
                {upcoming.map((event, i) => (
                  <Grid2 key={event.id} size={{ xs: 12, sm: 6, lg: 4 }}>
                    <motion.div
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.1, duration: 0.4 }}
                    >
                      <EventCard event={event} />
                    </motion.div>
                  </Grid2>
                ))}
              </Grid2>
            )}
          </TabPanel>

          <TabPanel value={tab} index={1}>
            {past.length === 0 ? (
              <Box sx={{ textAlign: "center", py: 8 }}>
                <Typography variant="h6" color="text.secondary">
                  No past events yet.
                </Typography>
              </Box>
            ) : (
              <Grid2 container spacing={3}>
                {past.map((event, i) => (
                  <Grid2 key={event.id} size={{ xs: 12, sm: 6, lg: 4 }}>
                    <motion.div
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.1, duration: 0.4 }}
                    >
                      <EventCard event={event} isPast />
                    </motion.div>
                  </Grid2>
                ))}
              </Grid2>
            )}
          </TabPanel>
        </motion.div>
      </AnimatePresence>
    </Box>
  );
}
