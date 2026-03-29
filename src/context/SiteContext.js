import React, { createContext, useContext, useState, useEffect } from 'react';
import { createDefaultSiteContent } from '../constants/defaultSiteContent';
import { getSettings } from '../services/firestore';
import { seedFirestore } from '../utils/seedFirestore';

const SiteContext = createContext();

// Fallback defaults
const DEFAULT_SETTINGS = {
    title: "Sedat Demir Yapı",
    color: "#1976d2",
    logoUrl: "",
    description: "Profesyonel yapı çözümleri",
    codeReviewEnabled: true,
};

export const SiteProvider = ({ children }) => {
    const [settings, setSettings] = useState(DEFAULT_SETTINGS);
    const [siteContent, setSiteContent] = useState(createDefaultSiteContent());
    const [loading, setLoading] = useState(true);

    // Fetch initial data
    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                // 1. Fetch Settings from Firestore
                const remoteSettings = await getSettings();
                if (remoteSettings) {
                    setSettings(prev => ({ ...prev, ...remoteSettings }));
                }

                // 2. Local fallback if needed (kept for hybrid approach)
                const storedSettings = localStorage.getItem("siteSettings");
                if (storedSettings) {
                    try {
                        const parsed = JSON.parse(storedSettings);
                        setSettings((prev) => ({ ...prev, ...parsed }));
                    } catch (error) {
                        console.warn("Kayıtlı site ayarları okunamadı:", error);
                    }
                }
            } catch (err) {
                console.error("Failed to fetch initial site data:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    // Dev helper to trigger seed
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
        settings,
        setSettings,
        siteContent,
        setSiteContent,
        loading,
        triggerSeed // Exposed for dev usage (e.g. from a hidden button or console)
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
