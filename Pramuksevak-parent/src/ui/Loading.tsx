import React from "react";

interface LoadingProps {
	message?: string;
}

const Loading: React.FC<LoadingProps> = ({ message = "Loading..." }) => {
	return (
		<div className="loading-container">
			{" "}
			{/* Center it, add spinner CSS */}
			<div className="spinner"></div> {/* Use CSS for animation */}
			<p>{message}</p>
		</div>
	);
};

export default Loading;
