import { Router } from 'express'
import {addTodo, deleteTodo, getDetail, list, putTodo} from './controller'

export const apiRouter = Router()

apiRouter.get('/list', list)
apiRouter.post('/add', addTodo)

apiRouter.get('/detail', getDetail)
apiRouter.delete('/delete', deleteTodo)
apiRouter.put('/todo', putTodo)

// 5 verbos hhtp get, delete, post, put, patch