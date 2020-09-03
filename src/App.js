import React ,{Component} from 'react';
import {Route,Switch, Redirect} from 'react-router-dom';
import {connect} from 'react-redux';
import asyncComponent from './hoc/asyncComponent/asyncComponent';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder'
import Layout from './hoc/Layout/Layout';
import Logout from './containers/Auth/Logout/Logout';
import * as actions from './store/actions/index';

const asyncCheckout = asyncComponent(()=>{
  return import('./containers/Checkout/Checkout');
})

const asyncOrders = asyncComponent(()=>{
  return import('./containers/Orders/Orders');
})

const asyncAuth = asyncComponent(()=>{
  return import('./containers/Auth/Auth');
})

class App extends Component{
  componentDidMount () {
    this.props.onTryAutoSignup()
  }
 render () {
  
  let routes=(
    <Switch>
    <Route path="/auth" component={asyncAuth} />
    <Route path="/" exact component ={BurgerBuilder} />
    <Redirect to = '/' />
    </Switch>
  );

  if(this.props.isAuthorized) {
   routes = (
    <Switch>
    <Route path="/checkout" component ={asyncCheckout} />
    <Route path="/orders" component={asyncOrders} />
    <Route path ="/logout" component={Logout} />
    <Route path="/auth" component={asyncAuth} />
    <Route path="/" exact component ={BurgerBuilder} />
    <Redirect to = '/' />
  </Switch>
   );
  }

   return (
    <div className="App">
     <Layout>
     {routes}
     </Layout>

    </div>
  );
 }
}

export const mapStateToProps = (state) => {
  return {
    isAuthorized : state.auth.token!==null
  }
}

export const mapDispatchToProps =(dispatch) =>{
  return {
   onTryAutoSignup : () => dispatch(actions.authCheckState())
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(App);
