const IS_PRODUCTION = true;
export const constants = {
  IS_DEVELOPMENT: !IS_PRODUCTION,
  mqttSubsribeTopic: (restaurantId: string) => `${restaurantId}/order/#`,
};
