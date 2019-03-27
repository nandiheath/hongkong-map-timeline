import React from 'react';
import { Feature } from 'ol';
import Link from 'next/link'

interface MyProps {
  features: Feature[]
};

class OLMapPopup extends React.Component<MyProps> {

  public render() {
    console.log(this.props.features.filter((_, i) => i < 5).map((feature) => feature.get('id')));
    return (
      <div className="popup-content">

        {
          this.props.features.filter((_, i) => i < 5).map((feature) => (
            <li key={feature.get('id')}>
              <Link href={`/place/${feature.get('name')}/${feature.get('id')}`} >
                <a>{feature.get('name')}</a>
              </Link>
            </li>

          ))
        }
        {
          this.props.features.length > 5 ? `...(${this.props.features.length})` : ''
        }
        <style jsx global>{`
          .popup-content {
            color: black;
          }
          a {
            color: black;
          }
        `}</style>
      </div>
    )
  };
};

export default OLMapPopup;