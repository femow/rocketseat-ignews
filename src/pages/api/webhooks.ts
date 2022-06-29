import { NextApiRequest, NextApiResponse } from 'next';
import { Readable } from 'stream'

async function buffer(readable: Readable) {
    const chunks = []

    for await (const chunk of readable) {
        chunks.push(
            typeof chunk === 'string' ? Buffer.from(chunk) : chunk
        )
    }

    return Buffer.concat(chunks);
}

export const config = {
    api: {
        bodyParser: false
    }
}

export default async function(request: NextApiRequest, response: NextApiResponse) {
    if (request.method === 'POST') {
        const buf = await buffer(request)
        
        response.status(200).json({ ok: true })
    } else {
        response.setHeader('Allow', 'POST')
        response.status(405).end('Method not allowed')
    }
}