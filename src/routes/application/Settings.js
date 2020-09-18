import { Typography, message } from "antd";
import React from "react";
import { useFela } from "react-fela";

import { PasswordForm } from "../../components/auth/PasswordForm";
import { isUser } from "../../guards";
import { useChangePassword } from "../../hooks/user";

const styles = {
  page: {
    padding: "15px",
  },
};

export function Settings() {
  const { css } = useFela();

  const [changePassword, { isLoading }] = useChangePassword({
    onError: (err) => message.error(err.message || err),
    onSuccess: () => message.success("Password changed!"),
  });

  const onUpdatePassword = (request) => changePassword(request);

  return (
    <div className={css(styles.page)}>
      <Typography.Title level={4}>Change password</Typography.Title>
      <PasswordForm loading={isLoading} onSubmit={onUpdatePassword} />
    </div>
  );
}

export default isUser({ redirect: "/u/sign-in" })(Settings);
