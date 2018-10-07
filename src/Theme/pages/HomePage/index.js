import React from "react";
import { Link } from "react-router";
import { DBText, fetcher, editor, EditableText, Icons } from "cude-cms";
import { Grid, Row, Col } from "react-styled-flexboxgrid";
import CaseOverview from "../CaseOverview";
import OtherProjects from "../OtherProjects";
import styles from "./index.module.css";
import Navigation from "../../blocks/Navigation/index";
import DocumentMeta from "react-document-meta";
import Footer from "../../blocks/Footer/index";
import { Animate, promiseSequence } from "cude-animations";
let { Github, Twitter, Snapchat, Instagram, ...IconsRest } = Icons;

class HomePage extends React.Component {
	state = { bubbleTime: false };

	componentDidMount() {
		const man1 = val => {
			this.refs.nav.style.opacity = `${val / 100}`;
		};
		const man2 = val => {
			this.refs.divider.style.transform = `scaleX(${val / 100})`;
		};
		const man3 = val => {
			this.refs.text.style.clipPath = `polygon(0 0, 100% 0, 100% ${val}%, 0% ${val}%)`;
		};
		const man4 = val => {
			if (val > 0) this.refs.socials.classList.add(styles.reveal);
		};

		const options = {
			start: 0,
			end: 100,
			duration: 500
		};

		const animations = [
			new Animate({ ...options, manipulator: man1 }),
			new Animate({ ...options, manipulator: man3 }),
			new Animate({ ...options, manipulator: man2 }),
			new Animate({ ...options, manipulator: man4 })
		];

		const funcs = animations.map(animation => () => animation.start());

		promiseSequence(funcs)
			.then(() => console.log("finished"))
			.catch(err => console.log(err));
	}

	render() {
		const meta = {
			title: "Christopher Ulrick Dengsø",
			description: "Christopher Ulrick Dengsø",
			meta: {
				charSet: "utf-8",
				name: {
					// keywords: 'react,meta,document,html,tags'
				}
			}
		};
		const email = "chrdengso@gmail.com";
		return (
			<div>
				<div className={styles.hero}>
					<header>
						<DocumentMeta {...meta} extend />
						<div style={{ opacity: 0 }} ref="nav">
							<Navigation />
						</div>
					</header>
					<Grid fluid className={"container"}>
						<div ref="divider" className="divider" />
						<div ref="socials" className={styles.social}>
							<a href="https://twitter.com/ChrisDengso">
								<Twitter className={styles.twitter} />
							</a>
							<a href="https://www.instagram.com/cruelmoneyyy/">
								<Instagram className={styles.instagram} />
							</a>
							<a href="https://github.com/CruelMoney/">
								<Github className={styles.github} />
							</a>
						</div>
						<Row>
							<Col xs={12}>
								<section>
									<div ref="text" className="h1 info-text">
										<DBText dbKey="homepage-introduction" />
										<a
											data-text={email}
											className={styles.email}
											href={"mailto:" + email}
										>
											{email}
										</a>
									</div>
								</section>
							</Col>
						</Row>
					</Grid>
				</div>

				<CaseOverview selectedCases={this.props.data.cases} />

				<OtherProjects />

				<Footer />
			</div>
		);
	}
}

export default fetcher(HomePage, "/api/homepage");
