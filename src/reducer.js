import { formatServerError, formatGraphQLError } from '@openimis/fe-core';

function reducer(
    state = {   
        fetchingHealthFacilityFullPath: true,
        fetchedHealthFacilityFullPath: false,
        healthFacilityFullPath: null,
        errorHealthFacilityFullPath: null,               
    },
    action,
) {
    switch (action.type) {
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
        default:
            return state;
    }
}

export default reducer;
