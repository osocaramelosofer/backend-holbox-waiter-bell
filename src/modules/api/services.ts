import  { pgPool } from '../../config/postgres'
import { Todo, TodoPost } from '../../types/todo'
import { v4 as uuidv4 } from 'uuid';
import { getDetail } from './controller';


export const services = {
    addTodo: async ({title,description, status}: TodoPost): Promise<Todo|null> => {
        try {
            const id = uuidv4()
            const text = 'INSERT INTO todo(id, title, description, status) VALUES($1, $2, $3, $4) RETURNING *'
            const values = [id, title, description,status]
            const result = await pgPool.query(text, values)
            return result.rows[0] as unknown as Todo || null
        } catch (error) {
            console.log("Something went wrong adding the todo")
            console.error({error})
            return null
        }
    },
    getTodos: async ():Promise<any> =>  {
        try {
            const result = await pgPool.query('SELECT * FROM todo');
            return result.rows
        } catch (error) {
            return false        
        }
    },
    getDetail: async (id: string): Promise<Todo | null> => {
        try {
            const text = `SELECT * FROM TODO
                        WHERE id = $1`
            const values = [id]
            const result = await pgPool.query(text, values)
            const todo: Todo = result.rows[0] 
            return todo || null 
        } catch (error) {
            console.error({error})
            return null
        }
    },
    deleteTodo: async (id: string):Promise<{success:boolean, message: string}> => {
        try {
            const text = `DELETE FROM todo
                            WHERE id = $1`
            const values = [id]
            const result = await pgPool.query(text,values)
            console.log(result.rows)
            return { success: true, message: 'The todo was deleted successfully'}
        } catch (error) {
            console.error({error})
            throw new Error("Something went wrong trying to delete the todo")
        }
    },
    updateTodo: async({id, title, description, status} : 
        {id: string, title: string, description: string, status: boolean}): Promise<Todo | null> => {
        try {
            const text = `
                    UPDATE todo
                    SET title = $2, description = $3, status = $4
                    WHERE id = $1
                    RETURNING *
            `
            const values = [id, title, description, status]
            const result = await pgPool.query(text,values)
            console.log(result.rows)
            const todo: Todo = result.rows[0] || null
            return todo
        } catch (error) {
            console.error({error})
            throw new Error('Something went wrong trying to update the todo')
        }
    }
}