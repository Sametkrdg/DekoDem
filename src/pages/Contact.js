function Contact() {
  return (
    <div style={{ padding: "20px" }}>
      <h2>İletişim</h2>
      <p>Telefon: 0532 123 45 67</p>
      <p>Adres: Bağcılar, İstanbul</p>
      <form style={{ marginTop: "20px" }}>
        <input type="text" placeholder="Adınız" style={{ display: "block", marginBottom: "10px" }} />
        <input type="email" placeholder="Email" style={{ display: "block", marginBottom: "10px" }} />
        <textarea placeholder="Mesajınız" style={{ display: "block", marginBottom: "10px" }}></textarea>
        <button type="submit">Gönder</button>
      </form>
    </div>
  );
}

export default Contact;
