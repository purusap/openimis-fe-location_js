import { graphql, decodeId, formatQuery, formatPageQuery } from "@openimis/fe-core";

export function fetchHealthFacilityFullPath(hfid) {
  let payload = formatQuery("healthFacilityFullPath",
    [`hfId:${decodeId(hfid)}`],
    ["hfId", "hfCode", "hfName", "hfLevel",
      "regionId", "regionCode", "regionName",
      "districtId", "districtCode", "districtName"]
  );
  return graphql(payload, 'LOCATION_HEALTH_FACILITY_FULL_PATH');
}

export function fetchHealthFacilities(mm, str) {
  let payload = formatPageQuery("healthFacilitiesStr",
    !!str && str.length && [`str:"${str}"`],
    mm.getRef("location.HealthFacilityPicker.projection")
  );
  return graphql(payload, 'LOCATION_HEALTH_FACILITIES');
}

export function fetchDistricts(mm, str) {
  let payload = formatPageQuery("locationsStr",
    [`tpe: "D"`, !!str && str.length && `str:"${str}"`],
    mm.getRef("location.DistrictPicker.projection")
  );
  return graphql(payload, 'LOCATION_DISTRICTS');
}

export function fetchRegions(mm, str) {
  let payload = formatPageQuery("locationsStr",
    [`tpe: "R"`, !!str && str.length && `str:"${str}"`],
    mm.getRef("location.RegionPicker.projection")
  );
  return graphql(payload, 'LOCATION_REGIONS');
}
