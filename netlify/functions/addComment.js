let comments = global.comments || {};
if (!global.comments) {
  global.comments = comments;
}
exports.handler = async function(event, context) {
  const data = JSON.parse(event.body);
  const postId = data.postId;
  const comment = { text: data.text, timestamp: Date.now() };
  if (!comments[postId]) {
    comments[postId] = [];
  }
  comments[postId].push(comment);
  return {
    statusCode: 200,
    body: JSON.stringify({ message: 'Comment added', comment })
  };
};
