import queryString from 'query-string';

import type { StringifiableRecord } from 'query-string';

export const DOMAIN = process.env.NEXTAUTH_URL;

interface RouteOptions {
    query?: StringifiableRecord;
    full?: boolean;
}

class Route<Params extends StringifiableRecord = StringifiableRecord> {
    path: string;

    constructor(path: string) {
        this.path = path;
    }

    private getDomain = () => {
        if (typeof window === 'undefined') {
            return DOMAIN;
        }

        const { origin } = window.location;

        return origin;
    };

    private formatUrl = (path: string, full?: boolean) => `${full ? this.getDomain() : ''}${path}`;

    get = ({ query, full }: RouteOptions = {}) => queryString.stringifyUrl({
        url: this.formatUrl(this.path, full),
        query,
    });

    getWithParams = (params: Params, { query, full }: RouteOptions = {}) => {
        let path = this.path;

        Object.keys(params).forEach((key) => {
            path = path.replace(`:${key}`, String(params[key]) ?? `:${key}`);
        });

        return queryString.stringifyUrl({
            url: this.formatUrl(path, full),
            query,
        });
    };
}

export const ROUTES = {
    HOME: new Route('/'),
    AUTH: new Route('/auth'),
    DASHBOARD: new Route('/dashboard'),
};