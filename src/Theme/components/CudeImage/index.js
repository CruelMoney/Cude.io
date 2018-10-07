import React from "react";
import style from "./index.module.css";

/**
 * A class that only pulls the image when it is in viewport
 */
export default class OtherProjects extends React.Component {
	state = {
		intersected: false,
		loaded: false
	};

	startObserving = ref => {
		if (!window.cudeIntersectionObserver) {
			var options = {
				threshold: [1.0, 0.0],
				rootMargin: "400px"
			};

			const createInter = (_ => {
				let first = true;
				window.cudeIntersectionObserver = new IntersectionObserver(entries => {
					for (let entry of entries) {
						if (entry.intersectionRatio >= 1) {
							entry.target.revealMethod();
						}
					}
				}, options);
			})();
		}

		const registerInter = (_ => {
			ref.revealMethod = _ => {
				this.setState({ intersected: true });
			};
			window.cudeIntersectionObserver.observe(ref);
		})();
	};

	componentDidMount() {
		this.startObserving(this.refs.cudeImage);
	}

	componentWillMount() {}
	componentWillUnmount() {
		window.cudeIntersectionObserver.unobserve(this.refs.cudeImage);
	}

	render() {
		let { ratio, width, height } = { ...this.props };
		if (1.5 && ratio > 1.5) {
			const margin = width * 0.2 * 2; // 20% subtracted each side
			height = (width - margin) * ratio; // new height after margin added
			ratio = height / width; // new ratio
		}
		return (
			<div
				src={this.props.url}
				className={"cude-image" + (this.state.loaded ? " loaded" : "")}
				style={{
					...this.props.style,
					background: this.props.thumbnail
						? `url(${this.props.thumbnail})`
						: "transparent",
					backgroundSize: "100% 100%",
					paddingTop: `${ratio * 100}%`,
					margin: `0 ${this.props.ratio > 1.5 ? "20%" : "0px"}`
				}}
				ref="cudeImage"
			>
				{this.state.intersected ? (
					<img
						onLoad={() => this.setState({ loaded: true })}
						ref={i => {
							if (i && i.complete) {
								i.classList.add("loaded");
							}
						}}
						src={this.props.url}
						alt=""
					/>
				) : null}
			</div>
		);
	}
}
