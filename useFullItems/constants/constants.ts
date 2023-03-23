const IS_PRODUCTION = false;
export const constants = {
  IS_DEVELOPMENT: !IS_PRODUCTION,
  mqttSubsribeTopic: (restaurantId: string) => `${restaurantId}/order/#`,
};
