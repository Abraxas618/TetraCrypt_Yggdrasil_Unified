// QIDL Recursive Hasher – Final Entropy-Hardened Version
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
 * Secure recursive SHA-256 QIDL hasher with entropy salt injection.
 * @param input - Message, seed, or memory string
 * @param depth - Number of recursive layers (default 6)
 * @param salt - Optional salt input, auto-generated if not provided
 * @returns QIDL hash string fragment
 */
export function recursiveHash(
  input: string,
  depth: number = 6,
  salt?: string
): string {
  const effectiveSalt = salt ?? generateEntropySalt();
  let hashInput = input + effectiveSalt;

  for (let i = 0; i < depth; i++) {
    const hash = crypto.createHash('sha256');
    hash.update(hashInput);
    hashInput = hash.digest('hex');
  }

  return `QIDL-${hashInput.slice(0, 32)}`; // Return 256-bit fragment
}
