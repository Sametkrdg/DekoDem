import { AppBar, Toolbar, Button, Box } from "@mui/material";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <AppBar position="static" color="primary">
      <Toolbar sx={{ justifyContent: "center", position: "relative" }}>
        
        {/* Logo için boş yer - solda hizalanmış */}
        <Box 
          sx={{ 
            position: "absolute", 
            left: 16, 
            display: "flex", 
            alignItems: "center",
            height: "100%"
          }}
        >
          {/* Buraya logo komponentini veya <img> koyabilirsin */}
          <Box
            sx={{
              width: 120,  // logo genişliği, istediğin gibi ayarla
              height: 40,  // logo yüksekliği
              bgcolor: "secondary.main", // sadece placeholder rengi, sil veya değiştir
              borderRadius: 1,
            }}
          />
        </Box>

        {/* Menü butonları ortalanmış */}
        <Box sx={{ display: "flex", gap: 2 }}>
          <Button color="inherit" component={Link} to="/">
            Anasayfa
          </Button>
          <Button color="inherit" component={Link} to="/hakkimizda">
            Hakkımızda
          </Button>
          <Button color="inherit" component={Link} to="/faaliyet-alanlari">
            Faaliyet Alanlarımız
          </Button>
          <Button color="inherit" component={Link} to="/projeler">
            Projeler
          </Button>
          <Button color="inherit" component={Link} to="/iletisim">
            İletişim
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;
