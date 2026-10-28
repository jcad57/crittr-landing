import { useEffect, useRef, useState } from "react";
import {
  Link,
  useLocation,
  useNavigate,
  useSearchParams,
} from "react-router-dom";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  Eye,
  EyeOff,
  LockKeyhole,
  Mail,
} from "lucide-react";
import { requireAuth, supabase } from "../lib/supabase";
import {
  choiceQuery,
  clearRememberedChoice,
  intentMetadata,
  readSignupChoice,
  rememberChoice,
} from "../lib/signupIntent";
import { authMessage, saveAccountChoice } from "../services/webAuth";
import pets from "../assets/images/hero-pets-rounded.webp";
import catIcon from "../assets/icons/cat-icon.png";
import dogIcon from "../assets/icons/dog-icon.png";
import fishIcon from "../assets/icons/fishbowl-icon.png";
import Brand from "../components/Brand";

function PasswordField({ value, onChange, newPassword = false }) {
  const [visible, setVisible] = useState(false);
  return (
    <label className="auth-field">
      Password
      <span className="auth-input-wrap">
        <LockKeyhole size={18} aria-hidden="true" />
        <input
          name="password"
          aria-label="Password"
          type={visible ? "text" : "password"}
          autoComplete={newPassword ? "new-password" : "current-password"}
          placeholder={
            newPassword ? "At least 6 characters" : "Enter your password"
          }
          minLength={newPassword ? 6 : undefined}
          maxLength={128}
          required
          value={value}
          onChange={onChange}
        />
        <button
          type="button"
          className="password-visibility"
          onClick={() => setVisible(!visible)}
          aria-label={visible ? "Hide password" : "Show password"}
        >
          {visible ? <EyeOff size={19} /> : <Eye size={19} />}
        </button>
      </span>
    </label>
  );
}

