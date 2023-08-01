const submitBtn = document.getElementById('submitBtn');
const resultDiv = document.getElementById('result');

submitBtn.addEventListener('click', () => {
  const num1 = parseInt(document.getElementById('input1').value);
  const num2 = parseInt(document.getElementById('input2').value);

  if (isNaN(num1) || isNaN(num2)) {
    resultDiv.innerText = 'Одно из чисел вне диапазона от 100 до 300';
    return;
  }

  if (num1 < 100 || num1 > 300 || num2 < 100 || num2 > 300) {
    resultDiv.innerText = 'Одно из чисел вне диапазона от 100 до 300';
    return;
  }

  const url = `https://picsum.photos/${num1}/${num2}`;

  fetch(url)
    .then(response => {
      const imageUrl = response.url;
      resultDiv.innerHTML = `<img src="${imageUrl}" alt="Image">`;
    })
    .catch(error => {
      console.error(error);
    });
});
