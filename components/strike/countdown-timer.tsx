"use client";

import { Box, Typography } from "@mui/material";
import { useEffect, useState } from "react";

type TimeLeft = {
  d: number;
  h: number;
  m: number;
  s: number;
};

export default function CountdownTimer({ targetDate }: { targetDate: string }) {
  const [time, setTime] = useState<TimeLeft>({ d: 0, h: 0, m: 0, s: 0 });
  const [isExpired, setIsExpired] = useState(false);

  useEffect(() => {
    const calculate = () => {
      const diff = new Date(targetDate).getTime() - Date.now();
      if (diff <= 0) {
        setIsExpired(true);
        return;
      }
      setTime({
        d: Math.floor(diff / 86400000),
        h: Math.floor((diff % 86400000) / 3600000),
        m: Math.floor((diff % 3600000) / 60000),
        s: Math.floor((diff % 60000) / 1000),
      });
    };

    calculate();
    const id = setInterval(calculate, 1000);
    return () => clearInterval(id);
  }, [targetDate]);

  if (isExpired) {
    return (
      <Typography variant="h6" color="primary.main" fontWeight={600}>
        Event has started!
      </Typography>
    );
  }

  const labels = ["Days", "Hrs", "Min", "Sec"];
  const values = [time.d, time.h, time.m, time.s];

  return (
    <Box sx={{ display: "flex", gap: { xs: 1, sm: 2 }, flexWrap: "wrap" }}>
      {values.map((value, i) => (
        <Box
          key={labels[i]}
          sx={{
            textAlign: "center",
            minWidth: { xs: 50, sm: 70 },
            bgcolor: "primary.main",
            borderRadius: 2,
            p: { xs: 1, sm: 1.5 },
            boxShadow: "0 4px 20px rgba(255,87,34,0.3)",
          }}
        >
          <Typography
            variant="h5"
            fontWeight={800}
            sx={{ color: "white", fontSize: { xs: "1.2rem", sm: "1.5rem" } }}
          >
            {String(value).padStart(2, "0")}
          </Typography>
          <Typography
            variant="caption"
            sx={{ color: "rgba(255,255,255,0.85)", fontSize: { xs: "0.65rem", sm: "0.75rem" } }}
          >
            {labels[i]}
          </Typography>
        </Box>
      ))}
    </Box>
  );
}
