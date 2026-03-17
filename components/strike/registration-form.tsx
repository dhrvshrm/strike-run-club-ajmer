"use client";

import {
  Box,
  TextField,
  MenuItem,
  Button,
  Typography,
  Snackbar,
  Alert,
  CircularProgress,
  Paper,
} from "@mui/material";
import { useState } from "react";
import { motion } from "framer-motion";
import { addRegistration } from "@/lib/data";

const LEVELS = ["Beginner", "Intermediate", "Advanced"] as const;

type FormData = {
  name: string;
  email: string;
  phone: string;
  level: string;
};

type FormErrors = Partial<Record<keyof FormData, string>>;

export default function RegistrationForm() {
  const [form, setForm] = useState<FormData>({
    name: "",
    email: "",
    phone: "",
    level: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [loading, setLoading] = useState(false);
  const [snack, setSnack] = useState({
    open: false,
    msg: "",
    sev: "success" as "success" | "error",
  });

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
    // Clear error when user starts typing
    if (errors[name as keyof FormData]) {
      setErrors((e) => ({ ...e, [name]: undefined }));
    }
  };

  const validate = (): boolean => {
    const newErrors: FormErrors = {};

    if (!form.name.trim() || form.name.length < 2) {
      newErrors.name = "Please enter your full name";
    }

    if (!form.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    if (!form.phone.trim() || !/^\+?[\d\s-]{10,}$/.test(form.phone.replace(/\s/g, ""))) {
      newErrors.phone = "Please enter a valid phone number";
    }

    if (!form.level) {
      newErrors.level = "Please select your experience level";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validate()) {
      setSnack({
        open: true,
        msg: "Please fill in all fields correctly.",
        sev: "error",
      });
      return;
    }

    setLoading(true);

    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 1000));

    try {
      addRegistration({
        name: form.name,
        email: form.email,
        phone: form.phone,
        experienceLevel: form.level as "Beginner" | "Intermediate" | "Advanced",
      });

      setSnack({
        open: true,
        msg: "Welcome to Strike Run Club! We'll be in touch soon.",
        sev: "success",
      });
      setForm({ name: "", email: "", phone: "", level: "" });
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
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
    >
      <Paper
        elevation={0}
        sx={{
          p: { xs: 3, md: 5 },
          border: "1px solid",
          borderColor: "divider",
          borderRadius: 3,
          maxWidth: 520,
          mx: "auto",
        }}
      >
        <Typography variant="h4" fontWeight={700} sx={{ mb: 1 }}>
          Join the Club
        </Typography>
        <Typography color="text.secondary" sx={{ mb: 4 }}>
          Become part of Ajmer&apos;s fastest growing running community.
        </Typography>

        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{ display: "flex", flexDirection: "column", gap: 3 }}
        >
          <TextField
            name="name"
            label="Full Name"
            value={form.name}
            onChange={onChange}
            fullWidth
            error={!!errors.name}
            helperText={errors.name}
            slotProps={{
              input: {
                sx: { borderRadius: 2 },
              },
            }}
          />

          <TextField
            name="email"
            label="Email Address"
            value={form.email}
            onChange={onChange}
            fullWidth
            type="email"
            error={!!errors.email}
            helperText={errors.email}
            slotProps={{
              input: {
                sx: { borderRadius: 2 },
              },
            }}
          />

          <TextField
            name="phone"
            label="Phone Number"
            value={form.phone}
            onChange={onChange}
            fullWidth
            type="tel"
            placeholder="+91 98765 43210"
            error={!!errors.phone}
            helperText={errors.phone}
            slotProps={{
              input: {
                sx: { borderRadius: 2 },
              },
            }}
          />

          <TextField
            select
            name="level"
            label="Experience Level"
            value={form.level}
            onChange={onChange}
            fullWidth
            error={!!errors.level}
            helperText={errors.level || "Select your current running experience"}
            slotProps={{
              input: {
                sx: { borderRadius: 2 },
              },
            }}
          >
            {LEVELS.map((l) => (
              <MenuItem key={l} value={l}>
                {l}
              </MenuItem>
            ))}
          </TextField>

          <Button
            type="submit"
            variant="contained"
            color="primary"
            size="large"
            fullWidth
            disabled={loading}
            sx={{ py: 1.8, fontSize: "1rem", mt: 1 }}
          >
            {loading ? <CircularProgress size={24} color="inherit" /> : "Join Strike Run Club"}
          </Button>
        </Box>
      </Paper>

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
    </motion.div>
  );
}
