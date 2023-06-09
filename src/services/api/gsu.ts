import axios from 'axios';

const GSU_RATES =
  process.env.GSU_RATES || 'https://api.gsucoin.app/Products/GSULive/';

type RatesAPIResponse = {
  price: string;
};

export const fetchGSURates = async function (symbol: string): Promise<number> {
  let rate = 0;
  try {
    const response = await axios(GSU_RATES + '?symbol=' + symbol, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    });
    console.log(response, 'response');

    if (!(response.status == 200)) {
      console.log('errrrrrrr');

      throw new Error(`Error! status: ${response.status}`);
    }
    const result = (await response.data) as RatesAPIResponse;

    rate = Number(result.price);
    // if (rate.isZero()) {
    //     rate = new BigNumber(1);
    //     console.warn('sending bad GSU rate', rate.toString());
    // }
  } catch (error) {
    console.error('fetchGSURates error message: ', error);
  }

  return rate;
};