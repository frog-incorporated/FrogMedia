const faunadb = require('faunadb'),
      q = faunadb.query;

const client = new faunadb.Client({ secret: process.env.FAUNADB_SECRET });

exports.handler = async (event, context) => {
  try {
    // Use the index 'all_posts_by_date' you created (with term: data.type, value: data.timestamp descending)
    const result = await client.query(
      q.Paginate(q.Match(q.Index('all_posts_by_date')))
    );
    // Retrieve full documents for each post
    const posts = await client.query(
      q.Map(result.data, ref => q.Get(ref))
    );
    return { statusCode: 200, body: JSON.stringify(posts) };
  } catch (error) {
    return { statusCode: 400, body: JSON.stringify(error) };
  }
};

