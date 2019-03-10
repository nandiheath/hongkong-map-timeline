import { observer } from 'mobx-react';
import React from 'react';
import Layout from '../components/layout';
import dynamic from 'next/dynamic'

const OLMap = dynamic(
  () => import('../components/ol-map'),
  {
    ssr: false
  }
)
//open layers and styles
// import 'ol/ol.css';


class Login extends React.Component<{ next?: string; firstGridItem: boolean }> {


  public static getInitialProps({ query }) {
    const { next } = query;

    return { next };
  }

  public render() {
    return (
      <Layout {...this.props}>
        <OLMap/>
      </Layout>
    );
  }
}

export default observer(Login);