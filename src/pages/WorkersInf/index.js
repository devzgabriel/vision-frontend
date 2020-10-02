import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import {FiArrowLeft} from 'react-icons/fi'

import api from '../../services/api'
import eye from '../../services/eye'

import './styles.css'

import logoImg from '../../assets/eye.svg'

export default function InfWorker(){
  
  const companyName = localStorage.getItem('companyName')
  const companyId = localStorage.getItem('companyId')
  const workerId = localStorage.getItem('workerId')

  const [worker, setWorker] = useState([])
  const [workerInfo, setWorkerInfo] = useState({id:workerId, stats:'Não verificado'})

  useEffect(() =>{
    api.get(`worker/${workerId}`, {
      headers:{
        Authorization: companyId
      }
    }).then(response =>{
      setWorker(response.data.worker)
    })

    eye.get('worker-stats',{
      headers:{
        Authorization: companyId,
        id:workerId
      }
    }).then(response=>{
      setWorkerInfo(response.data)
    })
  },[workerId,companyId])   //if err => remove companyId

  return(
    <div className="worker-container">
      <header>
        <img src={logoImg} alt='Be the Hero' />
        <span>Organização: {companyName} </span>

        <Link className='back-link' to="/profile">
          <FiArrowLeft size={16} color='#2020d8' />
          Voltar para Tela Inicial
        </Link>
      </header>

      <div className="worker-data">

        <h2>{worker.name}</h2>
        <p><strong>Código do Funcionário: </strong>{worker.code}</p>
        <p><strong>Função do Funcionário: </strong>{worker.occupation}</p>

        <p><strong>Situação do Funcionário: </strong>{workerInfo.status}</p>

      </div>

    </div>
  )
}