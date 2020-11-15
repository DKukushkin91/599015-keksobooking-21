'use strict';

const TIMEOUT_IN_MS = 10000;
const StatusCode = {
  OK: 200
};

const getShowErrorElement = (text) => {
  const errorElement = document.createElement(`div`);
  errorElement.style = `
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 800px;
      height: 50%;
      display: flex;
      justify-content: center;
      align-items: center;
      border-radius: 15px;
      background-color: rgba(0, 0, 0, 0.9);
      color: #fff;
      font-weight: 700;
      line-height: 1.5;
      z-index: 100`;
  errorElement.textContent = text;
  document
    .querySelector(`.map`)
    .append(errorElement);
  return errorElement;
};

const dataLoadingHandler = (onSuccess, onError) => {
  const xhr = new XMLHttpRequest();
  xhr.responseType = `json`;

  xhr.addEventListener(`load`, () => {
    if (xhr.status === StatusCode.OK) {
      onSuccess(xhr.response);
    } else {
      onError(getShowErrorElement(`Статус ответа: ${xhr.status} ${xhr.statusText}`));
    }
  });
  xhr.addEventListener(`error`, () => {
    onError(getShowErrorElement(`Произошла ошибка соединения`));
  });
  xhr.addEventListener(`timeout`, () => {
    onError(getShowErrorElement(`Запрос не успел выполниться за ${xhr.timeout} мс`));
  });

  xhr.timeout = TIMEOUT_IN_MS;

  xhr.open(`GET`, window.util.Url.GET);
  xhr.send();
};

window.load = {
  dataLoadingHandler,
  StatusCode,
  TIMEOUT_IN_MS
};

