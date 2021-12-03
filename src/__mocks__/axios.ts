const mockResponse = {
  data: [
    {
      name: "Brazil",
      flag: "https://flagcdn.com/br.svg",
      nativeName: "Brasil",
      population: 212559409,
      region: "Americas",
      subRegion: "South America",
      capital: "Brasília",
      topLevelDomain: ".br",
      currencies: [
        {
          code: "BRL",
          name: "Brazilian real",
          symbol: "RS"
        }
      ],
      languages: [
        {
          name: "Portuguese"
        }
      ],
      borders: ["ARG", "BOL", "COL"]
    }
  ]
}

export default {
  get: jest.fn().mockResolvedValue(mockResponse)
}