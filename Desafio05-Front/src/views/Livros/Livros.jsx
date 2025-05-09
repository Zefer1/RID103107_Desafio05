import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Header from '../../components/Header/Header'
import SubmenuLivros from '../../components/SubmenuLivros/SubmenuLivros'
import { LivrosService } from '../../api/LivrosService'
import "./index.scss"

const Livros = () => {
  const [livros, setLivros] = useState([])

  async function getLivros() {
    const { data } = await LivrosService.getLivros()
    setLivros(data)
  }

  async function deleteLivro(id) {
    if (confirm(`Você realmente deseja remover o livro de ID: ${id}?`)) {
      const { data } = await LivrosService.deleteLivro(id)
      alert(data.mensagem)
      getLivros()
    }
  }

  useEffect(() => { getLivros() }, [])

  return (
    <>
      <Header/>
      <SubmenuLivros/>
      <div className='livros'>
        <h1>Escolha o seu livro</h1>
        <ul>
          {livros.map(l => (
            <li key={l.id}>
              {l.titulo} <span>{l.editora}</span>
              <div className='botoes'>
                <Link className='btn edit' to={`/livros/edicao/${l.id}`}>✎</Link>
                <button className='btn delete' type="button" onClick={()=>deleteLivro(l.id)}>🗑️</button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </>
  )
}

export default Livros
