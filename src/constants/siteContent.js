/**
 * siteContent.js — DEKODEM Global Content Constants
 *
 * Single source of truth for all brand strings, contact details,
 * activity fields, and reference data. Import what you need;
 * do NOT hardcode these strings anywhere else in the codebase.
 */

// ── Corporate Identity ────────────────────────────────────────────────────
export const brand = {
  name:    'DEKODEM',
  tagline: 'Yapı & Dekorasyon | İç Mimarlık',
  logoSrc: '/assets/logo.png',
  logoAlt: 'DEKODEM Logo',
};

// ── Contact Info ──────────────────────────────────────────────────────────
export const contact = {
  address:     'Alikahya Merkez Mah. Sakıp Sabancı Bulv. No: 26/A, İzmit / Kocaeli',
  phone1:      '+90 537 466 71 72',
  email:       'dekodemyapi@gmail.com',
  instagramUrl:'https://www.instagram.com/dekodem.com.tr/',
  mapsUrl:     'https://maps.app.goo.gl/1gcVpx786BypBLcW7',
  // Formatted hrefs
  get phone1Href() { return `tel:${this.phone1.replace(/\s/g, '')}`; },
  get emailHref() { return `mailto:${this.email}`; },
};

// ── About Us ──────────────────────────────────────────────────────────────
export const about = {
  fullText:
    "DEKODEM, Kocaeli / İzmit merkezli olarak faaliyet gösteren, dekorasyon ve anahtar teslim projelerde uzmanlaşmış bir uygulama firmasıdır. Alikahya Merkez Mahallesi'nde bulunan firmamız; fabrika, ofis, depo ve tüm ticari alanlarda A'dan Z'ye tüm uygulama süreçlerini profesyonel bir yaklaşımla yönetmektedir. Alanında uzman profesyonel ekibimiz ile projelerinizde yalnızca uygulama değil; aynı zamanda tasarım, planlama ve mühendislik süreçlerinin tamamını üstlenerek uçtan uca anahtar teslim çözümler sunmaktayız. Kaliteli işçilik, zamanında teslim ve müşteri memnuniyetini esas alan çalışma prensibimiz ile işletmelere değer katıyor, projelerinizi güvenle hayata geçiriyoruz.",

  // 2-sentence professional footer summary
  shortSummary:
    "DEKODEM, fabrika, ofis ve ticari alanlarda anahtar teslim dekorasyon ve uygulama hizmetleri sunan, Kocaeli / İzmit merkezli uzman bir firmadır. Tasarımdan teslimata kadar tüm süreçleri profesyonel ekibimizle güvenle yönetiyoruz.",

  // Key differentiators shown as feature bullets on the homepage
  highlights: [
    'Anahtar teslim proje yönetimi',
    'Fabrika, ofis ve ticari alan uzmanlığı',
    'Zamanında teslim ve şeffaf iletişim',
    'Kaliteli malzeme ve işçilik garantisi',
  ],

  // Company metrics shown in the About hero stats row
  stats: [
    { number: '10+',  label: 'Yıl Deneyim'         },
    { number: '200+', label: 'Tamamlanan Proje'     },
    { number: '50+',  label: 'Mutlu Müşteri'        },
    { number: '30+',  label: 'Uzman Ekip Üyesi'     },
  ],
};

// ── References ────────────────────────────────────────────────────────────
// Each entry: { name, description } — description is the project scope from brochure
export const references = [
  { name: 'Algida',              description: 'Anahtar teslim proje uygulamaları' },
  { name: 'Yurtiçi Kargo',      description: 'Alçıpan tavan ve bölme sistemleri, tamirat ve tadilat' },
  { name: 'Magna',               description: 'Epoksi zemin kaplama, boya ve tadilat işleri' },
  { name: 'Hyundai',             description: 'Boya ve tadilat işleri' },
  { name: 'Sadık Enerji',        description: 'Anahtar teslim proje uygulamaları' },
  { name: 'fikiraktif',          description: 'Boya ve tadilat işleri' },
  { name: 'Yağızlar Yapı Market', description: 'Boya ve tadilat işleri' },
];

