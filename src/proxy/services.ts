export const services = [
    {
        route: "/auth/service",
        target: "http://localhost:5009",
        port: 5009,
        protocol: 'http'
    },
    {
        route: "/store",
        target: "http://localhost:5008",
        port: 5008,
        protocol: 'http'
    },
    {
        route: "/api",
        target: "http://www.example.org/api",
        port: 5006,
        protocol: 'http'
    }
];