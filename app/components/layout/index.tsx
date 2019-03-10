import { observer } from 'mobx-react';

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
    return (<div>123</div>);


  }


}

export default withRouter(observer(Layout));