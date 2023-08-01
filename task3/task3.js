function handleButtonClick() {
  const input = document.getElementById('numberInput');
  const value = input.value;

  if (value < 1 || value > 10) {
    const imageContainer = document.getElementById('imageContainer');
    imageContainer.textContent = 'число вне диапазона от 1 до 10';
  } else {
    const url = `https://picsum.photos/v2/list?limit=${value}`;

    // Создаем новый объект XHR
    const xhr = new XMLHttpRequest();

    // Настраиваем запрос
    xhr.open('GET', url, true);

    // Устанавливаем обработчик события загрузки
    xhr.onload = function () {
      if (xhr.status === 200) {
        const response = JSON.parse(xhr.responseText);
        const imageContainer = document.getElementById('imageContainer');
        imageContainer.innerHTML = '';

        // Создаем элементы img и добавляем их в контейнер
        response.forEach(function (item) {
          const img = document.createElement('img');
          img.src = item.download_url;
          img.alt = item.author;
          imageContainer.appendChild(img);
        });
      } else {
        console.log('Ошибка запроса:', xhr.status);
      }
    };

    // Устанавливаем обработчик события ошибки
    xhr.onerror = function () {
      console.log('Ошибка запроса');
    };

    // Отправляем запрос
    xhr.send();
  }
}