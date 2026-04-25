export type Country = {
    id: number,
    name: string,
    ios2: string,
    ios3: string,
    latitude: number,
    longitude: number,
}

export default async function fetchCountries() {
    const res = await fetch(
        "https://population.un.org/dataportalapi/api/v1/locations?pageSize=300",
        {
            headers: {
                "Authorization": `Bearer ${process.env.API_KEY}`,
            },
            cache: "force-cache", // or "no-store" if you want always fresh data
        }
    )

    if (!res.ok) {
        throw new Error("Failed to fetch countries")
    }

    const response = await res.json()

    const countries = response.data.map((c: Country) => ({
        id: c.id,
        name: c.name,

    }))

    return countries
}