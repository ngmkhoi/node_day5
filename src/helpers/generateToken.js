const jwt = require("jsonwebtoken");
const {SecretAccess, SecretRefresh} = require("../config/jwt");
const refreshTokenModel = require("../models/refreshToken.model");

const tokenGenerate = async (user, expiresAt) => {
    const accessToken = jwt.sign(
        {id: user.id, email: user.email},
        SecretAccess,
        {expiresIn: '1h'}
    )

    const refreshToken = jwt.sign(
        {id: user.id, email: user.email},
        SecretRefresh,
        {expiresIn: '30d'}
    )

    await refreshTokenModel.createRefreshToken(user.id, refreshToken, expiresAt);

    return {
        accessToken,
        refreshToken
    }
}

module.exports = tokenGenerate;