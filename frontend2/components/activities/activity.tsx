import React, { Component } from 'react';
import { format, register } from 'timeago.js';
import Link from 'next/link';
import es_ES from 'timeago.js/lib/lang/es'

import { IActivity } from '../../interfaces/Activity';

register('es_ES', es_ES);
const timeago = timestamp => format(timestamp, 'es_ES');

interface Props {
	activity: IActivity;
	deleteActivity?: (id: string) => void;
	interaccion?: boolean
	style?: object
}

const Activity = (props: Props): JSX.Element => {

	const { activity } = props;

	return (
		<div className="col-md-4" style={props.style && props.style}>
			<div className="card mt-4">
				<div className="card-header">
					<h3>{activity.title}</h3>
				</div>
				<div className="card-body">
					<p>{activity.description}</p>
					<p className='text-muted'>Tareas completadas: { activity.todos.filter(todo => todo.completed).length } / { activity.todos.length }</p>
					<p className='font-weight-light'>Creación: { timeago(activity.createdAt) } </p>
					<p className='font-weight-light'>Finalización: { activity.finish_date && timeago(activity.finish_date) } </p>
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
							<button className='btn btn-danger' onClick={ props.deleteActivity && props.deleteActivity.bind(this, activity._id) }>
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