import cat from "../assets/images/playful-tabby.webp";
import { Burst, Heart } from "./Doodles";
import StoreBadges from "./StoreBadges";
import "./Download.css";
export default function Download() {
  return (
    <section
      className="download"
      id="download"
      aria-labelledby="download-title"
    >
      <div className="download-inner">
        <div className="handwritten download-note" aria-hidden="true">
          Crittr
          <br />
          makes
          <br />
          it
          <br />
          easy
          <Heart />
        </div>
        <div className="download-copy">
          <h2 className="section-title" id="download-title">
            Free some space in your head &
            <br />download Crittr <span className="underlined">today.</span>
          </h2>
          <p>
            It's quick and easy to get started.
            <br className="download-break" /> Start for free and upgrade when you're ready.
          </p>
          <StoreBadges />
        </div>
        <div className="download-art">
          <img
            className="download-cat"
            src={cat}
            alt="A playful tabby cat rolling over with its paws in the air"
            width="1200"
            height="900"
            loading="lazy"
          />
          <Burst className="download-burst" />
          <Heart className="download-heart" />
        </div>
      </div>
    </section>
  );
}
