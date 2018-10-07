import React from "react";
import { Link } from "react-router";
import Case from "../../blocks/Case";
import CaseExtended from "../Case";
import styles from "./index.module.css";
import { Grid, Row, Col } from "react-styled-flexboxgrid";
import { DBText, fetcher } from "cude-cms";
import { connect } from "react-redux";
import * as a from "./actions";
import { ScrollAnimator } from "cude-animations";
import Button from "../../components/Button/index";
import Sine from "../../assets/icons/sine.svg";

class CaseOverview extends React.Component {
	scrollContainer = null;
	state = {
		caseClosed: true,
		factOne: ["", ""],
		factTwo: ["", ""],
		factThree: ["", ""],
		idx: -1
	};
	keyframesPushed = false;
	keyframes = [];

	componentDidMount() {
		setTimeout(() => {
			const wrapper = document.querySelector("#case-overview");

			const keyframes = [getEmptyKeyframe(wrapper), ...this.keyframes];

			const animator = new ScrollAnimator(
				this.scrollContainer,
				keyframes
			).start();
		}, 1000);
	}

	componentWillReceiveProps(nextProps) {
		if (!nextProps.openCase) {
			this.setState({ caseClosed: true });
		} else {
			this.setState({
				caseClosed: false,
				openCase: nextProps.openCase
			});
		}
	}

	setCaseInfo = (theCase, idx) => {
		this.setState({
			type: theCase.type,
			factOne: theCase.factOne.split(":"),
			factTwo: theCase.factTwo.split(":"),
			factThree: theCase.factThree.split(":"),
			color: theCase.primaryColor
		});
	};

	renderCases = () => {
		this.keyframes = [];
		const selectCount = this.props.selectedCases
			? this.props.selectedCases.length
			: 0;
		let idx = 0;
		return this.props.data
			.sort((a, b) => a.sortOrder - b.sortOrder)
			.map((theCase, ndx) => {
				if (!this.props.selectedCases.includes(theCase._id)) {
					return null;
				}
				return (
					<section
						key={theCase._id}
						className="case"
						ref={sec => {
							if (sec) {
								if (idx++ === 0) {
									pushFirstRevealKeyframe(
										sec,
										theCase._id,
										this.keyframes,
										() => this.setCaseInfo(theCase)
									);
								} else {
									pushRevealKeyframe(sec, theCase._id, this.keyframes, () =>
										this.setCaseInfo(theCase)
									);
								}

								pushHideKeyframe(sec, theCase._id, this.keyframes, () =>
									this.setCaseInfo(theCase)
								);
							}
						}}
					>
						<Case id={theCase._id} case={theCase} />
					</section>
				);
			});
	};

	render() {
		return (
			<section id="case-overview">
				<div id="case-intro">
					<h2 className={styles.header}>Selected Work</h2>
					<p>2016-2018</p>
				</div>

				<div
					ref={con => {
						this.scrollContainer = con;
					}}
					className={styles.casesContainer}
				>
					<div id="case-frame">
						<Grid fluid className="container">
							<Row middle="xs">
								<Col xs={12}>
									<div id="frame">
										<div id="case-type">
											<h4>{this.state.type}</h4>
										</div>
										<div id="case-facts">
											<h4>
												{this.state.factOne[0]}
												<span>{this.state.factOne[1]}</span>
											</h4>
											<h4>
												{this.state.factTwo[0]}
												<span>{this.state.factTwo[1]}</span>
											</h4>
											<h4>
												{this.state.factThree[0]}
												<span>{this.state.factThree[1]}</span>
											</h4>
										</div>
									</div>
								</Col>
							</Row>
						</Grid>
					</div>

					{this.renderCases()}
				</div>
			</section>
		);
	}
}

const mapStateToProps = state => {
	return { openCase: state.openCase };
};

CaseOverview = connect(mapStateToProps)(CaseOverview);

export default fetcher(CaseOverview, "/api/cases");

const getEmptyKeyframe = wrapper => {
	return {
		wrapper,
		duration: "100%",
		animations: []
	};
};

const pushFirstRevealKeyframe = (wrapper, id, keyframes, keyframeStarted) => {
	keyframes.push({
		wrapper: wrapper,
		keyframeStarted: keyframeStarted,
		duration: "200%",
		animations: [
			{
				selector: "#case-intro",
				translateY: ["0%", "-100%"],
				easing: "easeInQuad",
				manipulator: (val, t, e) => {
					e.style.letterSpacing = val / 100 + "em";
				},
				valueRange: [0, 100],
				opacity: [1, -4]
			},
			{
				selector: "#case-type",
				manipulator: (val, t, e) => {
					e.style.transform = `translate(-50%, -50%) scaleX(${Math.min(
						1,
						val
					)})`;
				},
				valueRange: [0, 1.5]
			},
			{
				selector: "#case-facts",
				manipulator: (val, t, e) => {
					e.style.transform = `translate(-50%, 50%) scaleX(${Math.min(
						1,
						val
					)})`;
				},
				valueRange: [0, 1.5]
			},
			{
				selector: "#case-text-" + id,
				translateY: ["100%", "0%"],
				opacity: [-1, 1],
				easing: "easeOutQuad"
			},
			{
				selector: "#case-image-" + id + "-1",
				translateY: ["80%", "0%"],
				easing: "easeOutQuad",
				opacity: [-1, 1]
			},
			{
				selector: "#case-image-" + id + "-2",
				translateY: ["90%", "0%"],
				easing: "easeOutQuad",
				opacity: [-1, 1]
			},
			{
				selector: "#case-image-" + id + "-3",
				translateY: ["100%", "0%"],
				easing: "easeOutQuad",
				opacity: [-1, 1]
			},

			{
				selector: "#case-type h4",
				translateY: ["40%", "0%"],
				easing: "easeOutQuad"
			},
			{
				selector: "#case-facts h4:nth-child(1)",
				translateY: ["40%", "0%"],
				easing: "easeOutQuad"
			},
			{
				selector: "#case-facts h4:nth-child(2)",
				delay: "10%",
				easing: "easeOutQuad",
				translateY: ["40%", "0%"]
			},
			{
				selector: "#case-facts h4:nth-child(3)",
				delay: "20%",
				easing: "easeOutQuad",
				translateY: ["40%", "0%"]
			},
			{
				selector: "#frame",
				translateY: ["0%", "-0%"] // hack for centering frame when scrolling from below
			}
		]
	});
};

