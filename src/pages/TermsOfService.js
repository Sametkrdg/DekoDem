import React from "react";
import { Container, Typography, Box, Divider, Paper } from "@mui/material";
import { Gavel } from "@mui/icons-material";

const Section = ({ title, children }) => (
  <Box sx={{ mb: 4 }}>
    <Typography variant="h6" sx={{ fontWeight: 700, mb: 1.5, color: "primary.main" }}>
      {title}
    </Typography>
    {children}
  </Box>
);

const TermsOfService = () => {
  return (
    <Container maxWidth="md" sx={{ py: { xs: 6, md: 10 } }}>
      {/* Başlık */}
      <Box sx={{ textAlign: "center", mb: 6 }}>
        <Gavel sx={{ fontSize: 56, color: "primary.main", mb: 2 }} />
        <Typography variant="h3" component="h1" sx={{ fontWeight: 800, mb: 2 }}>
          Kullanım Koşulları
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Son güncelleme: {new Date().toLocaleDateString("tr-TR", { year: "numeric", month: "long", day: "numeric" })}
        </Typography>
      </Box>

      <Paper elevation={0} sx={{ border: "1px solid", borderColor: "divider", borderRadius: 3, p: { xs: 3, md: 5 } }}>

        <Section title="1. Genel Hükümler">
          <Typography variant="body1" color="text.secondary" sx={{ lineHeight: 1.8 }}>
            Bu web sitesini ("Site") kullanan tüm ziyaretçiler aşağıdaki kullanım koşullarını
            kabul etmiş sayılır. <strong>DEKODEM</strong> ("Şirket"), bu koşulları
            önceden haber vermeksizin değiştirme hakkını saklı tutar. Değişiklikler sitede
            yayımlandığı andan itibaren geçerli olur. Siteyi kullanmaya devam etmeniz,
            güncel koşulları kabul ettiğiniz anlamına gelir.
          </Typography>
        </Section>

        <Divider sx={{ my: 3 }} />

        <Section title="2. Sitenin Kullanımı">
          <Typography variant="body1" color="text.secondary" sx={{ lineHeight: 1.8, mb: 2 }}>
            Bu siteyi yalnızca yasal amaçlar doğrultusunda kullanabilirsiniz. Aşağıdaki
            eylemler kesinlikle yasaktır:
          </Typography>
          <Box component="ul" sx={{ pl: 3, color: "text.secondary" }}>
            {[
              "Siteyi veya site içeriklerini izinsiz kopyalamak, dağıtmak veya ticari amaçla kullanmak",
              "Siteye zarar verecek ya da normal çalışmasını engelleyecek her türlü eylemde bulunmak",
              "Kötü amaçlı yazılım, virüs veya zararlı kod iletmek",
              "Yanlış, yanıltıcı veya sahte bilgi göndermek",
              "Şirketin yazılı izni olmaksızın otomatik araçlarla site içeriğini toplamak",
            ].map((item) => (
              <Typography component="li" variant="body1" key={item} sx={{ mb: 1, lineHeight: 1.8 }}>
                {item}
              </Typography>
            ))}
          </Box>
        </Section>

        <Divider sx={{ my: 3 }} />

        <Section title="3. Fikri Mülkiyet Hakları">
          <Typography variant="body1" color="text.secondary" sx={{ lineHeight: 1.8 }}>
            Bu sitede yer alan tüm içerik; metinler, görseller, logolar, grafikler, tasarım
            unsurları ve yazılım <strong>DEKODEM</strong>'e aittir ve Türk Fikir ve
            Sanat Eserleri Kanunu ile uluslararası telif hakkı mevzuatı kapsamında korunmaktadır.
            İçeriklerin herhangi bir şekilde izinsiz kullanımı, kopyalanması veya dağıtılması
            yasal işlemlere konu olabilir.
          </Typography>
        </Section>

        <Divider sx={{ my: 3 }} />

        <Section title="4. İletişim Formu">
          <Typography variant="body1" color="text.secondary" sx={{ lineHeight: 1.8 }}>
            İletişim formu aracılığıyla iletilen mesajlar, yalnızca talep edilen hizmet
            kapsamında değerlendirmek amacıyla kullanılacaktır. Form aracılığıyla gönderilen
            bilgilerin doğruluğundan kullanıcı sorumludur. Şirket, form aracılığıyla yapılan
            her başvuruya yanıt verme yükümlülüğü taşımamaktadır.
          </Typography>
        </Section>

        <Divider sx={{ my: 3 }} />

        <Section title="5. Sorumluluk Reddi">
          <Typography variant="body1" color="text.secondary" sx={{ lineHeight: 1.8 }}>
            Site içerikleri bilgilendirme amaçlı olup bağlayıcı bir teklif veya sözleşme
            niteliği taşımaz. Şirket, sitedeki bilgilerin güncelliği ve doğruluğu konusunda
            azami özeni gösterse de hata veya eksiklikler için sorumluluk kabul etmemektedir.
            Proje teklifleri ve fiyatlandırmalar yalnızca yerinde inceleme ve yazılı mutabakat
            sonucunda kesinleşir.
          </Typography>
        </Section>

        <Divider sx={{ my: 3 }} />

        <Section title="6. Üçüncü Taraf Bağlantıları">
          <Typography variant="body1" color="text.secondary" sx={{ lineHeight: 1.8 }}>
            Sitemizde üçüncü taraf web sitelerine bağlantılar bulunabilir. Bu bağlantılar
            yalnızca kolaylık sağlamak amacıyla eklenmiş olup Şirket, söz konusu sitelerin
            içerikleri veya gizlilik uygulamaları hakkında herhangi bir sorumluluk
            üstlenmemektedir.
          </Typography>
        </Section>

        <Divider sx={{ my: 3 }} />

        <Section title="7. Hizmet Kesintileri">
          <Typography variant="body1" color="text.secondary" sx={{ lineHeight: 1.8 }}>
            Şirket, bakım, teknik sorunlar veya diğer nedenlerle siteye erişimi önceden
            haber vermeksizin geçici olarak kesme hakkını saklı tutar. Erişim kesintilerinden
            kaynaklanan zararlar için Şirket sorumlu tutulamaz.
          </Typography>
        </Section>

        <Divider sx={{ my: 3 }} />

        <Section title="8. Kişisel Verilerin Korunması">
          <Typography variant="body1" color="text.secondary" sx={{ lineHeight: 1.8 }}>
            Kişisel verilerinizin nasıl toplandığı, işlendiği ve korunduğuna ilişkin
            ayrıntılı bilgi için lütfen{" "}
            <Typography
              component="a"
              href="/gizlilik-politikasi"
              variant="body1"
              sx={{ color: "primary.main", textDecoration: "underline" }}
            >
              Gizlilik Politikamızı
            </Typography>{" "}
            inceleyiniz.
          </Typography>
        </Section>

        <Divider sx={{ my: 3 }} />

        <Section title="9. Uygulanacak Hukuk ve Yetki">
          <Typography variant="body1" color="text.secondary" sx={{ lineHeight: 1.8 }}>
            Bu koşullar Türk Hukuku'na tabidir. Bu koşullardan doğan uyuşmazlıklarda
            <strong>İzmit / Kocaeli</strong> mahkemeleri ve icra daireleri yetkilidir.
          </Typography>
        </Section>

        <Divider sx={{ my: 3 }} />

        <Section title="10. İletişim">
          <Typography variant="body1" color="text.secondary" sx={{ lineHeight: 1.8 }}>
            Bu kullanım koşullarına ilişkin sorularınız için:<br />
            <strong>E-posta:</strong> dekodemyapı@gmail.com<br />
            <strong>Adres:</strong> Alikahya Merkez Mah. Sakıp Sabancı Bulv. No: 26/A, İzmit / Kocaeli<br />
            <strong>Telefon:</strong> +90 537 466 71 72
          </Typography>
        </Section>

      </Paper>
    </Container>
  );
};

export default TermsOfService;
