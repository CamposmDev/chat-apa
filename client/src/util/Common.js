/**
 * Parses name to a hex color
 * @param {string} name 
 * @returns 
 */
function stringAvatar(name) {
    function stringToColor(string) {
        if (string.length <= 0) return 0;
        let hash = 0;
        let i;

        /* eslint-disable no-bitwise */
        for (i = 0; i < string.length; i += 1) {
            hash = string.charCodeAt(i) + ((hash << 5) - hash);
        }

        let color = '#';

        for (i = 0; i < 3; i += 1) {
            const value = (hash >> (i * 8)) & 0xff;
            color += `00${value.toString(16)}`.slice(-2);
        }
        /* eslint-enable no-bitwise */

        return color;
    }

    return {
        bgcolor: stringToColor(name)
    };
}

export {
    stringAvatar
}