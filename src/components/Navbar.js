import React, { useState } from 'react';
import {
  AppBar,
  Toolbar,
  Button,
  Box,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText,
  useTheme,
  useMediaQuery,
  Typography,
  Divider,
} from '@mui/material';
import {
  Menu as MenuIcon,
  Close as CloseIcon,
  AdminPanelSettings as AdminIcon,
} from '@mui/icons-material';
import { Link, useLocation } from 'react-router-dom';
import { styled } from '@mui/material/styles';

// 🎨 Styled Components
const StyledAppBar = styled(AppBar)(({ theme }) => ({
  background: 'rgba(255, 255, 255, 0.95)',
  backdropFilter: 'blur(20px)',
  boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
  borderBottom: '1px solid rgba(255, 255, 255, 0.2)',
  position: 'fixed',
  top: 0,
  zIndex: theme.zIndex.appBar,
}));

const StyledToolbar = styled(Toolbar)(({ theme }) => ({
  justifyContent: 'space-between',
  padding: '0 24px',
  minHeight: '70px',
  [theme.breakpoints.down('md')]: {
    padding: '0 16px',
    minHeight: '60px',
  },
}));

const LogoContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: '12px',
  cursor: 'pointer',
  textDecoration: 'none',
  transition: 'all 0.3s ease',
  '&:hover': {
    transform: 'scale(1.05)',
  },
}));

const LogoText = styled(Typography)(({ theme }) => ({
  fontSize: '1.5rem',
  fontWeight: 'bold',
  background: 'linear-gradient(135deg, #3498db, #2ecc71)',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  display: 'none',
  [theme.breakpoints.up('md')]: {
    display: 'block',
  },
}));

const LogoPlaceholder = styled(Box)(({ theme }) => ({
  width: '50px',
  height: '50px',
  borderRadius: '12px',
  background: 'linear-gradient(135deg, #3498db, #2ecc71)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: 'white',
  fontWeight: 'bold',
  fontSize: '1.2rem',
  boxShadow: '0 4px 15px rgba(52, 152, 219, 0.3)',
}));

const NavMenu = styled(Box)(({ theme }) => ({
  display: 'flex',
  gap: '8px',
  alignItems: 'center',
  [theme.breakpoints.down('md')]: {
    display: 'none',
  },
}));

const NavButton = styled(Button)(({ theme, active }) => ({
  color: active ? theme.palette.primary.main : theme.palette.text.primary,
  fontWeight: active ? 600 : 500,
  fontSize: '0.95rem',
  padding: '8px 16px',
  borderRadius: '50px',
  textTransform: 'none',
  position: 'relative',
  transition: 'all 0.3s ease',
  backgroundColor: active ? 'rgba(52, 152, 219, 0.1)' : 'transparent',
  '&:hover': {
    backgroundColor: 'rgba(52, 152, 219, 0.1)',
    transform: 'translateY(-2px)',
  },
  '&::after': active ? {
    content: '""',
    position: 'absolute',
    bottom: '4px',
    left: '50%',
    transform: 'translateX(-50%)',
    width: '20px',
    height: '3px',
    background: 'linear-gradient(135deg, #3498db, #2ecc71)',
    borderRadius: '2px',
  } : {},
}));

const AdminButton = styled(Button)(({ theme }) => ({
  background: 'linear-gradient(135deg, #e74c3c, #c0392b)',
  color: 'white',
  borderRadius: '50px',
  padding: '6px 16px',
  fontSize: '0.85rem',
  fontWeight: 600,
  textTransform: 'none',
  minWidth: 'auto',
  boxShadow: '0 4px 15px rgba(231, 76, 60, 0.3)',
  transition: 'all 0.3s ease',
  '&:hover': {
    background: 'linear-gradient(135deg, #c0392b, #a93226)',
    transform: 'translateY(-2px)',
    boxShadow: '0 6px 20px rgba(231, 76, 60, 0.4)',
  },
}));

const MobileMenuButton = styled(IconButton)(({ theme }) => ({
  display: 'none',
  color: theme.palette.text.primary,
  [theme.breakpoints.down('md')]: {
    display: 'flex',
  },
}));

