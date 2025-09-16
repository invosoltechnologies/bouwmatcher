export interface Stat {
  id: string
  value: string
  numericValue: number
  description: string
}

export const statsData: Stat[] = [
  {
    id: "1",
    value: "10.000+",
    numericValue: 10000,
    description: "Projecten voltooid",
  },
  {
    id: "2",
    value: "4.98",
    numericValue: 4.98,
    description: "Gemiddelde beoordeling",
  },
  {
    id: "3",
    value: "2.000+",
    numericValue: 2000,
    description: "Geverifieerde professionals",
  },
  {
    id: "4",
    value: "<24h",
    numericValue: 24,
    description: "Gemiddelde responstijd",
  },
]