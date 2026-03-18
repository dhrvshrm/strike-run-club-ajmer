"use client";

import {
  Container,
  Typography,
  Box,
  Paper,
  TextField,
  Button,
  Snackbar,
  Alert,
  CircularProgress,
} from "@mui/material";
import Grid2 from "@mui/material/Grid2";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import { motion } from "framer-motion";
import { useState } from "react";

const CONTACT_INFO = [
  {
    icon: EmailIcon,
    label: "Email",
    value: "strikerunclub@gmail.com",
    href: "mailto:strikerunclub@gmail.com",
  },
  {
    icon: PhoneIcon,
    label: "Phone",
    value: "+91 98765 43210",
    href: "tel:+919876543210",
  },
  {
    icon: WhatsAppIcon,
    label: "WhatsApp",
    value: "+91 98765 43210",
    href: "https://wa.me/919876543210?text=Hi%20Strike%20Run%20Club!",
  },
  {
    icon: LocationOnIcon,
    label: "Location",
    value: "Ajmer, Rajasthan, India",
    href: "https://maps.google.com/?q=Ajmer,Rajasthan,India",
  },
];

type FormData = {
  name: string;
  email: string;
  subject: string;
  message: string;
};

export default function ContactPage() {
  const [form, setForm] = useState<FormData>({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const [snack, setSnack] = useState({
    open: false,
    msg: "",
    sev: "success" as "success" | "error",
  });

  const onChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!form.name || !form.email || !form.message) {
      setSnack({
        open: true,
        msg: "Please fill in all required fields.",
        sev: "error",
      });
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!res.ok) throw new Error();

      setSnack({
        open: true,
        msg: "Message sent! We'll get back to you soon.",
        sev: "success",
      });
      setForm({ name: "", email: "", subject: "", message: "" });
    } catch {
      setSnack({
        open: true,
        msg: "Something went wrong. Please try again.",
        sev: "error",
      });
    } finally {
      setLoading(false);
    }
  };

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
          <Box sx={{ textAlign: "center", mb: 6 }}>
            <Typography
              variant="overline"
              sx={{ color: "primary.main", letterSpacing: 3, display: "block" }}
            >
              GET IN TOUCH
            </Typography>
            <Typography variant="h2" fontWeight={700} sx={{ mb: 2 }}>
              Contact Us
            </Typography>
            <Typography
              variant="body1"
              color="text.secondary"
              sx={{ maxWidth: 600, mx: "auto" }}
            >
              Have questions about joining or want to learn more about our
              events? We&apos;d love to hear from you!
            </Typography>
          </Box>
        </motion.div>

        <Grid2 container spacing={6}>
          {/* Contact Info */}
          <Grid2 size={{ xs: 12, md: 5 }}>
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <Typography variant="h5" fontWeight={600} sx={{ mb: 3 }}>
                Reach Out
              </Typography>

              <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                {CONTACT_INFO.map((info, i) => (
                  <motion.div
                    key={info.label}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.3 + i * 0.1 }}
                  >
                    <Paper
                      component="a"
                      href={info.href}
                      target={
                        info.href.startsWith("http") ? "_blank" : undefined
                      }
                      rel={
                        info.href.startsWith("http")
                          ? "noopener noreferrer"
                          : undefined
                      }
                      elevation={0}
                      sx={{
                        p: 2.5,
                        border: "1px solid",
                        borderColor: "divider",
                        borderRadius: 3,
                        display: "flex",
                        alignItems: "center",
                        gap: 2,
                        textDecoration: "none",
                        transition: "all 0.3s ease",
                        "&:hover": {
                          borderColor: "primary.main",
                          transform: "translateX(8px)",
                        },
                      }}
                    >
                      <Box
                        sx={{
                          width: 44,
                          height: 44,
                          borderRadius: 2,
                          bgcolor: "primary.main",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          flexShrink: 0,
                        }}
                      >
                        <info.icon sx={{ color: "white" }} />
                      </Box>
                      <Box>
                        <Typography variant="caption" color="text.secondary">
                          {info.label}
                        </Typography>
                        <Typography
                          variant="body1"
                          fontWeight={500}
                          color="text.primary"
                        >
                          {info.value}
                        </Typography>
                      </Box>
                    </Paper>
                  </motion.div>
                ))}
              </Box>
            </motion.div>
          </Grid2>

          {/* Contact Form */}
          <Grid2 size={{ xs: 12, md: 7 }}>
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <Paper
                elevation={0}
                sx={{
                  p: { xs: 3, md: 4 },
                  border: "1px solid",
                  borderColor: "divider",
                  borderRadius: 3,
                }}
              >
                <Typography variant="h5" fontWeight={600} sx={{ mb: 3 }}>
                  Send a Message
                </Typography>

                <Box
                  component="form"
                  onSubmit={handleSubmit}
                  sx={{ display: "flex", flexDirection: "column", gap: 3 }}
                >
                  <Grid2 container spacing={2}>
                    <Grid2 size={{ xs: 12, sm: 6 }}>
                      <TextField
                        name="name"
                        label="Your Name"
                        value={form.name}
                        onChange={onChange}
                        fullWidth
                        required
                        slotProps={{
                          input: { sx: { borderRadius: 2 } },
                        }}
                      />
                    </Grid2>
                    <Grid2 size={{ xs: 12, sm: 6 }}>
                      <TextField
                        name="email"
                        label="Email Address"
                        value={form.email}
                        onChange={onChange}
                        fullWidth
                        required
                        type="email"
                        slotProps={{
                          input: { sx: { borderRadius: 2 } },
                        }}
                      />
                    </Grid2>
                  </Grid2>

                  <TextField
                    name="subject"
                    label="Subject"
                    value={form.subject}
                    onChange={onChange}
                    fullWidth
                    slotProps={{
                      input: { sx: { borderRadius: 2 } },
                    }}
                  />

                  <TextField
                    name="message"
                    label="Your Message"
                    value={form.message}
                    onChange={onChange}
                    fullWidth
                    required
                    multiline
                    rows={5}
                    slotProps={{
                      input: { sx: { borderRadius: 2 } },
                    }}
                  />

                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    size="large"
                    disabled={loading}
                    sx={{ py: 1.5, alignSelf: "flex-start", px: 5 }}
                  >
                    {loading ? (
                      <CircularProgress size={24} color="inherit" />
                    ) : (
                      "Send Message"
                    )}
                  </Button>
                </Box>
              </Paper>
            </motion.div>
          </Grid2>
        </Grid2>
      </Container>

      <Snackbar
        open={snack.open}
        autoHideDuration={5000}
        onClose={() => setSnack((s) => ({ ...s, open: false }))}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          severity={snack.sev}
          onClose={() => setSnack((s) => ({ ...s, open: false }))}
          sx={{ width: "100%" }}
        >
          {snack.msg}
        </Alert>
      </Snackbar>
    </Box>
  );
}
