import React, { useEffect } from 'react';
import { EditProfileInputs, RootState } from '@/types/global';
import { ThunkDispatch } from 'redux-thunk';
import { AnyAction } from 'redux';
import { useDispatch, useSelector } from 'react-redux';
import { findAllCompanies } from '../redux/clientSlice';

const allClients = () => {
	useEffect(() => {}, []);

	return <div></div>;
};

export default allClients;
