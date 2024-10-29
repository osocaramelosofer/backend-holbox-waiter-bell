export interface Comment {
    id: string
    email: string
    comment: string
}
export type CommentPost = Omit<Comment, "id">
