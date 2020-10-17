import React, {useEffect, useState} from 'react'
import {Link,useHistory} from 'react-router-dom'
import {FiPower, FiTrash2} from 'react-icons/fi'

import api from '../../services/api'

import './styles.css'
import logoImg from '../../assets/eye.svg'


export default function Profile(){
  
  const companyName = localStorage.getItem('companyName')
  const companyId = localStorage.getItem('companyId')

  const [workers, setWorkers] = useState([])
  
  const [verifiedAmount, setVerifiedAmount] = useState(0)
  const [notVerifiedAmount, setNotVerifiedAmount] = useState(0)
  const [inIntervalAmount, setInIntervalAmount] = useState(0)
  const [absentAmount, setAbsentAmount] = useState(0)
  
  const [verifiedList, setVerifiedList] = useState([])
  const [notVerifiedList, setNotVerifiedList] = useState([])
  const [inIntervalList, setInIntervalList] = useState([])
  const [absentList, setAbsentList] = useState([])

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

  useEffect(()=>{
    workers.forEach((worker)=>{
      switch (worker.status) {
        case "Verificado":
          setVerifiedAmount(verifiedAmount + 1)  // antigo
          setVerifiedList(...verifiedList, worker) // novo
          break
        case "Não verificado":
          // console.log(notVerifiedAmount)
          setNotVerifiedAmount(notVerifiedAmount + 1)
          // console.log(notVerifiedAmount)
          setNotVerifiedList(...notVerifiedList, worker)
          console.log(notVerifiedList)
          break
        case "Em Intervalo":
          setInIntervalAmount(inIntervalAmount + 1)
          setInIntervalList(...inIntervalList, worker)
          break
        case "Ausente":
          setAbsentAmount(absentAmount + 1)
          setAbsentList(...absentList, worker)
          break
        default:
          break
      }
    })
    console.log(notVerifiedAmount)

    localStorage.setItem('verifiedList', verifiedList)
    localStorage.setItem('notVerifiedList', notVerifiedList)
    localStorage.setItem('inIntervalList', inIntervalList)
    localStorage.setItem('absentList', absentList)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[workers])

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


  function defineSeeMoreColor(status){
    switch (status) {
      case "Verificado":
        return "#2020d8"
      case "Não verificado":
        return "#d00000"
      case "Em Intervalo":
        return "#f77f00"
      case "Ausente":
        return "#909090"
    
      default:
        return "#2020d8"
    }
  }

  return(
    <div className="profile-container">
      <header>
        <img src={logoImg} alt='Vision' />
        <span>Bem Vindo(a), {companyName} </span>

        <Link className="button" to="/worker/new">Cadastrar Novo Funcionário</Link>
        <button onClick={handleLogout} type='button'>
          <FiPower size={18} color="#2020d8"/>
        </button>
      </header>

      <h1>Estatística Geral</h1>

      <div className="status" >
        <ul>

          <li>
            <strong className="statusText" >
              Verificados:{'   '}
              {verifiedAmount}
            </strong>
            {/* Botão de ver Lista Aqui */}
          </li>

          <li>
            <strong>
              Não Verificados:{'   '}
              {notVerifiedAmount}
            </strong>
          </li>

          <li>
            <strong>
              Em Intervalo:{'   '}
              {inIntervalAmount}
            </strong> 
          </li>

          <li>
            <strong>
              Sem informações:{'   '}
              {absentAmount}
            </strong> 
          </li>

        </ul>
      </div>

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

          <Link className="more" style={{backgroundColor: defineSeeMoreColor(worker.status)}} to="/worker/inf" onClick={() => handleFindWorker(worker.id)} >Ver Mais</Link>

        </li>
        ))}
      </ul>
    </div>
  )
}