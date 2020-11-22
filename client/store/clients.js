import axios from "axios";

//ACTION TYPE
const GOT_CLIENTS = "GOT_CLIENTS";

//ACTION CREATOR
const gotClients = (clients) => ({ type: GOT_CLIENTS, clients });

//THUNK
export const getClients = () => async (dispatch) => {
	try {
		const { data } = await axios.get("/api/clients");
		dispatch(gotClients(data));
	} catch (error) {
		console.error(error);
	}
};

//REDUCER
export default (state = [], action) => {
	switch (action.type) {
		case GOT_CLIENTS:
			return action.clients;
		default:
			return state;
	}
};
