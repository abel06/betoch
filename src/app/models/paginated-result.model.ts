import { PageDetail } from "../utils/pagination";

export interface PaginatedResult<E> {
    page: PageDetail,
    _embedded: {
        elements: E[]
    },
    // links: PaginatorLinks
}

// export interface PageDetails {
//     totalElements: number,
//     totalPages: number,
//     perPage:number,
//     page: number
// }

// export interface Link {
//     href: string
// }

// export interface PaginatorLinks {
//     first: string,
//     self: string,
//     next: string,
//     last: string
// }