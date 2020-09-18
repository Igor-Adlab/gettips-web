import { Modal, Spin, message } from "antd";
import React, { lazy } from "react";
import { Route, Switch, useRouteMatch } from "react-router-dom";

import { PhoneConfirmationForm } from "../../components/auth/PhoneConfirmationForm";
import { useUser } from "../../hooks";
import { useConfirmPhone } from "../../hooks/user";

const Cards = lazy(() => import("./Cards"));
const Settings = lazy(() => import("./Settings"));
const Dashboard = lazy(() => import("./Dashboard"));
const SaveCard = lazy(() => import("./cards/SaveCard"));

export default function Application() {
  const { path } = useRouteMatch();
  const { confirmation, loading } = useUser();

  const [confirm, { isLoading }] = useConfirmPhone({
    onSuccess: () => {
      message.success("Phone confirmed!");
      setTimeout(() => location.reload(), 1300);
    },
  });

  const onConfirmPhone = (data) => confirm(data);

  if (loading) {
    return <Spin />;
  }

  return (
    <>
      <Switch>
        <Route path={`${path}`} exact component={Dashboard} />
        <Route path={`${path}/settings`} component={Settings} />
      </Switch>
      <Modal
        destroyOnClose
        closable={false}
        footer={false}
        title="Confirm phone"
        visible={confirmation}
      >
        <PhoneConfirmationForm
          loading={isLoading}
          confirmation={confirmation}
          onSubmit={onConfirmPhone}
        />
      </Modal>
    </>
  );
}
