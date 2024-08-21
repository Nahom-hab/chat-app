import jwt from 'jsonwebtoken';

const generateJwtToken = (userId, res) => {
    const token = jwt.sign({ userId }, process.env.SECRET, {
        expiresIn: '15d'
    });

    res.cookie('jwt', token, {
        maxAge: 15 * 24 * 60 * 60 * 1000, // 15 days in milliseconds
        httpOnly: true,
        sameSite: 'strict'
    });
};

export default generateJwtToken;
