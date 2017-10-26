import { h, Component } from 'preact';
import { Helmet } from "react-helmet";
import axios from 'axios';
import styles from './styles.css';
import API from '../api';
import Loading from '../common/Loading';
import DownloadAppCard from '../common/DownloadAppCard';
import NewsAuthor from '../common/NewsAuthor';


export default class NewsDetail extends Component {
	state = {
		newsDetails: undefined,
		isFetchingNewsDetails: true
	}
	componentDidMount() {
		this.fetchNewsDetails(this.props.newsid);
	}
	fetchNewsDetails = (newsId) => {
		axios.get(`${API.baseURL}News/${newsId}/details`).then((response) => {
			this.setState(() =>
				({ newsDetails: response.data, isFetchingNewsDetails: false }));
		});
	}
	render(props, state) {
		const { newsDetails } = state;
		return (
			state.isFetchingNewsDetails ?
				<Loading />
				:
				<div>
					<Helmet>
						<title>{newsDetails.title}</title>
					</Helmet>
					<div class={styles.rootContainer}>
						<div class="content">
							<h1>{newsDetails.title}</h1>
						</div>
						<NewsAuthor
							author={newsDetails.author}
							createdAt={new Date(newsDetails.createdAt)}
						/>
						<figure class="image">
							<img src={newsDetails.media[0].href} alt="News Header Image" />
						</figure>
						<div class={styles.newsContentStyles}>
						{
							newsDetails.description ?
							<div  dangerouslySetInnerHTML={{__html: newsDetails.description }} />
							:
							<p>{newsDetails.summary}</p>
						}
						</div>
						<DownloadAppCard />
					</div>
				</div>
		);
	}
}
