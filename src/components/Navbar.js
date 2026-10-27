// React
import React, { useState, useEffect } from 'react';

// MUI
import {
  AppBar, Toolbar, Button, Box, IconButton,
  Drawer, List, ListItem, ListItemText,
  useTheme, useMediaQuery, Divider, Tooltip,
} from '@mui/material';
import {
  Menu                as MenuIcon,
  Close               as CloseIcon,
  AdminPanelSettings  as AdminIcon,
  ArrowForward,
} from '@mui/icons-material';
import { styled, alpha } from '@mui/material/styles';

// Router
import { Link, useLocation } from 'react-router-dom';

// Firebase — real-time logo sync
import { doc, onSnapshot } from 'firebase/firestore';
import { db, isFirebaseConfigured } from '../config/firebase';

// Cloudinary — optimised logo delivery
import { buildCloudinaryUrl } from '../services/cloudinary';

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
  // Taller toolbar to host the enlarged transparent brand logo with breathing room
  minHeight:      '112px',
  [theme.breakpoints.down('md')]: {
    padding:   '0 16px',
    minHeight: '88px',
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
  width:        '40px',
  height:       '40px',
  borderRadius: '8px',    // Architectural: tighter radius
  // Primary navy + secondary orange corner accent
  background:   `linear-gradient(135deg, ${theme.palette.primary.main} 60%, ${theme.palette.secondary.main} 100%)`,
  display:      'flex',
  alignItems:   'center',
  justifyContent: 'center',
  color:        'white',
  fontWeight:   800,
  fontSize:     '1rem',
  letterSpacing: '-0.03em',
  boxShadow:    `0 4px 14px ${alpha(theme.palette.primary.main, 0.4)}`,
  flexShrink:   0,
  transition:   'transform 0.2s ease',
  '&:hover':    { transform: 'scale(1.06)' },
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

// Primary CTA — "Teklif Al" using safety-orange secondary palette
const QuoteButton = styled(Button)(({ theme }) => ({
  background:   `linear-gradient(135deg, ${theme.palette.secondary.main}, ${theme.palette.secondary.dark})`,
  color:        '#fff',
  borderRadius: '8px',          // Architectural: slightly squared
  padding:      '7px 18px',
  fontSize:     '0.85rem',
  fontWeight:   700,
  minWidth:     'auto',
  textTransform: 'none',
  boxShadow:    `0 4px 14px ${alpha(theme.palette.secondary.main, 0.35)}`,
  letterSpacing: '0.02em',
  transition:   'transform 0.2s ease, box-shadow 0.2s ease',
  '&:hover': {
    background:  `linear-gradient(135deg, ${theme.palette.secondary.dark}, ${theme.palette.secondary.main})`,
    boxShadow:   `0 6px 20px ${alpha(theme.palette.secondary.main, 0.5)}`,
    transform:   'translateY(-2px)',
  },
}));

// Admin — small icon-button for the admin panel link
const AdminIconButton = styled(IconButton)(({ theme }) => ({
  width:        34,
  height:       34,
  borderRadius: '8px',
  color:        theme.palette.text.secondary,
  border:       `1px solid ${theme.palette.divider}`,
  transition:   'all 0.2s ease',
  '&:hover': {
    color:       theme.palette.primary.main,
    borderColor: theme.palette.primary.main,
    background:  alpha(theme.palette.primary.main, 0.06),
  },
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

  // ── Real-time dual-logo — onSnapshot listener on Settings/main ──────────
  // logoLight → LogoUrl (shown in light mode)
  // logoDark  → LogoDarkModeUrl (shown in dark mode; falls back to logoLight)
  const [logoLight, setLogoLight] = useState(null);
  const [logoDark,  setLogoDark]  = useState(null);

  useEffect(() => {
    // 2× the target render width so the logo stays crisp on retina/HiDPI displays
    const opt = { width: 560, crop: 'limit' };
    const toUrl = (raw) => raw ? buildCloudinaryUrl(raw, opt) : null;

    if (!isFirebaseConfigured || !db) {
      setLogoLight(toUrl(settings?.logoUrl || null));
      return;
    }

    // onSnapshot fires immediately with cached data, then re-fires on every
    // Firestore write — logo changes in the Admin Panel reflect site-wide
    // without a page refresh.
    const unsubscribe = onSnapshot(
      doc(db, 'Settings', 'main'),
      (snap) => {
        const data = snap.exists() ? snap.data() : {};
        setLogoLight(toUrl(data?.LogoUrl          ?? null));
        setLogoDark (toUrl(data?.LogoDarkModeUrl  ?? null));
      },
      (err) => {
        console.error('[Navbar] Firestore logo listener error:', err);
        setLogoLight(toUrl(settings?.logoUrl || null));
      }
    );

    return unsubscribe;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Pick the correct logo for the active theme; dark falls back to light logo
  // if no dark-specific asset has been uploaded yet.
  const logo = isDark ? (logoDark || logoLight) : logoLight;

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
          {logo ? (
            <Box
              component="img"
              src={logo}
              alt={siteTitle}
              sx={{
                maxHeight: { xs: '60px', sm: '70px' },
                maxWidth:  { xs: '210px', sm: '260px' },
                width:     'auto',
                display:   'block',
                objectFit: 'contain',
              }}
            />
          ) : (
            <>
              <LogoPlaceholder>{logoInitials}</LogoPlaceholder>
              <GradientText variant="h6" fontWeight="bold">
                {siteTitle}
              </GradientText>
            </>
          )}
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

        {/* Primary CTA in mobile drawer */}
        <QuoteButton
          component={Link}
          to={PATHS.CONTACT}
          onClick={handleDrawerToggle}
          endIcon={<ArrowForward />}
          fullWidth
          sx={{ py: 1.25 }}
        >
          Teklif Al
        </QuoteButton>

        {/* Admin — secondary link */}
        <Button
          component={Link}
          to={PATHS.ADMIN}
          onClick={handleDrawerToggle}
          startIcon={<AdminIcon sx={{ fontSize: 16 }} />}
          variant="outlined"
          size="small"
          fullWidth
          sx={{
            color:       isDark ? 'text.secondary' : 'rgba(255,255,255,0.6)',
            borderColor: isDark ? 'rgba(255,255,255,0.15)' : 'rgba(255,255,255,0.25)',
            borderRadius: '8px',
            fontWeight:  500,
            fontSize:    '0.8rem',
            textTransform: 'none',
          }}
        >
          Admin Panel
        </Button>
      </Box>
    </Box>
  );

  return (
    <>
      <AppBar component="nav">
        <StyledToolbar>
          {/* Logo — renders Cloudinary-optimised image when set, text fallback otherwise */}
          <LogoContainer component={Link} to="/">
            {logo ? (
              <Box
                component="img"
                src={logo}
                alt={siteTitle}
                sx={{
                  // Enlarged transparent brand logo — responsive across breakpoints.
                  // Desktop ~72px tall, mobile ~56px tall. maxWidth caps horizontal
                  // bleed on wide/landscape logos so the navbar stays balanced.
                  maxHeight:  { xs: '64px', sm: '76px', md: '88px' },
                  maxWidth:   { xs: '230px', sm: '300px', md: '380px' },
                  width:      'auto',
                  display:    'block',
                  objectFit:  'contain',
                  // Crisp rendering on retina displays
                  imageRendering: '-webkit-optimize-contrast',
                }}
              />
            ) : (
              <>
                <LogoPlaceholder aria-hidden="true">{logoInitials}</LogoPlaceholder>
                <LogoText variant="h6">{siteTitle}</LogoText>
              </>
            )}
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
          <Box sx={{ display: 'flex', alignItems: 'center', gap: { xs: 0.75, md: 1.25 } }}>
            {/* Dark mode toggle — always visible */}
            <DarkModeToggle />

            {!isMobile && (
              <>
                {/* Admin — small icon-only button to avoid visual clutter */}
                <Tooltip title="Admin Panel" placement="bottom">
                  <AdminIconButton
                    component={Link}
                    to={PATHS.ADMIN}
                    aria-label="Admin Panel"
                  >
                    <AdminIcon sx={{ fontSize: 17 }} />
                  </AdminIconButton>
                </Tooltip>

                {/* Primary CTA — drives to contact/quote flow */}
                <QuoteButton
                  component={Link}
                  to={PATHS.CONTACT}
                  endIcon={<ArrowForward sx={{ fontSize: 16 }} />}
                >
                  Teklif Al
                </QuoteButton>
              </>
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

      {/* Spacer for fixed AppBar — must match StyledToolbar minHeight */}
      <Box sx={{ height: { xs: '88px', md: '112px' } }} />
    </>
  );
}

export default Navbar;
