"use server";

export type Indicator = {
  id: number;
  name: string;
  shortName: string;
  description: string;
  topicName: string;
};

export default async function fetchIndicators(indicator_id?: number) {
  const indicators_list = [60, 72, 49, 54, 50, 58, 71, 65, 61, 67];

  let res;
  if (indicator_id) {
    console.log(
      `https://population.un.org/dataportalapi/api/v1/indicators/${indicator_id}`,
    );

    res = await fetch(
      `https://population.un.org/dataportalapi/api/v1/indicators/${indicator_id}`,
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
    if (response && response.length > 0) {
      const c = response[0];
      return {
        id: c.id,
        name: c.name,
        shortName: c.shortName,
        description: c.description,
        topicName: c.topicName,
      } as Indicator;
    }
    return null;
  } else {
    res = await fetch(
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

    const indicators = response.data
      .filter((c: Indicator) => indicators_list.includes(c.id))
      .map((c: Indicator) => ({
        id: c.id,
        name: c.name,
        shortName: c.shortName,
        description: c.description,
        topicName: c.topicName,
      }));

    return indicators;
  }
}
