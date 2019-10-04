import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { withTheme, withStyles } from "@material-ui/core/styles";
import { injectIntl } from 'react-intl';
import { formatMessage, AutoSuggestion, withModulesManager } from "@openimis/fe-core";
import _debounce from "lodash/debounce";

const styles = theme => ({
    label: {
        color: theme.palette.primary.main
    }
});

class RegionPicker extends Component {

    formatSuggestion = a => !!a ? `${a.code} ${a.name}` : ""

    onSuggestionSelected = v => this.props.onChange(v, this.formatSuggestion(v));

    render() {
        const { intl, value, reset, regions,
            withLabel = true, label,
            preValues = [],
            withPlaceholder, placeholder = null,
            readOnly = false
        } = this.props;

        return <AutoSuggestion
            items={regions}
            preValues={preValues}
            label={!!withLabel && (label || formatMessage(intl, "location", "RegionPicker.label"))}
            placeholder={!!withPlaceholder ? placeholder || formatMessage(intl, "location", "RegionPicker.placehoder") : null}
            lookup={this.formatSuggestion}
            renderSuggestion={a => <span>{this.formatSuggestion(a)}</span>}
            getSuggestionValue={this.formatSuggestion}
            onSuggestionSelected={this.onSuggestionSelected}
            value={value}
            reset={reset}
            readOnly={readOnly}
        />
    }
}

const mapStateToProps = state => ({
    regions: state.loc.userRegions || [],
});

export default withModulesManager(connect(mapStateToProps)(injectIntl(withTheme(withStyles(styles)(RegionPicker)))));
