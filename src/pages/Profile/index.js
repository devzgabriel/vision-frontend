import React, {useEffect, useState} from 'react'
import {Link,useHistory} from 'react-router-dom'
import {FiPower, FiTrash2} from 'react-icons/fi'

import api from '../../services/api'

import './styles.css'
import logoImg from '../../assets/eye.svg'


export default function Profile(){
  const [workers, setWorkers] = useState([])

  const companyName = localStorage.getItem('companyName')
  const companyId = localStorage.getItem('companyId')

  const history = useHistory()

  useEffect(() =>{
    api.get('workers',{
      headers:{
        Authorization: companyId
      }
    }).then(response =>{
      setWorkers(response.data)
    })
  },[companyId])

  async function handleDeleteWorker(id){
    try {
      await api.delete(`workers/${id}`, {
        headers:{
          Authorization: companyId
        }
      })

      setWorkers(workers.filter(worker => worker.id !== id))

    } catch (err) {
      alert('Erro ao deletar, Tente Novamente')
    }
  }

  function handleFindWorker(id){
    localStorage.setItem('workerId', id)
  }

  function handleLogout(){
    localStorage.clear()
    history.push('/')
  }

  return(
    <div className="profile-container">
      <header>
        <img src={logoImg} alt='Be the Hero' />
        <span>Bem Vindo(a), {companyName} </span>

        <Link className="button" to="/worker/new">Cadastrar Novo Funcionário</Link>
        <button onClick={handleLogout} type='button'>
          <FiPower size={18} color="#2020d8"/>
        </button>
      </header>

      <h1>Funcionários Cadastrados</h1>

      <ul>
        {workers.map(worker => (
        <li key={worker.id}>
          <strong>Funcionário:</strong>
          <p>{worker.name}</p>

          <strong>Código:</strong>
          <p>{worker.code}</p>

          <strong>Ocupação:</strong>
          <p>{worker.occupation}</p>

          <button onClick={() => handleDeleteWorker(worker.id)} type='button' >
            <FiTrash2 size={20} color="#a8a8b3"/>
          </button>

          <div className='more'>
            <button onClick={() => handleDeleteWorker(worker.id)} type='button' >
              {/* <FiTrash2 size={20} color="#a8a8b3"/> */}
              <p>Ver Mais</p>
            </button>
          </div>

          <Link className="more" to="/worker/inf" onClick={() => handleFindWorker(worker.id)} >Ver Mais</Link>

        </li>
        ))}
      </ul>
    </div>
  )
}