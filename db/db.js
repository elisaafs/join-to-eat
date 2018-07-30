const spicedPg = require("spiced-pg");
let db;

if (process.env.DATABASE_URL) {
    db = spicedPg(process.env.DATABASE_URL);
} else {
    db = spicedPg(`postgres:Elisa:elisa1@localhost:5432/socialnetwork`);
}

exports.registerUser = function(firstName, lastName, email, hashedPassword) {
    const q = `
          INSERT INTO users (first_name, last_name, email, hashed_password)
          VALUES ($1, $2, $3, $4)
          RETURNING *
    `;
    const params = [firstName, lastName, email, hashedPassword];
    return db.query(q, params).then(results => {
        return results.rows[0];
    });
};

exports.getInfo = function(email) {
    const q = `SELECT email, hashed_password, id FROM users WHERE email= $1;`;
    const params = [email];
    return db.query(q, params).then(results => {
        return results.rows[0];
    });
};

exports.getUserById = function(userId) {
    const q = `SELECT id, first_name, last_name, profile_pic, cover_pic, bio FROM users WHERE id= $1;`;
    const params = [userId];
    return db.query(q, params).then(results => {
        console.log(results.rows);
        return results.rows[0];
    });
};

exports.updateUserImage = function(userId, profilePic) {
    const q = `
        UPDATE users SET
        profile_pic = $2
        WHERE id = $1
        RETURNING *;
        `;
    const params = [userId, profilePic];
    return db.query(q, params).then(results => {
        return results.rows[0].profile_pic;
    });
};

exports.updateCoverImage = function(userId, coverPic) {
    const q = `
        UPDATE users SET
        cover_pic = $2
        WHERE id = $1
        RETURNING *;
        `;
    const params = [userId, coverPic];
    return db.query(q, params).then(results => {
        return results.rows[0].profile_pic;
    });
};

exports.saveBio = function(id, bio) {
    const params = [id, bio];
    const q = `
        UPDATE users SET
        bio = $2
        WHERE id = $1
        RETURNING *;
        `;
    return db.query(q, params).then(userInfo => {
        return userInfo.rows[0].bio;
    });
};

exports.getBioById = function(id) {
    const params = [id];
    const q = `SELECT bio FROM users WHERE id = $1;`;
    return db.query(q, params).then(bio => {
        return bio.rows[0];
    });
};
