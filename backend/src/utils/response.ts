const response = {
    error: (message: string) => ({error: {message}}),
    result: <T>(data: T) => ({result: data})
};

export default response;