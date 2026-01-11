class PaginationService {
    /**
     * Generic pagination helper
     * @param {Function} dataFetcher - Async function to fetch data, receives (limit, offset)
     * @param {Function} countFetcher - Async function to get total count
     * @param {number} page - Current page number
     * @param {number} limit - Items per page
     * @returns {Object} - { data, pagination }
     */
    async paginate(dataFetcher, countFetcher, page, limit) {
        const offset = (page - 1) * limit;

        // Fetch data and count in parallel
        const [data, totalCount] = await Promise.all([
            dataFetcher(limit, offset),
            countFetcher()
        ]);

        const total = (totalCount && totalCount.total !== undefined) ? totalCount.total : totalCount;
        const totalPages = Math.ceil(total / limit);
        const hasNextPage = page < totalPages;
        const hasPrevPage = page > 1;
        const from = data.length > 0 ? offset + 1 : null;
        const to = data.length > 0 ? offset + data.length : null;

        return {
            data,
            pagination: {
                total,
                per_page: limit,
                current_page: page,
                total_pages: totalPages,
                from,
                to,
                has_next_page: hasNextPage,
                has_prev_page: hasPrevPage
            }
        };
    }
}

module.exports = PaginationService;