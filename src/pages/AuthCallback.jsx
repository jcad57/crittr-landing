import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { PawPrint } from "lucide-react";
import {
  clearRememberedChoice,
  choiceQuery,
  readSignupChoice,
  rememberedChoice,
  signupHref,
} from "../lib/signupIntent";
import {
  authMessage,
  exchangeOAuthCode,
  saveAccountChoice,
} from "../services/webAuth";

const completions = new Map();
function completeCallback(code, choice) {
  if (!completions.has(code))
    completions.set(
      code,
      exchangeOAuthCode(code).then(() => saveAccountChoice(choice)),
    );
  return completions.get(code);
}

export default function AuthCallback() {
  const { search, hash } = useLocation();
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const params = new URLSearchParams(search);
  const choice = params.has("plan")
    ? readSignupChoice(search)
    : rememberedChoice();
  useEffect(() => {
    document.title = "Finishing your signup — Crittr";
    let active = true;
    const query = new URLSearchParams(search);
    const fragment = new URLSearchParams(hash.slice(1));
    const code = query.get("code");
    const providerError =
      query.get("error_description") || fragment.get("error_description");
    const selected = query.has("plan")
      ? readSignupChoice(search)
      : rememberedChoice();
    if (providerError || !code) {
      // A cancelled provider flow must never be mistaken for a completed signup.
      queueMicrotask(() => {
        if (active)
          setError(
            providerError ||
              "This sign-in link is missing or has expired. Please start again.",
          );
      });
    } else {
      completeCallback(code, selected)
        .then(() => {
          if (!active) return;
          clearRememberedChoice();
          navigate(`/get-app?${choiceQuery(selected)}`, { replace: true });
        })
        .catch((err) => {
          if (active) setError(authMessage(err));
        });
    }
    return () => {
      active = false;
    };
  }, [search, hash, navigate]);
  return (
    <main className="auth-callback" id="main-content">
      <section className="signup-card">
        <PawPrint size={36} aria-hidden="true" />
        <h1>
          {error ? "Let’s try that again" : "Making room for more good days…"}
        </h1>
        {error ? (
          <>
            <p role="alert" className="auth-alert">
              {error}
            </p>
            <Link
              className="btn-primary"
              to={signupHref(choice.plan, choice.billing)}
            >
              Back to signup
            </Link>
          </>
        ) : (
          <>
            <span className="auth-spinner" />
            <p role="status">
              Finishing your sign-in. This will only take a moment.
            </p>
          </>
        )}
      </section>
    </main>
  );
}
