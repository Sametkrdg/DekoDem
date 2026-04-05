/**
 * navigation.js — Centralized route paths & navigation data.
 *
 * ▸ PATHS         — Every URL in one place. Never write a raw "/..." literal anywhere else.
 * ▸ NAV_ITEMS     — Main menu entries rendered by Navbar.
 * ▸ FOOTER_QUICK_LINKS — Secondary links rendered in the Footer "Kurumsal" column.
 * ▸ activityPath()— Helper to build a detail-page URL for any activity slug.
 */

// ── Route constants ───────────────────────────────────────────────────────────
export const PATHS = {
  HOME:       '/',
  ABOUT:      '/hakkimizda',
  CONTACT:    '/iletisim',
  PROJECTS:   '/projeler',
  ACTIVITIES: '/faaliyet-alanlari',
  BRANCHES:   '/subeler',
  BLOG:       '/haberler',
  FAQ:        '/sss',
  CAREER:     '/kariyer',
  PRIVACY:    '/gizlilik-politikasi',
  TERMS:      '/kullanim-kosullari',
  ADMIN:      '/admin',
  LOGIN:      '/login',
};

/**
 * Builds the detail-page URL for a given activity slug.
 * @example activityPath('celik-konstruksiyon') → '/faaliyet-alanlari/celik-konstruksiyon'
 */
export const activityPath = (slug) => `${PATHS.ACTIVITIES}/${slug}`;

// ── Main navigation items (Navbar) ────────────────────────────────────────────
/**
 * exact: true  → item is active only when pathname === path  (home page)
 * exact: false → item is active when pathname === path OR pathname.startsWith(path + '/')
 *                (handles nested routes like /faaliyet-alanlari/:slug)
 */
export const NAV_ITEMS = [
  { label: 'Anasayfa',          path: PATHS.HOME,       exact: true  },
  { label: 'Hakkımızda',        path: PATHS.ABOUT,      exact: false },
  { label: 'Faaliyet Alanları', path: PATHS.ACTIVITIES, exact: false },
  { label: 'Projeler',          path: PATHS.PROJECTS,   exact: false },
  { label: 'Haberler',          path: PATHS.BLOG,       exact: false },
  { label: 'Kariyer',           path: PATHS.CAREER,     exact: false },
  { label: 'İletişim',          path: PATHS.CONTACT,    exact: false },
];

// ── Footer quick links ("Kurumsal" column) ────────────────────────────────────
export const FOOTER_QUICK_LINKS = [
  { label: 'Hakkımızda', path: PATHS.ABOUT    },
  { label: 'Projeler',   path: PATHS.PROJECTS },
  { label: 'Haberler',   path: PATHS.BLOG     },
  { label: 'Kariyer',    path: PATHS.CAREER   },
  { label: 'SSS',        path: PATHS.FAQ      },
  { label: 'İletişim',   path: PATHS.CONTACT  },
];
