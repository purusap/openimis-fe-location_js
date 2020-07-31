import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import _debounce from "lodash/debounce";
import { withTheme, withStyles } from "@material-ui/core/styles";
import _ from "lodash";
import { Grid } from "@material-ui/core";
import {
    withModulesManager,
    ControlledField, PublishedComponent,
} from "@openimis/fe-core";
import { selectLocation } from "../actions";
import { DEFAULT_LOCATION_TYPES } from "../constants";
import CoarseLocationFilter from "./CoarseLocation";

const styles = theme => ({
    dialogTitle: theme.dialog.title,
    dialogContent: theme.dialog.content,
    form: {
        padding: 0
    },
    item: {
        padding: theme.spacing(1)
    },
    paperDivider: theme.paper.divider,
});


class DetailedLocation extends Component {

    state = {}

    constructor(props) {
        super(props);
        this.locationTypes = props.modulesManager.getConf("fe-location", "Location.types", DEFAULT_LOCATION_TYPES)
    }

    onLocationChange = (i, v) => {
        this.setState({ [`location_${i}`]: v },
            e => {
                if (i === this.locationTypes.length - 3) {
                    this.props.onChange(v)
                }
            })
    }

    render() {
        const { classes, value, split = false, readOnly, required = false, onChange } = this.props;
        let region = !!value ? value.parent : null;
        let district = value;
        while (!!region && !!region.parent) {
            district = region;
            region = region.parent;
        }
        let locations = [];
        let v = !!value ? { ...value } : null
        _.times(this.locationTypes.length - 2, i => {
            locations.unshift(v || null)
            v = !!v ? v.parent : null;
        });
        let grid = split ? 12 : 6;
        return (
            <Grid container className={classes.form}>
                <Grid item xs={grid}>
                    <CoarseLocationFilter
                        region={region}
                        district={district}
                        readOnly={readOnly}
                        required={required}
                        onChange={district => this.setState({ [`location_-1`]: district })} />
                </Grid>
                {_.times(this.locationTypes.length - 2, i => (
                    <ControlledField module="location"
                        id={`DetailedLocation.location_${this.locationTypes.length - 2 + i}`}
                        key={`location_${this.locationTypes.length - 2 + i}`}
                        field={
                            <Grid item xs={Math.floor(grid / (this.locationTypes.length - 2))} className={classes.item}>
                                <PublishedComponent
                                    pubRef="location.LocationPicker"
                                    value={locations[i]}
                                    parentLocation={this.state[`location_${i - 1}`] || (i === 0 ? district : locations[i - 1])}
                                    readOnly={readOnly}
                                    required={required}
                                    withNull={true}
                                    locationLevel={this.locationTypes.length - 2 + i}
                                    onChange={v => this.onLocationChange(i, v)}
                                />
                            </Grid>
                        } />
                )
                )}
            </Grid>
        )
    }
}

const mapStateToProps = state => ({
});


const mapDispatchToProps = dispatch => {
    return bindActionCreators({ selectLocation }, dispatch);
};

export default withModulesManager(connect(mapStateToProps, mapDispatchToProps)(withTheme(withStyles(styles)(DetailedLocation))));