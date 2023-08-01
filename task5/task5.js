const pageNumberInput = document.getElementById('pageNumber');
const limitInput = document.getElementById('limit');
const requestButton = document.getElementById('requestButton');
const imageList = document.getElementById('imageList');

requestButton.addEventListener('click', () => {
  const pageNumber = pageNumberInput.value;
  const limit = limitInput.value;

  if ((isNaN(pageNumber) || pageNumber < 1 || pageNumber > 10) && (isNaN(limit) || limit < 1 || limit > 10)) {
    imageList.innerHTML = 'Номер страницы и лимит вне диапазона от 1 до 10';
    return;
  } else if (isNaN(pageNumber) || pageNumber < 1 || pageNumber > 10) {
    imageList.innerHTML = 'Номер страницы вне диапазона от 1 до 10';
    return;
  } else if (isNaN(limit) || limit < 1 || limit > 10) {
    imageList.innerHTML = 'Лимит вне диапазона от 1 до 10';
    return;
  } else {
    fetch(`https://picsum.photos/v2/list?page=${pageNumber}&limit=${limit}`)
      .then(response => response.json())
      .then(data => {
        imageList.innerHTML = '';

        data.forEach(image => {
          const imgElement = document.createElement('img');
          imgElement.src = image.download_url;
          imageList.appendChild(imgElement);
        });

        localStorage.setItem('lastRequest', JSON.stringify(data));
      })
      .catch(error => {
        console.error(error);
        imageList.innerHTML = 'Произошла ошибка при выполнении запроса';
      });
  }
});

const lastRequestData = localStorage.getItem('lastRequest');
if (lastRequestData) {
  const lastRequest = JSON.parse(lastRequestData);

  lastRequest.forEach(image => {
    const imgElement = document.createElement('img');
    imgElement.src = image.download_url;
    imageList.appendChild(imgElement);
  });
}