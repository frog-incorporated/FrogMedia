let comments = global.comments || {};
exports.handler = async function(event, context) {
  const postId = event.queryStringParameters.postId;
  return {
    statusCode: 200,
    body: JSON.stringify(comments[postId] || [])
  };
};
