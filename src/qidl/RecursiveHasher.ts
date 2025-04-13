// QIDL Recursive Hasher – Fully Salted Recursive Edition
import crypto from 'crypto';

/**
 * Generates secure salt using high-entropy random + timestamp hash.
 */
export function generateEntropySalt(length: number = 16): string {
  const raw = crypto.randomBytes(32).toString('hex') + Date.now().toString();
  const hashed = crypto.createHash('sha256').update(raw).digest('hex');
  return hashed.slice(0, length);
}

/**
 * Secure recursive SHA-256 QIDL hasher with deep salt integration.
 * @param input - Message, seed, or memory string
 * @param depth - Number of recursive layers (default 6)
 * @param salt - Optional entropy override, generated if not passed
 * @returns QIDL hash string
 */
export function recursiveHash(
  input: string,
  depth: number = 6,
  salt?: string
): string {
  const effectiveSalt = salt ?? generateEntropySalt();
  let hashInput = input;

  for (let i = 0; i < depth; i++) {
    const hash = crypto.createHash('sha256');
    hash.update(hashInput + effectiveSalt); // ✅ Now salt is applied every round
    hashInput = hash.digest('hex');
  }

  return `QIDL-${hashInput.slice(0, 32)}`; // 256-bit final output
}
