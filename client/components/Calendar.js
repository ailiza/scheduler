import React from "react";
import ApiCalendar from "react-google-calendar-api";
import { connect } from "react-redux";
import { getClients } from "../store/clients";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import StripeCheckout from "react-stripe-checkout";

class Calendar extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			events: [],
			refreshIFrame: 0,
			form: {
				summary: "",
				start: new Date("2020-11-21"),
				end: "",
				clientId: "",
			},
		};
		this.handleItemClick = this.handleItemClick.bind(this);
		this.onChange = this.onChange.bind(this);
		this.onChangeDate = this.onChangeDate.bind(this);
	}

	handleItemClick(event, name) {
		if (name === "sign-in") {
			ApiCalendar.handleAuthClick();
		} else if (name === "sign-out") {
			ApiCalendar.handleSignoutClick();
		}
	}

	onChange(event) {
		this.setState({
			form: { ...this.state.form, [event.target.name]: event.target.value },
		});
	}

	onChangeDate(event, name) {
		this.setState({
			form: { ...this.state.form, [name]: event },
		});
	}

	async componentDidMount() {
		await this.props.getClients();
		if (!this.props.clients.length) return;
		this.setState({
			form: { ...this.state.form, clientId: this.props.clients[0].id },
		});
	}

	render() {
		const calendarId = "jeppl73q6cgd0k9fg4gg9t2hd0@group.calendar.google.com";
		const clients = this.props.clients || [];
		return (
			<div>
				<iframe
					src={`https://calendar.google.com/calendar/embed?src=${calendarId}&ctz=America%2FNew_York`}
					style={{ border: 0 }}
					width="1000"
					height="800"
					frameBorder="0"
					scrolling="no"
					key={this.state.refreshIFrame}
				></iframe>
				<form
					onSubmit={async (e) => {
						e.preventDefault();
						const event = {
							start: {
								dateTime: new Date(this.state.form.start),
								timeZone: "America/New_York",
							},
							end: {
								dateTime: new Date(this.state.form.end),
								timeZone: "America/New_York",
							},
							summary: this.state.form.summary,
							attendees: [
								clients.find(
									(client) => client.id === +this.state.form.clientId
								),
							],
						};
						console.log(event);
						await ApiCalendar.createEvent(event, calendarId);
						this.setState({ refreshIFrame: this.state.refreshIFrame + 1 });
					}}
				>
					<select
						name="clientId"
						onChange={this.onChange}
						value={this.state.form.clientId}
					>
						{clients.map((client) => (
							<option key={client.id} value={client.id}>
								{client.displayName}
							</option>
						))}
					</select>
					<input
						type="text"
						placeholder="Summary"
						name="summary"
						value={this.state.form.summary}
						onChange={this.onChange}
					/>

					<DatePicker
						selected={this.state.form.start}
						value={this.state.form.start}
						onChange={(event) => this.onChangeDate(event, "start")}
						showTimeSelect
					/>
					<DatePicker
						value={this.state.form.end}
						onChange={(event) => this.onChangeDate(event, "end")}
						showTimeSelect
					/>

					<button type="submit">Add Event</button>
				</form>
				<button onClick={(e) => this.handleItemClick(e, "sign-in")}>
					sign-in
				</button>
				<button onClick={(e) => this.handleItemClick(e, "sign-out")}>
					sign-out
				</button>
				<button
					onClick={async () => {
						const result = await ApiCalendar.createEventFromNow(
							{ time: 60, summary: "Tutoring", description: "Description" },
							calendarId
						);
						this.setState({ refreshIFrame: this.state.refreshIFrame + 1 });
					}}
				>
					Create Tutoring Event
				</button>
				<button
					onClick={() => {
						ApiCalendar.listUpcomingEvents(10, calendarId).then(
							({ result }) => {
								this.setState({ events: result.items });
							}
						);
					}}
				>
					Display Events
				</button>
				<ul>
					{this.state.events.map((event) => (
						<li key={event.id}>{event.summary}</li>
					))}
				</ul>
			</div>
		);
	}
}

const mapStateToProps = (state) => ({
	clients: state.clients,
});

const mapDispatchToProps = (dispatch) => ({
	getClients: () => dispatch(getClients()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Calendar);
