export function validateUserData(user) {
    try {
        const userKeys = Object.keys(user);
        if (userKeys.includes('name')
            && userKeys.includes('hobbies')
            && userKeys.includes('age')) {
            return true
        } else {
            return false
        }
    } catch (error) {
        console.log(error.message)
    }
}
