import "../css/main.css";
export default function FeatureItem({image, header, text}) {
  return (
    <div className="feature-item">
      <img src={image} alt={image} className="feature-icon" />
      <h3 className="feature-item-title">{header}</h3>
      <p>{text}</p>
    </div>
  );
}
