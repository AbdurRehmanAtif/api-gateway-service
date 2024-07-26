export const services = [
    {
        route: "/auth",
        target: "http://localhost:5009/auth",
        port: 5009,
        protocol: 'http'
    },
    {
        route: "/store",
        target: "http://localhost:5008/store",
        port: 5008,
        protocol: 'http'
    }
];