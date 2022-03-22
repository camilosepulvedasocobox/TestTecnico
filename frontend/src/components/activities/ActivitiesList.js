import React, { Component } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

import Activity from './Activity'

export default class ActivitiesList extends Component {

	state = {
		activities: [],
		creacion: 0,
		resueltas: 0
	}

	async componentDidMount() {
		this.getActivities();
	}

	async getActivities() {
		const res = await axios.get(`http://localhost:4000/api/activities
			?creacion=${this.state.creacion}
			&resueltas=${this.state.resueltas}`
		);
		this.setState({activities: res.data});
	}

	deleteActivity = async (id) => {
		if (window.confirm("¿Está seguro de eliminar la actividad?")) {
			await axios.delete('http://localhost:4000/api/activities/' + id)
		
			this.getActivities();
		}
	}

	onInputChange = async e => {
		await this.setState({
			[e.target.name]: e.target.value
		})
		this.getActivities();
	}

	render() {
		return (
			<div>
				<div className='row'>
					<div className="col-md-3">
						<Link className='btn btn-success' to="/createActivity">Crear actividad</Link>
					</div>
					<div className="col-md-3">
						<label className='text-right w-100'>Filtrar por: </label>
					</div>
					<div className="col-md-3">
						<select name='creacion' className='form-control' onChange={this.onInputChange} value={this.state.creacion} >
							<option value="0">Fecha de Creación</option>
							<option value="1">Fecha de Finalización</option>
						</select>
					</div>
					<div className="col-md-3">
						<select name='resueltas' className='form-control' onChange={this.onInputChange} value={this.state.resueltas} >
							<option value="0">No Resueltas</option>
							<option value="1">Resueltas</option>
						</select>
					</div>
				</div>
				<div className='row'>
					{
						this.state.activities.map((activity, i) => {
							return (
								<Activity
									activity = { activity }
									key = { activity._id }
									deleteActivity = { this.deleteActivity }
									interaccion = { true }
								/>
							)
						})
					}
				</div>
			</div>
		)
	}
}
