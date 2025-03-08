const faunadb = require('faunadb'),
      q = faunadb.query;

const client = new faunadb.Client({ secret: process.env.FAUNADB_SECRET });

exports.handler = async (event, context) => {
  try {
    const data = JSON.parse(event.body);
    // Create a post document with a dummy "type" field for indexing and an empty comments array
    const result = await client.query(
      q.Create(q.Collection('Posts'), {
        data: {
          imageUrl: data.imageUrl,
          caption: data.caption,
          username: data.username,
          timestamp: Date.now(),
          type: "post",
          comments: []
        }
      })
    );
    return { statusCode: 200, body: JSON.stringify(result) };
  } catch (error) {
    return { statusCode: 400, body: JSON.stringify(error) };
  }
};

