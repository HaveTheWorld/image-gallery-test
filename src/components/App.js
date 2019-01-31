import React from 'react'
import { hot } from 'react-hot-loader/root'
import T from 'prop-types'
import Navbar from './Navbar'
import List from './List'
import css from './App.sass'

const App = () => {
	return (
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
	)
}

App.propTypes = {
	
}

export default hot(App)