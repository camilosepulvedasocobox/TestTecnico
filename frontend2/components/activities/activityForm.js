import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ActivityForm = () => {

	const [title, setTitle] = useState('')
	const [description, setDescription] = useState('')
	const [editing, setEditing] = useState(false)
	const [id, setId] = useState('')

	useEffect(async () => {
		console.log("Prueba")
	}, []);

	const onSubmit = () => {
		console.log("Submit")
	}

	const onInputChange = () => {
		console.log("On input change")
	}



	return (
		<div className="container p-4">
			<div className="row">
				<div className="col-md-6 offset-md-3">
					<div className="card" onSubmit={ onSubmit }>
						<div className="card-header">
							<h3>{ editing ? 'Editar' : 'Crear' } Actividad</h3>
						</div>
						<form className="card-body">
							<div className='form-group'>
								<input
									type="text"
									name="title"
									onChange={ onInputChange }
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
									onChange={ onInputChange }
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