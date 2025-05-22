let key = {};
// if (process.env.NODE_ENV === "production") {
if (process.env.REACT_APP_MODE === "production") {
  console.log("Set Production Config");
  key = {
    secretOrKey: "FxUum76z",
    API_URL: "https://userapi.b5exchange.com",
    FRONT_URL: "https://b5exchange.com",
    ADMIN_URL: "https://controls.b5exchange.com",
    getGeoInfo: "https://ipapi.co/json/",
    USER_SERVICE: {
      URL: "https://userapi.b5exchange.com",
    },
    WALLET_SERVICE: {
      URL: "https://walletapi.b5exchange.com",
    },
    SPOT_SERVICE: {
      URL: "https://spotapi.b5exchange.com",
    },
    P2P_SERVICE: {
      URL: "https://p2papi.coinbank.finance",
    },
    FUTURES_SERVICE: {
      URL: "https://derivativeapi.b5exchange.com",
    },
    // STAKING_SERVICE: {
    //   URL: 'https://stakingapi.deepliquidity.finance',
    // },
    // LAUNCHPAD_SERVICE: {
    //   URL: 'https://launchpadapi.deepliquidity.finance',
    // },
  };
} else if (process.env.REACT_APP_MODE === "demo") {
  console.log("Set Demo Config ");
  key = {
    secretOrKey: "FxUum76z",
    API_URL: "https://demob5userapi.wearedev.team",
    FRONT_URL: "https://b5exchange-nextjs.pages.dev/",
    ADMIN_URL: "https://b5exchange-admin-panel.pages.dev/",
    getGeoInfo: "https://ipapi.co/json/",
    USER_SERVICE: {
      URL: "https://demob5userapi.wearedev.team",
    },
    WALLET_SERVICE: {
      URL: "https://demob5walletapi.wearedev.team",
    },
    SPOT_SERVICE: {
      URL: "https://demob5spotapi.wearedev.team",
    },
    P2P_SERVICE: {
      URL: "",
    },
    FUTURES_SERVICE: {
      URL: "https://demob5derivativeapi.wearedev.team",
    },
    INVERSE_SERVICE: {
      URL: "https://demob5inverserderivativeapi.wearedev.team",
    },
    // STAKING_SERVICE: {
    //   URL: 'https://stakingapi.alwin.io',
    // },
    // LAUNCHPAD_SERVICE: {
    //   URL: 'https://quelaunchpadapi.wearedev.team',
    // },
  };
} else {
  console.log("Set Development Config");
  const API_URL = "http://localhost";
  key = {
    secretOrKey: "FxUum76z",
    API_URL: `${API_URL}:3001`,
    TRADE_URL: "http://54.211.230.83:8081/api/trade",

    getGeoInfo: "https://ipapi.co/json/",

    socialMedia: {
      facebook: {
        appId: "1034988646970193",
      },
      linkedIn: {
        clientId: "78szlpfkw7ee7s",
        redirectUrl: "https://99893158a13c.ngrok.io/signup",
        oauthUrl:
          "https://www.linkedin.com/oauth/v2/authorization?response_type=code",
        scope: "r_liteprofile%20r_emailaddress",
        state: "123456",
      },
    },
    USER_SERVICE: {
      URL: "http://localhost:3001",
    },
    WALLET_SERVICE: {
      URL: "http://localhost:3002",
    },
    SPOT_SERVICE: {
      URL: "http://localhost:3003",
    },
    P2P_SERVICE: {
      URL: "http://localhost:3004",
    },
    FUTURES_SERVICE: {
      URL: "http://localhost:3005",
    },
    INVERSE_SERVICE: {
      URL: "http://localhost:3006",
    },
    // LAUNCHPAD_SERVICE: {
    //   URL: 'http://localhost:3004',
    // },
  };
}

export default key;
