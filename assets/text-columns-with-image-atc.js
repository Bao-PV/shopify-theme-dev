function textColumnsWithImageUpdateCartBubble(cart) {
  document.querySelectorAll('[data-cart-count]').forEach((el) => {
    el.textContent = cart.item_count;
    el.hidden = cart.item_count === 0;
  });
}

function textColumnsWithImageFetchCart() {
  return fetch(`${window.Shopify && window.Shopify.routes && window.Shopify.routes.root ? window.Shopify.routes.root : '/'}cart.js`, {
    headers: { Accept: 'application/json' },
  }).then((response) => response.json());
}

document.addEventListener('submit', (event) => {
  const form = event.target.closest('[data-atc-form]');
  if (!form) return;

  event.preventDefault();

  const wrapper = form.closest('[data-atc-wrapper]');
  const messageEl = wrapper ? wrapper.querySelector('[data-atc-message]') : null;
  const button = form.querySelector('button[type="submit"]');

  if (messageEl) {
    messageEl.hidden = true;
    messageEl.textContent = '';
  }

  if (button) {
    button.disabled = true;
    button.setAttribute('aria-busy', 'true');
  }

  fetch(`${form.action}.js`, {
    method: 'POST',
    headers: { Accept: 'application/json' },
    body: new FormData(form),
  })
    .then((response) => response.json().then((data) => ({ ok: response.ok, data })))
    .then(({ ok, data }) => {
      if (!ok) {
        throw new Error(data.description || data.message || 'Unable to add this product to the cart.');
      }

      return textColumnsWithImageFetchCart();
    })
    .then((cart) => {
      textColumnsWithImageUpdateCartBubble(cart);
    })
    .catch((error) => {
      if (messageEl) {
        messageEl.textContent = error.message || 'Something went wrong. Please try again.';
        messageEl.hidden = false;
      }
    })
    .finally(() => {
      if (button) {
        button.disabled = false;
        button.removeAttribute('aria-busy');
      }
    });
});
