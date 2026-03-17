"use client";

import { Fab, Tooltip, Zoom } from "@mui/material";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import { useScrollTrigger } from "@mui/material";

export default function WhatsAppFAB({ phone }: { phone: string }) {
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 100,
  });

  return (
    <Zoom in={trigger}>
      <Tooltip title="Chat on WhatsApp" placement="left">
        <Fab
          color="success"
          size="medium"
          href={`https://wa.me/${phone.replace(/\D/g, "")}?text=Hi%20Strike%20Run%20Club!`}
          target="_blank"
          rel="noopener noreferrer"
          sx={{
            position: "fixed",
            bottom: 24,
            right: 24,
            zIndex: 1300,
            transition: "transform 0.25s",
            "&:hover": { transform: "scale(1.1)" },
          }}
        >
          <WhatsAppIcon />
        </Fab>
      </Tooltip>
    </Zoom>
  );
}
