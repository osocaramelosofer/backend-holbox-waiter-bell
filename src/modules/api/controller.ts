import { Request, Response } from 'express'
import { services } from './services'



export async function list(req:Request, res:Response)  {
    try {
        const todos = await services.getTodos()
        res.status(200).json({
            data: todos
        })
    } catch (error) {
        console.error({error})
        const message = error instanceof Error ? error.message : 'Fail to delete todo'
        INTERNAL_SERVER_ERROR_RESPONSE(res, message)
    }
}
export async function addTodo(req:Request, res:Response) {
    try {
        const params = req.body
        const data = await services.addTodo({...params})
        res.status(200).json({ data })
    } catch (error) {
        console.error({error})
        const message = error instanceof Error ? error.message : 'Fail to delete todo'
        INTERNAL_SERVER_ERROR_RESPONSE(res, message)
    }
}
export async function getDetail(req: Request, res:Response){
    try {
        const requiredParams = ['id']
        validateParams(requiredParams, req.query, res)

        const { id } = req.query
        const detail = await services.getDetail(id as string)

        res.status(200).json({
            data: detail
        })
    } catch (error) {
        console.error({error})
        const message = error instanceof Error ? error.message : 'Fail to delete todo'
        INTERNAL_SERVER_ERROR_RESPONSE(res, message)
    }
}
export async function deleteTodo(req: Request, res: Response) {
    try {
        validateParams(['id'], req.query, res)
        const { id } = req.query
        const { success, message } = await services.deleteTodo(id as string)
        res.status(200).json({
            success,
            message
        })
    } catch (error) {
        console.error({error})
        const message = error instanceof Error ? error.message : 'Fail to delete todo'
        INTERNAL_SERVER_ERROR_RESPONSE(res, message)
    }
}
export async function putTodo(req:Request, res: Response) {
    try {
        const requiredParams = ['id','title', 'description', 'status']
        validateParams(requiredParams, req.body, res)
        const data = services.updateTodo({...req.body})
        res.status(200).json({data, message: 'Todo updated successfully'})
    } catch (error) {
        console.error({error})
        const message = error instanceof Error ? error.message : 'Fail updating the todo'
        INTERNAL_SERVER_ERROR_RESPONSE(res, message)
    }
}

export function INTERNAL_SERVER_ERROR_RESPONSE (res: Response, message: string) {
    return res.status(500).json({
        error:{
            message,
            code: 'Internal error'
        }
    })
}

export function validateParams(requiredParams:string[], dictionary: Record<string, any>, response:Response ){
    for(const param of requiredParams){
        if(dictionary[param] === undefined){
            return response.status(400).json({
                success:false,
                error:{
                    message: `Missing ${param} in request`
                }
            })
        }
    }
}