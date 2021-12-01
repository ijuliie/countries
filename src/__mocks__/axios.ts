const mockResponse = {
  data: [
    {
      name: "Afghanistan",
      population: 1542514,
      region: "Asia",
      capital: "Kabul"
    },
  ],
}

export default {
    get: jest.fn().mockResolvedValue(mockResponse)
}