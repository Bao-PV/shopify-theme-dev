document.querySelectorAll('[data-text-columns-autoplay="true"]').forEach((grid) => {
  const interval = parseInt(grid.dataset.autoplayInterval, 10) || 5000;
  let index = 0;

  setInterval(() => {
    const columns = grid.children;
    if (!columns.length) return;

    index = (index + 1) % columns.length;
    columns[index].scrollIntoView({
      behavior: 'smooth',
      inline: 'start',
      block: 'nearest',
    });
  }, interval);
});

document.querySelectorAll('.text-columns-with-image__viewport').forEach((viewport) => {
  const grid = viewport.querySelector('.text-columns-with-image__grid');
  const prevButton = viewport.querySelector('[data-text-columns-prev]');
  const nextButton = viewport.querySelector('[data-text-columns-next]');
  if (!grid || (!prevButton && !nextButton)) return;

  const scrollByOneColumn = (direction) => {
    const column = grid.querySelector('.text-columns-with-image__column');
    if (!column) return;
    grid.scrollBy({ left: direction * column.getBoundingClientRect().width, behavior: 'smooth' });
  };

  if (prevButton) {
    prevButton.addEventListener('click', () => scrollByOneColumn(-1));
  }

  if (nextButton) {
    nextButton.addEventListener('click', () => scrollByOneColumn(1));
  }
});
