
const setModoDD = (request, response) => {
  const puesto = parseInt(request.params.id)
  response.send('modo cambiado a DD')
 }
 
const setModoMixto = (request, response) => {
  const puesto = parseInt(request.params.id)
  response.send('modo cambiado a Mixto')
 }

module.exports = {
  setModoMixto,
  setModoDD,
}

