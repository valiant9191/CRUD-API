export function userExists(db, userID) {
    return db.find(user => user?.id === userID) ? true : false
}