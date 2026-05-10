export async function fetchStatus() {
  const res = await fetch('https://status.circleci.com/api/v2/status.json');
  if (!res.ok) throw new Error(`Status API returned HTTP ${res.status}`);
  return res.json(); // { page: {...}, status: { description, indicator } }
}
