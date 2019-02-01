import React, { Fragment } from 'react'
import { hot } from 'react-hot-loader/root'
import T from 'prop-types'
import Navbar from './Navbar'
import List from './List'
import ImageView from './ImageView'
import css from './App.sass'

const App = () => {
	return (
		<Fragment>
			<div className="container is-fluid">
				<div className={css.fullHeight}>
					<Navbar />
					<div className={css.contentParent}>
						<div className={css.contentChild}>
							<List />
						</div>
					</div>
				</div>
			</div>
			<ImageView />
		</Fragment>
	)
}

App.propTypes = {
	
}

export default hot(App)