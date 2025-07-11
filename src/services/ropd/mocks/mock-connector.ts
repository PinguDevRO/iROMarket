import MockAdapter from "axios-mock-adapter";
import getRoPDPlayersMock from "./ropd-players-mock";
import getRoPDIdMock from "./ropd-id-mock";

const connectRoPDMocks = (mock: MockAdapter) => {
    mock.onGet(/https:\/\/fenixapi\.gay\/ropd\?id=\d+/)
    .reply(200, getRoPDIdMock);
    mock.onGet(/https:\/\/fenixapi\.gay\/ropd(\?q=.*)?/)
    .reply(200, getRoPDPlayersMock);
};

export default connectRoPDMocks;
