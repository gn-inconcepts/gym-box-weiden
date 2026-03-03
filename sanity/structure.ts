import type { StructureResolver } from 'sanity/structure'

// Singleton helper: show a single document editor instead of a list
const singletonListItem = (S: any, typeName: string, title: string) =>
    S.listItem()
        .title(title)
        .id(typeName)
        .child(
            S.document()
                .schemaType(typeName)
                .documentId(typeName)
        )

export const structure: StructureResolver = (S) =>
    S.list()
        .title('Content')
        .items([
            // ── Seiten (Pages) ──
            S.listItem()
                .title('Seiten')
                .child(
                    S.list()
                        .title('Seiten')
                        .items([
                            singletonListItem(S, 'homePage', 'Home'),
                            singletonListItem(S, 'gymPage', 'Das Gym'),
                            singletonListItem(S, 'boxPage', 'The Box'),
                            singletonListItem(S, 'teamPage', 'Team'),
                            singletonListItem(S, 'kontaktPage', 'Kontakt'),
                            singletonListItem(S, 'leistungenPage', 'Leistungen'),
                            singletonListItem(S, 'preisePage', 'Preise'),
                        ])
                ),

            S.divider(),

            // ── Inhalte (Content) ──
            S.listItem()
                .title('Inhalte')
                .child(
                    S.list()
                        .title('Inhalte')
                        .items([
                            S.documentTypeListItem('trainer').title('Trainer'),
                            S.documentTypeListItem('pricing').title('Preise'),
                            S.documentTypeListItem('service').title('Services'),
                            S.documentTypeListItem('testimonial').title('Testimonials'),
                        ])
                ),

            S.divider(),

            // ── Einstellungen (Settings) ──
            singletonListItem(S, 'siteSettings', 'Site Settings'),

            S.divider(),

            // ── Extern (External) ──
            S.listItem()
                .title('Extern')
                .child(
                    S.list()
                        .title('Extern')
                        .items([
                            S.documentTypeListItem('review').title('Reviews'),
                            S.documentTypeListItem('instagramPost').title('Instagram Posts'),
                            S.documentTypeListItem('mediaAsset').title('Media Assets'),
                            S.documentTypeListItem('pageContent').title('Page Content (Hero Images)'),
                        ])
                ),

            S.divider(),

            // ── Rechtliches (Legal) ──
            S.documentTypeListItem('legalPage').title('Rechtliche Seiten'),
        ])
