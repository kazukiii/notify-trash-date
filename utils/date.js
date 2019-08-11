const moment = require('moment-timezone');

moment.tz('Asia/Tokyo').locale('ja');

const Monday = 1;
const Tuesday = 2;
const Wednesday = 3;
const Thursday = 4;
const Friday = 5;
const Saturday = 6;
const Sunday = 7;

// 今日
const getMoment = (date = new Date()) => {
  return moment(date)
    .tz('Asia/Tokyo')
    .locale('ja');
};

// 何番目の週か
const getWeekOfMonth = (date) => {
  return Math.ceil(date.date() / 7);
};

module.exports = {
  Monday,
  Tuesday,
  Wednesday,
  Thursday,
  Friday,
  Saturday,
  Sunday,
  getMoment,
  getWeekOfMonth,
};
