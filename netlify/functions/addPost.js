let posts = global.posts || [];
if (!global.posts) {
  global.posts = posts;
}
exports.handler = async function(event, context) {
  const data = JSON.parse(event.body);
  data.id = Date.now().toString();
  data.timestamp = Date.now();
  posts.push(data);
  return {
    statusCode: 200,
    body: JSON.stringify({ message: 'Post added', post: data })
  };
};
