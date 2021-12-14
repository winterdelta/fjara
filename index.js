const fs = require('fs')
const TextToSpeechV1 = require('ibm-watson/text-to-speech/v1')
const { IamAuthenticator } = require('ibm-watson/auth')

const textToSpeech = new TextToSpeechV1({
  authenticator: new IamAuthenticator({
    apikey: ''
  }),
  serviceUrl: ''
})

const synthesizeParams = {
  text: 'The Future Developments of AI.',
  accept: 'audio/WAV',
  voice: 'en-US_KevinV3Voice'
}

textToSpeech.synthesize(synthesizeParams)
  .then(response => {
    // only necessary for wav formats,
    // otherwise `response.result` can be directly piped to a file
    return textToSpeech.repairWavHeaderStream(response.result)
  })
  .then(buffer => {
    fs.writeFileSync('Future.WAV', buffer)
  })
  .catch(err => {
    console.log('error:', err)
  })