export default function Signup() {
  const [params] = useSearchParams();
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const choice = readSignupChoice(params);
  const pro = choice.plan === "pro";
  const switchPlanHref = `${pathname}?${choiceQuery({
    plan: pro ? "free" : "pro",
    billing: choice.billing,
  })}`;
  const [step, setStep] = useState(pathname === "/login" ? "signin" : "signup");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [agreed, setAgreed] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");
  const [code, setCode] = useState("");
  const [cooldown, setCooldown] = useState(0);
  const [existing, setExisting] = useState(null);
  const heading = useRef(null);

  useEffect(() => {
    document.title = "Join Crittr — More good days together";
    let active = true;
    supabase?.auth.getSession().then(({ data }) => {
      if (active && data.session) setExisting(data.session.user);
    });
    return () => {
      active = false;
    };
  }, []);
  useEffect(() => {
    if (!cooldown) return;
    const timer = setTimeout(() => setCooldown(cooldown - 1), 1000);
    return () => clearTimeout(timer);
  }, [cooldown]);

  function changeStep(next) {
    setStep(next);
    setError("");
    setNotice("");
    setCode("");
    setPassword("");
    requestAnimationFrame(() => heading.current?.focus());
  }
  async function finish() {
    // The account exists even if saving the preference fails. Let the user retry
    // that write without submitting an already-used verification code again.
    setStep("ready");
    await saveAccountChoice(choice);
    clearRememberedChoice();
    navigate(`/get-app?${choiceQuery(choice)}`, { replace: true });
  }
  async function submit(event) {
    event.preventDefault();
    if (busy) return;
    setBusy(true);
    setError("");
    setNotice("");
    const normalizedEmail = email.trim().toLowerCase();
    try {
      const auth = requireAuth();
      rememberChoice(choice);
      if (step === "signup") {
        if (!firstName.trim() || !lastName.trim())
          throw new Error("Please enter your first and last name.");
        if (!agreed)
          throw new Error(
            "Please agree to the Terms of Service to create your account.",
          );
        const { data, error: signupError } = await auth.signUp({
          email: normalizedEmail,
          password,
          options: {
            data: {
              first_name: firstName.trim(),
              last_name: lastName.trim(),
              ...intentMetadata(choice),
            },
          },
        });
        if (signupError) throw signupError;
        setPassword("");
        if (data.user?.identities?.length === 0)
          throw new Error(
            "If you already have a Crittr account, sign in with your existing details. Otherwise, check your email for the next step.",
          );
        if (data.session) await finish();
        else {
          changeStep("verify");
          setCooldown(60);
        }
      } else if (step === "signin") {
        const { error: signinError } = await auth.signInWithPassword({
          email: normalizedEmail,
          password,
        });
        if (signinError?.code === "email_not_confirmed") {
          changeStep("verify");
          setNotice(
            "Your email still needs confirming. Request a new code below.",
          );
        } else if (signinError) throw signinError;
        else {
          setPassword("");
          await finish();
        }
      } else if (step === "verify" || step === "recovery-code") {
        const { error: verifyError } = await auth.verifyOtp({
          email: normalizedEmail,
          token: code,
          type: step === "verify" ? "signup" : "recovery",
        });
        if (verifyError) throw verifyError;
        if (step === "verify") await finish();
        else changeStep("new-password");
      } else if (step === "recover") {
        const { error: resetError } =
          await auth.resetPasswordForEmail(normalizedEmail);
        if (resetError) throw resetError;
        changeStep("recovery-code");
        setCooldown(60);
      } else if (step === "new-password") {
        const { error: passwordError } = await auth.updateUser({ password });
        if (passwordError) throw passwordError;
        setPassword("");
        await finish();
      } else if (step === "ready") {
        await finish();
      }
    } catch (err) {
      setError(authMessage(err));
    } finally {
      setBusy(false);
    }
  }
  async function resend() {
    if (busy || cooldown) return;
    setBusy(true);
    setError("");
    setNotice("");
    try {
      const auth = requireAuth();
      const { error: resendError } =
        step === "verify"
          ? await auth.resend({
              type: "signup",
              email: email.trim().toLowerCase(),
            })
          : await auth.resetPasswordForEmail(email.trim().toLowerCase());
      if (resendError) throw resendError;
      setCooldown(60);
      setNotice(
        "A fresh code is on its way. Check your inbox and spam folder.",
      );
    } catch (err) {
      setError(authMessage(err));
    } finally {
      setBusy(false);
    }
  }
  async function social(provider) {
    if (step === "signup" && !agreed) {
      setError("Please agree to the Terms of Service before continuing.");
      return;
    }
    setBusy(true);
    setError("");
    try {
      rememberChoice(choice);
      const { error: oauthError } = await requireAuth().signInWithOAuth({
        provider,
        options: {
          redirectTo: `${window.location.origin}/auth/callback?${choiceQuery(choice)}`,
        },
      });
      if (oauthError) throw oauthError;
    } catch (err) {
      setError(authMessage(err));
      setBusy(false);
    }
  }
  const isAuth = step === "signup" || step === "signin";
  const isCode = step === "verify" || step === "recovery-code";
  const welcomeTitle = pro ? "Welcome to Crittr Pro!" : "Welcome to Crittr!";
  const title = {
    signup: welcomeTitle,
    signin: welcomeTitle,
    verify: "Check your inbox",
    recover: "Let’s get you back in",
    "recovery-code": "Check your inbox",
    "new-password": "A fresh start",
    ready: "One last little step",
  }[step];
  const subtitle = {
    signup: "Fill out some details to get started",
    signin: "Your pets’ people. All in one place.",
    verify: `Enter the 6-digit code we sent to ${email}.`,
    recover: "We’ll email you a code to reset your password.",
    "recovery-code": `If an account exists for ${email}, a reset code is on its way.`,
    "new-password": "Choose a new password for your Crittr account.",
    ready:
      "Your account is ready. We’re saving your preference before you continue.",
  }[step];
  return (
    <main className="signup-layout" id="main-content">
      <aside className="signup-story" aria-label="More good days together">
        <header className="account-header">
          <Brand />
        </header>
        <h1>
          I think I just
          <br />
          saw your pet's
          <br />
          <span>ears perk up.</span>
        </h1>
        <p>
          Pet care is about to get a whole lot easier. Simple or complex, Crittr has you covered.
        </p>
        <div className="signup-pets">
          <img
            src={pets}
            alt="A happy golden retriever and tabby cat cuddled together on a blanket"
          />
        </div>
       
      </aside>
      <section className="signup-card" aria-labelledby="signup-heading">
        <div className="signup-plan">
          <Link to={switchPlanHref} replace>
            {pro ? "Start free instead" : "Explore Pro"}
          </Link>
        </div>
        <div className="auth-animals" aria-hidden="true">
          <img src={catIcon} alt="" />
          <img src={dogIcon} alt="" />
          <img src={fishIcon} alt="" />
        </div>
        <h2 id="signup-heading" tabIndex={-1} ref={heading}>
          {title}
        </h2>
        <p className="auth-subtitle">{subtitle}</p>
        {existing && isAuth && (
          <div className="auth-existing">
            <p>
              Already signed in as <strong>{existing.email}</strong>
            </p>
            <button
              type="button"
              className="btn-primary"
              disabled={busy}
              onClick={async () => {
                setBusy(true);
                setError("");
                try {
                  await finish();
                } catch (err) {
                  setError(authMessage(err));
                } finally {
                  setBusy(false);
                }
              }}
            >
              Continue with this account <ArrowRight size={18} />
            </button>
            <button
              type="button"
              className="auth-text-button"
              disabled={busy}
              onClick={async () => {
                setBusy(true);
                try {
                  const { error: signoutError } = await requireAuth().signOut({
                    scope: "local",
                  });
                  if (signoutError) throw signoutError;
                  setExisting(null);
                } catch (err) {
                  setError(authMessage(err));
                } finally {
                  setBusy(false);
                }
              }}
            >
              Use a different account
            </button>
          </div>
        )}
        {error && (
          <p className="auth-alert" role="alert">
            {error}
          </p>
        )}
        {notice && (
          <p className="auth-notice" role="status">
            {notice}
          </p>
        )}
        {!existing || !isAuth ? (
          <>
            <form onSubmit={submit} className="auth-form" aria-busy={busy}>
              <fieldset disabled={busy}>
                {step === "signup" && (
                  <div className="auth-name-row">
                    <label className="auth-field">
                      First name
                      <input
                        name="given-name"
                        autoComplete="given-name"
                        placeholder="First name"
                        maxLength={80}
                        required
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                      />
                    </label>
                    <label className="auth-field">
                      Last name
                      <input
                        name="family-name"
                        autoComplete="family-name"
                        placeholder="Last name"
                        maxLength={80}
                        required
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                      />
                    </label>
                  </div>
                )}
                {(isAuth || step === "recover") && (
                  <label className="auth-field">
                    Email
                    <span className="auth-input-wrap">
                      <Mail size={18} aria-hidden="true" />
                      <input
                        name="email"
                        type="email"
                        autoComplete="email"
                        autoCapitalize="none"
                        spellCheck={false}
                        placeholder="you@example.com"
                        maxLength={254}
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </span>
                  </label>
                )}
                {(isAuth || step === "new-password") && (
                  <PasswordField
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    newPassword={step !== "signin"}
                  />
                )}
                {isCode && (
                  <label className="auth-field">
                    Verification code
                    <input
                      className="auth-code"
                      name="code"
                      inputMode="numeric"
                      autoComplete="one-time-code"
                      pattern="[0-9]{6}"
                      maxLength={6}
                      placeholder="000000"
                      required
                      value={code}
                      onChange={(e) =>
                        setCode(e.target.value.replace(/\D/g, ""))
                      }
                    />
                  </label>
                )}
                {step === "signup" && (
                  <label className="auth-terms">
                    <input
                      type="checkbox"
                      required
                      checked={agreed}
                      onChange={(e) => setAgreed(e.target.checked)}
                    />
                    <span>
                      I agree to the{" "}
                      <Link
                        to="/terms"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Terms of Service
                      </Link>{" "}
                      and{" "}
                      <Link
                        to="/privacy"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Privacy Policy
                      </Link>
                      .
                    </span>
                  </label>
                )}
                {step === "signin" && (
                  <button
                    type="button"
                    className="auth-text-button auth-forgot"
                    onClick={() => changeStep("recover")}
                  >
                    Forgot password?
                  </button>
                )}
                <button
                  type="submit"
                  className="btn-primary auth-submit"
                  disabled={busy}
                >
                  {busy ? (
                    <>
                      <span className="auth-spinner" /> One little moment…
                    </>
                  ) : (
                    <>
                      {
                        {
                          signup: "Create Account",
                          signin: "Sign In",
                          verify: "Confirm email",
                          recover: "Send reset code",
                          "recovery-code": "Verify code",
                          "new-password": "Save password & continue",
                          ready: "Continue to the app",
                        }[step]
                      }
                      <ArrowRight size={19} aria-hidden="true" />
                    </>
                  )}
                </button>
              </fieldset>
            </form>
            {isAuth && (
              <>
                <div className="auth-divider">
                  <span>or continue with</span>
                </div>
                <div className="auth-social">
                  <button
                    type="button"
                    disabled={busy}
                    onClick={() => social("google")}
                  >
                    <svg
                      viewBox="0 0 24 24"
                      width="20"
                      height="20"
                      aria-hidden="true"
                    >
                      <path
                        fill="#4285f4"
                        d="M21.6 12.2c0-.7-.1-1.4-.2-2.1H12v4h5.4a4.6 4.6 0 0 1-2 3v2.5h3.3c1.9-1.7 2.9-4.2 2.9-7.4Z"
                      />
                      <path
                        fill="#34a853"
                        d="M12 22c2.7 0 5-.9 6.7-2.4l-3.3-2.5c-.9.6-2 1-3.4 1a6 6 0 0 1-5.6-4.1H3v2.6A10 10 0 0 0 12 22Z"
                      />
                      <path
                        fill="#fbbc05"
                        d="M6.4 14a6 6 0 0 1 0-4V7.4H3a10 10 0 0 0 0 9.2L6.4 14Z"
                      />
                      <path
                        fill="#ea4335"
                        d="M12 5.9c1.5 0 2.8.5 3.8 1.5l2.9-2.8A9.6 9.6 0 0 0 12 2a10 10 0 0 0-9 5.4L6.4 10A6 6 0 0 1 12 5.9Z"
                      />
                    </svg>
                    Google
                  </button>
                  <button
                    type="button"
                    disabled={busy}
                    onClick={() => social("apple")}
                  >
                    <svg
                      viewBox="0 0 24 24"
                      width="20"
                      height="20"
                      fill="currentColor"
                      aria-hidden="true"
                    >
                      <path d="M17.1 12.7c0-2 1.6-3 1.7-3.1-1-1.5-2.6-1.7-3.2-1.8-1.4-.1-2.6.8-3.3.8-.7 0-1.8-.8-3-.8-1.6 0-3.1.9-3.9 2.3-1.7 2.9-.4 7.2 1.2 9.5.8 1.1 1.7 2.3 2.9 2.2 1.1-.1 1.6-.7 3-.7s1.9.7 3.1.7 2-1.1 2.8-2.2c.9-1.3 1.3-2.6 1.3-2.7-.1 0-2.6-1-2.6-4.2ZM14.8 6.3c.6-.8 1.1-1.9 1-3-.9.1-2.1.6-2.7 1.4-.6.7-1.2 1.8-1 2.9 1 .1 2.1-.5 2.7-1.3Z" />
                    </svg>
                    Apple
                  </button>
                </div>
                <p className="auth-switch">
                  {step === "signup"
                    ? "I already have an account!"
                    : "New to the Crittr crew?"}{" "}
                  <button
                    className="auth-text-button"
                    disabled={busy}
                    onClick={() =>
                      changeStep(step === "signup" ? "signin" : "signup")
                    }
                  >
                    {step === "signup" ? "Sign In" : "Create an account"}
                  </button>
                </p>
              </>
            )}
            {isCode && (
              <div className="auth-code-help">
                <p>Didn’t get a code? Check your spam folder.</p>
                <button
                  type="button"
                  className="auth-text-button"
                  disabled={busy || cooldown > 0}
                  onClick={resend}
                >
                  {cooldown ? `Resend code in ${cooldown}s` : "Resend code"}
                </button>
                <button
                  type="button"
                  className="auth-text-button auth-go-back"
                  disabled={busy}
                  onClick={() =>
                    changeStep(step === "verify" ? "signin" : "recover")
                  }
                >
                  <ArrowLeft size={14} />{" "}
                  {step === "verify"
                    ? "Back to sign in"
                    : "Use a different email"}
                </button>
              </div>
            )}
            {step === "recover" && (
              <button
                type="button"
                className="auth-text-button auth-go-back"
                disabled={busy}
                onClick={() => changeStep("signin")}
              >
                <ArrowLeft size={14} /> Back to sign in
              </button>
            )}
            {step === "ready" && !busy && (
              <button
                type="button"
                className="auth-text-button auth-go-back"
                onClick={() => {
                  setExisting(null);
                  changeStep("signin");
                }}
              >
                <ArrowLeft size={14} /> Sign in again
              </button>
            )}
          </>
        ) : null}
     
      </section>
    </main>
  );
}
