export interface Todo {
    id: number
    title: string
    description: string
    status: boolean
}

export type TodoPost = Omit<Todo, "id">