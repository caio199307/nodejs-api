import express from 'express'
const app = express()

app.use(express.json())

// mock
const selecoes = [
    {id: 1, selecao: 'Brasil', grupo: 'G'},
    {id: 2, selecao: 'Suíça', grupo: 'G'},
    {id: 3, selecao: 'Sérvia', grupo: 'G'},
    {id: 4, selecao: 'Camarões', grupo: 'G'}
]

function buscarSelecaoPorId(id) {
    return selecoes.filter(selecao => selecao.id == id)
}

function buscaIndexSelecao(id) {
    return selecoes.findIndex(selecao => selecao.id == id)
}

app.get('/', (req, res) => {
    res.send('<h1>Curso de nodeJs</h1>')
})

app.get('/selecoes', (req, res) => {
    res.status(200).send(selecoes)
})

app.get('/selecoes/:id', (req, res) => {
    res.json(buscarSelecaoPorId(req.params.id))
})



app.post('/selecoes', (req, res) => {
    selecoes.push(req.body)
    res.status(201).send('Seleção cadastrada com sucesso')
})

app.put('/selecoes/:id', (req, res) => {
    let index = buscaIndexSelecao(req.params.id)
    selecoes[index].selecao = req.body.selecao
    selecoes[index].grupo = req.body.grupo
    res.json(selecoes)
})

app.delete('/selecoes/:id', (req, res) => {
    let index = buscaIndexSelecao(req.params.id)
    selecoes.splice(index, 1)
    res.send(`seleção com id: ${req.params.id} excluida com sucesso`)
})

export default app