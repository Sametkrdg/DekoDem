import React, { useState } from 'react';
import {
  Box, Typography, Grid, Card, CardContent,
  Chip, Button, Tabs, Tab, Container,
} from '@mui/material';
import { alpha, useTheme } from '@mui/material/styles';
import {
  LocationOn, CalendarToday, Apartment,
  ArrowForward, Visibility,
} from '@mui/icons-material';

// ── Status config — colours from theme, not hardcoded ────────────────────────
const STATUS_META = {
  completed: { label: 'Tamamlandı',    color: 'success' },
  ongoing:   { label: 'Devam Ediyor',  color: 'warning' },
  planning:  { label: 'Planlama',      color: 'info'    },
};

// ── Mock project data (replaced by Firestore in production) ──────────────────
const PROJECTS = [
  { id: 1, title: 'Modern Konutlar Sitesi',  description: "İstanbul'da modern mimariye sahip 120 daireli lüks konut projesi. Sosyal tesisler ve yeşil alanlarla donatılmış.", location: 'Kadıköy, İstanbul',  year: 2023, type: 'Konut',       status: 'completed' },
  { id: 2, title: 'Business Plaza',          description: "Ankara'nın merkezinde 25 katlı modern ofis binası. A+ sınıfı ofis alanları ve konferans merkezleri.",           location: 'Çankaya, Ankara',   year: 2022, type: 'Ticari',      status: 'completed' },
  { id: 3, title: 'Ege Villa Serisi',        description: "İzmir'de deniz manzaralı 15 adet müstakil villa projesi. Özel bahçeler ve kapalı otoparklar.",                  location: 'Çeşme, İzmir',      year: 2021, type: 'Villa',       status: 'completed' },
  { id: 4, title: 'Teknoloji Kampüsü',       description: "Bursa'da teknoloji şirketleri için tasarlanan modern kampüs projesi. Sürdürülebilir enerji çözümleri.",         location: 'Nilüfer, Bursa',    year: 2023, type: 'Ticari',      status: 'ongoing'   },
  { id: 5, title: 'Marmara Residence',       description: "İstanbul'da 200 daireli karma kullanımlı proje. Alışveriş alanları ve sosyal tesisler içeriyor.",                location: 'Maltepe, İstanbul', year: 2024, type: 'Karma',       status: 'ongoing'   },
  { id: 6, title: 'Endüstri Merkezi',        description: "Kocaeli'nde modern endüstriyel tesis projesi. Lojistik ve üretim alanları bir arada.",                          location: 'Gebze, Kocaeli',    year: 2024, type: 'Endüstriyel', status: 'planning'  },
];

const TABS = [
  { label: 'Tümü',       filter: null          },
  { label: 'Tamamlanan', filter: 'completed'   },
  { label: 'Devam Eden', filter: 'ongoing'     },
  { label: 'Planlanan',  filter: 'planning'    },
];

// ── ProjectCard ───────────────────────────────────────────────────────────────
const ProjectCard = ({ project }) => {
  const theme  = useTheme();
  const isDark = theme.palette.mode === 'dark';
  const meta   = STATUS_META[project.status] ?? STATUS_META.planning;

  return (
    <Card
      sx={{
        height:    '100%',
        display:   'flex',
        flexDirection: 'column',
        // Uses theme MuiCard override (glassmorphism in dark, clean white in light)
        cursor:    'default',
        '&:hover .project-image-inner': {
          transform: 'scale(1.05)',
        },
        '&:hover .view-overlay': {
          opacity: 1,
        },
      }}
    >
      {/* ── Image / placeholder area ─────────────────────────────────────── */}
      <Box
        sx={{
          height:   220,
          position: 'relative',
          overflow: 'hidden',
          background: `linear-gradient(135deg, ${theme.palette.primary.dark}, ${theme.palette.primary.main})`,
          flexShrink: 0,
        }}
      >
        {/* Gradient overlay for visual depth */}
        <Box
          sx={{
            position: 'absolute',
            inset:    0,
            background: `linear-gradient(135deg, ${alpha(theme.palette.primary.main, 0.8)}, ${alpha(theme.palette.secondary.main, 0.6)})`,
            zIndex:   1,
          }}
        />

        {/* Icon placeholder */}
        <Box
          className="project-image-inner"
          sx={{
            position:       'absolute',
            inset:          0,
            display:        'flex',
            alignItems:     'center',
            justifyContent: 'center',
            zIndex:         2,
            transition:     'transform 0.35s ease',
          }}
        >
          <Apartment sx={{ fontSize: 64, color: 'rgba(255,255,255,0.6)' }} />
        </Box>

        {/* Hover: "View details" overlay */}
        <Box
          className="view-overlay"
          sx={{
            position:       'absolute',
            inset:          0,
            display:        'flex',
            alignItems:     'center',
            justifyContent: 'center',
            zIndex:         3,
            opacity:        0,
            transition:     'opacity 0.3s ease',
            bgcolor:        'rgba(0,0,0,0.35)',
            backdropFilter: 'blur(4px)',
          }}
        >
          <Button
            variant="outlined"
            size="small"
            startIcon={<Visibility />}
            sx={{
              color:       '#fff',
              borderColor: 'rgba(255,255,255,0.6)',
              borderRadius: '50px',
              '&:hover': { borderColor: '#fff', bgcolor: 'rgba(255,255,255,0.1)' },
            }}
          >
            Detayları Gör
          </Button>
        </Box>

        {/* Status chip — top-right */}
        <Chip
          label={meta.label}
          color={meta.color}
          size="small"
          sx={{
            position:   'absolute',
            top:        12,
            right:      12,
            zIndex:     4,
            fontWeight: 700,
            fontSize:   '0.72rem',
            height:     24,
          }}
        />
      </Box>

      {/* ── Content ──────────────────────────────────────────────────────── */}
      <CardContent
        sx={{
          p:      '24px !important',
          flexGrow: 1,
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <Typography
          variant="h6"
          fontWeight={700}
          sx={{ mb: 1, lineHeight: 1.3, color: 'text.primary' }}
        >
          {project.title}
        </Typography>

        <Typography
          variant="body2"
          color="text.secondary"
          sx={{
            mb:                 2,
            lineHeight:         1.65,
            display:            '-webkit-box',
            WebkitLineClamp:    3,
            WebkitBoxOrient:    'vertical',
            overflow:           'hidden',
          }}
        >
          {project.description}
        </Typography>

        {/* Meta details */}
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.75, mt: 'auto' }}>
          {[
            { icon: LocationOn,   value: project.location },
            { icon: CalendarToday, value: project.year    },
            { icon: Apartment,    value: project.type     },
          ].map(({ icon: Icon, value }) => (
            <Box
              key={value}
              sx={{ display: 'flex', alignItems: 'center', gap: 1, color: 'text.secondary' }}
            >
              <Icon sx={{ fontSize: 16, color: 'primary.main', flexShrink: 0 }} />
              <Typography variant="caption" sx={{ fontSize: '0.82rem', lineHeight: 1.4 }}>
                {value}
              </Typography>
            </Box>
          ))}
        </Box>
      </CardContent>
    </Card>
  );
};

