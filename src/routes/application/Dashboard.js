import React from "react";

import { PaymentsFeed } from "../../components/feed/PaymentsFeed";
import { Balance } from "../../containers/dashboard/Balance";
import { isUser } from "../../guards";
import { useTransactions } from "../../hooks/dashboard";

export function Dashboard() {
  const { data, isLoading } = useTransactions();

  return (
    <>
      <Balance />
      <PaymentsFeed loading={isLoading} list={data} />
    </>
  );
}

export default isUser({ redirect: "/u/sign-in" })(Dashboard);
