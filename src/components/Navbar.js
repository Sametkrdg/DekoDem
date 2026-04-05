// React
import React, { useState } from 'react';

// MUI
import {
  AppBar, Toolbar, Button, Box, IconButton,
  Drawer, List, ListItem, ListItemText,
  useTheme, useMediaQuery, Divider,
} from '@mui/material';
import {
  Menu      as MenuIcon,
  Close     as CloseIcon,
  AdminPanelSettings as AdminIcon,
} from '@mui/icons-material';
import { styled, alpha } from '@mui/material/styles';

// Router
import { Link, useLocation } from 'react-router-dom';

// Styles
import { LogoText as StyledLogoText, GradientText, CTAButton } from '../styles/StyledComponents';

// Components
import DarkModeToggle from './DarkModeToggle';

// Navigation data
import { NAV_ITEMS, PATHS } from '../constants/navigation';

// ── Styled Components ────────────────────────────────────────────────────────
const StyledToolbar = styled(Toolbar)(({ theme }) => ({
  justifyContent: 'space-between',
  padding:        '0 24px',
  minHeight:      '70px',
  [theme.breakpoints.down('md')]: {
    padding:   '0 16px',
    minHeight: '60px',
  },
}));

const LogoContainer = styled(Box)(() => ({
  display:        'flex',
  alignItems:     'center',
  gap:            '12px',
  cursor:         'pointer',
  textDecoration: 'none',
  transition:     'transform 0.25s ease',
  '&:hover':      { transform: 'scale(1.04)' },
}));

const LogoText = styled(StyledLogoText)(({ theme }) => ({
  fontSize: '1.5rem',
  display:  'none',
  [theme.breakpoints.up('md')]: { display: 'block' },
}));

const LogoPlaceholder = styled(Box)(({ theme }) => ({
  width:        '46px',
  height:       '46px',
  borderRadius: '12px',
  background:   `linear-gradient(135deg, ${theme.palette.primary.main}, ${alpha(theme.palette.primary.main, 0.7)})`,
  display:      'flex',
  alignItems:   'center',
  justifyContent: 'center',
  color:        'white',
  fontWeight:   'bold',
  fontSize:     '1.1rem',
  boxShadow:    `0 4px 14px ${alpha(theme.palette.primary.main, 0.35)}`,
  flexShrink:   0,
  ...theme.mixins.hoverEffect,
}));

const NavMenu = styled(Box)(({ theme }) => ({
  display:    'flex',
  gap:        '4px',
  alignItems: 'center',
  [theme.breakpoints.down('md')]: { display: 'none' },
}));

const NavButton = styled(Button, {
  shouldForwardProp: (p) => p !== 'active',
})(({ theme, active }) => ({
  color:           active ? theme.palette.primary.main : theme.palette.text.primary,
  fontWeight:      active ? 700 : 500,
  fontSize:        '0.9rem',
  padding:         '7px 14px',
  borderRadius:    '50px',
  textTransform:   'none',
  position:        'relative',
  transition:      theme.transitions.create(['background-color', 'color', 'transform'], { duration: 200 }),
  backgroundColor: active ? alpha(theme.palette.primary.main, 0.1) : 'transparent',
  '&:hover': {
    backgroundColor: alpha(theme.palette.primary.main, 0.08),
    transform:       'translateY(-1px)',
  },
  '&::after': active ? {
    content:       '""',
    position:      'absolute',
    bottom:        '3px',
    left:          '50%',
    transform:     'translateX(-50%)',
    width:         '18px',
    height:        '2.5px',
    background:    `linear-gradient(90deg, ${theme.palette.primary.main}, ${alpha(theme.palette.primary.main, 0.5)})`,
    borderRadius:  '2px',
  } : {},
}));

const AdminButton = styled(CTAButton)(({ theme }) => ({
  background:   'linear-gradient(135deg, #e74c3c, #c0392b)',
  borderRadius: '50px',
  padding:      '6px 16px',
  fontSize:     '0.82rem',
  minWidth:     'auto',
  '&:hover': { background: 'linear-gradient(135deg, #c0392b, #a93226)' },
}));

const MobileMenuButton = styled(IconButton)(({ theme }) => ({
  display: 'none',
  color:   theme.palette.text.primary,
  [theme.breakpoints.down('md')]: { display: 'flex' },
}));

const StyledDrawer = styled(Drawer)(({ theme }) => ({
  '& .MuiDrawer-paper': {
    width:   '280px',
    padding: '20px 0',
    // Dark mode glass is handled by MuiDrawer theme override in Theme.js
    // Light mode uses the gradient
    ...(!theme.palette.mode || theme.palette.mode === 'light'
      ? { ...theme.mixins.gradientBackground, color: 'white' }
      : {}
    ),
  },
}));

const DrawerNavItem = styled(ListItem, {
  shouldForwardProp: (p) => p !== 'active',
})(({ theme, active }) => ({
  margin:          '3px 16px',
  borderRadius:    '12px',
  backgroundColor: active ? alpha('#ffffff', 0.12) : 'transparent',
  transition:      theme.transitions.create(['background-color', 'transform'], { duration: 200 }),
  '&:hover': {
    backgroundColor: alpha('#ffffff', 0.1),
    transform:       'translateX(6px)',
  },
}));

// NAV_ITEMS is imported from navigation.js — do not duplicate here.

