import { PawPrint } from "lucide-react";
import { Link } from "react-router-dom";
export default function Brand({ onClick }) {
  return (
    <Link to="/" className="brand" aria-label="Crittr home" onClick={onClick}>
      Crittr
      <PawPrint className="brand-paw" aria-hidden="true" />
    </Link>
  );
}
