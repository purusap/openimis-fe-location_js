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
        fetchingRegions: false,
        fetchedRegions: false,
        regions: null,
        errorRegions: null,   
        fetchingDistricts: false,
        fetchedDistricts: false,
        districts: null,
        errorDistricts: null,                                     
    },
    action,
) {
    switch (action.type) {
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
                healthFacilityFullPath: action.payload.data.healthFacilityFullPath,
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
        case 'LOCATION_DISTRICTS_REQ':
            return {
                ...state,
                fetchingDistricts: true,
                fetchedDistricts: false,
                districts: null,
                errorDistricts: null,
            };
        case 'LOCATION_DISTRICTS_RESP':
            return {
                ...state,
                fetchingDistricts: true,
                fetchedDistricts: false,
                districts: parseData(action.payload.data.locationsStr),
                errorDistricts: formatGraphQLError(action.payload)
            };
        case 'LOCATION_DISTRICTS_ERR':
            return {
                ...state,
                fetchingDistricts: false,
                errorDistricts: formatServerError(action.payload)
            };                            
        default:
            return state;
    }
}

export default reducer;
