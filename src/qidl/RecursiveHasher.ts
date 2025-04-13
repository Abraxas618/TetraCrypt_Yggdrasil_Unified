// QIDL Recursive Hasher – Upgraded with entropy + recursion
import crypto from 'crypto';

export function generateEntropySalt(length: number = 8): string {
  const entropy = crypto.randomBytes(length).toString('hex');
  const timestamp = Date.now().toString();
  return (entropy + timestamp).slice(0, length);
}

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