const pushRevealKeyframe = (wrapper, id, keyframes, keyframeStarted) => {
	keyframes.push({
		wrapper: wrapper,
		keyframeStarted: keyframeStarted,
		duration: "100%",
		animations: [
			{
				selector: "#case-text-" + id,
				translateY: ["50%", "0%"],
				opacity: [0, 1],
				easing: "easeOutQuad"
			},
			{
				selector: "#case-image-" + id + "-1",
				translateY: ["30%", "0%"],
				easing: "easeOutQuad",

				opacity: [0, 1]
			},
			{
				selector: "#case-image-" + id + "-2",
				translateY: ["40%", "0%"],
				easing: "easeOutQuad",

				opacity: [0, 1]
			},
			{
				selector: "#case-image-" + id + "-3",
				translateY: ["50%", "0%"],
				easing: "easeOutQuad",

				opacity: [0, 1]
			},

			{
				selector: "#case-type h4",
				translateY: ["40%", "0%"],
				easing: "easeOutQuad"
			},
			{
				selector: "#case-facts h4:nth-child(1)",
				translateY: ["40%", "0%"],
				easing: "easeOutQuad"
			},
			{
				selector: "#case-facts h4:nth-child(2)",
				delay: "10%",
				easing: "easeOutQuad",
				translateY: ["40%", "0%"]
			},
			{
				selector: "#case-facts h4:nth-child(3)",
				delay: "20%",
				easing: "easeOutQuad",
				translateY: ["40%", "0%"]
			},
			{
				selector: "#frame",
				translateY: ["0%", "-0%"] // hack for centering frame when scrolling from below
			}
		]
	});
};

const pushHideKeyframe = (wrapper, id, keyframes, keyframeStarted) => {
	keyframes.push({
		wrapper: wrapper,
		keyframeStarted: keyframeStarted,
		duration: "100%",
		animations: [
			{
				selector: "#case-type h4",
				translateY: ["0%", "-50%"],
				easing: "easeInQuad"
			},
			{
				selector: "#case-text-" + id,
				translateY: ["0%", "-25%"],
				easing: "easeInQuad",
				opacity: [1, 0]
			},

			{
				selector: "#case-facts h4:nth-child(1)",
				easing: "easeInQuad",
				translateY: ["0%", "-40%"]
			},
			{
				selector: "#case-facts h4:nth-child(2)",
				//'delay'       : "30%",
				easing: "easeInQuad",
				translateY: ["0%", "-40%"]
			},
			{
				selector: "#case-facts h4:nth-child(3)",
				//'delay'       : "60%",
				easing: "easeInQuad",
				translateY: ["0%", "-40%"]
			},
			{
				selector: "#case-image-" + id + "-1",
				translateY: ["0%", "-40%"],
				easing: "easeInQuad",
				opacity: [1, 0]
			},
			{
				selector: "#case-image-" + id + "-2",
				translateY: ["0%", "-30%"],
				easing: "easeInQuad",
				opacity: [1, 0]
			},
			{
				selector: "#case-image-" + id + "-3",
				translateY: ["0%", "-20%"],
				easing: "easeInQuad",
				opacity: [1, 0]
			},
			{
				selector: "#frame",
				translateY: ["0%", "-0%"] // hack for centering frame when scrolling from below
			}
		]
	});
};

const pushLastKeyframe = (wrapper, id, keyframes, keyframeStarted) => {
	const caseFacts = document.querySelector("#case-facts");

	keyframes.push({
		wrapper: wrapper,
		keyframeStarted: keyframeStarted,
		duration: "100%",
		animations: [
			{
				selector: "#frame",
				translateY: ["0%", "-100%"],
				easing: "linear",
				opacity: [1, 1]
			},

			{
				selector: "#case-text-" + id,
				translateY: ["0%", "-100%"],
				easing: "linear",
				opacity: [1, 0]
			},
			{
				selector: "#case-image-" + id + "-1",
				translateY: ["0%", "-100%"],
				easing: "linear",
				opacity: [1, 0]
			},
			{
				selector: "#case-image-" + id + "-2",
				translateY: ["0%", "-100%"],
				easing: "linear",
				opacity: [1, 0]
			},
			{
				selector: "#case-image-" + id + "-3",
				translateY: ["0%", "-100%"],
				easing: "linear",
				opacity: [1, 0]
			},
			{
				manipulator: val => {
					caseFacts.style.transform = `translate(-50%, 50%) scaleX(${val})`;
				},
				valueRange: [1, 0]
			},
			{
				selector: "#case-facts h4:nth-child(1)",
				translateY: ["0%", "40%"]
			},
			{
				selector: "#case-facts h4:nth-child(2)",
				translateY: ["0%", "40%"]
			},
			{
				selector: "#case-facts h4:nth-child(3)",
				translateY: ["0%", "40%"]
			}
		]
	});
};
