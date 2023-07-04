export function userExists(db, userID) {
    return db.find(user => user === userID)
}