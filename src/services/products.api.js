import axios from "@/plugins/axios";

class ProductApi {
  async axiosCall(config) {
    const { data } = await axios.request(config);
    return data;
  }

  async getAllProducts() {
    return this.axiosCall({ method: "get", url: "/products" });
  }

  async getProductsPage(page, limit) {
    return this.axiosCall({
      method: "get",
      url: "/products",
      params: { page: page, limit: limit },
    });
  }

  async getProductsWithFilterCount(searchQuery) {
    return this.axiosCall({
      method: "get",
      url: "/products",
      params: { search: searchQuery },
    });
  }

  async getProductsPageWithFilter(searchQuery, page, limit) {
    return this.axiosCall({
      method: "get",
      url: "/products",
      params: { search: searchQuery, page: page, limit: limit },
    });
  }

  async getProduct(id) {
    return this.axiosCall({ method: "get", url: `/products/${id}` });
  }

  async createProduct(data) {
    return this.axiosCall({
      method: "post",
      url: "/products",
      data: data,
    });
  }

  async updateProduct(id, data) {
    return this.axiosCall({
      method: "put",
      url: `/products/${id}`,
      data: data,
    });
  }

  async deleteProduct(id) {
    return this.axiosCall({ method: "delete", url: `/products/${id}` });
  }
}

const productApi = new ProductApi();
export default productApi;
