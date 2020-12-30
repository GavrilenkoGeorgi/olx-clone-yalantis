import React from 'react'

import classes from './FourOFour.module.sass'

const FourOFour = () => {
	return <div className={classes.container}>
		<p>
			You&apos;ve got 404!<br />
			Sorry, the page you are looking for doesn&apos;t exist.
			<br />
			Go to the <a href="/">main page</a> or the <a href="/products"> list of products</a>.
		</p>
	</div>
}

export default FourOFour
