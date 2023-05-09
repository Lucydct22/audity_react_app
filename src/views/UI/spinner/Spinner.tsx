import React from 'react'
import PulseLoader from "react-spinners/PulseLoader";
import { useAuth0 } from '@auth0/auth0-react';
import './spinner.scss'

export default function Spinner() {
const {isLoading} = useAuth0()

	return (
		<div className='spinner'>
			<PulseLoader
		color='#ef5466'
		loading={isLoading}
		size={10}
		aria-label="Loading Spinner"
		data-testid="loader"
	/>
	</div>
	)
}