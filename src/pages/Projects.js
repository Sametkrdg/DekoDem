function Projects() {
  const projeler = [
    { ad: "Modern Konutlar", yer: "İstanbul", yıl: 2023 },
    { ad: "Ofis Plaza", yer: "Ankara", yıl: 2022 },
    { ad: "Villa Serisi", yer: "İzmir", yıl: 2021 },
  ];

  return (
    <div style={{ padding: "20px" }}>
      <h2>Projelerimiz</h2>
      {projeler.map((proje, index) => (
        <div key={index} style={{ borderBottom: "1px solid #ccc", marginBottom: "10px" }}>
          <h3>{proje.ad}</h3>
          <p>{proje.yer} - {proje.yıl}</p>
        </div>
      ))}
    </div>
  );
}

export default Projects;
