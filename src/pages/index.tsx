import {
  Button,
  Container,
  Grid,
  Typography,
  useMediaQuery
} from "@mui/material";
import Head from "next/head";
import Image from "next/image";
import React, { FC } from "react";
import { StickyFooter } from "~/components/StickyFooter.tsx";
import { COLORS } from "~/theme";

export default function Home() {
  const title = "Cut the clutter, share your wishes";
  const text = [
    "Do not waste money on non-valuable gifts.",
    "Share your wish list with one click.",
    "Create private and public lists.",
    "Enjoy gifts without wasting unnecessary money and time",
    "Get recomendataions and alternatives using AI."
  ];
  const isLargeScreen = useMediaQuery("(min-width:1200px)");
  const isMobile = useMediaQuery("(max-width:600px)");

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        justifyItems: "center",
        background:
          "linear-gradient(112deg, #B2E1BB 20.03%, rgba(217, 233, 82, 0.52) 138.29%)"
      }}
    >
      <Head>
        <title>Milista | {title}</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Container maxWidth="lg" sx={{ paddingBottom: 5, margin: "auto" }}>
        <Grid
          container
          columnSpacing={4}
          sx={{ pt: 10, textAlign: isLargeScreen ? "left" : "center " }}
        >
          <Grid item xs={12} sm={12} md={12}>
            <Typography
              pb={4}
              fontWeight={800}
              variant={isMobile ? "h3" : "h2"}
              gutterBottom
            >
              {title}
            </Typography>
          </Grid>

          <Grid item xs={12} sm={12} md={12} lg={7}>
            {text.map((item) => (
              <Typography
                pb={2}
                maxWidth="md"
                variant={isMobile ? "h6" : "h4"}
                key={item}
                fontWeight={400}
                gutterBottom={!isMobile}
              >
                {item}
              </Typography>
            ))}
            <Button
              disableElevation
              size="large"
              fullWidth
              variant="contained"
              color="inherit"
              sx={{
                background: COLORS.secondaryOrange,
                fontWeight: "bold",
                mt: 4,
                boxShadow: `7px 7px ${COLORS.white}, 7px 7px 0px 2px #171d21`
              }}
              href="/login"
            >
              Create an account, it's free
            </Button>
          </Grid>

          <Grid item display={{ xs: "none", lg: "block" }} lg={4}>
            <Image src="/img/cover.png" alt="home" width={430} height={580} />
          </Grid>
        </Grid>
        <StickyFooter />
      </Container>
    </div>
  );
}

const NoLayout: FC<{ children: React.ReactNode }> = ({ children }) => (
  <>{children}</>
);

Home.defaultProps = {
  layout: NoLayout
};
