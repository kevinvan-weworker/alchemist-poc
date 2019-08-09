const GAPI_SRC = 'https://apis.google.com/js/api.js';


export class OauthClient {
  gapi: any;

  constructor() {
    this.initialize();
  }

  initialize() {
    this.gapi = new Promise(resolve => {
      // There is no NPM library for Google's API Platform, so we need to dynamically load the script
      // (borrowed from https://gist.github.com/mikecrittenden/28fe4877ddabff65f589311fd5f8655c)
      const gapiScript = document.createElement('script');

      gapiScript.onload = () => {
        // @ts-ignore
        window.gapi.load('auth2', {
          callback: () => {
            // @ts-ignore
            window.gapi.auth2
              .init({
                client_id: "83585218514-qskuqgrlv9snteuf0lc6n2tqnqh9hilv.apps.googleusercontent.com",
                scope: 'openid email',
                redirect_uri: window.location.origin,
              })
              // @ts-ignore
              .then(() => resolve(window.gapi));
          },
        });
      };

      gapiScript.src = GAPI_SRC;

      // The OauthClient will only be initialized in the context of the running React app,
      // so we can be sure the body exists at this point. Flow complains (rightly) unless we
      // do a null check here
      document.body && document.body.appendChild(gapiScript);
    });
  }

  getAuthInstance(): Promise<any> {
    // @ts-ignore
    return this.gapi.then(gapi => gapi.auth2.getAuthInstance());
  }

  async showPopup(): Promise<void> {
    const authInstance = await this.getAuthInstance();

    return authInstance.signIn();
  }

  async fetchData(): Promise<any> {
    const user = await this.getUser();
    const profile = user.getBasicProfile();

    return {
      email: profile.getEmail(),
      id: profile.getId(),
      picture: profile.getImageUrl(),
    };
  }

  async getUser(): Promise<any> {
    const authInstance = await this.getAuthInstance();

    return authInstance.currentUser.get();
  }

  async getAuthResponse(): Promise<any> {
    const user = await this.getUser();

    return user.getAuthResponse();
  }
}

const oauthClient = new OauthClient();

export default oauthClient;