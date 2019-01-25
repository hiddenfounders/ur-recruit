import * as React from 'react';
import { Drawer, Divider, createStyles, WithStyles, withStyles, ListSubheader, Theme } from '@material-ui/core';
import ActionCommand from '../../modules/ActionCommand'
import ConditionCommand from '../../modules/ConditionCommand'
import Command, {CommandType} from '../../modules/Command'
import List from './List'

export interface Props extends WithStyles<typeof styles> {}

class Options extends React.PureComponent<Props> {
  handleOptionSelect = (command: Command) => () => {
    command.execute()
  };

  render(): React.ReactNode {
    const { classes } = this.props;
    return (
      <Drawer
        className={classes.drawer}
        variant="permanent"
        classes={{ paper: classes.drawerPaper }}
        open={false}
        anchor="right"
      >
        <List
          subheader={<ListSubheader component="div">Conditions</ListSubheader>}
          items={[
            {text: 'if/else', command: new ConditionCommand(0, CommandType.IF_ELSE_CONDITION)},
            {text: 'wait', command: new ConditionCommand(0, CommandType.WAIT_CONDITION)}
          ]}
          onOptionSelect={this.handleOptionSelect}
        />
        <Divider />
        <List
          subheader={<ListSubheader component="div">Actions</ListSubheader>}
          items={[{text: 'Send E-mail', command: new ActionCommand(0, CommandType.EMAIL_ACTION)},
            {text: 'Add tag', command: new ActionCommand(0, CommandType.TAG_ACTION)},
            {text: 'Move to', command: new ActionCommand(0, CommandType.STAGE_ACTION)},
            {text: 'Disqualify', command: new ActionCommand(0, CommandType.DISQUALIFY_ACTION)}
          ]}
          onOptionSelect={this.handleOptionSelect}
        />
      </Drawer>
    );
  }
}

const drawerWidth = 240;
const styles = (theme: Theme) => createStyles({
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  }
});

export default withStyles(styles)(Options);
