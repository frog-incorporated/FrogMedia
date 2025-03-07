let posts = global.posts || [];
exports.handler = async function(event, context) {
  return {
    statusCode: 200,
    body: JSON.stringify(posts)
  };
};
