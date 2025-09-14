// script.js
document.addEventListener('DOMContentLoaded', () => {
  const suggestBtn = document.getElementById('suggestBtn');
  const skipBtn = document.getElementById('skipBtn');
  const moodInput = document.getElementById('mood');
  const modal = document.getElementById('suggestModal');
  const suggestList = document.getElementById('suggestList');
  const modalClose = document.querySelector('.modal-close');

  suggestBtn.addEventListener('click', async () => {
    const mood = moodInput.value.trim();
    try {
      const url = `/api/suggestions?mood=${encodeURIComponent(mood)}`;
      const res = await fetch(url);
      const data = await res.json();
      showSuggestions(data);
    } catch (err) {
      alert('Could not load suggestions. Try again.');
      console.error(err);
    }
  });

  skipBtn.addEventListener('click', () => {
    moodInput.value = '';
    // Optionally scroll to recipes
    document.querySelector('.recipes').scrollIntoView({ behavior: 'smooth' });
  });

  modalClose.addEventListener('click', hideModal);
  modal.addEventListener('click', (e) => {
    if (e.target === modal) hideModal();
  });

  function showSuggestions(data) {
    suggestList.innerHTML = '';
    const title = document.createElement('p');
    title.style.fontWeight = 700;
    title.textContent = `Suggestions for "${data.mood}"`;
    suggestList.appendChild(title);

    data.suggestions.forEach(s => {
      const item = document.createElement('div');
      item.className = 'suggestion-item';
      item.innerHTML = `<strong>${s.title}</strong><div style="color:#6b8a8a;font-size:13px;margin-top:6px">${s.calories} calories</div>`;
      suggestList.appendChild(item);
    });

    modal.style.display = 'flex';
  }

  function hideModal() {
    modal.style.display = 'none';
  }
});
