export class Auth {
  constructor(axios, notifications) {
    this.axios = axios;
    this.notifications = notifications;

    this.axios.interceptors.request.use(
      (config) => {
        const token = this.token;
        if (token) {
          config.headers.authorization = `Bearer ${token}`;
        }

        return config;
      },
      (error) => Promise.reject(error)
    );
  }

  get token() {
    return localStorage.getItem("access_token");
  }

  async me(data) {
    return this.axios.get("/auth/me", data).then((response) => response.data);
  }

  async confirm(confirmation) {
    return this.axios
      .post("/auth/confirm", { confirmation })
      .then((response) => response.data);
  }

  async reset(payload) {
    return this.axios
      .post("/auth/reset", payload)
      .then((response) => response.data);
  }

  async password(payload) {
    return this.axios
      .post("/auth/password", payload)
      .then((response) => response.data);
  }

  async signIn(data) {
    return this.axios.post("/auth/sign-in", data).then(async (response) => {
      const payload = response.data;

      if (payload.ok) {
        localStorage.setItem("access_token", payload.data.access_token);
      }

      await this.fcm(this.notifications.token).catch((err) =>
        console.log("Can not save token: ", err)
      );

      return payload;
    });
  }

  async fcm(token) {
    if (!token) {
      return {};
    }

    return this.axios
      .post("/auth/fcm", { token, platform: "web" })
      .then((response) => response.data);
  }

  async signUp(data) {
    return this.axios.post("/auth/sign-up", data).then((response) => {
      const payload = response.data;

      if (payload.ok) {
        localStorage.setItem("access_token", payload.data.access_token);
      }

      return payload;
    });
  }
  async signOut(data) {
    return this.axios.delete("/auth/sign-out", { ...data, fcm: this.notifications.token }).then((response) => {
      localStorage.clear();
      return response.data;
    });
  }
}
