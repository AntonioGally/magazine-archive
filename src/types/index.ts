export interface Magazine {
    id: string;
    abstract: string;
    author: string[];
    pdf_link: string;
    source: string;
    title: string;
    textual_genre: string;
    periodical_title?: string;
    publication_year?: number;
    views: number;
    raw_title: string;
    createdAt: string;
    createdBy: string;
}