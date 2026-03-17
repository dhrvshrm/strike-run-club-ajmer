"use client";

import {
  Container,
  Typography,
  Paper,
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  Alert,
  Button,
} from "@mui/material";
import Grid from "@mui/material/Grid";
import PeopleIcon from "@mui/icons-material/People";
import EventIcon from "@mui/icons-material/Event";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import RefreshIcon from "@mui/icons-material/Refresh";
import { motion } from "framer-motion";
import { format } from "date-fns";
import { getRegistrations, getUpcomingEvents, type Registration } from "@/lib/data";
import { useEffect, useState } from "react";

const LEVEL_COLOR: Record<string, "success" | "warning" | "error"> = {
  Beginner: "success",
  Intermediate: "warning",
  Advanced: "error",
};

export default function AdminPage() {
  const [registrations, setRegistrations] = useState<Registration[]>([]);
  const [mounted, setMounted] = useState(false);

  const loadData = () => {
    setRegistrations(getRegistrations());
  };

  useEffect(() => {
    setMounted(true);
    loadData();
  }, []);

  const upcomingEvents = getUpcomingEvents();

  const stats = [
    {
      label: "Total Members",
      value: registrations.length,
      icon: PeopleIcon,
      color: "primary.main",
    },
    {
      label: "Upcoming Events",
      value: upcomingEvents.length,
      icon: EventIcon,
      color: "#25D366",
    },
    {
      label: "Beginners",
      value: registrations.filter((r) => r.experienceLevel === "Beginner").length,
      icon: TrendingUpIcon,
      color: "#4CAF50",
    },
    {
      label: "Advanced",
      value: registrations.filter((r) => r.experienceLevel === "Advanced").length,
      icon: TrendingUpIcon,
      color: "#f44336",
    },
  ];

  if (!mounted) {
    return null;
  }

  return (
    <Box
      sx={{
        minHeight: "100vh",
        py: { xs: 10, md: 12 },
        bgcolor: "background.default",
      }}
    >
      <Container maxWidth="xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: 2, mb: 2 }}>
            <Box>
              <Typography variant="h3" fontWeight={700} sx={{ mb: 1 }}>
                Admin Dashboard
              </Typography>
              <Typography color="text.secondary" sx={{ mb: 4 }}>
                {registrations.length} registrations &middot; {upcomingEvents.length} upcoming events
              </Typography>
            </Box>
            <Button
              startIcon={<RefreshIcon />}
              onClick={loadData}
              variant="outlined"
              sx={{
                borderColor: "divider",
                color: "text.secondary",
                "&:hover": {
                  borderColor: "primary.main",
                  color: "primary.main",
                  transform: "none",
                  boxShadow: "none",
                },
              }}
            >
              Refresh
            </Button>
          </Box>
        </motion.div>

        <Alert severity="info" sx={{ mb: 4, borderRadius: 2 }}>
          This is a demo dashboard using localStorage. In production, connect a database for persistent storage.
        </Alert>

        {/* Stat cards */}
        <Grid container spacing={3} sx={{ mb: 6 }}>
          {stats.map((s, i) => (
            <Grid key={s.label} size={{ xs: 6, md: 3 }}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
              >
                <Paper
                  elevation={0}
                  sx={{
                    p: 3,
                    border: "1px solid",
                    borderColor: "divider",
                    borderRadius: 3,
                    display: "flex",
                    alignItems: "center",
                    gap: 2,
                  }}
                >
                  <Box
                    sx={{
                      width: 48,
                      height: 48,
                      borderRadius: 2,
                      bgcolor: `${s.color}20`,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <s.icon sx={{ color: s.color }} />
                  </Box>
                  <Box>
                    <Typography variant="h4" fontWeight={800} sx={{ color: s.color }}>
                      {s.value}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {s.label}
                    </Typography>
                  </Box>
                </Paper>
              </motion.div>
            </Grid>
          ))}
        </Grid>

        {/* Registrations table */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <Typography variant="h5" fontWeight={600} sx={{ mb: 3 }}>
            Recent Registrations
          </Typography>

          {registrations.length === 0 ? (
            <Paper
              elevation={0}
              sx={{
                p: 6,
                border: "1px solid",
                borderColor: "divider",
                borderRadius: 3,
                textAlign: "center",
              }}
            >
              <Typography variant="h6" color="text.secondary" sx={{ mb: 1 }}>
                No registrations yet
              </Typography>
              <Typography variant="body2" color="text.secondary">
                When members join through the registration form, they&apos;ll appear here.
              </Typography>
            </Paper>
          ) : (
            <TableContainer
              component={Paper}
              elevation={0}
              sx={{
                border: "1px solid",
                borderColor: "divider",
                borderRadius: 3,
              }}
            >
              <Table>
                <TableHead>
                  <TableRow
                    sx={{
                      "& th": {
                        fontWeight: 700,
                        bgcolor: "background.default",
                        borderBottom: "1px solid",
                        borderColor: "divider",
                      },
                    }}
                  >
                    <TableCell>#</TableCell>
                    <TableCell>Name</TableCell>
                    <TableCell>Email</TableCell>
                    <TableCell>Phone</TableCell>
                    <TableCell>Level</TableCell>
                    <TableCell>Joined</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {registrations.map((r, i) => (
                    <TableRow
                      key={r.id}
                      hover
                      sx={{
                        "&:last-child td": { borderBottom: 0 },
                      }}
                    >
                      <TableCell>{i + 1}</TableCell>
                      <TableCell sx={{ fontWeight: 500 }}>{r.name}</TableCell>
                      <TableCell>{r.email}</TableCell>
                      <TableCell>{r.phone}</TableCell>
                      <TableCell>
                        <Chip
                          label={r.experienceLevel}
                          size="small"
                          color={LEVEL_COLOR[r.experienceLevel] ?? "default"}
                          sx={{ fontWeight: 500 }}
                        />
                      </TableCell>
                      <TableCell>{format(new Date(r.createdAt), "dd MMM yyyy")}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          )}
        </motion.div>
      </Container>
    </Box>
  );
}
