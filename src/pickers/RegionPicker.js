import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { withTheme, withStyles } from "@material-ui/core/styles";
import { injectIntl } from 'react-intl';
import { fetchRegions } from "../actions";
import { formatMessage, AutoSuggestion, withModulesManager } from "@openimis/fe-core";
import _debounce from "lodash/debounce";

const styles = theme => ({
    label: {
        color: theme.palette.primary.main
    }
});

class RegionPicker extends Component {

    formatSuggestion = a => !!a ? `${a.code} ${a.name}` : ""

    getSuggestions = str => !!str &&
        str.length >= this.props.modulesManager.getConf("fe-location", "regionsMinCharLookup", 1) &&
        this.props.fetchRegions(this.props.modulesManager, str);

    debouncedGetSuggestion = _debounce(
        this.getSuggestions,
        this.props.modulesManager.getConf("fe-location", "debounceTime", 800)
    )

    onSuggestionSelected = v => this.props.onChange(v, this.formatSuggestion(v));

    render() {
        const { intl, value, regions, withLabel = true, label, withPlaceholder, placeholder, readOnly = false } = this.props;
        return <AutoSuggestion
            items={regions}
            label={!!withLabel && (label || formatMessage(intl, "location", "RegionPicker.label"))}
            placeholder={!!withPlaceholder ? placeholder || formatMessage(intl, "location", "RegionPicker.placehoder") : null}
            lookup={this.formatSuggestion}
            getSuggestions={this.debouncedGetSuggestion}
            renderSuggestion={a => <span>{this.formatSuggestion(a)}</span>}
            getSuggestionValue={this.formatSuggestion}
            onSuggestionSelected={this.onSuggestionSelected}
            value={value}
            readOnly={readOnly}
        />
    }
}

const mapStateToProps = state => ({
    regions: state.loc.regions,
});

const mapDispatchToProps = dispatch => {
    return bindActionCreators({ fetchRegions }, dispatch);
};

export default withModulesManager(connect(mapStateToProps, mapDispatchToProps)(injectIntl(withTheme(withStyles(styles)(RegionPicker)))));
