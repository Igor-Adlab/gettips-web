export class Fmc {
  constructor(messaging) {
    this.messaging = messaging;

    if ("Notification" in window) {
      this.subscribe();
    }
  }

  subscribe() {
    this.messaging
      .requestPermission()
      .then(() => {
        // получаем ID устройства
        this.messaging
          .getToken()
          .then((token) => {
            this.token = token;
            console.log({ token });
          })
          .catch((err) =>
            console.warn("При получении токена произошла ошибка.", err)
          );
      })
      .catch((err) =>
        console.warn(
          "Не удалось получить разрешение на показ уведомлений.",
          err
        )
      );
  }
}
