"use server";

export type Data = {
  indicator: string;
  timeLabel: string;
  value: number;
};

export type TotalDeath = {
  data: Data[] | undefined;
  title: string | undefined;
  description: string | undefined;
  location: string | undefined;
  locationId: number | undefined;
};

export default async function fetchTotalDeath(countryId: number) {
  const yearOffset = 1;
  const endYear = new Date().getFullYear();
  const startYear = endYear - yearOffset;
  const url = `https://population.un.org/dataportalapi/api/v1/data/indicators/60/locations/${countryId}?startYear=${startYear}&endYear=${endYear}&sexes=3&variants=4`;

  const res = await fetch(url, {
    headers: {
      Authorization: `Bearer ${process.env.API_KEY}`,
      Accept: "application/json",
    },
    next: { revalidate: 3600 * 24 }, // Revalidate every 24 hours
    cache: "force-cache", // or "no-store" if you want always fresh data
  });

  if (!res.ok) {
    throw new Error("Failed to fetch total population data");
  }

  const response = await res.json();

  const totalDeath = response.data.map((c: Data) => ({
    indicator: c.indicator,
    timeLabel: c.timeLabel,
    value: parseFloat(c.value.toString()),
  }));
  return {
    data: totalDeath,
    title: response.data[0]?.indicator,
    description: response.data[0]?.indicatorDisplayName,
    location: response.data[0]?.location,
    locationId: response.data[0]?.locationId,
  };
}
