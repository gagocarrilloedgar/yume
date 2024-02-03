import ModeEditOutlinedIcon from "@mui/icons-material/ModeEditOutlined";
import SaveOutlinedIcon from "@mui/icons-material/SaveOutlined";
import { Box, IconButton, TextField, Typography } from "@mui/material";
import React from "react";

export const EditLabel = ({
  label,
  name,
  placeholder,
  updateValue,
  onChange
}: {
  label?: string | null;
  placeholder?: string;
  name: string;
  updateValue: (value?: string) => Promise<void>;
  onChange: (e: any) => void;
}) => {
  const [isEditing, setIsEditing] = React.useState(false);

  const changeEditMode = async () => {
    if (isEditing && label) {
      await updateValue(label);
    }
    setIsEditing((prev) => !prev);
  };

  return (
    <Box display="flex" alignItems="center">
      {isEditing ? (
        <TextField
          fullWidth
          maxRows={4}
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
            whiteSpace: "nowrap",
            opacity: label ? 1 : 0.5
          }}
        >
          {label ?? placeholder}
        </Typography>
      )}
      <IconButton onClick={changeEditMode} color="inherit" sx={{ mx: 1 }}>
        {isEditing ? (
          <SaveOutlinedIcon fontSize="small" />
        ) : (
          <ModeEditOutlinedIcon fontSize="small" />
        )}
      </IconButton>
    </Box>
  );
};
