import { type SchemaTypeDefinition } from 'sanity'

// Existing document types
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

// Reusable object types
import featureCard from './schemaTypes/objects/feature-card'
import contentSection from './schemaTypes/objects/content-section'
import statItem from './schemaTypes/objects/stat-item'
import ctaButton from './schemaTypes/objects/cta-button'
import navLink from './schemaTypes/objects/nav-link'
import classPhase from './schemaTypes/objects/class-phase'
import trainerSpotlight from './schemaTypes/objects/trainer-spotlight'

// Page singleton types
import homePage from './schemaTypes/home-page'
import gymPage from './schemaTypes/gym-page'
import boxPage from './schemaTypes/box-page'
import teamPage from './schemaTypes/team-page'
import kontaktPage from './schemaTypes/kontakt-page'
import leistungenPage from './schemaTypes/leistungen-page'
import preisePage from './schemaTypes/preise-page'

export const schema: { types: SchemaTypeDefinition[] } = {
    types: [
        // Object types (must be registered before documents that use them)
        featureCard,
        contentSection,
        statItem,
        ctaButton,
        navLink,
        classPhase,
        trainerSpotlight,

        // Existing document types
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

        // Page singletons
        homePage,
        gymPage,
        boxPage,
        teamPage,
        kontaktPage,
        leistungenPage,
        preisePage,
    ],
}
