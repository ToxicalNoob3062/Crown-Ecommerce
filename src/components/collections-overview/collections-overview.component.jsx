import React from 'react'
import { connect } from 'react-redux';
import {createStructuredSelector} from "reselect"
import { selectShopItems } from "../../redux/shop/shop.selector.js";
import './collections-overview.styles.scss'
import CollectionPreview from '../preview-collection/preview-collection.component';
const  CollectionsOverview=({collections})=>{
return <div className='collection-overview'>
  {collections.map(({ id, ...others }) => {
    return <CollectionPreview key={id} {...others} />;
  })}
  </div>
}

const mapStateToProps=createStructuredSelector({
  collections:selectShopItems
})

export default connect(mapStateToProps)(CollectionsOverview);