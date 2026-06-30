export const handler = async (event) => {
  const { s } = event.queryStringParameters ?? {};

  if (!s) {
    return { statusCode: 400, body: JSON.stringify({ error: "Missing search query" }) };
  }

  const res = await fetch(
    `https://www.omdbapi.com/?apikey=${process.env.OMDB_API_KEY}&s=${encodeURIComponent(s)}&type=movie&plot=short`,
  );
  const data = await res.json();

  return {
    statusCode: 200,
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  };
};
