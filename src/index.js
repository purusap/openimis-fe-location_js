import React from "react";
import HealthFacilityFullPath from "./components/HealthFacilityFullPath";
import messages_en from "./translations/en.json";
import reducer from "./reducer";

const DEFAULT_CONFIG = {
  "translations": [{ key: 'en', messages: messages_en }],
  "reducers": [{ key: 'location', reducer: reducer }],  
  "components": [
    {key: "location.HealthFacilityFullPath", component: HealthFacilityFullPath },
  ]
}

export const LocationModule = (cfg) => {
  return { ...DEFAULT_CONFIG, ...cfg };
}