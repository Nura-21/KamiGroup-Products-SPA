import axios from "@/plugins/axios";
import { Product } from "@/models/product";
import { AxiosRequestConfig } from "axios";

class ProductApi {
  private async axiosCall<T>(config: AxiosRequestConfig): Promise<T> {
    const { data } = await axios.request(config);
    return data;
  }

  async getProducts(): Promise<Product[]> {
    return this.axiosCall<Product[]>({ method: "get", url: "/products" });
  }

  async getProduct(id: string): Promise<Product> {
    return this.axiosCall<Product>({ method: "get", url: `/products/${id}` });
  }

  async createProduct(data: Partial<Product>): Promise<Product> {
    return this.axiosCall<Product>({
      method: "post",
      url: "/products",
      data: data,
    });
  }

  async updateProduct(id: string, data: Partial<Product>): Promise<Product> {
    return this.axiosCall<Product>({
      method: "put",
      url: `/products/${id}`,
      data: data,
    });
  }

  async deleteProduct(id: string): Promise<void> {
    return this.axiosCall<void>({ method: "delete", url: `/products/${id}` });
  }
}

const productApi = new ProductApi();
export default productApi;
