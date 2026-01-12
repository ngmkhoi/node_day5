const jwtConfig = {
    SecretAccess: process.env.JWT_ACCESS_TOKEN,
    SecretRefresh: process.env.JWT_REFRESH_TOKEN,
}

module.exports = jwtConfig;