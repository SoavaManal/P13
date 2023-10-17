export default function wrapper({ header, firsttext, secondetext, button }) {
  return (
    <section className="account">
      <div className="account-content-wrapper">
        <h3 className="account-title">{header}</h3>
        <p className="account-amount">{firsttext}</p>
        <p className="account-amount-description">{secondetext}</p>
      </div>
      <div className="account-content-wrapper cta">
        <button className="transaction-button">{button}</button>
      </div>
    </section>
  );
}
