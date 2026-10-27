import React, { createContext, useContext, useState, useEffect } from 'react';
import { createDefaultSiteContent } from '../constants/defaultSiteContent';
import { getSettings, getAbout } from '../services/firestore';
import { fetchSiteContent } from '../services/contentService';
import { seedFirestore } from '../utils/seedFirestore';
import { contact as staticContact, about as staticAbout } from '../constants/siteContent';

const SiteContext = createContext();

// ── Admin colour/title fallback (localStorage-driven, NOT from Firestore schema) ──
const DEFAULT_SETTINGS = {
    title:              "DEKODEM",
    color:              "#C9A961", // Champagne Gold — luxury primary
    logoUrl:            "",
    description:        "Profesyonel yapı çözümleri",
    codeReviewEnabled:  true,
};

// ── Contact info fallback (mirrors Settings doc schema) ───────────────────────
const DEFAULT_CONTACT_SETTINGS = {
    Phone:         staticContact.phone1,
    Email:         staticContact.email,
    Address:       staticContact.address,
    InstaUrl:      staticContact.instagramUrl,
    LogoUrl:       "",
    LogoDarkModeUrl: "",
    FaviconUrl:    "",
    HeroImageUrl:  "", // Cloudinary URL; empty = Unsplash fallback shown
};

// ── About content fallback (mirrors About doc schema) ────────────────────────
const DEFAULT_ABOUT_CONTENT = {
    AboutShort: staticAbout.shortSummary,
    AboutLong:  staticAbout.shortSummary, // fallback when no long-form exists
};

export const SiteProvider = ({ children }) => {
    // Admin theme/colour settings (stored in localStorage, enriched from Firestore Settings)
    const [settings, setSettings] = useState(DEFAULT_SETTINGS);

    // Firestore Settings document — { Phone, Email, Address, InstaUrl, LogoUrl }
    const [contactSettings, setContactSettings] = useState(DEFAULT_CONTACT_SETTINGS);

    // Firestore About document — { AboutShort, AboutLong }
    const [aboutContent, setAboutContent] = useState(DEFAULT_ABOUT_CONTENT);

    // Legacy siteContent blob (gallery, videos, etc. from contentService)
    const [siteContent, setSiteContent] = useState(createDefaultSiteContent());

    const [loading, setLoading] = useState(true);

    // ── Initial data fetch ─────────────────────────────────────────────────
    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);

                const [remoteSettings, remoteAbout, remoteContent] = await Promise.all([
                    getSettings(),
                    getAbout(),
                    fetchSiteContent(),
                ]);

                // --- Settings document → contactSettings + merge logo/favicon into admin settings ---
                if (remoteSettings) {
                    setContactSettings((prev) => ({ ...prev, ...remoteSettings }));
                    // Push LogoUrl into admin settings so Navbar still works via settings.logoUrl
                    if (remoteSettings.LogoUrl) {
                        setSettings((prev) => ({ ...prev, logoUrl: remoteSettings.LogoUrl }));
                    }
                    // Push FaviconUrl into admin settings so App.js can inject it into <head>
                    if (remoteSettings.FaviconUrl) {
                        setSettings((prev) => ({ ...prev, faviconUrl: remoteSettings.FaviconUrl }));
                    }
                }

                // --- About document → aboutContent ---
                if (remoteAbout) {
                    setAboutContent((prev) => ({ ...prev, ...remoteAbout }));
                }

                // --- Legacy siteContent ---
                if (remoteContent) {
                    setSiteContent(remoteContent);
                }

                // --- localStorage overrides for admin colour/title ---
                const storedSettings = localStorage.getItem("siteSettings");
                if (storedSettings) {
                    try {
                        const parsed = JSON.parse(storedSettings);
                        setSettings((prev) => ({ ...prev, ...parsed }));
                    } catch {
                        // ignore malformed JSON
                    }
                }
            } catch (err) {
                console.error("SiteContext: failed to fetch initial data:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    // ── Re-fetch everything (called by admin panel after saving) ──────────
    const loadSiteContent = async () => {
        try {
            setLoading(true);
            const [remoteSettings, remoteAbout, remoteContent] = await Promise.all([
                getSettings(),
                getAbout(),
                fetchSiteContent(),
            ]);

            if (remoteSettings) {
                setContactSettings((prev) => ({ ...prev, ...remoteSettings }));
                if (remoteSettings.LogoUrl) {
                    setSettings((prev) => ({ ...prev, logoUrl: remoteSettings.LogoUrl }));
                }
                if (remoteSettings.FaviconUrl) {
                    setSettings((prev) => ({ ...prev, faviconUrl: remoteSettings.FaviconUrl }));
                }
            }
            if (remoteAbout) {
                setAboutContent((prev) => ({ ...prev, ...remoteAbout }));
            }
            if (remoteContent) {
                setSiteContent(remoteContent);
            }
        } catch (err) {
            console.error("SiteContext: loadSiteContent error:", err);
        } finally {
            setLoading(false);
        }
    };

    // ── Dev seed helper ───────────────────────────────────────────────────
    const triggerSeed = async () => {
        if (window.confirm("Bu işlem mevcut verilerin üzerine yazabilir. Emin misiniz?")) {
            setLoading(true);
            try {
                await seedFirestore();
                alert("Veri tabanı başarıyla örneklendi! Sayfayı yenileyin.");
                window.location.reload();
            } catch (e) {
                alert("Hata oluştu: " + e.message);
            } finally {
                setLoading(false);
            }
        }
    };

    const value = {
        // Admin colour/title (localStorage + Firestore LogoUrl)
        settings,
        setSettings,
        // Firestore Settings doc — contact info
        contactSettings,
        setContactSettings,
        // Firestore About doc — long/short text
        aboutContent,
        setAboutContent,
        // Legacy blob (gallery, videos)
        siteContent,
        setSiteContent,
        loading,
        loadSiteContent,
        triggerSeed,
    };

    return <SiteContext.Provider value={value}>{children}</SiteContext.Provider>;
};

export const useSite = () => {
    const context = useContext(SiteContext);
    if (!context) {
        throw new Error('useSite must be used within a SiteProvider');
    }
    return context;
};
