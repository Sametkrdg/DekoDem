import React from "react";
import { Container, Typography, Box, Divider, Paper } from "@mui/material";
import { Security } from "@mui/icons-material";

const Section = ({ title, children }) => (
  <Box sx={{ mb: 4 }}>
    <Typography variant="h6" sx={{ fontWeight: 700, mb: 1.5, color: "primary.main" }}>
      {title}
    </Typography>
    {children}
  </Box>
);

const PrivacyPolicy = () => {
  return (
    <Container maxWidth="md" sx={{ py: { xs: 6, md: 10 } }}>
      {/* Başlık */}
      <Box sx={{ textAlign: "center", mb: 6 }}>
        <Security sx={{ fontSize: 56, color: "primary.main", mb: 2 }} />
        <Typography variant="h3" component="h1" sx={{ fontWeight: 800, mb: 2 }}>
          Gizlilik Politikası
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Son güncelleme: {new Date().toLocaleDateString("tr-TR", { year: "numeric", month: "long", day: "numeric" })}
        </Typography>
      </Box>

      <Paper elevation={0} sx={{ border: "1px solid", borderColor: "divider", borderRadius: 3, p: { xs: 3, md: 5 } }}>

        <Section title="1. Veri Sorumlusu">
          <Typography variant="body1" color="text.secondary" sx={{ lineHeight: 1.8 }}>
            6698 sayılı Kişisel Verilerin Korunması Kanunu ("KVKK") kapsamında veri sorumlusu sıfatını
            taşıyan <strong>DEKODEM</strong>, kişisel verilerinizi bu politikada açıklanan
            amaçlar ve yöntemlerle işlemektedir. Şirket adresimiz: Alikahya Merkez Mah. Sakıp Sabancı Bulv.
            No: 26/A, İzmit / Kocaeli.
          </Typography>
        </Section>

        <Divider sx={{ my: 3 }} />

        <Section title="2. Toplanan Kişisel Veriler">
          <Typography variant="body1" color="text.secondary" sx={{ lineHeight: 1.8, mb: 2 }}>
            Web sitemizi kullandığınızda aşağıdaki kişisel veriler toplanabilir:
          </Typography>
          <Box component="ul" sx={{ pl: 3, color: "text.secondary" }}>
            {[
              "Ad ve soyad (iletişim formu aracılığıyla)",
              "E-posta adresi (iletişim formu aracılığıyla)",
              "Telefon numarası (iletişim formu aracılığıyla, isteğe bağlı)",
              "Mesaj içeriği (iletişim formu aracılığıyla)",
              "IP adresi ve tarayıcı bilgileri (otomatik olarak, analitik amaçlı)",
              "Çerez verileri (aşağıdaki Çerez Politikası bölümüne bakınız)",
            ].map((item) => (
              <Typography component="li" variant="body1" key={item} sx={{ mb: 1, lineHeight: 1.8 }}>
                {item}
              </Typography>
            ))}
          </Box>
        </Section>

        <Divider sx={{ my: 3 }} />

        <Section title="3. Kişisel Verilerin İşlenme Amaçları">
          <Typography variant="body1" color="text.secondary" sx={{ lineHeight: 1.8, mb: 2 }}>
            Kişisel verileriniz aşağıdaki amaçlarla işlenmektedir:
          </Typography>
          <Box component="ul" sx={{ pl: 3, color: "text.secondary" }}>
            {[
              "İletişim taleplerinizi yanıtlamak ve size geri dönüş sağlamak",
              "Proje teklifi ve danışmanlık hizmetlerini sunmak",
              "Web sitesinin kullanımını analiz etmek ve iyileştirmek",
              "Yasal yükümlülüklerin yerine getirilmesi",
              "Güvenlik ve dolandırıcılık önleme",
            ].map((item) => (
              <Typography component="li" variant="body1" key={item} sx={{ mb: 1, lineHeight: 1.8 }}>
                {item}
              </Typography>
            ))}
          </Box>
        </Section>

        <Divider sx={{ my: 3 }} />

        <Section title="4. Hukuki Dayanak">
          <Typography variant="body1" color="text.secondary" sx={{ lineHeight: 1.8 }}>
            Kişisel verileriniz KVKK'nın 5. maddesi kapsamında; sözleşmenin kurulması veya ifası için
            gerekli olması, veri sorumlusunun meşru menfaatleri ve açık rızanız hukuki
            sebeplerine dayanılarak işlenmektedir.
          </Typography>
        </Section>

        <Divider sx={{ my: 3 }} />

        <Section title="5. Kişisel Verilerin Aktarılması">
          <Typography variant="body1" color="text.secondary" sx={{ lineHeight: 1.8 }}>
            Kişisel verileriniz; iletişim e-postalarının iletilmesi amacıyla <strong>EmailJS</strong>
            (e-posta altyapısı), web sitesi altyapısının yönetimi amacıyla <strong>Google Firebase</strong>
            (veritabanı ve depolama) ile paylaşılmaktadır. Bu hizmet sağlayıcıların kişisel verilerinizi
            kendi gizlilik politikaları çerçevesinde işlediğini belirtmek isteriz.
            Verileriniz, bu amaçlar dışında üçüncü kişilerle paylaşılmamaktadır.
          </Typography>
        </Section>

        <Divider sx={{ my: 3 }} />

        <Section title="6. Veri Saklama Süresi">
          <Typography variant="body1" color="text.secondary" sx={{ lineHeight: 1.8 }}>
            İletişim formu aracılığıyla iletilen veriler, talebinizin karşılanmasından itibaren
            en fazla <strong>2 yıl</strong> süreyle saklanmaktadır. Analitik amaçlı veriler ise
            en fazla <strong>26 ay</strong> süreyle tutulmaktadır. Yasal yükümlülükler gerektirdiğinde
            veriler ilgili mevzuatta öngörülen süreler boyunca saklanabilir.
          </Typography>
        </Section>

        <Divider sx={{ my: 3 }} />

        <Section title="7. Çerez (Cookie) Politikası">
          <Typography variant="body1" color="text.secondary" sx={{ lineHeight: 1.8, mb: 2 }}>
            Web sitemizde aşağıdaki çerez türleri kullanılmaktadır:
          </Typography>
          <Box component="ul" sx={{ pl: 3, color: "text.secondary" }}>
            <Typography component="li" variant="body1" sx={{ mb: 1.5, lineHeight: 1.8 }}>
              <strong>Zorunlu Çerezler:</strong> Web sitesinin temel işlevlerini yerine getirebilmesi
              için gerekli olan çerezlerdir. Bu çerezler olmadan site düzgün çalışamaz.
            </Typography>
            <Typography component="li" variant="body1" sx={{ mb: 1.5, lineHeight: 1.8 }}>
              <strong>Analitik Çerezler:</strong> Siteyi nasıl kullandığınızı anlamamıza yardımcı olan
              Google Analytics çerezleridir. Bu çerezler, tercihlerinize göre kabul veya reddedilebilir.
            </Typography>
            <Typography component="li" variant="body1" sx={{ mb: 1.5, lineHeight: 1.8 }}>
              <strong>Tercih Çerezleri:</strong> Kullanıcı deneyimini kişiselleştirmek amacıyla
              tercihlerinizi (örn. çerez onayı durumunuz) hatırlayan çerezlerdir.
            </Typography>
          </Box>
          <Typography variant="body1" color="text.secondary" sx={{ lineHeight: 1.8, mt: 1 }}>
            Çerez tercihlerinizi tarayıcı ayarlarınızdan değiştirebilir veya sitemizin
            alt kısmındaki çerez ayar panelini kullanabilirsiniz.
          </Typography>
        </Section>

        <Divider sx={{ my: 3 }} />

        <Section title="8. KVKK Kapsamındaki Haklarınız">
          <Typography variant="body1" color="text.secondary" sx={{ lineHeight: 1.8, mb: 2 }}>
            KVKK'nın 11. maddesi uyarınca aşağıdaki haklara sahipsiniz:
          </Typography>
          <Box component="ul" sx={{ pl: 3, color: "text.secondary" }}>
            {[
              "Kişisel verilerinizin işlenip işlenmediğini öğrenme",
              "İşlenmişse buna ilişkin bilgi talep etme",
              "İşlenme amacını ve amacına uygun kullanılıp kullanılmadığını öğrenme",
              "Yurt içinde veya yurt dışında aktarıldığı üçüncü kişileri bilme",
              "Eksik veya yanlış işlenmiş olması hâlinde bunların düzeltilmesini isteme",
              "KVKK'nın 7. maddesinde öngörülen şartlar çerçevesinde silinmesini veya yok edilmesini isteme",
              "İşlenen verilerin münhasıran otomatik sistemler vasıtasıyla analiz edilmesi suretiyle aleyhinize bir sonucun ortaya çıkmasına itiraz etme",
              "Kanuna aykırı olarak işlenmesi sebebiyle zarara uğramanız hâlinde zararın giderilmesini talep etme",
            ].map((item) => (
              <Typography component="li" variant="body1" key={item} sx={{ mb: 1, lineHeight: 1.8 }}>
                {item}
              </Typography>
            ))}
          </Box>
          <Typography variant="body1" color="text.secondary" sx={{ lineHeight: 1.8, mt: 2 }}>
            Bu haklarınızı kullanmak için <strong>dekodemyapı@gmail.com</strong> adresine
            e-posta göndererek veya şirket adresimize yazılı olarak başvurabilirsiniz.
            Talebiniz en geç 30 gün içinde yanıtlanacaktır.
          </Typography>
        </Section>

        <Divider sx={{ my: 3 }} />

        <Section title="9. Güvenlik">
          <Typography variant="body1" color="text.secondary" sx={{ lineHeight: 1.8 }}>
            Kişisel verilerinizin güvenliğini sağlamak amacıyla teknik ve idari güvenlik
            tedbirleri uygulanmaktadır. Veriler şifreli bağlantılar (HTTPS/TLS) üzerinden
            iletilmekte ve güvenli bulut altyapısında saklanmaktadır. Bununla birlikte,
            internet üzerinden veri iletiminin tamamen güvenli olmadığını hatırlatmak isteriz.
          </Typography>
        </Section>

        <Divider sx={{ my: 3 }} />

        <Section title="10. Politika Değişiklikleri">
          <Typography variant="body1" color="text.secondary" sx={{ lineHeight: 1.8 }}>
            Bu gizlilik politikasını zaman zaman güncelleyebiliriz. Önemli değişiklikler
            yapıldığında web sitemizde duyuru yayınlanacaktır. Politikayı düzenli olarak
            incelemenizi öneririz.
          </Typography>
        </Section>

        <Divider sx={{ my: 3 }} />

        <Section title="11. İletişim">
          <Typography variant="body1" color="text.secondary" sx={{ lineHeight: 1.8 }}>
            Bu politikayla ilgili sorularınız için:<br />
            <strong>E-posta:</strong> dekodemyapı@gmail.com<br />
            <strong>Adres:</strong> Alikahya Merkez Mah. Sakıp Sabancı Bulv. No: 26/A, İzmit / Kocaeli<br />
            <strong>Telefon:</strong> +90 537 466 71 72
          </Typography>
        </Section>

      </Paper>
    </Container>
  );
};

export default PrivacyPolicy;
