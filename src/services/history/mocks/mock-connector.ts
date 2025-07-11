import MockAdapter from "axios-mock-adapter";
import getItemDetailMock from "./item-detail-mock";

const connectHistoryMocks = (mock: MockAdapter) => {
    mock.onGet(/https:\/\/fenixapi\.gay\/history\?id=\d+/)
    .reply(200, getItemDetailMock);
};

export default connectHistoryMocks;
