import MockAdapter from "axios-mock-adapter";
import getItemListingMock from "./item-listing-mock";

const connectListingMocks = (mock: MockAdapter) => {
    mock.onGet(/https:\/\/fenixapi\.gay\/listing\?id=\d+/)
    .reply(200, getItemListingMock);
};

export default connectListingMocks;
