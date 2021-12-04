const mockResponse = {
  data: [
    {
      name: {
        common: "Brazil",
        nativeName: {
          por: {
            offical: "República Federativa do Brasil"
          }
        }
      },
      flags: {
        png: "https://flagcdn.com/br.png"
      },
      population: 212559409,
      region: "Americas",
      subregion: "South America",
      capital: "Brasília",
      tld: [".br"],
      currencies: {
        BRL: {
          name: "Brazilian real"
        }
      },
      languages: {
        por: "Portuguese"
      },
      borders: ["ARG", "BOL", "COL"]
    }
  ]
}

export default {
  get: jest.fn().mockResolvedValue(mockResponse)
}