const faunadb = require('faunadb'),
      q = faunadb.query;

const client = new faunadb.Client({ 
  secret: process.env.FAUNADB_SECRET,
  headers: { "X-FaunaDB-API-Version": "3" }
});

exports.handler = async (event, context) => {
  try {
    console.log("addComment invoked");
    const data = JSON.parse(event.body);
    console.log("Received comment data:", data);
    // data.postId is the document ID of the post in the Posts collection.
    const postRef = q.Ref(q.Collection('Posts'), data.postId);
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
    console.log("Comment added:", result);
    return { statusCode: 200, body: JSON.stringify(result) };
  } catch (error) {
    console.error("Error in addComment:", error);
    return { statusCode: 400, body: JSON.stringify(error) };
  }
};



