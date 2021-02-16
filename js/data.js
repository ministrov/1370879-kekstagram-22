
// Необходимо написать функцию для создания массива из 25 сгенерированных объектов.
//  Каждый объект массива — описание фотографии, опубликованной пользователем.
import { getRandomInteger,getRandomArrayEl } from './util.js';

const SIMILAR_OBJECTS_QUANTITY = 25;
const AUTHOR_NAME = [
  'Артём',
  'Андрей',
  'Егор',
  'Максим',
  'Роман',
]
const DESCRIPTION = [
  'Описание 1',
  'Описание 2',
  'Описание 3',
  'Описание 4',
]
const MESSAGE = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!',
]

const LIKES = getRandomInteger(15, 200);

const getAvatarLink = function () {
  return `img/avatar-${getRandomInteger(1, 6)}.svg`
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
      message: getRandomArrayEl(MESSAGE, 0, 5),
      name: getRandomArrayEl(AUTHOR_NAME, 0, 4),
    };
    commentsArr.push(newComment);
  }
  return commentsArr;
}

let objectsArray;

const getRandomObjectsArray = function () {
  objectsArray = [];
  for (let i = 0; i < SIMILAR_OBJECTS_QUANTITY; i++) {
    const newObject = {
      id: i + 1,
      url: `photos/${i + 1}.jpg`,
      description: getRandomArrayEl(DESCRIPTION, 0, DESCRIPTION.length),
      likes: LIKES,
      comments: getRandomCommentsArray(),
    };
    objectsArray.push(newObject);
  }
  return objectsArray;
}

getRandomObjectsArray();

export default objectsArray;
