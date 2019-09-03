import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { withTheme, withStyles } from "@material-ui/core/styles";
import { injectIntl } from 'react-intl';
import { fetchHealthFacilities } from "../actions";
import { formatMessage, AutoSuggestion, withModulesManager } from "@openimis/fe-core";
import _debounce from "lodash/debounce";
import { healthFacilityLabel } from "../utils";

const styles = theme => ({
    label: {
        color: theme.palette.primary.main
    }
});

class HealthFacilityPicker extends Component {

    getSuggestions = str => !!str &&
        str.length >= this.props.modulesManager.getConf("fe-location", "healthFacilitiesMinCharLookup", 2) &&
        this.props.fetchHealthFacilities(this.props.modulesManager, str);

    debouncedGetSuggestion = _debounce(
        this.getSuggestions,
        this.props.modulesManager.getConf("fe-location", "debounceTime", 800)
    )

    onSuggestionSelected = v => this.props.onChange(v, healthFacilityLabel(v));

    render() {
        const { intl, value, healthFacilities, withLabel = true, label, readOnly = false } = this.props;
        return <AutoSuggestion
            items={healthFacilities}
            label={!!withLabel && (label || formatMessage(intl, "location", "HealthFacilityPicker.label"))}
            lookup={healthFacilityLabel}
            getSuggestions={this.debouncedGetSuggestion}
            renderSuggestion={a => <span>{healthFacilityLabel(a)}</span>}
            getSuggestionValue={healthFacilityLabel}
            onSuggestionSelected={this.onSuggestionSelected}
            value={value}
            readOnly={readOnly}
        />
    }
}

const mapStateToProps = state => ({
    healthFacilities: state.loc.healthFacilities,
});

const mapDispatchToProps = dispatch => {
    return bindActionCreators({ fetchHealthFacilities }, dispatch);
};

export default withModulesManager(connect(mapStateToProps, mapDispatchToProps)(injectIntl(withTheme(withStyles(styles)(HealthFacilityPicker)))));
