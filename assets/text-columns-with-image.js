document.querySelectorAll('[data-text-columns-autoplay="true"]').forEach((grid) => {
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
  }, 4000);
});
