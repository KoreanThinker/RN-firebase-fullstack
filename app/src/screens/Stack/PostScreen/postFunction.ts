import { postType } from "../../../components/types"

async function postFunction({ userid, description, image }: postType): Promise<any> {
    console.log(userid)
    console.log(description)
    return userid
}

export default postFunction