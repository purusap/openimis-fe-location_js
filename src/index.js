import React from "react";
import HealthFacilityFullPath from "./components/HealthFacilityFullPath";
import HealthFacilityPicker from "./components/HealthFacilityPicker";
import RegionPicker from "./components/RegionPicker";
import DistrictPicker from "./components/DistrictPicker";
import messages_en from "./translations/en.json";
import reducer from "./reducer";

const DEFAULT_CONFIG = {
  "translations": [{ key: 'en', messages: messages_en }],
  "reducers": [{ key: 'loc', reducer: reducer }], // location is the default used by syncHistoryWithStore...
  "refs": [
    {key: "location.HealthFacilityFullPath", ref: HealthFacilityFullPath },
    {key: "location.HealthFacilityPicker", ref: HealthFacilityPicker },
    {key: "location.HealthFacilityPicker.projection", ref: ["id", "code", "name"] },
    {key: "location.RegionPicker", ref: RegionPicker },
    {key: "location.RegionPicker.projection", ref: ["id", "code", "name"] },
    {key: "location.DistrictPicker", ref: DistrictPicker },
    {key: "location.DistrictPicker.projection", ref: ["id", "code", "name"] },
  ]
}

export const LocationModule = (cfg) => {
  return { ...DEFAULT_CONFIG, ...cfg };
}