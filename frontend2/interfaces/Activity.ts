import { ITodo } from './Todo';

export interface IActivity {
	_id?: string;
	title: string;
	description: string;
	completed?: boolean;
	finish_date: number;
	createdAt: number;
	todos: ITodo[]
}