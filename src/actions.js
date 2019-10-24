import { graphql, formatQuery, formatPageQuery } from "@openimis/fe-core";

export function fetchUserDistricts() {
  let payload = formatQuery("userDistricts",
    null,
    ["id", "uuid", "code", "name",
      "regionId", "regionUuid", "regionCode", "regionName"]
  );
  return graphql(payload, 'LOCATION_USER_DISTRICTS');
}

function healthFacilityFullPath(key, mm, id) {
  let payload = formatPageQuery("healthFacilities",
    [`id: "${id}"`],
    mm.getRef("location.HealthFacilityPicker.projection")
  );
  return graphql(payload, key);
}

export function fetchUserHealthFacilityFullPath(mm, id) {
  return healthFacilityFullPath('LOCATION_USER_HEALTH_FACILITY_FULL_PATH', mm, id);
}

export function fetchHealthFacilityFullPath(mm, id) {
  return healthFacilityFullPath('LOCATION_HEALTH_FACILITY_FULL_PATH', mm, id);
}

export function fetchHealthFacilities(mm, region, district, str) {
  let filters = [];
  if (!!str && str.length) filters.push([`str:"${str}"`]);
  if (!!region) filters.push([`regionUuid: "${region.uuid}"`])
  if (!!district) filters.push([`districtUuid:"${district.uuid}"`])
  let payload = formatPageQuery("healthFacilitiesStr",
    filters,
    mm.getRef("location.HealthFacilityPicker.projection")
  );
  return graphql(payload, 'LOCATION_HEALTH_FACILITIES');
}
