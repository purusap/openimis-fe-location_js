import { graphql } from "@openimis/fe-core";

export function fetchHealthFacilityFullPath(hfid) {
  let payload = `
      {
        healthFacilityFullPath(hfId:${hfid})
        {
            hfId,hfCode, hfName, hfLevel, regionId, regionCode, regionName, districtId, districtCode, districtName
        }
      }
    `
  return graphql(payload, 'LOCATION_HEALTH_FACILITY_FULL_PATH');
}
