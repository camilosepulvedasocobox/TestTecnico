import React, { Component } from 'react';
import { format, register } from 'timeago.js';
import Link from 'next/link';

register('es_ES', (number, index, total_sec) => [
	['justo ahora', 'ahora mismo'],
	['hace %s segundos', 'en %s segundos'],
	['hace 1 minuto', 'en 1 minuto'],
	['hace %s minutos', 'en %s minutos'],
	['hace 1 hora', 'en 1 hora'],
	['hace %s horas', 'in %s horas'],
	['hace 1 dia', 'en 1 dia'],
	['hace %s dias', 'en %s dias'],
	['hace 1 semana', 'en 1 semana'],
	['hace %s semanas', 'en %s semanas'],
	['1 mes', 'en 1 mes'],
	['hace %s meses', 'en %s meses'],
	['hace 1 año', 'en 1 año'],
	['hace %s años', 'en %s años']
][index]);

const timeago = timestamp => format(timestamp, 'es_ES');

const Activity = (props) => {

	const { activity } = props;

	return (
		<div className="col-md-4" style={ props.style }>
			<div className="card mt-4">
				<div className="card-header">
					<h3>{activity.title}</h3>
				</div>
				<div className="card-body">
					<p>{activity.description}</p>
					<p className='text-muted'>Tareas completadas: { activity.todos.filter(todo => todo.completed).length } / { activity.todos.length }</p>
					<p className='font-weight-light'>Creación: { timeago(activity.createdAt) } </p>
					<p className='font-weight-light'>Finalización: { typeof activity.finish_date !== 'undefined' ? timeago(activity.finish_date) : '' } </p>
				</div>
				{ props.interaccion && (
					<div className='card-footer'>
						<div className='btn-group w-100'>
							<Link href={ "/activities/" + activity._id + "/todos" } >
								<a className='btn btn-primary'>
									Tareas
								</a>
							</Link>
							<Link href={ "/activities/" + activity._id }>
								<a  className='btn btn-default btn-outline-dark'>
									Editar
								</a>
							</Link>
							<button className='btn btn-danger' onClick={ props.deleteActivity.bind(this, activity._id) }>
								Eliminar
							</button>
						</div>
					</div>
				) }
			</div>
		</div>
	);
}

export default Activity;