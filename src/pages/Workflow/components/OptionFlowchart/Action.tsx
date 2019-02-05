import * as React from 'react';
import { createStyles, WithStyles, withStyles, Theme, Typography } from '@material-ui/core';

interface Props extends WithStyles<typeof styles> {}

class Action extends React.Component<Props> {
  render() {
    const { children, classes } = this.props;
    return (
      <>
        <div className={classes.root}>
          <Typography variant="subtitle2" color="primary">{ children }</Typography>
        </div>
      </>
    );
  }
}

const styles = (theme: Theme) => createStyles({
  root: {
    backgroundColor: theme.palette.common.white,
    border: "2px solid " + theme.palette.primary.light,
    color: theme.palette.primary.main,
    padding: theme.spacing.unit * 1.5 + "px " + theme.spacing.unit * 3 + "px ",
    fontSize: theme.spacing.unit * 2,
    borderRadius: theme.spacing.unit * 5,
    width: 256,
    margin: "0 auto"
  }
});

export default withStyles(styles)(Action);