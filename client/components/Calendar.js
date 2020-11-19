import React from "react";
import ReactCalendarTest from "./ReactCalendarTest";

class Calendar extends React.Component {
	render() {
		return (
			<div>
				<iframe
					src={`https://calendar.google.com/calendar/embed?src=jeppl73q6cgd0k9fg4gg9t2hd0%40group.calendar.google.com&ctz=America%2FNew_York`}
					style={{ border: 0 }}
					width="1000"
					height="800"
					frameBorder="0"
					scrolling="no"
				></iframe>
				<ReactCalendarTest />
			</div>
		);
	}
}

export default Calendar;
