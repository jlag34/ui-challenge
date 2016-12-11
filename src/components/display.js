import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import {Icon, Segment, Table} from 'semantic-ui-react';

import {formatCategory} from '../utils/utils'

class Display extends Component {

  //If the user clicks on a subcategory in the navigation, scroll to it
  componentWillReceiveProps(nextProps){
    if (nextProps.activeSubCat) {
      ReactDOM.findDOMNode(this[nextProps.activeSubCat]).scrollIntoView();
    }
  }

  render() {
    const {activeCat, data} = this.props;
    const activeData = data[activeCat] || {};
    const formattedTitle = formatCategory(activeCat);

    return(
      <div className="display-wrapper">
        <div className="display-header">{formattedTitle}</div>

        {
          //Map out each subcategory segment when the user selects a category
          Object.keys(activeData).map(subCat => {
            const subData = activeData[subCat];
            const formattedDataType = formatCategory(subData.data_type)
            const formattedDataName = formatCategory(subData.name)

            return (
              <div key={subData.name} ref={(node) => {this[subData.name] = node}}>
                <Segment className="display-segment">
                  <div className="display-segment-header">{formattedDataName}</div>
                  <Table definition>
                    <Table.Body>
                      <Table.Row>
                        <Table.Cell className="display-segment-table-header">
                          Type
                        </Table.Cell>
                        <Table.Cell>
                          {formattedDataType}
                        </Table.Cell>
                      </Table.Row>
                      <Table.Row>
                        <Table.Cell className="display-segment-table-header">
                          Usage
                        </Table.Cell>
                        <Table.Cell className="display-flex">
                          {
                            //If the user has no app_keys, return N/A
                            subData.app_keys.length > 0 ? null : 'N/A'
                          }
                          {
                            //If user has app_keys, map them out
                            subData.app_keys.map(key => {
                              const color = key === 'giving_tree' ? 'yellow' :
                                            key === 'community' ? 'green' : 'blue';
                              const formattedKey = formatCategory(key)
                              return (
                                <div className="display-segment-usage" key={key}><Icon color={color} name="repeat" />
                                  {formattedKey}
                                </div>
                              ); 
                            })
                          }
                        </Table.Cell>
                      </Table.Row>
                      <Table.Row>
                        <Table.Cell className="display-segment-table-header">
                          EverTrue Field Name
                        </Table.Cell>
                        <Table.Cell>
                          {subData.name}
                        </Table.Cell>
                      </Table.Row>
                    </Table.Body>
                  </Table>
                </Segment>
              </div>
            );
          })
        }
      </div>
    );
  }
}

export default Display;