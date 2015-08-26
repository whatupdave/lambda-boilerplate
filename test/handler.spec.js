import {handler} from '../src'
import {expect} from 'chai'

describe('handler', () => {
  it('exports handler', () => {
    expect(handler).to.be.a('function')
  })

  it('returns invalid request with no params', (done) => {
    const context = {
      done: (err, message) => {
        if (err) {
          done(err)
        } else if (message) {
          done()
        } else {
          done(new Error('Error - should have failed with bad event data'))
        }
      },
    }

    handler({}, context)
  })
})
