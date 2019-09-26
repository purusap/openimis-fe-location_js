import { formatServerError, formatGraphQLError, parseData } from '@openimis/fe-core';
import { healthFacilityLabel, locationLabel } from "./utils";

function reducer(
    state = {
        fetchingHealthFacilityFullPath: false,
        fetchedHealthFacilityFullPath: false,
        healthFacilityFullPath: null,
        errorHealthFacilityFullPath: null,
        fetchingHealthFacilities: false,
        fetchedHealthFacilities: false,
        healthFacilities: null,
        errorHealthFacilities: null,
    },
    action,
) {
    switch (action.type) {
        case 'LOCATION_USER_DISTRICTS_RESP':
            let userDistricts = action.payload.data.userDistricts || [];
            let userRegions = userDistricts.reduce(
                (res, d) => {
                    res[d.regionId] = { id: d.regionId, code: d.regionCode, name: d.regionName };
                    return res;
                }
                , {})
            return {
                ...state,
                userRegions: Object.values(userRegions),
                userDistricts,
            }
        case 'LOCATION_USER_HEALTH_FACILITY_FULL_PATH_RESP':
            let hfFullPath = parseData(action.payload.data.healthFacilities)[0];
            return {
                ...state,
                userHealthFacilityFullPath: hfFullPath,
                userHealthFacilityStr: healthFacilityLabel(hfFullPath),
                userRegionStr: locationLabel(hfFullPath.location.parent),
                userDistrictStr: locationLabel(hfFullPath.location),
            }
        case 'LOCATION_HEALTH_FACILITY_FULL_PATH_REQ':
            return {
                ...state,
                fetchingHealthFacilityFullPath: true,
                fetchedHealthFacilityFullPath: false,
                healthFacilityFullPath: null,
                errorHealthFacilityFullPath: null,
            };
        case 'LOCATION_HEALTH_FACILITY_FULL_PATH_RESP':
            return {
                ...state,
                fetchingHealthFacilityFullPath: true,
                fetchedHealthFacilityFullPath: false,
                healthFacilityFullPath: parseData(action.payload.data.healthFacilities)[0],
                errorHealthFacilityFullPath: formatGraphQLError(action.payload)
            };
        case 'LOCATION_HEALTH_FACILITY_FULL_PATH_ERR':
            return {
                ...state,
                fetchingHealthFacilityFullPath: false,
                errorHealthFacilityFullPath: formatServerError(action.payload)
            };
        case 'LOCATION_HEALTH_FACILITIES_REQ':
            return {
                ...state,
                fetchingHealthFacilities: true,
                fetchedHealthFacilities: false,
                healthFacilities: null,
                errorHealthFacilities: null,
            };
        case 'LOCATION_HEALTH_FACILITIES_RESP':
            return {
                ...state,
                fetchingHealthFacilities: true,
                fetchedHealthFacilities: false,
                healthFacilities: parseData(action.payload.data.healthFacilitiesStr),
                errorHealthFacilities: formatGraphQLError(action.payload)
            };
        case 'LOCATION_HEALTH_FACILITIES_ERR':
            return {
                ...state,
                fetchingHealthFacilities: false,
                errorHealthFacilities: formatServerError(action.payload)
            };
        case 'LOCATION_REGIONS_REQ':
            return {
                ...state,
                fetchingRegions: true,
                fetchedRegions: false,
                regions: null,
                errorRegions: null,
            };
        case 'LOCATION_REGIONS_RESP':
            return {
                ...state,
                fetchingRegions: true,
                fetchedRegions: false,
                regions: parseData(action.payload.data.locationsStr),
                errorRegions: formatGraphQLError(action.payload)
            };
        case 'LOCATION_REGIONS_ERR':
            return {
                ...state,
                fetchingRegions: false,
                errorRegions: formatServerError(action.payload)
            };
        default:
            return state;
    }
}

export default reducer;
