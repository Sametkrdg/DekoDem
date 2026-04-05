// React
import React from 'react';

// MUI
import { IconButton, Tooltip, Box } from '@mui/material';
import { LightMode, DarkMode } from '@mui/icons-material';
import { useTheme, alpha } from '@mui/material/styles';

// Context
import { useThemeMode } from '../context/ThemeContext';

/**
 * DarkModeToggle
 *
 * A polished Sun / Moon icon button that toggles the global theme mode.
 * The icon rotates 180° on switch and tints to gold (light) or indigo (dark)
 * to give instant visual feedback.
 *
 * Props:
 *   size       — 'small' | 'medium' (default 'medium')
 *   labelLight — tooltip label shown while in light mode  (default Turkish)
 *   labelDark  — tooltip label shown while in dark mode   (default Turkish)
 */
const DarkModeToggle = ({
  size       = 'medium',
  labelLight = 'Karanlık moda geç',
  labelDark  = 'Aydınlık moda geç',
}) => {
  const { isDark, toggleMode } = useThemeMode();
  const theme = useTheme();

  const btnSize = size === 'small' ? 34 : 40;
  const iconSize = size === 'small' ? '1.05rem' : '1.2rem';

  return (
    <Tooltip
      title={isDark ? labelDark : labelLight}
      placement="bottom"
      arrow
    >
      <IconButton
        onClick={toggleMode}
        aria-label={isDark ? labelDark : labelLight}
        size={size}
        sx={{
          width:        btnSize,
          height:       btnSize,
          borderRadius: '12px',
          border:       '1.5px solid',
          borderColor:  isDark
            ? alpha('#ffffff', 0.1)
            : alpha(theme.palette.primary.main, 0.18),
          bgcolor:      isDark
            ? alpha('#ffffff', 0.06)
            : alpha(theme.palette.primary.main, 0.05),
          overflow:     'hidden',
          transition:   theme.transitions.create(
            ['background-color', 'border-color', 'transform', 'box-shadow'],
            { duration: theme.transitions.duration.short },
          ),
          '&:hover': {
            bgcolor:    isDark
              ? alpha('#ffffff', 0.12)
              : alpha(theme.palette.primary.main, 0.1),
            borderColor: isDark
              ? alpha('#fbbf24', 0.5)
              : alpha(theme.palette.primary.main, 0.4),
            boxShadow:  isDark
              ? '0 0 12px rgba(251,191,36,0.2)'
              : `0 0 12px ${alpha(theme.palette.primary.main, 0.15)}`,
            transform:  'scale(1.06)',
          },
          '&:active': { transform: 'scale(0.95)' },
        }}
      >
        {/* Icon wrapper handles the rotation animation */}
        <Box
          sx={{
            display:    'flex',
            alignItems: 'center',
            justifyContent: 'center',
            // Rotate the icon as mode switches — 0° in dark (Moon visible), 180° in light
            transform:  isDark ? 'rotate(0deg)' : 'rotate(180deg)',
            transition: theme.transitions.create('transform', {
              duration: theme.transitions.duration.complex,
              easing:   theme.transitions.easing.easeInOut,
            }),
          }}
        >
          {isDark ? (
            // In dark mode show sun (click → light mode)
            <LightMode
              sx={{
                fontSize: iconSize,
                color:    '#fbbf24',
                filter:   'drop-shadow(0 0 4px rgba(251,191,36,0.5))',
                transition: theme.transitions.create('color', { duration: 200 }),
              }}
            />
          ) : (
            // In light mode show moon (click → dark mode)
            <DarkMode
              sx={{
                fontSize: iconSize,
                color:    theme.palette.primary.main,
                transition: theme.transitions.create('color', { duration: 200 }),
              }}
            />
          )}
        </Box>
      </IconButton>
    </Tooltip>
  );
};

export default DarkModeToggle;
