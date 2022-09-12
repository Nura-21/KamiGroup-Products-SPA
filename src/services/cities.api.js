import axios from "@/plugins/axios";

class CityApi {
  async axiosCall(config) {
    const { data } = await axios.request(config);
    return data;
  }

  async getCities() {
    return this.axiosCall({ method: "get", url: "/cities" });
  }

  async getCity(id) {
    return this.axiosCall({ method: "get", url: `/cities/${id}` });
  }

  async createCity(data) {
    return this.axiosCall({
      method: "post",
      url: "/cities",
      data: data,
    });
  }

  async updateCity(id, data) {
    return this.axiosCall({
      method: "put",
      url: `/cities/${id}`,
      data: data,
    });
  }

  async deleteCity(id) {
    return this.axiosCall({ method: "delete", url: `/cities/${id}` });
  }
}

const cityApi = new CityApi();
export default cityApi;
