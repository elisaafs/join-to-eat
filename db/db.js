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

exports.getCompleteUserById = function(userId) {
    const q = `SELECT * FROM users WHERE id= $1;`;
    const params = [userId];
    return db.query(q, params).then(results => {
        return results.rows[0];
    });
};

exports.getUserById = function(userId) {
    const q = `SELECT id, first_name, last_name, profile_pic, cover_pic, email, bio, city, food, chef FROM users WHERE id= $1;`;
    const params = [userId];
    return db.query(q, params).then(results => {
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
        return results.rows[0].cover_pic;
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

exports.getFriendshipStatus = function(userId, bffId) {
    const q = `SELECT * FROM friendships WHERE ((receiver_id = $1 AND sender_id = $2) OR ( receiver_id = $2 AND sender_id = $1));`;
    const params = [userId, bffId];
    return db.query(q, params).then(results => {
        return results.rows[0];
    });
};

exports.createBff = function(userId, bffId) {
    const params = [userId, bffId];
    const q = `INSERT INTO friendships (sender_id, receiver_id, status) VALUES ($1, $2, 'pending');`;
    return db.query(q, params).then(results => {
        return results.rows[0];
    });
};

exports.cancelBff = function(userId, bffId) {
    const params = [userId, bffId];
    const q = `DELETE FROM friendships WHERE ((sender_id = $1 AND receiver_id = $2)
    OR (sender_id = $2 AND receiver_id = $1));
    `;
    return db.query(q, params).then(results => {
        return results.rows[0];
    });
};

exports.acceptBff = function(userId, bffId) {
    const params = [userId, bffId];
    const q = `
        UPDATE friendships
        SET status = 'friends'
        WHERE ((sender_id = $1 AND receiver_id = $2)
        OR (sender_id = $2 AND receiver_id = $1));
        `;
    return db.query(q, params).then(results => {
        return results.rows[0];
    });
};

exports.listOfFriends = function(userId) {
    const params = [userId];
    const q = `
           SELECT users.id, first_name, last_name, profile_pic, status
           FROM friendships
           JOIN users
           ON (status = 'pending' AND receiver_id = $1 AND sender_id = users.id)
           OR (status = 'friends' AND receiver_id = $1 AND sender_id = users.id)
           OR (status = 'friends' AND sender_id = $1 AND receiver_id = users.id);
       `;
    return db.query(q, params).then(results => {
        return results.rows;
    });
};

exports.friendsOfFriends = function(userId) {
    const params = [userId];
    const q = `
           SELECT users.id, first_name, last_name, profile_pic, status
           FROM friendships
           JOIN users
           ON (status = 'friends' AND receiver_id = $1 AND sender_id = users.id)
           OR (status = 'friends' AND sender_id = $1 AND receiver_id = users.id);
       `;
    return db.query(q, params).then(results => {
        return results.rows;
    });
};

exports.getUsersByIds = function(arrayOfIds) {
    const query = `SELECT * FROM users WHERE id = ANY($1)`;
    return db.query(query, [arrayOfIds]).then(results => {
        return results.rows;
    });
};

exports.joinById = function(userId) {
    const query = `SELECT * FROM users WHERE id = $1`;
    return db.query(query, [userId]).then(results => {
        return results.rows[0];
    });
};

exports.editUser = function(
    firstName,
    lastName,
    email,
    hashedPassword,
    city,
    food,
    chef,
    bio,
    userId
) {
    const q = `UPDATE users SET first_name = $1, last_name = $2, email = $3, hashed_password = $4, bio = $6, chef = $7, city = $8, food = $9 WHERE id = $5
    RETURNING id, first_name, last_name, email, bio, chef, city, food;`;

    const params = [
        firstName,
        lastName,
        email,
        hashedPassword,
        userId,
        bio,
        chef,
        city,
        food
    ];

    return db.query(q, params).then(results => {
        return results.rows[0];
    });
};

exports.getCommentsByUserId = function(userId) {
    const query = `SELECT * FROM wallpost WHERE user_id = $1 ORDER BY created_at DESC`;
    const params = [userId];
    return db.query(query, params).then(results => {
        return results.rows;
    });
};

exports.addComment = function(userId, authorId, comment) {
    const query = `
          INSERT INTO wallpost (user_id, author_id, comment)
          VALUES ($1, $2, $3)
          RETURNING *
    `;
    const params = [userId, authorId, comment];
    return db.query(query, params).then(results => {
        return results.rows[0];
    });
};
