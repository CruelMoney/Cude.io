import React, { PureComponent } from "react";
import styles from "./index.module.css";
import Logo from "./logo";

class index extends PureComponent {
	render() {
		const { active } = this.props;
		return (
			<React.Fragment>
				<style>{`
        .loadingScreen {
            position: fixed;
            pointer-events: none;
            top: 0;
            bottom: 0;
            left: 0;
            right: 0;
            display: flex;
            align-items: center;
            justify-content: center;
            opacity: 0;
            transition: opacity 0.25s ease;
          }
          .loadingScreen.active {
            opacity: 1;
          }
          .logoWrapper {
            position: relative;
          }
          .logoWrapper > *:first-child {
            clip-path: polygon(0 0%, 100% 0%, 100% 100%, 0% 100%);
            -webkit-clip-path: polygon(0 0%, 100% 0%, 100% 100%, 0% 100%);
          }
          .logoWrapper > *:first-child {
            animation: loading 1s infinite reverse;
          }
          .bgLogo {
            position: absolute;
            top: 0;
            left: 0;
            opacity: 0.5;
          }
          @keyframes loading {
            0% {
              clip-path: polygon(0 0%, 100% 0%, 100% 100%, 0% 100%);
              -webkit-clip-path: polygon(0 0%, 100% 0%, 100% 100%, 0% 100%);
            }
            25% {
              clip-path: polygon(0 100%, 100% 100%, 100% 100%, 0% 100%);
              -webkit-clip-path: polygon(0 100%, 100% 100%, 100% 100%, 0% 100%);
            }
            75% {
              clip-path: polygon(0 0, 100% 0, 100% 0, 0 0);
              -webkit-clip-path: polygon(0 0, 100% 0, 100% 0, 0 0);
            }
            100% {
              clip-path: polygon(0 0%, 100% 0%, 100% 100%, 0% 100%);
              -webkit-clip-path: polygon(0 0%, 100% 0%, 100% 100%, 0% 100%);
            }
          }
      `}</style>
				<div className={"loadingScreen" + " " + (active && "active")}>
					<div className={"logoWrapper"}>
						<Logo />
						<div className={"bgLogo"}>
							<Logo />
						</div>
					</div>
				</div>
			</React.Fragment>
		);
	}
}

export default index;
