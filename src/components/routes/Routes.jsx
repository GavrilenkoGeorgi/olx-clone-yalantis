import React from 'react'
import { Route, Switch } from 'react-router-dom'
import routes from './routesConstants'
import MainPage from '../pages/MainPage/MainPage'
import ProductsPage from '../pages/ProductsPage/ProductsPage'
import ProductsDetails from '../products/Product/ProductDetails'
import CartPage from '../pages/CartPage/CartPage'

const Routes = () => (
	<Switch>
		<Route path={routes.productDetails} component={ProductsDetails} />
		<Route path={routes.products} component={ProductsPage} />
		<Route path={routes.cart} component={CartPage} />
		<Route exact path={routes.mainPage} component={MainPage} />
	</Switch>
)

export default Routes
