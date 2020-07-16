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


class DetailedHealthFacility extends Component {

    render() {
        const { classes, value, split = false } = this.props;
        let grid = split ? 12 : 6;
        return (
            <Grid container className={classes.form}>
                <Grid item xs={grid}>
                    <CoarseLocationFilter value={value.location} />
                </Grid>
                <ControlledField module="location"
                    id="DetailedHealthFacility.FSPLevel"
                    field={
                        <Grid item xs={grid / 3} className={classes.item}>
                            <PublishedComponent
                                pubRef="location.HealthFacilityLevelPicker"
                                value={value.level}
                                readOnly={true}
                                withNull={true}
                            />
                        </Grid>
                    } />
                <ControlledField module="location"
                    id="DetailedHealthFacility.FSPLevel"
                    field={
                        <Grid item xs={grid / 3 * 2} className={classes.item}>
                            <PublishedComponent
                                pubRef="location.HealthFacilityPicker"
                                value={value}
                                readOnly={true}
                                withNull={true}
                            />
                        </Grid>
                    } />
            </Grid >
        )
    }
}

const mapStateToProps = state => ({
});


const mapDispatchToProps = dispatch => {
    return bindActionCreators({ selectLocation }, dispatch);
};

export default withModulesManager(connect(mapStateToProps, mapDispatchToProps)(withTheme(withStyles(styles)(DetailedHealthFacility))));