import axios from "@/plugins/axios";
import { City } from "@/models/city";
import { AxiosRequestConfig } from "axios";

class CityApi {
  private async axiosCall<T>(config: AxiosRequestConfig): Promise<T> {
    const { data } = await axios.request(config);
    return data;
  }

  async getCities(): Promise<City[]> {
    return this.axiosCall<City[]>({ method: "get", url: "/cities" });
  }

  async getCity(id: string): Promise<City> {
    return this.axiosCall<City>({ method: "get", url: `/cities/${id}` });
  }

  async createCity(data: Partial<City>): Promise<City> {
    return this.axiosCall<City>({
      method: "post",
      url: "/cities",
      data: data,
    });
  }

  async updateCity(id: string, data: Partial<City>): Promise<City> {
    return this.axiosCall<City>({
      method: "put",
      url: `/cities/${id}`,
      data: data,
    });
  }

  async deleteCity(id: string): Promise<void> {
    return this.axiosCall<void>({ method: "delete", url: `/cities/${id}` });
  }
}

const cityApi = new CityApi();
export default cityApi;
