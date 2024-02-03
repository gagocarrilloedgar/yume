import LaunchOutlinedIcon from "@mui/icons-material/LaunchOutlined";
import { Box, IconButton, Typography } from "@mui/material";

export const ViewLabel = ({
  label,
  url
}: {
  label: string;
  url: string | null;
}) => {
  return (
    <Box display="flex" alignItems="center">
      <Typography variant="body2" fontWeight="600">
        {label}
      </Typography>
      {url && (
        <IconButton
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="open url"
          color="inherit"
          sx={{ mx: 1 }}
        >
          <LaunchOutlinedIcon fontSize="small" />
        </IconButton>
      )}
    </Box>
  );
};
