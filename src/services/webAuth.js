import { requireAuth } from "../lib/supabase.js";
import { intentMetadata } from "../lib/signupIntent.js";

export function authMessage(error) {
  if (error?.code === "email_not_confirmed")
    return "Please confirm your email before signing in.";
  if (
    error?.code === "invalid_credentials" ||
    /invalid login credentials/i.test(error?.message || "")
  )
    return "That email and password didn’t match. Try again, or reset your password.";
  if (
    error?.status === 429 ||
    /rate limit|too many|security purposes/i.test(error?.message || "")
  )
    return "A few too many attempts. Please wait a minute, then try again.";
  if (/expired|invalid.*token|token.*invalid/i.test(error?.message || ""))
    return "That code is invalid or has expired. Please request a new code.";
  if (/fetch|network|timeout/i.test(error?.message || ""))
    return "We couldn’t connect. Check your connection and try again.";
  return error?.message || "Something went wrong. Please try again.";
}

export async function saveAccountChoice(choice, auth = requireAuth()) {
  const { data, error } = await auth.getUser();
  if (error) throw error;
  if (!data.user)
    throw new Error("Please sign in to finish setting up your account.");
  const { error: updateError } = await auth.updateUser({
    data: intentMetadata(choice),
  });
  if (updateError) throw updateError;
  return data.user;
}

// React StrictMode can mount the callback twice. Exchange a PKCE code only once.
const exchanges = new Map();
export function exchangeOAuthCode(code) {
  if (!exchanges.has(code)) {
    exchanges.set(
      code,
      requireAuth()
        .exchangeCodeForSession(code)
        .then(({ data, error }) => {
          if (error) throw error;
          return data.session;
        }),
    );
  }
  return exchanges.get(code);
}
