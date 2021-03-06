import { h, Component } from 'preact';
import { Router } from 'preact-router';

import Header from './header';
import Rules from './rules';
import FAQ from './faq';
import HowToPlay from './howtoplay';
import TandC from './termsconditions';


export default class App extends Component {
	/** Gets fired when the route changes.
	 *	@param {Object} event		"change" event from [preact-router](http://git.io/preact-router)
	 *	@param {string} event.url	The newly routed URL
	 */
	handleRoute = e => {
		this.currentUrl = e.url;
	};

	render() {
		return (
			<div id="app">
				<Header />
				<Router onChange={this.handleRoute}>
					<HowToPlay path="/web/howtoplay" />
					<FAQ path="/web/faq" />
					<Rules path="/web/rules/" />
					<TandC path="/web/termsconditions"/>
				</Router>
			</div>
		);
	}
}
