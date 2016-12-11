import React, {Component} from 'react';

import {formatJSON} from '../utils/utils';
import Display from './display';
import Navigation from './navigation';
import myData from '../../src/schema.json';

class App extends Component {
	constructor(props) {
		super(props);

		this.state = {
                  activeCategory: '', 
                  activeSubCategory: '',
                  jsonData: {}
                };
	}

	componentWillMount(){
    //Get JSON and set it to state
    this.load();
	}

  //Find which category to display
  handleActiveCategory = (node) => {
    if (node === this.state.activeCategory) {
      this.setState({activeCategory: '', activeSubCategory: ''});
    } else {
    this.setState({activeCategory: node});
    }
  }

  //Find which subcategory the user clicked on
  handleActiveSubCategory = (node) => {
    if (node === this.state.activeSubCategory) {
      this.setState({activeSubCategory: ''});
    } else {
    this.setState({activeSubCategory: node});
    }
  }

  //JSON loader (tried a bunch of different things, this is the only thing that worked)
  loadJSON = (jsonfile, callback) => {   
    const jsonObj = new XMLHttpRequest();
    jsonObj.overrideMimeType("application/json");
    jsonObj.open('GET', "../../src/schema.json", true);
    jsonObj.onreadystatechange = function () {
      if (jsonObj.readyState == 4 && jsonObj.status == "200") {
        callback(jsonObj.responseText);
      }
    };
    jsonObj.send(null);  
  }

  //Get JSON data and set it to state
  load = () => {
    let data;
    let that = this;
    this.loadJSON(myData, function(response) {
      data = formatJSON(JSON.parse(response));
      that.setState({jsonData: data})
    });
  }

	render(){
    const {activeCategory, activeSubCategory, jsonData} = this.state;

		return(
			<div className="app-wrapper">
				<Navigation activeCat={activeCategory} 
                    activeSubCat={activeSubCategory} 
                    data={jsonData} 
                    handleActiveCat={this.handleActiveCategory}
                    handleActiveSubCat={this.handleActiveSubCategory}/>
				<Display activeCat={activeCategory} activeSubCat={activeSubCategory} data={jsonData} />
			</div>
		);
	}
}

export default App;