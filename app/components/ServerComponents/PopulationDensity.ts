"use server";
import fetchIndicators from "./Indicator";
import { Indicator } from "./Indicator";
export type Data = {
  indicator: string;
  timeLabel: string;
  value: number;
};

export type PopulationDensity = {
  data: Data[] | undefined;
  title: string | undefined;
  topicName: string | undefined;
  description: string | undefined;
  location: string | undefined;
  locationId: number | undefined;
};

export default async function fetchPopulationDensity(countryId: number) {
  const indicatorId = 54;
  const indicator: Indicator = await fetchIndicators(indicatorId);
  const yearOffset = 10;
  const endYear = new Date().getFullYear();
  const startYear = endYear - yearOffset;
  const url = `https://population.un.org/dataportalapi/api/v1/data/indicators/${indicatorId}/locations/${countryId}?startYear=${startYear}&endYear=${endYear}&sexes=3&variants=4`;

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

  if (!indicator) {
    throw new Error("Failed to fetch indicators");
  }

  const populationDensity = response.data.map((c: Data) => ({
    indicator: c.indicator,
    timeLabel: c.timeLabel,
    value: parseFloat(c.value.toString()),
  }));
  return {
    data: populationDensity,
    title: response.data[0]?.indicator,
    topicName: indicator.topicName,
    description: indicator.description,
    location: response.data[0]?.location,
    locationId: response.data[0]?.locationId,
  };
}
