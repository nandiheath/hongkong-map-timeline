import { observer } from 'mobx-react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { withRouter } from 'next/router';
import React, { Children } from 'react';


type MyProps = {
  children: React.ReactNode;
};

class Layout extends React.Component<MyProps> {



  public componentDidUpdate() {
  }

  public render() {
    const { children } = this.props;

    return (
    <div>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" color="inherit">
            Hong Kong Map Timeline
          </Typography>

        </Toolbar>
      </AppBar>
      { children }
    </div>);


  }


}

export default withRouter(observer(Layout));