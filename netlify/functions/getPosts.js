const faunadb = require('faunadb'),
      q = faunadb.query;

const client = new faunadb.Client({ 
  secret: process.env.FAUNADB_SECRET,
  headers: { "X-FaunaDB-API-Version": "3" }
});

exports.handler = async (event, context) => {
  try {
    console.log("getPosts invoked");
    // Query using your index; ensure your index is named 'all_posts_by_date'
    const result = await client.query(
      q.Paginate(q.Match(q.Index('all_posts_by_date')))
    );
    console.log("Index result:", result);
    const posts = await client.query(
      q.Map(result.data, ref => q.Get(ref))
    );
    console.log("Posts retrieved:", posts);
    return { statusCode: 200, body: JSON.stringify(posts) };
  } catch (error) {
    console.error("Error in getPosts:", error);
    return { statusCode: 400, body: JSON.stringify(error) };
  }
};




