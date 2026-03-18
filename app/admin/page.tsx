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
import { getUpcomingEvents, type Registration } from "@/lib/data";
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

const CATEGORIES = ["Runs", "Events", "Community"] as const;

export default function AdminPage() {
  const [registrations, setRegistrations] = useState<Registration[]>([]);
  const [mounted, setMounted] = useState(false);
  const [galleryImages, setGalleryImages] = useState<GalleryImage[]>([]);
  const [uploadFile, setUploadFile] = useState<File | null>(null);
  const [uploadAlt, setUploadAlt] = useState("");
  const [uploadCategory, setUploadCategory] = useState("");
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  const handleLogout = async () => {
    const supabase = createSupabaseBrowserClient();
    await supabase.auth.signOut();
    router.push("/admin/login");
  };

  const loadData = async () => {
    const [regRes, galleryRes] = await Promise.all([
      fetch("/api/registrations"),
      fetch("/api/gallery"),
    ]);
    if (regRes.ok) setRegistrations(await regRes.json());
    if (galleryRes.ok) setGalleryImages(await galleryRes.json());
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
                {upcomingEvents.length} upcoming events
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
                  {CATEGORIES.map((c) => (
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
      </Container>
    </Box>
  );
}
