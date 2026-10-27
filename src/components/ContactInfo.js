/**
 * ContactInfo.js — Minimal icon-only contact row.
 *
 * Three circular gold icons (Address · Phone · E-mail). No labels, no text.
 * Each icon links to maps / tel: / mailto:. Accessibility preserved via
 * aria-label + native title tooltip on hover.
 *
 * Centered single row on every breakpoint; no overflow.
 */

import React from 'react';
import { Box, Tooltip, Link as MuiLink } from '@mui/material';
import { Phone, MailOutline, LocationOn } from '@mui/icons-material';
import { alpha, useTheme } from '@mui/material/styles';

import { useSite } from '../context/SiteContext';

const IconButtonLink = ({ icon, label, href, external }) => {
  const theme    = useTheme();
  const isDark   = theme.palette.mode === 'dark';
  const gold     = theme.palette.primary.main;
  const hairline = isDark ? 'rgba(255,255,255,0.10)' : 'rgba(0,0,0,0.08)';

  return (
    <Tooltip title={label} arrow>
      <MuiLink
        href={href || undefined}
        aria-label={label}
        {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
        underline="none"
        sx={{
          width:          48,
          height:         48,
          display:        'inline-flex',
          alignItems:     'center',
          justifyContent: 'center',
          borderRadius:   '50%',
          border:         '1px solid',
          borderColor:    hairline,
          color:          gold,
          bgcolor:        'transparent',
          transition:     'transform 0.25s cubic-bezier(0.4,0,0.2,1), background-color 0.25s ease, border-color 0.25s ease',
          '&:hover': {
            transform:   'scale(1.08)',
            bgcolor:     alpha(gold, isDark ? 0.12 : 0.08),
            borderColor: gold,
          },
          '& svg': { fontSize: 22 },
        }}
      >
        {icon}
      </MuiLink>
    </Tooltip>
  );
};

const ContactInfo = () => {
  const { contactSettings } = useSite();

  const phoneHref = contactSettings.Phone
    ? `tel:${contactSettings.Phone.replace(/\s/g, '')}`
    : null;
  const emailHref = contactSettings.Email
    ? `mailto:${contactSettings.Email}`
    : null;
  const mapsHref = contactSettings.Address
    ? `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(contactSettings.Address)}`
    : null;

  return (
    <Box
      sx={{
        display:        'flex',
        alignItems:     'center',
        justifyContent: 'center',
        gap:            { xs: 2, sm: 3 },
        flexWrap:       'wrap',
      }}
    >
      {contactSettings.Address && (
        <IconButtonLink
          icon={<LocationOn />}
          label={contactSettings.Address}
          href={mapsHref}
          external
        />
      )}
      {contactSettings.Phone && (
        <IconButtonLink
          icon={<Phone />}
          label={contactSettings.Phone}
          href={phoneHref}
        />
      )}
      {contactSettings.Email && (
        <IconButtonLink
          icon={<MailOutline />}
          label={contactSettings.Email}
          href={emailHref}
        />
      )}
    </Box>
  );
};

export default ContactInfo;
