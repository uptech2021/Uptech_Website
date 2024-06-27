// utils/rateLimit.js
export const RATE_LIMIT_KEY = 'form_submission_attempts';
export const RATE_LIMIT_TIME_FRAME = 60 * 1000; // 1 minute
export const MAX_ATTEMPTS = 3;

export function getSubmissionAttempts() {
  const attempts = localStorage.getItem(RATE_LIMIT_KEY);
  return attempts ? JSON.parse(attempts) : [];
}

export function addSubmissionAttempt() {
  const attempts = getSubmissionAttempts();
  const now = Date.now();
  attempts.push(now);
  localStorage.setItem(RATE_LIMIT_KEY, JSON.stringify(attempts));
}

export function isRateLimited() {
  const attempts = getSubmissionAttempts();
  const now = Date.now();
  const recentAttempts = attempts.filter(attempt => now - attempt < RATE_LIMIT_TIME_FRAME);

  // Update the stored attempts to only keep recent ones
  localStorage.setItem(RATE_LIMIT_KEY, JSON.stringify(recentAttempts));

  return recentAttempts.length >= MAX_ATTEMPTS;
}
