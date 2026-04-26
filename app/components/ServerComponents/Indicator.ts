"use server";

type Indicator = {
  id: number;
  name: string;
  shortName: string;
};

export default async function fetchIndicators() {
  const indicators_list = [19, 51, 49, 54, 76, 72, 22, 66, 67];
  const res = await fetch(
    "https://population.un.org/dataportalapi/api/v1/indicators",
    {
      headers: {
        Authorization: `Bearer ${process.env.API_KEY}`,
      },
      cache: "force-cache", // or "no-store" if you want always fresh data
    },
  );

  if (!res.ok) {
    throw new Error("Failed to fetch indicators");
  }

  const response = await res.json();

  const indicators = response.data.map((c: Indicator) => ({
    id: c.id,
    name: c.name,
  }));
  return indicators;
}