// ── Activity Fields ───────────────────────────────────────────────────────
export const activityFields = [
  {
    id: 'ic-mimarlik',
    title: 'İç Mimarlık ve Tasarım',
    slug: 'ic-mimarlik-ve-tasarim',
    description:
      'Mekan planlamasından uygulama aşamasına kadar her adımda estetik ve işlevselliği bir arada sunuyoruz. ' +
      'Ofis, üretim ve sosyal alanlar için 3D tasarımdan anahtar teslime kadar eksiksiz iç mimarlık çözümleri sağlıyoruz.',
    subServices: [
      '3D Tasarım ve Projelendirme',
      'İç Mekân Planlama ve Uygulama',
      'Ofis ve Sosyal Alan Tasarımı',
      'Yönetim Alanları ve Toplantı Odası Dekorasyonu',
    ],
  },
  {
    id: 'duvar-bolme',
    title: 'Duvar, Bölme ve Sıva İşleri',
    slug: 'duvar-bolme-ve-siva',
    description:
      'Alçıpan, sandviç panel ve gaz beton sistemleriyle mekanlarınızı ihtiyacınıza göre bölümlendiriyoruz. ' +
      'Yangına dayanıklı ve akustik çözümler dahil tüm duvar sistemlerini profesyonel ekibimizle uyguluyoruz.',
    subServices: [
      'Alçıpan Bölme Duvar Sistemleri',
      'Sandviç Panel Bölme Duvar Uygulamaları',
      'Gaz Beton / Tuğla Duvar Örme',
      'Alçı Sıva Uygulamaları',
      'Duvar Tadilat ve Onarım İşleri',
      'Yangına Dayanımlı Duvar Sistemleri',
      'Ofis ve Üretim Alanı Bölme Uygulamaları',
    ],
  },
  {
    id: 'tavan',
    title: 'Tavan Sistemleri',
    slug: 'tavan-sistemleri',
    description:
      'Asma tavan, akustik ve açık tavan uygulamalarıyla mekanlarınıza işlevsel ve estetik bir çözüm sunuyoruz. ' +
      'Yangın güvenliği ve aydınlatma entegrasyonu dahil kapsamlı tavan sistemleri kuruyoruz.',
    subServices: [
      'Asma Tavan Sistemleri (Taş Yünü, Alçıpan, Metal)',
      'Akustik Tavan Uygulamaları',
      'Açık Tavan Düzenleme',
      'Yangına Dayanımlı Tavan Sistemleri',
      'Aydınlatma Entegre Tavan Sistemleri',
    ],
  },
  {
    id: 'boya-badana',
    title: 'Boya, Badana ve Yüzey Uygulamaları',
    slug: 'boya-badana-ve-yuzey',
    description:
      'İç ve dış cephe boyalarından endüstriyel epoksi uygulamalarına kadar tüm yüzey kaplama işlerini gerçekleştiriyoruz. ' +
      'Yangın geciktirici boyalar dahil geniş ürün yelpazemizle mekânlarınıza uzun ömürlü koruma sağlıyoruz.',
    subServices: [
      'İç Cephe Boya İşleri',
      'Dış Cephe Boya İşleri',
      'Endüstriyel Boya Uygulamaları',
      'Epoksi Boya Uygulamaları',
      'Yangın Geciktirici Boya Uygulamaları',
      'Tadilat ve Bakım Boya İşleri',
    ],
  },
  {
    id: 'kapi-gecis',
    title: 'Kapı ve Geçiş Sistemleri',
    slug: 'kapi-ve-gecis-sistemleri',
    description:
      'Çelik, yangın ve seksiyonel kapılardan otomatik sistemlere kadar her türlü geçiş çözümünü temin ve monte ediyoruz. ' +
      'PVC ve alüminyum doğrama işleriyle binanızın güvenliğini ve estetiğini artırıyoruz.',
    subServices: [
      'Çelik Kapı Montajı',
      'Yangın Kapısı Montajı',
      'Seksiyonel Kapı Sistemleri',
      'Otomatik Kapı Sistemleri',
      'PVC ve Alüminyum Doğrama İşleri',
    ],
  },
  {
    id: 'mobilya-uretim',
    title: 'Mobilya, Üretim ve Donanım',
    slug: 'mobilya-uretim-ve-donanim',
    description:
      'Üretim alanlarına özel mezzanine katlar, platform ve raf sistemleriyle depolama kapasitesini en üst düzeye çıkarıyoruz. ' +
      'Özel tasarım mobilya imalatı ve donanım entegrasyonu ile çalışma alanlarınızı optimize ediyoruz.',
    subServices: [
      'Özel Tasarım Mobilya İmalatı',
      'Kapı ve Pencere Sistemleri',
      'Çelik Platform ve Raf Sistemleri',
      'Mezzanine Kat Uygulamaları',
      'Depo ve Üretim Alanı Mobilya Entegrasyonu',
      'Bakım ve Servis Platformları',
      'Tadilat Sonrası Mobilya ve Donanım Güncellemeleri',
    ],
  },
  {
    id: 'peyzaj',
    title: 'Peyzaj, Bahçe ve Çevre Düzenleme',
    slug: 'peyzaj-bahce-ve-cevre',
    description:
      'Fabrika ve ofis dış alanlarını fonksiyonel ve görsel açıdan değerli hale getiriyoruz. ' +
      'Çimlendirmeden otopark düzenlemesine, drenaj sistemlerinden bordür uygulamalarına kadar kapsamlı çevre düzenlemesi yapıyoruz.',
    subServices: [
      'Bahçe ve Sosyal Alan Düzenleme',
      'Çimlendirme ve Bitki Düzenlemeleri',
      'Yürüyüş Yolları ve Bordür Uygulamaları',
      'Otopark ve Saha Çevre Düzenlemesi',
      'Drenaj ve Yağmur Suyu Yönetimi',
      'Dış Cephe Dekoratif Düzenlemeler',
    ],
  },
  {
    id: 'altyapi',
    title: 'Altyapı ve Teknik İşler',
    slug: 'altyapi-ve-teknik',
    description:
      'Elektrik, su, doğalgaz ve zayıf akım sistemlerini projeye özel planlama ile kuruyoruz. ' +
      'Kamera, internet ve yangın alarm altyapılarını entegre ederek güvenli ve verimli tesisler inşa ediyoruz.',
    subServices: [
      'Elektrik Tesisatı',
      'Zayıf Akım Sistemleri (Kamera, İnternet, Yangın Alarmı)',
      'Su Tesisatı',
      'Doğalgaz Tesisatı',
      'Havalandırma ve Aspirasyon Altyapısı',
    ],
  },
  {
    id: 'celik-konstruksiyon',
    title: 'Çelik Konstrüksiyon ve Endüstriyel Yapı İşleri',
    slug: 'celik-konstruksiyon',
    description:
      'Fabrika platformlarından mezzanine katlara, çelik çatılardan merdiven ve korkuluklara kadar tüm yapı işlerini projeden üretime kadar yönetiyoruz. ' +
      'Yüksek dayanımlı çelik konstrüksiyon çözümleriyle endüstriyel altyapınızı güçlendiriyoruz.',
    subServices: [
      'Çelik Konstrüksiyon İmalat ve Montaj',
      'Fabrika Çelik Platform ve Yürüyüş Yolları',
      'Çelik Çatı Sistemleri',
      'Sundurma ve Kanopi Yapımı',
      'Makine Platformları ve Bakım Platformları',
      'Depo Raf ve Mezzanine Kat Sistemleri',
      'Çelik Merdiven ve Korkuluk İmalatı',
    ],
  },
  {
    id: 'mekanik-yangin',
    title: 'Mekanik Tesisat ve Yangın Sistemleri',
    slug: 'mekanik-tesisat-ve-yangin',
    description:
      'Sprinkler, yangın dolabı ve yangın algılama sistemlerinin tasarım ve kurulumunu standartlara uygun olarak gerçekleştiriyoruz. ' +
      'Duman tahliye ve acil çıkış sistemleriyle tesislerinizin can ve mal güvenliğini sağlıyoruz.',
    subServices: [
      'Yangın Tesisatı Kurulumu',
      'Yangın Dolabı Ve Hidrant Montajı',
      'Yangın Algılama Ve Alarm Sistemleri',
      'Duman Tahliye Sistemleri',
      'Basınçlandırma Sistemleri',
      'Acil Çıkış Yönlendirme Sistemleri',
    ],
  },
  {
    id: 'saha-betonlari',
    title: 'Saha Betonları ve Çevre Düzenleme İşleri',
    slug: 'saha-betonlari-ve-cevre',
    description:
      'Forklift ve ağır taşıt trafiğine dayanıklı endüstriyel beton zeminler ile yükleme rampası ve otopark alanları uyguluyoruz. ' +
      'Drenaj hatları ve çevre düzenleme çalışmalarıyla sahalarınızı uzun ömürlü hale getiriyoruz.',
    subServices: [
      'Saha Betonu Uygulamaları',
      'Endüstriyel Beton Zemin Uygulamaları',
      'Yükleme Rampası Betonları',
      'Forklift Ve Tır Trafiğine Uygun Saha Düzenlemesi',
      'Otopark Alanı Yapımı',
      'Bordür Ve Tretuvar Uygulamaları',
      'Yağmur Suyu Drenaj Hattı Yapımı',
      'Çevre Düzenleme Ve Peyzaj Uygulamaları',
    ],
  },
];

// ── Why DEKODEM ───────────────────────────────────────────────────────────
// Source: brochure page 12 "Neden DEKODEM?" section — 6 bullet points
export const whyUs = [
  'A\'dan Z\'ye Tüm Hizmetleri Tek Noktadan Sunma',
  'Her Alanda Uzman Profesyonel Ekip',
  'Zamanında Ve Eksiksiz Teslim',
  'Kaliteli Malzeme Ve İşçilik Garantisi',
  'İşletmelere Özel Çözüm Ve Planlama',
  'Uygun Maliyet – Yüksek Verimlilik',
];

// ── Work Process ──────────────────────────────────────────────────────────
// Source: brochure page 12 "Çalışma Sürecimiz" section — 5 sequential steps
export const workProcess = [
  { step: 1, label: 'Keşif Ve İhtiyaç Analizi'   },
  { step: 2, label: 'Projelendirme Ve Tasarım'    },
  { step: 3, label: 'Fiyatlandırma Ve Planlama'   },
  { step: 4, label: 'Uygulama Süreci'             },
  { step: 5, label: 'Teslim Ve Kontrol'           },
];
