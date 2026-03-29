// pages/Projects.js
import React from "react";
import { useNavigate } from "react-router-dom";
import ProjectsHeader from "../components/ProjectsHeader";
import ProjectsGrid from "../components/ProjectsGrid";
import StatsSection from "../components/StatsSection";
import LoadingSpinner from "../components/LoadingSpinner";
import { useSite } from "../context/SiteContext";
import { Box, Typography } from "@mui/material";
import { SectionContainer } from "../styles/StyledComponents";
import defaultProjects from "../data/projects";

const normalizeProject = (project, index) => {
  if (!project) {
    return null;
  }

  const title = project.ad || project.title || `Proje ${index + 1}`;
  const slug = project.slug || project.permalink || `proje-${index + 1}`;

  return {
    ...project,
    ad: title,
    slug,
    aciklama: project.aciklama || project.description || "",
    yer: project.yer || project.location || "Belirtilmedi",
    yıl: project.yıl || project.year || "",
    durum: project.durum || project.status || "Devam Ediyor",
    alan: project.alan || project.area || "",
    icon: project.icon || project.emoji || "🏗️",
    imageUrl: project.imageUrl || project.coverImage || project.gorsel || "",
  };
};

const Projects = () => {
  const navigate = useNavigate();
  const { siteContent, loading } = useSite();

  const availableSlugs = React.useMemo(
    () => new Set(defaultProjects.map((project) => project.slug)),
    []
  );

  const contentProjects = React.useMemo(() => {
    const source =
      siteContent?.projects && siteContent.projects.length
        ? siteContent.projects
        : defaultProjects;

    return source
      .map((project, index) => normalizeProject(project, index))
      .filter(Boolean)
      .map((project) => ({
        ...project,
        canNavigate: availableSlugs.has(project.slug),
      }));
  }, [siteContent, availableSlugs]);

  const handleSelectProject = (project) => {
    if (project?.slug && availableSlugs.has(project.slug)) {
      navigate(`/projeler/${project.slug}`);
    }
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <SectionContainer maxWidth="lg">
      <ProjectsHeader />
      {contentProjects && contentProjects.length > 0 ? (
        <ProjectsGrid projeler={contentProjects} onSelect={handleSelectProject} />
      ) : (
        <Box sx={{ py: 10, textAlign: "center", minHeight: "40vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <Typography variant="h5" color="text.secondary" sx={{ fontWeight: 500 }}>
            Henüz proje eklenmedi.
          </Typography>
        </Box>
      )}
      <StatsSection />
    </SectionContainer>
  );
};
export default Projects;
