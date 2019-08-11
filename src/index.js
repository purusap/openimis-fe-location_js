import React from "react";
import HealthFacilityFullPath from "./components/HealthFacilityFullPath";
import HealthFacilitySelect from "./components/HealthFacilitySelect";
import RegionSelect from "./components/RegionSelect";
import DistrictSelect from "./components/DistrictSelect";
import messages_en from "./translations/en.json";
import reducer from "./reducer";

const DEFAULT_CONFIG = {
  "translations": [{ key: 'en', messages: messages_en }],
  "reducers": [{ key: 'location', reducer: reducer }],  
  "refs": [
    {key: "location.HealthFacilityFullPath", ref: HealthFacilityFullPath },
    {key: "location.HealthFacilitySelect", ref: HealthFacilitySelect },
    {key: "location.RegionSelect", ref: RegionSelect },
    {key: "location.DistrictSelect", ref: DistrictSelect },
    {key: "location.HEALTH_FACILITY_ID_TYPE", ref: "HealthFacilityGQLType"},
    {key: "location.LOCATION_ID_TYPE", ref: "LocationGQLType"},
  ]
}

export const LocationModule = (cfg) => {
  return { ...DEFAULT_CONFIG, ...cfg };
}