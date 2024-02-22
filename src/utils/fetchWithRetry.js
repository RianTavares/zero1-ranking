/**
 * Performs a fetch request to a URL with the option to retry on failure.
 * If the fetch fails, the function will retry the fetch up to the specified number of retries.
 * 
 * @param {string} url - The URL to perform the fetch request.
 * @param {number} [retries=1] - The number of times to retry the fetch after a failure.
 * @returns {Promise<any>} - A promise that resolves with the fetch result if successful.
 * @throws {Error} - If all fetch attempts fail, an exception will be thrown.
 * 
 * @example
 * // Basic usage:
 * fetchWithRetry('https://api.example.com/data', 2)
 *   .then(data => console.log(data))
 *   .catch(error => console.error(error));
 */
export async function fetchWithRetry(url, retries = 1) {
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        console.error('Fetch error:', error);
        if (retries > 0) {
            console.log(`Retrying... (${retries} retries remaining)`);
            return await fetchWithRetry(url, retries - 1);
        } else {
            throw error;
        }
    }
}
