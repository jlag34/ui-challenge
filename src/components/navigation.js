import React, {Component} from 'react';
import {Segment} from 'semantic-ui-react';

import AccordionContent from './accordionContent';

class Navigation extends Component {

  //Had to use original semantic for accordions because react-semantic accordions
  //dont allow you to onClick the content
  componentDidMount(){
    $('.ui.accordion').accordion();
  }

  render(){
    const {activeCat, activeSubCat, data, handleActiveCat, handleActiveSubCat} = this.props;
    return(
      <div className="navigation-wrapper">
        <Segment className="navigation-segment">
          <div className="navigation-header">FIELD GROUPS</div>
            <div className="ui accordion">
            {
              //Map each category accordion
              Object.keys(data).map(obj => {
                return <AccordionContent activeCat={activeCat}
                                         activeSubCat={activeSubCat}
                                         category={obj} 
                                         data={data[obj]} 
                                         handleActiveCat={handleActiveCat} 
                                         handleActiveSubCat={handleActiveSubCat}
                                         key={obj} />
              })
            }
          </div>
        </Segment>
      </div>
    );
  }
}

export default Navigation;