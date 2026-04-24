type Country = {
    name: {
        common: string
    }
    cca2: string
    region: string
}

export default async function fetchCountries() {
    const res = await fetch(
        "https://restcountries.com/v3.1/all?fields=name,cca2,region",
        {
            cache: "force-cache", // or "no-store" if you want always fresh data
        }
    )

    if (!res.ok) {
        throw new Error("Failed to fetch countries")
    }

    const data: Country[] = await res.json()

    const countries = data.map((c) => ({
        code: c.cca2.toLowerCase(),
        label: c.name.common,
        value: c.name.common.toLowerCase().replace(/\s/g, "-"),
        continent: c.region,
    }))

    return countries
}