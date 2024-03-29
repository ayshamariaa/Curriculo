const Pool = require('pg').Pool
const pool = new Pool({
  user: 'postgres',
  host: 'db.epdjwuzawkvhpgmvujlq.supabase.co',
  database: 'postgres',
  password: 'F58LTsVGW4HCz3959Bzmhk0HDBoP00ld',
  port: 5432,
})

const getCurriculo = (request, response) => {
  pool.query('SELECT * FROM curriculo ORDER BY id ASC', (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

const getCurriculoById = (request, response) => {
  const id = parseInt(request.params.id)

  pool.query('SELECT * FROM curriculo WHERE id = $1', [id], (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

const createCurriculo = (request, response) => {
  const { nome, formacao, telefone, experiencia } = request.body

  pool.query('INSERT INTO curriculo (nome, formacao, telefone, experiencia) VALUES ($1, $2, $3, $4, )', [name, endereco, formacao, experiencia], (error, results) => {
    if (error) {
      throw error
    }
    response.status(201).send(`User added with ID: ${results.insertId}`)
  })
}

const updateCurriculo = (request, response) => {
  const id = parseInt(request.params.id)
  const { nome, formacao, telefone, experiencia } = request.body

  pool.query(
    'UPDATE curriculo SET nome = $1, telefone = $2 formacao = $3, experiencia = $4 WHERE id = $5',
    [nome, formacao, telefone,  experiencia, id],
    (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).send(`User modified with ID: ${id}`)
    }
  )
}

const deleteCurriculo = (request, response) => {
  const id = parseInt(request.params.id)

  pool.query('DELETE FROM curriculo WHERE id = $1', [id], (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).send(`User deleted with ID: ${id}`)
  })
}

module.exports = {
  getCurriculo,
  getCurriculoById,
  createCurriculo,
  updateCurriculo,
  deleteCurriculo,
}