import React, { Component } from "react";
import {connect} from 'react-redux' ;
import classes from "./Layout.module.css";
import Aux from "../Auxillary";
import Toolbar from "../../components/Navigation/Toolbar/Toolbar";
import SideDrawer from "../../components/Navigation/SideDrawer/SideDrawer";

class Layout extends Component {
   state=  {
       showSideDrawer : false
   }
 
   sideDrawerClosedHandler =()=> {
   this.setState({showSideDrawer : false});
   }

   sideDrawerToggleHandler=()=>{
       this.setState((prevState)=>{
           return {showSideDrawer: !prevState.showSideDrawer};
       });
   }

  render() {
    return (
      <Aux>
        <Toolbar drawerToggleClicked={this.sideDrawerToggleHandler}
        isAuth={this.props.isAuth}/>
        <SideDrawer closed={this.sideDrawerClosedHandler} open={this.state.showSideDrawer}  
         isAuth={this.props.isAuth}/>

        <main className={classes.content}>{this.props.children}</main>
      </Aux>
    );
  }
}

const mapStateToProps = (state) =>{
  return {
    isAuth : state.auth.token !==null
  }
}

export default connect(mapStateToProps)(Layout);
