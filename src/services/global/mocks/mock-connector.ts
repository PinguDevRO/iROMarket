import MockAdapter from "axios-mock-adapter";
import getMarketSummaryMock from "./market-summary-mock";
import getListingSummaryMock from "./listing-summary-mock";

const connectGlobalMocks = (mock: MockAdapter) => {
    mock.onGet('https://fenixapi.gay/summary')
    .reply(200, getMarketSummaryMock);
    mock.onGet(/https:\/\/fenixapi\.gay\/listing\/summary(\?q=.*)?/)
    .reply(200, getListingSummaryMock);
};

export default connectGlobalMocks;
