
import LaunchOutlinedIcon from "@mui/icons-material/LaunchOutlined";
import ModeEditOutlinedIcon from "@mui/icons-material/ModeEditOutlined";
import { IconButton } from "@mui/material";

interface Props {
  url: string;
  isPublic: boolean;
  onEdit?: () => void;
}

export const EditOpenLinkIconButton = ({ url, isPublic, onEdit }: Props) => {
  if (!isPublic && onEdit)
    return (
      <IconButton onClick={onEdit} color="inherit" sx={{ mx: 1 }}>
        <ModeEditOutlinedIcon fontSize="small" />
      </IconButton>
    );

  return (
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
  );
};
