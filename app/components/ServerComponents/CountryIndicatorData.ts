"use server";
import fetchIndicators from "./Indicator";
import { Indicator } from "./Indicator";

export type Data = {
  indicator: string;
  timeLabel: string;
  value: number;
  ageLabel?: string;
  ageStart?: number;
  sexLabel?: string;
  sexId?: number;
};

export type CountryIndicatorDataResult = {
  data: Data[] | undefined;
  title: string | undefined;
  topicName: string | undefined;
  description: string | undefined;
  location: string | undefined;
  locationId: number | undefined;
};

export default async function fetchCountryIndicatorData(
  indicatorId: number,
  countryId: number,
  startYear?: number,
  endYear?: number,
) {
  const indicator = (await fetchIndicators(indicatorId)) as Indicator;
  const currentYear = new Date().getFullYear();
  const finalEndYear = endYear || currentYear;
  const finalStartYear = startYear || finalEndYear - 15; // default to last 15 years

  // Use sexes=1,2 for indicator 71 (PopAgeSexPct) to get male/female breakdown
  const sexes = indicatorId === 71 ? "1,2" : "3";
  const url = `https://population.un.org/dataportalapi/api/v1/data/indicators/${indicatorId}/locations/${countryId}?startYear=${finalStartYear}&endYear=${finalEndYear}&sexes=${sexes}&variants=4`;

  const res = await fetch(url, {
    headers: {
      Authorization: `Bearer ${process.env.API_KEY}`,
      Accept: "application/json",
    },
    next: { revalidate: 3600 * 24 }, // Revalidate every 24 hours
    cache: "force-cache",
  });

  if (!res.ok) {
    throw new Error(`Failed to fetch country indicator data for ${indicatorId}`);
  }

  const response = await res.json();

  if (!indicator) {
    throw new Error("Failed to fetch indicators");
  }

  const ageGroup = ["0-4", "5-14", "15-24", "25-49", "50+"];

  // Filter for broad age groups if it's indicator 71
  const rawData = response.data || [];
  const filteredData =
    indicatorId === 71
      ? rawData.filter((c: Data) =>
          c.ageLabel ? ageGroup.includes(c.ageLabel) : false,
        )
      : rawData;

  const dataList = filteredData.map((c: Data) => ({
    indicator: c.indicator,
    timeLabel: c.timeLabel,
    value: parseFloat(c.value.toString()),
    ageLabel: c.ageLabel,
    ageStart: c.ageStart,
    sexLabel: c.sexLabel,
    sexId: c.sexId,
  }));

  return {
    data: dataList,
    title: response.data?.[0]?.indicator || indicator.name,
    topicName: indicator.topicName,
    description: indicator.description,
    location: response.data?.[0]?.location || "Unknown Location",
    locationId: response.data?.[0]?.locationId || countryId,
  };
}
