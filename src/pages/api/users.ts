import { NextApiRequest, NextApiResponse } from "next";

export default (request: NextApiRequest, response: NextApiResponse) => {
    const users = [
        {
            id: 1, name: 'Femow'
        }
    ]
    return response.json(users);
}