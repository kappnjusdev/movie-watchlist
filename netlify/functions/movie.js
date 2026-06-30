export const handler = async (event) => {
  const { i } = event.queryStringParameters ?? {};

  if (!i) {
    return { statusCode: 400, body: JSON.stringify({ error: "Missing movie ID" }) };
  }

  const res = await fetch(
    `https://www.omdbapi.com/?apikey=${process.env.OMDB_API_KEY}&i=${i}`,
  );
  const data = await res.json();

  return {
    statusCode: 200,
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  };
};
