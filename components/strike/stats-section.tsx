"use client";

import { Box, Container, Typography } from "@mui/material";
import Grid from "@mui/material/Grid";
import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { STATS } from "@/lib/data";

function Counter({ target, suffix = "" }: { target: number; suffix?: string }) {
  const [val, setVal] = useState(0);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  useEffect(() => {
    if (!inView) return;
    let v = 0;
    const duration = 2000; // 2 seconds
    const steps = 60;
    const increment = target / steps;
    const stepDuration = duration / steps;

    const id = setInterval(() => {
      v += increment;
      if (v >= target) {
        setVal(target);
        clearInterval(id);
      } else {
        setVal(Math.floor(v));
      }
    }, stepDuration);

    return () => clearInterval(id);
  }, [inView, target]);

  return (
    <Typography
      ref={ref}
      variant="h2"
      sx={{
        color: "primary.main",
        fontWeight: 800,
        fontSize: { xs: "2rem", md: "3rem" },
      }}
    >
      {val.toLocaleString()}
      {suffix}
    </Typography>
  );
}

export default function StatsSection() {
  return (
    <Box
      sx={{
        py: { xs: 8, md: 12 },
        bgcolor: "background.paper",
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4} justifyContent="center">
          {STATS.map((s, i) => (
            <Grid key={s.label} size={{ xs: 6, md: 3 }}>
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1, duration: 0.6 }}
                viewport={{ once: true, margin: "-50px" }}
              >
                <Box
                  sx={{
                    textAlign: "center",
                    p: { xs: 2, md: 4 },
                    borderRadius: 3,
                    border: "1px solid",
                    borderColor: "divider",
                    bgcolor: "background.default",
                    transition: "all 0.3s ease",
                    "&:hover": {
                      borderColor: "primary.main",
                      transform: "translateY(-4px)",
                    },
                  }}
                >
                  <Counter target={s.value} suffix={s.suffix} />
                  <Typography variant="body1" color="text.secondary" sx={{ mt: 1, fontWeight: 500 }}>
                    {s.label}
                  </Typography>
                </Box>
              </motion.div>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}
