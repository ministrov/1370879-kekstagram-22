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

// Необходимо написать функцию для создания массива из 25 сгенерированных объектов.
//  Каждый объект массива — описание фотографии, опубликованной пользователем.

const LIKES = getRandomInteger(15, 200);
const AUTHOR_NAME = [
  'Артём',
  'Андрей',
  'Егор',
  'Максим',
  'Роман'
]
const DESCRIPTION = [
  'Описание 1',
  'Описание 2',
  'Описание 3',
  'Описание 4'
]
const message = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
]

const getAvatarLink = function () {
  return `img/avatar-${getRandomInteger(1, 6)}.svg`
}
// El - element
const getRandomArrayEl = function (array, min, max) {
  const i = getRandomInteger(min, max - 1);
  return array[i];
}

const usedId = [];

const generateUniqId = function () {
  const id = getRandomInteger(0, 1000);
  if (!usedId.includes(id)) {
    usedId.push(id);
  }
  return id;
}
const getRandomCommentsArray = function () {
  const commentsArr = [];
  const commentsCount = getRandomInteger(1, 10);
  for (let i = 0; i < commentsCount; i++) {
    const newComment = {
      id: generateUniqId(),
      avatar: getAvatarLink(),
      message: getRandomArrayEl(message, 0, 5),
      name: getRandomArrayEl(AUTHOR_NAME, 0, 4),
    };
    commentsArr.push(newComment);
  }
  return commentsArr;
}

const getRandomObjectsArray = function () {
  const objectsArray = [];
  for (let i = 0; i < 25; i++) {
    const newObject = {
      id: i + 1,
      url: `photos/${i + 1}.jpg`,
      description: getRandomArrayEl(DESCRIPTION, 0, DESCRIPTION.length),
      likes: getRandomInteger(15, 200),
      comments: getRandomCommentsArray()
    };
    objectsArray.push(newObject);
  }
  return objectsArray;
}
