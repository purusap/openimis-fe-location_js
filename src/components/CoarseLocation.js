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

    state = {
        region: null,
        regionChanged: false
    }

    render() {
        const { classes, region, district, readOnly, required = false, onChange } = this.props;
        return (
            <Grid container className={classes.form}>
                <ControlledField module="location" id={`CoarseLocation.location_0`} field={
                    <Grid item xs={6} className={classes.item}>
                        <PublishedComponent
                            pubRef="location.RegionPicker"
                            readOnly={readOnly}
                            required={required}
                            value={region}
                            withNull={true}
                            onChange={region => this.setState({ region, regionChanged: true })}
                        />
                    </Grid>
                } />
                <ControlledField module="location" id={`CoarseLocation.location_1`} field={
                    <Grid item xs={6} className={classes.item}>
                        <PublishedComponent
                            pubRef="location.DistrictPicker"
                            readOnly={readOnly}
                            required={required}
                            value={district}
                            region={this.state.regionChanged ? this.state.region : region}
                            withNull={true}
                            onChange={onChange}
                        />
                    </Grid>
                } />
            </Grid>
        )
    }
}


export default withTheme(withStyles(styles)(CoarseLocation));