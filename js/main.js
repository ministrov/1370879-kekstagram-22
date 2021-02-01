'use strict';

// Получение случайного целого числа в заданном интервале, включительно

const getRandomInteger = function (min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);

  return Math.floor(Math.random() * (max - min + 1) + min);
}

getRandomInteger(3, 78);

// Функция для проверки максимальной длины строки

const getMaxStringLength = function (str) {
  let maxLength = 10;
  if (str.length < maxLength) {
    return maxLength;
  }
}

getMaxStringLength('Hello World');
