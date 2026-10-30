import { Link } from "react-router-dom";
import brandAnimals from "../assets/images/brand-animals.png";
export default function Brand({ onClick }) {
  return (
    <Link to="/" className="brand" aria-label="Crittr home" onClick={onClick}>
      Crittr
      <img
        className="brand-mark"
        src={brandAnimals}
        width="35"
        height="35"
        alt=""
        aria-hidden="true"
      />
    </Link>
  );
}
