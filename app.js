const feedbackCount = document.querySelector('#feedback-count');
const feedbackArea = document.querySelector('.feedback-section');
const backTotop = document.querySelector('.top');
let count = 0;
window.onload = async () => {
  const res = await fetch(
    'https://feedback-api.kalvium.community/api/feedbacks/'
  );
  const data = await res.json();
  data.list.reverse().map(el => {
    if (el.data.text) {
      count++;
      const createdAtDate = new Date(el.created_at);
      const createdAtDateString = createdAtDate
        .toLocaleString('en-IN', {
          timeZone: 'Asia/Kolkata',
          day: '2-digit',
          month: '2-digit',
          year: 'numeric',
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
        })
        .replace(/(\d+)\/(\d+)\/(\d+)/, '$1/$2/$3');

      feedbackArea.innerHTML += `<div class="fb">
          <div class="fb-2">${count} - ${el.data.text}</div>
          <div class="fb-1">
            <div class="fb-3">${createdAtDateString}</div>
            <div class="fb-3 type">${el.to_entity_type}</div>
          </div>
        </div>`;
    }
  });
  feedbackCount.innerHTML = `Total feedbacks = ${count}`;
};
backTotop.onclick = () => {
  window.scrollTo({
    top: 0,
  });
};
