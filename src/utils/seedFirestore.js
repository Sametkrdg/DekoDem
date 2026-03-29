import { db } from "../config/firebase";
import { collection, doc, writeBatch, serverTimestamp } from "firebase/firestore";

export const seedFirestore = async () => {
    const batch = writeBatch(db);

    // 1. Settings
    const settingsRef = doc(db, "settings", "global");
    batch.set(settingsRef, {
        title: "Sedat Demir Yapı",
        description: "Profesyonel İnşaat ve Mimarlık Çözümleri",
        email: "info@sedatdemiryapi.com",
        phone: "+90 555 123 45 67",
        address: "Çankaya, Ankara",
        social: {
            facebook: "https://facebook.com",
            instagram: "https://instagram.com",
        },
        color: "#1976d2", // Default Primary Blue
    });

    // 2. Categories
    const categories = [
        {
            name: "Konut Projeleri",
            slug: "konut-projeleri",
            description: "Modern ve güvenli yaşam alanları inşa ediyoruz.",
            coverImageUrl: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&q=80&w=800",
            priority: 1,
            isActive: true,
        },
        {
            name: "Ticari Yapılar",
            slug: "ticari-yapilar",
            description: "İş dünyası için fonksiyonel ve estetik ofisler.",
            coverImageUrl: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=800",
            priority: 2,
            isActive: true,
        },
        {
            name: "Restorasyon",
            slug: "restorasyon",
            description: "Tarihi dokuyu koruyarak geleceğe taşıyoruz.",
            coverImageUrl: "https://images.unsplash.com/photo-1599619351208-3e6c839d6828?auto=format&fit=crop&q=80&w=800",
            priority: 3,
            isActive: true,
        }
    ];

    categories.forEach((cat) => {
        const ref = doc(collection(db, "categories"));
        batch.set(ref, { ...cat, createdAt: serverTimestamp() });
    });

    // 3. Branches
    const branches = [
        {
            name: "Merkez Ofis",
            address: "Çankaya Mah. Atatürk Bulvarı No:1, Ankara",
            phone: "+90 312 123 45 67",
            email: "ankara@sedatdemiryapi.com",
            location: { lat: 39.9334, lng: 32.8597 },
            isActive: true,
        },
        {
            name: "İstanbul Şube",
            address: "Levent Mah. Büyükdere Cad. No:5, İstanbul",
            phone: "+90 212 987 65 43",
            email: "istanbul@sedatdemiryapi.com",
            location: { lat: 41.0082, lng: 28.9784 },
            isActive: true,
        }
    ];

    branches.forEach((branch) => {
        const ref = doc(collection(db, "branches"));
        batch.set(ref, { ...branch, createdAt: serverTimestamp() });
    });

    // 4. Campaigns
    const campaigns = [
        {
            title: "Yaz Kampanyası",
            description: "Tüm tadilat işlerinde %20 indirim fırsatı!",
            bannerImageUrl: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&q=80&w=800",
            isActive: true,
            priority: 1,
            startDate: serverTimestamp(),
        }
    ];

    campaigns.forEach((camp) => {
        const ref = doc(collection(db, "campaigns"));
        batch.set(ref, { ...camp, createdAt: serverTimestamp() });
    });

    await batch.commit();
    console.log("Seeding completed successfully!");
};
