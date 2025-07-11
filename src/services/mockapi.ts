import { AxiosInstance } from "axios";
import MockAdapter from "axios-mock-adapter";
import connectGlobalMocks from "./global/mocks/mock-connector";
import connectListingMocks from "./listing/mocks/mock-connector";
import connectHistoryMocks from "./history/mocks/mock-connector";
import connectRoPDMocks from "./ropd/mocks/mock-connector";


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

        connectGlobalMocks(mock);
        connectListingMocks(mock);
        connectHistoryMocks(mock);
        connectRoPDMocks(mock);
        return axios;
    }
}

export default MockApi;
