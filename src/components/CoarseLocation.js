import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import _debounce from "lodash/debounce";
import { withTheme, withStyles } from "@material-ui/core/styles";
import _ from "lodash";
import { Grid } from "@material-ui/core";
import {
    ControlledField, PublishedComponent,
} from "@openimis/fe-core";

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


class CoarseLocation extends Component {

    render() {
        const { classes, value } = this.props;
        let region = !!value ? value.parent : null;
        let district = value;
        while (!!region && !!region.parent) {
            district = region;
            region = region.parent;
        }
        return (
            <Grid container className={classes.form}>
                <ControlledField module="location" id={`CoarseLocation.location_0`} field={
                    <Grid item xs={6} className={classes.item}>
                        <PublishedComponent
                            pubRef="location.RegionPicker"
                            readOnly={true}
                            value={region}
                            withNull={true}
                        />
                    </Grid>
                } />
                <ControlledField module="location" id={`CoarseLocation.location_1`} field={
                    <Grid item xs={6} className={classes.item}>
                        <PublishedComponent
                            pubRef="location.DistrictPicker"
                            readOnly={true}
                            value={district}
                            region={region}
                            withNull={true}
                        />
                    </Grid>
                } />
            </Grid>
        )
    }
}


export default withTheme(withStyles(styles)(CoarseLocation));