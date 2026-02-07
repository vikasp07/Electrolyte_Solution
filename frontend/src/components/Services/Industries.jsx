import "./Industries.css";

export default function Industries() {
  return (
    <section className="industries-section">
      <h2 className="industries-title">Industries We Serve</h2>
      <p className="industries-subtitle">
        Trusted by leading OEMs across diverse electronics sectors
      </p>

      <div className="industries-grid">
        <div className="industry-card">Consumer Electronics OEMs</div>
        <div className="industry-card">Home Appliance Manufacturers</div>
        <div className="industry-card">LED Display & Power Electronics</div>
        <div className="industry-card">IoT & Smart Device Brands</div>

        <div className="industry-card">Authorized Service Networks</div>
        <div className="industry-card">Fan & Motor Control Systems</div>
        <div className="industry-card">Cooktop & Kitchen Appliances</div>
        <div className="industry-card">Industrial Electronics</div>
      </div>
    </section>
  );
}