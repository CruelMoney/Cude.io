import React from "react";
import styles from "./index.module.css";

export default class Github extends React.Component {
	state = {};

	componentDidMount() {
		console.log("mount up");
		fetch("/api/github")
			.then(data => data.json())
			.then(data => {
				this.setState({ commits: data });
			})
			.catch(err => console.log(err));
	}

	render() {
		return this.state.commits ? (
			<div className={styles.stats}>
				<p>
					{this.state.commits} commits on github <br /> within last week
				</p>
			</div>
		) : (
			<div className={styles.stats} />
		);
	}
}