// ── Component ────────────────────────────────────────────────────────────────
function Navbar({ settings }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const theme      = useTheme();
  const isMobile   = useMediaQuery(theme.breakpoints.down('md'));
  const location   = useLocation();
  const isDark     = theme.palette.mode === 'dark';

  const siteTitle    = settings?.title || 'DEKODEM';
  const logoInitials = siteTitle.split(' ').map((n) => n[0]).join('').slice(0, 2).toUpperCase() || 'SD';

  const handleDrawerToggle = () => setMobileOpen((o) => !o);

  /**
   * Returns true when the given nav item should be styled as active.
   * - exact items (home): strict equality only.
   * - prefix items: match exact path OR any sub-route starting with path + '/'.
   */
  const isActive = (item) =>
    item.exact
      ? location.pathname === item.path
      : location.pathname === item.path ||
        location.pathname.startsWith(item.path + '/');

  // ── Mobile Drawer ────────────────────────────────────────────────────────
  const drawer = (
    <Box>
      {/* Header */}
      <Box
        sx={{
          display:       'flex',
          alignItems:    'center',
          justifyContent:'space-between',
          px: 2.5,
          mb: 2.5,
          mt: 1,
        }}
      >
        <Box display="flex" alignItems="center" gap={1.5}>
          <LogoPlaceholder>{logoInitials}</LogoPlaceholder>
          <GradientText variant="h6" fontWeight="bold">
            {siteTitle}
          </GradientText>
        </Box>
        <IconButton
          onClick={handleDrawerToggle}
          sx={{ color: isDark ? 'text.primary' : 'white' }}
          aria-label="Menüyü kapat"
        >
          <CloseIcon />
        </IconButton>
      </Box>

      <Divider sx={{ bgcolor: 'rgba(255,255,255,0.15)', mx: 2 }} />

      {/* Nav items — List renders as <ul>, DrawerNavItem as <li> for semantic A11y */}
      <List component="ul" sx={{ mt: 1.5, listStyle: 'none', p: 0, m: 0 }}>
        {NAV_ITEMS.map((item) => (
          <DrawerNavItem
            key={item.path}
            component="li"
            button
            disableGutters={false}
            ContainerComponent="div"
            sx={{ display: 'block' }}
            active={isActive(item)}
          >
            <Box
              component={Link}
              to={item.path}
              onClick={handleDrawerToggle}
              sx={{ display: 'block', textDecoration: 'none', px: 2, py: 0.5 }}
            >
              <ListItemText
                primary={item.label}
                sx={{
                  '& .MuiListItemText-primary': {
                    fontWeight: isActive(item) ? 700 : 400,
                    color:      isDark ? 'text.primary' : 'white',
                    fontSize:   '0.95rem',
                  },
                }}
              />
            </Box>
          </DrawerNavItem>
        ))}
      </List>

      <Divider sx={{ bgcolor: 'rgba(255,255,255,0.15)', mx: 2, my: 2 }} />

      {/* Bottom actions */}
      <Box sx={{ px: 2.5, display: 'flex', flexDirection: 'column', gap: 1.5 }}>
        {/* Dark mode toggle in drawer */}
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Box
            component="span"
            sx={{ fontSize: '0.85rem', color: isDark ? 'text.secondary' : 'rgba(255,255,255,0.75)', fontWeight: 500 }}
          >
            {isDark ? 'Karanlık mod açık' : 'Aydınlık mod açık'}
          </Box>
          <DarkModeToggle size="small" />
        </Box>

        <AdminButton
          component={Link}
          to={PATHS.ADMIN}
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
      <AppBar component="nav">
        <StyledToolbar>
          {/* Logo */}
          <LogoContainer component={Link} to="/">
            <LogoPlaceholder aria-hidden="true">{logoInitials}</LogoPlaceholder>
            <LogoText variant="h6">{siteTitle}</LogoText>
          </LogoContainer>

          {/* Desktop nav — semantic <nav><ul><li> for A11y & SEO */}
          <NavMenu component="nav" aria-label="Ana menü">
            <Box
              component="ul"
              sx={{ listStyle: 'none', m: 0, p: 0, display: 'flex', gap: '4px', alignItems: 'center' }}
            >
              {NAV_ITEMS.map((item) => (
                <Box component="li" key={item.path}>
                  <NavButton
                    component={Link}
                    to={item.path}
                    active={isActive(item)}
                  >
                    {item.label}
                  </NavButton>
                </Box>
              ))}
            </Box>
          </NavMenu>

          {/* Right-side actions */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            {/* Dark mode toggle — always visible */}
            <DarkModeToggle />

            {!isMobile && (
              <AdminButton
                component={Link}
                to={PATHS.ADMIN}
                startIcon={<AdminIcon fontSize="small" />}
              >
                Admin
              </AdminButton>
            )}

            <MobileMenuButton
              onClick={handleDrawerToggle}
              aria-label={mobileOpen ? 'Menüyü kapat' : 'Menüyü aç'}
              aria-expanded={mobileOpen}
              aria-controls="mobile-drawer"
            >
              <MenuIcon />
            </MobileMenuButton>
          </Box>
        </StyledToolbar>
      </AppBar>

      {/* Mobile Drawer */}
      <StyledDrawer
        id="mobile-drawer"
        variant="temporary"
        anchor="right"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{ keepMounted: true }}
      >
        {drawer}
      </StyledDrawer>

      {/* Spacer for fixed AppBar */}
      <Box sx={{ height: { xs: '60px', md: '70px' } }} />
    </>
  );
}

export default Navbar;
