const isLocalhost = Boolean(
    window.location.hostname === "localhost" ||
    window.location.hostname === "[::1]" ||
    window.location.hostname.match(
        /(192)\.(168)\.(1)\.([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])$/gm
    ) ||
    window.location.hostname.match(
        /^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/
    )
);

export const basePath = isLocalhost ?
    `${window.location.protocol}//${window.location.hostname}:4000/api/v1` :
    `${window.location.origin}/api/v1`;