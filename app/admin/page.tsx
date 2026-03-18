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
  Button,
  MenuItem,
  TextField,
  LinearProgress,
  IconButton,
} from "@mui/material";
import Grid2 from "@mui/material/Grid2";
import PeopleIcon from "@mui/icons-material/People";
import EventIcon from "@mui/icons-material/Event";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import RefreshIcon from "@mui/icons-material/Refresh";
import LogoutIcon from "@mui/icons-material/Logout";
import DeleteIcon from "@mui/icons-material/Delete";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { motion } from "framer-motion";
import { format } from "date-fns";
import type { Registration, Event } from "@/lib/data";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { createSupabaseBrowserClient } from "@/lib/supabase-browser";

type GalleryImage = {
  id: string;
  src: string;
  alt: string;
  category: string;
  created_at: string;
};

const LEVEL_COLOR: Record<string, "success" | "warning" | "error"> = {
  Beginner: "success",
  Intermediate: "warning",
  Advanced: "error",
};

const GALLERY_CATEGORIES = ["Runs", "Events", "Community"] as const;

const EMPTY_EVENT = { title: "", description: "", date: "", location: "", recap: "" };

export default function AdminPage() {
  const [registrations, setRegistrations] = useState<Registration[]>([]);
  const [mounted, setMounted] = useState(false);
  const [galleryImages, setGalleryImages] = useState<GalleryImage[]>([]);
  const [uploadFile, setUploadFile] = useState<File | null>(null);
  const [uploadAlt, setUploadAlt] = useState("");
  const [uploadCategory, setUploadCategory] = useState("");
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [events, setEvents] = useState<Event[]>([]);
  const [newEvent, setNewEvent] = useState(EMPTY_EVENT);
  const [savingEvent, setSavingEvent] = useState(false);
  const router = useRouter();

  const handleLogout = async () => {
    const supabase = createSupabaseBrowserClient();
    await supabase.auth.signOut();
    router.push("/admin/login");
  };

  const loadData = async () => {
    const [regRes, galleryRes, eventsRes] = await Promise.all([
      fetch("/api/registrations"),
      fetch("/api/gallery"),
      fetch("/api/events"),
    ]);
    if (regRes.ok) setRegistrations(await regRes.json());
    if (galleryRes.ok) setGalleryImages(await galleryRes.json());
    if (eventsRes.ok) setEvents(await eventsRes.json());
  };

  useEffect(() => {
    setMounted(true);
    void loadData();
  }, []);

  const handleUpload = async () => {
    if (!uploadFile || !uploadAlt || !uploadCategory) return;
    setUploading(true);
    const fd = new FormData();
    fd.append("file", uploadFile);
    fd.append("alt", uploadAlt);
    fd.append("category", uploadCategory);
    const res = await fetch("/api/gallery", { method: "POST", body: fd });
    if (res.ok) {
      const newImg = await res.json();
      setGalleryImages((prev) => [newImg, ...prev]);
      setUploadFile(null);
      setUploadAlt("");
      setUploadCategory("");
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
    setUploading(false);
  };

  const handleDelete = async (id: string) => {
    await fetch(`/api/gallery/${id}`, { method: "DELETE" });
    setGalleryImages((prev) => prev.filter((img) => img.id !== id));
  };

  const upcomingCount = events.filter((e) => new Date(e.date) >= new Date()).length;

  const stats = [
    {
      label: "Total Members",
      value: registrations.length,
      icon: PeopleIcon,
      color: "primary.main",
    },
    {
      label: "Upcoming Events",
      value: upcomingCount,
      icon: EventIcon,
      color: "#25D366",
    },
    {
      label: "Beginners",
      value: registrations.filter((r) => r.experienceLevel === "Beginner")
        .length,
      icon: TrendingUpIcon,
      color: "#4CAF50",
    },
    {
      label: "Advanced",
      value: registrations.filter((r) => r.experienceLevel === "Advanced")
        .length,
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
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-start",
              flexWrap: "wrap",
              gap: 2,
              mb: 2,
            }}
          >
            <Box>
              <Typography variant="h3" fontWeight={700} sx={{ mb: 1 }}>
                Admin Dashboard
              </Typography>
              <Typography color="text.secondary" sx={{ mb: 4 }}>
                {registrations.length} registrations &middot;{" "}
                {upcomingCount} upcoming events
              </Typography>
            </Box>
            <Box sx={{ display: "flex", gap: 1 }}>
              <Button
                startIcon={<RefreshIcon />}
                onClick={loadData}
                variant="outlined"
                sx={{
                  borderColor: "divider",
                  color: "text.secondary",
                  "&:hover": { borderColor: "primary.main", color: "primary.main", transform: "none", boxShadow: "none" },
                }}
              >
                Refresh
              </Button>
              <Button
                startIcon={<LogoutIcon />}
                onClick={handleLogout}
                variant="outlined"
                color="error"
                sx={{ "&:hover": { transform: "none", boxShadow: "none" } }}
              >
                Logout
              </Button>
            </Box>
          </Box>
        </motion.div>

        {/* Stat cards */}
        <Grid2 container spacing={3} sx={{ mb: 6 }}>
          {stats.map((s, i) => (
            <Grid2 key={s.label} size={{ xs: 6, md: 3 }}>
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
                    <Typography
                      variant="h4"
                      fontWeight={800}
                      sx={{ color: s.color }}
                    >
                      {s.value}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {s.label}
                    </Typography>
                  </Box>
                </Paper>
              </motion.div>
            </Grid2>
          ))}
        </Grid2>

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
                When members join through the registration form, they&apos;ll
                appear here.
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
                      <TableCell>
                        {format(new Date(r.createdAt), "dd MMM yyyy")}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          )}
        </motion.div>

        {/* Gallery Upload */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <Typography variant="h5" fontWeight={600} sx={{ mt: 8, mb: 3 }}>
            Gallery Images
          </Typography>

          <Paper
            elevation={0}
            sx={{ p: 4, border: "1px solid", borderColor: "divider", borderRadius: 3, mb: 4 }}
          >
            <Typography variant="subtitle1" fontWeight={600} sx={{ mb: 3 }}>
              Upload New Image
            </Typography>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
              <Button
                component="label"
                variant="outlined"
                startIcon={<CloudUploadIcon />}
                sx={{ alignSelf: "flex-start", borderRadius: 2 }}
              >
                {uploadFile ? uploadFile.name : "Choose Image"}
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  hidden
                  onChange={(e) => setUploadFile(e.target.files?.[0] ?? null)}
                />
              </Button>

              <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap" }}>
                <TextField
                  label="Alt Text"
                  value={uploadAlt}
                  onChange={(e) => setUploadAlt(e.target.value)}
                  size="small"
                  sx={{ flex: 1, minWidth: 200 }}
                />
                <TextField
                  select
                  label="Category"
                  value={uploadCategory}
                  onChange={(e) => setUploadCategory(e.target.value)}
                  size="small"
                  sx={{ minWidth: 160 }}
                >
                  {GALLERY_CATEGORIES.map((c) => (
                    <MenuItem key={c} value={c}>{c}</MenuItem>
                  ))}
                </TextField>
                <Button
                  variant="contained"
                  onClick={handleUpload}
                  disabled={uploading || !uploadFile || !uploadAlt || !uploadCategory}
                  sx={{ borderRadius: 2 }}
                >
                  Upload
                </Button>
              </Box>

              {uploading && <LinearProgress sx={{ borderRadius: 1 }} />}
            </Box>
          </Paper>

          {galleryImages.length === 0 ? (
            <Paper
              elevation={0}
              sx={{ p: 6, border: "1px solid", borderColor: "divider", borderRadius: 3, textAlign: "center" }}
            >
              <Typography color="text.secondary">No gallery images yet.</Typography>
            </Paper>
          ) : (
            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: { xs: "1fr 1fr", sm: "repeat(3, 1fr)", md: "repeat(4, 1fr)" },
                gap: 2,
              }}
            >
              {galleryImages.map((img) => (
                <Box
                  key={img.id}
                  sx={{ position: "relative", borderRadius: 2, overflow: "hidden", aspectRatio: "4/3" }}
                >
                  <Image src={img.src} alt={img.alt} fill style={{ objectFit: "cover" }} />
                  <Box
                    sx={{
                      position: "absolute", inset: 0,
                      bgcolor: "rgba(0,0,0,0.45)",
                      opacity: 0,
                      transition: "opacity 0.2s",
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: 0.5,
                      "&:hover": { opacity: 1 },
                    }}
                  >
                    <Chip label={img.category} size="small" sx={{ bgcolor: "primary.main", color: "white" }} />
                    <IconButton
                      size="small"
                      onClick={() => handleDelete(img.id)}
                      sx={{ color: "white", bgcolor: "rgba(255,0,0,0.6)", "&:hover": { bgcolor: "error.main" } }}
                    >
                      <DeleteIcon fontSize="small" />
                    </IconButton>
                  </Box>
                </Box>
              ))}
            </Box>
          )}
        </motion.div>

        {/* Events Management */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <Typography variant="h5" fontWeight={600} sx={{ mt: 8, mb: 3 }}>
            Events
          </Typography>

          <Paper
            elevation={0}
            sx={{ p: 4, border: "1px solid", borderColor: "divider", borderRadius: 3, mb: 4 }}
          >
            <Typography variant="subtitle1" fontWeight={600} sx={{ mb: 3 }}>
              Add New Event
            </Typography>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
              <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap" }}>
                <TextField
                  label="Title"
                  value={newEvent.title}
                  onChange={(e) => setNewEvent((p) => ({ ...p, title: e.target.value }))}
                  size="small"
                  sx={{ flex: 1, minWidth: 200 }}
                />
                <TextField
                  label="Location"
                  value={newEvent.location}
                  onChange={(e) => setNewEvent((p) => ({ ...p, location: e.target.value }))}
                  size="small"
                  sx={{ flex: 1, minWidth: 200 }}
                />
                <TextField
                  label="Date & Time"
                  type="datetime-local"
                  value={newEvent.date}
                  onChange={(e) => setNewEvent((p) => ({ ...p, date: e.target.value }))}
                  size="small"
                  slotProps={{ inputLabel: { shrink: true } }}
                  sx={{ minWidth: 220 }}
                />
              </Box>
              <TextField
                label="Description"
                value={newEvent.description}
                onChange={(e) => setNewEvent((p) => ({ ...p, description: e.target.value }))}
                size="small"
                multiline
                rows={2}
                fullWidth
              />
              <TextField
                label="Recap (optional, for past events)"
                value={newEvent.recap}
                onChange={(e) => setNewEvent((p) => ({ ...p, recap: e.target.value }))}
                size="small"
                multiline
                rows={2}
                fullWidth
              />
              <Button
                variant="contained"
                sx={{ alignSelf: "flex-start", borderRadius: 2 }}
                disabled={savingEvent || !newEvent.title || !newEvent.date || !newEvent.location || !newEvent.description}
                onClick={async () => {
                  setSavingEvent(true);
                  const res = await fetch("/api/events", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                      title: newEvent.title,
                      description: newEvent.description,
                      date: new Date(newEvent.date).toISOString(),
                      location: newEvent.location,
                      recap: newEvent.recap || null,
                    }),
                  });
                  if (res.ok) {
                    const created = await res.json();
                    setEvents((prev) => [created, ...prev]);
                    setNewEvent(EMPTY_EVENT);
                  }
                  setSavingEvent(false);
                }}
              >
                {savingEvent ? "Saving…" : "Add Event"}
              </Button>
            </Box>
          </Paper>

          {events.length === 0 ? (
            <Paper
              elevation={0}
              sx={{ p: 6, border: "1px solid", borderColor: "divider", borderRadius: 3, textAlign: "center" }}
            >
              <Typography color="text.secondary">No events yet.</Typography>
            </Paper>
          ) : (
            <TableContainer
              component={Paper}
              elevation={0}
              sx={{ border: "1px solid", borderColor: "divider", borderRadius: 3 }}
            >
              <Table>
                <TableHead>
                  <TableRow sx={{ "& th": { fontWeight: 700, bgcolor: "background.default", borderColor: "divider" } }}>
                    <TableCell>Title</TableCell>
                    <TableCell>Date</TableCell>
                    <TableCell>Location</TableCell>
                    <TableCell>Status</TableCell>
                    <TableCell />
                  </TableRow>
                </TableHead>
                <TableBody>
                  {events.map((ev) => {
                    const isPast = new Date(ev.date) < new Date();
                    return (
                      <TableRow key={ev.id} hover sx={{ "&:last-child td": { borderBottom: 0 } }}>
                        <TableCell sx={{ fontWeight: 500 }}>{ev.title}</TableCell>
                        <TableCell>{format(new Date(ev.date), "dd MMM yyyy, h:mm a")}</TableCell>
                        <TableCell>{ev.location}</TableCell>
                        <TableCell>
                          <Chip
                            label={isPast ? "Past" : "Upcoming"}
                            size="small"
                            color={isPast ? "default" : "success"}
                            sx={{ fontWeight: 500 }}
                          />
                        </TableCell>
                        <TableCell align="right">
                          <IconButton
                            size="small"
                            color="error"
                            onClick={async () => {
                              await fetch(`/api/events/${ev.id}`, { method: "DELETE" });
                              setEvents((prev) => prev.filter((e) => e.id !== ev.id));
                            }}
                          >
                            <DeleteIcon fontSize="small" />
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </TableContainer>
          )}
        </motion.div>
      </Container>
    </Box>
  );
}
