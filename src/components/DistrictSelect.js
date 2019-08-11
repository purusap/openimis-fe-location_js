import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { withTheme, withStyles } from "@material-ui/core/styles";
import { injectIntl } from 'react-intl';
import { fetchDistricts } from "../actions";
import { withModulesManager, formatMessage, AutoSuggestion } from "@openimis/fe-core";
import _debounce from "lodash/debounce";

const styles = theme => ({
    label: {
        color: theme.palette.primary.main
    }
});

class DistrictSelect extends Component {


    formatSuggestion = a => !!a ? `${a.code} ${a.name}` : '';

    getSuggestions = str => !!str &&
        str.length >= this.props.modulesManager.getConf("fe-location", "districtsMinCharLookup", 1) &&
        this.props.fetchDistricts(str);

    debouncedGetSuggestion = _debounce(
        this.getSuggestions,
        this.props.modulesManager.getConf("fe-location", "debounceTime", 800)
    )

    onSuggestionSelected = v => this.props.onChange(v, this.formatSuggestion(v));

    render() {
        const { intl, initValue, withLabel = true, label, districts } = this.props;
        return (
            <AutoSuggestion
                items={districts}
                label={!!withLabel && (label || formatMessage(intl, "location", "DistrictSelect.label"))}
                lookup={this.formatSuggestion}
                getSuggestions={this.debouncedGetSuggestion}
                renderSuggestion={a => <span>{this.formatSuggestion(a)}</span>}
                getSuggestionValue={this.formatSuggestion}
                onSuggestionSelected={this.onSuggestionSelected}
                initValue={initValue}
            />
        )
    }
}

const mapStateToProps = state => ({
    districts: state.location.districts,
});

const mapDispatchToProps = dispatch => {
    return bindActionCreators({ fetchDistricts }, dispatch);
};

export default withModulesManager(connect(mapStateToProps, mapDispatchToProps)(injectIntl(withTheme(withStyles(styles)(DistrictSelect)))));
