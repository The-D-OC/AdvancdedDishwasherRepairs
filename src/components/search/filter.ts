/**
 * Progressive client-side filtering for server-rendered lists.
 *
 * Markup contract (inside an element with `data-filter-root`):
 *  - input[data-filter-input]          free-text query (URL param `q`)
 *  - select[data-filter-select]        optional facet; matches item `data-facet` (URL param `brand`)
 *  - [data-filter-item][data-search]   items; `data-search` holds lower-case searchable text
 *  - [data-filter-empty]               shown when nothing matches
 *  - [data-filter-count]               live result count text
 *  - `data-filter-require-query` on the root hides all items until something is typed
 *  - `data-filter-limit="n"` on the root caps visible results
 */
const normalise = (s: string) =>
  s
    .toLowerCase()
    .normalize('NFKD')
    .replace(/[^a-z0-9 ]+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();

export function initFilters(): void {
  for (const root of document.querySelectorAll<HTMLElement>('[data-filter-root]')) {
    const input = root.querySelector<HTMLInputElement>('[data-filter-input]');
    const select = root.querySelector<HTMLSelectElement>('[data-filter-select]');
    const items = [...root.querySelectorAll<HTMLElement>('[data-filter-item]')];
    const empty = root.querySelector<HTMLElement>('[data-filter-empty]');
    const count = root.querySelector<HTMLElement>('[data-filter-count]');
    const requireQuery = root.hasAttribute('data-filter-require-query');
    const limit = Number(root.dataset['filterLimit'] ?? Infinity);
    const noun = root.dataset['filterNoun'] ?? 'result';

    const index = items.map((el) => ({ el, text: normalise(el.dataset['search'] ?? el.textContent ?? ''), facet: el.dataset['facet'] ?? '' }));

    const params = new URLSearchParams(location.search);
    if (input && params.get('q')) input.value = params.get('q') ?? '';
    if (select && params.get('brand')) select.value = params.get('brand') ?? '';

    const apply = () => {
      const terms = normalise(input?.value ?? '').split(' ').filter(Boolean);
      const facet = select?.value ?? '';
      const active = terms.length > 0 || facet !== '';
      let shown = 0;
      let matched = 0;

      for (const { el, text, facet: itemFacet } of index) {
        const match =
          (!requireQuery || active) &&
          (!facet || itemFacet === facet) &&
          terms.every((t) => text.includes(t));
        if (match) matched++;
        const visible = match && shown < limit;
        if (visible) shown++;
        el.hidden = !visible;
      }

      if (empty) empty.hidden = !(active || !requireQuery) || matched > 0;
      if (count) {
        count.textContent = !active && requireQuery ? '' : `${matched} ${noun}${matched === 1 ? '' : 's'}`;
      }

      // Keep the URL shareable without adding history entries.
      if (!requireQuery) {
        const url = new URL(location.href);
        input?.value ? url.searchParams.set('q', input.value) : url.searchParams.delete('q');
        facet ? url.searchParams.set('brand', facet) : url.searchParams.delete('brand');
        history.replaceState(null, '', url);
      }
    };

    input?.addEventListener('input', apply);
    select?.addEventListener('change', apply);
    root.querySelector('form')?.addEventListener('submit', (e) => {
      if (!requireQuery) e.preventDefault();
      apply();
    });
    apply();
  }
}
