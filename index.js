const line = require('@line/bot-sdk');
const {
  getMoment,
  getWeekOfMonth,
  Monday,
  Tuesday,
  Wednesday,
  Thursday,
  Friday,
} = require('./utils/date');

const client = new line.Client({
  channelAccessToken: process.env.ACCESS_TOKEN
});

const info = {
  burnable: {
    message: '明日は燃やすゴミの日です',
    days: [Tuesday, Friday],
    weeks: [],
  },
  unburnable: {
    message: '明日は燃えないゴミの日です',
    days: [Wednesday],
    weeks: [],
  },
  recyclable: {
    message: '明日は資源ゴミの日です',
    days: [Monday],
    weeks: [2],
  },
  petbottoles: {
    message: '明日はペットボトル、ビン、缶の日です',
    days: [Thursday],
    weeks: [],
  },
};

// 曜日が合ってるか
const isDateDay = (date, days = []) => {
  return days.includes(date.day());
};

// 週が合ってるか
const isWeekDay = (date, weeks = []) => {
  const weekOfMonth = getWeekOfMonth(date);
  return weeks.length > 0 ? weeks.includes(weekOfMonth) : true;
};

// ゴミ出しの日か
const isTrashDay = (date, obj) => {
  return isDateDay(date, obj.days) && isWeekDay(date, obj.weeks);
};

// ゴミ出しの日だったら、メッセージを返す
const getMessage = date => {
  let message = '';
  Object.keys(info).forEach(key => {
    const obj = info[key];
    if (isTrashDay(date, obj)) {
      message = obj.message
    }
  });
  return message;
};

exports.handler = async event => {
  //明日がゴミ出し日かどうか
  const tomorrow = getMoment().add(1, 'days');
  const message = getMessage(tomorrow);

  if (message) {
    const postMessage = {
      type:'text',
      text: message,
    };

    try {
      await client.pushMessage(process.env.USER_ID, postMessage);
    } catch (error) {
      console.log(error)
    }

    return {
      statusCode: 200,
      body: JSON.stringify(postMessage)
    }
  }

  return {
    statusCode: 200
  }
};

