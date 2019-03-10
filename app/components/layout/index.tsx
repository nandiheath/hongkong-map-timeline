import { observer } from 'mobx-react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { withRouter } from 'next/router';
import React from 'react';


type MyProps = {
};

class Layout extends React.Component<MyProps> {

  public componentDidMount() {
  }

  public componentDidUpdate() {
  }

  public render() {

    return (
    <div>
      <AppBar>
        <Toolbar>
          <Typography variant="h6" color="inherit">
            Hong Kong Map Timeline
          </Typography>

        </Toolbar>
      </AppBar>
    </div>);


  }


}

export default withRouter(observer(Layout));