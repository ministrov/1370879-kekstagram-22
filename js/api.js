const Urls = {
  GET: 'https://22.javascript.pages.academy/kekstagram/data',
  POST: 'https://22.javascript.pages.academy/kekstagram',
}

const request = (onSuccess, onError, method, data) => {
  fetch(
    Urls[method],
    {
      method: method,
      body: data,
    },
  )
    .then((response) => response.json())
    .then((data) => {
      onSuccess(data)
    }).catch(() => {
      onError()
    });
}

export {request}
// const API_URL = 'https://22.javascript.pages.academy/kekstagram/data';
// const API_POST_URL = 'https://22.javascript.pages.academy/kekstagram';
//
// const getData = () => new Promise((resolve, reject) => {
//   fetch(API_URL).then((response) => response.json())
//     .then((data) => resolve(data))
//     .catch((error) => reject(error));
// });
//
// const postData = (data) => new Promise((resolve, reject) => {
//   fetch(API_POST_URL, {
//     method: 'POST',
//     body: data,
//   }).then((response) => response.json().then((data) => {resolve(data)}))
//     .catch((error) => reject(error));
// });
//
// export default {getData, postData};
