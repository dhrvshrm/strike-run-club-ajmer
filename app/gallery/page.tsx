"use client";

import {
  Box,
  Container,
  Typography,
  ToggleButtonGroup,
  ToggleButton,
  ImageList,
  ImageListItem,
  Dialog,
  IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { GALLERY_IMAGES } from "@/lib/data";

const CATEGORIES = ["All", "Runs", "Events", "Community"] as const;

export default function GalleryPage() {
  const [category, setCategory] = useState<string>("All");
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const filteredImages =
    category === "All" ? GALLERY_IMAGES : GALLERY_IMAGES.filter((i) => i.category === category);

  const handleCategoryChange = useCallback(
    (_: React.MouseEvent<HTMLElement>, newCategory: string | null) => {
      if (newCategory) {
        setCategory(newCategory);
      }
    },
    []
  );

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
          <Typography
            variant="overline"
            sx={{ color: "primary.main", letterSpacing: 3, display: "block" }}
          >
            MEMORIES
          </Typography>
          <Typography variant="h2" fontWeight={700} sx={{ mb: 1 }}>
            Gallery
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mb: 5, maxWidth: 600 }}>
            Moments captured from our runs, events, and community gatherings. Every photo tells a
            story of shared passion and achievement.
          </Typography>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <ToggleButtonGroup
            value={category}
            exclusive
            onChange={handleCategoryChange}
            sx={{
              mb: 5,
              flexWrap: "wrap",
              gap: 1,
              "& .MuiToggleButton-root": {
                border: "1px solid",
                borderColor: "divider",
                borderRadius: "50px !important",
                px: 3,
                py: 1,
                textTransform: "none",
                fontWeight: 500,
                "&.Mui-selected": {
                  bgcolor: "primary.main",
                  color: "white",
                  borderColor: "primary.main",
                  "&:hover": {
                    bgcolor: "primary.dark",
                  },
                },
                "&:hover": {
                  borderColor: "primary.main",
                },
              },
            }}
          >
            {CATEGORIES.map((c) => (
              <ToggleButton key={c} value={c}>
                {c}
              </ToggleButton>
            ))}
          </ToggleButtonGroup>
        </motion.div>

        <AnimatePresence mode="wait">
          <motion.div
            key={category}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <ImageList
              variant="masonry"
              cols={3}
              gap={16}
              sx={{
                mb: 0,
                "& .MuiImageListItem-root": {
                  overflow: "hidden",
                  borderRadius: 3,
                  cursor: "pointer",
                  "& img": {
                    transition: "transform 0.4s ease",
                  },
                  "&:hover img": {
                    transform: "scale(1.06)",
                  },
                },
                // Responsive columns
                columnCount: {
                  xs: "1 !important",
                  sm: "2 !important",
                  md: "3 !important",
                },
              }}
            >
              {filteredImages.map((img, i) => (
                <ImageListItem key={i} onClick={() => setSelectedImage(img.src)}>
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.4, delay: i * 0.05 }}
                  >
                    <Image
                      src={img.src}
                      alt={img.alt}
                      width={600}
                      height={400 + (i % 3) * 50}
                      style={{
                        width: "100%",
                        height: "auto",
                        display: "block",
                      }}
                    />
                  </motion.div>
                </ImageListItem>
              ))}
            </ImageList>
          </motion.div>
        </AnimatePresence>

        {filteredImages.length === 0 && (
          <Box sx={{ textAlign: "center", py: 8 }}>
            <Typography variant="h6" color="text.secondary">
              No images in this category yet.
            </Typography>
          </Box>
        )}
      </Container>

      {/* Lightbox Dialog */}
      <Dialog
        open={!!selectedImage}
        onClose={() => setSelectedImage(null)}
        maxWidth="lg"
        fullWidth
        sx={{
          "& .MuiDialog-paper": {
            bgcolor: "transparent",
            boxShadow: "none",
            overflow: "visible",
          },
          "& .MuiBackdrop-root": {
            bgcolor: "rgba(0,0,0,0.9)",
          },
        }}
      >
        <IconButton
          onClick={() => setSelectedImage(null)}
          sx={{
            position: "absolute",
            top: -48,
            right: 0,
            color: "white",
            "&:hover": {
              bgcolor: "rgba(255,255,255,0.1)",
            },
          }}
        >
          <CloseIcon />
        </IconButton>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
          >
            <Image
              src={selectedImage}
              alt="Gallery image"
              width={1200}
              height={800}
              style={{
                width: "100%",
                height: "auto",
                borderRadius: 8,
              }}
            />
          </motion.div>
        )}
      </Dialog>
    </Box>
  );
}