// ── Section ───────────────────────────────────────────────────────────────────
const ProjectShowcase = () => {
  const theme  = useTheme();
  const isDark = theme.palette.mode === 'dark';
  const [activeTab, setActiveTab] = useState(0);
  const [showMore,  setShowMore]  = useState(false);

  const activeFilter = TABS[activeTab]?.filter ?? null;
  const filtered     = activeFilter
    ? PROJECTS.filter((p) => p.status === activeFilter)
    : PROJECTS;
  const displayed    = showMore ? filtered : filtered.slice(0, 6);

  const handleTabChange = (_, v) => { setActiveTab(v); setShowMore(false); };

  return (
    <Box
      component="section"
      sx={{
        py:       { xs: 9, md: 13 },
        // Alternates with surrounding sections
        ...theme.mixins.sectionSurfaceAlt,
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <Container maxWidth="lg">

        {/* ── Header ─────────────────────────────────────────────────────── */}
        <Box sx={{ textAlign: 'center', mb: { xs: 5, md: 7 } }}>
          <Typography
            variant="overline"
            sx={{ color: 'primary.main', letterSpacing: '0.14em', display: 'block', mb: 1 }}
          >
            PROJELER
          </Typography>
          <Typography variant="h3" component="h2" fontWeight={800} sx={{ mb: 2 }}>
            Öne Çıkan Projelerimiz
          </Typography>
          <Typography color="text.secondary" sx={{ maxWidth: 520, mx: 'auto', lineHeight: 1.75 }}>
            Tamamladığımız ve sürdürdüğümüz projelerin bir bölümü.
          </Typography>
        </Box>

        {/* ── Filter tabs ────────────────────────────────────────────────── */}
        <Box sx={{ display: 'flex', justifyContent: 'center', mb: { xs: 4, md: 6 } }}>
          <Tabs
            value={activeTab}
            onChange={handleTabChange}
            variant="scrollable"
            scrollButtons="auto"
            sx={{
              '& .MuiTabs-indicator': {
                background:   `linear-gradient(90deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                height:       3,
                borderRadius: 2,
              },
              '& .MuiTab-root': {
                textTransform: 'none',
                fontWeight:    600,
                fontSize:      '0.95rem',
                color:         'text.secondary',
                minWidth:      100,
                '&.Mui-selected': { color: 'primary.main' },
              },
            }}
          >
            {TABS.map((t) => (
              <Tab key={t.label} label={t.label} />
            ))}
          </Tabs>
        </Box>

        {/* ── Card grid ──────────────────────────────────────────────────── */}
        <Grid container spacing={3}>
          {displayed.map((project, idx) => (
            <Grid item xs={12} sm={6} lg={4} key={project.id}>
              <Box
                sx={{
                  height:            '100%',
                  animationName:     'cardFadeUp',
                  animationDuration: '0.4s',
                  animationDelay:    `${idx * 0.07}s`,
                  animationFillMode: 'both',
                  '@keyframes cardFadeUp': {
                    from: { opacity: 0, transform: 'translateY(20px)' },
                    to:   { opacity: 1, transform: 'translateY(0)'    },
                  },
                }}
              >
                <ProjectCard project={project} />
              </Box>
            </Grid>
          ))}
        </Grid>

        {/* ── Show more ──────────────────────────────────────────────────── */}
        {filtered.length > 6 && (
          <Box sx={{ textAlign: 'center', mt: { xs: 5, md: 7 } }}>
            <Button
              variant="outlined"
              size="large"
              endIcon={<ArrowForward />}
              onClick={() => setShowMore((v) => !v)}
              sx={{ borderRadius: '50px', px: 5, fontWeight: 700 }}
            >
              {showMore
                ? 'Daha Az Göster'
                : `${filtered.length - 6} Proje Daha Göster`}
            </Button>
          </Box>
        )}
      </Container>
    </Box>
  );
};

export default ProjectShowcase;
