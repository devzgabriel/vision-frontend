import React, { useState } from 'react'
import {Link, useHistory} from 'react-router-dom'
import {FiArrowLeft} from 'react-icons/fi'

import api from '../../services/api'

import './styles.css'
import logoImg from '../../assets/eye.svg'

export default function ForgotId(){
  const [email, setEmail] = useState('')

  const history = useHistory()

  async function sendMail(event){
    event.preventDefault()
    console.log(email)

    try{
      await api.post('company/forgot-id',{email})
      alert("Se estiver cadastrado a Id será enviada em alguns instantes!")
      history.push('/')
    }catch{
      alert("Falha no processo. Tente Novamente!")
    }
    
  }

  return(
    <div className="forgot-container">
      <div className="content">
        <section>
          <img src={logoImg} alt="Vision"/>
          <h1>Recuperação</h1>
          <p>Enviaremos um email com a Id referente ao cadastro, portanto utilise o mesmo email que se registrou na plataforma!</p>

          <Link className='back-link' to="/">
            <FiArrowLeft size={16} color='#2020d8' />
            Voltar para Tela Inicial
          </Link>
        </section>

        <form onSubmit={sendMail}>

        <input 
          placeholder='Seu Email' 
          value={email}
          onChange={event => setEmail(event.target.value)}
        />

        <button className="button" type= 'submit'>Recuperar ID</button>

        </form>
      </div>
    </div>
  )
}