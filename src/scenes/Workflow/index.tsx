import * as React from 'react';
import OptionMenu from './components/OptionMenu'
import { createStyles, WithStyles, withStyles, Theme } from '@material-ui/core';

import EventDialog from './components/EventDialog';
import Option from './components/OptionFlowchart/index';
import Api, { ApiModelEnum } from '../../services/Api';
import { WorkflowModel, OptionModel } from './model'
import {Placeholder} from './components/OptionFlowchart';

interface Props extends WithStyles<typeof styles> {}

interface State {
  open: boolean;
  workflow: WorkflowModel;
  WorkflowApi: Api;
  event: string;
  children: Array<OptionModel>;
}

class Workflow extends React.Component<Props, State> {
  state = {
    open: false,
    workflow: {} as WorkflowModel,
    WorkflowApi: new Api(ApiModelEnum.workflow),
    event: "",
    children: [] as Array<OptionModel>
  };

  async componentDidMount() {
    this.handleWorkflowChange()
  }

  handleWorkflowChange = async () => {
    const { WorkflowApi } = this.state;
    try {
      const { event, children} = await WorkflowApi.fetch("5c505a1766a577184fb85e72") as WorkflowModel;
      this.setState({ event, children });
    } catch(e) {
      console.log(e);
    }
  }

  handleOpenDialog = () => this.setState({ open: true });
  handleCloseDialog = () => this.setState({ open: false });

  render(): React.ReactNode {
    const { open,  event, children} = this.state;
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <OptionMenu eventExists={!!event} onWorkflowChange={this.handleWorkflowChange}></OptionMenu>
        <main className={classes.main}>
          <EventDialog
            open={open}
            onClose={this.handleCloseDialog}
          />
          {
            !event?
              <Placeholder parent="" />:
              <Option
                onWorkflowChange={this.handleWorkflowChange}
                item={children.filter(item=> item._id === event)[0]}
                children={children}
              />
          }
        </main>
      </div>
    );
  }
}


const styles = (theme: Theme) => createStyles({
  root: {
    display: "flex"
  },
  main: {
    width: 600,
    margin: theme.spacing.unit * 10,
    textAlign: "center"
  }
});

export default withStyles(styles)(Workflow);