const StyledDrawer = styled(Drawer)(({ theme }) => ({
  '& .MuiDrawer-paper': {
    width: '280px',
    background: 'linear-gradient(135deg, #2c3e50 0%, #34495e 100%)',
    color: 'white',
    padding: '20px 0',
  },
}));

const DrawerHeader = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: '0 20px',
  marginBottom: '20px',
}));

const DrawerNavItem = styled(ListItem)(({ theme, active }) => ({
  margin: '4px 20px',
  borderRadius: '12px',
  backgroundColor: active ? 'rgba(255, 255, 255, 0.1)' : 'transparent',
  transition: 'all 0.3s ease',
  '&:hover': {
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    transform: 'translateX(8px)',
  },
}));

// 📱 Navigation Items
const navigationItems = [
  { label: 'Anasayfa', path: '/' },
  { label: 'Hakkımızda', path: '/hakkimizda' },
  { label: 'Faaliyet Alanları', path: '/faaliyet-alanlari' },
  { label: 'Projeler', path: '/projeler' },
  { label: 'İletişim', path: '/iletisim' },
];

function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const location = useLocation();

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const isActiveRoute = (path) => {
    return location.pathname === path;
  };

  const drawer = (
    <Box>
      <DrawerHeader>
        <Box display="flex" alignItems="center" gap={2}>
          <LogoPlaceholder>
            SD
          </LogoPlaceholder>
          <Typography variant="h6" fontWeight="bold">
            Sedat Demir Yapı
          </Typography>
        </Box>
        <IconButton onClick={handleDrawerToggle} sx={{ color: 'white' }}>
          <CloseIcon />
        </IconButton>
      </DrawerHeader>

      <Divider sx={{ backgroundColor: 'rgba(255,255,255,0.2)', margin: '0 20px' }} />

      <List sx={{ mt: 2 }}>
        {navigationItems.map((item) => (
          <DrawerNavItem
            key={item.path}
            button
            component={Link}
            to={item.path}
            onClick={handleDrawerToggle}
            active={isActiveRoute(item.path)}
          >
            <ListItemText 
              primary={item.label}
              sx={{ 
                '& .MuiListItemText-primary': { 
                  fontWeight: isActiveRoute(item.path) ? 600 : 400 
                } 
              }}
            />
          </DrawerNavItem>
        ))}
      </List>

      <Divider sx={{ backgroundColor: 'rgba(255,255,255,0.2)', margin: '20px' }} />

      <Box sx={{ padding: '0 20px' }}>
        <AdminButton
          component={Link}
          to="/admin"
          onClick={handleDrawerToggle}
          startIcon={<AdminIcon />}
          fullWidth
        >
          Admin Panel
        </AdminButton>
      </Box>
    </Box>
  );

  return (
    <>
      <StyledAppBar>
        <StyledToolbar>
          {/* Logo Section */}
          <LogoContainer component={Link} to="/">
            <LogoPlaceholder>
              SD
            </LogoPlaceholder>
            <LogoText variant="h6">
              Sedat Demir Yapı
            </LogoText>
          </LogoContainer>

          {/* Desktop Navigation */}
          <NavMenu>
            {navigationItems.map((item) => (
              <NavButton
                key={item.path}
                component={Link}
                to={item.path}
                active={isActiveRoute(item.path)}
              >
                {item.label}
              </NavButton>
            ))}
          </NavMenu>

          {/* Right Section */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            {!isMobile && (
              <AdminButton
                component={Link}
                to="/admin"
                startIcon={<AdminIcon fontSize="small" />}
              >
                Admin
              </AdminButton>
            )}

            {/* Mobile Menu Button */}
            <MobileMenuButton onClick={handleDrawerToggle}>
              <MenuIcon />
            </MobileMenuButton>
          </Box>
        </StyledToolbar>
      </StyledAppBar>

      {/* Mobile Drawer */}
      <StyledDrawer
        variant="temporary"
        anchor="right"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{ keepMounted: true }}
      >
        {drawer}
      </StyledDrawer>

      {/* Spacer for fixed navbar */}
      <Box sx={{ height: { xs: '60px', md: '70px' } }} />
    </>
  );
}

export default Navbar;