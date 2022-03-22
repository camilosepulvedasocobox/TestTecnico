import React, { Component } from 'react'
import axios from 'axios';

export default class CreateActivity extends Component {

	state = {
		title: '',
		description: '',
		editing: false,
		_id: ''
	}

	async componentDidMount() {
		if (this.props.match.params.id) {
			const res = await axios.get('http://localhost:4000/api/activities/' + this.props.match.params.id);
			this.setState({
				title: res.data.title,
				description: res.data.description,
				editing: true,
				_id: this.props.match.params.id
			})
		}
	}

	onSubmit = async (e) => {
		e.preventDefault();
		const newActivity = {
			title: this.state.title,
			description: this.state.description,
		}
		if (this.state.editing) {
			await axios.put('http://localhost:4000/api/activities/' + this.state._id, newActivity)
		} else {
			await axios.post('http://localhost:4000/api/activities/', newActivity);
		}

		this.props.history.push('/');
	}

	onInputChange = e => {
		this.setState({
			[e.target.name]: e.target.value
		})
	}

	render() {
		return (
			<div className="container p-4">
				<div className="row">
					<div className="col-md-6 offset-md-3">
						<div className="card" onSubmit={this.onSubmit}>
							<div className="card-header">
								<h3>{ this.state.editing ? 'Editar' : 'Crear' } Actividad</h3>
							</div>
							<form className="card-body">
								<div className='form-group'>
									<input
										type="text"
										name="title"
										onChange={this.onInputChange}
										className="form-control"
										placeholder="Título"
										required
										value={this.state.title}
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
										onChange={this.onInputChange}
										required
										value={this.state.description}
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
}
