export class Payout {
  constructor(axios) {
    this.axios = axios;
  }

  async initialize(data) {
    return this.axios.post("/payout", data).then((response) => response.data);
  }

  async info(payout) {
    return this.axios
      .get(`/payout/${payout}`)
      .then((response) => response.data);
  }

  async preview(data) {
    return this.axios
      .post("/payout/preview", data)
      .then((response) => response.data);
  }

  async confirm(data) {
    return this.axios
      .post("/payout/confirm", data)
      .then((response) => response.data);
  }
}
