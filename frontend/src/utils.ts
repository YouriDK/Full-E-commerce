export const sleep = async (ms: number) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

export const errorMaker = (
  code: number,
  url: string,
  response: string = '',
  title: string = ''
) => {
  if (code === 404) {
    return {
      title: 'Unfound url',
      type: url,
      status: code,
      response: "This url doesn't existed in the backend",
    };
  }
  return {
    title: title,
    type: url,
    status: code,
    response: response,
  };
};
