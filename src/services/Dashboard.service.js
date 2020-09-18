export class Dashboard {
  constructor(axios) {
    this.axios = axios;
  }

  async balance(data) {
    return this.axios
      .get("/dashboard/balance", data)
      .then((response) => response.data.data);
  }
}
