import { createClient } from 'next-sanity'

import { apiVersion, dataset, projectId } from '../env'

export const client = createClient({
    apiVersion,
    dataset,
    projectId,
    useCdn: true, // Enable CDN for read operations
})

export const writeClient = createClient({
    apiVersion,
    dataset,
    projectId,
    useCdn: false,
    token: process.env.SANITY_API_TOKEN,
})
