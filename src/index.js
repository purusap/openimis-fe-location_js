import React from "react";
import UserHealthFacility from "./components/UserHealthFacility";
import HealthFacilityFullPath from "./components/HealthFacilityFullPath";
import HealthFacilityPicker from "./pickers/HealthFacilityPicker";
import HealthFacilityLevelPicker from "./pickers/HealthFacilityLevelPicker";
import RegionPicker from "./pickers/RegionPicker";
import DistrictPicker from "./pickers/DistrictPicker";
import messages_en from "./translations/en.json";
import reducer from "./reducer";

const DEFAULT_CONFIG = {
  "translations": [{ key: 'en', messages: messages_en }],
  "reducers": [{ key: 'loc', reducer: reducer }], // location is the default used by syncHistoryWithStore...
  "refs": [
    { key: "location.HealthFacilityFullPath", ref: HealthFacilityFullPath },
    { key: "location.HealthFacilityPicker", ref: HealthFacilityPicker },
    { key: "location.HealthFacilityPicker.projection", ref: ["id", "code", "name"] },
    { key: "location.HealthFacilityLevelPicker", ref: HealthFacilityLevelPicker },
    { key: "location.HealthFacilityLevelPicker.projection", ref: null },
    { key: "location.RegionPicker", ref: RegionPicker },
    { key: "location.RegionPicker.projection", ref: ["id", "code", "name"] },
    { key: "location.DistrictPicker", ref: DistrictPicker },
    { key: "location.DistrictPicker.projection", ref: ["id", "code", "name"] },
  ],
  "core.Boot": [UserHealthFacility],
  "location.HealthFacilityGQLType": "HealthFacilityGQLType"
}

export const LocationModule = (cfg) => {
  return { ...DEFAULT_CONFIG, ...cfg };
}