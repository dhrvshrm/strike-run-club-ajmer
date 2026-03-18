"use client";

import { Box, Container, Typography, Button } from "@mui/material";
import Grid2 from "@mui/material/Grid2";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { GalleryImage } from "@/lib/data";

export default function CommunityGrid() {
  const [images, setImages] = useState<GalleryImage[]>([]);

  useEffect(() => {
    fetch("/api/gallery")
      .then((r) => r.json())
      .then(setImages)
      .catch(() => {});
  }, []);

  return (
    <Box sx={{ py: { xs: 8, md: 12 }, bgcolor: "background.default" }}>
      <Container maxWidth="lg">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <Box sx={{ textAlign: "center", mb: 6 }}>
            <Typography
              variant="overline"
              sx={{
                color: "primary.main",
                letterSpacing: 3,
                mb: 1,
                display: "block",
              }}
            >
              OUR COMMUNITY
            </Typography>
            <Typography variant="h2" fontWeight={700} sx={{ mb: 2 }}>
              More Than Just Running
            </Typography>
            <Typography
              variant="body1"
              color="text.secondary"
              sx={{ maxWidth: 600, mx: "auto", lineHeight: 1.7 }}
            >
              We&apos;re a family of passionate runners, supporting each other
              through every mile. From beginners to marathoners, everyone is
              welcome.
            </Typography>
          </Box>
        </motion.div>

        <Grid2 container spacing={2}>
          {images.map((img, i) => (
            <Grid2 key={i} size={{ xs: 6, md: img.span === 2 ? 6 : 3 }}>
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                viewport={{ once: true }}
                style={{ height: "100%" }}
              >
                <Box
                  sx={{
                    position: "relative",
                    height: {
                      xs: 150,
                      sm: 200,
                      md: img.span === 2 ? 280 : 280,
                    },
                    borderRadius: 3,
                    overflow: "hidden",
                    "&:hover img": {
                      transform: "scale(1.08)",
                    },
                  }}
                >
                  <Image
                    src={img.src}
                    alt={img.alt}
                    fill
                    style={{
                      objectFit: "cover",
                      transition: "transform 0.5s ease",
                    }}
                    sizes="(max-width: 768px) 50vw, 33vw"
                  />
                  <Box
                    sx={{
                      position: "absolute",
                      inset: 0,
                      background:
                        "linear-gradient(to top, rgba(0,0,0,0.4) 0%, transparent 50%)",
                    }}
                  />
                </Box>
              </motion.div>
            </Grid2>
          ))}
        </Grid2>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <Box sx={{ textAlign: "center", mt: 5 }}>
            <Button
              component={Link}
              href="/gallery"
              variant="outlined"
              size="large"
              sx={{
                px: 4,
                borderColor: "primary.main",
                color: "primary.main",
                "&:hover": {
                  borderColor: "primary.dark",
                  bgcolor: "rgba(255,87,34,0.08)",
                },
              }}
            >
              View Gallery
            </Button>
          </Box>
        </motion.div>
      </Container>
    </Box>
  );
}
