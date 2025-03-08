const faunadb = require('faunadb'),
      q = faunadb.query;

const client = new faunadb.Client({ secret: process.env.FAUNADB_SECRET });

exports.handler = async (event, context) => {
  try {
    const data = JSON.parse(event.body);
    // data.postId should be the FaunaDB document ID for the post.
    const postRef = q.Ref(q.Collection('Posts'), data.postId);
    // Update the post by appending the new comment to the comments array.
    const result = await client.query(
      q.Update(postRef, {
        data: {
          comments: q.Append(
            [{ text: data.text, username: data.username, timestamp: Date.now() }],
            q.Select(["data", "comments"], q.Get(postRef))
          )
        }
      })
    );
    return { statusCode: 200, body: JSON.stringify(result) };
  } catch (error) {
    return { statusCode: 400, body: JSON.stringify(error) };
  }
};

