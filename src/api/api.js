const apiBase = '/nominatim';

async function handleResponse(response) {
    const contentType = response.headers.get('content-type') || '';
    let body = null;
    if (contentType.includes('application/json')) {
        body = await response.json();
    } else {
        body = await response.text();
    }

    if (!response.ok) {
        const err = new Error('API request failed');
        err.status = response.status;
        err.body = body;
        throw err;
    }

    return body;
}

const api = {
    base: apiBase,

    async request(method, path, data = null, options = {}) {
        const url = `${this.base.replace(/\/$/, '')}/${path.replace(/^\//, '')}`;
        const headers = Object.assign({ 'Content-Type': 'application/json' }, options.headers || {});
        const fetchOptions = { method: method.toUpperCase(), headers, ...options };

        if (fetchOptions.method === 'GET') {
            const query = data ? new URLSearchParams(data).toString() : '';
            const finalUrl = query ? `${url}?${query}` : url;
            const res = await fetch(finalUrl, fetchOptions);
            return handleResponse(res);
        }

        if (data != null) {
            fetchOptions.body = JSON.stringify(data);
        }

        const res = await fetch(url, fetchOptions);
        return handleResponse(res);
    },

    get(path, params = null, options = {}) {
        return this.request('GET', path, params, options);
    },

    post(path, data = null, options = {}) {
        return this.request('POST', path, data, options);
    },

    put(path, data = null, options = {}) {
        return this.request('PUT', path, data, options);
    },

    delete(path, data = null, options = {}) {
        return this.request('DELETE', path, data, options);
    }
};

export default api;
export { api };