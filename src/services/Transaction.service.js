export class Transaction {
  constructor(axios) {
    this.axios = axios;
  }

  async create(data) {
    return this.axios.post("/tips", data).then((response) => response.data);
  }

  async qr(data) {
    return this.axios.post("/tips/qr", data).then((response) => response.data);
  }

  async status(params) {
    return this.axios
      .get("/tips/status", { params })
      .then((response) => response.data);
  }

  async find(intent) {
    return this.axios
      .get(`/tips/find/${intent}`)
      .then((response) => response.data);
  }
}
