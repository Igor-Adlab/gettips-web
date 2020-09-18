import { useContext } from "react";

import { ServiceContext } from "../context/Service";

export function useService(service) {
  const services = useContext(ServiceContext);

  return services[service];
}
