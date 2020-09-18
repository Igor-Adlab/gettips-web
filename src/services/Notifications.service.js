export class Notifications {
  constructor(axios) {
    this.axios = axios;
  }

  async transactions(data) {
    return this.axios
      .get("/notifications/transactions", data)
      .then((response) => response.data.data);
  }
}
