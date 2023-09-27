import { Box, Card, CardActionArea } from "@mui/material";
import { Wish } from "~/domain/wishes";
import { ViewLabel } from "./ViewLabel";

export const ViewableRowElement = ({
  wish,
  handleToggle
}: {
  wish: Wish;
  handleToggle: (id: string) => void;
}) => {
  if (!wish) return null;

  return (
    <Card
      variant="outlined"
      sx={{
        p: 0.5,
        borderRadius: 0,
        border: "2px solid",
        boxShadow: `7px 7px ${wish.color} , 7px 7px 0px 2px #171d21`
      }}
    >
      <CardActionArea href={wish.url} target="_blank">
        <Box sx={{ p: 0.5 }} display="flex" alignItems="center">
          <ViewLabel label={wish.title} url={wish.url} />
          <Box flexGrow={1} />
          {/*<Checkbox
          color="default"
          checked={!wish.available}
          onChange={() => handleToggle(wish.id)}
    />*/}
        </Box>
      </CardActionArea>
    </Card>
  );
};
