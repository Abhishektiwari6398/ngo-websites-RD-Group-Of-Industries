import { createClient } from '@sanity/client'
import  ImageUrlBuilder  from '@sanity/image-url';

export const client = createClient({
    projectId: '11i7yl69',
    dataset: 'production',
    apiVersion: '2025-05-15',
    useCdn: true,
    token: process.env.NEXT_PUBLIC_SANITY_TOKEN,
    });

const builder = ImageUrlBuilder(client);
export const urlFor = (source) => builder.image(source);
