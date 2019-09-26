import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { withTheme, withStyles } from "@material-ui/core/styles";
import { injectIntl } from 'react-intl';
import { withModulesManager, formatMessage, AutoSuggestion, decodeId } from "@openimis/fe-core";
import _debounce from "lodash/debounce";

const styles = theme => ({
    label: {
        color: theme.palette.primary.main
    }
});

class DistrictPicker extends Component {

    formatSuggestion = a => !!a ? `${a.code} ${a.name}` : '';

    onSuggestionSelected = v => this.props.onChange(v, this.formatSuggestion(v));

    render() {
        const { intl, value, reset, withLabel = true, label, region, districts, readOnly = false } = this.props;
        let items = districts || [];
        if (!!region) {
            let regionId = parseInt(decodeId(region.id));
            items = items.filter(d => {
                return d.regionId === regionId
            });
        }
        return (
            <AutoSuggestion
                items={items}
                label={!!withLabel && (label || formatMessage(intl, "location", "DistrictPicker.label"))}
                lookup={this.formatSuggestion}
                getSuggestionValue={this.formatSuggestion}
                renderSuggestion={a => <span>{this.formatSuggestion(a)}</span>}
                onSuggestionSelected={this.onSuggestionSelected}
                value={value}
                reset={reset}
                readOnly={readOnly}
            />
        )
    }
}

const mapStateToProps = state => ({
    districts: state.loc.userDistricts,
});

export default withModulesManager(connect(mapStateToProps)(injectIntl(withTheme(withStyles(styles)(DistrictPicker)))));
