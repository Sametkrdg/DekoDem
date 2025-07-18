import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav style={{ padding: '10px', backgroundColor: '#eee' }}>
      <Link to="/" style={{ marginRight: '10px' }}>Anasayfa</Link>
      <Link to="/hakkimizda" style={{ marginRight: '10px' }}>Hakkımızda</Link>
      <Link to="/projeler" style={{ marginRight: '10px' }}>Projeler</Link>
      <Link to="/iletisim">İletişim</Link>
    </nav>
  );
}

export default Navbar;
