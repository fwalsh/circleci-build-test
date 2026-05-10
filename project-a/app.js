import { fetchStatus } from '../shared/status.js';

const btn = document.getElementById('check-status-btn');
const reveal = document.getElementById('status-reveal');
const description = document.getElementById('status-description');
const updated = document.getElementById('status-updated');
const dot = document.getElementById('status-dot');

const INDICATOR_CLASSES = ['indicator-none', 'indicator-minor', 'indicator-major', 'indicator-critical'];

function applyIndicator(indicator) {
  INDICATOR_CLASSES.forEach(cls => dot.classList.remove(cls));
  const cls = INDICATOR_CLASSES.find(c => c === `indicator-${indicator}`) ?? 'indicator-none';
  dot.classList.add(cls);
}

btn.addEventListener('click', async () => {
  btn.disabled = true;
  btn.textContent = 'Checking…';

  try {
    const data = await fetchStatus();
    const { description: desc, indicator } = data.status;
    const updatedAt = new Date(data.page.updated_at).toLocaleString();

    applyIndicator(indicator);
    description.textContent = desc;
    updated.textContent = `Last updated: ${updatedAt}`;
    reveal.classList.add('visible');
  } catch (err) {
    description.innerHTML = `<span class="status-error">Could not fetch status: ${err.message}</span>`;
    reveal.classList.add('visible');
  } finally {
    btn.disabled = false;
    btn.textContent = 'Check CircleCI Status';
  }
});
