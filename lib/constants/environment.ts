interface IEnvironment {
  SERVER: {
    BASEURL: string;
  };
  // SOCKET: {
  //   BASEURL: string;
  // };
  TOKEN_NAMES: {
    HEADERS: {
      ACCESS: string;
      REFRESH: string;
    };
  };
}

export const ENVIRONMENT: IEnvironment = {
  SERVER: {
    BASEURL: process.env.NEXT_PUBLIC_BASEURL || '',
  },
  // SOCKET: {
  //   BASEURL: process.env.NEXT_PUBLIC_SOCKET_URL || '',
  // },
  TOKEN_NAMES: {
    HEADERS: {
      ACCESS: 'x-pin-access-token',
      REFRESH: 'x-pin-refresh-token',
    },
  },
};
