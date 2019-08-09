const spacemanFetch = (path: string, body: {}) =>
  fetch("https://spaceman-staging-origin.wework.com" + path, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });

export default class SpacemanTokenClient {
  myResponse: any;
  constructor(idToken: string) {
    this.create(idToken);
  }

  async create(idToken: string): Promise<any> {
    try {
      const res = await spacemanFetch('/api/v2/sessions', {
        id_token: idToken,
        application_name: "Spacestation",
      });

      const response = await res.json();
      console.log('response', response);

      this.myResponse = response;
      return response;
    } catch (err) {

      if (err) {
        console.log('err', err);
      }

      throw err;
    }
  }

  getMyResponse = () => {
    console.log(this.myResponse);
    return this.myResponse;
  } 
}
