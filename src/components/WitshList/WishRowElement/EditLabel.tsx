import ModeEditOutlinedIcon from "@mui/icons-material/ModeEditOutlined";
import { Box, IconButton, TextField, Typography } from "@mui/material";
import React from "react";

export const EditLabel = ({
  label,
  name,
  onChange
}: {
  label: string;
  name: string;
  onChange: (e: any) => void;
}) => {
  const [isEditing, setIsEditing] = React.useState(false);

  return (
    <Box display="flex" alignItems="center">
      {isEditing ? (
        <TextField
          fullWidth
          value={label}
          name={name}
          onChange={onChange}
          variant="standard"
          size="small"
        />
      ) : (
        <Typography
          style={{
            // Prevent overflow
            overflow: "hidden",
            // Show ellipsis for overflowing text
            textOverflow: "ellipsis",
            // Prevent text from wrapping to the next line
            whiteSpace: "nowrap"
          }}
        >
          {label}
        </Typography>
      )}
      <IconButton
        onClick={() => setIsEditing((prev) => !prev)}
        color="inherit"
        sx={{ mx: 1 }}
      >
        <ModeEditOutlinedIcon fontSize="small" />
      </IconButton>
    </Box>
  );
};
