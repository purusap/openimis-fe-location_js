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

    constructor(props) {
        super(props);
        this.locationTypes = props.modulesManager.getConf("fe-location", "Location.types", DEFAULT_LOCATION_TYPES)
    }

    render() {
        const { classes, value, split=false } = this.props;
        let locations = [];
        let v = { ...value }
        _.times(this.locationTypes.length - 2, i => {
            locations.unshift(v || {})
            v = !!v ? v.parent : {};
        });
        let grid = split ? 12 : 6;
        return (
            <Grid container className={classes.form}>
                <Grid item xs={grid}>
                    <CoarseLocationFilter value={value} />
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
                                    readOnly={true}
                                    withNull={true}
                                    locationLevel={this.locationTypes.length - 2 + i}
                                />
                            </Grid>
                        } />
                ))}
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