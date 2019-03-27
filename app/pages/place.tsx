import React from 'react';
import { observer } from 'mobx-react';
import Layout from '../components/layout';
import IPlace from '../lib/models/place';
import { getPlace } from '../lib/api';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';

import Typography from '@material-ui/core/Typography';

interface IPlaceProps {
  place: IPlace
}

class Place extends React.Component<IPlaceProps> {
  static async getInitialProps({ query }) {
    const { slug, uuid } = query;
    const place = await getPlace(uuid);
    return {
      place
    }
  }

  public render() {
    const { place } = this.props;
    return (
      <Layout {...this.props}>
        {
          place ?
            <Card>
              <CardContent>
                <Typography color="textSecondary" gutterBottom>
                  name
                </Typography>
                <Typography variant="h5" component="h2">          
                  {place.name.zh_hk}
                </Typography>
                <Typography color="textSecondary">
                  address
                </Typography>
                <Typography component="p">
                  {place.address.zh_hk}                  
                </Typography>
                <Typography color="textSecondary">
                  location
                </Typography>
                <Typography component="p">
                  {`${place.location.lat}, ${place.location.lng}`}
                </Typography>
                <Typography color="textSecondary">
                  year_from
                </Typography>
                <Typography component="p">
                  {place.year_from}
                </Typography>
                <Typography color="textSecondary">
                  year_to
                </Typography>
                <Typography component="p">
                  {place.year_to}
                </Typography>
              </CardContent>              
            </Card>
            :
            <p>Place not found</p>
        }
        <style jsx global>{`
          .popup-content {
            color: black;
          }
          a {
            color: black;
          }
        `}</style>
      </Layout>

    );
  }
}


export default observer(Place);