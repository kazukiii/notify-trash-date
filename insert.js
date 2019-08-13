const AWS = require('aws-sdk');
const dynamo = new AWS.DynamoDB.DocumentClient({region: "ap-northeast-1"});

exports.handler = async event => {
  const eventType = event.events[0].type;
  const userId = event.events[0].source.userId;
  const timestamp = event.events[0].timestamp;

  switch (eventType) {
    case 'follow':
      const putOption = {
        TableName: 'users',
        Item: {
          user_id: userId,
          timestamp,
        }
      };

      try {
        await dynamo.put(putOption).promise();
      } catch (err) {
        console.log(err);
      }

      break;
  }

  return {
    statusCode: 200
  }
};
