import React from 'react'
import classes from './MainPage.module.sass'

const MainPage = () => {
	return <section className={classes.content}>
		<h1>Main page</h1>
		<a href="/products">List of products is here.</a>
	</section>
}

export default MainPage
