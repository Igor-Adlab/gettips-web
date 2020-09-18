export class Cards {
  constructor(axios) {
    this.axios = axios;
  }

  async load(data) {
    return this.axios
      .get("/cards", data)
      .then((response) => response.data.data);
  }

  async create(data) {
    return this.axios.post("/cards", data).then((response) => response.data);
  }

  async edit({ id, card }) {
    return this.axios
      .post(`/cards/${id}`, card)
      .then((response) => response.data);
  }

  async remove({ id }) {
    return this.axios.delete(`/cards/${id}`).then((response) => response.data);
  }
}
