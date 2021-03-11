const API_URL = 'https://22.javascript.pages.academy/kekstagram/data';
const API_POST_URL = 'https://22.javascript.pages.academy/kekstagram';

const getData = () => new Promise((resolve, reject) => {
  fetch(API_URL).then((response) => response.json())
    .then((data) => resolve(data))
    .catch((error) => reject(error));
});

const postData = (data) => new Promise((resolve, reject) => {
  fetch(API_POST_URL, {
    method: 'POST',
    body: data,
    /*mode: 'no-cors',
    credentials: 'same-origin',*/
  }).then((response) => response.json().then((data) => {resolve(data)}))
    .catch((error) => reject(error));
});

export default {getData, postData};
