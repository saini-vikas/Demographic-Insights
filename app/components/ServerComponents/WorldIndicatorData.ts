"use server";
import fetchIndicators from "./Indicator";
import { Indicator } from "./Indicator";

export type Data = {
  indicator: string;
  timeLabel: string;
  value: number;
};

export type WorldIndicatorDataResult = {
  data: Data[] | undefined;
  title: string | undefined;
  topicName: string | undefined;
  description: string | undefined;
  location: string | undefined;
  locationId: number | undefined;
};

export default async function fetchWorldIndicatorData(indicatorId: number, startYear?: number, endYear?: number) {
  const indicator = await fetchIndicators(indicatorId) as Indicator;
  const currentYear = new Date().getFullYear();
  const finalEndYear = endYear || currentYear;
  const finalStartYear = startYear || finalEndYear - 15; // default to last 15 years
  const countryId = 900; // World

  const url = `https://population.un.org/dataportalapi/api/v1/data/indicators/${indicatorId}/locations/${countryId}?startYear=${finalStartYear}&endYear=${finalEndYear}&sexes=3&variants=4`;

  const res = await fetch(url, {
    headers: {
      Authorization: `Bearer ${process.env.API_KEY}`,
      Accept: "application/json",
    },
    next: { revalidate: 3600 * 24 }, // Revalidate every 24 hours
    cache: "force-cache",
  });

  if (!res.ok) {
    throw new Error(`Failed to fetch world indicator data for ${indicatorId}`);
  }

  const response = await res.json();

  if (!indicator) {
    throw new Error("Failed to fetch indicators");
  }

  const dataList = (response.data || []).map((c: Data) => ({
    indicator: c.indicator,
    timeLabel: c.timeLabel,
    value: parseFloat(c.value.toString()),
  }));

  return {
    data: dataList,
    title: response.data?.[0]?.indicator || indicator.name,
    topicName: indicator.topicName,
    description: indicator.description,
    location: response.data?.[0]?.location || "World",
    locationId: response.data?.[0]?.locationId || countryId,
  };
}
