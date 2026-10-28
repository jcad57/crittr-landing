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
          More
          <br />
          good
          <br />
          days
          <br />
          together
          <Heart />
        </div>
        <div className="download-copy">
          <h2 className="section-title" id="download-title">
            A little less to remember.
            <br />A lot more to <span className="underlined">love.</span>
          </h2>
          <p>
            Get Crittr and make pet care simple, organized,
            <br className="download-break" /> and a little more joyful — every
            day.
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
