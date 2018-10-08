import React from "react";
import { connect, dispatch } from "react-redux";
import styles from "./index.module.css";
import { Grid, Row, Col } from "react-styled-flexboxgrid";
import { EditableText, fetcher } from "cude-cms";
import Bricks from "bricks.js";
import CudeImage from "../../components/CudeImage";
import Button from "../../components/Button/index";
import LinkIcon from "../../assets/icons/link.svg";
import * as a from "./actions";

class OtherProjects extends React.Component {
	state = {
		projects: [],
		instas: [],
		packed: false,
		popup: false
	};

	componentWillMount() {
		this.setState({ projects: this.props.data });
	}

	componentDidMount() {
		this.fetchInstas();
	}

	componentWillReceiveProps(nextprops) {
		if (nextprops.data.length !== this.props.data.length) {
			this.setState({ projects: nextprops.data });
		}
		if (!!nextprops.searchQuery) {
			document.body.style.overflow = "hidden";
			this.search(nextprops.searchQuery, true);
			setTimeout(() => {
				// this.refs.searchField.focus()
			}, 100);
			//escape button handling
			document.onkeydown = evt => {
				evt = evt || window.event;
				var isEscape = false;
				if ("key" in evt) {
					isEscape = evt.key == "Escape" || evt.key == "Esc";
				} else {
					isEscape = evt.keyCode == 27;
				}
				if (isEscape) {
					this.closePopup();
				}
			};
		} else {
			this.search("");
		}
	}

	closePopup = () => {
		this.refs.wrapper.style.transform = "none";
		setTimeout(() => {
			this.setState({
				popup: false,
				searching: false
			});
			this.props.resetSearch();
			this.refs.wrapper.style.transform = null;
		}, 500);
		document.body.style.overflow = "initial";
		document.onkeydown = null;
	};

	fetchInstas = () => {
		fetch("/api/instagram", { credentials: "include" })
			.then(res => res.json())
			.then(instas => {
				const projects = instas.map(img => {
					const image = {
						url: img.display_src,
						ratio: img.dimensions.height / img.dimensions.width,
						height: img.dimensions.height,
						width: img.dimensions.width,
						thumbnail: img.thumbnail
					};
					return (
						<Project
							key={img.display_src}
							url={`https://www.instagram.com/p/${img.shortcode}`}
							type={"instagram"}
							title={"instagram"}
							image={image}
						/>
					);
				});
				this.setState({
					instas: projects
				});
			})
			.catch(err => {
				console.log(err);
			});
	};

	search = (query, popup) => {
		const newProjects = this.props.data.filter(project => {
			return (
				(project.tags &&
					project.tags.toLowerCase().includes(query.toLowerCase())) ||
				project.type.toLowerCase().includes(query.toLowerCase()) ||
				project.title.toLowerCase().includes(query.toLowerCase())
			);
		});

		this.setState({
			projects: newProjects,
			popup: !!popup,
			searching: !!query
		});
	};

	packBricks(container) {
		const sizes = [
			{
				columns: 1,
				gutter: 20
			},
			{
				mq: "48em",
				columns: 2,
				gutter: 20
			},
			{
				mq: "64em",
				columns: 3,
				gutter: 20
			},
			{
				mq: "75em",
				columns: 3,
				gutter: 20
			}
		];
		const bricks = Bricks({
			container: container,
			packed: "data-packed",
			sizes: sizes
		});

		bricks
			.resize(true) // bind resize handler
			.pack();
	}

	renderProjects = () => {
		let idx = 0;
		let jdx = 0;
		const instasCount = this.state.instas.length;
		const projectsCount = this.state.projects.reduce((acc, val) => {
			return val.images.length + acc;
		}, 0);
		const insertEvery =
			instasCount !== 0 ? Math.floor(projectsCount / instasCount) : false;

		const renderThis = this.state.projects.reduce((sum, project) => {
			const projects = project.images.reduce((acc, val) => {
				acc = [
					...acc,
					<Project
						{...project}
						key={val.url}
						url={project.link}
						type={project.type}
						title={project.title}
						image={val}
					/>
				];
				// Sprinkle in instas
				if (!this.state.searching && insertEvery && idx++ % insertEvery === 0) {
					acc.push(this.state.instas[jdx++]);
				}
				return acc;
			}, []);

			return [...sum, ...projects];
		}, []);

		return renderThis;
	};

	render() {
		console.log(this.state);
		return (
			<div
				ref="wrapper"
				className={
					styles.projectsBackground +
					" " +
					(this.state.popup ? styles.popup : null)
				}
			>
				<Grid fluid className="container">
					<Row end="xs">
						<Col xs={12}>
							<input
								className={styles.search}
								type="text"
								ref="searchField"
								onFocus={e => (e.target.placeholder = "")}
								onChange={e => this.search(e.target.value)}
								placeholder={this.props.searchQuery || "Other activities"}
							/>
							<div className={styles.closePopup} onClick={this.closePopup}>
								<span />
								<span />
							</div>
						</Col>
					</Row>
				</Grid>
				<div
					ref={r => {
						if (r) {
							this.packBricks(r);
						}
					}}
					className={styles.container}
				>
					{this.renderProjects()}
				</div>
			</div>
		);
	}
}
const stateToProps = (state, ownprops) => {
	return {
		searchQuery: state.search.value,
		...ownprops
	};
};
const dispatchToProps = dispatch => {
	return {
		resetSearch: () => dispatch(a.search(null))
	};
};

export default fetcher(
	connect(
		stateToProps,
		dispatchToProps
	)(OtherProjects),
	"/api/cases"
);

class Project extends React.Component {
	render() {
		let { ratio } = { ...this.props.image };
		if (ratio > 1.5) return null;
		return (
			<div
				className={
					styles.gridItem + " " + (ratio > 1.5 ? styles.iphoneSize : "")
				}
			>
				<a href={this.props.url} target="_blank">
					<div className={styles.overlay}>
						<div className={styles.scaleIn}>
							<LinkIcon />
						</div>
						<div className={styles.revealUp}>
							<h4>{this.props.title}</h4>
						</div>
						<div className={styles.facts}>
							{this.props.factOne && this.props.factOne.indexOf(":") !== -1 ? (
								<div className={styles.revealUp}>
									<p>
										<span>{this.props.factOne.split(":")[0]}</span>:{" "}
										{this.props.factOne.split(":")[1]}
									</p>
								</div>
							) : null}
							{this.props.factTwo && this.props.factTwo.indexOf(":") !== -1 ? (
								<div className={styles.revealUp}>
									<p>
										<span>{this.props.factTwo.split(":")[0]}</span>:{" "}
										{this.props.factTwo.split(":")[1]}
									</p>
								</div>
							) : null}
							{this.props.factThree &&
							this.props.factThree.indexOf(":") !== -1 ? (
								<div className={styles.revealUp}>
									<p>
										<span>{this.props.factThree.split(":")[0]}</span>:{" "}
										{this.props.factThree.split(":")[1]}
									</p>
								</div>
							) : null}
						</div>
					</div>
					<CudeImage {...this.props.image} />
				</a>
			</div>
		);
	}
}
