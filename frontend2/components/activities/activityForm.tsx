import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';

type FormElement = React.FormEvent<HTMLFormElement>;

const ActivityForm = (props): JSX.Element => {

	const router = useRouter();

	const [title, setTitle] = useState<string>('')
	const [description, setDescription] = useState<string>('')
	const [_id, setId] = useState<string>('')

	const fetchMyAPI = async (id): Promise<void> => {
		const res = await axios.get('http://localhost:4000/api/activities/' + id);
		
		setTitle(res.data.title)
		setDescription(res.data.description)
		setId(props.activityId[0]);
	}

	useEffect(() => {
		if (typeof props.activityId !== "undefined") {
			fetchMyAPI(props.activityId);
		}
	}, [])

	const onSubmit = async (e: FormElement) => {
		e.preventDefault();

		const newActivity = {
			title: title,
			description: description,
		}
		if (_id != '') {
			await axios.put('http://localhost:4000/api/activities/' + _id, newActivity)
		} else {
			await axios.post('http://localhost:4000/api/activities/', newActivity);
		}

		router.push('/');
	}

	return (
		<div className="container p-4">
			<div className="row">
				<div className="col-md-6 offset-md-3">
					<div className="card">
						<div className="card-header">
							<h3>{ _id != '' ? 'Editar' : 'Crear' } Actividad</h3>
						</div>
						<form className="card-body" onSubmit={ onSubmit }>
							<div className='form-group'>
								<input
									type="text"
									name="title"
									onChange={ e => setTitle(e.target.value) }
									className="form-control"
									placeholder="Título"
									required
									value={ title }
									autoComplete="off"
									autoFocus
								/>
							</div>
							<div className='form-group'>
								<input
									type="text"
									name="description"
									className="form-control"
									placeholder="Descripción"
									onChange={ e => setDescription(e.target.value) }
									required
									value={ description }
									autoComplete="off"
								/>
							</div>
							<button type='submit' className='btn btn-success w-100'>
								Guardar
							</button>
						</form>
					</div>
				</div>
			</div>
		</div>
	)
}

export default ActivityForm;