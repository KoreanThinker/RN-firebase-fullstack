import { postType } from "../../../components/types"

async function postFunction({ userId, description, image }: postType): Promise<any> {
    console.log(userId)
    console.log(description)
    return userId
}

export default postFunction