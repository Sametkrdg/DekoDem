// pages/Projects.js
import React, { useMemo, useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import {
  Box, Typography, ToggleButton, ToggleButtonGroup, MenuItem,
  Select, FormControl, InputLabel, Grid, Pagination, Divider,
} from "@mui/material";
import ProjectsHeader from "../components/ProjectsHeader";
import ProjectCard from "../components/ProjectCard";
import StatsSection from "../components/StatsSection";
import { ProjectsGridSkeleton } from "../components/Skeletons";
import EmptyState from "../components/EmptyState";
import { useSite } from "../context/SiteContext";
import { SectionContainer } from "../styles/StyledComponents";
import defaultProjects from "../data/projects";
import { Construction } from "@mui/icons-material";

const PAGE_SIZE = 6;

const STATUS_FILTERS = ["Tümü", "Tamamlandı", "Devam Ediyor", "Planlama"];

const SORT_OPTIONS = [
  { value: "default",  label: "Varsayılan" },
  { value: "year-desc", label: "En Yeni" },
  { value: "year-asc",  label: "En Eski" },
  { value: "area-desc", label: "Alan (Büyükten Küçüğe)" },
  { value: "area-asc",  label: "Alan (Küçükten Büyüğe)" },
];

const parseArea = (areaStr = "") => {
  const n = parseFloat(areaStr.replace(/[^\d.]/g, ""));
  return isNaN(n) ? 0 : n;
};

const normalizeProject = (project, index) => {
  if (!project) return null;
  const title = project.ad || project.title || `Proje ${index + 1}`;
  const slug  = project.slug || project.permalink || `proje-${index + 1}`;
  return {
    ...project,
    ad:      title,
    slug,
    aciklama: project.aciklama || project.description || "",
    yer:      project.yer || project.location || "Belirtilmedi",
    yıl:      project.yıl || project.year || "",
    durum:    project.durum || project.status || "Devam Ediyor",
    alan:     project.alan || project.area || "",
    icon:     project.icon || project.emoji || "🏗️",
    imageUrl: project.imageUrl || project.coverImage || project.gorsel || "",
  };
};

const Projects = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const { siteContent, loading } = useSite();

  // Read filters from URL
  const urlStatus = searchParams.get("durum") || "Tümü";
  const urlSort   = searchParams.get("siralama") || "default";
  const urlPage   = parseInt(searchParams.get("sayfa") || "1", 10);

  const [status, setStatus] = useState(urlStatus);
  const [sort,   setSort]   = useState(urlSort);
  const [page,   setPage]   = useState(urlPage);

  // Sync state → URL
  useEffect(() => {
    const params = {};
    if (status !== "Tümü")   params.durum    = status;
    if (sort   !== "default") params.siralama = sort;
    if (page   !== 1)         params.sayfa    = String(page);
    setSearchParams(params, { replace: true });
  }, [status, sort, page, setSearchParams]);

  // Reset page on filter / sort change
  const handleStatus = (_, val) => { if (val) { setStatus(val); setPage(1); } };
  const handleSort   = (e)      => { setSort(e.target.value); setPage(1); };

  const availableSlugs = useMemo(
    () => new Set(defaultProjects.map((p) => p.slug)),
    []
  );

  const allProjects = useMemo(() => {
    const source =
      siteContent?.projects?.length ? siteContent.projects : defaultProjects;
    return source
      .map((p, i) => normalizeProject(p, i))
      .filter(Boolean)
      .map((p) => ({ ...p, canNavigate: availableSlugs.has(p.slug) }));
  }, [siteContent, availableSlugs]);

  // Filter
  const filtered = useMemo(() => {
    if (status === "Tümü") return allProjects;
    return allProjects.filter((p) => p.durum === status);
  }, [allProjects, status]);

  // Sort
  const sorted = useMemo(() => {
    const arr = [...filtered];
    switch (sort) {
      case "year-desc": return arr.sort((a, b) => (b.yıl || 0) - (a.yıl || 0));
      case "year-asc":  return arr.sort((a, b) => (a.yıl || 0) - (b.yıl || 0));
      case "area-desc": return arr.sort((a, b) => parseArea(b.alan) - parseArea(a.alan));
      case "area-asc":  return arr.sort((a, b) => parseArea(a.alan) - parseArea(b.alan));
      default:          return arr;
    }
  }, [filtered, sort]);

  // Paginate
  const totalPages = Math.ceil(sorted.length / PAGE_SIZE);
  const paginated  = sorted.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const handleSelect = (project) => {
    if (project?.slug && availableSlugs.has(project.slug)) {
      navigate(`/projeler/${project.slug}`);
    }
  };

  if (loading) {
    return (
      <SectionContainer maxWidth="lg">
        <ProjectsHeader />
        <ProjectsGridSkeleton count={6} />
      </SectionContainer>
    );
  }

  return (
    <SectionContainer maxWidth="lg">
      <ProjectsHeader />

      {/* ── Filters & sort bar ─────────────────────────────────────────────── */}
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 2,
          mb: 4,
        }}
      >
        {/* Status filter */}
        <ToggleButtonGroup
          value={status}
          exclusive
          onChange={handleStatus}
          size="small"
          sx={{ flexWrap: "wrap" }}
        >
          {STATUS_FILTERS.map((s) => (
            <ToggleButton
              key={s}
              value={s}
              sx={{
                fontWeight: 600,
                textTransform: "none",
                px: 2.5,
                "&.Mui-selected": {
                  bgcolor: "primary.main",
                  color: "#fff",
                  "&:hover": { bgcolor: "primary.dark" },
                },
              }}
            >
              {s}
              {s !== "Tümü" && (
                <Box
                  component="span"
                  sx={{ ml: 0.75, opacity: 0.7, fontSize: "0.75rem" }}
                >
                  ({allProjects.filter((p) => p.durum === s).length})
                </Box>
              )}
            </ToggleButton>
          ))}
        </ToggleButtonGroup>

        {/* Sort */}
        <FormControl size="small" sx={{ minWidth: 200 }}>
          <InputLabel>Sıralama</InputLabel>
          <Select value={sort} label="Sıralama" onChange={handleSort}>
            {SORT_OPTIONS.map((o) => (
              <MenuItem key={o.value} value={o.value}>{o.label}</MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>

      <Divider sx={{ mb: 4 }} />

      {/* ── Results count ──────────────────────────────────────────────────── */}
      <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
        {filtered.length} proje bulundu
        {status !== "Tümü" && ` — Filtre: ${status}`}
      </Typography>

      {/* ── Grid ──────────────────────────────────────────────────────────── */}
      {paginated.length === 0 ? (
        <EmptyState
          icon={<Construction />}
          title="Proje bulunamadı"
          description={`"${status}" durumunda henüz proje yok. Filtreyi değiştirmeyi deneyin.`}
          action={{ label: "Tüm Projeleri Gör", onClick: () => { setStatus("Tümü"); setPage(1); } }}
        />
      ) : (
        <Grid container spacing={4} sx={{ mb: 4 }}>
          {paginated.map((proje, i) => (
            <Grid item xs={12} md={6} key={i}>
              <ProjectCard proje={proje} onSelect={handleSelect} />
            </Grid>
          ))}
        </Grid>
      )}

      {/* ── Pagination ─────────────────────────────────────────────────────── */}
      {totalPages > 1 && (
        <Box sx={{ display: "flex", justifyContent: "center", mt: 2, mb: 8 }}>
          <Pagination
            count={totalPages}
            page={page}
            onChange={(_, val) => { setPage(val); window.scrollTo({ top: 0, behavior: "smooth" }); }}
            color="primary"
            shape="rounded"
            size="large"
          />
        </Box>
      )}

      <StatsSection />
    </SectionContainer>
  );
};

export default Projects;
