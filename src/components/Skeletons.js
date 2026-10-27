/**
 * Reusable skeleton templates.
 * Import the one that matches the content shape you're loading.
 */
import React from "react";
import { Box, Grid, Skeleton } from "@mui/material";

/** Matches text-only ProjectCard layout */
export const ProjectCardSkeleton = () => (
  <Box sx={{ border: "1px solid", borderColor: "divider", borderRadius: "24px", p: 3.5, height: "100%", display: "flex", flexDirection: "column" }}>
    <Skeleton width="65%" height={28} sx={{ mb: 1.5 }} />
    <Skeleton width="100%" height={16} sx={{ mb: 0.5 }} />
    <Skeleton width="92%" height={16} sx={{ mb: 0.5 }} />
    <Skeleton width="78%" height={16} sx={{ mb: 0.5 }} />
    <Skeleton variant="rounded" height={36} sx={{ mt: "auto", borderRadius: "24px" }} />
  </Box>
);

/** Matches text-only BlogCard layout */
export const BlogCardSkeleton = () => (
  <Box sx={{ border: "1px solid", borderColor: "divider", borderRadius: "24px", p: 3.5, height: "100%", display: "flex", flexDirection: "column" }}>
    <Skeleton width={80} height={20} sx={{ borderRadius: "24px", mb: 1.5 }} />
    <Skeleton width="90%" height={22} sx={{ mb: 0.5 }} />
    <Skeleton width="70%" height={22} sx={{ mb: 1.5 }} />
    <Skeleton width="100%" height={14} sx={{ mb: 0.5 }} />
    <Skeleton width="85%" height={14} sx={{ mb: 0.5 }} />
    <Skeleton width={120} height={14} sx={{ mt: "auto" }} />
  </Box>
);

/** Matches branch / career card layout */
export const CardSkeleton = () => (
  <Box sx={{ border: "1px solid", borderColor: "divider", borderRadius: 3, p: 3 }}>
    <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
      <Skeleton width="60%" height={26} />
      <Skeleton width={60} height={26} sx={{ borderRadius: 4 }} />
    </Box>
    <Skeleton width="100%" height={14} sx={{ mb: 0.5 }} />
    <Skeleton width="90%" height={14} sx={{ mb: 0.5 }} />
    <Skeleton width="75%" height={14} sx={{ mb: 3 }} />
    <Skeleton variant="rounded" height={40} />
  </Box>
);

/** Grid of N project card skeletons */
export const ProjectsGridSkeleton = ({ count = 6 }) => (
  <Grid container spacing={4} sx={{ mb: 10 }}>
    {Array.from({ length: count }).map((_, i) => (
      <Grid size={{ xs: 12, md: 6 }} key={i}>
        <ProjectCardSkeleton />
      </Grid>
    ))}
  </Grid>
);

/** Grid of N blog card skeletons */
export const BlogGridSkeleton = ({ count = 6 }) => (
  <Grid container spacing={4}>
    {Array.from({ length: count }).map((_, i) => (
      <Grid size={{ xs: 12, sm: 6, md: 4 }} key={i}>
        <BlogCardSkeleton />
      </Grid>
    ))}
  </Grid>
);

/** Generic list of card skeletons */
export const CardGridSkeleton = ({ count = 4, columns = { xs: 12, md: 6 } }) => (
  <Grid container spacing={3}>
    {Array.from({ length: count }).map((_, i) => (
      <Grid {...columns} key={i}>
        <CardSkeleton />
      </Grid>
    ))}
  </Grid>
);
