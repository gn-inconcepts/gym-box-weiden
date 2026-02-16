import { type SchemaTypeDefinition } from 'sanity'
import trainer from './schemaTypes/trainer'
import pricing from './schemaTypes/pricing'
import service from './schemaTypes/service'
import testimonial from './schemaTypes/testimonial'
import pageContent from './schemaTypes/page-content'
import siteSettings from './schemaTypes/site-settings'
import review from './schemaTypes/review'
import instagramPost from './schemaTypes/instagram-post'
import mediaAsset from './schemaTypes/media-asset'
import legalPage from './schemaTypes/legal-page'

export const schema: { types: SchemaTypeDefinition[] } = {
    types: [
        trainer,
        pricing,
        service,
        testimonial,
        pageContent,
        siteSettings,
        review,
        instagramPost,
        mediaAsset,
        legalPage,
    ],
}
