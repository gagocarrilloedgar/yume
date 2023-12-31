import React from "react";

import { Box, Container, Toolbar } from "@mui/material";
import { StickyFooter } from "~/components/StickyFooter.tsx";
import { Appbar } from "../Appbar";
import { LogoutButton } from "../Auth";

export function Layout({
  showBar,
  children
}: React.PropsWithChildren<{ showBar?: boolean }>) {
  return (
    <>
      {showBar && <Appbar />}
      <Toolbar />
      <Container maxWidth="md">
        <Box
          component="main"
          sx={{
            display: "flex",
            flexDirection: "column",
            px: 2,
            py: 2,
            minHeight: "93vh"
          }}
        >
          {children}
          <LogoutButton />
          <StickyFooter />
        </Box>
      </Container>
    </>
  );
}
