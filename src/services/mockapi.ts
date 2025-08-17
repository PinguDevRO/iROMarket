import { AxiosInstance } from "axios";
import MockAdapter from "axios-mock-adapter";
import connectHistoryMocks from "./history/mocks/mock-connector";


const MockApi = (
    axios: AxiosInstance,
    enabled: boolean
) => {
    if (!enabled) {
        return axios;
    }
    else {
        const mock = new MockAdapter(axios, {
            onNoMatch: "passthrough",
            delayResponse: 500,
        });

        connectHistoryMocks(mock);
        return axios;
    }
}

export default MockApi;
