import React, { useEffect } from "react";
import { useTimer } from "react-timer-hook";

const Component = React.forwardRef((props, ref) => {
	const time = new Date();
	time.setSeconds(time.getSeconds() + 10); // 10 minutes timer

	const expiryTimestamp = time;

	// Adds callbacks
	const { onExpire } = props;

	const {
		totalSeconds,
		seconds,
		minutes,
		hours,
		days,
		isRunning,
		start,
		pause,
		resume,
		restart,
	} = useTimer({
		expiryTimestamp,
		onExpire: () => onExpire(),
	});

	// Forwards reference to the parent component and exposes the start and pause functions
	React.useImperativeHandle(ref, () => ({
		start,
		pause,
	}));

	return (
		<div style={{ textAlign: "center" }}>
			<div style={{ fontSize: "5em" }}>
				<span>{String(hours).padStart(2, "0")}</span>:
				<span>{String(minutes).padStart(2, "0")}</span>:
				<span>{String(seconds).padStart(2, "0")}</span>
			</div>
			<p>{isRunning ? "Running" : "Not running"}</p>
		</div>
	);
});

export default Component;
