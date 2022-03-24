import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Link from 'next/link';

import Activity from './activity';

type SelectElement = React.FormEvent<HTMLSelectElement>;
interface IFilter {
	creacion: string;
	resueltas: string;
}

const ActivitiesList = (): JSX.Element => {
	const [activities, setActivities] = useState([]);
	const [filters, setFilters] = useState<IFilter>({
		creacion: '0',
		resueltas: '0'
	});

	const getActivities = async () => {
		const res = await axios.get(`http://localhost:4000/api/activities
			?creacion=${ filters.creacion }
			&resueltas=${ filters.resueltas }`
		);
		setActivities(res.data);
	}

	useEffect(() => {
		getActivities();
	},[]);

	const deleteActivity = async (id: string) => {
		if (window.confirm("¿Está seguro de eliminar la actividad?")) {
			await axios.delete('http://localhost:4000/api/activities/' + id);
		
			getActivities();
		}
	}

	const onInputChange = (e: SelectElement): void => {
		setFilters({
			...filters,
			[e.currentTarget.name] : e.currentTarget.value
		});
	}

	useEffect(() => {
		getActivities();
	},[filters])

	return (
		<div>
			<div className='row'>
				<div className="col-md-3">
					<Link href="/activities">
						<a className='btn btn-success'>
							Crear actividad
						</a>
					</Link>
				</div>
				<div className="col-md-3">
					<label className='text-right w-100'>Filtrar por: </label>
				</div>
				<div className="col-md-3">
					<select name='creacion' className='form-control' onChange={ onInputChange } value={ filters.creacion } >
						<option value="0">Fecha de Creación</option>
						<option value="1">Fecha de Finalización</option>
					</select>
				</div>
				<div className="col-md-3">
					<select name='resueltas' className='form-control' onChange={ onInputChange } value={ filters.resueltas } >
						<option value="0">No Resueltas</option>
						<option value="1">Resueltas</option>
					</select>
				</div>
			</div>
			<div className='row'>
				{
					activities.map((activity, i) => {
						return (
							<Activity
								activity = { activity }
								key = { activity._id }
								deleteActivity = { deleteActivity }
								interaccion = { true }
							/>
						)
					})
				}
			</div>
		</div>
	);
}

export default ActivitiesList;