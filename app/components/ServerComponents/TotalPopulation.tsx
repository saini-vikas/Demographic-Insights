
export type TotalPopulation = {
    indicator: string,
    location: string,
    timeLabel: string,
    value: number,
}

export default async function fetchTotalPopulation() {

    const res = await fetch(
        "https://population.un.org/dataportalapi/api/v1/data/indicators/49/locations/356?startYear=2010&endYear=2026&sexes=3",
        {
            headers: {
                "Authorization": `Bearer ${process.env.API_KEY}`,
                "Accept": "application/json",
            },
            cache: "force-cache", // or "no-store" if you want always fresh data
        }
    )

    if (!res.ok) {
        throw new Error("Failed to fetch total population data")
    }

    const response = await res.json()

    const totalPopulation = response.data.map((c: TotalPopulation) => ({
        indicator: c.indicator,
        location: c.location,
        timeLabel: c.timeLabel,
        Population: c.value / 10000000,

    }))
    return totalPopulation
}