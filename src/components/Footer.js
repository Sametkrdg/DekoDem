import { Box, Typography, Container, Button} from "@mui/material";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: "#c1ff6fff",
        color: "#fff",
        py: 3,
        mt: "auto",
      }}
    >
      <Container maxWidth="lg">
        <Typography variant="body1" align="center">
          © {new Date().getFullYear()} Deko Dem İnşaat. Tüm hakları saklıdır.
          <Button color="inherit" component={Link} to="/hakkimizda" sx={{ mr: 2 }}>Hakkımızda</Button>
        </Typography>

        
      </Container>
    </Box>
  );
}

export default Footer;
