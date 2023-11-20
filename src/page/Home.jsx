import "../css/main.css";
import iconChat from "../asset/icon-chat.png";
import iconMoney from "../asset/icon-money.png";
import iconSecurity from "../asset/icon-security.png";
import FeatureItem from "../composant/FeatureItem";
import Footer from "../composant/Footer";
import Header from "../composant/Header";
export default function Home() {
  return (
    <>
      <Header/>
      <main>
        <div className="hero">
          <section className="hero-content">
            <h2 className="sr-only">Promoted Content</h2>
            <p className="subtitle">No fees.</p>
            <p className="subtitle">No minimum deposit.</p>
            <p className="subtitle">High interest rates.</p>
            <p className="text">Open a savings account with Argent Bank today!</p>
          </section>
        </div>
        <section className="features">
          <h2 className="sr-only">Features</h2>
          <FeatureItem
            image={iconChat}
            header="You are our #1 priority"
            text="Need to talk to a representative? You can get in touch through our
              24/7 chat or through a phone call in less than 5 minutes."
          />
          <FeatureItem
            image={iconMoney}
            header="More savings means higher rates"
            text="The more you save with us, the higher your interest rate will be!"
          />
          <FeatureItem
            image={iconSecurity}
            header="Security you can trust"
            text="We use top of the line encryption to make sure your data and money
              is always safe."
          />
        </section>
      </main>
      <Footer/>
    </>
  );
}
