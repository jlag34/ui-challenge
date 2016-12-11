import React from 'react';

import {formatCategory} from '../utils/utils'

const accordionContent = (props) => {
  const {activeCat, activeSub, category, data, handleActiveCat, handleActiveSubCat} = props;
  const formattedTitle = formatCategory(category);
  const titleCSS = activeCat === category ? "navigation-title-wrapper active" : "navigation-title-wrapper";

  return (
    <div className={titleCSS}>
      <div className="title" onClick={() => handleActiveCat(category)}>{formattedTitle}</div>
      <div className="content">
          {
            //Map out each subcategory
            Object.keys(data).map(obj => {
              const formattedContent = formatCategory(obj);
              const contentWrapperCSS = activeSub === obj ? "navigation-content-wrapper active" : "navigation-content-wrapper";
              const contentCSS = activeSub === obj ? "navigation-content active" : "navigation-content";
              
              return (<div className={contentWrapperCSS} key={obj} onClick={() => handleActiveSubCat(obj)}>
                        <div className={contentCSS}>{formattedContent}</div>
                      </div>);
            })
          }
      </div>
    </div>
  );
}
export default accordionContent;