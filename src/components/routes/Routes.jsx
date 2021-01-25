import React from 'react'
import { Route, Switch } from 'react-router-dom'

import routes from './routesConstants'
import { ProductDetails } from '../products'
import { MainPage, ProductsPage, CartPage, FourOFour } from '../pages'

import classes from './Routes.module.sass'

const Routes = () => (
	<section className={classes.content}>
		<Switch>
			<Route exact path={routes.products} component={ProductsPage} />
			<Route path={routes.productsCreated} component={ProductsPage} />
			<Route path={routes.productDetails} component={ProductDetails} />
			<Route path={routes.cart} component={CartPage} />
			<Route exact path={routes.mainPage} component={MainPage} />
			<Route path="*" component={FourOFour} />
		</Switch>
	</section>
)

export default Routes
