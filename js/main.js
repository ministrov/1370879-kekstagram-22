'use strict';

// Получение случайного целого числа в заданном интервале, включительно

const getRandomInteger = function (min, max) {
  if (min < 0 || max < 0) {
    return -1;
  }

  if (max < min) {
    [min, max] = [max, min];
  }

  return Math.floor(Math.random() * (max - min + 1)) + min;
}

getRandomInteger(3, 78);

// Функция для проверки максимальной длины строки

const getMaxStringLength = function (text, sign) {
  return text.length <= sign ? true : false;
}

getMaxStringLength('Hello World', 10);
