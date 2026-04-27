"use server";

export type Data = {
  indicator: string;
  timeLabel: string;
  ageLabel?: string;
  ageStart?: number;
  sexLabel?: string;
  sexId?: number;
  value: number;
};

export type PopAgeSexPct = {
  data: Data[] | undefined;
  title: string | undefined;
  description: string | undefined;
  location: string | undefined;
  locationId: number | undefined;
};

export default async function fetchPopAgeSexPct(countryId: number) {
  const ageGroup = ["0-4", "5-14", "15-24", "25-49", "50+"];
  const yearOffset = 0;
  const endYear = new Date().getFullYear();
  const startYear = endYear - yearOffset;
  const url = `https://population.un.org/dataportalapi/api/v1/data/indicators/71/locations/${countryId}?startYear=${startYear}&endYear=${endYear}&sexes=1,2&variants=4`;

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
  const filteredData = response.data.filter((c: Data) =>
    c.ageLabel ? ageGroup.includes(c.ageLabel) : false
  );

  const popAgeSexPct = filteredData.map((c: Data) => ({
    indicator: c.indicator,
    timeLabel: c.timeLabel,
    ageLabel: c.ageLabel,
    ageStart: c.ageStart,
    sexLabel: c.sexLabel,
    sexId: c.sexId,
    value: parseFloat(c.value.toString()),
  }));
  return {
    data: popAgeSexPct,
    title: filteredData[0]?.indicator,
    description: filteredData[0]?.indicatorDisplayName,
    location: filteredData[0]?.location,
    locationId: filteredData[0]?.locationId,
  };
}
