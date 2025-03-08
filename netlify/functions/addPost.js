const faunadb = require('faunadb'),
      q = faunadb.query;

const client = new faunadb.Client({ secret: process.env.FAUNADB_SECRET });

exports.handler = async (event, context) => {
  try {
    console.log("addPost invoked");
    const data = JSON.parse(event.body);
    console.log("Received data:", data);
    const result = await client.query(
      q.Create(q.Collection('Posts'), {
        data: {
          imageUrl: data.imageUrl,
          caption: data.caption,
          username: data.username,
          timestamp: Date.now(),
          type: "post",  // Required for the index
          comments: []
        }
      })
    );
    console.log("Post created:", result);
    return { statusCode: 200, body: JSON.stringify(result) };
  } catch (error) {
    console.error("Error in addPost:", error);
    return { statusCode: 400, body: JSON.stringify(error) };
  }
};


